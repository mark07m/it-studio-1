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
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Portfolio
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {project.title}
              </h3>
              <p className="text-cyan-400 mb-4">{project.tech}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">{project.status}</span>
                <motion.button
                  className="px-4 py-2 bg-cyan-400/20 border border-cyan-400/50 rounded-lg text-cyan-400 text-sm hover:bg-cyan-400/30 transition-all duration-300"
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
