'use client';

import { Github, Linkedin, Download, User, Briefcase, FolderOpen, GraduationCap, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HeroSection() {
  const [showProfile, setShowProfile] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Violet lighting animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulseGlow"></div>
        <style jsx>{`
          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.1);
            }
          }
          .animate-pulseGlow {
            animation: pulseGlow 4s ease-in-out infinite;
          }
        `}</style>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Profile Avatar */}
          <div className="mb-8">
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-xl ring-4 ring-purple-500/30"
                onClick={() => setShowProfile(true)}
              >
                <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full ring-2 ring-gray-900"></div>
            </motion.div>
          </div>

          {/* Headings */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Rabeeh PK</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 font-medium">
            Fullstack, Mobile & Desktop App Developer
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Crafting seamless digital experiences across web, mobile, and desktop with modern tech stacks and a passion for innovation.
          </p>

          {/* Navigation Buttons */}
          {/* <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {[
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'projects', label: 'Projects', icon: FolderOpen },
              { id: 'education', label: 'Education', icon: GraduationCap },
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-purple-600/90 hover:bg-purple-700 text-white rounded-full text-sm sm:text-base font-medium shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                {label}
              </motion.button>
            ))}
          </div> */}

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <a
              href="https://www.linkedin.com/in/rabeeh-pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="https://github.com/rabeeh003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full text-sm sm:text-base font-medium transition-colors"
          >
            <Download size={20} />
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowProfile(false)}
        >
          <motion.div
            className="bg-gray-800/95 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Rabeeh PK</h3>
              <p className="text-purple-400 text-sm sm:text-base font-medium">Fullstack, Mobile & Desktop Developer</p>
            </div>

            <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>pkrabipk@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span>+91 7994779605</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-purple-400" />
                <span>Open to opportunities</span>
              </div>
            </div>

            <div className="mt-6 pt-4 sm:pt-6 border-t border-gray-700 flex gap-3">
              <a
                href="mailto:pkrabipk@gmail.com"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full text-sm sm:text-base font-medium transition-colors"
              >
                Contact Me
              </a>
              <button
                onClick={() => setShowProfile(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full text-sm sm:text-base font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}