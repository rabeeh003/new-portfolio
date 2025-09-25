'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Skill {
  id: string;
  name: string;
  icon: string;
  proficiency: number; // 1-8 scale
  category: string;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'skills'));
      const skillsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Skill[];
      setSkills(skillsData);
    } catch (error) {
      // Silently handle Firebase permissions error and use fallback data
      if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
        // Use fallback data when Firebase permissions are not configured
      } else {
        console.error('Error fetching skills:', error);
      }
      // Fallback to demo data if Firebase permissions are not set up
      const fallbackSkills: Skill[] = [
        { id: '1', name: 'React', icon: '⚛️', proficiency: 1, category: 'Frontend' },
        { id: '2', name: 'TypeScript', icon: '🔷', proficiency: 2, category: 'Frontend' },
        { id: '3', name: 'Next.js', icon: '▲', proficiency: 2, category: 'Frontend' },
        { id: '4', name: 'Node.js', icon: '🟢', proficiency: 3, category: 'Backend' },
        { id: '5', name: 'Firebase', icon: '🔥', proficiency: 3, category: 'Backend' },
        { id: '6', name: 'Tailwind CSS', icon: '🎨', proficiency: 2, category: 'Frontend' },
        { id: '7', name: 'JavaScript', icon: '💛', proficiency: 1, category: 'Frontend' },
        { id: '8', name: 'HTML/CSS', icon: '🌐', proficiency: 1, category: 'Frontend' },
        { id: '9', name: 'Git', icon: '📚', proficiency: 2, category: 'Tools' },
        { id: '10', name: 'MongoDB', icon: '🍃', proficiency: 4, category: 'Backend' },
        { id: '11', name: 'Express.js', icon: '🚀', proficiency: 3, category: 'Backend' },
        { id: '12', name: 'Python', icon: '🐍', proficiency: 4, category: 'Backend' }
      ];
      setSkills(fallbackSkills);
    } finally {
      setLoading(false);
    }
  };

  const getSkillSize = (proficiency: number) => {
    const sizes = {
      1: 'w-32 h-32 text-4xl', // Largest
      2: 'w-28 h-28 text-3xl',
      3: 'w-24 h-24 text-2xl',
      4: 'w-20 h-20 text-xl',
      5: 'w-16 h-16 text-lg',
      6: 'w-14 h-14 text-base',
      7: 'w-12 h-12 text-sm',
      8: 'w-10 h-10 text-xs'  // Smallest
    };
    return sizes[proficiency] || sizes[5];
  };

  const getGlowIntensity = (proficiency: number) => {
    const intensity = Math.max(1, 9 - proficiency);
    return `shadow-[0_0_${intensity * 4}px_${intensity * 2}px_rgba(147,51,234,0.${intensity})]`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-white text-xl">Loading skills...</div>
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-6xl font-light text-white mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Technologies
        </motion.h2>

        {/* Rotating Skills Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl">
            {skills.map((skill, index) => {
              const angle = (index * 360) / skills.length;
              const radius = 200;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={skill.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    x: x,
                    y: y,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className={`
                      ${getSkillSize(skill.proficiency)}
                      bg-gradient-to-br from-purple-600/20 to-blue-600/20 
                      backdrop-blur-sm border border-purple-500/30 
                      rounded-2xl flex flex-col items-center justify-center 
                      cursor-pointer transition-all duration-300
                      hover:border-purple-400 hover:bg-purple-500/30
                      ${getGlowIntensity(skill.proficiency)}
                    `}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                    }}
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="mb-2">
                      {skill.icon.startsWith('http') ? (
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-2xl">{skill.icon}</span>
                      )}
                    </div>
                    <div className="text-white font-medium text-center px-2">
                      {skill.name}
                    </div>
                    <div className="text-purple-300 text-xs mt-1">
                      Level {skill.proficiency}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Logo/Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-white text-2xl font-bold">RP</span>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid (Alternative View) */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={`grid-${skill.id}`}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(147, 51, 234, 0.2)",
                }}
              >
                <div className="mb-3">
                  {skill.icon.startsWith('http') ? (
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-8 h-8 object-contain mx-auto"
                    />
                  ) : (
                    <span className="text-2xl">{skill.icon}</span>
                  )}
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{skill.name}</h3>
                <div className="flex justify-center">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full mx-0.5 ${
                        i < skill.proficiency 
                          ? 'bg-purple-500' 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-purple-300 text-xs mt-2">
                  {skill.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}