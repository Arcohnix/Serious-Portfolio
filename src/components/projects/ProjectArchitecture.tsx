import * as React from "react";
import { ProjectArchitectureNode } from "@/lib/projects";
import { Layers } from "lucide-react";

interface ProjectArchitectureProps {
  summary: string;
  nodes: ProjectArchitectureNode[];
}

export function ProjectArchitecture({ summary, nodes }: ProjectArchitectureProps) {
  return (
    <div className="space-y-8">
      {/* High-Level Architectural Summary */}
      <div className="p-5 sm:p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <Layers className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
          <span className="uppercase tracking-wider font-semibold">Topology &amp; Design Rationale</span>
        </div>
        <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          {summary}
        </p>
      </div>

      {/* Component Nodes Grid */}
      <div className="space-y-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
          Component Breakdown <span aria-hidden="true">&middot;</span> System Nodes
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nodes.map((node, idx) => (
            <div
              key={node.name}
              className="p-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.015] dark:bg-[#0c0c0f]/60 hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                    Node 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400">
                    {node.tech}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {node.name}
                  </h3>
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {node.role}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
