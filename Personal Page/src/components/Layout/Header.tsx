import React, { Children } from 'react';
import { motion } from 'framer-motion';
export const Header = () => {
  const menuItems = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'Works',
    href: '#works'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Blog',
    href: '#blog'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  return <header className="fixed top-0 left-0 w-full z-40 bg-[#f7f3eb]/80 backdrop-blur-sm border-b border-[#b75c3d]/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div className="font-bold text-xl text-[#b75c3d]" initial={{
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
        <motion.nav initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2,
        staggerChildren: 0.1
      }} className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => <motion.a key={item.name} href={item.href} className="relative text-sm text-[#3c3a36] hover:text-[#b75c3d] transition-colors duration-300 py-1" initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3,
          delay: 0.1 + index * 0.1
        }}>
              {item.name}
              <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b75c3d]" initial={{
            width: '0%'
          }} whileHover={{
            width: '100%'
          }} transition={{
            duration: 0.3
          }} />
            </motion.a>)}
        </motion.nav>
        {/* Mobile menu button - only visible on small screens */}
        <motion.button className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }}>
          <span className="sr-only">Menu</span>
          <span className="w-6 h-[2px] bg-[#3c3a36] block mb-1.5" />
          <span className="w-6 h-[2px] bg-[#3c3a36] block mb-1.5" />
          <span className="w-6 h-[2px] bg-[#3c3a36] block" />
        </motion.button>
      </div>
    </header>;
};