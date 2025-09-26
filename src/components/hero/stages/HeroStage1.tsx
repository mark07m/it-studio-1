'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { heroContent, heroAnimationConfig } from '../../../data/heroContent'

const HeroStage1 = () => {
  const { prefersReducedMotion } = useAppStore()

  const content = heroContent.stage1
  const config = heroAnimationConfig.stage1

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
        duration: prefersReducedMotion ? 0.3 : config.title.duration / 1000,
        ease: prefersReducedMotion ? 'easeOut' : config.title.easing as any
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : config.subtitle.duration / 1000,
        delay: prefersReducedMotion ? 0.1 : config.subtitle.delay / 1000,
        ease: config.subtitle.easing as any
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
        duration: config.scrollCue.pulseDuration / 1000,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.3,
        delay: prefersReducedMotion ? 0 : i * (config.title.stagger / 1000),
        ease: 'easeOut' as const
      }
    })
  }

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
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          variants={titleVariants}
        >
          {/* First line */}
          <div className="block">
            {content.title.line1.split(' ').map((word: string, i: number) => (
              <motion.span
                key={`line1-${i}`}
                variants={wordVariants}
                custom={i}
                className="inline hover:text-purple-300 transition-colors duration-300"
              >
                {word}
                {i < content.title.line1.split(' ').length - 1 && <span className="inline"> </span>}
              </motion.span>
            ))}
          </div>
          {/* Second line */}
          <div className="block">
            {content.title.line2.split(' ').map((word: string, i: number) => (
              <motion.span
                key={`line2-${i}`}
                variants={wordVariants}
                custom={content.title.line1.split(' ').length + i}
                className="inline hover:text-purple-300 transition-colors duration-300"
              >
                {word}
                {i < content.title.line2.split(' ').length - 1 && <span className="inline"> </span>}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium"
          variants={subtitleVariants}
        >
          {content.subtitle}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={scrollCueVariants}
        animate="pulse"
      >
        <div className="text-white/60 text-2xl font-light">
          {content.scrollCue}
        </div>
      </motion.div>


    </motion.div>
  )
}

export default HeroStage1
