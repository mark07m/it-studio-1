'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/appStore'

interface GlassDockProps {
  isVisible?: boolean
  onHover?: (isHovering: boolean) => void
}

const GlassDock = ({ isVisible = true, onHover }: GlassDockProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isDockVisible, setIsDockVisible] = useState(false)
  const { theme } = useAppStore()

  useEffect(() => {
    if (isVisible) {
      setIsDockVisible(true)
    } else {
      const timer = setTimeout(() => setIsDockVisible(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const dockItems = [
    { id: 'cases', icon: '📁', label: 'Cases', color: 'from-blue-400 to-cyan-500' },
    { id: 'estimator', icon: '📊', label: 'Estimator', color: 'from-green-400 to-emerald-500' },
    { id: 'builder', icon: '🔧', label: 'Builder', color: 'from-orange-400 to-red-500' },
    { id: 'calendar', icon: '📅', label: 'Calendar', color: 'from-purple-400 to-pink-500' },
  ]

  const handleMouseEnter = () => {
    if (onHover) {
      onHover(true)
    }
  }

  const handleMouseLeave = () => {
    if (onHover) {
      onHover(false)
    }
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isDockVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.4, 
        ease: 'easeOut',
        delay: isVisible ? 0 : 0
      }}
      className={`fixed bottom-2 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 z-50 h-16 sm:h-20 ${
        !isDockVisible ? 'pointer-events-none' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="glass h-full w-full sm:w-[22%] mx-auto">
        <div className="h-full flex items-center justify-center px-2 sm:px-6">
          <div className="flex items-center justify-between sm:justify-center w-full sm:w-auto space-x-1 sm:space-x-4">
            {dockItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex flex-col items-center space-y-1 cursor-pointer flex-1 sm:flex-none"
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-lg sm:text-xl shadow-lg`}
                  animate={{
                    scale: hoveredItem === item.id ? 1.2 : 1,
                    boxShadow: hoveredItem === item.id 
                      ? '0 0 30px rgba(0, 255, 255, 0.5)' 
                      : '0 0 0px rgba(0, 255, 255, 0)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <motion.span
                  className={`text-xs font-medium text-center ${
                    theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                  }`}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0.8,
                    y: hoveredItem === item.id ? -2 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Расширенная область вокруг дока для предотвращения исчезновения */}
      <div className="absolute -top-4 -bottom-4 -left-16 -right-16" />
    </motion.div>
  )
}

export default GlassDock
