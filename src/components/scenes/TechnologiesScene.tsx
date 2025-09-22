'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const TechnologiesScene = () => {
  const { theme } = useAppStore()
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
    <main className="w-full h-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 overflow-y-auto" role="main" aria-label="Technologies section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <header className="text-center mb-4">
          <motion.h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Technologies
          </motion.h2>
          <motion.p
            className={`text-sm md:text-base mt-4 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We use cutting-edge technologies and modern frameworks to build robust, scalable solutions
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-1 md:gap-2 flex-1"
          aria-label="Technology stack"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {technologies.map((tech, index) => (
            <motion.article
              key={tech.name}
              className="glass p-1 md:p-2 text-center transition-all duration-300 cursor-pointer flex flex-col justify-center hover:glass-dark"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
              }}
              role="article"
              aria-labelledby={`tech-${index}`}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white font-bold text-xs md:text-sm`} aria-hidden="true">
                {tech.name.charAt(0)}
              </div>
              <h3 
                id={`tech-${index}`}
                className={`text-xs font-semibold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {tech.name}
              </h3>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-white/70' : 'text-gray-600'
              }`}>
                {tech.category}
              </p>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default TechnologiesScene
