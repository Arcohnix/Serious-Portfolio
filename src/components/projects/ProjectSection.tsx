import * as React from "react";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}

export function ProjectSection({
  id,
  title,
  eyebrow,
  className,
  children,
}: ProjectSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-24 pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-black/[0.06] dark:border-white/[0.06]",
        className
      )}
    >
      <div className="space-y-1.5 mb-6 sm:mb-8">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
            {eyebrow}
          </p>
        )}
        <h2 id={headingId} className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
