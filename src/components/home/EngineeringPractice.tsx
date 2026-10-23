"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import {
  engineeringThemes,
  systemLifecycleStages,
} from "@/data/engineeringPractice";

export function EngineeringPractice() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="engineering"
      aria-label="Engineering in Practice"
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 relative border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <Container size="default">
        {/* 1. Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Statement & Lifecycle Metaphor */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-8"
          >
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" aria-hidden="true" />
              <h2 className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
                Engineering in Practice
              </h2>
            </div>

            {/* Large Editorial Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12] text-balance">
              I care about what happens after &ldquo;it works.&rdquo;
            </h3>

            {/* Concise Engineering Premise */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Building a service that functions on a happy path is straightforward. The real
              engineering begins when networks partition, external dependencies time out, and
              systems must recover predictably without human intervention.
            </p>

            {/* System Lifecycle Metaphor Panel: BUILD → OBSERVE → FAIL → RECOVER → IMPROVE */}
            <div className="p-4 sm:p-6 rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] space-y-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                <Activity className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                <span>System Lifecycle Metaphor</span>
              </div>

              {/* Step Sequence Flow */}
              <div className="space-y-2.5 pt-1 font-mono text-xs">
                {systemLifecycleStages.map((stage) => (
                  <div
                    key={stage.step}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-3 text-zinc-700 dark:text-zinc-300"
                  >
                    <div className="flex items-baseline gap-2 shrink-0">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">
                        {stage.step}
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {stage.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-sans text-zinc-500 dark:text-zinc-400 sm:text-right leading-tight">
                      {stage.description}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight pt-2 border-t border-black/[0.05] dark:border-white/[0.05]">
                <span aria-hidden="true">&bull;</span> Continuous reconciliation: observing internal state, withstanding faults, and hardening resilience.
              </p>
            </div>
          </motion.div>

          {/* Right Column: 4 Engineering Themes Vertical Sequence */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-12">
            {engineeringThemes.map((theme, themeIdx) => (
              <motion.article
                key={theme.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  delay: shouldReduceMotion ? 0 : themeIdx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.06] last:border-b-0 space-y-4 transition-colors duration-200"
              >
                {/* Theme Number & Title */}
                <div className="flex items-center gap-3 transition-transform duration-200 ease-out group-hover:translate-x-1">
                  <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                    {theme.number}
                  </span>
                  <h4 className="font-mono text-xs sm:text-[13px] uppercase tracking-widest font-semibold text-zinc-950 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {theme.title}
                  </h4>
                </div>

                {/* Core Architectural Tagline */}
                <p className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
                  &ldquo;{theme.tagline}&rdquo;
                </p>

                {/* Body Explanation */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {theme.description}
                </p>

                {/* Architectural Concepts */}
                <div className="pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {theme.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Case Studies */}
                {theme.projects.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Applied in:
                    </span>
                    {theme.projects.map((proj) => (
                      <Link
                        key={proj.slug}
                        href={`/projects/${proj.slug}`}
                        aria-label={`View case study: ${proj.title}`}
                        className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:border-black/[0.2] dark:hover:border-white/[0.2] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      >
                        <span>{proj.title}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover/link:text-zinc-950 dark:group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
