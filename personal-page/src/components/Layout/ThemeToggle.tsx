import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  const getIcon = () => {
    return theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />;
  };

  const getTooltip = () => {
    return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative p-2 rounded-lg transition-colors duration-200 bg-transparent text-dark dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={getTooltip()}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
}; 