import React from 'react';
import { motion } from 'framer-motion';
export const OrganicThinking = () => {
  return <section className="py-20 md:py-32 bg-[#e6dfd0]/30">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-6 mt-4">
          <img
            src="images/headshot.png"
            alt="Tyler Tweeten headshot"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            style={{ marginTop: '1.5rem' }}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div className="lg:col-span-5 lg:col-start-2" initial={{
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
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              Organic Thinking
            </h2>
            <div className="mt-4 w-16 h-1 bg-[#b75c3d]" />
            <p className="mt-6 text-lg text-[#3c3a36]/80">
              In the spirit of Frank Lloyd Wright's philosophy that form and
              function are one, I create digital experiences that are both
              beautiful and purposeful.
            </p>
          </motion.div>
          <motion.div className="lg:col-span-5" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <p className="text-[#3c3a36]/80">
              My work is guided by the belief that digital design should
              harmonize with human intuition. Each project is an opportunity to
              create spaces that feel natural and intuitive, where technology
              enhances rather than complicates the human experience.
            </p>
            <p className="mt-4 text-[#3c3a36]/80">
              Like Wright's buildings that emerged from their surroundings, my
              designs grow organically from the content they contain and the
              people they serve.
            </p>
          </motion.div>
        </div>
      </div>
    </section>;
};