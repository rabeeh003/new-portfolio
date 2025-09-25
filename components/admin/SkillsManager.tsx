'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, Star, Zap } from 'lucide-react';

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Skills Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`${getSkillSize(skill.proficiency)} flex items-center justify-center`}>
                  {skill.icon.startsWith('http') ? (
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span>{skill.icon}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                  <p className="text-purple-400 text-sm">{skill.category}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id!)}
                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-sm">Proficiency</span>
                <span className="text-purple-400 text-sm">
                  {getProficiencyLabel(skill.proficiency)} (Level {skill.proficiency})
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded ${
                      i < skill.proficiency 
                        ? 'bg-purple-500' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., React, Node.js, Python"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Proficiency Level (1 = Expert, 8 = Learning)
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={formData.proficiency}
                    onChange={(e) => setFormData(prev => ({ ...prev, proficiency: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Expert</span>
                    <span className="text-purple-400 font-medium">
                      {getProficiencyLabel(formData.proficiency)} (Level {formData.proficiency})
                    </span>
                    <span>Learning</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Emoji or image URL"
                    required
                  />
                  <div className="grid grid-cols-6 gap-2">
                    {commonIcons.map((iconData) => (
                      <button
                        key={iconData.icon}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon: iconData.icon }))}
                        className={`p-2 rounded border text-xl hover:bg-gray-700 transition-colors ${
                          formData.icon === iconData.icon 
                            ? 'border-purple-500 bg-purple-500/20' 
                            : 'border-gray-600'
                        }`}
                        title={iconData.name}
                      >
                        {iconData.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
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