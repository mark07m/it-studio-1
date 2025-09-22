'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, SCENES, SceneType } from '@/store/appStore'
import { useEffect, useState, useMemo, useCallback, useRef } from 'react'

interface SceneShellProps {
  children: React.ReactNode
}

const SceneShell = ({ children }: SceneShellProps) => {
  const { 
    currentScene, 
    sceneState, 
    isTransitioning, 
    setCurrentScene,
    setSceneState, 
    setTransitioning 
  } = useAppStore()
  
  const [displayScene, setDisplayScene] = useState<SceneType>(currentScene)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null)

  // FSM для управления переходами между сценами
  useEffect(() => {
    if (isTransitioning) return

    if (displayScene !== currentScene) {
      // Направление уже установлено в кнопках навигации
      // Начинаем переход - сначала анимация выхода старой сцены
      setTransitioning(true)
      setSceneState('out')
      
      // После анимации выхода - меняем сцену и показываем новую
      setTimeout(() => {
        setDisplayScene(currentScene)
        setSceneState('in')
        
        // После анимации входа
        setTimeout(() => {
          setSceneState('ready')
          setTransitioning(false)
          setTransitionDirection(null)
        }, 300)
      }, 300)
    }
  }, [currentScene, displayScene, isTransitioning, setSceneState, setTransitioning])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioning) return

    const scenes = Object.keys(SCENES) as SceneType[]
    const currentIndex = scenes.indexOf(currentScene)

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        if (currentIndex > 0) {
          setTransitionDirection('left')
          useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (currentIndex < scenes.length - 1) {
          setTransitionDirection('right')
          useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        // Можно добавить логику для активации сцены
        break
    }
  }, [currentScene, isTransitioning])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Wheel navigation - Only for desktop devices
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioning) return

    e.preventDefault()

    const scenes = Object.keys(SCENES) as SceneType[]
    const currentIndex = scenes.indexOf(currentScene)

    // Определяем направление скролла
    const deltaY = e.deltaY
    const threshold = 50 // Минимальное значение для срабатывания

    if (Math.abs(deltaY) < threshold) return

    if (deltaY > 0) {
      // Скролл вниз - следующая сцена
      if (currentIndex < scenes.length - 1) {
        setTransitionDirection('right')
        useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
      }
    } else {
      // Скролл вверх - предыдущая сцена
      if (currentIndex > 0) {
        setTransitionDirection('left')
        useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
      }
    }
  }, [currentScene, isTransitioning])

  useEffect(() => {
    // Check if device is mobile/tablet
    const isMobileOrTablet = window.innerWidth < 768 || ('ontouchstart' in window)
    if (isMobileOrTablet) return

    // Добавляем passive: false для возможности preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  // Touch navigation for mobile and tablet devices (horizontal swipe)
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isTransitioning) return
    touchStartX.current = e.touches[0].clientX
    isTouching.current = true
  }, [isTransitioning])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isTransitioning || !isTouching.current) return
    
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchStartX.current - touchEndX
    const threshold = 50

    if (Math.abs(deltaX) < threshold) {
      isTouching.current = false
      return
    }

    const scenes = Object.keys(SCENES) as SceneType[]
    const currentIndex = scenes.indexOf(currentScene)

    if (deltaX > 0) {
      // Swipe left - next scene
      if (currentIndex < scenes.length - 1) {
        setTransitionDirection('right')
        useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
      }
    } else {
      // Swipe right - previous scene
      if (currentIndex > 0) {
        setTransitionDirection('left')
        useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
      }
    }

    isTouching.current = false
  }, [currentScene, isTransitioning])

  const touchStartX = useRef(0)
  const isTouching = useRef(false)

  useEffect(() => {
    // Check if device is mobile/tablet
    const isMobileOrTablet = window.innerWidth < 768 || ('ontouchstart' in window)
    if (!isMobileOrTablet) return

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd])

  const sceneVariants = useMemo(() => {
    const isLeftTransition = transitionDirection === 'left'
    
    return {
      idle: { 
        opacity: 1, 
        scale: 1, 
        x: 0, 
        y: 0 
      },
      out: { 
        opacity: 1, 
        scale: 1, 
        x: isLeftTransition ? '100%' : '-100%', // Сдвигаем за пределы контейнера
        y: 0,
        transition: { 
          duration: 0.3, 
          ease: [0.4, 0.0, 0.2, 1] as const // Быстрый выход
        }
      },
      in: { 
        opacity: 1, 
        scale: 1, 
        x: isLeftTransition ? '-100%' : '100%', // Начинаем с противоположной стороны
        y: 0,
        transition: { 
          duration: 0.3, 
          ease: [0.4, 0.0, 0.2, 1] as const // Быстрый вход
        }
      },
      ready: { 
        opacity: 1, 
        scale: 1, 
        x: 0,
        y: 0,
        transition: { 
          duration: 0.3, 
          ease: [0.4, 0.0, 0.2, 1] as const
        }
      }
    }
  }, [transitionDirection])

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Dot Navigation */}
      <nav className="absolute top-4 sm:top-6 left-1/2 z-40" style={{ transform: 'translateX(-50%)' }} aria-label="Scene navigation">
        {/* note: moved transform to inline style to avoid backdrop-filter blocking */}
        <div className="flex space-x-2" role="tablist">
          {Object.entries(SCENES).map(([scene, config], index) => (
            <motion.button
              key={scene}
              onClick={() => {
                const scenes = Object.keys(SCENES) as SceneType[]
                const currentIndex = scenes.indexOf(currentScene)
                const targetIndex = scenes.indexOf(scene as SceneType)
                const direction = targetIndex > currentIndex ? 'right' : 'left'
                setTransitionDirection(direction)
                setCurrentScene(scene as SceneType)
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
              aria-label={`Go to ${config.title} section`}
              tabIndex={currentScene === scene ? 0 : -1}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={displayScene}
            variants={sceneVariants}
            initial="in"
            animate={sceneState}
            exit="out"
            className={`absolute inset-0 w-full h-full ${
              displayScene !== 'hero' ? 'md:max-w-6xl md:mx-auto' : ''
            }`}
            style={{ 
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              isolation: 'isolate',
              zIndex: 10
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Now visible on mobile */}
      <div className="absolute top-1/2 left-2 sm:left-4 z-40" style={{ transform: 'translateY(-50%)' }}>
        {/* note: moved transform to inline style to avoid backdrop-filter blocking */}
        <motion.button
          onClick={() => {
            const scenes = Object.keys(SCENES) as SceneType[]
            const currentIndex = scenes.indexOf(currentScene)
            if (currentIndex > 0) {
              setTransitionDirection('left')
              useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
            }
          }}
          className="glass w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:glass-dark transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isTransitioning}
          aria-label="Previous section"
          title="Previous section"
        >
          <span className="text-lg sm:text-xl" aria-hidden="true">←</span>
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-2 sm:right-4 z-40" style={{ transform: 'translateY(-50%)' }}>
        {/* note: moved transform to inline style to avoid backdrop-filter blocking */}
        <motion.button
          onClick={() => {
            const scenes = Object.keys(SCENES) as SceneType[]
            const currentIndex = scenes.indexOf(currentScene)
            if (currentIndex < scenes.length - 1) {
              setTransitionDirection('right')
              useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
            }
          }}
          className="glass w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:glass-dark transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isTransitioning}
          aria-label="Next section"
          title="Next section"
        >
          <span className="text-lg sm:text-xl" aria-hidden="true">→</span>
        </motion.button>
      </div>

      {/* Scene Info */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 z-40" style={{ transform: 'translateX(-50%)' }}>
        {/* note: moved transform to inline style to avoid backdrop-filter blocking */}
        <motion.div
          className="glass rounded-lg px-3 sm:px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-white font-semibold text-xs sm:text-sm text-center">
            {SCENES[displayScene].title}
          </h3>
          <p className="text-white/80 text-xs text-center max-w-xs sm:max-w-none">
            {SCENES[displayScene].description}
          </p>
        </motion.div>
      </div>

      {/* Navigation Hint - Different for mobile/tablet and desktop */}
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

export default SceneShell
