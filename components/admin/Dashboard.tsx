'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  LogOut, 
  User, 
  Briefcase, 
  FolderOpen, 
  GraduationCap,
  Zap,
  Plus,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import ExperienceManager from './ExperienceManager';
import ProjectManager from './ProjectManager';
import EducationManager from './EducationManager';
import SkillsManager from './SkillsManager';

type TabType = 'experience' | 'projects' | 'education' | 'skills';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('experience');

  const tabs = [
    { id: 'experience' as TabType, label: 'Experience', icon: Briefcase },
    { id: 'projects' as TabType, label: 'Projects', icon: FolderOpen },
    { id: 'education' as TabType, label: 'Education', icon: GraduationCap },
    { id: 'skills' as TabType, label: 'Skills', icon: Zap },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return <ExperienceManager />;
      case 'projects':
        return <ProjectManager />;
      case 'education':
        return <EducationManager />;
      case 'skills':
        return <SkillsManager />;
      default:
        return <ExperienceManager />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Portfolio Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}