'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useAppStore, HeroStage } from '@/store/appStore'
import HeroStage1 from './stages/HeroStage1'
import HeroStage2 from './stages/HeroStage2'
import HeroStage3 from './stages/HeroStage3'
import HeroStage4 from './stages/HeroStage4'

interface HeroStageManagerProps {
  className?: string
}

const HeroStageManager = ({ className = '' }: HeroStageManagerProps) => {
  const { 
    heroStage, 
    isHeroTransitioning, 
    nextHeroStage, 
    prevHeroStage, 
    setHeroTransitioning,
    prefersReducedMotion,
    setCurrentScene
  } = useAppStore()

  // Refs for debouncing and touch handling
  const lastWheelTime = useRef(0)
  const lastTouchTime = useRef(0)
  const touchStartY = useRef(0)
  const isTouchActive = useRef(false)
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null)

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isHeroTransitioning) return
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        if (heroStage > 1) {
          prevHeroStage()
        }
        break
      case 'ArrowDown':
        event.preventDefault()
        if (heroStage < 4) {
          nextHeroStage()
        } else if (heroStage === 4) {
          // On stage 4, arrow down goes to Capabilities
          setCurrentScene('capabilities')
        }
        break
    }
  }, [isHeroTransitioning, nextHeroStage, prevHeroStage, heroStage, setCurrentScene])

  // Wheel navigation for desktop with debouncing
  const handleWheel = useCallback((event: WheelEvent) => {
    if (isHeroTransitioning || prefersReducedMotion || isTouchActive.current) return
    
    const now = Date.now()
    if (now - lastWheelTime.current < 100) return // Debounce 100ms
    
    // Only handle vertical wheel events
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault()
      lastWheelTime.current = now
      
      if (Math.abs(event.deltaY) > 10) { // Minimum wheel delta
        console.log(`HeroStageManager wheel: heroStage=${heroStage}, deltaY=${event.deltaY}`)
        if (event.deltaY > 0) {
          // Swipe down
          if (heroStage < 4) {
            console.log('HeroStageManager: Moving to next stage')
            nextHeroStage()
          } else if (heroStage === 4) {
            // On stage 4, swipe down goes to Capabilities
            console.log('HeroStageManager: Switching to Capabilities from stage 4')
            setCurrentScene('capabilities')
          }
        } else {
          // Swipe up - only allow on stages 2-4
          if (heroStage > 1) {
            console.log('HeroStageManager: Moving to previous stage')
            prevHeroStage()
          }
        }
      }
    }
  }, [isHeroTransitioning, prefersReducedMotion, nextHeroStage, prevHeroStage, heroStage, setCurrentScene])

  // Touch navigation for mobile with improved handling
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (isHeroTransitioning || prefersReducedMotion || isTouchActive.current) return
    
    const touch = event.touches[0]
    touchStartY.current = touch.clientY
    isTouchActive.current = true
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault()
    }
    
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchTime.current < 200) { // Debounce 200ms
        isTouchActive.current = false
        return
      }
      
      const touch = endEvent.changedTouches[0]
      const endY = touch.clientY
      const deltaY = touchStartY.current - endY
      
      if (Math.abs(deltaY) > 80) { // Increased minimum swipe distance
        lastTouchTime.current = now
        if (deltaY > 0) {
          // Swipe down
          if (heroStage < 4) {
            nextHeroStage()
          } else if (heroStage === 4) {
            // On stage 4, swipe down goes to Capabilities
            setCurrentScene('capabilities')
          }
        } else {
          // Swipe up - only allow on stages 2-4
          if (heroStage > 1) {
            prevHeroStage()
          }
        }
      }
      
      isTouchActive.current = false
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }, [isHeroTransitioning, prefersReducedMotion, nextHeroStage, prevHeroStage, heroStage, setCurrentScene])

  // Set up event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: false })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [handleKeyDown, handleWheel, handleTouchStart])

  // Reset transition flag when stage changes
  useEffect(() => {
    if (isHeroTransitioning) {
      // Clear any existing timeout
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current)
      }
      
      transitionTimeout.current = setTimeout(() => {
        setHeroTransitioning(false)
        transitionTimeout.current = null
      }, 800) // Increased timeout for more reliable transitions
      
      return () => {
        if (transitionTimeout.current) {
          clearTimeout(transitionTimeout.current)
          transitionTimeout.current = null
        }
      }
    }
  }, [heroStage, isHeroTransitioning, setHeroTransitioning])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isTouchActive.current = false
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current)
      }
    }
  }, [])

  // Render current stage
  const renderStage = () => {
    switch (heroStage) {
      case 1:
        return <HeroStage1 />
      case 2:
        return <HeroStage2 />
      case 3:
        return <HeroStage3 />
      case 4:
        return <HeroStage4 />
      default:
        return <HeroStage1 />
    }
  }

  return (
    <div className={`hero-stage-manager relative w-full h-full ${className}`}>
      {/* Main stage content */}
      <div className="absolute inset-0 z-0">
        {renderStage()}
      </div>
      
      {/* Navigation indicators */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        {[1, 2, 3, 4].map((stage) => (
          <button
            key={stage}
            onClick={() => useAppStore.getState().setHeroStage(stage as HeroStage)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              heroStage === stage
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            disabled={isHeroTransitioning}
            aria-label={`Go to stage ${stage}`}
          />
        ))}
      </div>
      
      {/* Navigation hints */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-sm z-20">
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <span className="font-mono">↑↓</span>
          <span>Navigate stages</span>
        </div>
        <div className="text-xs opacity-75">
          Stage {heroStage} of 4
        </div>
        {heroStage === 4 && (
          <div className="text-xs opacity-50 mt-1">
            Swipe down to explore capabilities →
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroStageManager
