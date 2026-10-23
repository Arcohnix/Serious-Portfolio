"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ResilientOrderVisual } from "./ResilientOrderVisual";
import { AgenticSocVisual } from "./AgenticSocVisual";
import { AiKnowledgeVisual } from "./AiKnowledgeVisual";
import { UptimeMonitoringVisual } from "./UptimeMonitoringVisual";
import type { Project } from "@/lib/projects";

interface FeaturedProjectProps {
  project: Project;
  index: number;
  reversed?: boolean;
}

export function FeaturedProject({
  project,
  index,
  reversed = false,
}: FeaturedProjectProps) {
  const shouldReduceMotion = useReducedMotion();

  // Render project-specific interactive architectural visualization
  const renderVisual = () => {
    switch (project.slug) {
      case "resilient-order-processing":
        return <ResilientOrderVisual />;
      case "agentic-soc":
        return <AgenticSocVisual />;
      case "ai-knowledge-system":
        return <AiKnowledgeVisual />;
      case "uptime-monitoring-system":
        return <UptimeMonitoringVisual />;
      default:
        return null;
    }
  };

  const numberString = `0${index + 1}`;
  const targetHref = project.href || `/projects/${project.slug}`;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] p-6 sm:p-8 lg:p-10 transition-all duration-200 hover:border-black/[0.16] dark:hover:border-white/[0.16] hover:bg-black/[0.025] dark:hover:bg-white/[0.03]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Project Info Block */}
        <div
          className={`lg:col-span-5 space-y-5 flex flex-col justify-between ${
            reversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* Header Metadata: Number & Category */}
          <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              {numberString}
            </span>
            <span
              className="text-zinc-300 dark:text-zinc-700"
              aria-hidden="true"
            >
              &middot;
            </span>
            <span className="uppercase tracking-widest text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-snug">
            <Link
              href={targetHref}
              className="focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
            >
              {project.title}
            </Link>
          </h3>

          {/* Concise Description: What it is + Why it matters */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {project.summary}
          </p>

          {/* Technology Badges (Understated, max 4-5) */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* View Case Study CTA */}
          <div className="pt-2">
            <Link
              href={targetHref}
              aria-label={`View case study: ${project.title}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-zinc-950 dark:hover:text-white group/cta focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded py-1"
            >
              <span>View Case Study</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Visual Blueprint Area */}
        <div
          className={`lg:col-span-7 w-full ${
            reversed ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Link
            href={targetHref}
            tabIndex={-1}
            aria-hidden="true"
            className="block cursor-pointer focus:outline-none"
          >
            {renderVisual()}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
