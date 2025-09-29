'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github, ArrowUp, ArrowDown, Filter, Search, Grid, List, Eye, Calendar, Tag, Star, EyeOff } from 'lucide-react';

interface Project {
  id?: string;
  order?: number;
  title: string;
  subtitle: string;
  featured: boolean;
  published: boolean;
  type: 'Hobby' | 'Freelance' | 'Company';
  companyId?: string;
  description: string;
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
}

interface Experience {
  id: string;
  company: string;
}

interface Education {
  id: string;
  institution: string;
  courseName: string;
}

interface CompanyOption {
  id: string;
  name: string;
  type: 'company' | 'course';
}

interface ProjectManagerProps {
  onOpenModal: () => void;
  onEditModal: (project: Project) => void;
}

export default function ProjectManager({ onOpenModal, onEditModal }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Hobby' | 'Freelance' | 'Company'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState<Project>({
    title: '',
    subtitle: '',
    featured: false,
    published: true,
    type: 'Hobby',
    companyId: '',
    description: '',
    thumbnailUrl: '',
    imageUrl: '',
    iconUrl: '',
    status: 'Live',
    story: '',
    features: [''],
    tech: [''],
    liveUrl: '',
    repoUrl: '',
    playstoreUrl: '',
    appstoreUrl: ''
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [experienceData, educationData] = await Promise.all([
          fetchExperiences(),
          fetchEducations()
        ]);
        updateCompanyOptions(experienceData, educationData);
        await fetchProjects();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  const fetchExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'experiences'));
      const experienceData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        company: doc.data().company
      })) as Experience[];
      console.log('Fetched experiences:', experienceData);
      setExperiences(experienceData);
      return experienceData;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return [];
    }
  };

  const fetchEducations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'education'));
      const educationData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        institution: doc.data().institution,
        courseName: doc.data().courseName
      })) as Education[];
      console.log('Fetched educations:', educationData);
      setEducations(educationData);
      return educationData;
    } catch (error) {
      console.error('Error fetching education:', error);
      return [];
    }
  };

  const updateCompanyOptions = (expData: Experience[], eduData: Education[]) => {
    console.log('Updating company options with:', { expData, eduData });
    const options: CompanyOption[] = [
      ...expData.map(exp => ({
        id: exp.id,
        name: exp.company,
        type: 'company' as const
      })),
      ...eduData.map(edu => ({
        id: edu.id,
        name: `${edu.institution} - ${edu.courseName}`,
        type: 'course' as const
      }))
    ];
    console.log('Final company options:', options);
    setCompanyOptions(options);
  };
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      // Sort by order field, then by creation order
      const sortedProjects = projectData.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return 0;
      });
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSave = {
        ...formData,
        order: projects.length, // Set order to end of list for new items
        features: formData.features.filter(f => f.trim() !== ''),
        tech: formData.tech.filter(t => t.trim() !== '')
      };

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'projects'), dataToSave);
      }
      
      fetchProjects();
      resetForm();
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const moveItem = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const items = Array.from(projects);
    const [movedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, movedItem);

    // Update local state immediately
    setProjects(items);

    // Update order in Firebase
    try {
      const batch = writeBatch(db);
      items.forEach((item, index) => {
        if (item.id) {
          const docRef = doc(db, 'projects', item.id);
          batch.update(docRef, { order: index });
        }
      });
      await batch.commit();
    } catch (error) {
      console.error('Error updating order:', error);
      // Revert on error
      fetchProjects();
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < projects.length - 1) {
      moveItem(index, index + 1);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const togglePublished = async (id: string, currentPublished: boolean) => {
    try {
      await updateDoc(doc(db, 'projects', id), {
        published: !currentPublished
      });
      fetchProjects();
    } catch (error) {
      console.error('Error updating published status:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id || null);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      featured: false,
      published: true,
      type: 'Hobby',
      companyId: '',
      description: '',
      thumbnailUrl: '',
      imageUrl: '',
      iconUrl: '',
      status: 'Live',
      story: '',
      features: [''],
      tech: [''],
      liveUrl: '',
      repoUrl: '',
      playstoreUrl: '',
      appstoreUrl: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addArrayField = (field: 'features' | 'tech') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'features' | 'tech', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'features' | 'tech', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="text-white">Loading projects...</div>;
  }

  // Debug log
  console.log('ProjectManager render - companyOptions:', companyOptions);

  // Filter projects based on search and filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || project.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
    <div>
          <h2 className="text-3xl font-bold text-white mb-2">Project Management</h2>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg hover:shadow-purple-500/25"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          >
            <option value="all">All Types</option>
            <option value="Hobby">Hobby</option>
            <option value="Freelance">Freelance</option>
            <option value="Company">Company</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-800/50 border border-gray-600/50 rounded-xl p-1">
                  <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
                  </button>
                  <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
                  </button>
                </div>
        </div>
      </div>

      {/* Project List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} mb-8`}>
        {filteredProjects.map((project, index) => {
          const originalIndex = projects.findIndex(p => p.id === project.id);
          return (
            <div
              key={project.id}
              className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-purple-500/10 ${
                viewMode === 'grid' ? 'p-6' : 'p-4'
              }`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {project.thumbnailUrl ? (
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title}
                            className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                          <span className="text-xl">💻</span>
                  )}
                </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                        <p className="text-gray-400 text-sm">{project.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => togglePublished(project.id!, project.published)}
                        className={`p-2 rounded-lg transition-all ${
                          project.published 
                            ? 'text-green-400 hover:text-green-300 hover:bg-green-500/10' 
                            : 'text-gray-400 hover:text-gray-300 hover:bg-gray-500/10'
                        }`}
                        title={project.published ? 'Hide from frontend' : 'Show on frontend'}
                      >
                        {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => onEditModal(project)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id!)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      project.published 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {project.published ? 'Published' : 'Hidden'}
                    </span>
                    {project.featured && (
                      <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.type === 'Hobby' 
                        ? 'bg-blue-500/20 text-blue-400'
                        : project.type === 'Freelance'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {project.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'Under Construction'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm line-clamp-3">{project.story}</p>

                  {/* Links */}
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/70 rounded-lg transition-all text-sm"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                // List View
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(originalIndex)}
                      disabled={originalIndex === 0}
                      className={`p-2 rounded-lg transition-all ${
                        originalIndex === 0 
                          ? 'text-gray-600 cursor-not-allowed bg-gray-800/30' 
                          : 'text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50'
                      } border border-gray-600/30`}
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveDown(originalIndex)}
                      disabled={originalIndex === projects.length - 1}
                      className={`p-2 rounded-lg transition-all ${
                        originalIndex === projects.length - 1 
                          ? 'text-gray-600 cursor-not-allowed bg-gray-800/30' 
                          : 'text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50'
                      } border border-gray-600/30`}
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    {project.thumbnailUrl ? (
                      <img 
                        src={project.thumbnailUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-2xl">💻</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white truncate">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        project.published 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {project.published ? 'Published' : 'Hidden'}
                      </span>
                      {project.featured && (
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.type === 'Hobby' 
                          ? 'bg-blue-500/20 text-blue-400'
                          : project.type === 'Freelance'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {project.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Live' 
                          ? 'bg-green-500/20 text-green-400' 
                          : project.status === 'Under Construction'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{project.subtitle}</p>
                    <p className="text-gray-300 text-sm line-clamp-1">{project.story}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                    <div className="flex gap-1">
                  <button
                    onClick={() => togglePublished(project.id!, project.published)}
                    className={`p-2 rounded-lg transition-all ${
                      project.published 
                        ? 'text-green-400 hover:text-green-300 hover:bg-green-500/10' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-500/10'
                    }`}
                    title={project.published ? 'Hide from frontend' : 'Show on frontend'}
                  >
                    {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => onEditModal(project)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id!)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
              )}
          </div>
          );
        })}
      </div>

    </div>
  );
}