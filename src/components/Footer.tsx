import React from 'react';
import { Github, Linkedin, ArrowUp, Code2 } from 'lucide-react';
import { CONTACT_CONFIG, DEVELOPER_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasGithub = Boolean(CONTACT_CONFIG.GITHUB_URL && CONTACT_CONFIG.GITHUB_URL.trim() !== '');
  const hasLinkedIn = Boolean(CONTACT_CONFIG.LINKEDIN_URL && CONTACT_CONFIG.LINKEDIN_URL.trim() !== '');

  return (
    <footer className="border-t border-slate-800/80 bg-[#080b11] py-8 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright & Framework */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 className="w-3 h-3" />
            </div>
            <p className="font-mono text-slate-400">
              &copy; 2026 {DEVELOPER_INFO.name}. Built with React.
            </p>
          </div>

          {/* Social Icons (if configured) + Scroll to Top */}
          <div className="flex items-center gap-4">
            {hasGithub && (
              <a
                href={CONTACT_CONFIG.GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {hasLinkedIn && (
              <a
                href={CONTACT_CONFIG.LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
