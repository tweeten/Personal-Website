import React, { useEffect } from 'react';
import { Hero } from '../components/Home/Hero';
import { OrganicThinking } from '../components/Home/OrganicThinking';
import { WorksGallery } from '../components/Home/WorksGallery';
import { BlogPreview } from '../components/Home/BlogPreview';
import { ContactSection } from '../components/Home/ContactSection';

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <OrganicThinking />
      </div>
      <div id="works">
        <WorksGallery />
      </div>
      <div id="writings">
        <BlogPreview />
      </div>
      <ContactSection />
    </>;
};