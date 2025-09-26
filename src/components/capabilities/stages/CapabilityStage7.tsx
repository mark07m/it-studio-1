'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const CapabilityStage7 = () => {
  const { theme } = useAppStore()

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 flex-1" role="main" aria-label="AI & Machine Learning section">
      <div className="max-w-7xl w-full flex flex-col">
        <header className="text-center mb-8">
          <motion.h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🧠 AI & Machine Learning
          </motion.h2>
          <motion.p
            className={`text-lg md:text-xl mt-4 max-w-4xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-white/80' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            RAG-системы, чат-боты, рекомендации. ИИ, который действительно работает в продакшене.
          </motion.p>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="AI features">
          {[
            { title: 'RAG Systems', description: 'Retrieval-Augmented Generation', icon: '🔍' },
            { title: 'ML Pipelines', description: 'Автоматизированные ML пайплайны', icon: '🔄' },
            { title: 'Vector Databases', description: 'Семантический поиск и хранение', icon: '🗄️' }
          ].map((feature, index) => (
            <motion.article
              key={feature.title}
              className="glass p-6 transition-all duration-300 hover:glass-dark"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)'
              }}
              role="article"
              aria-labelledby={`feature-${index}`}
            >
              <div className="text-4xl mb-4 text-center" aria-hidden="true">{feature.icon}</div>
              <h3 
                id={`feature-${index}`}
                className={`text-xl font-semibold mb-3 text-center ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {feature.title}
              </h3>
              <p className={`text-center leading-relaxed ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </motion.article>
          ))}
        </section>
        
        {/* Анимированная схема RAG системы */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="relative">
            <motion.div
              className="w-80 h-40 border-2 border-dashed border-pink-400/50 rounded-lg flex items-center justify-center"
              animate={{ 
                borderColor: ['rgba(236, 72, 153, 0.5)', 'rgba(236, 72, 153, 0.8)', 'rgba(236, 72, 153, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className={`text-sm ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>
                RAG система
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default CapabilityStage7
