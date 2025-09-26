'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Star, Award, Zap, ArrowRight, Play, Code, Smartphone, Monitor } from 'lucide-react';

// App Store and Play Store Icons
const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 01-.497-.544A2.371 2.371 0 012.4 19.8V4.2c0-.67.28-1.275.713-1.842zM14.835 13.045l3.427 3.427-9.942 5.736 6.515-9.163zm3.427-5.517l-3.427 3.427-6.515-9.163 9.942 5.736zM5.747 2.31l8.145 4.701-3.427 3.427L5.747 2.31zm0 19.38l4.718-8.128 3.427 3.427-8.145 4.701z" />
  </svg>
);

const AppStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
    <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z" />
  </svg>
);
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

export default function FeaturedProjectsMobile() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech'>('overview');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  // Clear selected project when component unmounts
  useEffect(() => {
    return () => {
      setSelectedProject(null);
    };
  }, []);

  // Helper function to get company/education data for a project
  const getCompanyData = (project: Project) => {
    if (project.type !== 'Company' || !project.companyId) return null;
    
    // Check if it's a company
    const company = companies.find(c => c.id === project.companyId);
    if (company) {
      return {
        type: 'company' as const,
        name: company.company,
        position: company.position,
        logoUrl: company.logoUrl
      };
    }
    
    // Check if it's an education institution
    const education = educations.find(e => e.id === project.companyId);
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

  const fetchProjects = async () => {
    try {
      // Fetch projects, companies, and education data
      const [projectsSnapshot, companiesSnapshot, educationSnapshot] = await Promise.all([
        getDocs(collection(db, 'projects')),
        getDocs(collection(db, 'experiences')),
        getDocs(collection(db, 'education'))
      ]);

      // Process projects
      const projectData = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      
      // Process companies
      const companyData = companiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Company[];

      // Process education
      const educationData = educationSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Education[];
      
      // Filter featured projects and sort them
      const featuredProjects = projectData
        .filter(p => p.featured)
        .sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
          if (a.order !== undefined) return -1;
          if (b.order !== undefined) return 1;
          return 0;
        });
      
      setProjects(featuredProjects);
      setCompanies(companyData);
      setEducations(educationData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="lg:hidden min-h-screen bg-black py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-lightblue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-800 rounded-lg w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-5 bg-gray-800 rounded w-64 mx-auto animate-pulse"></div>
          </div>

          {/* Projects Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 animate-pulse">
                <div className="aspect-video bg-gray-800 rounded-xl mb-6"></div>
                <div className="space-y-4">
                  <div className="h-5 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="h-5 bg-gray-800 rounded w-12"></div>
                    <div className="h-5 bg-gray-800 rounded w-16"></div>
                    <div className="h-5 bg-gray-800 rounded w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden min-h-screen bg-black py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-lightblue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Showcasing my best work and innovative solutions
          </motion.p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-violet-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>

              <div 
                className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-500/10 cursor-pointer"
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
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                      <Star size={12} className="text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Featured</span>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
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

          {/* View All Projects Card */}
          <motion.a
            href="/projects"
            onClick={() => setSelectedProject(null)}
            className="group relative"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: projects.length * 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Card Background with Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-violet-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>

            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-green-500/10 h-full flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <ExternalLink size={28} className="text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                View All Projects
              </h3>
              <p className="text-gray-400 text-sm text-center mb-4">
                Explore my complete portfolio
              </p>
              <div className="flex items-center gap-2 text-green-400 group-hover:gap-3 transition-all duration-300">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </motion.a>
        </div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="min-h-screen flex flex-col">
                {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-800/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 z-10"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>

                {/* Project Content */}
                <div className="max-w-lg mx-auto w-full py-12">
                  {/* Project Image */}
                  <motion.div 
                    className="aspect-video rounded-2xl overflow-hidden mb-8 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-violet-500/10 animate-gradient">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent)] animate-pulse-slow"></div>
                    </div>
                    
                    {/* Mesh Pattern */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }}></div>

                    {/* Project Image */}
                    {selectedProject.imageUrl ? (
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        <img 
                          src={selectedProject.imageUrl} 
                          alt={selectedProject.title}
                          className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl relative z-10">💻</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Project Header */}
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-400 text-lg mb-4">
                      {selectedProject.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-4">
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
                    </div>
                  </motion.div>

                  {/* Company/Education Information */}
                  {selectedProject.type === 'Company' && getCompanyData(selectedProject) && (
                    <motion.div 
                      className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.25 }}
                    >
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
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 group"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
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
                        <span>Code</span>
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
                        <span>Play</span>
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
                        <span>iOS</span>
                        <Smartphone size={14} className="group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    )}
                  </motion.div>

                  {/* Tab Navigation */}
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                  >
                    <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl">
                      {[
                        { id: 'overview', label: 'Overview', icon: Monitor },
                        { id: 'features', label: 'Features', icon: Zap },
                        { id: 'tech', label: 'Tech Stack', icon: Code }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            activeTab === tab.id
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                          }`}
                        >
                          <tab.icon size={16} />
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
                        transition={{ duration: 0.2 }}
                      >
                        {activeTab === 'overview' && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Award size={18} className="text-green-400" />
                              Project Overview
                            </h4>
                            <div className="bg-gray-800/50 rounded-xl p-4">
                              <p className="text-gray-300 leading-relaxed">
                                {selectedProject.story}
                              </p>
                            </div>
                          </div>
                        )}

                        {activeTab === 'features' && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Zap size={18} className="text-green-400" />
                              Key Features
                            </h4>
                            <div className="space-y-3">
                              {selectedProject.features.map((feature, index) => (
                                <motion.div 
                                  key={index}
                                  className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.1 }}
                                >
                                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-sm font-semibold">{index + 1}</span>
                                  </div>
                                  <p className="text-gray-300 text-sm">{feature}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeTab === 'tech' && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Code size={18} className="text-green-400" />
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
                  </motion.div>

                  {/* Bottom Close Button */}
                  <motion.div 
                    className="sticky -bottom-5 bg-black/90 backdrop-blur-sm border-t border-gray-700/50 p-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.6 }}
                  >
                    <motion.button
                      onClick={() => setSelectedProject(null)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X size={20} />
                      Close Project Details
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
