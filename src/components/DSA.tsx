import React, { useState } from 'react';
import { 
  Binary, 
  ExternalLink, 
  Code, 
  Layers, 
  GitBranch, 
  Workflow, 
  Terminal, 
  CheckCircle2, 
  Sparkles,
  Search
} from 'lucide-react';
import { 
  DSA_TOPICS, 
  PRACTICED_PROBLEMS, 
  CONTACT_CONFIG,
  PracticedProblem 
} from '../data/portfolioData';

export const DSA: React.FC = () => {
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filteredProblems = PRACTICED_PROBLEMS.filter((problem) => {
    const matchesDiff = filterDifficulty === 'All' || problem.difficulty === filterDifficulty;
    const matchesTopic = !activeTopic || problem.topic.toLowerCase().includes(activeTopic.toLowerCase());
    return matchesDiff && matchesTopic;
  });

  const getTopicIcon = (name: string) => {
    switch (name) {
      case 'Arrays':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'Binary Search':
        return <Search className="w-4 h-4 text-emerald-400" />;
      case 'Sliding Window':
        return <Workflow className="w-4 h-4 text-emerald-400" />;
      case 'Linked List':
        return <GitBranch className="w-4 h-4 text-emerald-400" />;
      case 'Trees':
        return <Binary className="w-4 h-4 text-emerald-400" />;
      case 'Backtracking':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      default:
        return <Code className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getDifficultyColor = (difficulty: PracticedProblem['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const hasLeetcode = Boolean(CONTACT_CONFIG.LEETCODE_URL && CONTACT_CONFIG.LEETCODE_URL.trim() !== '');

  return (
    <section id="dsa" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Binary className="w-3.5 h-3.5" />
              <span>Algorithmic Rigor</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Problem Solving
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Strengthening problem-solving skills through Data Structures &amp; Algorithms and regular coding practice. Focusing on optimal algorithmic paradigms, time-space complexity, and clean code implementation.
            </p>
          </div>

          {/* View LeetCode Button */}
          <div className="shrink-0">
            {hasLeetcode ? (
              <a
                href={CONTACT_CONFIG.LEETCODE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Terminal className="w-4 h-4" />
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 text-xs font-mono">
                <span>LeetCode URL: Editable in portfolioData.ts</span>
              </div>
            )}
          </div>
        </div>

        {/* 1. Core DSA Topic Cards (No fake numbers) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Core Problem-Solving Topics</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Patterns &amp; Optimizations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DSA_TOPICS.map((topic) => (
              <div
                key={topic.name}
                onClick={() => setActiveTopic(activeTopic === topic.name ? null : topic.name)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  activeTopic === topic.name
                    ? 'border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-950/20'
                    : 'border-slate-800/80 bg-[#0f1523]/70 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-slate-800/90 border border-slate-700/60 flex items-center justify-center">
                      {getTopicIcon(topic.name)}
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {topic.name}
                    </h4>
                  </div>
                  {activeTopic === topic.name && (
                    <span className="text-[10px] font-mono text-emerald-400">
                      Filtering
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {topic.description}
                </p>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Focus:</span>
                  <span className="text-slate-300">{topic.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Recently Practiced Problems List */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1523]/90 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recently Practiced Problems</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Representative problems tackled to sharpen algorithmic patterns and edge-case handling.
              </p>
            </div>

            {/* Difficulty Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setFilterDifficulty(diff)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    filterDifficulty === diff
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {activeTopic && (
            <div className="mb-4 flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
              <span>Filtered by topic: <strong>{activeTopic}</strong></span>
              <button
                type="button"
                onClick={() => setActiveTopic(null)}
                className="text-xs text-emerald-400 hover:underline font-mono"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Problem List Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredProblems.map((problem) => (
              <div
                key={problem.name}
                className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {problem.name}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      {problem.topic}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
