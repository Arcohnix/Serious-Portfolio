"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const numberString = `0${index + 1}`;
  const targetHref = project.href || `/projects/${project.slug}`;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.015] dark:bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:bg-black/[0.025] dark:hover:bg-white/[0.03]"
    >
      <div className="space-y-4">
        {/* Header Metadata: Number, Category & External indicator */}
        <div className="flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              {numberString}
            </span>
            <span
              className="text-zinc-300 dark:text-zinc-700"
              aria-hidden="true"
            >
              &middot;
            </span>
            <span className="uppercase tracking-widest text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              {project.category}
            </span>
          </div>

          <ArrowUpRight
            className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors shrink-0"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-snug">
          <Link
            href={targetHref}
            className="focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
          >
            {project.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          {project.summary}
        </p>
      </div>

      {/* Footer: Tech tags + CTA */}
      <div className="pt-6 mt-6 border-t border-black/[0.05] dark:border-white/[0.05] space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded border border-black/[0.05] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={targetHref}
          aria-label={`View case study: ${project.title}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-zinc-950 dark:hover:text-white group/cta focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded py-0.5"
        >
          <span>View Case Study</span>
          <ArrowRight
            className="w-3 h-3 transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.article>
  );
}
