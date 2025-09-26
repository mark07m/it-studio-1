'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const ProcessScene = () => {
  const { theme } = useAppStore()
  const steps = [
    { title: 'Deep Dive', description: 'Погружаемся в вашу индустрию как инсайдеры', icon: '🔍' },
    { title: 'Product Vision', description: 'Создаём видение продукта, который изменит рынок', icon: '🎯' },
    { title: 'System Design', description: 'Архитектура, которая выдержит миллионы пользователей', icon: '🏗️' },
    { title: 'Code & Ship', description: 'Пишем код уровня FAANG, деплоим как Vercel', icon: '⚡' },
    { title: 'Scale & Grow', description: 'Масштабируем до IPO, оптимизируем каждую метрику', icon: '🚀' },
    { title: 'Exit Strategy', description: 'Готовим к exit или IPO — знаем, как это делается', icon: '💎' },
  ]

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 flex-1" role="main" aria-label="Our process section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <header className="text-center mb-4">
          <motion.h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            От идеи до IPO за 18 месяцев
          </motion.h2>
          <motion.p
            className={`text-sm md:text-base mt-4 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Методология, проверенная на 50+ проектах. От MVP до Unicorn — мы знаем каждый шаг к успеху
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-2 flex-1"
          aria-label="Development process steps"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="glass p-1 md:p-2 text-center transition-all duration-300 cursor-pointer flex flex-col justify-center hover:glass-dark"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
              }}
              role="article"
              aria-labelledby={`step-${index}`}
            >
              <div className="text-xl md:text-2xl mb-2" aria-hidden="true">{step.icon}</div>
              <h3 
                id={`step-${index}`}
                className={`text-xs md:text-sm font-semibold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {step.title}
              </h3>
              <p className={`text-xs leading-tight ${
                theme === 'dark' ? 'text-white/70' : 'text-gray-600'
              }`}>
                {step.description}
              </p>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default ProcessScene
