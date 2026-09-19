import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Eye, 
  Code, 
  Sparkles, 
  Send 
} from 'lucide-react';
import { toAbsoluteUrl } from './MetaTags';
import { useClipboard } from '../hooks/useClipboard';
import { sanitizePlainText } from '../utils/security';

export interface SocialShareData {
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt?: string;
  badge?: string;
}

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SocialShareData;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const { copied: copiedLink, copy: copyLink } = useClipboard({ timeout: 2200 });
  const { copied: copiedMeta, copy: copyMeta } = useClipboard({ timeout: 2200 });
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  if (!isOpen) return null;

  const absoluteImageUrl = toAbsoluteUrl(data.image);
  const fullUrl = data.url;

  // Sanitize texts for meta tag attributes
  const safeTitle = sanitizePlainText(data.title).replace(/"/g, '&quot;');
  const safeDesc = sanitizePlainText(data.description).replace(/"/g, '&quot;');

  const metaSnippet = `<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDesc}" />
<meta property="og:image" content="${absoluteImageUrl}" />
<meta property="og:url" content="${fullUrl}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${safeTitle}" />
<meta name="twitter:description" content="${safeDesc}" />
<meta name="twitter:image" content="${absoluteImageUrl}" />`;

  const handleCopyLink = () => {
    copyLink(fullUrl);
  };

  const handleCopyMeta = () => {
    copyMeta(metaSnippet);
  };

  // Social share intent links
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    data.title + ' - ' + data.description
  )}&url=${encodeURIComponent(fullUrl)}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullUrl
  )}`;

  const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${data.title}\n${data.description}\n${fullUrl}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-700/80 bg-[#0f172a] p-6 sm:p-7 shadow-2xl space-y-6 text-slate-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-2">
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Social Media &amp; OpenGraph Preview</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Share {data.badge || 'Project'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Live Open Graph tags and social cards for LinkedIn, X (Twitter), and messaging previews.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'preview'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Card Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'code'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw Meta Tags</span>
          </button>
        </div>

        {/* Tab 1: Live Social Card Preview */}
        {activeTab === 'preview' ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-lg">
              {/* Card Image */}
              <div className="w-full bg-slate-900 relative aspect-[1200/630] max-h-56 overflow-hidden flex items-center justify-center border-b border-slate-800">
                <img
                  src={data.image}
                  alt={data.imageAlt || data.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-emerald-400 backdrop-blur-sm border border-emerald-500/30">
                  1200 × 630 OG Banner
                </span>
              </div>

              {/* Card Details (how Twitter/LinkedIn renders the link block) */}
              <div className="p-4 space-y-1.5 bg-[#0b0f17]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 truncate">
                  {typeof window !== 'undefined' ? window.location.hostname : 'ashisharma.github.io'}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {data.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono text-slate-400 block">
                Direct Share to Social Platforms:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {/* Twitter / X */}
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition-colors"
                >
                  <span>Post on X</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                {/* LinkedIn */}
                <a
                  href={linkedInShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-medium transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsAppShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-medium transition-colors"
                >
                  <span>WhatsApp</span>
                  <Send className="w-3 h-3 text-emerald-400" />
                </a>

                {/* Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Raw Meta Tags */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Embed this snippet in standard HTML headers:</span>
              <button
                type="button"
                onClick={handleCopyMeta}
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-mono"
              >
                {copiedMeta ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMeta ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto selection:bg-emerald-500/30">
              <code>{metaSnippet}</code>
            </pre>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-synced with document head</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
