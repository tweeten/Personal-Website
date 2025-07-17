import React from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon, DownloadIcon } from 'lucide-react';
export const OrganicThinking = () => {
  const resumeUrl = '/Tyler%20Tweeten%20Resume.pdf';
  return <section className="py-24 bg-beige border-t border-border">
    <div className="container mx-auto px-6">
      <div className="flex justify-center mb-6 mt-4">
        <img
          src="/images/headshot.png"
          alt="Tyler Tweeten headshot"
          className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
          style={{ marginTop: '1.5rem' }}
        />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold font-sans text-dark text-center mb-8">About Me</h2>
      <p className="text-lg text-dark/80 font-serif text-center max-w-2xl mx-auto mb-16">
        I’m Tyler Tweeten, an AI powered Technical Product Manager passionate about building digital experiences that blend the harmony of nature with the precision of architecture. My work is guided by the belief that design should be both beautiful and purposeful, enhancing the human experience through thoughtful, intuitive solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {/* Value 1 */}
        <div className="flex flex-col items-center text-center p-8 bg-white border border-border rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-green mb-6"></div>
          <h3 className="text-xl font-bold font-sans text-dark mb-2">Harmony</h3>
          <p className="text-dark/70 font-serif">Creating balance between aesthetics and functionality in every project.</p>
        </div>
        {/* Value 2 */}
        <div className="flex flex-col items-center text-center p-8 bg-white border border-border rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-gold mb-6"></div>
          <h3 className="text-xl font-bold font-sans text-dark mb-2">Simplicity</h3>
          <p className="text-dark/70 font-serif">Embracing minimalism without sacrificing depth or character.</p>
        </div>
        {/* Value 3 */}
        <div className="flex flex-col items-center text-center p-8 bg-white border border-border rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-accent mb-6"></div>
          <h3 className="text-xl font-bold font-sans text-dark mb-2">Connection</h3>
          <p className="text-dark/70 font-serif">Building bridges between human needs and technological possibilities.</p>
        </div>
        {/* Resume Card: spans all columns on md+ and stretches full width */}
        <div className="md:col-span-3 w-full mt-12">
          <div className="w-full bg-white border border-border rounded-2xl shadow-xl overflow-auto flex flex-col">
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
              <div className="w-full h-72 sm:h-[36rem] rounded-lg border border-border bg-beige overflow-x-auto flex items-center justify-center" style={{ marginTop: '20px' }}>
                <iframe
                  src={resumeUrl + (window.innerWidth < 640 ? "#zoom=80" : "#zoom=125")}
                  width="100%"
                  height={window.innerWidth < 640 ? "350" : "100%"}
                  className="w-full h-full rounded-lg min-w-[320px]"
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