'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const PortfolioStage4 = () => {
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
        {/* Portfolio Card для P4 - Mobile App */}
        <div className={`glass-card glass-hover rounded-2xl p-8 backdrop-blur-md ${
          currentSkin === 'neonGlass' 
            ? 'bg-white/10 border border-cyan-400/30 shadow-2xl shadow-cyan-400/20'
            : currentSkin === 'warmGlow'
            ? 'bg-white/10 border border-orange-400/30 shadow-2xl shadow-orange-400/20'
            : 'bg-white/10 border border-gray-400/30 shadow-2xl shadow-gray-400/20'
        }`}>
          <div className="flex items-start justify-between mb-6">
            <div className="text-6xl mb-4">📱</div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/20 text-purple-300'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/20 text-red-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              Featured
            </div>
          </div>
          
          <h2 className={`text-4xl font-bold mb-4 ${
            currentSkin === 'neonGlass' 
              ? 'text-cyan-400'
              : currentSkin === 'warmGlow'
              ? 'text-orange-400'
              : 'text-gray-400'
          }`}>
            Health & Fitness App
          </h2>
          
          <div className={`text-lg mb-6 ${
            currentSkin === 'neonGlass' 
              ? 'text-cyan-300'
              : currentSkin === 'warmGlow'
              ? 'text-orange-300'
              : 'text-gray-300'
          }`}>
            React Native, Firebase, AI/ML
          </div>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            Мобильное приложение для здоровья и фитнеса. 100K+ скачиваний, 
            4.8★ рейтинг в App Store. AI-тренер, трекинг активности, социальные функции.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/20 text-cyan-300'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/20 text-orange-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              100K+ Downloads
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/20 text-green-300'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              4.8★ Rating
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/20 text-purple-300'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/20 text-red-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              AI Coach
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

export default PortfolioStage4