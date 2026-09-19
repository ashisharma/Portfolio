import React, { useMemo } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Send,
  Sparkles,
  Edit3,
  AlertTriangle
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/portfolioData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useClipboard } from '../hooks/useClipboard';
import { getActiveSocialChannels, getSafeEmail, isChannelActive } from '../utils/contactUtils';
import { getSecureLinkProps, sanitizeUrl } from '../utils/security';
import { validateContactConfig } from '../utils/validation';

export const Contact: React.FC = () => {
  const safeEmail = getSafeEmail();
  const hasWhatsapp = isChannelActive('whatsapp');
  const socialChannels = useMemo(() => getActiveSocialChannels(), []);
  const validationIssues = useMemo(() => validateContactConfig(), []);
  
  const { copied: copiedEmail, copy: copyEmail } = useClipboard({ timeout: 2500 });

  const handleCopyEmail = () => {
    if (safeEmail) {
      copyEmail(safeEmail);
    }
  };

  const whatsappUrl = sanitizeUrl(CONTACT_CONFIG.WHATSAPP_URL);
  const whatsappProps = getSecureLinkProps(whatsappUrl);

  const errorsCount = validationIssues.filter((i) => i.severity === 'error').length;

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
              Interested in collaboration, projects, internships, or developer opportunities? Reach out directly via message, email, or social media.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            
            {/* Primary Action Buttons: Direct Email & Direct WhatsApp */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
              {safeEmail && (
                <a
                  href={`mailto:${safeEmail}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                  <Send className="w-3.5 h-3.5 opacity-80" />
                </a>
              )}

              {hasWhatsapp && (
                <a
                  {...whatsappProps}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 font-semibold text-sm transition-all shadow-lg shadow-black/40 hover:border-emerald-400 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label="Direct WhatsApp Chat"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              {safeEmail && (
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                      <span>{safeEmail}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Social & Professional Profile Badges with Real Icons (Deduplicated via Registry) */}
            {socialChannels.length > 0 && (
              <div className="w-full pt-4">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Social &amp; Developer Profiles
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {socialChannels.map((channel) => {
                    const IconComponent = channel.icon;
                    const linkProps = getSecureLinkProps(channel.url);

                    return (
                      <a
                        key={channel.id}
                        {...linkProps}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border ${channel.badgeBgClass} ${channel.hoverBorderClass} text-slate-200 ${channel.hoverTextClass} text-xs font-medium transition-all group shadow-sm`}
                        aria-label={channel.ariaLabel}
                      >
                        <IconComponent className={`w-4 h-4 ${channel.brandColorClass} group-hover:scale-110 transition-transform`} />
                        <span>{channel.label}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 group-hover:opacity-100 transition-opacity" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Developer Validation Feedback (Displays helpful warnings if invalid URLs exist) */}
            {errorsCount > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left max-w-lg mx-auto flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-1">Configuration Validation Notice:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-200/90">
                    {validationIssues
                      .filter((i) => i.severity === 'error')
                      .map((issue, idx) => (
                        <li key={idx}>{issue.message}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Clear Configuration Notice for the Developer */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-lg mx-auto text-left text-xs text-slate-500 space-y-1 font-mono">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Developer Note: Profile Links Configuration</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                To customize your Instagram, WhatsApp, Twitter, GitHub, LinkedIn, or Resume URLs, simply update{' '}
                <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">
                  src/data/portfolioData.ts
                </code>
                . All links are automatically validated for security, and empty fields remain hidden.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
