'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Education {
  id: string;
  institution: string;
  logoUrl: string;
  websiteUrl: string;
  courseName: string;
  startYear: string;
  endYear: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  color: string;
  order?: number;
}

export default function EducationSection() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'education'));
      const educationData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Education[];
      // Sort by order field first, then by latest
      const sortedEducations = educationData.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return 0;
      });
      setEducations(sortedEducations);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading education...</div>
      </section>
    );
  }

  const displayedEducations = showAll ? educations : educations.slice(0, 2);
  const hasMore = educations.length > 2;

  return (
    <section id="education" className="min-h-screen bg-black py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Education
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            My academic journey and educational achievements
          </motion.p>
        </motion.div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {displayedEducations.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="group relative h-full"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-teal-500/20 to-blue-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>

              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-500/10 h-full flex flex-col">
                {/* Institution Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={edu.logoUrl || '/api/placeholder/64/64'}
                        alt={edu.institution}
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg items-center justify-center text-3xl hidden">
                        🎓
                      </div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Award size={12} className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                      {edu.institution}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      {/* <MapPin size={16} className="text-green-400" /> */}
                      <span className="text-sm">{edu.description}</span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap items-center gap-3 mb-3'>
                  {/* <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                    {edu.type || 'Education'}
                  </span> */}
                  
                  {/* {edu.websiteUrl && (
                    <a
                      href={edu.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-300"
                    >
                      Visit Website
                    </a>
                  )} */}
                </div>

                {/* Course Details */}
                <div className="mb-6">
                  <div className="flex items-top gap-3 mb-4">
                    <div className={`min-w-10 h-10 bg-gradient-to-r ${edu.color} rounded-xl flex items-center justify-center`}>
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1 line-clamp-2">
                        {edu.courseName}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={16} className="text-green-400" />
                        <span className="text-sm">{edu.startYear} - {edu.endYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements Section */}
                <div className="flex-1">
                  {edu.achievements.length > 0 ? (
                    <div className="space-y-4">
                      <h5 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <Award size={18} />
                        Key Achievements
                      </h5>
                      <div className="space-y-3">
                        {edu.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm leading-relaxed">{achievement}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h5 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <Award size={18} />
                        Key Achievements
                      </h5>
                      <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                        <p className="text-gray-400 text-sm italic text-center">No specific achievements listed</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 hover:from-green-500 hover:via-teal-500 hover:to-blue-500 text-white rounded-2xl font-semibold transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-green-500/25 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <GraduationCap size={20} />
                Show More ({educations.length - 2} more)
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-teal-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}