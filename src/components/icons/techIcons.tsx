import * as React from "react";
import { type IconType } from "react-icons";
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiDart,
  SiSpringboot,
  SiFastapi,
  SiFlask,
  SiNodedotjs,
  SiPytorch,
  SiTensorflow,
  SiLangchain,
  SiLanggraph,
  SiScikitlearn,
  SiOpencv,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiGithubactions,
  SiNginx,
  SiIntellijidea,
  SiAndroidstudio,
  SiJupyter,
  SiOllama,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbBrandVscode, TbSql, TbTopologyComplex } from "react-icons/tb";
import { Code2 } from "lucide-react";

export interface TechMeta {
  name: string;
  icon: IconType | React.ComponentType<{ className?: string; size?: number | string; "aria-hidden"?: boolean | "true" | "false" }>;
  lightColor: string;
  darkColor: string;
}

export const techRegistry: Record<string, TechMeta> = {
  // Group 01: Languages
  python: {
    name: "Python",
    icon: SiPython,
    lightColor: "#3776AB",
    darkColor: "#4B8BBE",
  },
  java: {
    name: "Java",
    icon: FaJava,
    lightColor: "#EA2D2E",
    darkColor: "#FB923C",
  },
  "c++": {
    name: "C++",
    icon: SiCplusplus,
    lightColor: "#00599C",
    darkColor: "#60A5FA",
  },
  javascript: {
    name: "JavaScript",
    icon: SiJavascript,
    lightColor: "#D97706",
    darkColor: "#FACC15",
  },
  typescript: {
    name: "TypeScript",
    icon: SiTypescript,
    lightColor: "#3178C6",
    darkColor: "#60A5FA",
  },
  sql: {
    name: "SQL",
    icon: TbSql,
    lightColor: "#00758F",
    darkColor: "#38BDF8",
  },
  dart: {
    name: "Dart",
    icon: SiDart,
    lightColor: "#0175C2",
    darkColor: "#38BDF8",
  },

  // Group 02: Backend & APIs
  "spring boot": {
    name: "Spring Boot",
    icon: SiSpringboot,
    lightColor: "#6DB33F",
    darkColor: "#86EFAC",
  },
  fastapi: {
    name: "FastAPI",
    icon: SiFastapi,
    lightColor: "#009688",
    darkColor: "#2DD4BF",
  },
  flask: {
    name: "Flask",
    icon: SiFlask,
    lightColor: "#18181B",
    darkColor: "#F4F4F5",
  },
  "node.js": {
    name: "Node.js",
    icon: SiNodedotjs,
    lightColor: "#5FA04E",
    darkColor: "#86EFAC",
  },

  // Group 03: AI / ML
  pytorch: {
    name: "PyTorch",
    icon: SiPytorch,
    lightColor: "#EE4C2C",
    darkColor: "#F87171",
  },
  tensorflow: {
    name: "TensorFlow",
    icon: SiTensorflow,
    lightColor: "#EA580C",
    darkColor: "#FB923C",
  },
  "pytorch geometric": {
    name: "PyTorch Geometric",
    icon: TbTopologyComplex,
    lightColor: "#EE4C2C",
    darkColor: "#FB7185",
  },
  langchain: {
    name: "LangChain",
    icon: SiLangchain,
    lightColor: "#1C3C3C",
    darkColor: "#2DD4BF",
  },
  langgraph: {
    name: "LangGraph",
    icon: SiLanggraph,
    lightColor: "#EA580C",
    darkColor: "#FB923C",
  },
  "scikit-learn": {
    name: "Scikit-learn",
    icon: SiScikitlearn,
    lightColor: "#F7931E",
    darkColor: "#FBBF24",
  },
  opencv: {
    name: "OpenCV",
    icon: SiOpencv,
    lightColor: "#5C3EE8",
    darkColor: "#A78BFA",
  },

  // Group 04: Frontend
  react: {
    name: "React",
    icon: SiReact,
    lightColor: "#0284C7",
    darkColor: "#61DAFB",
  },
  "next.js": {
    name: "Next.js",
    icon: SiNextdotjs,
    lightColor: "#09090B",
    darkColor: "#FAFAFA",
  },
  "tailwind css": {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    lightColor: "#0891B2",
    darkColor: "#38BDF8",
  },
  flutter: {
    name: "Flutter",
    icon: SiFlutter,
    lightColor: "#02569B",
    darkColor: "#38BDF8",
  },

  // Group 05: Data & Messaging
  postgresql: {
    name: "PostgreSQL",
    icon: SiPostgresql,
    lightColor: "#336791",
    darkColor: "#60A5FA",
  },
  mysql: {
    name: "MySQL",
    icon: SiMysql,
    lightColor: "#00758F",
    darkColor: "#38BDF8",
  },
  mongodb: {
    name: "MongoDB",
    icon: SiMongodb,
    lightColor: "#16A34A",
    darkColor: "#4ADE80",
  },
  redis: {
    name: "Redis",
    icon: SiRedis,
    lightColor: "#DC2626",
    darkColor: "#F87171",
  },
  kafka: {
    name: "Kafka",
    icon: SiApachekafka,
    lightColor: "#231F20",
    darkColor: "#F4F4F5",
  },

  // Group 06: Infrastructure & DevOps
  docker: {
    name: "Docker",
    icon: SiDocker,
    lightColor: "#1D63ED",
    darkColor: "#60A5FA",
  },
  git: {
    name: "Git",
    icon: SiGit,
    lightColor: "#F05032",
    darkColor: "#FB7185",
  },
  github: {
    name: "GitHub",
    icon: SiGithub,
    lightColor: "#18181B",
    darkColor: "#F4F4F5",
  },
  linux: {
    name: "Linux",
    icon: SiLinux,
    lightColor: "#D97706",
    darkColor: "#FCC624",
  },
  "ci/cd": {
    name: "CI/CD",
    icon: SiGithubactions,
    lightColor: "#2088FF",
    darkColor: "#60A5FA",
  },
  nginx: {
    name: "Nginx",
    icon: SiNginx,
    lightColor: "#009639",
    darkColor: "#4ADE80",
  },

  // Group 07: Developer Tools
  "vs code": {
    name: "VS Code",
    icon: TbBrandVscode,
    lightColor: "#007ACC",
    darkColor: "#38BDF8",
  },
  "intellij idea": {
    name: "IntelliJ IDEA",
    icon: SiIntellijidea,
    lightColor: "#E11D48",
    darkColor: "#FB7185",
  },
  "android studio": {
    name: "Android Studio",
    icon: SiAndroidstudio,
    lightColor: "#16A34A",
    darkColor: "#4ADE80",
  },
  jupyter: {
    name: "Jupyter",
    icon: SiJupyter,
    lightColor: "#EA580C",
    darkColor: "#FB923C",
  },
  ollama: {
    name: "Ollama",
    icon: SiOllama,
    lightColor: "#18181B",
    darkColor: "#F4F4F5",
  },
};

// Aliases lookup table for normalization
const techAliases: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  cpp: "c++",
  cplusplus: "c++",
  node: "node.js",
  nodejs: "node.js",
  reactjs: "react",
  next: "next.js",
  nextjs: "next.js",
  tailwind: "tailwind css",
  tailwindcss: "tailwind css",
  postgres: "postgresql",
  apachekafka: "kafka",
  cicd: "ci/cd",
  "github actions": "ci/cd",
  vscode: "vs-code",
  "vs-code": "vs code",
  intellij: "intellij idea",
  pyg: "pytorch geometric",
};

/**
 * Returns metadata (canonical name, icon component, light & dark brand colors) for a technology.
 */
export function getTechMeta(name: string): TechMeta {
  const normalized = name.trim().toLowerCase();
  const canonicalKey = techAliases[normalized] ?? normalized;

  if (techRegistry[canonicalKey]) {
    return techRegistry[canonicalKey];
  }

  // Fallback for unknown technologies
  return {
    name,
    icon: Code2,
    lightColor: "#52525B",
    darkColor: "#A1A1AA",
  };
}

export interface TechIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number | string;
}

/**
 * Renders an official technology icon with its recognizable brand color visible at all times.
 */
export function TechIcon({
  name,
  size,
  className = "",
  style,
  ...props
}: TechIconProps) {
  const meta = getTechMeta(name);
  const IconComponent = meta.icon;

  const dynamicStyles = {
    "--brand-light": meta.lightColor,
    "--brand-dark": meta.darkColor,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      className={`tech-icon-container inline-flex items-center justify-center shrink-0 ${className}`}
      style={dynamicStyles}
      {...props}
    >
      <IconComponent
        size={size}
        aria-hidden="true"
        className="w-full h-full pointer-events-none"
      />
    </span>
  );
}
