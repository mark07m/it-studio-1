'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import CapabilitiesBackground from './backgrounds/CapabilitiesBackground'
import CapabilityStage1 from './stages/CapabilityStage1'
import CapabilityStage2 from './stages/CapabilityStage2'
import CapabilityStage3 from './stages/CapabilityStage3'
import CapabilityStage4 from './stages/CapabilityStage4'
import CapabilityStage5 from './stages/CapabilityStage5'
import CapabilityStage6 from './stages/CapabilityStage6'
import CapabilityStage7 from './stages/CapabilityStage7'
import CapabilityStage8 from './stages/CapabilityStage8'

const CapabilitiesStageManager = () => {
  const { 
    capabilityStage, 
    isCapabilityTransitioning, 
    setCapabilityTransitioning,
    nextCapabilityStage,
    prevCapabilityStage,
    prefersReducedMotion,
    setCurrentScene
  } = useAppStore()

  // Обработка клавиатуры
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isCapabilityTransitioning) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (capabilityStage === 8) {
          // На 8-й странице переход в Portfolio
          setCurrentScene('portfolio')
        } else {
          nextCapabilityStage()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        prevCapabilityStage()
        break
    }
  }, [isCapabilityTransitioning, nextCapabilityStage, prevCapabilityStage, capabilityStage, setCurrentScene])

  // Обработка колеса мыши
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isCapabilityTransitioning) return

    e.preventDefault()
    if (e.deltaY > 0) {
      if (capabilityStage === 8) {
        // На 8-й странице переход в Portfolio
        setCurrentScene('portfolio')
      } else {
        nextCapabilityStage()
      }
    } else if (e.deltaY < 0) {
      prevCapabilityStage()
    }
  }, [isCapabilityTransitioning, nextCapabilityStage, prevCapabilityStage, capabilityStage, setCurrentScene])

  // Обработка touch событий
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isCapabilityTransitioning) return
    
    const touch = e.touches[0]
    const startY = touch.clientY
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentTouch = moveEvent.touches[0]
      const deltaY = startY - currentTouch.clientY
      
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          if (capabilityStage === 8) {
            // На 8-й странице переход в Portfolio
            setCurrentScene('portfolio')
          } else {
            nextCapabilityStage()
          }
        } else {
          prevCapabilityStage()
        }
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }, [isCapabilityTransitioning, nextCapabilityStage, prevCapabilityStage, capabilityStage, setCurrentScene])

  useEffect(() => {
    // Добавляем обработчики событий
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: false })

    // Сброс состояния перехода через 500мс
    if (isCapabilityTransitioning) {
      const timer = setTimeout(() => {
        setCapabilityTransitioning(false)
      }, 500)
      return () => clearTimeout(timer)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [handleKeyDown, handleWheel, handleTouchStart, isCapabilityTransitioning, setCapabilityTransitioning])

  const stageComponents = {
    1: CapabilityStage1,
    2: CapabilityStage2,
    3: CapabilityStage3,
    4: CapabilityStage4,
    5: CapabilityStage5,
    6: CapabilityStage6,
    7: CapabilityStage7,
    8: CapabilityStage8,
  }

  const CurrentStage = stageComponents[capabilityStage as keyof typeof stageComponents]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Фон как в Hero, но с кубом вместо сферы */}
      <CapabilitiesBackground className="absolute inset-0 z-0" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={capabilityStage}
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
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i + 1 === capabilityStage 
                  ? 'bg-cyan-400' 
                  : 'bg-white/30'
              }`}
              animate={{
                scale: i + 1 === capabilityStage ? 1.2 : 1,
                opacity: i + 1 === capabilityStage ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CapabilitiesStageManager
