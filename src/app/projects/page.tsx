import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Complete index of engineering systems, machine learning pipelines, and distributed backend architectures built by Sanket Desai.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects — Sanket Desai",
    description:
      "Complete index of engineering systems, machine learning pipelines, and distributed backend architectures built by Sanket Desai.",
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Sanket Desai",
    description:
      "Complete index of engineering systems, machine learning pipelines, and distributed backend architectures built by Sanket Desai.",
  },
};

export default async function ProjectsArchivePage() {
  const projects = await getAllProjects();
  return (
    <main id="main-content" className="flex-1 py-16 sm:py-24">
      <Container size="default">
        <Link
          href="/#work"
          aria-label="Back to Selected Work on homepage"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-10 focus-visible:ring-1 focus-visible:ring-zinc-400 rounded px-1 -mx-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Selected Work</span>
        </Link>

        <div className="space-y-4 mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Archive
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            All Projects &amp; Systems
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            A comprehensive index of engineering systems, machine learning
            pipelines, and autonomous infrastructure projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              aria-label={`View case study: ${project.title}`}
              className="group p-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] hover:border-black/[0.14] dark:hover:border-white/[0.16] hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-all duration-200 flex flex-col justify-between focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    0{idx + 1} <span aria-hidden="true">&middot;</span>{" "}
                    {project.category}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded border border-black/[0.05] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
