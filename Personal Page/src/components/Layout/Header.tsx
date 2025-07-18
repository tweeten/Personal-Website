import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Works', href: '#works' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '/Tyler%20Tweeten%20Resume.pdf', target: '_blank' },
  ];
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#f7f3eb]/80 backdrop-blur-sm border-b border-[#b75c3d]/10">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <motion.div className="font-bold text-lg sm:text-xl text-[#b75c3d]" initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
          tylertweeten.com
        </motion.div>
        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
          className="hidden md:flex items-center space-x-4 lg:space-x-8"
        >
          {menuItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              target={item.target}
              className="relative text-sm lg:text-base text-[#3c3a36] hover:text-[#b75c3d] transition-colors duration-300 py-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              {item.name}
              <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b75c3d]" initial={{ width: '0%' }} whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
            </motion.a>
          ))}
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
          <span className="w-6 h-[2px] bg-[#3c3a36] block mb-1.5" />
          <span className="w-6 h-[2px] bg-[#3c3a36] block mb-1.5" />
          <span className="w-6 h-[2px] bg-[#3c3a36] block" />
        </motion.button>
        {/* Mobile Navigation Drawer (Right Side) */}
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-[#f7f3eb] flex flex-col items-center justify-center"
            style={{ right: 0, top: 0, width: '100vw', height: '100vh' }}
          >
            <button
              className="absolute top-6 right-6 text-3xl text-[#b75c3d]"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            <ul className="space-y-8 text-2xl font-light text-[#3c3a36]">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.target}
                    className="block hover:text-[#b75c3d] transition-colors duration-300 px-2 py-2 rounded-lg text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}