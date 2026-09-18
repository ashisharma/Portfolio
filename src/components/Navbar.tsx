import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ExternalLink, Code2 } from 'lucide-react';
import { CONTACT_CONFIG, DEVELOPER_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          // Determine active section for nav indicator
          const sections = ['about', 'skills', 'projects', 'dsa', 'contact'];
          const scrollPosition = window.scrollY + 120;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(sectionId);
                ticking = false;
                return;
              }
            }
          }
          if (window.scrollY < 200) {
            setActiveSection('home');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'DSA', href: '#dsa' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleResumeClick = (e: React.MouseEvent) => {
    if (CONTACT_CONFIG.RESUME_URL && CONTACT_CONFIG.RESUME_URL.trim() !== '') {
      // Normal external or file link
      return;
    }
    // If no resume URL is set yet, trigger the friendly recruiter placeholder modal
    e.preventDefault();
    if (onOpenResumeModal) {
      onOpenResumeModal();
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md p-1"
            aria-label="Ashish - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm group-hover:border-emerald-400 group-hover:bg-emerald-500/20 transition-all">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              {DEVELOPER_INFO.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Resume Button */}
            <div className="ml-3 pl-3 border-l border-slate-800">
              <a
                href={CONTACT_CONFIG.RESUME_URL || '#resume'}
                onClick={handleResumeClick}
                target={CONTACT_CONFIG.RESUME_URL ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
                {CONTACT_CONFIG.RESUME_URL && <ExternalLink className="w-3 h-3 opacity-70" />}
              </a>
            </div>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={CONTACT_CONFIG.RESUME_URL || '#resume'}
              onClick={handleResumeClick}
              target={CONTACT_CONFIG.RESUME_URL ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-xs font-semibold rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              aria-label="Resume"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b0f17]/98 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block min-h-[44px] px-3 py-3 text-base font-medium rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
