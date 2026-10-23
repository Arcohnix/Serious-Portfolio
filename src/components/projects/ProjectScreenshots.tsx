import Image from "next/image";
import type { ProjectScreenshot } from "@/lib/projects";

interface ProjectScreenshotsProps {
  screenshots: ProjectScreenshot[];
}

export function ProjectScreenshots({ screenshots }: ProjectScreenshotsProps) {
  if (screenshots.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {screenshots.map((screenshot) => (
        <figure key={screenshot.src} className="mx-auto min-w-0 w-full max-w-44 space-y-2">
          <div className="overflow-hidden rounded-xl border border-black/[0.08] bg-black dark:border-white/[0.08]">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={1264}
              height={2780}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {screenshot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
