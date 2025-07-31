import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isAutoMode: boolean;
  setAutoMode: (auto: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Check if it's currently night time (between sunset and sunrise)
  const isNightTime = () => {
    const now = new Date();
    const hour = now.getHours();
    // Consider night time from 6 PM (18) to 6 AM (6)
    return hour >= 18 || hour < 6;
  };

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedAutoMode = localStorage.getItem('autoMode');
    
    if (savedAutoMode !== null) {
      setIsAutoMode(savedAutoMode === 'true');
    }

    if (savedTheme && savedAutoMode !== 'true') {
      // Manual mode - use saved theme
      applyTheme(savedTheme);
    } else {
      // Auto mode - use time-based theme
      const shouldBeDark = isNightTime();
      applyTheme(shouldBeDark ? 'dark' : 'light');
    }
  }, []);

  // Handle auto mode changes
  useEffect(() => {
    localStorage.setItem('autoMode', isAutoMode.toString());
    
    if (isAutoMode) {
      const shouldBeDark = isNightTime();
      applyTheme(shouldBeDark ? 'dark' : 'light');
    }
  }, [isAutoMode]);

  // Check for time changes every minute when in auto mode
  useEffect(() => {
    if (!isAutoMode) return;

    const interval = setInterval(() => {
      const shouldBeDark = isNightTime();
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const targetTheme = shouldBeDark ? 'dark' : 'light';
      
      if (currentTheme !== targetTheme) {
        applyTheme(targetTheme);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAutoMode]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setIsAutoMode(false); // Switch to manual mode when user toggles
  };

  const setAutoMode = (auto: boolean) => {
    setIsAutoMode(auto);
    if (auto) {
      const shouldBeDark = isNightTime();
      applyTheme(shouldBeDark ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAutoMode, setAutoMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 