import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Activity, Thermometer, Apple, Scale, LineChart, MessageCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80" onClick={closeSidebar}></div>
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
        <div className="flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center" onClick={closeSidebar}>
            <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold texPt-gray-900 dark:text-white">HealthWise</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={closeSidebar}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <nav className="px-3 pt-4 pb-8">
          <div className="space-y-1">
            <Link
              to="/symptoms-checker"
              className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                location.pathname === '/symptoms-checker'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Thermometer className="mr-3 h-5 w-5" />
              Symptoms Checker
            </Link>
            <Link
              to="/food-database"
              className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                location.pathname === '/food-database'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Apple className="mr-3 h-5 w-5" />
              Food Database
            </Link>
            <Link
              to="/bmi-calculator"
              className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                location.pathname === '/bmi-calculator'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Scale className="mr-3 h-5 w-5" />
              BMI Calculator
            </Link>
            <Link
              to="/health-tracker"
              className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                location.pathname === '/health-tracker'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <LineChart className="mr-3 h-5 w-5" />
              Health Tracker
            </Link>
            <Link
              to="/ai-doctor"
              className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                location.pathname === '/ai-doctor'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              AI Doctor
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;