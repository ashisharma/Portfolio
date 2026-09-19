import React from 'react';
import { 
  ArrowDown, 
  Github, 
  Linkedin, 
  Code2, 
  Terminal, 
  Sparkles, 
  Check, 
  Copy
} from 'lucide-react';
import { CONTACT_CONFIG, DEVELOPER_INFO } from '../data/portfolioData';
import { useClipboard } from '../hooks/useClipboard';
import { getSecureLinkProps, isSafeUrl } from '../utils/security';

export const Hero: React.FC = () => {
  const { copied, copy } = useClipboard({ timeout: 2000 });

  const sparsCode = `// SPARS: Student Performance Assessment System
public class SkillAssessmentService {
    private final GeminiSkillAnalyzer analyzer;
    private final AssessmentRepository repository;

    public SkillReport evaluateStudent(String studentId, List<TestScore> scores) {
        // Map scores to curriculum competencies
        Map<SkillDomain, Double> proficiency = calculateProficiency(scores);
        List<SkillGap> gaps = identifyDeficiencies(proficiency);
        
        // Generate personalized recommendations
        return new SkillReport(studentId, proficiency, gaps);
    }
}`;

  const currentCode = sparsCode;

  const handleCopyCode = () => {
    copy(currentCode);
  };

  const hasGithub = isSafeUrl(CONTACT_CONFIG.GITHUB_URL);
  const hasLinkedIn = isSafeUrl(CONTACT_CONFIG.LINKEDIN_URL);

  const githubProps = hasGithub ? getSecureLinkProps(CONTACT_CONFIG.GITHUB_URL) : null;
  const linkedinProps = hasLinkedIn ? getSecureLinkProps(CONTACT_CONFIG.LINKEDIN_URL) : null;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 lg:py-32 overflow-hidden"
    >
      {/* Subtle background ambient grid and radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Line */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{DEVELOPER_INFO.statusLine}</span>
            </div>

            {/* Main Greeting & Heading */}
            <div className="space-y-2">
              <p className="text-slate-400 font-mono text-sm tracking-wide">
                Hi, I'm {DEVELOPER_INFO.name}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {DEVELOPER_INFO.headline}
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              {DEVELOPER_INFO.heroText}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Action: View Projects */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-950/40 hover:shadow-emerald-500/20 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {/* Primary Action: GitHub */}
              {githubProps && (
                <a
                  {...githubProps}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>GitHub</span>
                </a>
              )}

              {/* Secondary Action: LinkedIn (only shown if configured) */}
              {linkedinProps && (
                <a
                  {...linkedinProps}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-700/80 hover:border-blue-500/40 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-blue-300 font-medium text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            {/* Quick Skills summary pills */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-slate-500">Core Focus:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono">
                Java
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono">
                Spring Boot &amp; APIs
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono">
                React &amp; Web
              </span>
            </div>
          </div>

          {/* Right Column: Subtle Developer-Themed Visual Element */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-slate-800 bg-[#0f1523]/90 shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-sm">
              
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/70">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ashish-workspace</span>
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-emerald-300 px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
                  aria-label="Copy code to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Editor Tab */}
              <div className="flex items-center border-b border-slate-800/70 bg-slate-950/60 px-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b-2 border-emerald-400 text-emerald-300 bg-slate-900/60 font-medium">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SPARSAssessment.java</span>
                </div>
              </div>

              {/* Code Snippet Display with Syntax Highlighting */}
              <div className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
                <pre className="text-slate-300 selection:bg-emerald-500/30">
                  <code>
                    <span className="text-slate-500">// SPARS: Student Performance Assessment</span>{'\n'}
                    <span className="text-purple-400">public class</span>{' '}
                    <span className="text-emerald-300">SkillAssessmentService</span> &#123;{'\n'}
                    {'    '}<span className="text-purple-400">private final</span> GeminiAnalyzer analyzer;{'\n'}
                    {'    '}<span className="text-purple-400">private final</span> AssessmentRepo repo;{'\n\n'}
                    {'    '}<span className="text-purple-400">public</span> SkillReport{' '}
                    <span className="text-blue-400">evaluateStudent</span>(String id, List&lt;Score&gt; scores) &#123;{'\n'}
                    {'        '}<span className="text-slate-500">// Map scores to curricular competencies</span>{'\n'}
                    {'        '}Map&lt;Skill, Double&gt; matrix = <span className="text-blue-400">calcProficiency</span>(scores);{'\n'}
                    {'        '}List&lt;Gap&gt; gaps = <span className="text-blue-400">identifyGaps</span>(matrix);{'\n\n'}
                    {'        '}<span className="text-purple-400">return new</span>{' '}
                    <span className="text-emerald-300">SkillReport</span>(id, matrix, gaps);{'\n'}
                    {'    '}&#125;{'\n'}
                    &#125;
                  </code>
                </pre>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Java 21 / OpenJDK</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Sparkles className="w-3 h-3 text-emerald-400/80" />
                  <span>Clean Architecture</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
