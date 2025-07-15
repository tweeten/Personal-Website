import React from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon, DownloadIcon } from 'lucide-react';
export const Hero = () => {
  // In a real implementation, you would have your actual resume file here
  // Place your resume PDF in the Personal Page/public/ directory and set the filename below
  const resumeUrl = '/Tyler%20Tweeten%20Resume.pdf';
  return <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-beige">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array(10).fill(0).map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-accent/10" style={{ left: `${(i + 1) * 10}%` }} />
        ))}
        {Array(10).fill(0).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-accent/10" style={{ top: `${(i + 1) * 10}%` }} />
        ))}
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-24 items-center">
          <div className="lg:col-span-3">
            <h1 className="text-6xl md:text-8xl font-bold font-sans leading-tight text-dark mb-8">
              Tyler <span className="block text-accent">Tweeten</span>
            </h1>
            <div className="w-24 h-1 bg-accent mb-8" />
            <p className="text-xl md:text-2xl text-dark/80 max-w-xl font-serif mb-10">
              Building digital experiences with the harmony of nature and the precision of architecture.
            </p>
          </div>
          <div className="lg:col-span-2 flex justify-center items-center">
            {/* Resume Card */}
            <div className="w-full max-w-[40rem] aspect-[3/4] bg-white border border-border rounded-2xl shadow-xl overflow-auto flex flex-col">
              <div className="flex items-center justify-between gap-4 bg-accent/10 px-6 py-5 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg">
                    <FileTextIcon className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark font-sans">Resume</h3>
                    <p className="text-xs text-dark/60 font-serif">Tyler Tweeten</p>
                  </div>
                </div>
                <a
                  href={resumeUrl}
                  download
                  className="flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full shadow-lg hover:bg-gold transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon size={18} />
                  <span className="sr-only">Download Resume</span>
                </a>
              </div>
              {/* PDF Preview */}
              <div className="flex-1 p-4 pt-0 flex flex-col justify-center bg-beige">
                <div className="w-full h-[36rem] rounded-lg border border-border bg-beige overflow-hidden flex items-center justify-center" style={{ marginTop: '20px' }}>
                  <iframe
                    src={resumeUrl}
                    width="100%"
                    height="100%"
                    className="w-full h-full rounded-lg"
                    style={{ background: '#F7F3EB' }}
                    title="Resume Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};