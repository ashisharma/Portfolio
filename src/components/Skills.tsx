import React from 'react';
import { 
  Code, 
  Layers, 
  Database, 
  Wrench, 
  Binary, 
  CheckCircle2 
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'Web Development':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Tools':
        return <Wrench className="w-5 h-5 text-emerald-400" />;
      case 'Core Concepts':
        return <Binary className="w-5 h-5 text-emerald-400" />;
      default:
        return <Code className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Skills &amp; Technologies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Categorized technical stack spanning programming languages, modern web technologies, databases, developer tools, and foundational computer science concepts.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.category}
              className={`rounded-xl border border-slate-800/80 bg-[#0f1523]/80 p-6 hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between ${
                category.category === 'Core Concepts' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    {getCategoryIcon(category.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {category.category}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill Badges (No fake percentages) */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/70 hover:border-emerald-500/40 hover:bg-slate-800/80 transition-colors group"
                    >
                      <span className="text-xs font-medium text-slate-200 group-hover:text-emerald-300">
                        {skill.name}
                      </span>
                      {skill.tag && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtle footer indicator */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{category.skills.length} competencies</span>
                <span className="text-emerald-400/80">Active</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
