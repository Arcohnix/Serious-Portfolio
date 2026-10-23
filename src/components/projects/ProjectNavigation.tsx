import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";
import { ProjectCaseStudy } from "@/lib/projects";

interface ProjectNavigationProps {
  prev: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
}

export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Case study navigation"
      className="mt-16 pt-10 border-t border-black/[0.08] dark:border-white/[0.08]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Project Card */}
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            aria-label={`Previous case study: ${prev.title}`}
            className="group relative flex flex-col justify-between p-5 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.015] dark:bg-[#0A0A0E]/70 backdrop-blur-md hover:border-black/[0.18] dark:hover:border-white/[0.18] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              <span>PREVIOUS CASE STUDY</span>
            </div>
            <div className="mt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                {prev.category}
              </span>
              <h4 className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors line-clamp-1">
                {prev.title}
              </h4>
            </div>
          </Link>
        ) : (
          <Link
            href="/#work"
            className="group flex flex-col justify-between p-5 rounded-xl border border-dashed border-black/[0.07] dark:border-white/[0.07] bg-black/[0.01] dark:bg-white/[0.01] hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <Grid className="w-3.5 h-3.5" aria-hidden="true" />
              <span>SELECTED WORK</span>
            </div>
            <div className="mt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                INDEX
              </span>
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                Back to All Projects
              </h4>
            </div>
          </Link>
        )}

        {/* Next Project Card */}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            aria-label={`Next case study: ${next.title}`}
            className="group relative flex flex-col justify-between p-5 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.015] dark:bg-[#0A0A0E]/70 backdrop-blur-md hover:border-black/[0.18] dark:hover:border-white/[0.18] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-200 text-left sm:text-right focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <span>NEXT CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
            <div className="mt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                {next.category}
              </span>
              <h4 className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors line-clamp-1">
                {next.title}
              </h4>
            </div>
          </Link>
        ) : (
          <Link
            href="/#work"
            className="group flex flex-col justify-between p-5 rounded-xl border border-dashed border-black/[0.07] dark:border-white/[0.07] bg-black/[0.01] dark:bg-white/[0.01] hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all duration-200 text-left sm:text-right focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <span>SELECTED WORK</span>
              <Grid className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div className="mt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                INDEX
              </span>
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                Back to All Projects
              </h4>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
