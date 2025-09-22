'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const HeroScene = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Main Content */}
      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Animated Title */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.span
            className="block"
            animate={{
              textShadow: isHovered 
                ? '0 0 20px rgba(0, 255, 255, 0.8)' 
                : '0 0 0px rgba(0, 255, 255, 0)'
            }}
            transition={{ duration: 0.3 }}
          >
            Have an idea?
          </motion.span>
          <motion.span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            We&apos;ll build it all.
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 mb-4 sm:mb-6 md:mb-8 max-w-xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        >
          Transform your vision into reality with cutting-edge technology and innovative design
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 backdrop-blur-[16px] bg-white/10 border border-cyan-400/50 rounded-xl text-white font-semibold text-sm sm:text-base md:text-lg hover:bg-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.4)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)'
          }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          Let&apos;s Build Something Amazing
        </motion.button>
      </div>

      {/* Floating Elements - Hidden on mobile */}
      <motion.div
        className="hidden sm:block absolute top-20 right-20 w-4 h-4 bg-cyan-400 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="hidden sm:block absolute bottom-32 left-16 w-6 h-6 bg-purple-400 rounded-full"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
    </div>
  )
}

export default HeroScene
