import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle, 
  AlertCircle, 
  Cpu, 
  Code2, 
  Sparkles 
} from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const placeholderProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real software architectures addressing concrete academic and developer challenges. Structured with clearly documented problem statements, engineering solutions, and modern tech stacks.
          </p>
        </div>

        {/* 1. Primary Featured Project: SPARS */}
        <div className="mb-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0f172a]/90 via-[#0b0f17] to-[#0f172a]/90 p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden group">
          {/* Subtle accent corner glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Title, Subtitle, Problem & Solution */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Badge & Title */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Primary Featured Project</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {featuredProject.title}
                </h3>
                <p className="text-sm sm:text-base text-emerald-400/90 font-medium mt-1">
                  {featuredProject.fullName}
                </p>
              </div>

              {/* Core Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {featuredProject.description}
              </p>

              {/* Problem Statement Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredProject.problem}
                </p>
              </div>

              {/* Engineering Solution Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredProject.solution}
                </p>
              </div>

              {/* Technology Stack & Action Buttons */}
              <div className="space-y-4 pt-2">
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2">
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-800/90 text-emerald-300 border border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {featuredProject.projectUrl ? (
                    <a
                      href={featuredProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all shadow-md active:translate-y-0.5"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(featuredProject)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all shadow-md active:translate-y-0.5"
                    >
                      <span>View Project Details</span>
                      <Code2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {featuredProject.githubUrl ? (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium transition-all"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-400" />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-800 text-slate-500 text-xs font-mono">
                      <span>Repo: Configurable</span>
                    </span>
                  )}
                </div>

              </div>

            </div>

            {/* Right Column: Architectural Flow Diagram / System Specs */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800/80 bg-slate-950/70 p-5 font-mono text-xs text-slate-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  SPARS Flow
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  v1.0-alpha
                </span>
              </div>

              {/* Visual pipeline steps */}
              <div className="space-y-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/70">
                  <span className="text-emerald-400 text-[11px] block mb-1">01. Assessment Intake</span>
                  <p className="text-slate-300 text-[11px]">
                    Multi-tier student performance metrics &amp; test logs.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/70">
                  <span className="text-emerald-400 text-[11px] block mb-1">02. Java Core Analytics</span>
                  <p className="text-slate-300 text-[11px]">
                    Evaluates syllabus benchmark proficiencies &amp; gap boundaries.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/70">
                  <span className="text-emerald-400 text-[11px] block mb-1">03. Firebase &amp; Gemini API</span>
                  <p className="text-slate-300 text-[11px]">
                    Real-time state sync with contextual AI-driven improvement roadmap.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800 flex items-center justify-between">
                <span>Architecture</span>
                <span className="text-slate-400">Full Stack System</span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Additional Project Cards (Clearly Marked Editable Placeholders) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Additional Projects</span>
            </h4>
            <span className="text-xs font-mono text-slate-500">
              Ready-to-edit slots in portfolioData.ts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {placeholderProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 p-6 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Placeholder Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400/90 border border-amber-500/20">
                      Editable Slot
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {project.technology}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5 mb-3">
                    {project.fullName}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Problem & Solution summary */}
                  <div className="space-y-2 mb-4 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="font-mono text-slate-400 block font-semibold mb-0.5">Problem:</span>
                      <span className="text-slate-400 line-clamp-2">{project.problem}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="font-mono text-slate-400 block font-semibold mb-0.5">Solution:</span>
                      <span className="text-slate-400 line-clamp-2">{project.solution}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {project.projectUrl ? (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-500 font-mono text-[11px]">
                        Link: Configurable
                      </span>
                    )}
                  </div>

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <span className="text-slate-500 font-mono text-[11px]">
                      GitHub: Configurable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0f1523] p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                  Project Deep Dive
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">
                  {selectedProject.fullName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>{selectedProject.description}</p>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-emerald-400 block mb-1 font-mono text-xs">
                  Architecture &amp; Tech Stack
                </span>
                <p className="text-xs text-slate-300">{selectedProject.technology}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-rose-400 block mb-1 font-mono text-xs">
                  The Problem Solved
                </span>
                <p className="text-xs text-slate-300">{selectedProject.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-emerald-400 block mb-1 font-mono text-xs">
                  The Solution Engineered
                </span>
                <p className="text-xs text-slate-300">{selectedProject.solution}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
