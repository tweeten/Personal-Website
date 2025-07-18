import React from 'react';
import { motion } from 'framer-motion';
export const Hero = () => {
  return <section
    className="relative py-10 md:py-16 min-h-screen flex items-center overflow-hidden bg-beige"
    style={{
      backgroundImage: "url('/images/Stockman_cream.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
      {/* Semi-transparent beige overlay */}
      <div className="absolute inset-0 bg-beige" style={{ opacity: 0.78, zIndex: 1 }} />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center w-full">
          <h1
            className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-bold font-sans leading-tight text-dark mb-8 text-center break-words"
            style={{ textShadow: '2px 2px 8px rgba(60, 58, 54, 0.25), 0 1px 0 #fff' }}
          >
            Tyler Tweeten
          </h1>
          <p
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-bold-dark/80 max-w-xs xs:max-w-md sm:max-w-2xl font-serif mt-13 text-center"
            style={{ textShadow: '1px 1px 6px rgba(60, 58, 54, 0.18), 0 1px 0 #fff' }}
          >
            Building digital experiences with intention
          </p>
        </div>
      </div>
    </section>;
};