import React, { Children } from 'react';
import { motion } from 'framer-motion';
interface NavigationProps {
  setMenuOpen: (open: boolean) => void;
}
export const Navigation = ({
  setMenuOpen
}: NavigationProps) => {
  const menuItems = [{
    title: 'Home',
    path: '/'
  }, {
    title: 'Works',
    path: '/works'
  }, {
    title: 'About Me',
    path: '/about'
  }, {
    title: 'Blueprint Blog',
    path: '/blog'
  }, {
    title: 'Contact',
    path: '/contact'
  }];
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 0.8
      }
    }
  };
  const gridLines = Array(10).fill(0);
  return <motion.nav className="fixed inset-0 z-40 bg-[#f7f3eb] flex items-center justify-center overflow-hidden px-2 sm:px-8" initial={{
    opacity: 0,
    y: -50
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -50
  }} transition={{
    duration: 0.5,
    ease: 'easeInOut'
  }}>
      {/* Grid pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        {gridLines.map((_, i) => <motion.div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-[#b75c3d]/10" style={{
        left: `${(i + 1) * 10}%`
      }} initial={{
        scaleY: 0,
        originY: 0
      }} animate={{
        scaleY: 1
      }} transition={{
        duration: 1,
        delay: 0.05 * i,
        ease: 'easeOut'
      }} />)}
        {gridLines.map((_, i) => <motion.div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-[#b75c3d]/10" style={{
        top: `${(i + 1) * 10}%`
      }} initial={{
        scaleX: 0,
        originX: 0
      }} animate={{
        scaleX: 1
      }} transition={{
        duration: 1,
        delay: 0.05 * i,
        ease: 'easeOut'
      }} />)}
      </div>
      <motion.ul className="relative z-10 text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-light space-y-4 sm:space-y-8" variants={container} initial="hidden" animate="show">
        {menuItems.map((menuItem, i) => <motion.li key={i} variants={item} className="relative overflow-hidden">
            <button onClick={() => setMenuOpen(false)} className="relative block hover:text-[#b75c3d] transition-colors duration-300 group px-2 py-2 sm:px-4 sm:py-3 w-full text-left">
              {menuItem.title}
              <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b75c3d]" initial={{
            width: '0%'
          }} whileHover={{
            width: '100%'
          }} transition={{
            duration: 0.3
          }} />
            </button>
          </motion.li>)}
      </motion.ul>
    </motion.nav>;
};