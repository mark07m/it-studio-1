'use client'

import { useEffect, useCallback } from 'react'
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
    prefersReducedMotion 
  } = useAppStore()

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isHeroTransitioning) return
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        prevHeroStage()
        break
      case 'ArrowDown':
        event.preventDefault()
        nextHeroStage()
        break
    }
  }, [isHeroTransitioning, nextHeroStage, prevHeroStage])

  // Wheel navigation for desktop
  const handleWheel = useCallback((event: WheelEvent) => {
    if (isHeroTransitioning || prefersReducedMotion) return
    
    event.preventDefault()
    
    if (event.deltaY > 0) {
      nextHeroStage()
    } else if (event.deltaY < 0) {
      prevHeroStage()
    }
  }, [isHeroTransitioning, prefersReducedMotion, nextHeroStage, prevHeroStage])

  // Touch navigation for mobile
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (isHeroTransitioning || prefersReducedMotion) return
    
    const touch = event.touches[0]
    const startY = touch.clientY
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault()
    }
    
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touch = endEvent.changedTouches[0]
      const endY = touch.clientY
      const deltaY = startY - endY
      
      if (Math.abs(deltaY) > 50) { // Minimum swipe distance
        if (deltaY > 0) {
          nextHeroStage()
        } else {
          prevHeroStage()
        }
      }
      
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }, [isHeroTransitioning, prefersReducedMotion, nextHeroStage, prevHeroStage])

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
      const timer = setTimeout(() => {
        setHeroTransitioning(false)
      }, 600)
      
      return () => clearTimeout(timer)
    }
  }, [heroStage, isHeroTransitioning, setHeroTransitioning])

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
            Ready to explore capabilities →
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroStageManager
