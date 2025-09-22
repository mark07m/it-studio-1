'use client'

import { motion } from 'framer-motion'

const ProcessScene = () => {
  const steps = [
    { title: 'Discover', description: 'Understanding your needs', icon: '🔍' },
    { title: 'Design', description: 'Creating the blueprint', icon: '🎨' },
    { title: 'Develop', description: 'Building the solution', icon: '⚡' },
    { title: 'Test', description: 'Quality assurance', icon: '🧪' },
    { title: 'Deploy', description: 'Going live', icon: '🚀' },
    { title: 'Maintain', description: 'Ongoing support', icon: '🔧' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Process
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 flex-1 max-h-[60vh] overflow-hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-lg p-3 md:p-4 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4">{step.icon}</div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white mb-1 md:mb-2">
                {step.title}
              </h3>
              <p className="text-white/70 text-xs md:text-sm leading-tight">
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
