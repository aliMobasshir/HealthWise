import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ toggleSidebar }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center ml-2 md:ml-0">
              <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">HealthWise</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/symptoms-checker" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Symptoms Checker
            </Link>
            <Link to="/food-database" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Food Database
            </Link>
            <Link to="/bmi-calculator" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              BMI Calculator
            </Link>
            <Link to="/health-tracker" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Health Tracker
            </Link>
            <Link to="/ai-doctor" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              AI Doctor
            </Link>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;