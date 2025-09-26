'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const CapabilitiesScene = () => {
  const { theme } = useAppStore()
  const capabilities = [
    { 
      title: 'Product Architecture', 
      icon: '🏗️', 
      description: 'Создаём архитектуру, которая выдержит миллионы пользователей. Как в Stripe, но для вашего продукта.',
      features: ['System Design', 'Scalability', 'Performance']
    },
    { 
      title: 'Design Systems', 
      icon: '🎨', 
      description: 'Дизайн-системы уровня Notion. Каждый пиксель продуман, каждая анимация имеет смысл.',
      features: ['Design Tokens', 'Component Library', 'Accessibility']
    },
    { 
      title: 'Full-Stack Engineering', 
      icon: '⚡', 
      description: 'Фронтенд как в Linear, бэкенд как в Vercel. Скорость разработки × качество кода.',
      features: ['React/Next.js', 'TypeScript', 'PostgreSQL']
    },
    { 
      title: 'SaaS Platforms', 
      icon: '🚀', 
      description: 'Мульти-тенантность, биллинг, роли — всё как в лучших SaaS. От MVP до enterprise.',
      features: ['Multi-tenancy', 'Billing Engine', 'User Management']
    },
    { 
      title: 'E-commerce Solutions', 
      icon: '🛒', 
      description: 'Высоконагруженные магазины с кастомной логикой. Обрабатываем тысячи заказов в секунду.',
      features: ['High Load', 'Custom Logic', 'Payment Processing']
    },
    { 
      title: 'Cloud Infrastructure', 
      icon: '☁️', 
      description: 'Инфраструктура как код. Автоматизация, мониторинг, безопасность — всё на уровне AWS.',
      features: ['Infrastructure as Code', 'Kubernetes', 'Monitoring']
    },
    { 
      title: 'AI & Machine Learning', 
      icon: '🧠', 
      description: 'RAG-системы, чат-боты, рекомендации. ИИ, который действительно работает в продакшене.',
      features: ['RAG Systems', 'ML Pipelines', 'Vector Databases']
    },
    { 
      title: 'API & Integrations', 
      icon: '🔗', 
      description: 'API как в Stripe — простые, быстрые, надёжные. Интегрируем что угодно с чем угодно.',
      features: ['REST/GraphQL', 'Webhooks', 'Event Streaming']
    },
  ]

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 flex-1" role="main" aria-label="Our capabilities section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full flex flex-col">
        <header className="text-center mb-3">
          <motion.h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Мы строим как в FAANG
          </motion.h2>
          <motion.p
            className={`text-xs md:text-sm mt-2 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Архитектура, дизайн, код — всё на уровне лучших продуктов мира. Без компромиссов, только результат
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3"
          aria-label="Capabilities list"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.title}
              className="glass p-2 transition-all duration-300 cursor-pointer flex flex-col hover:glass-dark"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
              }}
              role="article"
              aria-labelledby={`capability-${index}`}
            >
              <div className="text-xl md:text-2xl mb-2 text-center" aria-hidden="true">{capability.icon}</div>
              <h3 
                id={`capability-${index}`}
                className={`text-sm md:text-base font-semibold mb-1 text-center ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {capability.title}
              </h3>
              <p className={`text-xs text-center leading-relaxed mb-2 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-600'
              }`}>
                {capability.description}
              </p>
              <ul className="space-y-0.5 mt-auto" aria-label={`${capability.title} features`}>
                {capability.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className={`text-xs flex items-center ${
                      theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                    }`}
                  >
                    <span className="mr-1" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default CapabilitiesScene
