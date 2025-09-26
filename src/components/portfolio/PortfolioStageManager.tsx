'use client'

import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import PortfolioBackground from './backgrounds/PortfolioBackground'
import PortfolioStage1 from './stages/PortfolioStage1'
import PortfolioStage2 from './stages/PortfolioStage2'
import PortfolioStage3 from './stages/PortfolioStage3'
import PortfolioStage4 from './stages/PortfolioStage4'

const PortfolioStageManager = () => {
  const { 
    portfolioStage, 
    isPortfolioTransitioning, 
    setPortfolioTransitioning,
    nextPortfolioStage,
    prevPortfolioStage,
    prefersReducedMotion,
    setCurrentScene
  } = useAppStore()

  // Refs for debouncing and touch handling
  const lastWheelTime = useRef(0)
  const lastTouchTime = useRef(0)
  const touchStartY = useRef(0)
  const isTouchActive = useRef(false)
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null)

  // Обработка клавиатуры
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isPortfolioTransitioning) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (portfolioStage < 4) {
          nextPortfolioStage()
        } else if (portfolioStage === 4) {
          // На 4-й странице переход в Process
          setCurrentScene('process')
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (portfolioStage > 1) {
          prevPortfolioStage()
        } else if (portfolioStage === 1) {
          // На 1-й странице переход в Capabilities
          setCurrentScene('capabilities')
        }
        break
    }
  }, [isPortfolioTransitioning, nextPortfolioStage, prevPortfolioStage, portfolioStage, setCurrentScene])

  // Обработка колеса мыши с дебаунсингом
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isPortfolioTransitioning || prefersReducedMotion || isTouchActive.current) return
    
    const now = Date.now()
    if (now - lastWheelTime.current < 100) return // Debounce 100ms
    
    // Only handle vertical wheel events
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      lastWheelTime.current = now
      
      if (Math.abs(e.deltaY) > 10) { // Minimum wheel delta
        if (e.deltaY > 0) {
          // Swipe down
          if (portfolioStage < 4) {
            nextPortfolioStage()
          } else if (portfolioStage === 4) {
            // На 4-й странице переход в Process
            setCurrentScene('process')
          }
        } else {
          // Swipe up
          if (portfolioStage > 1) {
            prevPortfolioStage()
          } else if (portfolioStage === 1) {
            // На 1-й странице переход в Capabilities
            setCurrentScene('capabilities')
          }
        }
      }
    }
  }, [isPortfolioTransitioning, prefersReducedMotion, nextPortfolioStage, prevPortfolioStage, portfolioStage, setCurrentScene])

  // Обработка touch событий с улучшенной логикой
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isPortfolioTransitioning || prefersReducedMotion || isTouchActive.current) return
    
    const touch = e.touches[0]
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
          if (portfolioStage < 4) {
            nextPortfolioStage()
          } else if (portfolioStage === 4) {
            // На 4-й странице переход в Process
            setCurrentScene('process')
          }
        } else {
          // Swipe up
          if (portfolioStage > 1) {
            prevPortfolioStage()
          } else if (portfolioStage === 1) {
            // На 1-й странице переход в Capabilities
            setCurrentScene('capabilities')
          }
        }
      }
      
      isTouchActive.current = false
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }, [isPortfolioTransitioning, prefersReducedMotion, nextPortfolioStage, prevPortfolioStage, portfolioStage, setCurrentScene])

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
    if (isPortfolioTransitioning) {
      // Clear any existing timeout
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current)
      }
      
      transitionTimeout.current = setTimeout(() => {
        setPortfolioTransitioning(false)
        transitionTimeout.current = null
      }, 800) // Increased timeout for more reliable transitions
      
      return () => {
        if (transitionTimeout.current) {
          clearTimeout(transitionTimeout.current)
          transitionTimeout.current = null
        }
      }
    }
  }, [portfolioStage, isPortfolioTransitioning, setPortfolioTransitioning])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isTouchActive.current = false
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current)
      }
    }
  }, [])

  const stageComponents = {
    1: PortfolioStage1,
    2: PortfolioStage2,
    3: PortfolioStage3,
    4: PortfolioStage4,
  }

  const CurrentStage = stageComponents[portfolioStage as keyof typeof stageComponents]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D фон с звездой */}
      <PortfolioBackground className="absolute inset-0 z-0" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={portfolioStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.6,
            ease: "easeInOut"
          }}
          className="w-full h-full relative z-10"
        >
          <CurrentStage />
        </motion.div>
      </AnimatePresence>
      
      {/* Индикаторы навигации */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-2">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i + 1 === portfolioStage 
                  ? 'bg-purple-400' 
                  : 'bg-white/30'
              }`}
              animate={{
                scale: i + 1 === portfolioStage ? 1.2 : 1,
                opacity: i + 1 === portfolioStage ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortfolioStageManager
