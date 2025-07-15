import React, { Component } from 'react';
import { motion } from 'framer-motion';
export const BlogPreview = () => {
  const posts = [{
    title: 'Placeholder Blog 1',
    date: 'July 15, 2025',
    excerpt: "In this section, I plan to write updates about both my personal and professional life.",
    category: 'Design Theory'
  }];
  return <section className="py-20 md:py-32 bg-[#e6dfd0]/30">
      <div className="container mx-auto px-6">
        <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <div>
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              Blueprint Blog (Coming Soon!)
            </h2>
            <div className="mt-4 w-16 h-1 bg-[#b75c3d]" />
          </div>
          <button className="mt-6 md:mt-0 group relative inline-flex items-center text-[#3c3a36] hover:text-[#b75c3d] transition-colors">
            <span>View All Posts</span>
            <span className="ml-2 relative block w-6 h-[1px] bg-current transform transition-transform group-hover:scale-x-150 origin-left"></span>
          </button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => <motion.article key={i} className="group cursor-pointer" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1 * i
        }}>
              <div className="h-1 bg-[#b75c3d]/20 group-hover:bg-[#b75c3d] transition-colors duration-300"></div>
              <div className="p-6 bg-[#f7f3eb] border border-t-0 border-[#b75c3d]/20 h-full">
                <span className="text-sm text-[#b75c3d]">{post.category}</span>
                <h3 className="mt-2 text-xl font-medium group-hover:text-[#b75c3d] transition-colors duration-300">
                  {post.title}
                </h3>
                <time className="mt-2 block text-sm text-[#3c3a36]/60">
                  {post.date}
                </time>
                <p className="mt-4 text-[#3c3a36]/80">{post.excerpt}</p>
                <div className="mt-6 inline-flex items-center text-sm text-[#3c3a36] group-hover:text-[#b75c3d] transition-colors duration-300">
                  <span>Read Article</span>
                  <motion.span className="ml-2 block w-4 h-[1px] bg-current" initial={{
                scaleX: 1
              }} whileHover={{
                scaleX: 1.5
              }} transition={{
                duration: 0.3
              }}></motion.span>
                </div>
              </div>
            </motion.article>)}
        </div>
      </div>
    </section>;
};