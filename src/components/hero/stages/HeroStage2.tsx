'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { heroContent, heroAnimationConfig } from '@/data/heroContent'

const HeroStage2 = () => {
  const { prefersReducedMotion } = useAppStore()
  
  const content = heroContent.stage2
  const config = heroAnimationConfig.stage2

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.8,
        staggerChildren: prefersReducedMotion ? 0.15 : 0.25,
        delayChildren: 0.1
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.7,
        delay: prefersReducedMotion ? 0.2 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Word animation variants for stagger effect
  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 8,
      scale: 0.95
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.4,
        delay: prefersReducedMotion ? 0 : i * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  return (
    <motion.div
      className="hero-stage-2 absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 7, 100, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)'
      }}
    >
      {/* Main content */}
      <div className="text-center max-w-4xl">
        {/* Title with word stagger animation */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          variants={titleVariants}
        >
          {/* First line */}
          <div className="block">
            {content.titleA.line1.split(' ').map((word: string, i: number) => (
              <motion.span
                key={`line1-${i}`}
                variants={wordVariants}
                custom={i}
                className="inline hover:text-purple-300 transition-colors duration-300"
              >
                {word}
                {i < content.titleA.line1.split(' ').length - 1 && <span className="inline"> </span>}
              </motion.span>
            ))}
          </div>
          {/* Second line */}
          <div className="block">
            {content.titleA.line2.split(' ').map((word: string, i: number) => (
              <motion.span
                key={`line2-${i}`}
                variants={wordVariants}
                custom={content.titleA.line1.split(' ').length + i}
                className="inline hover:text-purple-300 transition-colors duration-300"
              >
                {word}
                {i < content.titleA.line2.split(' ').length - 1 && <span className="inline"> </span>}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Subtitle with word stagger animation */}
        <motion.p 
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium mt-6"
          variants={subtitleVariants}
        >
          {content.subtitle.split(' ').map((word: string, i: number) => (
            <motion.span
              key={`subtitle-${i}`}
              variants={wordVariants}
              custom={i}
              className="inline hover:text-purple-200 transition-colors duration-300"
            >
              {word}
              {i < content.subtitle.split(' ').length - 1 && <span className="inline"> </span>}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default HeroStage2