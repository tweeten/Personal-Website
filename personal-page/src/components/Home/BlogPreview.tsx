import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const BlogPreview = () => {
  const navigate = useNavigate();
  const posts = [{
    title: 'Placeholder for writings',
    date: 'July 15, 2025',
    excerpt: "In this section, I plan to write updates about both my personal and professional life.",
    category: 'About me'
  }];
  
  return (
    <section className="py-10 md:py-16 bg-border/30 dark:bg-dark-border/20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-13 md:mb-21 mt-[48px]" 
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
              Writings (Coming Soon!)
            </h2>
            <div className="mt-4 w-16 h-1 bg-accent" />
          </div>
          <button 
            onClick={() => navigate('/blog')}
            className="mt-6 md:mt-0 group relative inline-flex items-center text-dark dark:text-dark-text hover:text-accent transition-colors duration-300"
          >
            <span>View All Posts</span>
            <span className="mt-6 ml-2 mb-6 relative block w-6 h-[1px] bg-current transform transition-transform group-hover:scale-x-150 origin-left"></span>
          </button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-13">
          {posts.map((post, i) => (
            <motion.article 
              key={i} 
              className="group cursor-pointer" 
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
              onClick={() => window.open('https://tylertweeten.com/blog/placeholder', '_blank')}
            >
              <div className="h-1 bg-accent/20 group-hover:bg-accent transition-colors duration-300"></div>
              <div className="p-6 bg-beige dark:bg-dark-surface border border-t-0 border-accent/20 dark:border-dark-border h-full transition-colors duration-300">
                <span className="text-sm text-accent">{post.category}</span>
                <h3 className="mt-2 text-xl font-medium text-dark dark:text-dark-text group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <time className="mt-2 block text-sm text-dark/60 dark:text-dark-text-secondary transition-colors duration-300">
                  {post.date}
                </time>
                <p className="mt-7 text-dark/80 dark:text-dark-text-secondary transition-colors duration-300">
                  {post.excerpt}
                </p>
                <div className="mt-13 inline-flex items-center text-sm text-dark dark:text-dark-text group-hover:text-accent transition-colors duration-300">
                  <span>Read Article</span>
                  <motion.span 
                    className="ml-2 block w-4 h-[1px] bg-current" 
                    initial={{
                      scaleX: 1
                    }} 
                    whileHover={{
                      scaleX: 1.5
                    }} 
                    transition={{
                      duration: 0.3
                    }}
                  ></motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};