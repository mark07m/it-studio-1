'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { useState, useEffect } from 'react'

const HeroStage3 = () => {
  const { prefersReducedMotion } = useAppStore()
  const [backgroundAnimating, setBackgroundAnimating] = useState(false)

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

  // Background animation variants
  const backgroundVariants = {
    initial: {
      rotateY: 0,
      scale: 1,
      opacity: 0.9
    },
    animating: {
      rotateY: prefersReducedMotion ? 0 : 90,
      scale: prefersReducedMotion ? 1 : 1.12,
      opacity: prefersReducedMotion ? 0.9 : 0.7,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 1.0,
        ease: prefersReducedMotion ? 'easeOut' : [0.25, 0.46, 0.45, 0.94] // power3.inOut
      }
    }
  }

  const gridVariants = {
    initial: {
      rotateX: 0,
      scale: 1,
      opacity: 0.9
    },
    animating: {
      rotateX: prefersReducedMotion ? 0 : 10,
      scale: prefersReducedMotion ? 1 : 1.12,
      opacity: prefersReducedMotion ? 0.9 : 0.7,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 1.0,
        ease: prefersReducedMotion ? 'easeOut' : [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const gradientVariants = {
    initial: {
      backgroundPosition: '0% 50%'
    },
    animating: {
      backgroundPosition: prefersReducedMotion ? '0% 50%' : '100% 50%',
      transition: {
        duration: prefersReducedMotion ? 0.3 : 1.2,
        ease: 'easeInOut'
      }
    }
  }

  // Content counter-parallax
  const contentVariants = {
    initial: {
      y: 0,
      x: 0
    },
    animating: {
      y: prefersReducedMotion ? 0 : -2,
      x: prefersReducedMotion ? 0 : 2,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 1.0,
        ease: 'easeInOut'
      }
    }
  }

  const titleText = "Разрабатываем инновационные\nрешения будущего"
  const subtitleText = "IT-студия полного цикла разработки веб-приложений, мобильных приложений и сложных систем"

  return (
    <motion.div
      className="hero-stage-3 absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0A0F1E 0%, #1A1040 50%, #2D1B69 100%)',
            backgroundSize: '200% 200%'
          }}
          variants={gradientVariants}
          initial="initial"
          animate={backgroundAnimating ? "animating" : "initial"}
        />
        
        {/* Digital grid overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
          variants={gridVariants}
          initial="initial"
          animate={backgroundAnimating ? "animating" : "initial"}
        />
        
        {/* 3D-like wireframe elements */}
        <motion.div
          className="absolute inset-0"
          variants={backgroundVariants}
          initial="initial"
          animate={backgroundAnimating ? "animating" : "initial"}
        >
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-400/20 rounded-lg transform rotate-45" />
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-400/20 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-purple-400/20 transform rotate-12" />
        </motion.div>
      </div>

      {/* Main content with counter-parallax */}
      <motion.div 
        className="text-center max-w-4xl relative z-10"
        variants={contentVariants}
        initial="initial"
        animate={backgroundAnimating ? "animating" : "initial"}
      >
        {/* Title - static during background animation */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {titleText.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </motion.h1>

        {/* Subtitle - static during background animation */}
        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitleText}
        </motion.p>
      </motion.div>


    </motion.div>
  )
}

export default HeroStage3
