"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Star } from "lucide-react";
import { WritingNote } from "@/lib/writing";

interface WritingIndexListProps {
  notes: WritingNote[];
}

export function WritingIndexList({ notes }: WritingIndexListProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");

  // Extract unique categories
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => set.add(n.category.toUpperCase()));
    return ["ALL", ...Array.from(set)];
  }, [notes]);

  const filteredNotes = React.useMemo(() => {
    if (selectedCategory === "ALL") return notes;
    return notes.filter((n) => n.category.toUpperCase() === selectedCategory);
  }, [notes, selectedCategory]);

  const featuredNote = notes.find((n) => n.featured);

  return (
    <div className="space-y-14">
      {/* 1. Featured Note (Large Editorial Treatment) */}
      {featuredNote && selectedCategory === "ALL" && (
        <article className="relative group p-6 sm:p-8 lg:p-10 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] hover:border-black/[0.18] dark:hover:border-white/[0.18] transition-all duration-200">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-500/20 bg-amber-500/[0.05] text-amber-600 dark:text-amber-400 font-semibold uppercase text-[10px] tracking-widest">
                <Star className="w-3 h-3 fill-amber-500/30" aria-hidden="true" />
                Featured Note
              </span>
              <span aria-hidden="true">&middot;</span>
              <span className="uppercase tracking-wider text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                {featuredNote.category}
              </span>
              <span aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3 text-zinc-400" aria-hidden="true" />
                {featuredNote.readingTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-snug">
              <Link
                href={`/writing/${featuredNote.slug}`}
                className="focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
              >
                {featuredNote.title}
              </Link>
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-normal">
              {featuredNote.description}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {featuredNote.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/writing/${featuredNote.slug}`}
                aria-label={`Read note: ${featuredNote.title}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-all focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded py-0.5"
              >
                <span>Read Note</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      )}

      {/* 2. Category Filter Pills */}
      <div
        role="toolbar"
        aria-label="Filter notes by category"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-2 shrink-0">
          Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`font-mono text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
              selectedCategory === cat
                ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-medium"
                : "border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Editorial List of Notes */}
      <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {filteredNotes.map((note, idx) => (
          <article
            key={note.slug}
            className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 sm:gap-8 transition-colors duration-200"
          >
            {/* Number & Category Column */}
            <div className="flex items-baseline gap-4 md:w-3/12 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1">
              <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                0{idx + 1}
              </span>
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest font-semibold text-zinc-700 dark:text-zinc-300 block">
                  {note.category}
                </span>
                <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 block">
                  {note.readingTime} <span aria-hidden="true">&middot;</span> {note.date}
                </span>
              </div>
            </div>

            {/* Title & Description Column */}
            <div className="md:w-8/12 space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                <Link
                  href={`/writing/${note.slug}`}
                  className="focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded inline-flex items-center gap-2"
                >
                  <span>{note.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" aria-hidden="true" />
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {note.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {note.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded border border-black/[0.05] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] text-zinc-500 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
