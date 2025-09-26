'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const HeroStage1 = () => {
  const { prefersReducedMotion } = useAppStore()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        staggerChildren: prefersReducedMotion ? 0.1 : 0.2,
        delayChildren: 0.1
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 24,
      skewX: prefersReducedMotion ? 0 : 6
    },
    visible: { 
      opacity: 1, 
      y: 0,
      skewX: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.8,
        ease: prefersReducedMotion ? 'easeOut' : [0.25, 0.46, 0.45, 0.94] // backOut easing
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay: prefersReducedMotion ? 0.1 : 0.18
      }
    }
  }

  const scrollCueVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: prefersReducedMotion ? 0.2 : 0.4
      }
    },
    pulse: {
      y: [0, -4, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.3,
        delay: prefersReducedMotion ? 0 : i * 0.03, // Stagger effect
        ease: 'easeOut'
      }
    })
  }

  const titleText = "Создаем цифровые\nрешения будущего"
  const subtitleText = "IT-студия полного цикла разработки веб-приложений, мобильных приложений и сложных систем"

  return (
    <motion.div
      className="hero-stage-1 absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main content */}
      <div className="text-center max-w-4xl">
        {/* Title with stagger animation */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={titleVariants}
        >
          {titleText.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              custom={i}
              className="inline-block hover:text-purple-300 transition-colors duration-300"
            >
              {char === '\n' ? <br /> : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          variants={subtitleVariants}
        >
          {subtitleText}
        </motion.p>
      </div>


    </motion.div>
  )
}

export default HeroStage1
