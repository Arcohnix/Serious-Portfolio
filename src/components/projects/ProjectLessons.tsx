import * as React from "react";
import { ProjectLesson } from "@/lib/projects";
import { Compass } from "lucide-react";

interface ProjectLessonsProps {
  lessons: ProjectLesson[];
}

export function ProjectLessons({ lessons }: ProjectLessonsProps) {
  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <div
          key={lesson.title}
          className="p-5 sm:p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-[#0c0c0f]/60 space-y-2"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
            <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight">
              {lesson.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal pl-6">
            {lesson.content}
          </p>
        </div>
      ))}
    </div>
  );
}
