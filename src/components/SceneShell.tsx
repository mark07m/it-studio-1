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
    <div className="relative w-full h-full">
      {/* Dot Navigation */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-2">
          {Object.entries(SCENES).map(([scene]) => (
            <motion.button
              key={scene}
              onClick={() => setCurrentScene(scene as SceneType)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentScene === scene
                  ? 'bg-cyan-300 scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Scene Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayScene}
          variants={sceneVariants}
          initial="in"
          animate={sceneState}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40">
        <motion.button
          onClick={() => {
            const scenes = Object.keys(SCENES) as SceneType[]
            const currentIndex = scenes.indexOf(currentScene)
            if (currentIndex > 0) {
              useAppStore.getState().setCurrentScene(scenes[currentIndex - 1])
            }
          }}
          className="w-12 h-12 rounded-full backdrop-blur-[16px] bg-white/15 border border-white/30 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isTransitioning}
        >
          ←
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40">
        <motion.button
          onClick={() => {
            const scenes = Object.keys(SCENES) as SceneType[]
            const currentIndex = scenes.indexOf(currentScene)
            if (currentIndex < scenes.length - 1) {
              useAppStore.getState().setCurrentScene(scenes[currentIndex + 1])
            }
          }}
          className="w-12 h-12 rounded-full backdrop-blur-[16px] bg-white/15 border border-white/30 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isTransitioning}
        >
          →
        </motion.button>
      </div>

      {/* Scene Info */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40">
        <motion.div
          className="backdrop-blur-[16px] bg-white/15 border border-white/30 rounded-lg px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-white font-semibold text-sm">
            {SCENES[displayScene].title}
          </h3>
          <p className="text-white/80 text-xs">
            {SCENES[displayScene].description}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SceneShell
