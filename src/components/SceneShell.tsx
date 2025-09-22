'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, SCENES, SceneType } from '@/store/appStore'
import { useEffect, useState } from 'react'

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

  // FSM для управления переходами между сценами
  useEffect(() => {
    if (isTransitioning) return

    if (displayScene !== currentScene) {
      // Начинаем переход
      setTransitioning(true)
      setSceneState('out')
      
      // После анимации выхода
      setTimeout(() => {
        setDisplayScene(currentScene)
        setSceneState('in')
        
        // После анимации входа
        setTimeout(() => {
          setSceneState('ready')
          setTransitioning(false)
        }, 600)
      }, 300)
    }
  }, [currentScene, displayScene, isTransitioning, setSceneState, setTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      const scenes = Object.keys(SCENES) as SceneType[]
      const currentIndex = scenes.indexOf(currentScene)

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (currentIndex > 0) {
            useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          if (currentIndex < scenes.length - 1) {
            useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
          }
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          // Можно добавить логику для активации сцены
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentScene, isTransitioning])

  // Wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null
    let isScrolling = false

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || isScrolling) return

      e.preventDefault()
      isScrolling = true

      const scenes = Object.keys(SCENES) as SceneType[]
      const currentIndex = scenes.indexOf(currentScene)

      // Определяем направление скролла
      const deltaY = e.deltaY
      const threshold = 50 // Минимальное значение для срабатывания

      if (Math.abs(deltaY) < threshold) {
        isScrolling = false
        return
      }

      if (deltaY > 0) {
        // Скролл вниз - следующая сцена
        if (currentIndex < scenes.length - 1) {
          useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
        }
      } else {
        // Скролл вверх - предыдущая сцена
        if (currentIndex > 0) {
          useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
        }
      }

      // Блокируем повторные срабатывания на 800ms
      if (wheelTimeout) clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        isScrolling = false
      }, 800)
    }

    // Добавляем passive: false для возможности preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (wheelTimeout) clearTimeout(wheelTimeout)
    }
  }, [currentScene, isTransitioning])

  // Touch navigation for mobile devices
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0
    let touchTimeout: NodeJS.Timeout | null = null
    let isTouching = false

    const handleTouchStart = (e: TouchEvent) => {
      if (isTransitioning || isTouching) return
      touchStartY = e.touches[0].clientY
      isTouching = true
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning || !isTouching) return
      
      touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const threshold = 50

      if (Math.abs(deltaY) < threshold) {
        isTouching = false
        return
      }

      const scenes = Object.keys(SCENES) as SceneType[]
      const currentIndex = scenes.indexOf(currentScene)

      if (deltaY > 0) {
        // Swipe up - next scene
        if (currentIndex < scenes.length - 1) {
          useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
        }
      } else {
        // Swipe down - previous scene
        if (currentIndex > 0) {
          useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
        }
      }

      // Block repeated triggers for 800ms
      if (touchTimeout) clearTimeout(touchTimeout)
      touchTimeout = setTimeout(() => {
        isTouching = false
      }, 800)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      if (touchTimeout) clearTimeout(touchTimeout)
    }
  }, [currentScene, isTransitioning])

  const sceneVariants = {
    idle: { opacity: 1, scale: 1, y: 0 },
    out: { 
      opacity: 0, 
      scale: 0.95, 
      y: 50,
      transition: { duration: 0.3, ease: 'easeIn' as const }
    },
    in: { 
      opacity: 0, 
      scale: 1.05, 
      y: -50,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    },
    ready: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Dot Navigation */}
      <nav className="absolute top-4 sm:top-6 left-1/2 z-40" style={{ transform: 'translateX(-50%)' }} aria-label="Scene navigation">
        {/* note: moved transform to inline style to avoid backdrop-filter blocking */}
        <div className="flex space-x-2" role="tablist">
          {Object.entries(SCENES).map(([scene, config], index) => (
            <motion.button
              key={scene}
              onClick={() => setCurrentScene(scene as SceneType)}
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
      <AnimatePresence mode="wait">
        <motion.div
          key={displayScene}
          variants={sceneVariants}
          initial="in"
          animate={sceneState}
          className="w-full h-full overflow-hidden"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Now visible on mobile */}
      <div className="absolute top-1/2 left-2 sm:left-4 z-40" style={{ transform: 'translateY(-50%)' }}>
        {/* note: moved transform to inline style to avoid backdrop-filter blocking */}
        <motion.button
          onClick={() => {
            const scenes = Object.keys(SCENES) as SceneType[]
            const currentIndex = scenes.indexOf(currentScene)
            if (currentIndex > 0) {
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

      {/* Scroll Hint - Only show on Hero scene */}
      {currentScene === 'hero' && (
        <motion.div
          className="hidden md:block absolute bottom-8 left-1/2 z-40"
          style={{ transform: 'translateX(-50%)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {/* note: moved transform to inline style to avoid backdrop-filter blocking */}
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
      )}
    </div>
  )
}

export default SceneShell
