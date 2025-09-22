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
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <motion.h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Process
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 flex-1 max-h-[60vh] overflow-y-auto">
          {/* note: backdrop-filter needs non-clipped background */}
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="glass p-3 md:p-4 text-center transition-all duration-300 cursor-pointer flex flex-col justify-center hover:glass-dark"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4">{step.icon}</div>
              <h3 className={`text-sm md:text-base lg:text-lg font-semibold mb-1 md:mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {step.title}
              </h3>
              <p className={`text-xs md:text-sm leading-tight ${
                theme === 'dark' ? 'text-white/70' : 'text-gray-600'
              }`}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProcessScene
