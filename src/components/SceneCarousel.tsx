'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, SCENES, SceneType } from '@/store/appStore'
import { useEffect, useState, useCallback, useRef } from 'react'
import HeroScene from './scenes/HeroScene'
import CapabilitiesScene from './scenes/CapabilitiesScene'
import PortfolioScene from './scenes/PortfolioScene'
import ProcessScene from './scenes/ProcessScene'
import TechnologiesScene from './scenes/TechnologiesScene'
import PricingScene from './scenes/PricingScene'
import ContactScene from './scenes/ContactScene'

interface SceneCarouselProps {
  children?: React.ReactNode
}

const SceneCarousel = () => {
  const { currentScene, setCurrentScene } = useAppStore()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null)
  const isTransitioningRef = useRef(false)
  const scenes = Object.keys(SCENES) as SceneType[]
  const currentIndex = scenes.indexOf(currentScene)

  // Функция рендеринга сцен
  const renderScene = (scene: SceneType) => {
    switch (scene) {
      case 'hero':
        return <HeroScene />
      case 'capabilities':
        return <CapabilitiesScene />
      case 'portfolio':
        return <PortfolioScene />
      case 'process':
        return <ProcessScene />
      case 'technologies':
        return <TechnologiesScene />
      case 'pricing':
        return <PricingScene />
      case 'contact':
        return <ContactScene />
      default:
        return <HeroScene />
    }
  }

  // Обработчик навигации
  const navigateToScene = useCallback((newIndex: number, direction: 'left' | 'right') => {
    if (isTransitioningRef.current || newIndex < 0 || newIndex >= scenes.length) return
    
    isTransitioningRef.current = true
    setIsTransitioning(true)
    setTransitionDirection(direction)
    setCurrentScene(scenes[newIndex])
    
    // Завершаем переход после анимации
    setTimeout(() => {
      isTransitioningRef.current = false
      setIsTransitioning(false)
      setTransitionDirection(null)
    }, 500)
  }, [scenes, setCurrentScene])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioningRef.current) return

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        if (currentIndex > 0) {
          navigateToScene(currentIndex - 1, 'right') // Сцена появляется слева
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (currentIndex < scenes.length - 1) {
          navigateToScene(currentIndex + 1, 'left') // Сцена появляется справа
        }
        break
    }
  }, [currentIndex, navigateToScene, scenes.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Wheel navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioningRef.current) return

    e.preventDefault()
    const deltaY = e.deltaY
    const threshold = 50

    if (Math.abs(deltaY) < threshold) return

    if (deltaY > 0) {
      // Скролл вниз - следующая сцена
      if (currentIndex < scenes.length - 1) {
        navigateToScene(currentIndex + 1, 'left') // Сцена появляется справа
      }
    } else {
      // Скролл вверх - предыдущая сцена
      if (currentIndex > 0) {
        navigateToScene(currentIndex - 1, 'right') // Сцена появляется слева
      }
    }
  }, [currentIndex, navigateToScene, scenes.length])

  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 768 || ('ontouchstart' in window)
    if (isMobileOrTablet) return

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  // Touch navigation
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isTransitioningRef.current) return
    touchStartX.current = e.touches[0].clientX
    isTouching.current = true
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isTransitioningRef.current || !isTouching.current) return
    
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchStartX.current - touchEndX
    const threshold = 50

    if (Math.abs(deltaX) < threshold) {
      isTouching.current = false
      return
    }

    if (deltaX > 0) {
      // Swipe left - next scene
      if (currentIndex < scenes.length - 1) {
        navigateToScene(currentIndex + 1, 'left') // Сцена появляется справа
      }
    } else {
      // Swipe right - previous scene
      if (currentIndex > 0) {
        navigateToScene(currentIndex - 1, 'right') // Сцена появляется слева
      }
    }

    isTouching.current = false
  }, [currentIndex, navigateToScene, scenes.length])

  const touchStartX = useRef(0)
  const isTouching = useRef(false)

  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 768 || ('ontouchstart' in window)
    if (!isMobileOrTablet) return

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd])

  // Варианты анимации
  const sceneVariants = {
    initial: (direction: 'left' | 'right' | null) => ({
      opacity: 0,
      scale: 0.95,
      x: direction === 'left' ? '-100%' : '100%'
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0.0, 0.2, 1] as const
      }
    },
    exit: (direction: 'left' | 'right' | null) => ({
      opacity: 0,
      scale: 0.95,
      x: direction === 'left' ? '100%' : '-100%',
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0.0, 0.2, 1] as const
      }
    })
  }

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Dot Navigation */}
      <nav className="absolute top-4 sm:top-6 left-1/2 z-40" style={{ transform: 'translateX(-50%)' }}>
        <div className="flex space-x-2" role="tablist">
          {scenes.map((scene, index) => (
            <motion.button
              key={scene}
              onClick={() => {
                const direction = index > currentIndex ? 'left' : 'right'
                navigateToScene(index, direction)
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentScene === scene
                  ? 'bg-cyan-300 scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              role="tab"
              aria-selected={currentScene === scene}
              aria-label={`Go to ${SCENES[scene].title} section`}
            />
          ))}
        </div>
      </nav>

      {/* Scene Content */}
      <div 
        className="relative w-full h-full overflow-hidden flex-1"
        style={{
          contain: 'layout style paint',
          willChange: 'transform'
        }}
      >
        <AnimatePresence mode="wait" custom={transitionDirection}>
          <motion.div
            key={currentScene}
            custom={transitionDirection}
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute inset-0 w-full h-full ${
              currentScene !== 'hero' ? 'md:max-w-6xl md:mx-auto' : ''
            }`}
            style={{ 
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              isolation: 'isolate',
              zIndex: 10
            }}
          >
            {renderScene(currentScene)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-2 sm:left-4 z-40" style={{ transform: 'translateY(-50%)' }}>
        <motion.button
          onClick={() => {
            if (currentIndex > 0) {
              navigateToScene(currentIndex - 1, 'right') // Сцена появляется слева
            }
          }}
          className={`glass w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:glass-dark transition-all duration-300 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
          whileTap={{ scale: currentIndex === 0 ? 1 : 0.9 }}
          disabled={isTransitioning || currentIndex === 0}
          aria-label="Previous section"
          title="Previous section"
        >
          <span className="text-lg sm:text-xl" aria-hidden="true">←</span>
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-2 sm:right-4 z-40" style={{ transform: 'translateY(-50%)' }}>
        <motion.button
          onClick={() => {
            if (currentIndex < scenes.length - 1) {
              navigateToScene(currentIndex + 1, 'left') // Сцена появляется справа
            }
          }}
          className={`glass w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:glass-dark transition-all duration-300 ${
            currentIndex === scenes.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: currentIndex === scenes.length - 1 ? 1 : 1.1 }}
          whileTap={{ scale: currentIndex === scenes.length - 1 ? 1 : 0.9 }}
          disabled={isTransitioning || currentIndex === scenes.length - 1}
          aria-label="Next section"
          title="Next section"
        >
          <span className="text-lg sm:text-xl" aria-hidden="true">→</span>
        </motion.button>
      </div>

      {/* Scene Info */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 z-40" style={{ transform: 'translateX(-50%)' }}>
        <motion.div
          className="glass rounded-lg px-3 sm:px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-white font-semibold text-xs sm:text-sm text-center">
            {SCENES[currentScene].title}
          </h3>
          <p className="text-white/80 text-xs text-center max-w-xs sm:max-w-none">
            {SCENES[currentScene].description}
          </p>
        </motion.div>
      </div>

      {/* Navigation Hint */}
      {currentScene === 'hero' && (
        <>
          {/* Desktop scroll hint */}
          <motion.div
            className="hidden md:block fixed bottom-6 left-[46.5%] z-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <motion.div
                className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  className="w-1 h-3 bg-white/70 rounded-full mt-2"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
              <p className="text-white/60 text-xs">Scroll to navigate</p>
            </div>
          </motion.div>

          {/* Mobile/Tablet swipe hint */}
          <motion.div
            className="block md:hidden fixed bottom-6 left-1/2 z-50"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <motion.div
                className="w-10 h-6 border-2 border-white/50 rounded-full flex items-center justify-center"
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  className="w-3 h-1 bg-white/70 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
              <p className="text-white/60 text-xs">Swipe to navigate</p>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default SceneCarousel