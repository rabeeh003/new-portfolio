'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, MapPin, Briefcase } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Experience {
  id: string;
  company: string;
  logoUrl: string;
  websiteUrl: string;
  position: string;
  duration: string;
  location: string;
  type: string;
  projectsCount: number;
  description: string;
  responsibilities: string[];
  technologies: string[];
  color: string;
  order?: number;
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [expandedTech, setExpandedTech] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'experiences'));
      const experienceData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Experience[];
      // Sort by order field first, then by latest
      const sortedExperiences = experienceData.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return 0;
      });
      setExperiences(sortedExperiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading experiences...</div>
      </section>
    );
  }

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);
  const hasMore = experiences.length > 2;

  const toggleTechExpansion = (expId: string) => {
    setExpandedTech(prev => {
      const newSet = new Set(prev);
      if (newSet.has(expId)) {
        newSet.delete(expId);
      } else {
        newSet.add(expId);
      }
      return newSet;
    });
  };

  return (
    <section id="experience" className="min-h-screen bg-black py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            My professional journey and career achievements
          </motion.p>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {displayedExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="group relative h-full"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>

              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/10 h-full flex flex-col">
                {/* Company Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={exp.logoUrl || '/api/placeholder/64/64'}
                        alt={exp.company}
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg items-center justify-center text-3xl hidden">
                        💼
                      </div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Star size={12} className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                      {exp.company}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={16} className="text-purple-400" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30">
                      {exp.projectsCount}+ Projects
                    </span>
                    {exp.websiteUrl && (
                      <a
                        href={exp.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-300"
                      >
                        Website
                      </a>
                    )}
                    {/* <span className="px-3 py-1 flex gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30">
                    <MapPin size={16} className="text-purple-400" />
                    <span className="text-sm">{exp.location}</span>
                    </span> */}
                  </div>

                </div>

                {/* Position Details */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${exp.color} rounded-xl flex items-center justify-center`}>
                      <Briefcase size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">
                        {exp.position}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-purple-400 flex-shrink-0" />
                          <span className="text-sm">{exp.duration}</span>
                        </div>
                        <span className="hidden sm:block text-sm">•</span>
                        <span className="text-sm">{exp.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Sections with Flex */}
                <div className="flex-1 flex flex-col space-y-6">
                  {/* Responsibilities Section */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Briefcase size={18} />
                      Key Responsibilities
                    </h5>
                    <div className="space-y-3">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 text-sm leading-relaxed">{responsibility}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Section */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                      <Star size={18} />
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const isExpanded = expandedTech.has(exp.id);
                        const maxVisible = 4; // Show max 4 items on small devices
                        const visibleTechs = isExpanded ? exp.technologies : exp.technologies.slice(0, maxVisible);
                        const remainingCount = exp.technologies.length - maxVisible;

                        return (
                          <>
                            {visibleTechs.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                            {!isExpanded && remainingCount > 0 && (
                              <motion.button
                                onClick={() => toggleTechExpansion(exp.id)}
                                className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: maxVisible * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                +{remainingCount} more
                              </motion.button>
                            )}
                            {isExpanded && remainingCount > 0 && (
                              <motion.button
                                onClick={() => toggleTechExpansion(exp.id)}
                                className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: exp.technologies.length * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Show less
                              </motion.button>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && !showAll && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white rounded-2xl font-semibold transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase size={20} />
                Show More ({experiences.length - 2} more)
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}