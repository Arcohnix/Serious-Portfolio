import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { Container } from "@/components/layout/Container";
import {
  getAllProjectSlugs,
  getProjectCaseStudy,
  getAdjacentProjects,
} from "@/lib/projects";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ProjectTOC, TOCItem } from "@/components/projects/ProjectTOC";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { ProjectArchitecture } from "@/components/projects/ProjectArchitecture";
import { ProjectWorkflow } from "@/components/projects/ProjectWorkflow";
import { ProjectDecision } from "@/components/projects/ProjectDecision";
import { ProjectChallenge } from "@/components/projects/ProjectChallenge";
import { ProjectCodeBlock } from "@/components/projects/ProjectCodeBlock";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { ProjectLessons } from "@/components/projects/ProjectLessons";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { CheckCircle2, AlertOctagon } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { getProjectJsonLd } from "@/lib/jsonLd";

export const instant = false;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectCaseStudy(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested engineering case study could not be found.",
    };
  }

  const title = project.title;
  const description = project.shortDescription || project.description;
  const canonicalPath = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} — Sanket Desai`,
      description,
      url: `${siteConfig.url}${canonicalPath}`,
      siteName: siteConfig.name,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Sanket Desai`,
      description,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectCaseStudy(slug);

  if (!project) {
    notFound();
  }

  const projectSchema = getProjectJsonLd(project);
  const { prev, next } = await getAdjacentProjects(slug);

  // Syntax highlighting for code snippet via Shiki
  let highlightedCodeHtml: string | undefined;
  if (project.codeSnippet?.code) {
    try {
      highlightedCodeHtml = await codeToHtml(project.codeSnippet.code, {
        lang: project.codeSnippet.language || "typescript",
        theme: "github-dark",
      });
    } catch (err) {
      console.error("Shiki highlighting error:", err);
    }
  }

  // Dynamically assemble Table of Contents items
  const tocItems: TOCItem[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem Statement" },
    { id: "architecture", label: "System Architecture" },
    { id: "workflow", label: "Execution Flow" },
    { id: "decisions", label: "Engineering Decisions" },
    { id: "challenges", label: "Failure Modes & Risks" },
    ...(project.codeSnippet ? [{ id: "code", label: "Key Implementation" }] : []),
    ...(project.metrics && project.metrics.length > 0
      ? [{ id: "metrics", label: "Observed Results" }]
      : []),
    ...(project.lessons && project.lessons.length > 0
      ? [{ id: "lessons", label: "Lessons Learned" }]
      : []),
  ];

  return (
    <main id="main-content" className="flex-1 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema),
        }}
      />
      <Container size="wide" className="space-y-10 sm:space-y-12">
        {/* 1. Project Editorial Header */}
        <ProjectHeader project={project} />

        {/* 2. Interactive System Visual Canvas / Topology Schematic */}
        <section aria-label="System Architecture Visual Preview" className="pt-2">
          <ProjectVisual project={project} />
        </section>

        {/* 3. Main Content Grid: Sticky Desktop TOC + Technical Documentation Flow */}
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-14 pt-4">
          {/* TOC Sidebar / Mobile Bar */}
          <aside className="lg:w-60 xl:w-64 shrink-0">
            <ProjectTOC items={tocItems} />
          </aside>

          {/* Core Case-Study Body */}
          <article className="flex-1 min-w-0 space-y-2">
            {/* 3.1 Overview & System Goals */}
            <ProjectSection
              id="overview"
              title="Overview &amp; Scope"
              eyebrow="01 / Foundation"
            >
              <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>{project.overview || project.shortDescription}</p>

                {project.engineeringGoals && project.engineeringGoals.length > 0 && (
                  <div className="mt-6 p-5 sm:p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-[#0c0c0f]/60 space-y-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold block">
                      Target Engineering Goals
                    </span>
                    <ul className="space-y-2.5">
                      {project.engineeringGoals.map((goal, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ProjectSection>

            {/* 3.2 Problem Statement & Constraints */}
            <ProjectSection
              id="problem"
              title="The Problem &amp; Context"
              eyebrow="02 / Challenge"
            >
              <div className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <div className="p-6 rounded-2xl border border-rose-500/15 dark:border-rose-500/20 bg-rose-500/[0.02] dark:bg-rose-950/[0.08] space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 font-medium">
                    <AlertOctagon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Core Engineering Dilemma</span>
                  </div>
                  <p className="text-zinc-800 dark:text-zinc-200">
                    {project.problemStatement}
                  </p>
                </div>
              </div>
            </ProjectSection>

            {/* 3.3 Architecture & Component Topology */}
            <ProjectSection
              id="architecture"
              title="System Architecture"
              eyebrow="03 / System Topology"
            >
              <ProjectArchitecture
                summary={project.architecture.summary}
                nodes={project.architecture.nodes}
              />
            </ProjectSection>

            {/* 3.4 Workflow & Lifecycle */}
            <ProjectSection
              id="workflow"
              title="Execution Flow &amp; Lifecycle"
              eyebrow="04 / End-to-End Pipeline"
            >
              <ProjectWorkflow steps={project.workflowSteps} />
            </ProjectSection>

            {/* 3.5 Decisions & Trade-Offs */}
            <ProjectSection
              id="decisions"
              title="Engineering Decisions &amp; Trade-Offs"
              eyebrow="05 / Architectural Rationale"
            >
              <ProjectDecision decisions={project.decisions} />
            </ProjectSection>

            {/* 3.6 Challenges & Failure Modes */}
            <ProjectSection
              id="challenges"
              title="Failure Modes &amp; Resilience"
              eyebrow="06 / Edge-Case Engineering"
            >
              <ProjectChallenge challenges={project.challenges} />
            </ProjectSection>

            {/* 3.7 Key Implementation Code */}
            {project.codeSnippet && (
              <ProjectSection
                id="code"
                title="Critical Implementation"
                eyebrow="07 / Code Artifact"
              >
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    A representative code snippet showcasing how concurrency,
                    state reconciliation, or safety guarantees are enforced.
                  </p>
                  <ProjectCodeBlock
                    snippet={project.codeSnippet}
                    highlightedHtml={highlightedCodeHtml}
                  />
                </div>
              </ProjectSection>
            )}

            {/* 3.8 Verified Metrics & Results (strictly conditional) */}
            {project.metrics && project.metrics.length > 0 && (
              <ProjectSection
                id="metrics"
                title="Observed Results &amp; Metrics"
                eyebrow="08 / Quantifiable Impact"
              >
                <ProjectMetrics metrics={project.metrics} />
              </ProjectSection>
            )}

            {/* 3.9 Lessons Learned & Reflections */}
            {project.lessons && project.lessons.length > 0 && (
              <ProjectSection
                id="lessons"
                title="Reflections &amp; Future Work"
                eyebrow="09 / Retrospective"
              >
                <ProjectLessons lessons={project.lessons} />
              </ProjectSection>
            )}

            {/* 3.10 Previous / Next Project Navigation */}
            <ProjectNavigation prev={prev} next={next} />
          </article>
        </div>
      </Container>
    </main>
  );
}
