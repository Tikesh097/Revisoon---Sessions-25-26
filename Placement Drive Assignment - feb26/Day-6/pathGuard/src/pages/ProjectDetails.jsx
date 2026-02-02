import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { projects, updateProject, deleteProject } = useAuth();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);
  const [editing, setEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({});

  useEffect(() => {
    localStorage.setItem('lastSection', 'projects');
    localStorage.setItem('lastItem', projectId);
  }, [projectId]);

  useEffect(() => {
    if (project) {
      setEditedProject({ title: project.title, description: project.description });
    }
  }, [project]);

  if (!project) {
    return <div className="max-w-4xl mx-auto p-6">Project not found</div>;
  }

  const handleSave = () => {
    updateProject(projectId, editedProject);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <button 
            onClick={() => navigate('/projects')}
            className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-gray-800">{project.title}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={() => deleteProject(projectId)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {editing ? (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <input
            type="text"
            value={editedProject.title}
            onChange={(e) => setEditedProject({...editedProject, title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg text-3xl font-bold mb-4"
          />
          <textarea
            value={editedProject.description}
            onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg h-32"
            placeholder="Description..."
          />
          <button
            onClick={handleSave}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-xl text-gray-700">{project.description}</p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date(project.updatedAt || project.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
