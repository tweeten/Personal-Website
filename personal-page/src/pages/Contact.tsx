import React, { useEffect } from 'react';
import { ContactSection } from '../components/Home/ContactSection';

export const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}; 