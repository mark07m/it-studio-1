'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAppStore } from '@/store/appStore'

const ContactScene = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const { theme } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-6xl w-full h-full flex flex-col justify-center">
        <motion.h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1 max-h-[60vh] overflow-y-auto">
          {/* note: backdrop-filter needs non-clipped background */}
          {/* Contact Info */}
          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className={`text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Let&apos;s Talk</h3>
              <p className={`text-sm md:text-base mb-4 md:mb-6 ${
                theme === 'dark' ? 'text-white/70' : 'text-gray-600'
              }`}>
                Ready to bring your idea to life? We&apos;d love to hear from you and discuss how we can help.
              </p>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 text-sm md:text-base lg:text-xl">📧</span>
                </div>
                <div>
                  <p className={`font-semibold text-sm md:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>Email</p>
                  <p className={`text-xs md:text-sm ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                  }`}>hello@itstudio.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 text-sm md:text-base lg:text-xl">📱</span>
                </div>
                <div>
                  <p className={`font-semibold text-sm md:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>Phone</p>
                  <p className={`text-xs md:text-sm ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                  }`}>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 text-sm md:text-base lg:text-xl">📍</span>
                </div>
                <div>
                  <p className={`font-semibold text-sm md:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>Location</p>
                  <p className={`text-xs md:text-sm ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                  }`}>San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <label className={`block font-semibold mb-2 text-sm md:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 md:px-4 md:py-3 glass focus:outline-none transition-all duration-300 text-sm md:text-base focus:ring-2 focus:ring-cyan-400/50`}
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label className={`block font-semibold mb-2 text-sm md:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 md:px-4 md:py-3 glass focus:outline-none transition-all duration-300 text-sm md:text-base focus:ring-2 focus:ring-cyan-400/50`}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label className={`block font-semibold mb-2 text-sm md:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className={`w-full px-3 py-2 md:px-4 md:py-3 backdrop-blur-[16px] rounded-lg focus:outline-none transition-all duration-300 resize-none text-sm md:text-base ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-cyan-400/50'
                    : 'bg-white/25 border-gray-200/50 text-gray-800 placeholder-gray-500 focus:border-cyan-500/50'
                } border`}
                placeholder="Tell us about your project..."
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.4)] text-sm md:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

export default ContactScene
