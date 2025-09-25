'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, Briefcase, MapPin, Calendar, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

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

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Experience Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4 mb-8">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
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
                    disabled={index === experiences.length - 1}
                    className={`p-1 rounded ${
                      index === experiences.length - 1 
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
                        src={experience.logoUrl || '/api/placeholder/64/64'} 
                        alt={experience.company}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{experience.company}</h3>
                      <p className="text-purple-400 font-medium">{experience.position}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {experience.location}
                        </div>
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                          {experience.projectsCount}+ Projects
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{experience.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-2 uppercase tracking-wide">
                        Responsibilities
                      </h4>
                      <div className="space-y-1">
                        {experience.responsibilities.slice(0, 3).map((responsibility, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>{responsibility}</p>
                          </div>
                        ))}
                        {experience.responsibilities.length > 3 && (
                          <p className="text-gray-500 text-xs">+{experience.responsibilities.length - 3} more</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-2 uppercase tracking-wide">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {experience.technologies.slice(0, 6).map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {experience.technologies.length > 6 && (
                          <span className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-gray-500">
                            +{experience.technologies.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(experience)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(experience.id!)}
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
                {editingId ? 'Edit Experience' : 'Add New Experience'}
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g., Jan 2020 - Present"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g., Remote, New York"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Website URL</label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Projects Count</label>
                  <input
                    type="number"
                    value={formData.projectsCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectsCount: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="0"
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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Responsibilities</label>
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={responsibility}
                      onChange={(e) => updateArrayField('responsibilities', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter responsibility"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('responsibilities', index)}
                        className="px-3 py-2 text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('responsibilities')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  + Add Responsibility
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateArrayField('technologies', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter technology"
                    />
                    {formData.technologies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('technologies', index)}
                        className="px-3 py-2 text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('technologies')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  + Add Technology
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