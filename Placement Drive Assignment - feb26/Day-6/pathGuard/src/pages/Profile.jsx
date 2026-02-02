import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, projects, notes } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    projectsCount: 0,
    notesCount: 0
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        projectsCount: projects.length,
        notesCount: notes.length
      });
    }
  }, [user, projects.length, notes.length]);

  useEffect(() => {
    localStorage.setItem('lastSection', 'profile');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lastSection');
    localStorage.removeItem('lastItem');
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <button 
          onClick={() => navigate('/projects')}
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto lg:mx-0 mr-6 lg:mr-0">
              <span className="text-2xl font-bold text-white">
                {profileData.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {profileData.displayName}
              </h1>
              <p className="text-gray-500">{profileData.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Projects</span>
              <span className="font-bold text-2xl text-blue-600">{profileData.projectsCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Notes</span>
              <span className="font-bold text-2xl text-purple-600">{profileData.notesCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since</span>
              <span className="font-bold">{user.metadata?.creationTime 
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : 'Recent'}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all"
          >
            Sign Out
          </button>
        </div>

        {/* Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {projects.slice(-3).map(project => (
                <div key={project.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">{project.title}</span>
                </div>
              ))}
              {notes.slice(-3).map(note => (
                <div key={note.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">{note.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/projects')}
                className="p-4 bg-blue-50 border-2 border-blue-100 rounded-xl hover:bg-blue-100 transition-all font-medium"
              >
                <div className="text-2xl mb-2">📁</div>
                Manage Projects
              </button>
              <button
                onClick={() => navigate('/notes')}
                className="p-4 bg-purple-50 border-2 border-purple-100 rounded-xl hover:bg-purple-100 transition-all font-medium"
              >
                <div className="text-2xl mb-2">📝</div>
                Manage Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
