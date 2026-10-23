import { links } from "@/data/links";

/**
 * Centralized site configuration for SEO, metadata, canonical URLs, and social sharing.
 *
 * NOTE: If no production domain is provided via the `NEXT_PUBLIC_SITE_URL` environment
 * variable, it will check Vercel deployment variables, and finally fall back to localhost
 * for development. To configure a production domain, set `NEXT_PUBLIC_SITE_URL` in your environment.
 */
function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Sanket Desai",
  title: "Sanket Desai — Software Engineer",
  titleTemplate: "%s — Sanket Desai",
  description:
    "Software engineer building backend systems, AI applications, distributed architecture, and infrastructure. Portfolio of production systems, architecture case studies, and engineering notes.",
  url: resolveSiteUrl(),
  locale: "en_US",
  author: {
    name: "Sanket Desai",
    role: "Software Engineer",
    email: links.email,
    location: links.location,
    country: "India",
    github: links.github,
    linkedin: links.linkedin,
  },
  keywords: [
    "Sanket Desai",
    "Software Engineer",
    "Backend Systems",
    "Distributed Systems",
    "AI Applications",
    "Infrastructure",
    "DevOps",
    "TypeScript",
    "Python",
    "Java",
    "Kafka",
    "PostgreSQL",
  ],
};
