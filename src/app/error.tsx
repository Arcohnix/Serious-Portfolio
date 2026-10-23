"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Container } from "@/components/layout/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log unexpected errors for local observability
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <main id="main-content" className="flex-1 flex flex-col justify-center py-24 sm:py-32">
      <Container size="narrow" className="text-center space-y-8">
        {/* Status Eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/[0.05] text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="uppercase tracking-widest font-semibold">500 &middot; Application Fault</span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Something went wrong.
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            An unexpected error occurred while rendering this view. State reconciliation or a transient network fault prevented completion.
          </p>
        </div>

        {/* Error Digest (if available) */}
        {error.digest && (
          <div className="inline-block p-2 rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            Digest: {error.digest}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-black/[0.2] dark:hover:border-white/[0.2] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
