import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import {
  getAllNoteSlugs,
  getNoteBySlug,
  getAdjacentNotes,
  renderNoteMarkdown,
} from "@/lib/writing";
import { NoteHeader } from "@/components/writing/NoteHeader";
import { NoteTOC } from "@/components/writing/NoteTOC";
import { NoteFooter } from "@/components/writing/NoteFooter";
import { siteConfig } from "@/lib/siteConfig";
import { getArticleJsonLd } from "@/lib/jsonLd";

export const instant = false;

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllNoteSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return {
      title: "Note Not Found",
      description: "The requested engineering note could not be found.",
    };
  }

  const title = note.title;
  const description = note.description;
  const canonicalPath = `/writing/${note.slug}`;

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
      publishedTime: note.date,
      tags: note.tags,
      authors: [siteConfig.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Sanket Desai`,
      description,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const articleSchema = getArticleJsonLd(note);
  const { prev, next } = await getAdjacentNotes(slug);
  const { html, headings } = await renderNoteMarkdown(note.content);

  return (
    <main id="main-content" className="flex-1 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <Container size="wide" className="space-y-10 sm:space-y-12">
        {/* Article Editorial Header */}
        <NoteHeader note={note} />

        {/* Main Content Layout with Sticky Sidebar TOC */}
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-14 pt-2">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:w-60 xl:w-64 shrink-0">
            <NoteTOC headings={headings} />
          </aside>

          {/* Core Technical Reading Flow */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Rendered Technical Markdown with Shiki Code Blocks */}
            <div
              className="prose-custom text-zinc-800 dark:text-zinc-200"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Article Footer: Related Project & Adjacent Notes */}
            <NoteFooter note={note} prev={prev} next={next} />
          </article>
        </div>
      </Container>
    </main>
  );
}
