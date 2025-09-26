'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { heroContent, heroAnimationConfig } from '@/data/heroContent'
import { useState, useEffect } from 'react'

const HeroStage2 = () => {
  const { prefersReducedMotion } = useAppStore()
  const [showMorph, setShowMorph] = useState(false)
  
  const content = heroContent.stage2
  const config = heroAnimationConfig.stage2

  // Trigger morph animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMorph(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        staggerChildren: prefersReducedMotion ? 0.1 : 0.2
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

  // Morph animation variants
  const morphVariants = {
    initial: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1
    },
    morphing: {
      opacity: 0,
      y: -20,
      rotateX: 15,
      scale: 0.95,
      transition: {
        duration: prefersReducedMotion ? 0.25 : config.morph.duration / 1000,
        ease: config.morph.easing
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      rotateX: 30,
      scale: 0.8,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.3,
        ease: 'easeIn'
      }
    }
  }

  const newTitleVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      rotateX: -15,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.25 : config.morph.duration / 1000,
        delay: prefersReducedMotion ? 0.1 : 0.2,
        ease: config.morph.easing
      }
    }
  }

  const secondLineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.2 : config.crossfade.duration / 1000,
        delay: prefersReducedMotion ? 0.2 : 0.4
      }
    }
  }

  return (
    <motion.div
      className="hero-stage-2 absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main content */}
      <div className="text-center max-w-4xl">
        {/* Title with morph animation */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!showMorph ? (
              <motion.h1 
                key="title-a"
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {content.titleA.line1}
              </motion.h1>
            ) : (
              <motion.h1 
                key="title-b"
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                variants={newTitleVariants}
                initial="initial"
                animate="visible"
              >
                {content.titleB.line1}
              </motion.h1>
            )}
          </AnimatePresence>
          
          {/* Second line with crossfade */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            variants={secondLineVariants}
            initial="hidden"
            animate="visible"
          >
            {content.titleA.line2}
          </motion.h1>
        </div>

        {/* Subtitle - static */}
        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mt-6"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {content.subtitle}
        </motion.p>
      </div>


    </motion.div>
  )
}

export default HeroStage2
