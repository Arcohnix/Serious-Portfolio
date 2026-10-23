import { siteConfig } from "./siteConfig";
import { ProjectCaseStudy } from "./projects";
import { WritingNote } from "./writing";

/**
 * Clean, truthful Schema.org JSON-LD structured data generators.
 * No fabricated ratings, stats, or claims.
 */

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    url: siteConfig.url,
    sameAs: [siteConfig.author.github, siteConfig.author.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Backend Systems",
      "Distributed Systems",
      "AI Applications",
      "Infrastructure",
      "Software Architecture",
      "DevOps",
    ],
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function getProjectJsonLd(project: ProjectCaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.shortDescription || project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    ...(project.github ? { codeRepository: project.github } : {}),
    programmingLanguage: project.technologies,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  };
}

export function getArticleJsonLd(note: WritingNote) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.description,
    url: `${siteConfig.url}/writing/${note.slug}`,
    datePublished: note.date,
    ...(note.tags && note.tags.length > 0
      ? { keywords: note.tags.join(", ") }
      : {}),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}
