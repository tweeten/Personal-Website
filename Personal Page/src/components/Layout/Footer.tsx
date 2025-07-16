import React from 'react';
import { motion } from 'framer-motion';
export const Footer = () => {
  return <footer className="border-t border-[#b75c3d]/10 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.div className="text-3xl font-bold text-[#b75c3d]" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              tylertweeten.com
            </motion.div>
            <motion.p className="mt-4 text-sm text-[#3c3a36]/80" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              Designed in the north.
              <br />
              Built with grit and AI.
            </motion.p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Works', href: '#works' },
              { label: 'About', href: '#about' },
              { label: 'Blog', href: '#blog' },
              { label: 'Contact', href: '#contact' }
            ].map(({ label, href }, i) => (
              <motion.div key={i} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1
              }}>
                <a href={href} className="font-medium mb-2 text-lg text-[#3c3a36] hover:text-[#b75c3d] transition-colors block">
                  {label}
                </a>
                <div className="h-px w-8 bg-[#b75c3d] mb-4"></div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="border-t border-[#b75c3d]/10 mt-12 pt-6 text-sm text-[#3c3a36]/60 flex flex-col md:flex-row justify-between items-center" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }}>
          <p>
            © {new Date().getFullYear()} Tyler Tweeten. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">Inspired by Frank Lloyd Wright</p>
        </motion.div>
      </div>
    </footer>;
};