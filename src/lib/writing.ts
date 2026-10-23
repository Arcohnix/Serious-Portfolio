import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Marked, Renderer } from "marked";
import { codeToHtml } from "shiki";

export interface NoteHeading {
  id: string;
  text: string;
  level: number;
}

export interface WritingNote {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  relatedProject?: {
    slug: string;
    title: string;
  };
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function getAllNoteSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => file.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}

export async function getNoteBySlug(slug: string): Promise<WritingNote | null> {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);

  try {
    let fileContent: string;
    try {
      fileContent = await fs.readFile(mdxPath, "utf-8");
    } catch {
      fileContent = await fs.readFile(mdPath, "utf-8");
    }
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || "Untitled Note",
      description: data.description || "",
      date: data.date || "2025",
      category: data.category || "ENGINEERING",
      readingTime: data.readingTime || "5 min",
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: Boolean(data.featured),
      relatedProject: data.relatedProject || undefined,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllNotes(): Promise<WritingNote[]> {
  const slugs = await getAllNoteSlugs();
  const notes = await Promise.all(slugs.map((slug) => getNoteBySlug(slug)));

  return notes
    .filter((note): note is WritingNote => note !== null)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export async function getAdjacentNotes(currentSlug: string): Promise<{
  prev: WritingNote | null;
  next: WritingNote | null;
}> {
  const allNotes = await getAllNotes();
  const currentIndex = allNotes.findIndex((n) => n.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
  const next = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

  return { prev, next };
}

/**
 * Server-side Markdown parser for technical engineering notes
 * Transforms headings into anchored elements and runs Shiki syntax highlighting on code blocks.
 */
export async function renderNoteMarkdown(rawMarkdown: string): Promise<{
  html: string;
  headings: NoteHeading[];
}> {
  const headings: NoteHeading[] = [];

  // 1. Pre-extract headings and process code blocks asynchronously with Shiki
  const codeBlocks: Array<{ lang: string; code: string; highlighted: string }> = [];

  // Match ```lang\ncode\n```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(rawMarkdown)) !== null) {
    const lang = match[1] || "text";
    const code = match[2];
    try {
      const highlighted = await codeToHtml(code.trim(), {
        lang: lang === "bash" ? "sh" : lang,
        theme: "github-dark",
      });
      codeBlocks.push({ lang, code, highlighted });
    } catch {
      codeBlocks.push({
        lang,
        code,
        highlighted: `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`,
      });
    }
  }

  // 2. Custom Marked renderer
  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plainText = text.replace(/<[^>]+>/g, "");
    const id = slugify(plainText);

    if (depth === 2 || depth === 3) {
      headings.push({ id, text: plainText, level: depth });
    }

    const sizeClass =
      depth === 2
        ? "text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 mt-10 mb-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] scroll-mt-28"
        : "text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-200 mt-8 mb-3 scroll-mt-28";

    return `<h${depth} id="${id}" class="${sizeClass}">
      <a href="#${id}" class="group/anchor flex items-baseline gap-2 text-inherit no-underline hover:text-zinc-950 dark:hover:text-white">
        <span>${text}</span>
        <span class="opacity-0 group-hover/anchor:opacity-100 font-mono text-xs text-zinc-400 dark:text-zinc-600 transition-opacity">#</span>
      </a>
    </h${depth}>`;
  };

  renderer.paragraph = function ({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<p class="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal mb-6 break-words">${text}</p>`;
  };

  renderer.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote class="border-l-2 border-zinc-400 dark:border-zinc-600 pl-4 my-6 italic text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base break-words">${body}</blockquote>`;
  };

  renderer.list = function ({ ordered, items }) {
    const tag = ordered ? "ol" : "ul";
    const listClass = ordered
      ? "list-decimal list-outside pl-5 mb-6 space-y-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-normal break-words"
      : "list-disc list-outside pl-5 mb-6 space-y-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-normal break-words";
    
    let content = "";
    for (const item of items) {
      content += `<li>${this.parser.parseInline(item.tokens)}</li>`;
    }
    return `<${tag} class="${listClass}">${content}</${tag}>`;
  };

  renderer.codespan = function ({ text }) {
    return `<code class="font-mono text-xs sm:text-[13px] px-1.5 py-0.5 rounded border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-200 break-words [word-break:break-word]">${text}</code>`;
  };

  let codeBlockIndex = 0;
  renderer.code = function ({ text, lang }) {
    const block = codeBlocks[codeBlockIndex++];
    const displayLang = (lang || block?.lang || "text").toUpperCase();
    const htmlContent = block?.highlighted || `<pre><code>${escapeHtml(text)}</code></pre>`;

    return `
      <div class="my-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-[#0d0d11] overflow-hidden text-zinc-100 font-mono text-xs sm:text-[13px] shadow-lg shadow-black/20">
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
          <span class="font-mono text-[10px] tracking-widest uppercase text-zinc-400 font-semibold">${displayLang}</span>
          <span class="font-mono text-[10px] text-zinc-500 uppercase">Artifact</span>
        </div>
        <div class="p-4 sm:p-5 overflow-x-auto font-mono leading-relaxed [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 [&_code]:!font-mono [&_code]:!text-xs sm:[&_code]:!text-[13px]">
          ${htmlContent}
        </div>
      </div>
    `;
  };

  renderer.table = function ({ header, rows }) {
    let headerHtml = "";
    for (const cell of header) {
      headerHtml += `<th class="px-3 py-2 text-left font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-black/[0.08] dark:border-white/[0.08]">${this.parser.parseInline(cell.tokens)}</th>`;
    }
    let bodyHtml = "";
    for (const row of rows) {
      bodyHtml += `<tr class="border-b border-black/[0.04] dark:border-white/[0.04]">`;
      for (const cell of row) {
        bodyHtml += `<td class="px-3 py-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-normal">${this.parser.parseInline(cell.tokens)}</td>`;
      }
      bodyHtml += `</tr>`;
    }
    return `
      <div class="my-6 overflow-x-auto rounded-xl border border-black/[0.08] dark:border-white/[0.08]">
        <table class="w-full border-collapse">
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${bodyHtml}</tbody>
        </table>
      </div>
    `;
  };

  const markedInstance = new Marked({ renderer });
  const html = await markedInstance.parse(rawMarkdown);

  return { html, headings };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
