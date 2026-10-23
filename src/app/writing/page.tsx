import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getAllNotes } from "@/lib/writing";
import { WritingIndexList } from "@/components/writing/WritingIndexList";

import { siteConfig } from "@/lib/siteConfig";

export const instant = false;

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes from building systems, experimenting with AI, learning infrastructure, and understanding what happens underneath the abstractions.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing — Sanket Desai",
    description:
      "Notes from building systems, experimenting with AI, learning infrastructure, and understanding what happens underneath the abstractions.",
    url: `${siteConfig.url}/writing`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Sanket Desai",
    description:
      "Notes from building systems, experimenting with AI, learning infrastructure, and understanding what happens underneath the abstractions.",
  },
};

export default async function WritingIndexPage() {
  const notes = await getAllNotes();

  return (
    <main id="main-content" className="flex-1 py-12 sm:py-20">
      <Container size="default" className="space-y-12 sm:space-y-16">
        {/* Back Link to Homepage */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors py-1 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" aria-hidden="true" />
            <span className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
              Engineering Notes
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08] text-balance">
            Things I&apos;m figuring out.
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Notes from building systems, experimenting with AI, learning infrastructure,
            and understanding what happens underneath the abstractions.
          </p>
        </div>

        {/* Editorial Notes List with Filters */}
        <WritingIndexList notes={notes} />
      </Container>
    </main>
  );
}
