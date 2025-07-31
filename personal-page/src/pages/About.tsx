import React, { useEffect } from 'react';
import { OrganicThinking } from '../components/Home/OrganicThinking';

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div id="about">
        <OrganicThinking />
      </div>
    </div>
  );
}; 