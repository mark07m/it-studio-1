'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, SCENES, SceneType } from '@/store/appStore'
import { useState } from 'react'
import { useSkin } from '@/hooks/useSkin'

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
  
  const { currentSkin, nextSkin, skinConfig } = useSkin()
  
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSceneChange = (scene: SceneType) => {
    if (currentScene === scene) return
    setCurrentScene(scene)
    setIsMobileMenuOpen(false) // Закрываем мобильное меню при выборе сцены
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-2 sm:top-4 left-2 right-2 sm:left-4 sm:right-4 z-50 h-14 sm:h-16"
      >
        <div className="glass h-full w-full">
          <div className="h-full flex items-center justify-between px-3 sm:px-6">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-1 sm:space-x-2 cursor-pointer"
              onHoverStart={() => setIsLogoHovered(true)}
              onHoverEnd={() => setIsLogoHovered(false)}
              onClick={() => handleSceneChange('hero')}
            >
              <motion.div
                className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
                animate={{
                  scale: isLogoHovered ? 1.1 : 1,
                  boxShadow: isLogoHovered 
                    ? '0 0 20px rgba(0, 255, 255, 0.6)' 
                    : '0 0 0px rgba(0, 255, 255, 0)'
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-xs sm:text-sm">IT</span>
              </motion.div>
              <span className={`font-semibold text-sm sm:text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Studio</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {Object.entries(SCENES).map(([scene, config], index) => (
                <motion.button
                  key={scene}
                  onClick={() => handleSceneChange(scene as SceneType)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    currentScene === scene
                      ? theme === 'dark' 
                        ? 'text-cyan-300 bg-cyan-400/30'
                        : 'text-cyan-600 bg-cyan-100/50'
                      : theme === 'dark'
                        ? 'text-white/80 hover:text-white hover:bg-white/20'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {config.title}
                  {/* Progress indicator */}
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 ${
                      theme === 'dark' ? 'bg-cyan-400' : 'bg-cyan-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: currentScene === scene ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Scene number indicator */}
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                    theme === 'dark' 
                      ? 'bg-cyan-400/20 text-cyan-300'
                      : 'bg-cyan-100 text-cyan-600'
                  }`}>
                    {index + 1}
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
              {/* Sound Toggle */}
              <motion.button
                onClick={toggleSound}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </motion.button>

              {/* Skin Switcher */}
              <motion.button
                onClick={nextSkin}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`Текущий скин: ${skinConfig.displayName}`}
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ 
                    background: `linear-gradient(45deg, ${skinConfig.tokens.primary}, ${skinConfig.tokens.secondary})`
                  }}
                />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {language === 'en' ? 'EN' : 'RU'}
              </motion.button>

              {/* CmdK */}
              <motion.button
                onClick={toggleCmdK}
                className={`px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 border-gray-300'
                } border`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⌘K
              </motion.button>

              {/* Profile */}
              <motion.div
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold">
                  U
                </div>
              </motion.div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-1">
              {/* Essential controls only on mobile */}
              <motion.button
                onClick={toggleSound}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </motion.button>

              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="glass fixed top-16 left-2 right-2 z-50"
          >
            <div className="p-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {Object.entries(SCENES).map(([scene, config], index) => (
                  <motion.button
                    key={scene}
                    onClick={() => handleSceneChange(scene as SceneType)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentScene === scene
                        ? theme === 'dark'
                          ? 'text-cyan-300 bg-cyan-400/30'
                          : 'text-cyan-600 bg-cyan-100/50'
                        : theme === 'dark'
                          ? 'text-white/80 hover:text-white hover:bg-white/20'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{config.title}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        theme === 'dark'
                          ? 'bg-cyan-400/20 text-cyan-300'
                          : 'bg-cyan-100 text-cyan-600'
                      }`}>
                        {index + 1}
                      </div>
                      {currentScene === scene && (
                        <div className={`w-2 h-2 rounded-full ${
                          theme === 'dark' ? 'bg-cyan-400' : 'bg-cyan-500'
                        }`} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </nav>

              {/* Mobile Additional Controls */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={toggleLanguage}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      theme === 'dark'
                        ? 'text-white/80 hover:text-white hover:bg-white/20'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {language === 'en' ? 'English' : 'Русский'}
                  </motion.button>

                  <motion.button
                    onClick={toggleCmdK}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      theme === 'dark'
                        ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 border-gray-300'
                    } border`}
                    whileTap={{ scale: 0.95 }}
                  >
                    ⌘K
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GlassHeader
