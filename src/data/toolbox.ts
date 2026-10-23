export interface TechnologyGroup {
  number: string;
  title: string;
  description?: string;
  technologies: string[];
}

export const technologyGroups: TechnologyGroup[] = [
  {
    number: "01",
    title: "LANGUAGES",
    description: "Core languages used for systems programming, data pipelines, and application logic.",
    technologies: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Dart",
    ],
  },
  {
    number: "02",
    title: "BACKEND & APIs",
    description: "Frameworks and runtimes powering high-throughput asynchronous services.",
    technologies: [
      "Spring Boot",
      "FastAPI",
      "Flask",
      "Node.js",
    ],
  },
  {
    number: "03",
    title: "AI / ML",
    description: "Machine learning, graph neural networks, and agentic LLM orchestration.",
    technologies: [
      "PyTorch",
      "TensorFlow",
      "PyTorch Geometric",
      "LangChain",
      "LangGraph",
      "Scikit-learn",
      "OpenCV",
    ],
  },
  {
    number: "04",
    title: "FRONTEND",
    description: "Modern component architectures, typed UI engineering, and cross-platform clients.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Flutter",
    ],
  },
  {
    number: "05",
    title: "DATA & MESSAGING",
    description: "Transactional databases, in-memory caches, and distributed event brokers.",
    technologies: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Kafka",
    ],
  },
  {
    number: "06",
    title: "INFRASTRUCTURE & DEVOPS",
    description: "Containerization, networking, version control, and continuous deployment.",
    technologies: [
      "Docker",
      "Git",
      "Linux",
      "CI/CD",
      "Nginx",
    ],
  },
  {
    number: "07",
    title: "DEVELOPER TOOLS",
    description: "Engineering environments, local model execution, and diagnostic tooling.",
    technologies: [
      "VS Code",
      "IntelliJ IDEA",
      "Android Studio",
      "Jupyter",
      "Ollama",
    ],
  },
];

export const systemPipelineSteps = [
  { label: "Languages", detail: "Foundational syntax & type systems" },
  { label: "Backend & APIs", detail: "Services & business logic" },
  { label: "Data & Messaging", detail: "State, persistence & queues" },
  { label: "AI & Intelligence", detail: "Inference & agent workflows" },
  { label: "Infrastructure", detail: "Deployment, containers & runtime" },
];

export const toolboxExploring = [
  "Distributed systems",
  "AI agents",
  "Observability",
  "Infrastructure",
];
