import Link from "next/link";
import { Section } from "@/components/layout/Container";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { About } from "@/components/home/About";
import { Toolbox } from "@/components/home/Toolbox";
import { EngineeringPractice } from "@/components/home/EngineeringPractice";
import { ExperienceJourney } from "@/components/home/ExperienceJourney";
import { Contact } from "@/components/home/Contact";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <main id="main-content" className="flex-1 pb-32">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Selected Work / Projects Section (id="work") */}
      <SelectedWork projects={projects} />

      {/* 3. About / Engineering Philosophy Section (id="about") */}
      <About />

      {/* 4. Engineering Toolbox Section (id="stack") */}
      <Toolbox />

      {/* 5. Engineering in Practice Section (id="engineering") */}
      <EngineeringPractice />

      {/* 6. Experience / Journey Section (id="experience") */}
      <ExperienceJourney />

      {/* 7. Anchor Section: #writing (Gateway to /writing) */}
      <Section
        id="writing"
        aria-label="Engineering Notes"
        className="min-h-[45vh] flex flex-col justify-center border-t border-black/[0.06] dark:border-white/[0.06]"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
              aria-hidden="true"
            />
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
              Engineering Notes
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Things I&apos;m figuring out.
          </h3>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Notes from building systems, experimenting with AI, learning
            infrastructure, and understanding what happens underneath the
            abstractions.
          </p>

          <div className="pt-2">
            <Link
              href="/writing"
              className="group inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-black/[0.2] dark:hover:border-white/[0.2] transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <span>Explore Engineering Notes</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </Section>

      {/* 8. Contact / Availability Section (id="contact") */}
      <Contact />
    </main>
  );
}
