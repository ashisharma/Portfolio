import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Send,
  Sparkles,
  Edit3
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const hasEmail = Boolean(CONTACT_CONFIG.EMAIL && CONTACT_CONFIG.EMAIL.trim() !== '');
  const hasGithub = Boolean(CONTACT_CONFIG.GITHUB_URL && CONTACT_CONFIG.GITHUB_URL.trim() !== '');
  const hasLinkedIn = Boolean(CONTACT_CONFIG.LINKEDIN_URL && CONTACT_CONFIG.LINKEDIN_URL.trim() !== '');
  const hasLeetcode = Boolean(CONTACT_CONFIG.LEETCODE_URL && CONTACT_CONFIG.LEETCODE_URL.trim() !== '');

  const handleCopyEmail = () => {
    if (!hasEmail) return;
    navigator.clipboard.writeText(CONTACT_CONFIG.EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-gradient-to-b from-[#0f1523]/90 to-[#0b0f17] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle top ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Section Heading */}
          <div className="relative z-10 max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Let's Connect
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Interested in collaboration, projects, internships, or developer opportunities? Feel free to connect.
            </p>
          </div>

          {/* Contact Methods (Real links only, no broken stubs) */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            
            {/* Primary Email Showcase & Copy */}
            {hasEmail && (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
                <a
                  href={`mailto:${CONTACT_CONFIG.EMAIL}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                  <Send className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>{CONTACT_CONFIG.EMAIL}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Social & Professional Profile Badges (Only shown if configured) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {hasGithub && (
                <a
                  href={CONTACT_CONFIG.GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-500 text-slate-200 text-xs font-medium transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}

              {hasLinkedIn && (
                <a
                  href={CONTACT_CONFIG.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 hover:border-blue-500/40 text-slate-200 text-xs font-medium transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}

              {hasLeetcode && (
                <a
                  href={CONTACT_CONFIG.LEETCODE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 hover:border-amber-500/40 text-slate-200 text-xs font-medium transition-all"
                  aria-label="LeetCode Profile"
                >
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>LeetCode Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
            </div>

            {/* Clear Configuration Notice for the Developer */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-lg mx-auto text-left text-xs text-slate-500 space-y-1 font-mono">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Developer Note: Profile Links Configuration</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                To update or add your GitHub, LinkedIn, LeetCode, or Resume URLs, simply edit the constants inside{' '}
                <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">
                  src/data/portfolioData.ts
                </code>
                . Empty fields are hidden automatically so your live portfolio never shows broken links.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
