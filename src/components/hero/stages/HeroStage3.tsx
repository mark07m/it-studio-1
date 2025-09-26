'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { heroContent, heroAnimationConfig } from '@/data/heroContent'
import { useState, useEffect } from 'react'

const HeroStage3 = () => {
  const { prefersReducedMotion } = useAppStore()
  const [backgroundAnimating, setBackgroundAnimating] = useState(false)
  
  const content = heroContent.stage3
  const config = heroAnimationConfig.stage3

  // Trigger background animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundAnimating(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.8,
        ease: 'easeOut'
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
        delay: prefersReducedMotion ? 0.1 : 0.2
      }
    }
  }

  // Content counter-parallax - минимальное движение против фона
  const contentVariants = {
    initial: {
      y: 0,
      x: 0
    },
    animating: {
      y: prefersReducedMotion ? 0 : -4,
      x: prefersReducedMotion ? 0 : 4,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <motion.div
      className="hero-stage-3 absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main content with counter-parallax */}
      <motion.div 
        className="text-center max-w-4xl relative z-10"
        variants={contentVariants}
        initial="initial"
        animate={backgroundAnimating ? "animating" : "initial"}
      >
        {/* Title - статичный во время анимации фона */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <div>{content.title.line1}</div>
          <div>{content.title.line2}</div>
        </motion.h1>

        {/* Subtitle - статичный во время анимации фона */}
        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {content.subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default HeroStage3
