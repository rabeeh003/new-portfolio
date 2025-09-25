'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Star, Award, Zap, Code, Monitor, ArrowRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from '@/components/Header';
import ProjectsSection from '@/components/ProjectsSection';
import ProjectsSectionMobile from '@/components/ProjectsSectionMobile';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  featured: boolean;
  type: 'Hobby' | 'Freelance' | 'Company';
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | Project['type']>('All');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [availableTech, setAvailableTech] = useState<string[]>([]);
  const [showAllTech, setShowAllTech] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle modal scroll lock
  useEffect(() => {
    if (showAllTech) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAllTech]);

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

      // Extract unique tech stack items
      const techSet = new Set<string>();
      projectData.forEach(project => {
        project.tech.forEach(tech => techSet.add(tech));
      });
      setAvailableTech(Array.from(techSet).sort());

      // Sort projects by featured first, then by order
      const sortedProjects = projectData.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return 0;
      });

      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || project.type === selectedType;

    const matchesTech = selectedTech.length === 0 ||
      selectedTech.every(tech => project.tech.includes(tech));

    return matchesSearch && matchesType && matchesTech;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-lightblue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <Header />
        <div className="py-20 flex items-center justify-center relative z-10">
          <div className="text-white text-xl">Loading projects...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-lightblue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Projects
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore my complete portfolio and discover innovative solutions
          </motion.p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="mb-16 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects by name or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-6">
            {/* Project Type Filters */}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Award size={16} className="text-green-400" />
                Project Type
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                <motion.button
                  onClick={() => {
                    setSelectedType('All');
                    setSelectedTech([]);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedType === 'All' && selectedTech.length === 0
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                {['Hobby', 'Freelance', 'Company'].map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedType(type as Project['type'])}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedType === type
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Technology Filters */}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Code size={16} className="text-blue-400" />
                Technologies
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {availableTech.slice(0, isMobile ? 6 : 8).map((tech) => (
                  <motion.button
                    key={tech}
                    onClick={() => {
                      setSelectedTech(prev =>
                        prev.includes(tech)
                          ? prev.filter(t => t !== tech)
                          : [...prev, tech]
                      );
                    }}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTech.includes(tech)
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.button>
                ))}

                {/* More Technologies Button */}
                {availableTech.length > (isMobile ? 6 : 8) && (
                  <motion.button
                    onClick={() => setShowAllTech(true)}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +{availableTech.length - (isMobile ? 6 : 8)} More
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedType !== 'All' || selectedTech.length > 0) && (
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm text-gray-400">Active filters:</span>
              {selectedType !== 'All' && (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
                  {selectedType}
                </span>
              )}
              {selectedTech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedTech([]);
                }}
                className="px-3 py-1 bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50 rounded-full text-sm transition-colors duration-300"
              >
                Clear All
              </button>
            </motion.div>
          )}

          {/* Advanced Filters Modal */}
          <AnimatePresence>
            {showAllTech && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAllTech(false)}
                />
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 w-full max-w-4xl relative"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-violet-500/10 rounded-2xl"></div>
                    
                    {/* Close button */}
                    <motion.button
                      onClick={() => setShowAllTech(false)}
                      className="absolute -top-3 -right-3 w-10 h-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-700/50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                          <Filter size={24} className="text-green-400" />
                          Advanced Filters
                        </h2>
                        <p className="text-gray-400">Refine your project search with detailed filters</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Project Type Section */}
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                              <Award size={18} className="text-green-400" />
                              Project Type
                            </h3>
                            <button
                              onClick={() => {
                                setSelectedType('All');
                                setSelectedTech([]);
                              }}
                              className="text-sm text-green-400 hover:text-green-300 transition-colors"
                            >
                              Clear All
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <motion.button
                              onClick={() => {
                                setSelectedType('All');
                                setSelectedTech([]);
                              }}
                              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                selectedType === 'All' && selectedTech.length === 0
                                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              All Projects
                            </motion.button>
                            {['Hobby', 'Freelance', 'Company'].map((type) => (
                              <motion.button
                                key={type}
                                onClick={() => setSelectedType(type as Project['type'])}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                  selectedType === type
                                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {type}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Technologies Section */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Code size={18} className="text-blue-400" />
                            Technologies ({availableTech.length})
                          </h3>
                          <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
                            {availableTech.map((tech) => (
                              <motion.button
                                key={tech}
                                onClick={() => {
                                  setSelectedTech(prev =>
                                    prev.includes(tech)
                                      ? prev.filter(t => t !== tech)
                                      : [...prev, tech]
                                  );
                                }}
                                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                  selectedTech.includes(tech)
                                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {tech}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-700/50">
                        <div className="text-sm text-gray-400">
                          {selectedType !== 'All' || selectedTech.length > 0 ? (
                            <span>
                              {selectedType !== 'All' && `${selectedType} projects`}
                              {selectedType !== 'All' && selectedTech.length > 0 && ' • '}
                              {selectedTech.length > 0 && `${selectedTech.length} technologies selected`}
                            </span>
                          ) : (
                            'No filters applied'
                          )}
                        </div>
                        <div className="flex gap-3">
                          <motion.button
                            onClick={() => {
                              setSelectedType('All');
                              setSelectedTech([]);
                            }}
                            className="px-6 py-2 bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Clear All
                          </motion.button>
                          <motion.button
                            onClick={() => setShowAllTech(false)}
                            className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Apply Filters
                            <ArrowRight size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <Monitor size={24} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''} Found
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {filteredProjects.length === projects.length 
                      ? 'Showing all projects' 
                      : `Filtered from ${projects.length} total projects`
                    }
                  </p>
                </div>
              </div>
              
              {filteredProjects.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Star size={16} className="text-yellow-400" />
                  <span>
                    {filteredProjects.filter(p => p.featured).length} featured
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Projects Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="hidden lg:block">
            <ProjectsSection projects={filteredProjects} />
          </div>
          <div className="lg:hidden">
            <ProjectsSectionMobile projects={filteredProjects} />
          </div>
        </motion.div>

        {/* No Results State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <motion.button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedTech([]);
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
              Clear All Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}