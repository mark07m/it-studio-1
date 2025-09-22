'use client'

import { motion } from 'framer-motion'
import { useAppStore, SCENES, SceneType } from '@/store/appStore'
import { useState } from 'react'

const GlassHeader = () => {
  const { 
    currentScene, 
    setCurrentScene, 
    soundEnabled, 
    theme, 
    language, 
    toggleSound, 
    toggleTheme, 
    toggleLanguage,
    toggleCmdK 
  } = useAppStore()
  
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const handleSceneChange = (scene: SceneType) => {
    if (currentScene === scene) return
    setCurrentScene(scene)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-16 px-6"
    >
      <div className="h-full w-full backdrop-blur-[16px] bg-white/10 border border-white/30 rounded-2xl mx-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_rgba(0,255,255,0.5)]">
        <div className="h-full flex items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
            onClick={() => handleSceneChange('hero')}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
              animate={{
                scale: isLogoHovered ? 1.1 : 1,
                boxShadow: isLogoHovered 
                  ? '0 0 20px rgba(0, 255, 255, 0.6)' 
                  : '0 0 0px rgba(0, 255, 255, 0)'
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-sm">IT</span>
            </motion.div>
            <span className="text-white font-semibold text-lg">Studio</span>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {Object.entries(SCENES).map(([scene, config], index) => (
              <motion.button
                key={scene}
                onClick={() => handleSceneChange(scene as SceneType)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                  currentScene === scene
                    ? 'text-cyan-300 bg-cyan-400/30'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {config.title}
                {/* Progress indicator */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: currentScene === scene ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Scene number indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400/20 rounded-full flex items-center justify-center text-xs text-cyan-300">
                  {index + 1}
                </div>
              </motion.button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Sound Toggle */}
            <motion.button
              onClick={toggleSound}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {language === 'en' ? 'EN' : 'RU'}
            </motion.button>

            {/* CmdK */}
            <motion.button
              onClick={toggleCmdK}
              className="px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⌘K
            </motion.button>

            {/* Profile */}
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold">
                U
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default GlassHeader
