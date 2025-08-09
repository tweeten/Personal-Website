import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Blog = () => {
  const navigate = useNavigate();
  const posts = [
    {
      title: 'The Wright Stuff',
      date: 'August 9, 2025',
      category: 'About me',
      excerpt: 'Why I decided to build my own website, how I did it, and what I learned.',
      url: '/blog/stuff'
    },
    {
      title: 'The Wright Shed',
      date: 'August 9, 2025',
      category: 'About me',
      excerpt: 'Crafting the perfect space to be crafty.',
      url: '/blog/shed'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="py-10 md:py-16 bg-border/30 dark:bg-dark-border/20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div 
            className="mb-13 md:mb-21" 
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
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-dark dark:text-dark-text transition-colors duration-300">
              Writings
            </h1>
            <div className="mt-4 w-16 h-1 bg-accent" />
            <p className="mt-6 mb-8 text-lg text-dark/70 dark:text-dark-text-secondary transition-colors duration-300">
              Thoughts, insights, and updates from my journey in technology and design.
            </p>
          </motion.div>
          
          <div className="max-w-4xl">
            {posts.map((post, i) => (
              <motion.article 
                key={i} 
                className="mb-12 group cursor-pointer" 
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
                onClick={() => navigate(post.url)}
              >
                <div className="border-l-4 border-accent/20 group-hover:border-accent transition-colors duration-300 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-end mb-4">
                    <time className="text-md text-accent font-medium">
                      {post.date}
                    </time>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium text-dark dark:text-dark-text group-hover:text-accent transition-colors duration-300 mb-4">
                    {post.title}
                  </h2>
                  <p className="text-lg text-dark/80 dark:text-dark-text-secondary transition-colors duration-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center text-sm text-dark dark:text-dark-text group-hover:text-accent transition-colors duration-300">
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
    </div>
  );
}; 