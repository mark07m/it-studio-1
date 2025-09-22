'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAppStore } from '@/store/appStore'

interface DockTriggerProps {
  onHover: (isHovering: boolean) => void
}

const DockTrigger = ({ onHover }: DockTriggerProps) => {
  const { theme } = useAppStore()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover(false)
  }

  return (
    <motion.div
      className="hidden lg:block fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Полоска-триггер */}
      <motion.div
        className={`w-32 h-1 rounded-full mx-auto ${
          theme === 'dark' 
            ? 'bg-white/20' 
            : 'bg-gray-400/30'
        }`}
        animate={{
          width: isHovered ? 40 : 128,
          height: isHovered ? 2 : 4,
          backgroundColor: isHovered 
            ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(75, 85, 99, 0.5)')
            : (theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(75, 85, 99, 0.3)')
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      
      {/* Невидимая область для лучшего UX - расширенная область вокруг дока */}
      <div className="absolute -top-4 -bottom-4 -left-16 -right-16" />
    </motion.div>
  )
}

export default DockTrigger
