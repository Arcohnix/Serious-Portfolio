import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { WritingNote } from "@/lib/writing";

interface NoteHeaderProps {
  note: WritingNote;
}

export function NoteHeader({ note }: NoteHeaderProps) {
  return (
    <header className="space-y-6 pt-4 pb-10 sm:pb-12 border-b border-black/[0.08] dark:border-white/[0.08]">
      {/* 1. Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/writing"
          className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors py-1 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
          aria-label="Back to Engineering Notes index"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          <span>Engineering Notes</span>
        </Link>

        {/* Technical Category & Reading Time */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <span className="uppercase tracking-widest px-2 py-0.5 rounded border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 font-semibold">
            {note.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-400" aria-hidden="true" />
            <span>{note.readingTime}</span>
          </span>
          <span aria-hidden="true">&middot;</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-zinc-400" aria-hidden="true" />
            <span>{note.date}</span>
          </span>
        </div>
      </div>

      {/* 2. Article Title */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08] text-balance">
          {note.title}
        </h1>

        {/* Short Abstract / Description */}
        {note.description && (
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-normal">
            {note.description}
          </p>
        )}
      </div>

      {/* 3. Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2" aria-label="Tags">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-0.5 rounded-md border border-black/[0.06] dark:border-white/[0.07] bg-black/[0.015] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
