'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { heroContent, heroAnimationConfig } from '@/data/heroContent'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import Badge from '@/components/ui/Badge'

const HeroStage4 = () => {
  const { prefersReducedMotion } = useAppStore()
  const [showCTA, setShowCTA] = useState(false)
  
  const content = heroContent.stage4
  const config = heroAnimationConfig.stage4

  // Trigger CTA animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCTA(true)
    }, 300)
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

  // CTA animations
  const primaryCTAVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 32,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: prefersReducedMotion ? 'tween' : 'spring',
        duration: prefersReducedMotion ? 0.3 : config.primaryCta.duration / 1000,
        stiffness: prefersReducedMotion ? undefined : config.primaryCta.spring.stiffness,
        damping: prefersReducedMotion ? undefined : config.primaryCta.spring.damping,
        delay: prefersReducedMotion ? 0.1 : 0.2
      }
    }
  }

  const secondaryCTAVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 16,
      x: prefersReducedMotion ? 0 : -8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : config.secondaryCta.duration / 1000,
        delay: prefersReducedMotion ? 0.2 : config.secondaryCta.delay / 1000
      }
    }
  }

  const badgesVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : config.badges.stagger / 1000,
        delayChildren: prefersReducedMotion ? 0.3 : 0.4
      }
    }
  }

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.92,
      y: prefersReducedMotion ? 0 : 8
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : config.badges.duration / 1000,
        ease: 'easeOut'
      }
    }
  }

  const horizontalCueVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        delay: prefersReducedMotion ? 0.4 : 0.6
      }
    },
    pulse: {
      x: [0, 4, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div
      className="hero-stage-4 absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main content */}
      <div className="text-center max-w-4xl mb-12">
        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <div>{content.title.line1}</div>
          <div>{content.title.line2}</div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {content.subtitle}
        </motion.p>
      </div>

      {/* CTA Buttons */}
      {showCTA && (
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial="hidden"
          animate="visible"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => console.log('Primary CTA clicked')}
            className="min-w-[200px]"
          >
            {content.primaryCta.text}
          </Button>
          
          <ButtonSecondary
            size="lg"
            onClick={() => console.log('Secondary CTA clicked')}
            className="min-w-[200px]"
          >
            {content.secondaryCta.text}
          </ButtonSecondary>
        </motion.div>
      )}

      {/* Badges */}
      {showCTA && (
        <motion.div 
          className="flex flex-wrap gap-3 justify-center max-w-2xl"
          variants={badgesVariants}
          initial="hidden"
          animate="visible"
        >
          {content.badges.map((badge, index) => (
            <Badge
              key={index}
              variant={badge.variant === 'primary' ? 'domain' : 
                      badge.variant === 'secondary' ? 'tech' : 'feature'}
              delay={index}
            >
              {badge.text}
            </Badge>
          ))}
        </motion.div>
      )}

      {/* Horizontal navigation cue */}
      <motion.div
        className="absolute bottom-8 right-8"
        variants={horizontalCueVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center gap-2 text-white/60 text-lg font-light"
          animate="pulse"
        >
          <span>Перейти к возможностям</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>

    </motion.div>
  )
}

export default HeroStage4
