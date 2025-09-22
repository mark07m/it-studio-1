'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const ContactScene = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Let&apos;s Talk</h3>
              <p className="text-white/70 mb-6">
                Ready to bring your idea to life? We&apos;d love to hear from you and discuss how we can help.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                  📧
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-white/70">hello@itstudio.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <p className="text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                  📍
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-white/70">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <label className="block text-white font-semibold mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 backdrop-blur-[16px] bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 transition-all duration-300 resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.4)]"
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
