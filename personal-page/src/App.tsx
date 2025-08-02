import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { CustomCursor } from './components/Layout/CustomCursor';
import { ScrollToTop } from './components/Layout/ScrollToTop';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ThemeProvider } from './contexts/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative bg-beige dark:bg-dark-bg text-dark dark:text-dark-text min-h-screen overflow-x-hidden transition-colors duration-300">
          <ScrollToTop />
          <CustomCursor />
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}