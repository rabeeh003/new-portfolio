'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  LogOut, 
  User, 
  Briefcase, 
  FolderOpen, 
  GraduationCap,
  Zap,
  Settings,
  BarChart3,
  X,
  Plus,
  Save,
  Star
} from 'lucide-react';
import ExperienceManager from './ExperienceManager';
import ProjectManager from './ProjectManager';
import EducationManager from './EducationManager';
import SkillsManager from './SkillsManager';

type TabType = 'experience' | 'projects' | 'education' | 'skills';

// Interfaces
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

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  
  // Modal states for all managers
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  
  // Edit handlers
  const handleEditEducation = (education: Education) => {
    setEducationFormData(education);
    setEditingId(education.id || null);
    setEducationModalOpen(true);
  };
  
  const handleEditExperience = (experience: Experience) => {
    setExperienceFormData(experience);
    setEditingId(experience.id || null);
    setExperienceModalOpen(true);
  };
  
  const handleEditProject = (project: Project) => {
    setProjectFormData(project);
    setEditingId(project.id || null);
    setProjectModalOpen(true);
  };
  
  // Form states
  const [educationFormData, setEducationFormData] = useState<Education>({
    institution: '',
    logoUrl: '',
    courseName: '',
    startYear: '',
    endYear: '',
    description: '',
    achievements: [''],
    color: 'from-purple-500 to-blue-500'
  });
  
  const [experienceFormData, setExperienceFormData] = useState<Experience>({
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
  
  const [projectFormData, setProjectFormData] = useState<Project>({
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
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Company/Education options for project association
  const [companyOptions, setCompanyOptions] = useState<Array<{id: string, name: string, type: 'company' | 'course'}>>([]);

  // Fetch company and education options for project association
  useEffect(() => {
    const fetchCompanyOptions = async () => {
      try {
        const [experienceSnapshot, educationSnapshot] = await Promise.all([
          getDocs(collection(db, 'experiences')),
          getDocs(collection(db, 'education'))
        ]);

        const options: Array<{id: string, name: string, type: 'company' | 'course'}> = [
          // Add companies from experiences
          ...experienceSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().company,
            type: 'company' as const
          })),
          // Add education institutions
          ...educationSnapshot.docs.map(doc => ({
            id: doc.id,
            name: `${doc.data().institution} - ${doc.data().courseName}`,
            type: 'course' as const
          }))
        ];

        setCompanyOptions(options);
      } catch (error) {
        console.error('Error fetching company options:', error);
      }
    };

    fetchCompanyOptions();
  }, []);

  // Form submission handlers
  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSave = {
        ...educationFormData,
        achievements: educationFormData.achievements.filter(a => a.trim() !== '')
      };

      if (editingId) {
        await updateDoc(doc(db, 'education', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'education'), dataToSave);
      }
      
      resetEducationForm();
      alert('Education saved successfully!');
    } catch (error) {
      console.error('Error saving education:', error);
      alert('Error saving education: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSave = {
        ...experienceFormData,
        responsibilities: experienceFormData.responsibilities.filter(r => r.trim() !== ''),
        technologies: experienceFormData.technologies.filter(t => t.trim() !== '')
      };

      if (editingId) {
        await updateDoc(doc(db, 'experiences', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'experiences'), dataToSave);
      }
      
      resetExperienceForm();
      alert('Experience saved successfully!');
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error saving experience: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSave = {
        ...projectFormData,
        features: projectFormData.features.filter(f => f.trim() !== ''),
        tech: projectFormData.tech.filter(t => t.trim() !== '')
      };

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'projects'), dataToSave);
      }
      
      resetProjectForm();
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Reset form functions
  const resetEducationForm = () => {
    setEducationFormData({
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
    setEducationModalOpen(false);
  };

  const resetExperienceForm = () => {
    setExperienceFormData({
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
    setExperienceModalOpen(false);
  };

  const resetProjectForm = () => {
    setProjectFormData({
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
    setProjectModalOpen(false);
  };

  // Array field handlers
  const addArrayField = (formType: 'education' | 'experience' | 'project', field: string) => {
    if (formType === 'education') {
      setEducationFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof Education] as string[]), '']
      }));
    } else if (formType === 'experience') {
      setExperienceFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof Experience] as string[]), '']
      }));
    } else if (formType === 'project') {
      setProjectFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof Project] as string[]), '']
      }));
    }
  };

  const updateArrayField = (formType: 'education' | 'experience' | 'project', field: string, index: number, value: string) => {
    if (formType === 'education') {
      setEducationFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof Education] as string[]).map((item: string, i: number) => i === index ? value : item)
      }));
    } else if (formType === 'experience') {
      setExperienceFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof Experience] as string[]).map((item: string, i: number) => i === index ? value : item)
      }));
    } else if (formType === 'project') {
      setProjectFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof Project] as string[]).map((item: string, i: number) => i === index ? value : item)
      }));
    }
  };

  const removeArrayField = (formType: 'education' | 'experience' | 'project', field: string, index: number) => {
    if (formType === 'education') {
      setEducationFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof Education] as string[]).filter((_: string, i: number) => i !== index)
      }));
    } else if (formType === 'experience') {
      setExperienceFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof Experience] as string[]).filter((_: string, i: number) => i !== index)
      }));
    } else if (formType === 'project') {
      setProjectFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof Project] as string[]).filter((_: string, i: number) => i !== index)
      }));
    }
  };

  const tabs = [
    { id: 'experience' as TabType, label: 'Experience', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { id: 'projects' as TabType, label: 'Projects', icon: FolderOpen, color: 'from-purple-500 to-pink-500' },
    { id: 'education' as TabType, label: 'Education', icon: GraduationCap, color: 'from-green-500 to-emerald-500' },
    // { id: 'skills' as TabType, label: 'Skills', icon: Zap, color: 'from-orange-500 to-red-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return <ExperienceManager 
          onOpenModal={() => setExperienceModalOpen(true)} 
          onEditModal={handleEditExperience}
        />;
      case 'projects':
        return <ProjectManager 
          onOpenModal={() => setProjectModalOpen(true)} 
          onEditModal={handleEditProject}
        />;
      case 'education':
        return <EducationManager 
          onOpenModal={() => setEducationModalOpen(true)} 
          onEditModal={handleEditEducation}
        />;
      case 'skills':
        return <SkillsManager />;
      default:
        return <ExperienceManager 
          onOpenModal={() => setExperienceModalOpen(true)} 
          onEditModal={handleEditExperience}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Top Navigation Header */}
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Main Header */}
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-white">Portfolio Dashboard</h1>
                <p className="text-gray-400 text-xs lg:text-sm hidden sm:block">Welcome back, {user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="p-2 text-gray-400 hover:text-white transition-colors hidden lg:block">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors hidden lg:block">
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-all border border-red-600/30"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <nav className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl overflow-x-auto py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  } ${isActive ? tab.color : ''}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm lg:text-base">{tab.label}</span>
                  {isActive && (
                    <div className="ml-1 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 lg:p-8 shadow-xl">
          {renderContent()}
        </div>
      </main>

      {/* Global Modals - Rendered at top level */}
      {educationModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Education' : 'Add New Education'}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {editingId ? 'Update education details' : 'Add a new education record to your portfolio'}
                </p>
              </div>
              <button
                onClick={resetEducationForm}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEducationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Institution Name</label>
                  <input
                    type="text"
                    value={educationFormData.institution}
                    onChange={(e) => setEducationFormData(prev => ({ ...prev, institution: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="Enter institution name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Logo URL</label>
                  <input
                    type="url"
                    value={educationFormData.logoUrl}
                    onChange={(e) => setEducationFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Course Name</label>
                  <input
                    type="text"
                    value={educationFormData.courseName}
                    onChange={(e) => setEducationFormData(prev => ({ ...prev, courseName: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="e.g., Computer Science, Web Development"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Start Year</label>
                  <input
                    type="text"
                    value={educationFormData.startYear}
                    onChange={(e) => setEducationFormData(prev => ({ ...prev, startYear: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="e.g., 2018"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">End Year</label>
                  <input
                    type="text"
                    value={educationFormData.endYear}
                    onChange={(e) => setEducationFormData(prev => ({ ...prev, endYear: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="e.g., 2022 or Present"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">Description</label>
                <textarea
                  value={educationFormData.description}
                  onChange={(e) => setEducationFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                  rows={4}
                  placeholder="Brief description of the course and what you learned"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">Color Theme</label>
                <select
                  value={educationFormData.color}
                  onChange={(e) => setEducationFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
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

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300">Achievements (Optional)</label>
                <div className="space-y-3">
                  {educationFormData.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateArrayField('education', 'achievements', index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                        placeholder="Enter achievement"
                      />
                      {educationFormData.achievements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('education', 'achievements', index)}
                          className="px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addArrayField('education', 'achievements')}
                  className="flex items-center gap-2 px-4 py-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-xl transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-700/50">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all shadow-lg hover:shadow-green-500/25 font-semibold disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : (editingId ? 'Update Education' : 'Save Education')}
                </button>
                <button
                  type="button"
                  onClick={resetEducationForm}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl transition-all border border-gray-600/50 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {experienceModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Experience' : 'Add New Experience'}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {editingId ? 'Update experience details' : 'Add a new work experience to your portfolio'}
                </p>
              </div>
              <button
                onClick={resetExperienceForm}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleExperienceSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Company</label>
                  <input
                    type="text"
                    value={experienceFormData.company}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Position</label>
                  <input
                    type="text"
                    value={experienceFormData.position}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="e.g., Frontend Developer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Duration</label>
                  <input
                    type="text"
                    value={experienceFormData.duration}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="e.g., Jan 2020 - Present"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Location</label>
                  <input
                    type="text"
                    value={experienceFormData.location}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="e.g., Remote, New York"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Type</label>
                  <select
                    value={experienceFormData.type}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Logo URL</label>
                  <input
                    type="url"
                    value={experienceFormData.logoUrl}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Website URL</label>
                  <input
                    type="url"
                    value={experienceFormData.websiteUrl}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="https://company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Projects Count</label>
                  <input
                    type="number"
                    value={experienceFormData.projectsCount}
                    onChange={(e) => setExperienceFormData(prev => ({ ...prev, projectsCount: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">Description</label>
                <textarea
                  value={experienceFormData.description}
                  onChange={(e) => setExperienceFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  rows={4}
                  placeholder="Brief description of your role and responsibilities"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">Color Theme</label>
                <select
                  value={experienceFormData.color}
                  onChange={(e) => setExperienceFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300">Responsibilities</label>
                <div className="space-y-3">
                  {experienceFormData.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) => updateArrayField('experience', 'responsibilities', index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Enter responsibility"
                      />
                      {experienceFormData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('experience', 'responsibilities', index)}
                          className="px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addArrayField('experience', 'responsibilities')}
                  className="flex items-center gap-2 px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Responsibility
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300">Technologies</label>
                <div className="space-y-3">
                  {experienceFormData.technologies.map((tech, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateArrayField('experience', 'technologies', index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Enter technology"
                      />
                      {experienceFormData.technologies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('experience', 'technologies', index)}
                          className="px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addArrayField('experience', 'technologies')}
                  className="flex items-center gap-2 px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Technology
                </button>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-700/50">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 font-semibold disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : (editingId ? 'Update Experience' : 'Save Experience')}
                </button>
                <button
                  type="button"
                  onClick={resetExperienceForm}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl transition-all border border-gray-600/50 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {projectModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {editingId ? 'Update project details' : 'Create a new project for your portfolio'}
                </p>
              </div>
              <button
                onClick={resetProjectForm}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Project Title</label>
                  <input
                    type="text"
                    value={projectFormData.title}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Status</label>
                  <select
                    value={projectFormData.status}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, status: e.target.value as Project['status'] }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="Live">Live</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Completed">Stoped</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Project Subtitle</label>
                  <input
                    type="text"
                    value={projectFormData.subtitle}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Brief description of the project"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Project Type</label>
                  <select
                    value={projectFormData.type}
                    onChange={(e) => setProjectFormData(prev => ({ 
                      ...prev, 
                      type: e.target.value as Project['type'],
                      companyId: e.target.value !== 'Company' ? '' : prev.companyId
                    }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="Hobby">Hobby</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Company">Company</option>
                  </select>
                </div>
              </div>

              {/* Company/Education Selection - Only show when Project Type is "Company" */}
              {projectFormData.type === 'Company' && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Company/Education Institution</label>
                  <select
                    value={projectFormData.companyId || ''}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, companyId: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    required={projectFormData.type === 'Company'}
                  >
                    <option value="">Select a company or education institution</option>
                    {companyOptions.length > 0 ? (
                      <>
                        {companyOptions.filter(opt => opt.type === 'company').length > 0 && (
                          <optgroup label="Companies">
                            {companyOptions
                              .filter(opt => opt.type === 'company')
                              .map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                          </optgroup>
                        )}
                        {companyOptions.filter(opt => opt.type === 'course').length > 0 && (
                          <optgroup label="Education Institutions">
                            {companyOptions
                              .filter(opt => opt.type === 'course')
                              .map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                          </optgroup>
                        )}
                      </>
                    ) : (
                      <option disabled>No companies or education institutions available</option>
                    )}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Thumbnail URL</label>
                  <input
                    type="url"
                    value={projectFormData.thumbnailUrl}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://example.com/thumbnail.jpg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Main Image URL</label>
                  <input
                    type="url"
                    value={projectFormData.imageUrl}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://example.com/main-image.jpg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Icon URL</label>
                  <input
                    type="url"
                    value={projectFormData.iconUrl}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, iconUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://example.com/icon.png"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Live URL</label>
                  <input
                    type="url"
                    value={projectFormData.liveUrl}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Repository URL</label>
                  <input
                    type="url"
                    value={projectFormData.repoUrl}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, repoUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Play Store URL</label>
                  <input
                    type="url"
                    value={projectFormData.playstoreUrl}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, playstoreUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://play.google.com/store/apps/details?id=com.example.app"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">App Store URL</label>
                  <input
                    type="url"
                    value={projectFormData.appstoreUrl}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, appstoreUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://apps.apple.com/app/example-app/id123456789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Featured Project</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setProjectFormData(prev => ({ ...prev, featured: !prev.featured }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        projectFormData.featured ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          projectFormData.featured ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-sm font-medium ${projectFormData.featured ? 'text-purple-400' : 'text-gray-400'}`}>
                      {projectFormData.featured ? 'Featured' : 'Not Featured'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Project Story</label>
                  <textarea
                    value={projectFormData.story}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, story: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    rows={4}
                    placeholder="Tell the story behind this project..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">Description</label>
                  <textarea
                    value={projectFormData.description}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    rows={4}
                    placeholder="Brief description of the project..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300">Project Features</label>
                <div className="space-y-3">
                  {projectFormData.features.map((feature, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateArrayField('project', 'features', index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="Enter feature"
                      />
                      {projectFormData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('project', 'features', index)}
                          className="px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addArrayField('project', 'features')}
                  className="flex items-center gap-2 px-4 py-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300">Technologies Used</label>
                <div className="space-y-3">
                  {projectFormData.tech.map((tech, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateArrayField('project', 'tech', index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="Enter technology"
                      />
                      {projectFormData.tech.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('project', 'tech', index)}
                          className="px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addArrayField('project', 'tech')}
                  className="flex items-center gap-2 px-4 py-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Technology
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700/50">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 font-semibold disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Create Project')}
                </button>
                <button
                  type="button"
                  onClick={resetProjectForm}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-600/50 font-semibold"
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