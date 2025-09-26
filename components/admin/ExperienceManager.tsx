'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, Briefcase, MapPin, Calendar, GripVertical, ArrowUp, ArrowDown, Search, Filter, Grid, List, ExternalLink, Building2, Users, Star } from 'lucide-react';

interface Experience {
  id?: string;
  order?: number;
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
}

interface ExperienceManagerProps {
  onOpenModal: () => void;
  onEditModal: (experience: Experience) => void;
}

export default function ExperienceManager({ onOpenModal, onEditModal }: ExperienceManagerProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState<Experience>({
    company: '',
    logoUrl: '',
    websiteUrl: '',
    position: '',
    duration: '',
    location: '',
    type: 'Full-time',
    projectsCount: 0,
    description: '',
    responsibilities: [''],
    technologies: [''],
    color: 'from-purple-500 to-blue-500'
  });

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
      // Sort by order field, then by creation order
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSave = {
        ...formData,
        order: experiences.length, // Set order to end of list for new items
        responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
        technologies: formData.technologies.filter(t => t.trim() !== '')
      };

      if (editingId) {
        await updateDoc(doc(db, 'experiences', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'experiences'), dataToSave);
      }
      
      fetchExperiences();
      resetForm();
      alert('Experience saved successfully!');
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error saving experience: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const moveItem = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const items = Array.from(experiences);
    const [movedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, movedItem);

    // Update local state immediately
    setExperiences(items);

    // Update order in Firebase
    try {
      const batch = writeBatch(db);
      items.forEach((item, index) => {
        if (item.id) {
          const docRef = doc(db, 'experiences', item.id);
          batch.update(docRef, { order: index });
        }
      });
      await batch.commit();
    } catch (error) {
      console.error('Error updating order:', error);
      // Revert on error
      fetchExperiences();
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < experiences.length - 1) {
      moveItem(index, index + 1);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteDoc(doc(db, 'experiences', id));
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const handleEdit = (experience: Experience) => {
    setFormData(experience);
    setEditingId(experience.id || null);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      company: '',
      logoUrl: '',
      websiteUrl: '',
      position: '',
      duration: '',
      location: '',
      type: 'Full-time',
      projectsCount: 0,
      description: '',
      responsibilities: [''],
      technologies: [''],
      color: 'from-purple-500 to-blue-500'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addArrayField = (field: 'responsibilities' | 'technologies') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'responsibilities' | 'technologies', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'responsibilities' | 'technologies', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="text-white">Loading experiences...</div>;
  }

  // Filter experiences based on search and filter
  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || experience.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
    <div>
          <h2 className="text-3xl font-bold text-white mb-2">Experience Management</h2>
          <p className="text-gray-400">Manage your work experience and professional background</p>
        </div>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-800/50 border border-gray-600/50 rounded-xl p-1">
                  <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
                  </button>
                  <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
                  </button>
                </div>
        </div>
      </div>

      {/* Experience List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} mb-8`}>
        {filteredExperiences.map((experience, index) => {
          const originalIndex = experiences.findIndex(e => e.id === experience.id);
          return (
            <div
              key={experience.id}
              className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/10 ${
                viewMode === 'grid' ? 'p-6' : 'p-4'
              }`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-3 shadow-lg">
                      <img 
                        src={experience.logoUrl || '/api/placeholder/64/64'} 
                        alt={experience.company}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{experience.company}</h3>
                        <p className="text-blue-400 font-semibold">{experience.position}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {experience.location}
                        </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => onEditModal(experience)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(experience.id!)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      experience.type === 'Full-time' 
                        ? 'bg-green-500/20 text-green-400'
                        : experience.type === 'Part-time'
                        ? 'bg-blue-500/20 text-blue-400'
                        : experience.type === 'Contract'
                        ? 'bg-purple-500/20 text-purple-400'
                        : experience.type === 'Freelance'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {experience.type}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {experience.projectsCount}+ Projects
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm line-clamp-3">{experience.description}</p>
                  
                  {/* Responsibilities Preview */}
                    <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Key Responsibilities
                      </h4>
                      <div className="space-y-1">
                      {experience.responsibilities.slice(0, 2).map((responsibility, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="line-clamp-1">{responsibility}</p>
                          </div>
                        ))}
                      {experience.responsibilities.length > 2 && (
                        <p className="text-gray-500 text-xs">+{experience.responsibilities.length - 2} more responsibilities</p>
                        )}
                      </div>
                    </div>
                    
                  {/* Technologies */}
                    <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                      {experience.technologies.slice(0, 4).map((tech, idx) => (
                          <span 
                            key={idx}
                          className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      {experience.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-500">
                          +{experience.technologies.length - 4}
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Website Link */}
                  {experience.websiteUrl && (
                    <a
                      href={experience.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Company Website
                    </a>
                  )}
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
                          : 'text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50'
                      } border border-gray-600/30`}
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                </button>
                <button
                      onClick={() => moveDown(originalIndex)}
                      disabled={originalIndex === experiences.length - 1}
                      className={`p-2 rounded-lg transition-all ${
                        originalIndex === experiences.length - 1 
                          ? 'text-gray-600 cursor-not-allowed bg-gray-800/30' 
                          : 'text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50'
                      } border border-gray-600/30`}
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
              </button>
            </div>

                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-3 flex-shrink-0 shadow-lg">
                    <img 
                      src={experience.logoUrl || '/api/placeholder/64/64'} 
                      alt={experience.company}
                      className="w-full h-full object-contain rounded-lg"
                    />
              </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white truncate">{experience.company}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        experience.type === 'Full-time' 
                          ? 'bg-green-500/20 text-green-400'
                          : experience.type === 'Part-time'
                          ? 'bg-blue-500/20 text-blue-400'
                          : experience.type === 'Contract'
                          ? 'bg-purple-500/20 text-purple-400'
                          : experience.type === 'Freelance'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {experience.type}
                      </span>
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                        {experience.projectsCount}+ Projects
                      </span>
                </div>
                    <p className="text-blue-400 font-semibold text-sm mb-1">{experience.position}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {experience.duration}
                </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                </div>
              </div>
                    <p className="text-gray-300 text-sm line-clamp-1">{experience.description}</p>
              </div>

                  <div className="flex items-center gap-2">
                    {experience.websiteUrl && (
                      <a
                        href={experience.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => onEditModal(experience)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(experience.id!)}
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