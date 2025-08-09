import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuItems = [
    
    { name: 'About', href: '/about', isInternal: true },
    { name: 'Works', href: '/projects', isInternal: true },
    { name: 'Writings', href: '/blog', isInternal: true },
    { name: 'Contact', href: '/contact', isInternal: true },
    { name: 'My Experience', href: '/Tyler%20Tweeten%20Resume.pdf?v=b2227150', target: '_blank', isInternal: false },
  ];
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-beige/80 dark:bg-dark-bg/80 backdrop-blur-sm border-b border-accent/10 dark:border-dark-border/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <motion.div className="text-dark dark:text-white" initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
          <button 
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className="text-sm lg:text-base hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            tylertweeten.com
          </button>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
          className="hidden md:flex items-center space-x-4 lg:space-x-8"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
                                {item.isInternal ? (
                    <button
                      onClick={() => {
                        navigate(item.href);
                        if (item.href === '/') {
                          window.scrollTo(0, 0);
                        }
                      }}
                      className="relative text-sm lg:text-base text-dark dark:text-dark-text hover:text-accent transition-colors duration-300 py-1 cursor-pointer"
                    >
                      {item.name}
                      <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent" initial={{ width: '0%' }} whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
                    </button>
                  ) : (
                <a
                  href={item.href}
                  target={item.target}
                  className="relative text-sm lg:text-base text-dark dark:text-dark-text hover:text-accent transition-colors duration-300 py-1"
                >
                  {item.name}
                  <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent" initial={{ width: '0%' }} whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
                </a>
              )}
            </motion.div>
          ))}
          
          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <ThemeToggle />
          </motion.div>
        </motion.nav>
        
        {/* Mobile menu button */}
        <motion.button
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <span className="sr-only">Menu</span>
          <span className="w-6 h-[2px] bg-dark dark:bg-dark-text block mb-1.5 transition-colors duration-300" />
          <span className="w-6 h-[2px] bg-dark dark:bg-dark-text block mb-1.5 transition-colors duration-300" />
          <span className="w-6 h-[2px] bg-dark dark:bg-dark-text block transition-colors duration-300" />
        </motion.button>
        
        {/* Mobile Navigation Drawer (Right Side) */}
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-beige dark:bg-dark-bg flex flex-col items-center justify-center transition-colors duration-300"
            style={{ right: 0, top: 0, width: '100vw', height: '100vh' }}
          >
            <button
              className="absolute top-6 right-6 text-3xl text-accent"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            
            {/* Theme Toggle for Mobile */}
            <div className="absolute top-6 left-6">
              <ThemeToggle />
            </div>
            
            <ul className="space-y-8 text-2xl font-light text-dark dark:text-dark-text">
              {menuItems.map((item) => (
                <li key={item.name}>
                  {item.isInternal ? (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(item.href);
                        if (item.href === '/') {
                          window.scrollTo(0, 0);
                        }
                      }}
                      className="block hover:text-accent transition-colors duration-300 px-2 py-2 rounded-lg text-center cursor-pointer w-full"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      target={item.target}
                      className="block hover:text-accent transition-colors duration-300 px-2 py-2 rounded-lg text-center"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}