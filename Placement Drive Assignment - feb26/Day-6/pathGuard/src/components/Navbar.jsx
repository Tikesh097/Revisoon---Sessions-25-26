import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('lastSection');
    localStorage.removeItem('lastItem');
    window.location.href = '/login';
  };

  useEffect(() => {
    if (!loading && !user && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [user, loading, navigate, location]);

  if (loading) return null;

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white">PathGuard</Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/projects" className="text-white hover:text-blue-100 px-3 py-2 rounded-md font-medium">Projects</Link>
              <Link to="/notes" className="text-white hover:text-blue-100 px-3 py-2 rounded-md font-medium">Notes</Link>
              <Link to="/profile" className="text-white hover:text-blue-100 px-3 py-2 rounded-md font-medium">Profile</Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="text-white hover:text-blue-100 px-3 py-2 rounded-md">Login</Link>
              <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
