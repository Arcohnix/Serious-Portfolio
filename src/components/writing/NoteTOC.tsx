"use client";

import * as React from "react";
import { NoteHeading } from "@/lib/writing";

interface NoteTOCProps {
  headings: NoteHeading[];
}

export function NoteTOC({ headings }: NoteTOCProps) {
  const [activeId, setActiveId] = React.useState<string>(headings[0]?.id || "");

  // IntersectionObserver tracking active heading
  React.useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;

    const visibleMap = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry);
          } else {
            visibleMap.delete(entry.target.id);
          }
        });

        const visibleEntries = Array.from(visibleMap.values());
        if (visibleEntries.length === 0) return;

        let dominant = visibleEntries[0];
        for (let i = 1; i < visibleEntries.length; i++) {
          if (visibleEntries[i].intersectionRect.height > dominant.intersectionRect.height) {
            dominant = visibleEntries[i];
          }
        }

        setActiveId(dominant.target.id);
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: [0, 0.5, 1.0],
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* 1. Mobile Horizontal Jump Bar */}
      <nav
        aria-label="Table of Contents Quick Jump"
        className="block lg:hidden sticky top-16 z-30 w-full bg-[#fafafa]/85 dark:bg-[#050507]/80 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06] py-2.5 px-4 overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mr-1">
            Section:
          </span>
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => handleScrollTo(e, h.id)}
              aria-current={activeId === h.id ? "location" : undefined}
              className={`px-2.5 py-1 rounded-full text-xs font-mono transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                activeId === h.id
                  ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-medium"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-black/[0.03] dark:bg-white/[0.04]"
              }`}
            >
              {h.text}
            </a>
          ))}
        </div>
      </nav>

      {/* 2. Desktop Sticky Sidebar */}
      <nav
        aria-label="Table of Contents"
        className="hidden lg:block sticky top-24 self-start w-56 xl:w-64 space-y-3 font-mono text-xs"
      >
        <p className="uppercase tracking-widest text-[11px] text-zinc-400 dark:text-zinc-500 font-medium pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
          Table of Contents
        </p>

        <ul className="space-y-1">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleScrollTo(e, h.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`group flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                    isActive
                      ? "text-zinc-950 dark:text-zinc-50 bg-black/[0.04] dark:bg-white/[0.05] font-semibold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200"
                  }`}
                >
                  <span
                    className={`w-1 h-3.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-zinc-900 dark:bg-zinc-100"
                        : "bg-transparent group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700"
                    }`}
                  />
                  <span className="truncate">{h.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
