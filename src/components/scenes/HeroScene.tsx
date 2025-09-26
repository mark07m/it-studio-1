'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import HeroStageManager from '../hero/HeroStageManager'

const HeroScene = () => {
  const { theme } = useAppStore()

  return (
    <main className="w-full h-full relative flex-1" role="main" aria-label="Hero section">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Hero Stage Manager */}
      <HeroStageManager className="w-full h-full" />
    </main>
  )
}

export default HeroScene
