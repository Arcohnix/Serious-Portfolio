"use client";

import * as React from "react";
import { Terminal } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";

const FOCUS_AREAS = [
  "Backend Systems",
  "AI / ML Applications",
  "Distributed Systems",
  "DevOps & Infrastructure",
  "Automation",
];

const EXPLORING_ITEMS = [
  "Reliable distributed systems",
  "AI-powered developer tooling",
  "Infrastructure & observability",
  "Agentic systems",
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Understand the failure",
    statement: "Systems are defined as much by how they fail as by how they work.",
  },
  {
    number: "02",
    title: "Keep complexity visible",
    statement: "Abstractions should make systems easier to reason about, not hide important behavior.",
  },
  {
    number: "03",
    title: "Build, measure, improve",
    statement: "Good engineering is iterative. Build something real, understand its behavior, then make it better.",
  },
  {
    number: "04",
    title: "Learn by going underneath",
    statement: "Using a tool is useful. Understanding what the tool is doing underneath is better.",
  },
];

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About &amp; Engineering Philosophy"
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 relative border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <Container size="default">
        {/* 1. Eyebrow Section Label */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-14 sm:mb-20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" aria-hidden="true" />
          <h2 className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
            About / Engineering Philosophy
          </h2>
        </motion.div>

        {/* 2. Editorial Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-20 sm:pb-24 border-b border-black/[0.06] dark:border-white/[0.06]">
          {/* Left Column: Large Typographic Statement */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12] text-balance">
              I like understanding what happens under the hood.
            </h3>

            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              Systems <span aria-hidden="true">&middot;</span> Failure Modes <span aria-hidden="true">&middot;</span> First Principles
            </p>
          </motion.div>

          {/* Right Column: Personal & Technical Context */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7 space-y-6 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal"
          >
            <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed">
              I&apos;m a software engineer interested in what happens underneath the abstractions.
            </p>

            <p>
              I enjoy building systems that have to do more than simply work &mdash; they need to
              handle failure, communicate clearly, and remain understandable as they grow.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400">
              Rather than treating runtimes and frameworks as black boxes, I focus on the
              underlying mechanics &mdash; data consistency, concurrency boundaries, network
              realities, and failure recovery.
            </p>

            {/* Areas of Focus */}
            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block mb-3">
                Focus Areas
              </span>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="font-mono text-xs px-2.5 py-1 rounded-md border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently Exploring */}
            <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
                Currently Exploring
              </span>
              <ul className="space-y-2 font-mono text-xs sm:text-sm">
                {EXPLORING_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="group/item flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                  >
                    <span className="text-zinc-400 dark:text-zinc-600 group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-200 group-hover/item:translate-x-0.5 transition-all duration-200" aria-hidden="true">
                      &rarr;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* 3. Engineering Principles: How I Think About Software */}
        <div className="py-20 sm:py-24 border-b border-black/[0.06] dark:border-white/[0.06]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 mb-10 sm:mb-14"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              Perspective
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              How I Think About Software
            </h3>
          </motion.div>

          <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
            {PRINCIPLES.map((principle, idx) => (
              <motion.article
                key={principle.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-6 transition-colors duration-200"
              >
                {/* Title & Number */}
                <div className="flex items-baseline gap-4 md:w-5/12 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1">
                  <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                    {principle.number}
                  </span>
                  <h4 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                    {principle.title}
                  </h4>
                </div>

                {/* Statement */}
                <div className="md:w-7/12">
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                    &ldquo;{principle.statement}&rdquo;
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* 4. Subtle Personal Element: CURRENTLY */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 sm:pt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-zinc-500 dark:text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
            <span className="uppercase tracking-widest font-semibold text-zinc-400 dark:text-zinc-500">
              Currently
            </span>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs sm:text-sm">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">Software Engineer</span>
            {" "}&mdash; Building systems, experimenting with AI, and going deeper into infrastructure.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
