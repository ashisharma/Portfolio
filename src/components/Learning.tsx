import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Binary, 
  Code, 
  Server, 
  Rocket 
} from 'lucide-react';
import { CURRENTLY_EXPLORING } from '../data/portfolioData';

export const Learning: React.FC = () => {
  const getItemIcon = (title: string) => {
    switch (title) {
      case 'Advanced Java':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'Data Structures & Algorithms':
        return <Binary className="w-4 h-4 text-emerald-400" />;
      case 'React':
        return <Code className="w-4 h-4 text-emerald-400" />;
      case 'AI Integration':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'Backend Development':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Building SPARS':
        return <Rocket className="w-4 h-4 text-emerald-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="learning" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Continuous Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Currently Exploring
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Active learning horizons and architectural paradigms I am diving into to expand engineering breadth and system depth.
          </p>
        </div>

        {/* Compact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRENTLY_EXPLORING.map((item) => (
            <div
              key={item.title}
              className="p-4 sm:p-5 rounded-xl border border-slate-800/80 bg-[#0f1523]/70 hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-emerald-500/40 transition-transform">
                {getItemIcon(item.title)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
