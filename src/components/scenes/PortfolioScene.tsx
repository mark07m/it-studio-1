'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const PortfolioScene = () => {
  const { theme } = useAppStore()
  const projects = [
    { 
      title: 'FinTech Unicorn', 
      tech: 'Next.js, TypeScript, PostgreSQL', 
      status: 'Exited',
      description: 'Платформа для управления инвестициями. $50M+ Series B, 100K+ пользователей, $500M+ AUM. Архитектура выдержала 10x рост за 6 месяцев.',
      features: ['$50M Series B', '100K+ Users', '$500M+ AUM', '10x Scale'],
      image: '🚀'
    },
    { 
      title: 'E-commerce Giant', 
      tech: 'React, Node.js, Redis', 
      status: 'IPO',
      description: 'Маркетплейс с 1M+ товаров. $2B+ GMV, 10K+ заказов/час, 99.99% uptime. Система выдержала Black Friday без сбоев.',
      features: ['$2B+ GMV', '10K Orders/Hour', '99.99% Uptime', 'Black Friday Ready'],
      image: '🛒'
    },
    { 
      title: 'HealthTech Revolution', 
      tech: 'React Native, Python, AWS', 
      status: 'Acquired',
      description: 'Телемедицина с ИИ-диагностикой. $100M+ exit, 500K+ консультаций, 95% точность диагнозов. Приобретена крупной клиникой.',
      features: ['$100M Exit', '500K+ Consultations', '95% AI Accuracy', 'Acquired'],
      image: '🏥'
    },
    { 
      title: 'AI Platform', 
      tech: 'Python, FastAPI, Vector DB', 
      status: 'Growing',
      description: 'RAG-система для корпораций. $10M+ ARR, 1M+ документов/день, 99.9% точность. Используется в Fortune 500.',
      features: ['$10M+ ARR', '1M Docs/Day', '99.9% Accuracy', 'Fortune 500'],
      image: '🧠'
    },
  ]

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 flex-1" role="main" aria-label="Portfolio section">
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
            Мы создали Unicorn'ов
          </motion.h2>
          <motion.p
            className={`text-sm md:text-base mt-4 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Не просто проекты — это истории успеха. $2B+ в обороте, 1M+ пользователей, IPO и exit'ы. Мы знаем, как строить продукты, которые меняют мир
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 flex-1"
          aria-label="Portfolio projects"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="glass p-1.5 md:p-2 transition-all duration-300 cursor-pointer flex flex-col hover:glass-dark"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
              }}
              role="article"
              aria-labelledby={`project-${index}`}
            >
              <div className="flex items-start space-x-2 mb-2">
                <div className="text-lg md:text-xl" aria-hidden="true">{project.image}</div>
                <div className="flex-1">
                  <h3 
                    id={`project-${index}`}
                    className={`text-sm md:text-base font-semibold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className={`text-xs mb-1 ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                  }`}>
                    {project.tech}
                  </p>
                </div>
              </div>
              
              <p className={`text-xs mb-2 leading-relaxed ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
              
              <ul className="space-y-0.5 mb-2" aria-label={`${project.title} features`}>
                {project.features.slice(0, 3).map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className={`text-xs flex items-center ${
                      theme === 'dark' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    <span className="mr-1" aria-hidden="true">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between mt-auto">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  project.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
                <motion.button
                  className={`px-2 py-1 rounded-lg text-xs transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-cyan-400/20 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/30'
                      : 'bg-cyan-100 border-cyan-500/50 text-cyan-600 hover:bg-cyan-200'
                  } border`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View details for ${project.title}`}
                >
                  View
                </motion.button>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default PortfolioScene
