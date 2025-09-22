'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const PortfolioScene = () => {
  const { theme } = useAppStore()
  const projects = [
    { title: 'E-commerce Platform', tech: 'React, Node.js', status: 'Completed' },
    { title: 'Mobile Banking App', tech: 'React Native, Firebase', status: 'In Progress' },
    { title: 'AI Chatbot', tech: 'Python, OpenAI', status: 'Completed' },
    { title: 'Cloud Dashboard', tech: 'Vue.js, AWS', status: 'Completed' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <motion.h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Portfolio
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 flex-1 max-h-[60vh] overflow-hidden">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`backdrop-blur-[16px] rounded-lg p-4 md:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20 hover:bg-white/20'
                  : 'bg-white/70 border-gray-200/50 hover:bg-white/90'
              } border`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <div>
                <h3 className={`text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm md:text-base mb-3 ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                }`}>{project.tech}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className={`text-xs md:text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                }`}>{project.status}</span>
                <motion.button
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-cyan-400/20 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/30'
                      : 'bg-cyan-100 border-cyan-500/50 text-cyan-600 hover:bg-cyan-200'
                  } border`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortfolioScene
