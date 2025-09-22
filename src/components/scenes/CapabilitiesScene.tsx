'use client'

import { motion } from 'framer-motion'

const CapabilitiesScene = () => {
  const capabilities = [
    { title: 'Web Development', icon: '🌐', description: 'Modern web applications' },
    { title: 'Mobile Apps', icon: '📱', description: 'iOS & Android development' },
    { title: 'AI/ML', icon: '🤖', description: 'Artificial Intelligence solutions' },
    { title: 'Cloud', icon: '☁️', description: 'Scalable cloud infrastructure' },
    { title: 'Design', icon: '🎨', description: 'UI/UX design services' },
    { title: 'Consulting', icon: '💡', description: 'Technical consulting' },
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
          Our Capabilities
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 flex-1 max-h-[60vh] overflow-hidden">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              className="backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-lg p-3 md:p-4 lg:p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
              }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4 text-center">{capability.icon}</div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white mb-1 md:mb-2 text-center">
                {capability.title}
              </h3>
              <p className="text-white/70 text-xs md:text-sm text-center leading-tight">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CapabilitiesScene
