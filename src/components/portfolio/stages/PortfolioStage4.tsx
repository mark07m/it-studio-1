'use client'

import { motion } from 'framer-motion'

const PortfolioStage4 = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22
        }}
        className="max-w-4xl w-full"
      >
        {/* Portfolio Card для P4 - AI Platform */}
        <div className="glass-card glass-hover rounded-2xl p-8 backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex items-start justify-between mb-6">
            <div className="text-6xl mb-4">🧠</div>
            <div className="status-growing px-3 py-1 rounded-full text-sm font-medium">
              Growing
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            AI Platform
          </h2>
          
          <div className="text-lg text-white/80 mb-6">
            Python, FastAPI, Vector DB
          </div>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            RAG-система для корпораций. $10M+ ARR, 1M+ документов/день, 99.9% точность. 
            Используется в Fortune 500.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90">
              $10M+ ARR
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90">
              1M Docs/Day
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90">
              99.9% Accuracy
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-500/20 text-purple-300 border border-purple-500/50 rounded-lg font-medium hover:bg-purple-500/30 transition-colors"
            >
              View →
            </motion.button>
            
            {/* Hint для перехода в Process */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-sm flex items-center gap-2"
            >
              <span>Next: Process</span>
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PortfolioStage4
