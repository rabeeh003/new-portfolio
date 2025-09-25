'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Facebook, MessageCircle, ArrowRight, Star, Heart, Code, Coffee } from 'lucide-react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkDelay: number;
}

export default function Footer() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Create stars
    const newStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      blinkDelay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/rabeeh003', 
      label: 'GitHub',
      color: 'hover:text-gray-300',
      description: 'View my code'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/rabeeh-pk', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
      description: 'Professional network'
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/rabeeh_pk_/', 
      label: 'Instagram',
      color: 'hover:text-pink-400',
      description: 'Follow my journey'
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/', 
      label: 'Facebook',
      color: 'hover:text-blue-500',
      description: 'Connect with me'
    },
    { 
      icon: MessageCircle, 
      href: 'https://wa.me/917994779605', 
      label: 'WhatsApp',
      color: 'hover:text-green-400',
      description: 'Chat directly'
    },
    { 
      icon: Mail, 
      href: 'mailto:pkrabipk@gmail.com', 
      label: 'Email',
      color: 'hover:text-gray-300',
      description: 'Send email'
    },
  ];

  const quickLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Education', href: '/#education' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="relative bg-black py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/5 to-lightblue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              delay: star.blinkDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <motion.path
            d="M20,20 L40,40 L60,30 L80,50"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M70,70 L50,60 L30,80 L10,70"
            stroke="url(#gradient2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-4">
                Muhammed Rabeeh PK
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Full-stack developer passionate about creating innovative solutions and bringing ideas to life through code.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <div className="flex flex-wrap gap-4">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Mail size={16} className="text-green-400" />
                <span className="text-sm">pkrabipk@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <MessageCircle size={16} className="text-green-400" />
                <span className="text-sm">+91 79947 79605</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 p-3 bg-gray-900/50 hover:bg-gray-800/50 rounded-xl transition-all duration-300 ${social.color}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={16} />
                  <span className="text-sm font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>© {new Date().getFullYear()} Rabeeh PK. All rights reserved.</p>
          </motion.div>

          {/* Built with */}
          <motion.div
            className="flex items-center gap-2 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span>Built with</span>
            <motion.span
              className="text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={16} />
            </motion.span>
            <span>and</span>
            <motion.span
              className="text-yellow-500"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Coffee size={16} />
            </motion.span>
            <span>using</span>
            <Code size={16} className="text-green-400" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}