'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github, ArrowUp, ArrowDown } from 'lucide-react';

interface Project {
  id?: string;
  order?: number;
  title: string;
  subtitle: string;
  featured: boolean;
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

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Project>({
    title: '',
    subtitle: '',
    featured: false,
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
    fetchProjects();
    fetchExperiences();
    fetchEducations();
  }, []);

  const fetchExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'experiences'));
      const experienceData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        company: doc.data().company
      })) as Experience[];
      setExperiences(experienceData);
      updateCompanyOptions(experienceData, educations);
    } catch (error) {
      console.error('Error fetching experiences:', error);
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
      setEducations(educationData);
      updateCompanyOptions(experiences, educationData);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  const updateCompanyOptions = (expData: Experience[], eduData: Education[]) => {
    const options: CompanyOption[] = [
      ...expData.map(exp => ({
        id: exp.id,
        name: exp.company,
        type: 'company' as const
      })),
      ...eduData.map(edu => ({
        id: edu.id,
        name: `${edu.institution} / ${edu.courseName}`,
        type: 'course' as const
      }))
    ];
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
      alert('Error saving project: ' + error.message);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Project Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-4 mb-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4"
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
                    disabled={index === projects.length - 1}
                    className={`p-1 rounded ${
                      index === projects.length - 1 
                        ? 'text-gray-600 cursor-not-allowed' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  {project.thumbnailUrl ? (
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-2xl">💻</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.type === 'Hobby' 
                        ? 'bg-blue-500/20 text-blue-400'
                        : project.type === 'Freelance'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {project.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'Live' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'Under Construction'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{project.subtitle}</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{project.story}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-blue-400 hover:text-blue-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id!)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
                {editingId ? 'Edit Project' : 'Add New Project'}
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Project['status'] }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Live">Live</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Featured</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label className="ml-2 text-sm text-gray-300">Mark as featured project</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      type: e.target.value as Project['type'],
                      companyId: e.target.value !== 'Company' ? '' : prev.companyId
                    }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Hobby">Hobby</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Company">Company</option>
                  </select>
                </div>
                {formData.type === 'Company' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Company</label>
                    <select
                      value={formData.companyId}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required={formData.type === 'Company'}
                    >
                      <option value="">Select a company or course</option>
                      {companyOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name} ({option.type === 'company' ? 'Company' : 'Course'})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com/thumbnail.jpg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Main Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com/main-image.jpg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Icon URL</label>
                  <input
                    type="url"
                    value={formData.iconUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, iconUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com/icon.png"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Repository URL</label>
                  <input
                    type="url"
                    value={formData.repoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, repoUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Play Store URL</label>
                  <input
                    type="url"
                    value={formData.playstoreUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, playstoreUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://play.google.com/store/apps/details?id=..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">App Store URL</label>
                  <input
                    type="url"
                    value={formData.appstoreUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, appstoreUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://apps.apple.com/app/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Story</label>
                  <textarea
                    value={formData.story}
                    onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateArrayField('features', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter feature"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('features', index)}
                        className="px-3 py-2 text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('features')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  + Add Feature
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
                {formData.tech.map((tech, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateArrayField('tech', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter technology"
                    />
                    {formData.tech.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('tech', index)}
                        className="px-3 py-2 text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('tech')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  + Add Technology
                </button>
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