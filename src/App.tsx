/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Learning } from './components/Learning';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { MetaTags, DEFAULT_SEO } from './components/MetaTags';
import { validatePortfolioData } from './utils/validation';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    // In development, run configuration audit to alert developer of invalid URLs or data errors
    if (import.meta.env.DEV) {
      const result = validatePortfolioData();
      if (!result.isValid) {
        console.warn('[Portfolio Data Validation Alert]: Found issues in portfolioData.ts', result.issues);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-300 font-sans">
      {/* Dynamic Document Head Meta & OpenGraph Tags */}
      <MetaTags {...DEFAULT_SEO} />

      {/* Sticky Navbar */}
      <Navbar onOpenResumeModal={() => setResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Featured Projects Section */}
        <Projects />

        {/* 5. Learning / Currently Exploring Section */}
        <Learning />

        {/* 7. Contact Section */}
        <Contact />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Resume Modal Placeholder */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
