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
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Capabilities
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              className="backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
              }}
            >
              <div className="text-4xl mb-4">{capability.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {capability.title}
              </h3>
              <p className="text-white/70 text-sm">
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
