import React, { useMemo } from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { getActiveSocialChannels } from '../utils/contactUtils';
import { getSecureLinkProps } from '../utils/security';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialChannels = useMemo(() => getActiveSocialChannels(), []);

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
          <div className="flex items-center gap-3">
            {socialChannels.map((channel) => {
              const IconComponent = channel.icon;
              const linkProps = getSecureLinkProps(channel.url);

              return (
                <a
                  key={channel.id}
                  {...linkProps}
                  className={`text-slate-400 ${channel.hoverTextClass} transition-colors p-1`}
                  aria-label={channel.ariaLabel}
                  title={channel.label}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}

            <div className="h-4 w-px bg-slate-800 mx-1" />

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

