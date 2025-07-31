import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon } from 'lucide-react';
import peersignalimg from "../../assets/images/peersignal.png";
import favicoimg from "../../assets/images/favico.png";

export const WorksGallery = () => {
  const projects = [{
    title: 'CaptuRE Recycling',
    category: 'Web Design',
    image: favicoimg,
    color: '#6b8e56',
    url: 'https://capturerecycling.com',
    description: 'Under construction as of 7/2025. A website for a recycling company that allows users to learn about the company, view their products, and contact them.'
  }, {
    title: 'peersignal.io',
    category: 'Product Development',
    image: peersignalimg,
    color: '#2F2F2F',
    url: 'https://peersignal-io.lovable.app/',
    description: 'Under construction as of 7/2025. My personal project to build a financial intelligence platform using publicly available data to help investors make better decisions.'
  }];
  
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-13 md:mb-21" 
          initial={{
            opacity: 0,
            y: 30
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            duration: 0.6
          }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-light leading-tight text-dark dark:text-dark-text transition-colors duration-300">
              Selected Works
            </h2>
            <div className="mt-4 w-16 h-1 bg-accent" />
          </div>
          <button className="mt-6 md:mt-0 group relative inline-flex items-center text-dark dark:text-dark-text hover:text-accent transition-colors duration-300">
            <span>View All Projects</span>
            <span className="ml-2 relative block w-6 h-[1px] bg-current transform transition-transform group-hover:scale-x-150 origin-left"></span>
          </button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {projects.map((project, i) => (
            <motion.div 
              key={i} 
              className="group" 
              initial={{
                opacity: 0,
                y: 30
              }} 
              whileInView={{
                opacity: 1,
                y: 0
              }} 
              viewport={{
                once: true
              }} 
              transition={{
                duration: 0.6,
                delay: 0.1 * i
              }}
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`View ${project.title} project`}>
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center">
                      <ExternalLinkIcon className="text-dark dark:text-dark-text" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block text-sm text-dark/70 dark:text-dark-text-secondary mb-2 transition-colors duration-300">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium text-dark dark:text-dark-text transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </a>
              
              {/* Project Preview Info */}
              <div className="mt-7 p-5 bg-beige dark:bg-dark-surface border border-accent/10 dark:border-dark-border transition-colors duration-300">
                <p className="text-sm text-dark/80 dark:text-dark-text-secondary transition-colors duration-300">
                  {project.description}
                </p>
                <div className="mt-13 flex justify-between items-center">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors duration-300">
                    <span>Visit Project</span>
                    <ExternalLinkIcon className="ml-2" size={14} />
                  </a>
                  <span className="inline-block w-3 h-3" style={{ backgroundColor: project.color }}></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};