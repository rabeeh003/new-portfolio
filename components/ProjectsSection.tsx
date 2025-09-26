'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Star, Award, Zap, Code, Monitor, ArrowRight, Play, Smartphone } from 'lucide-react';
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

interface Company {
  id: string;
  company: string;
  position: string;
  logoUrl: string;
}

interface Education {
  id: string;
  institution: string;
  courseName: string;
  logoUrl: string;
}

// App Store and Play Store Icons
const PlayStoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px]"
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
  >
    <path d="M3.59 1.59a1 1 0 011.32-.09l13.4 9.41c.36.25.58.66.58 1.1s-.22.85-.58 1.1l-13.4 9.41a1 1 0 01-1.32-.09A2.37 2.37 0 012.4 19.8V4.2c0-.66.28-1.26.71-1.81l.48-.8zM14.83 13.05l3.43 3.43-9.94 5.73 6.51-9.16zm3.43-5.52l-3.43 3.43-6.51-9.16 9.94 5.73z" />
  </svg>
);

const AppStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
    <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z" />
  </svg>
);

interface ProjectsSectionProps {
  projects: Project[];
  companies?: Company[];
  educations?: Education[];
}

export default function ProjectsSection({ projects, companies = [], educations = [] }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech'>('overview');
  const [companiesData, setCompaniesData] = useState<Company[]>(companies);
  const [educationsData, setEducationsData] = useState<Education[]>(educations);

  // Fetch companies and education data if not provided as props
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (companies.length === 0 || educations.length === 0) {
        try {
          const [companiesSnapshot, educationSnapshot] = await Promise.all([
            getDocs(collection(db, 'experiences')),
            getDocs(collection(db, 'education'))
          ]);

          const companyData = companiesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Company[];

          const educationData = educationSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Education[];

          setCompaniesData(companyData);
          setEducationsData(educationData);
        } catch (error) {
          console.error('Error fetching company/education data:', error);
        }
      }
    };

    fetchCompanyData();
  }, [companies, educations]);

  // Sort projects by order/position
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return 0;
  });

  // Helper function to get company/education data for a project
  const getCompanyData = (project: Project) => {
    if (project.type !== 'Company' || !project.companyId) return null;
    
    // Check if it's a company
    const company = companiesData.find(c => c.id === project.companyId);
    if (company) {
      return {
        type: 'company' as const,
        name: company.company,
        position: company.position,
        logoUrl: company.logoUrl
      };
    }
    
    // Check if it's an education institution
    const education = educationsData.find(e => e.id === project.companyId);
    if (education) {
      return {
        type: 'education' as const,
        name: `${education.institution} - ${education.courseName}`,
        position: education.courseName,
        logoUrl: education.logoUrl
      };
    }
    
    return null;
  };

  // Handle modal scroll lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div className="hidden lg:block">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group relative"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            {/* Card Background with Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-violet-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>

            <div 
              className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-500/10 cursor-pointer h-full flex flex-col"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20">
                  {project.thumbnailUrl ? (
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">💻</span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : project.status === 'Completed'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                      <Star size={12} className="text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Featured</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-300 hover:border-green-500/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-300">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Project Type Badge */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.type === 'Company' ? 'bg-green-500' :
                    project.type === 'Freelance' ? 'bg-blue-500' : 'bg-violet-500'
                  }`}></div>
                  <span className="text-xs text-gray-400">{project.type}</span>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
          // onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="min-h-screen py-12 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                onClick={() => console.log('clicked')}
                className="bg-gray-900/80 mt-10 relative backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                >
                  {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="fixed top-4 right-4 w-12 h-12 bg-gray-900/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-[60] shadow-lg border border-gray-700/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  >
                  <X size={24} />
                </motion.button>
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
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                      {/* Project Image */}
                      <div className="relative group">
                        <div className="aspect-video rounded-2xl overflow-hidden relative">
                          {/* Project Image */}
                          {selectedProject.imageUrl ? (
                            <div className="relative w-full h-full flex items-center justify-center p-4 group">
                              <img 
                                src={selectedProject.imageUrl} 
                                alt={selectedProject.title}
                                className="w-full h-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-6xl relative z-10">💻</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6">
                          {selectedProject.liveUrl && (
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                            >
                              <ExternalLink size={18} />
                              Live
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                          )}
                          {selectedProject.repoUrl && (
                            <a
                              href={selectedProject.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 group"
                            >
                              <Github size={18} />
                              Code
                              <Code size={14} className="group-hover:scale-110 transition-transform duration-300" />
                            </a>
                          )}
                          {selectedProject.playstoreUrl && (
                            <a
                              href={selectedProject.playstoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 group"
                            >
                              <PlayStoreIcon />
                              Play
                              <Smartphone size={14} className="group-hover:scale-110 transition-transform duration-300" />
                            </a>
                          )}
                          {selectedProject.appstoreUrl && (
                            <a
                              href={selectedProject.appstoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 group"
                            >
                              <AppStoreIcon />
                              iOS
                              <Smartphone size={14} className="group-hover:scale-110 transition-transform duration-300" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-8">
                        {/* Project Header */}
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            {selectedProject.iconUrl && (
                              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center p-3">
                                <img 
                                  src={selectedProject.iconUrl}
                                  alt={selectedProject.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            <div>
                              <h3 className="text-3xl font-bold text-white mb-2">
                                {selectedProject.title}
                              </h3>
                              <p className="text-gray-400 text-lg">
                                {selectedProject.subtitle}
                              </p>
                              <div className="flex items-center gap-4 mt-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  selectedProject.status === 'Live' 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                    : selectedProject.status === 'Completed'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                }`}>
                                  {selectedProject.status}
                                </span>
                                <span className="px-3 py-1 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-full text-sm font-medium">
                                  {selectedProject.type}
                                </span>
                                {selectedProject.featured && (
                                  <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                                    <Star size={14} className="text-green-400" />
                                    <span className="text-sm text-green-400 font-medium">Featured</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Company/Education Information */}
                        {selectedProject.type === 'Company' && getCompanyData(selectedProject) && (
                          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mb-8">
                            <div className="flex items-center gap-3">
                              {getCompanyData(selectedProject)?.logoUrl && (
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                                  <img 
                                    src={getCompanyData(selectedProject)?.logoUrl}
                                    alt={getCompanyData(selectedProject)?.name}
                                    className="w-full h-full object-contain rounded"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm truncate">
                                  {getCompanyData(selectedProject)?.name}
                                </h4>
                                <p className="text-gray-400 text-xs mt-1">
                                  {getCompanyData(selectedProject)?.position}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Tab Navigation */}
                        <div className="space-y-6">
                          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl">
                            {[
                              { id: 'overview', label: 'Overview', icon: Monitor },
                              { id: 'features', label: 'Features', icon: Zap },
                              { id: 'tech', label: 'Tech Stack', icon: Code }
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                  activeTab === tab.id
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                              >
                                <tab.icon size={18} />
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Tab Content */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeTab}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              {activeTab === 'overview' && (
                                <div className="space-y-4">
                                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Award size={20} className="text-green-400" />
                                    Project Overview
                                  </h4>
                                  <div className="bg-gray-800/50 rounded-xl p-6">
                                    <p className="text-gray-300 leading-relaxed">
                                      {selectedProject.story}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {activeTab === 'features' && (
                                <div className="space-y-4">
                                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Zap size={20} className="text-green-400" />
                                    Key Features
                                  </h4>
                                  <div className="space-y-3">
                                    {selectedProject.features.map((feature, index) => (
                                      <motion.div 
                                        key={index}
                                        className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                      >
                                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                          <span className="text-white text-sm font-semibold">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-300">{feature}</p>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {activeTab === 'tech' && (
                                <div className="space-y-4">
                                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Code size={20} className="text-green-400" />
                                    Technologies Used
                                  </h4>
                                  <div className="flex flex-wrap gap-3">
                                    {selectedProject.tech.map((tech, index) => (
                                      <motion.span 
                                        key={index}
                                        className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                      >
                                        {tech}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}