'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, GraduationCap, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

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

export default function EducationManager() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Education Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-4 mb-8">
        {educations.map((education, index) => (
          <div
            key={education.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex flex-col gap-1 mt-2">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className={`p-1 rounded ${
                      index === 0 
                        ? 'text-gray-600 cursor-not-allowed' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === educations.length - 1}
                    className={`p-1 rounded ${
                      index === educations.length - 1 
                        ? 'text-gray-600 cursor-not-allowed' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                      <img 
                        src={education.logoUrl || '/api/placeholder/64/64'} 
                        alt={education.institution}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{education.institution}</h3>
                      <p className="text-purple-400 font-medium">{education.courseName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {education.startYear} - {education.endYear}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{education.description}</p>
                  
                  {education.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-2 uppercase tracking-wide">
                        Achievements
                      </h4>
                      <div className="space-y-1">
                        {education.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(education)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(education.id!)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'Edit Education' : 'Add New Education'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Logo Image URL</label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Course Name</label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g., Computer Science, Web Development"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Year</label>
                  <input
                    type="text"
                    value={formData.startYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, startYear: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g., 2018"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Year</label>
                  <input
                    type="text"
                    value={formData.endYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, endYear: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g., 2022 or Present"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  rows={3}
                  placeholder="Brief description of the course and what you learned"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Achievements (Optional)</label>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateArrayField('achievements', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter achievement"
                    />
                    {formData.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('achievements', index)}
                        className="px-3 py-2 text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('achievements')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  + Add Achievement
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="from-purple-500 to-blue-500">Purple to Blue</option>
                  <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                  <option value="from-cyan-500 to-teal-500">Cyan to Teal</option>
                  <option value="from-teal-500 to-green-500">Teal to Green</option>
                  <option value="from-green-500 to-yellow-500">Green to Yellow</option>
                  <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
                  <option value="from-orange-500 to-red-500">Orange to Red</option>
                  <option value="from-red-500 to-pink-500">Red to Pink</option>
                </select>
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