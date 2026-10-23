import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Layers } from "lucide-react";
import { WritingNote } from "@/lib/writing";

interface NoteFooterProps {
  note: WritingNote;
  prev: WritingNote | null;
  next: WritingNote | null;
}

export function NoteFooter({ note, prev, next }: NoteFooterProps) {
  return (
    <footer className="mt-16 pt-10 border-t border-black/[0.08] dark:border-white/[0.08] space-y-10">
      {/* 1. Related Project Callout (if configured) */}
      {note.relatedProject && (
        <aside
          aria-label="Related Engineering Project"
          className="p-5 sm:p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] space-y-3"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Layers className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
            <span>Related System Case Study</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-semibold text-zinc-950 dark:text-zinc-100">
                {note.relatedProject.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
                Explore the complete production implementation, architecture diagrams, and failure mode mitigations.
              </p>
            </div>
            <Link
              href={`/projects/${note.relatedProject.slug}`}
              aria-label={`View case study: ${note.relatedProject.title}`}
              className="inline-flex items-center gap-2 shrink-0 font-mono text-xs px-3.5 py-1.5 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.03] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-black/[0.2] dark:hover:border-white/[0.2] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      )}

      {/* 2. Previous & Next Note Navigation */}
      <nav
        aria-label="Article navigation"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {prev ? (
          <Link
            href={`/writing/${prev.slug}`}
            aria-label={`Previous note: ${prev.title}`}
            className="group relative flex flex-col justify-between p-5 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.015] dark:bg-[#0A0A0E]/70 backdrop-blur-md hover:border-black/[0.18] dark:hover:border-white/[0.18] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              <span>PREVIOUS NOTE</span>
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
            href="/writing"
            className="group flex flex-col justify-between p-5 rounded-xl border border-dashed border-black/[0.07] dark:border-white/[0.07] bg-black/[0.01] dark:bg-white/[0.01] hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>ENGINEERING NOTES</span>
            </div>
            <div className="mt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                INDEX
              </span>
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                Back to All Notes
              </h4>
            </div>
          </Link>
        )}

        {next ? (
          <Link
            href={`/writing/${next.slug}`}
            aria-label={`Next note: ${next.title}`}
            className="group relative flex flex-col justify-between p-5 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.015] dark:bg-[#0A0A0E]/70 backdrop-blur-md hover:border-black/[0.18] dark:hover:border-white/[0.18] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-200 text-left sm:text-right focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <span>NEXT NOTE</span>
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
            href="/writing"
            className="group flex flex-col justify-between p-5 rounded-xl border border-dashed border-black/[0.07] dark:border-white/[0.07] bg-black/[0.01] dark:bg-white/[0.01] hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all duration-200 text-left sm:text-right focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
              <span>ENGINEERING NOTES</span>
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div className="mt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                INDEX
              </span>
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                Back to All Notes
              </h4>
            </div>
          </Link>
        )}
      </nav>
    </footer>
  );
}
