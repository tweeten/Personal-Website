import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const footerLinks = [
    { label: 'Home', href: '/', isInternal: true },
    { label: 'About', href: '/about', isInternal: true },
    { label: 'Works', href: '/projects', isInternal: true },
    { label: 'Writings', href: '/blog', isInternal: true },
    { label: 'Contact', href: '/contact', isInternal: true },
    { label: 'My Experience', href: '/Tyler%20Tweeten%20Resume.pdf', isInternal: false }
  ];

  return (
    <footer className="border-t border-accent/10 dark:border-dark-border/20 py-8 sm:py-12 mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <motion.div 
              className="text-2xl sm:text-3xl font-bold text-accent cursor-pointer" 
              initial={{
                opacity: 0,
                y: 20
              }} 
              whileInView={{
                opacity: 1,
                y: 0
              }} 
              viewport={{
                once: true
              }} 
              transition={{
                duration: 0.5
              }}
              onClick={() => navigate('/')}
            >
              tylertweeten.com
            </motion.div>
            <motion.p 
              className="mt-4 text-xs sm:text-sm text-dark/80 dark:text-dark-text-secondary" 
              initial={{
                opacity: 0,
                y: 20
              }} 
              whileInView={{
                opacity: 1,
                y: 0
              }} 
              viewport={{
                once: true
              }} 
              transition={{
                duration: 0.5,
                delay: 0.1
              }}
            >
              Designed in the north.
              <br />
              Built with grit and AI.
            </motion.p>
            <div className="flex space-x-6 mt-6 justify-center md:justify-start">
              <a href="https://github.com/tweeten" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-7 w-7 text-accent hover:text-dark dark:hover:text-dark-text transition-colors duration-200" />
              </a>
              <a href="https://linkedin.com/in/tylertweeten" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-7 w-7 text-accent hover:text-dark dark:hover:text-dark-text transition-colors duration-200" />
              </a>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {footerLinks.map(({ label, href, isInternal }, i) => (
              <motion.div 
                key={i} 
                initial={{
                  opacity: 0,
                  y: 20
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0
                }} 
                viewport={{
                  once: true
                }} 
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.1
                }}
              >
                {isInternal ? (
                  <button
                    onClick={() => navigate(href)}
                    className="font-medium mb-2 text-base sm:text-lg text-dark dark:text-dark-text hover:text-accent transition-colors block text-left cursor-pointer relative"
                  >
                    {label}
                    <div className="h-px w-8 bg-accent absolute -bottom-1 md:-bottom-2 left-0 md:left-0"></div>
                  </button>
                ) : (
                  <a 
                    href={href} 
                    className="font-medium mb-2 text-base sm:text-lg text-dark dark:text-dark-text hover:text-accent transition-colors block text-left relative"
                  >
                    {label}
                    <div className="h-px w-8 bg-accent absolute -bottom-1 md:-bottom-2 left-0 md:left-0"></div>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div 
          className="border-t border-accent/10 dark:border-dark-border/20 mt-8 sm:mt-12 pt-4 sm:pt-6 text-xs sm:text-sm text-dark/60 dark:text-dark-text-secondary flex flex-col md:flex-row justify-between items-center transition-colors duration-300" 
          initial={{
            opacity: 0,
            y: 20
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            duration: 0.5,
            delay: 0.3
          }}
        >
          <p>
            © {new Date().getFullYear()} Tyler Tweeten. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">Inspired by Frank Lloyd Wright</p>
        </motion.div>
      </div>
    </footer>
  );
};