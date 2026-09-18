import React from 'react';
import { Code, Cpu, Globe, Rocket, Compass, BookOpen } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const pillarIcons = [
    <Code className="w-5 h-5 text-emerald-400" />,
    <Cpu className="w-5 h-5 text-emerald-400" />,
    <Globe className="w-5 h-5 text-emerald-400" />,
    <Rocket className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Background &amp; Focus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About Me
          </h2>
        </div>

        {/* 2-Column Grid on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Professional Narrative */}
          <div className="lg:col-span-6 space-y-5 text-slate-300 text-base leading-relaxed">
            {DEVELOPER_INFO.about.paragraphs.map((para, index) => (
              <p key={index} className="text-slate-300">
                {para}
              </p>
            ))}

            {/* Practical engineering mindset note */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white block mb-1">
                    Recruiter &amp; Placement Readiness
                  </span>
                  Actively preparing for software development roles and internships. Focusing on core engineering rigor, writing clean object-oriented code, and algorithmic efficiency.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas / Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DEVELOPER_INFO.about.focusAreas.map((area, idx) => (
              <div
                key={area.title}
                className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-emerald-500/30 hover:bg-slate-900/90 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3.5 group-hover:scale-105 group-hover:border-emerald-500/40 transition-transform">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                  {area.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
