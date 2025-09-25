'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, ArrowRight, Star, Award, Zap } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the WhatsApp message
    const message = `*New Message*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n\n` +
      `*Message:*\n${formData.message}`;
    
    // Create WhatsApp URL with pre-filled message
    const whatsappUrl = `https://wa.me/917994779605?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/917994779605',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Chat with me directly'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/yourusername',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      description: 'Follow my journey'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/yourusername',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: 'Connect with me'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:your@email.com',
      color: 'from-gray-500 to-gray-600',
      hoverColor: 'hover:from-gray-600 hover:to-gray-700',
      description: 'Send me an email'
    }
  ];

  return (
    <section id="contact" className="min-h-screen bg-black py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-lightblue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's Connect
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to bring your ideas to life? Let's discuss your next project
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Card Background with Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-violet-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>

            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-500/10">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-violet-500/10 rounded-2xl animate-gradient">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent)] animate-pulse-slow"></div>
              </div>
              
              {/* Mesh Pattern */}
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center p-3">
                    <MessageSquare size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                    <p className="text-gray-400">Get in touch and let's discuss your project</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 resize-none transition-all duration-300"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={20} />
                    Send via WhatsApp
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award size={24} className="text-green-400" />
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <Mail size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">pkrabipk@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <Phone size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">+91 79947 79605</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <MapPin size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">Kerala, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Zap size={24} className="text-green-400" />
                Follow Me
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden rounded-xl p-4 bg-gradient-to-r ${social.color} ${social.hoverColor} transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <social.icon size={20} className="text-white" />
                        <span className="text-white font-semibold">{social.name}</span>
                      </div>
                      <p className="text-white/80 text-sm">{social.description}</p>
                    </div>
                    
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.a>
                ))}
              </div>
            </div> */}

            {/* Quick Response */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star size={20} className="text-green-400" />
                <h4 className="text-lg font-semibold text-white">Quick Response</h4>
              </div>
              <p className="text-gray-300 text-sm">
                I typically respond within 24 hours. For urgent matters, WhatsApp is the fastest way to reach me.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
