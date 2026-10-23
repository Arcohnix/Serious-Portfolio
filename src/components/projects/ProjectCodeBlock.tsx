"use client";

import * as React from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { ProjectCodeSnippet } from "@/lib/projects";

interface ProjectCodeBlockProps {
  snippet: ProjectCodeSnippet;
  highlightedHtml?: string;
}

export function ProjectCodeBlock({ snippet, highlightedHtml }: ProjectCodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-[#0d0d11] overflow-hidden text-zinc-100 font-mono text-xs sm:text-[13px] shadow-xl shadow-black/20">
      {/* Top Bar: Title, Language & Copy Button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
          <span className="font-semibold text-zinc-200 truncate max-w-[220px] sm:max-w-md">
            {snippet.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="uppercase text-[10px] tracking-widest px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.04] text-zinc-400">
            {snippet.language}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none touch-manipulation before:absolute before:-inset-1 before:content-['']"
            aria-label={copied ? "Code copied to clipboard" : `Copy code from ${snippet.title}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 sm:p-5 overflow-x-auto font-mono leading-relaxed selection:bg-zinc-700">
        {highlightedHtml ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            className="[&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 [&_code]:!font-mono [&_code]:!text-xs sm:[&_code]:!text-[13px]"
          />
        ) : (
          <pre className="whitespace-pre">
            <code>{snippet.code}</code>
          </pre>
        )}
      </div>

      {/* Optional Architectural Caption */}
      {snippet.caption && (
        <div className="px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[11px] text-zinc-400 font-sans">
          <span aria-hidden="true">&bull;</span> {snippet.caption}
        </div>
      )}
    </div>
  );
}
