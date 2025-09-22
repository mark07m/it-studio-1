'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'

const CapabilitiesScene = () => {
  const { theme } = useAppStore()
  const capabilities = [
    { 
      title: 'Web Development', 
      icon: '🌐', 
      description: 'Full-stack web applications with modern frameworks like React, Next.js, and Node.js. We build responsive, scalable, and performant websites that deliver exceptional user experiences.',
      features: ['Frontend & Backend', 'Progressive Web Apps', 'E-commerce Solutions']
    },
    { 
      title: 'Mobile Apps', 
      icon: '📱', 
      description: 'Native and cross-platform mobile applications for iOS and Android. From concept to App Store, we create intuitive mobile experiences that engage users.',
      features: ['iOS & Android', 'React Native', 'Flutter Development']
    },
    { 
      title: 'AI/ML Solutions', 
      icon: '🤖', 
      description: 'Intelligent automation and machine learning solutions that transform your business processes. We integrate AI capabilities to enhance decision-making and efficiency.',
      features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision']
    },
    { 
      title: 'Cloud Infrastructure', 
      icon: '☁️', 
      description: 'Scalable cloud solutions using AWS, Azure, and Google Cloud. We design, deploy, and maintain robust cloud architectures that grow with your business.',
      features: ['AWS/Azure/GCP', 'DevOps & CI/CD', 'Microservices Architecture']
    },
    { 
      title: 'UI/UX Design', 
      icon: '🎨', 
      description: 'User-centered design that combines aesthetics with functionality. Our design team creates intuitive interfaces that delight users and drive engagement.',
      features: ['User Research', 'Prototyping', 'Design Systems']
    },
    { 
      title: 'Technical Consulting', 
      icon: '💡', 
      description: 'Strategic technology guidance to help you make informed decisions. We provide expert advice on architecture, technology selection, and digital transformation.',
      features: ['Architecture Review', 'Technology Strategy', 'Digital Transformation']
    },
  ]

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-20 sm:pt-24" role="main" aria-label="Our capabilities section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <header className="text-center mb-8">
          <motion.h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Capabilities
          </motion.h2>
          <motion.p
            className={`text-sm md:text-base mt-4 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We offer comprehensive technology solutions to transform your ideas into reality
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 flex-1"
          aria-label="Capabilities list"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.title}
              className="glass p-3 md:p-4 transition-all duration-300 cursor-pointer flex flex-col hover:glass-dark"
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
              <div className="text-2xl md:text-3xl mb-3 text-center" aria-hidden="true">{capability.icon}</div>
              <h3 
                id={`capability-${index}`}
                className={`text-base md:text-lg font-semibold mb-2 text-center ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {capability.title}
              </h3>
              <p className={`text-xs md:text-sm text-center leading-relaxed mb-3 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-600'
              }`}>
                {capability.description}
              </p>
              <ul className="space-y-1 mt-auto" aria-label={`${capability.title} features`}>
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
