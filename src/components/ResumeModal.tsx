import React, { useEffect } from 'react';
import { FileText, X, Mail, Download, ExternalLink, Code } from 'lucide-react';
import { CONTACT_CONFIG, DEVELOPER_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasResume = Boolean(CONTACT_CONFIG.RESUME_URL && CONTACT_CONFIG.RESUME_URL.trim() !== '');

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0f1523] p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {DEVELOPER_INFO.name}'s Resume
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {DEVELOPER_INFO.headline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {hasResume ? (
          <div className="space-y-4 text-sm text-slate-300">
            <p>
              Your configured resume is ready to view or download.
            </p>
            <a
              href={CONTACT_CONFIG.RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Open / Download Resume PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <Code className="w-4 h-4" />
                <span>Resume Placeholder Note</span>
              </div>
              <p className="text-xs text-slate-300">
                To attach your real resume, place your PDF in the <code className="text-emerald-400">/public</code> directory as <code className="text-emerald-400">resume.pdf</code> and update <code className="text-emerald-400">RESUME_URL: '/resume.pdf'</code> in <code className="text-emerald-400">src/data/portfolioData.ts</code>.
              </p>
            </div>

            <p className="text-xs text-slate-400">
              For immediate recruiting inquiries or direct placement discussions, feel free to contact Ashish directly:
            </p>

            <a
              href={`mailto:${CONTACT_CONFIG.EMAIL}?subject=Regarding%20Software%20Developer%20Opportunity`}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Contact via Email ({CONTACT_CONFIG.EMAIL})</span>
            </a>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
