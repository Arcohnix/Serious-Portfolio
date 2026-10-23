"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import {
  technologyGroups,
  systemPipelineSteps,
  toolboxExploring,
} from "@/data/toolbox";
import { Layers, ArrowDown } from "lucide-react";
import { TechIcon } from "@/components/icons";

export function Toolbox() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="stack"
      aria-label="Engineering Toolbox"
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 relative border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <Container size="default">
        {/* 1. Eyebrow Section Label */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" aria-hidden="true" />
            <h2 className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
              Engineering Toolbox
            </h2>
          </div>

          <h3 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
            Tools I use to build systems.
          </h3>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            A practical stack shaped by the systems I build &mdash; from backend services
            and AI applications to infrastructure and automation.
          </p>
        </motion.div>

        {/* 2. Editorial Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Context & System Layering Detail */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-8"
          >
            {/* Philosophical Context */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
                The Toolbox
              </span>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-snug">
                Different problems require different tools.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                Technologies are selected for operational predictability, concurrency guarantees,
                and failure isolation rather than novelty.
              </p>
            </div>

            {/* System-Map Pipeline Detail */}
            <div className="p-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] space-y-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                <Layers className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                <span>Toolchain Layering</span>
              </div>

              <div className="space-y-2 pt-1 font-mono text-xs">
                {systemPipelineSteps.map((step, idx) => (
                  <div key={step.label} className="relative">
                    <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                      <span className="font-medium">{step.label}</span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal">
                        L0{idx + 1}
                      </span>
                    </div>
                    {idx < systemPipelineSteps.length - 1 && (
                      <div className="pl-1 py-1 text-zinc-400 dark:text-zinc-600 flex items-center">
                        <ArrowDown className="w-3 h-3 text-zinc-400 dark:text-zinc-600 opacity-60" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-500 leading-tight pt-1 border-t border-black/[0.05] dark:border-white/[0.05]">
                <span aria-hidden="true">&bull;</span> Illustrates how components integrate from code to production.
              </p>
            </div>

            {/* Subtle Currently Exploring Block */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
                Currently Exploring
              </span>
              <ul className="space-y-1.5 font-mono text-xs">
                {toolboxExploring.map((item) => (
                  <li
                    key={item}
                    className="group/item flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
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

          {/* Right Column: Technology Domains Stack */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {technologyGroups.map((group, groupIdx) => (
              <motion.article
                key={group.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  delay: shouldReduceMotion ? 0 : groupIdx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pb-8 sm:pb-10 border-b border-black/[0.06] dark:border-white/[0.06] last:border-b-0 space-y-4"
              >
                {/* Domain Header: Number & Title */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                      {group.number}
                    </span>
                    <h4 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-zinc-950 dark:text-zinc-100">
                      {group.title}
                    </h4>
                  </div>

                  {group.description && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 font-sans sm:max-w-xs sm:text-right">
                      {group.description}
                    </p>
                  )}
                </div>

                {/* Technology Wrapping Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {group.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="group/tech relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-black/[0.07] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] hover:border-black/[0.16] dark:hover:border-white/[0.16] hover:bg-black/[0.035] dark:hover:bg-white/[0.045] transition-all duration-200 cursor-default select-none"
                    >
                      {/* Recognizable Technology Icon with authentic brand color */}
                      <TechIcon
                        name={tech}
                        className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                        aria-hidden="true"
                      />

                      {/* Tech Label */}
                      <span className="font-mono text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 group-hover/tech:text-zinc-950 dark:group-hover/tech:text-zinc-100 transition-colors duration-200 font-medium">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
