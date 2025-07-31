import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // On mount, set cursor to center
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Outer ring - different colors for light/dark modes */}
      <motion.div 
        className="hidden md:block fixed pointer-events-none z-50 rounded-full border-2 border-accent dark:border-white/80" 
        style={{
          left: 0,
          top: 0,
          backgroundColor: 'transparent'
        }} 
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 10),
          y: mousePosition.y - (isHovering ? 20 : 10),
          width: isHovering ? '40px' : '20px',
          height: isHovering ? '40px' : '20px'
        }} 
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.5
        }} 
      />
      
      {/* Inner dot - different colors for light/dark modes */}
      <motion.div 
        className="hidden md:block fixed pointer-events-none z-50 rounded-full bg-accent dark:bg-white" 
        style={{
          left: 0,
          top: 0,
          width: '4px',
          height: '4px'
        }} 
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2
        }} 
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.2
        }} 
      />
    </>
  );
};