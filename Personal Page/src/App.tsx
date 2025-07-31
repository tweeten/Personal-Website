import React from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { CustomCursor } from './components/Layout/CustomCursor';
import { Home } from './pages/Home';
import { ThemeProvider } from './contexts/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <div className="relative bg-beige dark:bg-dark-bg text-dark dark:text-dark-text min-h-screen overflow-x-hidden transition-colors duration-300">
        <CustomCursor />
        <Header />
        <main className="pt-16">
          <Home />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}