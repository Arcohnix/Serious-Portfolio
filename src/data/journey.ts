export interface JourneyProject {
  title: string;
  slug: string;
  focus: string;
}

export interface JourneyMilestone {
  number: string;
  period: string;
  type: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
  progressionSteps?: string[];
  projects?: JourneyProject[];
  highlightStatement?: string;
  statusBadge?: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    number: "01",
    period: "Earlier",
    type: "EDUCATION",
    title: "Diploma in Electronics & Telecommunication",
    organization: "Cusrow Wadia Institute of Technology",
    description:
      "Diploma studies in Electronics and Telecommunication.",
  },
  {
    number: "02",
    period: "2023 – 2026",
    type: "EDUCATION",
    title: "B.Tech — Computer Science & Engineering",
    organization: "Deccan Education Society Pune University",
    description:
      "Core foundation in computer science principles: data structures, algorithm analysis, operating systems internals, computer networks, and database management systems.",
    tags: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "DBMS",
      "Software Engineering",
    ],
  },
  {
    number: "03",
    period: "Internship",
    type: "INTERNSHIP",
    title: "Web Development Intern",
    organization: "Form Builder",
    description:
      "Engineered responsive user interfaces, implemented dynamic form creation workflows, integrated backend REST endpoints, and handled client-side state reconciliation.",
    tags: [
      "Web Development",
      "Form Workflows",
      "API Integration",
      "Component Engineering",
    ],
  },
  {
    number: "04",
    period: "Deep Builds",
    type: "PROJECT-DRIVEN ENGINEERING",
    title: "Systems Architecture & Deep Exploration",
    organization: "Independent Engineering & Applied Systems",
    description:
      "A defining phase driven by building real, resilient software. Transitioning from basic application development into distributed systems, event-driven pipelines, failure recovery, and agentic AI architectures.",
    progressionSteps: [
      "Web Applications",
      "Backend Architecture",
      "Intelligent AI Systems",
      "Distributed Reliability & Infrastructure",
    ],
    projects: [
      {
        title: "Resilient Order Processing",
        slug: "resilient-order-processing",
        focus: "Transactional outbox & failure recovery",
      },
      {
        title: "Agentic SOC",
        slug: "agentic-soc",
        focus: "Graph anomaly detection & LLM orchestration",
      },
      {
        title: "Uptime Monitoring System",
        slug: "uptime-monitoring-system",
        focus: "Asynchronous health checks & incident lifecycle",
      },
      {
        title: "AI Knowledge System",
        slug: "ai-knowledge-system",
        focus: "Hybrid vector search & RRF retrieval",
      },
      {
        title: "Text-to-SQL Engine",
        slug: "text-to-sql-engine",
        focus: "AST syntactic query validation",
      },
      {
        title: "ForgeGym Workout Tracker",
        slug: "forge-gym",
        focus: "Offline workout tracking & progression guidance",
      },
    ],
  },
  {
    number: "05",
    period: "Now",
    type: "CURRENT DIRECTION",
    title: "Building Systems & Looking Ahead",
    organization: "Software Engineering & Applied AI",
    highlightStatement:
      "BUILDING SYSTEMS. LEARNING DEEPER. LOOKING FOR THE NEXT CHALLENGE.",
    description:
      "Deepening practical expertise in distributed backend systems, AI applications, and resilient infrastructure. Actively looking for software engineering opportunities to build and scale durable systems.",
    statusBadge: "Open to Software Engineering Roles",
  },
];
