import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectCaseStudy } from "@/lib/projects";
import { GithubIcon } from "@/components/icons";

interface ProjectHeaderProps {
  project: ProjectCaseStudy;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="space-y-6 pt-4 pb-10 sm:pb-12 border-b border-black/[0.08] dark:border-white/[0.08]">
      {/* 1. Breadcrumb / Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors py-1 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
          aria-label="Back to Selected Work on homepage"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          <span>Selected Work</span>
        </Link>

        {/* Technical Category & Year Badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <span className="uppercase tracking-wider">
            {project.breadcrumbCategory || `PROJECT / ${project.category}`}
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* 2. Large Project Title */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08] text-balance">
          {project.title}
        </h1>

        {/* Short Concise Description */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-normal">
          {project.description || project.shortDescription}
        </p>
      </div>

      {/* 3. Technology Badges & Action Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* External Actions (GitHub & Live Demo) */}
        <div className="flex items-center gap-2.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
              className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-black/[0.2] dark:hover:border-white/[0.2] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`View live demo for ${project.title} (opens in new tab)`}
              className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-black/[0.2] dark:hover:border-white/[0.2] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Live Demo</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
