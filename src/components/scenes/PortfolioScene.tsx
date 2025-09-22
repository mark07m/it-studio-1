'use client'

import { motion } from 'framer-motion'

const PortfolioScene = () => {
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
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8"
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
              className="backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-lg p-4 md:p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2 md:mb-4">
                  {project.title}
                </h3>
                <p className="text-cyan-400 text-sm md:text-base mb-3">{project.tech}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-white/70 text-xs md:text-sm">{project.status}</span>
                <motion.button
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-cyan-400/20 border border-cyan-400/50 rounded-lg text-cyan-400 text-xs md:text-sm hover:bg-cyan-400/30 transition-all duration-300"
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
