import React from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { CustomCursor } from './components/Layout/CustomCursor';
import { Home } from './pages/Home';
export function App() {
  return <div className="relative bg-[#f7f3eb] text-[#3c3a36] min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Header />
      <main className="pt-16">
        <Home />
      </main>
      <Footer />
    </div>;
}