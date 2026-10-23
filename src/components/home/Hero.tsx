"use client";

import * as React from "react";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { SiDocker } from "react-icons/si";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { links } from "@/data/links";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Motion variants with editorial ease curve
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[calc(100svh-4.5rem)] sm:min-h-[82vh] flex flex-col justify-center pt-6 pb-10 sm:pt-12 sm:pb-16"
    >
      <Container size="default" className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-6 sm:space-y-8"
        >
          {/* 1. Subtle Animated Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 dark:bg-zinc-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-600 dark:bg-zinc-300" />
            </span>
            <span className="font-mono text-xs sm:text-[13px] tracking-widest uppercase text-zinc-500 dark:text-zinc-400 font-medium">
              Software Engineer
            </span>
          </motion.div>

          {/* 2. Strong Statement-Based Headline (Editorial Line Reveal) */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12] sm:leading-[1.08] text-balance">
              I build systems for the real world.
            </h1>
          </motion.div>

          {/* 3. Concise Supporting Copy */}
          <motion.div variants={itemVariants} className="max-w-2xl space-y-2">
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Backend systems, AI applications, distributed architecture and DevOps.
            </p>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-500 leading-relaxed font-normal">
              Exploring how reliable software is designed, deployed and operated.
            </p>
          </motion.div>

          {/* 4. Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            {/* Primary CTA */}
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <span>View My Work</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </a>

            {/* Secondary CTA */}
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-800 dark:text-zinc-200 hover:border-black/[0.22] dark:hover:border-white/[0.22] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={links.dockerHub}
              target="_blank"
              rel="noreferrer"
              aria-label="Docker Hub profile (opens in new tab)"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-800 dark:text-zinc-200 hover:border-black/[0.22] dark:hover:border-white/[0.22] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <SiDocker className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Docker Hub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </motion.div>

          {/* 5. Understated Metadata & Status */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex items-center gap-2.5 font-mono text-xs text-zinc-500 dark:text-zinc-500"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 dark:bg-emerald-400/80" aria-hidden="true" />
            <span>Open to opportunities</span>
            <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">&middot;</span>
            <span>Based in India</span>
          </motion.div>
        </motion.div>
      </Container>

      {/* 6. Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.45,
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full pt-10 sm:pt-14"
      >
        <Container size="default">
          <a
            href="#work"
            className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors group focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none rounded py-1"
            aria-label="Scroll to explore work section"
          >
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
            <span>Scroll to explore</span>
          </a>
        </Container>
      </motion.div>
    </section>
  );
}
