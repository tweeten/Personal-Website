import React from 'react';
import { Hero } from '../components/Home/Hero';
import { OrganicThinking } from '../components/Home/OrganicThinking';
import { WorksGallery } from '../components/Home/WorksGallery';
import { BlogPreview } from '../components/Home/BlogPreview';
import { ContactSection } from '../components/Home/ContactSection';
export const Home = () => {
  return <>
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <OrganicThinking />
      </div>
      <div id="works">
        <WorksGallery />
      </div>
      <div id="blog">
        <BlogPreview />
      </div>
      <ContactSection />
    </>;
};