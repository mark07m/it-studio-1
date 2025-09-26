'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const CapabilityStage2 = () => {
  const { theme } = useAppStore()

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 flex-1" role="main" aria-label="Design Systems section">
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
            🎨 Design Systems
          </motion.h2>
          <motion.p
            className={`text-lg md:text-xl mt-4 max-w-4xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-white/80' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Дизайн-системы уровня Notion. Каждый пиксель продуман, каждая анимация имеет смысл.
          </motion.p>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Design features">
          {[
            { title: 'Design Tokens', description: 'Цвета, типографика, отступы в системе', icon: '🎨' },
            { title: 'Component Library', description: 'Переиспользуемые компоненты', icon: '🧩' },
            { title: 'Accessibility', description: 'WCAG AA соответствие из коробки', icon: '♿' }
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
                boxShadow: '0 0 30px rgba(255, 165, 0, 0.3)'
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
        
        {/* Интерактивная демонстрация дизайн-токенов */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex space-x-4">
            {['#00ffff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'].map((color, index) => (
              <motion.div
                key={color}
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [`0 0 0 0 ${color}40`, `0 0 20px ${color}40`, `0 0 0 0 ${color}40`]
                }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default CapabilityStage2
