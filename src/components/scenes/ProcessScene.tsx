'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const ProcessScene = () => {
  const { theme } = useAppStore()
  const steps = [
    { title: 'Discover', description: 'Understanding your needs', icon: '🔍' },
    { title: 'Design', description: 'Creating the blueprint', icon: '🎨' },
    { title: 'Develop', description: 'Building the solution', icon: '⚡' },
    { title: 'Test', description: 'Quality assurance', icon: '🧪' },
    { title: 'Deploy', description: 'Going live', icon: '🚀' },
    { title: 'Maintain', description: 'Ongoing support', icon: '🔧' },
  ]

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-20 sm:pt-24" role="main" aria-label="Our process section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <header className="text-center mb-8">
          <motion.h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Process
          </motion.h2>
          <motion.p
            className={`text-sm md:text-base mt-4 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We follow a proven methodology to deliver exceptional results on time and within budget
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 flex-1"
          aria-label="Development process steps"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="glass p-2 md:p-3 text-center transition-all duration-300 cursor-pointer flex flex-col justify-center hover:glass-dark"
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
