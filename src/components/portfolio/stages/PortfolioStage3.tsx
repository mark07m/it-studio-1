'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const PortfolioStage3 = () => {
  const { currentSkin } = useAppStore()

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
        {/* Portfolio Card для P3 - SaaS Dashboard */}
        <div className={`glass-card glass-hover rounded-2xl p-8 backdrop-blur-md ${
          currentSkin === 'neonGlass' 
            ? 'bg-white/10 border border-cyan-400/30 shadow-2xl shadow-cyan-400/20'
            : currentSkin === 'warmGlow'
            ? 'bg-white/10 border border-orange-400/30 shadow-2xl shadow-orange-400/20'
            : 'bg-white/10 border border-gray-400/30 shadow-2xl shadow-gray-400/20'
        }`}>
          <div className="flex items-start justify-between mb-6">
            <div className="text-6xl mb-4">📊</div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-blue-500/20 text-blue-300'
                : currentSkin === 'warmGlow'
                ? 'bg-cyan-500/20 text-cyan-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              Growing
            </div>
          </div>
          
          <h2 className={`text-4xl font-bold mb-4 ${
            currentSkin === 'neonGlass' 
              ? 'text-cyan-400'
              : currentSkin === 'warmGlow'
              ? 'text-orange-400'
              : 'text-gray-400'
          }`}>
            SaaS Analytics Dashboard
          </h2>
          
          <div className={`text-lg mb-6 ${
            currentSkin === 'neonGlass' 
              ? 'text-cyan-300'
              : currentSkin === 'warmGlow'
              ? 'text-orange-300'
              : 'text-gray-300'
          }`}>
            React, D3.js, Node.js, MongoDB
          </div>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            Аналитическая платформа для B2B SaaS. 25K+ активных пользователей, 
            real-time дашборды, ML-прогнозы. Интеграция с 30+ сервисами.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/20 text-cyan-300'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/20 text-orange-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              25K+ Users
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/20 text-green-300'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              $500K ARR
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/20 text-purple-300'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/20 text-red-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              30+ Integrations
            </div>
          </div>
          
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentSkin === 'neonGlass' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30'
                  : currentSkin === 'warmGlow'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 hover:bg-orange-500/30'
                  : 'bg-gray-500/20 text-gray-300 border border-gray-500/50 hover:bg-gray-500/30'
              }`}
            >
              View →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PortfolioStage3