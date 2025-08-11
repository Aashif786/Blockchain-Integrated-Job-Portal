
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../App";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/jobs', label: 'Jobs', icon: '💼' },
    { path: '/post-job', label: 'Post Job', icon: '✏️' },
  ];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-sm">JB</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              JobBoard
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'my-1'}`}></span>
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
