'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, Star, Zap, Search, Filter, Grid, List, Code, Database, Palette, Wrench, Globe, Smartphone } from 'lucide-react';

interface Skill {
  id?: string;
  name: string;
  icon: string;
  proficiency: number; // 1-8 scale (1 = highest, 8 = lowest)
  category: string;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState<Skill>({
    name: '',
    icon: '⚡',
    proficiency: 5,
    category: 'Frontend'
  });

  const categories = [
    'Frontend',
    'Backend',
    'Mobile',
    'Database',
    'DevOps',
    'Design',
    'Tools',
    'Languages'
  ];

  const commonIcons = [
    { icon: '⚡', name: 'Lightning' },
    { icon: '🚀', name: 'Rocket' },
    { icon: '💻', name: 'Computer' },
    { icon: '🎨', name: 'Art' },
    { icon: '🔧', name: 'Wrench' },
    { icon: '📱', name: 'Mobile' },
    { icon: '🌐', name: 'Globe' },
    { icon: '🔥', name: 'Fire' },
    { icon: '⭐', name: 'Star' },
    { icon: '💎', name: 'Diamond' },
    { icon: '🎯', name: 'Target' },
    { icon: '🛠️', name: 'Tools' },
  ];

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
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await updateDoc(doc(db, 'skills', editingId), formData);
      } else {
        await addDoc(collection(db, 'skills'), formData);
      }
      
      fetchSkills();
      resetForm();
      alert('Skill saved successfully!');
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Error saving skill: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteDoc(doc(db, 'skills', id));
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const handleEdit = (skill: Skill) => {
    setFormData(skill);
    setEditingId(skill.id || null);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '⚡',
      proficiency: 5,
      category: 'Frontend'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getProficiencyLabel = (level: number) => {
    const labels = {
      1: 'Expert',
      2: 'Advanced',
      3: 'Proficient',
      4: 'Intermediate',
      5: 'Competent',
      6: 'Beginner',
      7: 'Novice',
      8: 'Learning'
    };
    return labels[level] || 'Unknown';
  };

  const getSkillSize = (proficiency: number) => {
    const sizes = {
      1: 'text-2xl', // Largest
      2: 'text-xl',
      3: 'text-lg',
      4: 'text-base',
      5: 'text-sm',
      6: 'text-sm',
      7: 'text-xs',
      8: 'text-xs'  // Smallest
    };
    return sizes[proficiency] || sizes[5];
  };

  if (loading) {
    return <div className="text-white">Loading skills...</div>;
  }

  // Filter skills based on search and category
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return Code;
      case 'Backend': return Database;
      case 'Mobile': return Smartphone;
      case 'Database': return Database;
      case 'DevOps': return Wrench;
      case 'Design': return Palette;
      case 'Tools': return Wrench;
      case 'Languages': return Globe;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Skills Management</h2>
          <p className="text-gray-400">Manage your technical skills and proficiencies</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-lg hover:shadow-purple-500/25"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="pl-12 pr-8 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

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

      {/* Skills List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} mb-8`}>
        {filteredSkills.map((skill) => {
          const CategoryIcon = getCategoryIcon(skill.category);
          return (
            <div
              key={skill.id}
              className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-purple-500/10 ${
                viewMode === 'grid' ? 'p-6' : 'p-4'
              }`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${getSkillSize(skill.proficiency)} flex items-center justify-center rounded-xl shadow-lg`}>
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
                      <div>
                        <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <CategoryIcon className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 text-sm font-medium">{skill.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id!)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Proficiency */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm font-medium">Proficiency Level</span>
                      <span className="text-purple-400 text-sm font-semibold">
                        {getProficiencyLabel(skill.proficiency)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full transition-all ${
                            i < skill.proficiency 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                              : 'bg-gray-600/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div className="flex items-center gap-4">
                  <div className={`${getSkillSize(skill.proficiency)} flex items-center justify-center rounded-xl shadow-lg flex-shrink-0`}>
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
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white truncate">{skill.name}</h3>
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CategoryIcon className="w-3 h-3" />
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-300 text-sm">{getProficiencyLabel(skill.proficiency)}</span>
                      <div className="flex gap-1">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < skill.proficiency 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                                : 'bg-gray-600/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id!)}
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {editingId ? 'Update skill details' : 'Add a new skill to your portfolio'}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Skill Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="e.g., React, Node.js, Python"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300">
                  Proficiency Level (1 = Expert, 8 = Learning)
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={formData.proficiency}
                    onChange={(e) => setFormData(prev => ({ ...prev, proficiency: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((formData.proficiency - 1) / 7) * 100}%, #374151 ${((formData.proficiency - 1) / 7) * 100}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Expert</span>
                    <span className="text-purple-400 font-semibold">
                      {getProficiencyLabel(formData.proficiency)} (Level {formData.proficiency})
                    </span>
                    <span>Learning</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300">Icon</label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Emoji or image URL"
                    required
                  />
                  <div className="grid grid-cols-8 gap-3">
                    {commonIcons.map((iconData) => (
                      <button
                        key={iconData.icon}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon: iconData.icon }))}
                        className={`p-3 rounded-xl border text-xl hover:bg-gray-700/50 transition-all ${
                          formData.icon === iconData.icon 
                            ? 'border-purple-500 bg-purple-500/20 shadow-lg' 
                            : 'border-gray-600/50 hover:border-gray-500'
                        }`}
                        title={iconData.name}
                      >
                        {iconData.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-700/50">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 font-semibold"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'Update Skill' : 'Save Skill'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl transition-all border border-gray-600/50 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}