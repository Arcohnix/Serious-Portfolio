import { cacheLife } from "next/cache";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface ProjectArchitectureNode {
  name: string;
  role: string;
  tech: string;
  desc: string;
}

export interface ProjectDecision {
  title: string;
  decision: string;
  why: string;
  tradeoff: string;
}

export interface ProjectChallenge {
  title: string;
  scenario: string;
  risk: string;
  mitigation: string;
}

export interface ProjectWorkflowStep {
  step: string;
  title: string;
  description: string;
  detail?: string;
}

export interface ProjectCodeSnippet {
  title: string;
  language: string;
  code: string;
  caption?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectLesson {
  title: string;
  content: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  category: string;
  breadcrumbCategory?: string;
  year: string;
  featured: boolean;
  order: number;
  github?: string | null;
  demo?: string | null;
  shortDescription: string;
  description: string;
  technologies: string[];
  overview?: string;
  problemStatement?: string;
  engineeringGoals?: string[];
  architecture: {
    summary: string;
    nodes: ProjectArchitectureNode[];
  };
  workflowSteps: ProjectWorkflowStep[];
  decisions: ProjectDecision[];
  challenges: ProjectChallenge[];
  codeSnippet?: ProjectCodeSnippet | null;
  metrics?: ProjectMetric[] | null;
  screenshots?: ProjectScreenshot[];
  lessons: ProjectLesson[];
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  tech: string[];
  summary: string;
  featured: boolean;
  order: number;
  href: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => file.replace(/\.mdx?$/, ""));
  } catch (error) {
    console.error("Error reading project slugs:", error);
    return [];
  }
}

export async function getProjectCaseStudy(
  rawSlug: string,
): Promise<ProjectCaseStudy | null> {
  const canonicalSlug = rawSlug;
  const mdxPath = path.join(CONTENT_DIR, `${canonicalSlug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${canonicalSlug}.md`);

  try {
    let fileContent: string;
    try {
      fileContent = await fs.readFile(mdxPath, "utf-8");
    } catch {
      fileContent = await fs.readFile(mdPath, "utf-8");
    }
    const { data, content } = matter(fileContent);

    return {
      slug: canonicalSlug,
      title: data.title || "Untitled Project",
      category: data.category || "ENGINEERING",
      breadcrumbCategory:
        data.breadcrumbCategory || `PROJECT / ${data.category || "SYSTEMS"}`,
      year: data.year || "2024",
      featured: Boolean(data.featured),
      order: Number(data.order) || 99,
      github: data.github || null,
      demo: data.demo || null,
      shortDescription: data.shortDescription || data.summary || "",
      description: data.description || "",
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      overview: data.overview || "",
      problemStatement: data.problemStatement || data.problem || "",
      engineeringGoals: Array.isArray(data.engineeringGoals)
        ? data.engineeringGoals
        : [],
      architecture: {
        summary: data.architecture?.summary || "",
        nodes: Array.isArray(data.architecture?.nodes)
          ? data.architecture.nodes
          : [],
      },
      workflowSteps: Array.isArray(data.workflowSteps)
        ? data.workflowSteps
        : [],
      decisions: Array.isArray(data.decisions) ? data.decisions : [],
      challenges: Array.isArray(data.challenges) ? data.challenges : [],
      codeSnippet: data.codeSnippet || null,
      metrics:
        Array.isArray(data.metrics) && data.metrics.length > 0
          ? data.metrics
          : null,
      screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
      lessons: Array.isArray(data.lessons) ? data.lessons : [],
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllCaseStudies(): Promise<ProjectCaseStudy[]> {
  const slugs = await getAllProjectSlugs();
  const caseStudies = await Promise.all(
    slugs.map((slug) => getProjectCaseStudy(slug)),
  );
  return caseStudies
    .filter((cs): cs is ProjectCaseStudy => cs !== null)
    .sort((a, b) => a.order - b.order);
}

export async function getAllProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("max");

  const caseStudies = await getAllCaseStudies();

  return caseStudies.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    tech: project.technologies,
    summary: project.shortDescription,
    featured: project.featured,
    order: project.order,
    href: `/projects/${project.slug}`,
  }));
}

export async function getAdjacentProjects(currentSlug: string): Promise<{
  prev: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
}> {
  const allProjects = await getAllCaseStudies();
  const canonicalCurrent = currentSlug;
  const currentIndex = allProjects.findIndex(
    (p) => p.slug === canonicalCurrent,
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return { prev, next };
}
