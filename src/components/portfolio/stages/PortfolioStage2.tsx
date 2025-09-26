'use client'

import { motion } from 'framer-motion'

const PortfolioStage2 = () => {
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
        {/* Portfolio Card для P2 - E-commerce Giant */}
        <div className="glass-card glass-hover rounded-2xl p-8 backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex items-start justify-between mb-6">
            <div className="text-6xl mb-4">🛒</div>
            <div className="status-ipo px-3 py-1 rounded-full text-sm font-medium">
              IPO
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            E-commerce Giant
          </h2>
          
          <div className="text-lg text-white/80 mb-6">
            React, Node.js, Redis
          </div>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            Маркетплейс с 1M+ товаров. $2B+ GMV, 10K+ заказов/час, 99.99% uptime. 
            Система выдержала Black Friday без сбоев.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90">
              $2B+ GMV
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90">
              10K Orders/Hour
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90">
              99.99% Uptime
            </div>
          </div>
          
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-500/20 text-purple-300 border border-purple-500/50 rounded-lg font-medium hover:bg-purple-500/30 transition-colors"
            >
              View →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PortfolioStage2
