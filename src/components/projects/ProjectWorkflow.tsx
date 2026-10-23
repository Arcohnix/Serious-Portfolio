import * as React from "react";
import { ProjectWorkflowStep } from "@/lib/projects";

interface ProjectWorkflowProps {
  steps: ProjectWorkflowStep[];
}

export function ProjectWorkflow({ steps }: ProjectWorkflowProps) {
  return (
    <div className="space-y-6">
      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8 sm:space-y-10">
        {steps.map((item) => (
          <div key={item.step} className="relative group">
            {/* Number Indicator on timeline */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-[#fafafa] dark:bg-[#09090b] font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:border-zinc-500 dark:group-hover:border-zinc-400 transition-colors">
              {item.step}
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {item.description}
              </p>
              {item.detail && (
                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 pt-1">
                  <span aria-hidden="true">&bull;</span> {item.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
