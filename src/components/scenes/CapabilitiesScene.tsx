'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const CapabilitiesScene = () => {
  const { theme } = useAppStore()
  const capabilities = [
    { 
      title: 'Web Development', 
      icon: '🌐', 
      description: 'Full-stack web applications with React, Next.js, and Node.js. Responsive, scalable websites.',
      features: ['Frontend & Backend', 'PWA', 'E-commerce']
    },
    { 
      title: 'Mobile Apps', 
      icon: '📱', 
      description: 'Native and cross-platform mobile apps for iOS and Android. From concept to App Store.',
      features: ['iOS & Android', 'React Native', 'Flutter']
    },
    { 
      title: 'AI/ML Solutions', 
      icon: '🤖', 
      description: 'Intelligent automation and machine learning solutions for business transformation.',
      features: ['Machine Learning', 'NLP', 'Computer Vision']
    },
    { 
      title: 'Cloud Infrastructure', 
      icon: '☁️', 
      description: 'Scalable cloud solutions using AWS, Azure, and Google Cloud.',
      features: ['AWS/Azure/GCP', 'DevOps', 'Microservices']
    },
    { 
      title: 'UI/UX Design', 
      icon: '🎨', 
      description: 'User-centered design combining aesthetics with functionality.',
      features: ['User Research', 'Prototyping', 'Design Systems']
    },
    { 
      title: 'Technical Consulting', 
      icon: '💡', 
      description: 'Strategic technology guidance for informed decisions.',
      features: ['Architecture Review', 'Tech Strategy', 'Digital Transformation']
    },
  ]

  return (
    <main className="w-full h-full flex items-start justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 overflow-y-auto" role="main" aria-label="Our capabilities section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full flex flex-col">
        <header className="text-center mb-3">
          <motion.h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Capabilities
          </motion.h2>
          <motion.p
            className={`text-xs md:text-sm mt-2 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive technology solutions to transform your ideas into reality
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3"
          aria-label="Capabilities list"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.title}
              className="glass p-2 transition-all duration-300 cursor-pointer flex flex-col hover:glass-dark"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
              }}
              role="article"
              aria-labelledby={`capability-${index}`}
            >
              <div className="text-xl md:text-2xl mb-2 text-center" aria-hidden="true">{capability.icon}</div>
              <h3 
                id={`capability-${index}`}
                className={`text-sm md:text-base font-semibold mb-1 text-center ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {capability.title}
              </h3>
              <p className={`text-xs text-center leading-relaxed mb-2 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-600'
              }`}>
                {capability.description}
              </p>
              <ul className="space-y-0.5 mt-auto" aria-label={`${capability.title} features`}>
                {capability.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className={`text-xs flex items-center ${
                      theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                    }`}
                  >
                    <span className="mr-1" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default CapabilitiesScene
