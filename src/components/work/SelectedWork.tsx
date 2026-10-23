"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/projects";

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const shouldReduceMotion = useReducedMotion();

  // Top 3 featured projects with strong visual blueprints
  const featuredProjects = projects.filter((p) => p.featured);

  // Secondary work (Projects 04, 05, 06)
  const secondaryProjects = projects.filter(
    (p) => !p.featured && p.order !== undefined && p.order >= 4 && p.order <= 6,
  );

  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 relative border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <Container size="default">
        {/* Section Heading & Intro Statement */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-4 mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
              aria-hidden="true"
            />
            <h2 className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
              Selected Work
            </h2>
          </div>

          <p className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
            A selection of systems, applications and experiments I&apos;ve
            built.
          </p>
        </motion.div>

        {/* 1. Featured Projects Showcase (01, 02, 03) */}
        <div className="space-y-8 sm:space-y-12">
          {featuredProjects.map((project, idx) => (
            <FeaturedProject
              key={project.slug}
              project={project}
              index={idx}
              reversed={idx % 2 === 1}
            />
          ))}
        </div>

        {/* 2. Secondary Projects Section (04, 05, 06) */}
        {secondaryProjects.length > 0 && (
          <div className="pt-14 sm:pt-20">
            <div className="flex items-center gap-3 pb-6 border-b border-black/[0.06] dark:border-white/[0.06] mb-8">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Additional Engineering Work &middot; 04 &ndash; 06
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {secondaryProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={(project.order || 4) - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. Section Ending Link to Complete Archive */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="pt-14 sm:pt-20 flex justify-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors py-2 px-3 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/[0.16] dark:hover:border-white/[0.16] focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <span>View all projects</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
