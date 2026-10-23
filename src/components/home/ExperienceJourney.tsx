"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { journeyMilestones } from "@/data/journey";

export function ExperienceJourney() {
  const shouldReduceMotion = useReducedMotion();

  const progressionSummary = [
    { label: "Education", detail: "Computer science theory & systems foundation" },
    { label: "Internship", detail: "Applied web modules & API workflows" },
    { label: "Project Builds", detail: "Distributed systems, AI agents & failure recovery" },
    { label: "Next Chapter", detail: "Software engineering roles building scalable systems" },
  ];

  return (
    <section
      id="experience"
      aria-label="Experience &amp; Journey"
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 relative border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <Container size="default">
        {/* 1. Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Context */}
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
                Experience / Journey
              </h2>
            </div>

            {/* Large Editorial Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12] text-balance">
              How I got here.
            </h3>

            {/* Editorial Premise */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              An engineering trajectory shaped by foundational theory, hands-on development, and
              deep independent project builds &mdash; progressively moving from basic web applications
              to architecting resilient, distributed, and intelligent systems.
            </p>

            {/* Minimal Progression Flow Panel */}
            <div className="p-5 sm:p-6 rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] space-y-3.5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                <Compass className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                <span>Trajectory Sequence</span>
              </div>

              <div className="space-y-2 pt-1 font-mono text-xs">
                {progressionSummary.map((item, idx) => (
                  <div key={item.label} className="relative">
                    <div className="flex items-start justify-between gap-3 text-zinc-700 dark:text-zinc-300">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100 shrink-0">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-sans text-zinc-500 dark:text-zinc-400 text-right">
                        {item.detail}
                      </span>
                    </div>
                    {idx < progressionSummary.length - 1 && (
                      <div className="pl-1 py-1 text-zinc-400 dark:text-zinc-600 flex items-center">
                        <ArrowDown className="w-3 h-3 text-zinc-400 dark:text-zinc-600 opacity-60" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight pt-2 border-t border-black/[0.05] dark:border-white/[0.05]">
                <span aria-hidden="true">&bull;</span> A steady progression toward increasingly complex software architecture.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial Timeline */}
          <div className="lg:col-span-7">
            <div className="relative border-l border-black/[0.08] dark:border-white/[0.08] ml-3.5 sm:ml-4 pl-6 sm:pl-8 space-y-12 sm:space-y-14">
              {journeyMilestones.map((milestone, idx) => {
                const isNow = milestone.number === "04";

                return (
                  <motion.article
                    key={milestone.number}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      delay: shouldReduceMotion ? 0 : idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative group ${
                      isNow
                        ? "p-4 sm:p-7 rounded-2xl border border-black/[0.1] dark:border-white/[0.12] bg-black/[0.02] dark:bg-white/[0.03] shadow-sm"
                        : "space-y-3"
                    }`}
                  >
                    {/* Node on vertical timeline */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full font-mono text-[10px] sm:text-xs font-semibold transition-colors ${
                        isNow
                          ? "border border-zinc-900 dark:border-white bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 ring-4 ring-emerald-500/10 dark:ring-emerald-400/15"
                          : "border border-black/[0.12] dark:border-white/[0.12] bg-[#fafafa] dark:bg-[#07070a] text-zinc-700 dark:text-zinc-300 group-hover:border-zinc-500 dark:group-hover:border-zinc-400"
                      }`}
                    >
                      {milestone.number}
                    </div>

                    <div className="space-y-2.5">
                      {/* Top Meta: Type & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-xs">
                        <span className="uppercase tracking-widest text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                          {milestone.type}
                        </span>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                          {milestone.period}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <div className="space-y-0.5">
                        <h4
                          className={`font-semibold tracking-tight leading-snug ${
                            isNow
                              ? "text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50"
                              : "text-lg sm:text-xl text-zinc-900 dark:text-zinc-100"
                          }`}
                        >
                          {milestone.title}
                        </h4>
                        <p className="font-mono text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400">
                          {milestone.organization}
                        </p>
                      </div>

                      {/* Highlight Statement for "NOW" */}
                      {milestone.highlightStatement && (
                        <div className="py-1">
                          <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-zinc-900 dark:text-zinc-100 border-l-2 border-emerald-500 pl-3 py-0.5">
                            {milestone.highlightStatement}
                          </p>
                        </div>
                      )}

                      {/* Body Description */}
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                        {milestone.description}
                      </p>

                      {/* Coursework / Skills Tags for Education & Internship */}
                      {milestone.tags && milestone.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {milestone.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Progression Steps for 03 Building */}
                      {milestone.progressionSteps && (
                        <div className="pt-2 space-y-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                            Progression Arc:
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                            {milestone.progressionSteps.map((step, sIdx) => (
                              <React.Fragment key={step}>
                                <span className="px-2 py-0.5 rounded bg-black/[0.03] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 border border-black/[0.05] dark:border-white/[0.06]">
                                  {step}
                                </span>
                                {sIdx < milestone.progressionSteps!.length - 1 && (
                                  <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">&rarr;</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Connected Projects for 03 Building */}
                      {milestone.projects && (
                        <div className="pt-3 space-y-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                            Key Systems Built:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {milestone.projects.map((proj) => (
                              <Link
                                key={proj.slug}
                                href={`/projects/${proj.slug}`}
                                aria-label={`View case study: ${proj.title}`}
                                className="group/proj inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-black/[0.2] dark:hover:border-white/[0.2] transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                              >
                                <span>{proj.title}</span>
                                <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover/proj:text-zinc-950 dark:group-hover/proj:text-white group-hover/proj:translate-x-0.5 group-hover/proj:-translate-y-0.5 transition-all" aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Status Note for "NOW" */}
                      {milestone.statusBadge && (
                        <div className="pt-2 flex items-center gap-2">
                          <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                            {milestone.statusBadge}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
