'use client'

import { motion } from 'framer-motion'
import { ProcessStage } from '@/store/appStore'

interface StepRailProps {
  currentStage: ProcessStage
  totalStages: number
  onStageClick: (stage: ProcessStage) => void
  isTransitioning: boolean
  className?: string
}

const StepRail = ({ 
  currentStage, 
  totalStages, 
  onStageClick, 
  isTransitioning,
  className = '' 
}: StepRailProps) => {
  const stages = Array.from({ length: totalStages }, (_, i) => i + 1) as ProcessStage[]

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {stages.map((stage) => (
        <motion.button
          key={stage}
          onClick={() => !isTransitioning && onStageClick(stage)}
          className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
            currentStage === stage
              ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
              : 'bg-white/40 hover:bg-white/60'
          }`}
          disabled={isTransitioning}
          aria-label={`Go to stage ${stage}`}
          whileHover={{ scale: currentStage === stage ? 1.25 : 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: currentStage === stage ? 1.25 : 1,
            opacity: currentStage === stage ? 1 : 0.6
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Активный индикатор */}
          {currentStage === stage && (
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-400"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          {/* Пульсация для активного этапа */}
          {currentStage === stage && (
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default StepRail
