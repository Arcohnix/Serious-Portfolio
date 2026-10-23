import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getAllProjectSlugs } from "@/lib/projects";
import { getAllNoteSlugs } from "@/lib/writing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Statically known indexable top-level routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic project case studies from content files
  const projectSlugs = await getAllProjectSlugs();
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic engineering notes from content files
  const noteSlugs = await getAllNoteSlugs();
  const writingRoutes: MetadataRoute.Sitemap = noteSlugs.map((slug) => ({
    url: `${baseUrl}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
