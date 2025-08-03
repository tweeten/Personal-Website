import React from 'react';
import { motion } from 'framer-motion';

interface StockmanLogoProps {
  onClick?: () => void;
  className?: string;
}

export const StockmanLogo = ({ onClick, className = '' }: StockmanLogoProps) => {
  return (
    <motion.div 
      className={`relative cursor-pointer ${className}`}
      initial={{
        opacity: 0,
        y: -10
      }} 
      animate={{
        opacity: 1,
        y: 0
      }} 
      transition={{
        duration: 0.5
      }}
      onClick={onClick}
    >
      {/* Light mode silhouette - house only */}
      <img
        src="/images/Stockman_house_only_light.png"
        alt="Stockman House - Tyler Tweeten"
        className="h-16 w-auto object-contain transition-all duration-300 hover:scale-105 dark:hidden"
      />
      
      {/* Dark mode silhouette - house only */}
      <img
        src="/images/Stockman_house_only_dark.png"
        alt="Stockman House - Tyler Tweeten"
        className="h-16 w-auto object-contain transition-all duration-300 hover:scale-105 hidden dark:block"
      />
    </motion.div>
  );
}; 