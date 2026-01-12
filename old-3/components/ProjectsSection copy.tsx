'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ProjectsSectionMobile from './ProjectsSectionMobile';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  featured: boolean;
  type: 'Hobby' | 'Freelance' | 'Company';
  companyId?: string;
  thumbnailUrl: string;
  imageUrl: string;
  iconUrl: string;
  status: 'Live' | 'Under Construction' | 'Completed';
  story: string;
  features: string[];
  tech: string[];
  liveUrl: string;
  repoUrl: string;
  playstoreUrl: string;
  appstoreUrl: string;
  order?: number;
}

export default function ProjectsSection() {
  // Hide this component on mobile screens
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <DesktopProjectsSection />
      </div>

      {/* Mobile Version */}
      <ProjectsSectionMobile />
    </>
  );
}

function DesktopProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      // Sort by latest first (assuming you want reverse order of creation)
      const sortedProjects = projectData.reverse();
      setProjects(sortedProjects);
      if (projectData.length > 0) {
        setSelectedProject(sortedProjects[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="min-h-screen bg-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">No projects found.</div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-6xl font-light text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>

        {/* Horizontal Scrolling Projects */}
        <div className="mb-16">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="flex-shrink-0 w-80"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className={`project-card cursor-pointer bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300 ${
                    selectedProject?.id === project.id ? 'border-purple-500 ring-2 ring-purple-500/20' : ''
                  } border rounded-lg`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-t-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      {project.thumbnailUrl ? (
                        <img 
                          src={project.thumbnailUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="relative z-10 text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                              <span className="text-2xl">💻</span>
                            </div>
                            <div className="text-white font-medium">{project.title}</div>
                          </div>
                        </>
                      )}
                      {project.featured && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-gray-300 text-sm line-clamp-3">{project.story}</p>
                      <div className="mt-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          project.status === 'Live' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Project Details */}
        {selectedProject && (
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-start"
          key={selectedProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Project Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
              {selectedProject.imageUrl ? (
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <span className="text-4xl">💻</span>
                    </div>
                    <div className="text-white text-xl font-medium">{selectedProject.title}</div>
                    <div className="text-gray-300 text-sm mt-2">{selectedProject.subtitle}</div>
                  </div>
                </>
              )}
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
              <div className="text-center">
                {selectedProject.iconUrl ? (
                  <img 
                    src={selectedProject.iconUrl} 
                    alt={selectedProject.title}
                    className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl">💻</span>
                  </div>
                )}
                <h4 className="text-white font-semibold text-sm">{selectedProject.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{selectedProject.subtitle}</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  Live
                </a>
              )}
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Repo
                </a>
              )}
              {selectedProject.playstoreUrl && (
                <a
                  href={selectedProject.playstoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <span className="text-sm">📱</span>
                  Play Store
                </a>
              )}
              {selectedProject.appstoreUrl && (
                <a
                  href={selectedProject.appstoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <span className="text-sm">🍎</span>
                  App Store
                </a>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✦</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">Story</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {selectedProject.story}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✦</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">Features</h3>
              </div>
              <div className="space-y-3">
                {selectedProject.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 text-sm font-semibold">{index + 1}</span>
                      </div>
                      <p className="text-gray-300">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}