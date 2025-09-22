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
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Process
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-xl p-6 text-center min-w-[200px] hover:bg-white/20 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-white/70 text-sm">
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
