'use client'

import { motion } from 'framer-motion'
import { Boxes } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const ProcessStage3 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        className={`relative max-w-4xl w-full ${
          currentSkin === 'neonGlass' 
            ? 'bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-2xl shadow-cyan-400/20'
            : currentSkin === 'warmGlow'
            ? 'bg-white/10 backdrop-blur-md border border-orange-400/30 shadow-2xl shadow-orange-400/20'
            : 'bg-white/10 backdrop-blur-md border border-gray-400/30 shadow-2xl shadow-gray-400/20'
        } rounded-2xl p-6 sm:p-8`}
      >
        <div className="text-center">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-400 to-blue-500"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Boxes className="w-8 h-8 text-purple-100" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-purple-400">
            System Design
          </h1>
          <p className="text-lg text-white/80">
            Архитектура, которая выдержит миллионы пользователей
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ProcessStage3
