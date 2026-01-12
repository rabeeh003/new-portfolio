'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Facebook, MessageCircle, Clock, Globe, User, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'pkrabipk@gmail.com',
      href: 'mailto:pkrabipk@gmail.com',
      description: 'Send me an email anytime',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 7994779605',
      href: 'tel:+917994779605',
      description: 'Call or WhatsApp me',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kerala, India',
      href: '#',
      description: 'Available for remote work',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/rabeeh003',
      description: 'View my code repositories',
      color: 'hover:text-gray-300',
      bgColor: 'from-gray-600 to-gray-800'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rabeeh-pk/',
      description: 'Connect professionally',
      color: 'hover:text-blue-400',
      bgColor: 'from-blue-600 to-blue-800'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/yourusername',
      description: 'Follow for updates',
      color: 'hover:text-pink-400',
      bgColor: 'from-pink-600 to-rose-600'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      href: 'https://facebook.com/yourusername',
      description: 'Connect on Facebook',
      color: 'hover:text-blue-500',
      bgColor: 'from-blue-600 to-blue-700'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      href: 'https://wa.me/917994779605',
      description: 'Quick message',
      color: 'hover:text-green-400',
      bgColor: 'from-green-600 to-green-700'
    }
  ];

  const services = [
    'Web Application Development',
    'Mobile App Development',
    'E-commerce Solutions',
    'API Development & Integration',
    'Database Design & Optimization',
    'Cloud Deployment & DevOps',
    'UI/UX Design Implementation',
    'Performance Optimization',
    'Code Review & Refactoring',
    'Technical Consulting'
  ];

  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-lightblue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6">
              Let's Work Together
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm here to help you build amazing digital experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Available for new projects
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                Quick response time
              </span>
              <span className="flex items-center gap-2">
                <Globe size={16} className="text-violet-400" />
                Remote collaboration
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose your preferred way to connect. I'm always excited to discuss new opportunities and innovative projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                className="group relative overflow-hidden rounded-2xl p-8 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-lg text-gray-300 mb-2">{info.value}</p>
                <p className="text-gray-400">{info.description}</p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6">
              Connect With Me
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Follow me on social media for updates, insights, and behind-the-scenes content.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r ${social.bgColor} hover:shadow-2xl transition-all duration-300 ${social.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <social.icon size={32} className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-white mb-1">{social.name}</h3>
                  <p className="text-sm text-gray-200 opacity-80">{social.description}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6">
              What I Can Do For You
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I offer comprehensive development services to help you achieve your digital goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service}
                className="group relative overflow-hidden rounded-2xl p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-white font-medium">{service}</span>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl p-12 bg-gradient-to-r from-green-600/20 via-blue-600/20 to-violet-600/20 backdrop-blur-sm border border-gray-700/50"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and create something amazing together. I'm excited to hear about your project!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:pkrabipk@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} />
                Send Email
              </motion.a>
              <motion.a
                href="https://wa.me/917994779605"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-2xl font-semibold transition-all duration-300 border border-gray-600/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
                WhatsApp
              </motion.a>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-violet-500/5"></div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
