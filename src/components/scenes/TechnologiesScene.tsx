'use client'

import { motion } from 'framer-motion'

const TechnologiesScene = () => {
  const technologies = [
    { name: 'React', category: 'Frontend', color: 'from-blue-400 to-cyan-500' },
    { name: 'Next.js', category: 'Frontend', color: 'from-gray-400 to-gray-600' },
    { name: 'TypeScript', category: 'Language', color: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', category: 'Backend', color: 'from-green-400 to-green-600' },
    { name: 'Python', category: 'Language', color: 'from-yellow-400 to-orange-500' },
    { name: 'AWS', category: 'Cloud', color: 'from-orange-400 to-red-500' },
    { name: 'Docker', category: 'DevOps', color: 'from-blue-500 to-blue-700' },
    { name: 'MongoDB', category: 'Database', color: 'from-green-500 to-green-700' },
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
          Technologies
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white font-bold text-lg`}>
                {tech.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {tech.name}
              </h3>
              <p className="text-white/70 text-sm">
                {tech.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechnologiesScene
