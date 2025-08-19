import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'resize'>('default');

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
      const target = e.target as HTMLElement;
      
      // Check for various interactive elements
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'LABEL' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('label') ||
        target.closest('[role="button"]') ||
        target.closest('[tabindex]') ||
        target.closest('.cursor-pointer') ||
        target.closest('[onclick]') ||
        target.closest('[onmouseover]') ||
        target.closest('[onmouseenter]');

      if (isInteractive) {
        setIsHovering(true);
        setCursorType('pointer');
      } else {
        setIsHovering(false);
        setCursorType('default');
      }

      // Special handling for text inputs
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea')) {
        setCursorType('text');
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Reset clicking state after a natural click duration
      setTimeout(() => setIsClicking(false), 150);
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea')) {
        setCursorType('text');
      }
    };

    const handleBlur = () => {
      setCursorType('default');
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    // Hide the default cursor globally
    const hideDefaultCursor = () => {
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
      
      // Override cursor for all interactive elements
      const style = document.createElement('style');
      style.id = 'custom-cursor-override';
      style.textContent = `
        * {
          cursor: none !important;
        }
        input, textarea, select {
          cursor: none !important;
        }
        a, button, [role="button"], [tabindex], .cursor-pointer {
          cursor: none !important;
        }
        ::selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        ::-moz-selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
      `;
      document.head.appendChild(style);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);
    document.addEventListener('selectionchange', handleSelectionChange);
    
    // Hide cursor after a short delay to ensure DOM is ready
    setTimeout(hideDefaultCursor, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('blur', handleBlur, true);
      document.removeEventListener('selectionchange', handleSelectionChange);
      
      // Restore default cursors
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      
      // Remove custom cursor override styles
      const style = document.getElementById('custom-cursor-override');
      if (style) {
        style.remove();
      }
    };
  }, []);

  // Don't render cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  // Determine the current size based on hover and click states
  const getCurrentSize = () => {
    if (isClicking) return 50; // Largest size for click
    if (isHovering) return 40; // Medium size for hover
    return 20; // Default size
  };

  const currentSize = getCurrentSize();

  return (
    <>
      {/* Outer ring - different colors for light/dark modes */}
      <motion.div 
        className="hidden md:block fixed pointer-events-none z-[9999] rounded-full border-2 border-accent dark:border-white/80" 
        style={{
          left: 0,
          top: 0,
          backgroundColor: 'transparent'
        }} 
        animate={{
          x: mousePosition.x - (currentSize / 2),
          y: mousePosition.y - (currentSize / 2),
          width: `${currentSize}px`,
          height: `${currentSize}px`
        }} 
        transition={{
          type: 'spring',
          stiffness: isClicking ? 400 : 300, // Slightly stiffer for click
          damping: isClicking ? 25 : 30, // Less damping for snappier click
          mass: 0.5
        }} 
      />
      
      {/* Inner dot - different colors for light/dark modes */}
      <motion.div 
        className="hidden md:block fixed pointer-events-none z-[9999] rounded-full bg-accent dark:bg-white" 
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