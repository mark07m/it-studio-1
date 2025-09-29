'use client'

import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, ProcessStage } from '@/store/appStore'
import ProcessBackground from './backgrounds/ProcessBackground'
import ProcessStage1 from './stages/ProcessStage1'
import ProcessStage2 from './stages/ProcessStage2'
import ProcessStage3 from './stages/ProcessStage3'
import ProcessStage4 from './stages/ProcessStage4'
import ProcessStage5 from './stages/ProcessStage5'
import StepRail from './ui/StepRail'

const ProcessStageManager = () => {
  const { 
    processStage, 
    isProcessTransitioning, 
    setProcessTransitioning,
    nextProcessStage,
    prevProcessStage,
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
    if (isProcessTransitioning) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (processStage < 5) {
          nextProcessStage()
        } else if (processStage === 5) {
          // На 5-й странице переход в Technologies
          setCurrentScene('technologies')
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (processStage > 1) {
          prevProcessStage()
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        // Переход в Portfolio
        setCurrentScene('portfolio')
        break
      case 'ArrowRight':
        e.preventDefault()
        // Переход в Technologies
        setCurrentScene('technologies')
        break
    }
  }, [isProcessTransitioning, nextProcessStage, prevProcessStage, processStage, setCurrentScene])

  // Обработка колеса мыши с дебаунсингом
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isProcessTransitioning || prefersReducedMotion || isTouchActive.current) return
    
    const now = Date.now()
    if (now - lastWheelTime.current < 100) return // Debounce 100ms
    
    // Only handle vertical wheel events
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      lastWheelTime.current = now
      
      if (Math.abs(e.deltaY) > 10) { // Minimum wheel delta
        if (e.deltaY > 0) {
          // Swipe down
          if (processStage < 5) {
            nextProcessStage()
          } else if (processStage === 5) {
            // На 5-й странице переход в Technologies
            setCurrentScene('technologies')
          }
        } else {
          // Swipe up
          if (processStage > 1) {
            prevProcessStage()
          }
        }
      }
    }
  }, [isProcessTransitioning, prefersReducedMotion, nextProcessStage, prevProcessStage, processStage, setCurrentScene])

  // Обработка touch событий с улучшенной логикой
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isProcessTransitioning || prefersReducedMotion || isTouchActive.current) return
    
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
          if (processStage < 5) {
            nextProcessStage()
          } else if (processStage === 5) {
            // На 5-й странице переход в Technologies
            setCurrentScene('technologies')
          }
        } else {
          // Swipe up
          if (processStage > 1) {
            prevProcessStage()
          }
        }
      }
      
      isTouchActive.current = false
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }, [isProcessTransitioning, prefersReducedMotion, nextProcessStage, prevProcessStage, processStage, setCurrentScene])

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
    if (isProcessTransitioning) {
      // Clear any existing timeout
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current)
      }
      
      transitionTimeout.current = setTimeout(() => {
        setProcessTransitioning(false)
        transitionTimeout.current = null
      }, 800) // Increased timeout for more reliable transitions
      
      return () => {
        if (transitionTimeout.current) {
          clearTimeout(transitionTimeout.current)
          transitionTimeout.current = null
        }
      }
    }
  }, [processStage, isProcessTransitioning, setProcessTransitioning])

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
    1: ProcessStage1,
    2: ProcessStage2,
    3: ProcessStage3,
    4: ProcessStage4,
    5: ProcessStage5,
  }

  const CurrentStage = stageComponents[processStage as keyof typeof stageComponents]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Фон с 3D элементами */}
      <ProcessBackground className="absolute inset-0 z-0" />
      
      {/* StepRail - вертикальный индикатор шагов */}
      <StepRail 
        currentStage={processStage}
        totalStages={5}
        onStageClick={(stage) => useAppStore.getState().setProcessStage(stage as ProcessStage)}
        isTransitioning={isProcessTransitioning}
        className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30"
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={processStage}
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
      
      {/* Навигационные подсказки */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-sm z-40">
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <span className="font-mono">↑↓</span>
          <span>Navigate stages</span>
          <span className="font-mono">←→</span>
          <span>Switch scenes</span>
        </div>
        <div className="text-xs opacity-75">
          Stage {processStage} of 5
        </div>
        {processStage === 5 && (
          <div className="text-xs opacity-50 mt-1">
            Swipe down to explore technologies →
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcessStageManager
