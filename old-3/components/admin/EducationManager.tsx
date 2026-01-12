'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, GraduationCap, Calendar, ArrowUp, ArrowDown, Search, Filter, Grid, List, ExternalLink, Award, BookOpen, Star } from 'lucide-react';

interface Education {
  id?: string;
  order?: number;
  institution: string;
  logoUrl: string;
  courseName: string;
  startYear: string;
  endYear: string;
  description: string;
  achievements: string[];
  color: string;
}

interface EducationManagerProps {
  onOpenModal: () => void;
  onEditModal: (education: Education) => void;
}

export default function EducationManager({ onOpenModal, onEditModal }: EducationManagerProps) {
  const [educations, setEducations] = useState<Education[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState<Education>({
    institution: '',
    logoUrl: '',
    courseName: '',
    startYear: '',
    endYear: '',
    description: '',
    achievements: [''],
    color: 'from-purple-500 to-blue-500'
  });

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
      // Sort by order field, then by creation order
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSave = {
        ...formData,
        order: educations.length, // Set order to end of list for new items
        achievements: formData.achievements.filter(a => a.trim() !== '')
      };

      if (editingId) {
        await updateDoc(doc(db, 'education', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'education'), dataToSave);
      }
      
      fetchEducations();
      resetForm();
      alert('Education saved successfully!');
    } catch (error) {
      console.error('Error saving education:', error);
      alert('Error saving education: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const moveItem = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const items = Array.from(educations);
    const [movedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, movedItem);

    // Update local state immediately
    setEducations(items);

    // Update order in Firebase
    try {
      const batch = writeBatch(db);
      items.forEach((item, index) => {
        if (item.id) {
          const docRef = doc(db, 'education', item.id);
          batch.update(docRef, { order: index });
        }
      });
      await batch.commit();
    } catch (error) {
      console.error('Error updating order:', error);
      // Revert on error
      fetchEducations();
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < educations.length - 1) {
      moveItem(index, index + 1);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this education record?')) {
      try {
        await deleteDoc(doc(db, 'education', id));
        fetchEducations();
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  const handleEdit = (education: Education) => {
    setFormData(education);
    setEditingId(education.id || null);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      logoUrl: '',
      courseName: '',
      startYear: '',
      endYear: '',
      description: '',
      achievements: [''],
      color: 'from-purple-500 to-blue-500'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addArrayField = (field: 'achievements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'achievements', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'achievements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="text-white">Loading education records...</div>;
  }

  // Filter educations based on search
  const filteredEducations = educations.filter(education => {
    const matchesSearch = education.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         education.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         education.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
    <div>
          <h2 className="text-3xl font-bold text-white mb-2">Education Management</h2>
          <p className="text-gray-400">Manage your educational background and achievements</p>
        </div>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all shadow-lg hover:shadow-green-500/25"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search education..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-800/50 border border-gray-600/50 rounded-xl p-1">
                  <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-5 h-5" />
                  </button>
                  <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
                  </button>
                </div>
      </div>

      {/* Education List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} mb-8`}>
        {filteredEducations.map((education, index) => {
          const originalIndex = educations.findIndex(e => e.id === education.id);
          return (
            <div
              key={education.id}
              className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-green-500/10 ${
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
                        src={education.logoUrl || '/api/placeholder/64/64'} 
                        alt={education.institution}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{education.institution}</h3>
                        <p className="text-green-400 font-semibold">{education.courseName}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {education.startYear} - {education.endYear}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                    <div className="flex gap-1">
                      <button
                        onClick={() => onEditModal(education)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(education.id!)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm line-clamp-3">{education.description}</p>

                  {/* Achievements Preview */}
                  {education.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Key Achievements
                      </h4>
                      <div className="space-y-1">
                        {education.achievements.slice(0, 2).map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="line-clamp-1">{achievement}</p>
                          </div>
                        ))}
                        {education.achievements.length > 2 && (
                          <p className="text-gray-500 text-xs">+{education.achievements.length - 2} more achievements</p>
                        )}
                      </div>
                    </div>
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
                          : 'text-gray-400 hover:text-white hover:bg-green-500/20 hover:border-green-500/50'
                      } border border-gray-600/30`}
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveDown(originalIndex)}
                      disabled={originalIndex === educations.length - 1}
                      className={`p-2 rounded-lg transition-all ${
                        originalIndex === educations.length - 1 
                          ? 'text-gray-600 cursor-not-allowed bg-gray-800/30' 
                          : 'text-gray-400 hover:text-white hover:bg-green-500/20 hover:border-green-500/50'
                      } border border-gray-600/30`}
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-3 flex-shrink-0 shadow-lg">
                    <img 
                      src={education.logoUrl || '/api/placeholder/64/64'} 
                      alt={education.institution}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white truncate">{education.institution}</h3>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {education.startYear} - {education.endYear}
                      </span>
                    </div>
                    <p className="text-green-400 font-semibold text-sm mb-1">{education.courseName}</p>
                    <p className="text-gray-300 text-sm line-clamp-1">{education.description}</p>
              </div>
              
                  <div className="flex gap-1">
                <button
                      onClick={() => onEditModal(education)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(education.id!)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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