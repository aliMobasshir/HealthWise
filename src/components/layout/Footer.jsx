import React from 'react';
import { Activity } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">HealthWise</span>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} HealthWise. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Disclaimer: This application is for informational purposes only and is not a substitute for professional medical advice.
            </p>
            <p className="text-xs text-blue-400 dark:text-blue-500 mt-1">
             Powered By Bolt.new
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;