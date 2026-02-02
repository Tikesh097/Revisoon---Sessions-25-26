import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const { projects, addProject, deleteProject } = useAuth();
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    localStorage.setItem('lastSection', 'projects');
    localStorage.removeItem('lastItem');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({ title: '', description: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Projects</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-800"
        >
          Add Project
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Link to={`/projects/${project.id}`} className="block">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
            </Link>
            <button
              onClick={() => deleteProject(project.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
