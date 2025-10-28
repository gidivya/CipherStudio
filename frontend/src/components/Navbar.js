import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-400">
            CipherStudio
          </Link>
          
          <div className="flex gap-4 items-center">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              to="/editor"
              className="text-gray-300 hover:text-white transition"
            >
              Editor
            </Link>
            <Link
              to="/gallery"
              className="text-gray-300 hover:text-white transition"
            >
              Gallery
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300">
                  Welcome, {user.username}!
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

