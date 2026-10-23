export interface ProjectReference {
  title: string;
  slug: string;
  roleNote?: string;
}

export interface EngineeringTheme {
  number: string;
  title: string;
  tagline: string;
  description: string;
  concepts: string[];
  projects: ProjectReference[];
}

export interface SystemLifecycleStage {
  step: string;
  name: string;
  description: string;
}

export const systemLifecycleStages: SystemLifecycleStage[] = [
  {
    step: "01",
    name: "BUILD",
    description: "Construct components with clear boundaries and contracts.",
  },
  {
    step: "02",
    name: "OBSERVE",
    description: "Instrument telemetry, logs, and metrics to expose internal state.",
  },
  {
    step: "03",
    name: "FAIL",
    description: "Anticipate network partitions, spikes, and downstream faults.",
  },
  {
    step: "04",
    name: "RECOVER",
    description: "Reconcile state via retries, idempotency, and graceful fallbacks.",
  },
  {
    step: "05",
    name: "IMPROVE",
    description: "Analyze failure telemetry to iterate and harden the system.",
  },
];

export const engineeringThemes: EngineeringTheme[] = [
  {
    number: "01",
    title: "RELIABILITY",
    tagline: "Systems should continue behaving predictably when things go wrong.",
    description:
      "Happy paths are the easiest part of software engineering. The real engineering begins under degraded conditions — handling network timeouts, worker crashes, and duplicate events without silent data loss or cascading failure.",
    concepts: [
      "Idempotency",
      "Transactional Outbox",
      "Exponential Backoff",
      "Dead-Letter Queues",
      "Graceful Degradation",
      "Eventual Consistency",
    ],
    projects: [
      {
        title: "Resilient Order Processing System",
        slug: "resilient-order-processing",
        roleNote: "Transactional outbox, idempotent event consumers, and crash recovery",
      },
    ],
  },
  {
    number: "02",
    title: "OBSERVABILITY",
    tagline: "You cannot improve a system you cannot understand.",
    description:
      "Telemetry is not an afterthought; it is an architectural requirement. Diagnosing tail latency, memory pressure, and event lag requires structured logging, metric instrumentation, and actionable system health checks.",
    concepts: [
      "Structured Logging",
      "Metrics Instrumentation",
      "Health Checks",
      "Consumer Lag Monitoring",
      "Pipeline Telemetry",
      "Failure Alerting",
    ],
    projects: [
      {
        title: "Uptime Monitoring System",
        slug: "uptime-monitoring-system",
        roleNote: "Asynchronous endpoint checks, incident transitions, and service history",
      },
      {
        title: "Resilient Order Processing System",
        slug: "resilient-order-processing",
        roleNote: "Consumer lag metrics, worker diagnostics, and DLQ replay tracking",
      },
    ],
  },
  {
    number: "03",
    title: "INTELLIGENT SYSTEMS",
    tagline: "AI as reliable system infrastructure, not an isolated chatbot.",
    description:
      "Integrating machine learning into production requires rigorous software engineering — combining deterministic schemas, tool calling, and graph-based agent orchestration to turn probabilistic model outputs into safe, verifiable system actions.",
    concepts: [
      "Hybrid Vector Retrieval",
      "LangGraph Workflows",
      "Structured Tool Calling",
      "AST Validation",
      "Deterministic Routing",
      "Graph Anomaly Detection",
    ],
    projects: [
      {
        title: "Agentic SOC",
        slug: "agentic-soc",
        roleNote: "Network packet graph anomaly detection and autonomous mitigation workflows",
      },
      {
        title: "AI Knowledge System",
        slug: "ai-knowledge-system",
        roleNote: "Hybrid dense/sparse vector search with Reciprocal Rank Fusion",
      },
      {
        title: "Text-to-SQL Engine",
        slug: "text-to-sql-engine",
        roleNote: "Schema-aware query generation with AST syntactic validation",
      },
    ],
  },
  {
    number: "04",
    title: "AUTOMATION & INFRASTRUCTURE",
    tagline: "Software is not finished when it runs on localhost.",
    description:
      "Reproducible container runtimes, declarative build pipelines, and automated execution workflows bridge the gap between local code and reliable software services operating continuously in the real world.",
    concepts: [
      "Docker Containers",
      "CI/CD Automation",
      "Linux Runtimes",
      "Reverse Proxies",
      "Automated Schedulers",
      "Hermetic Environments",
    ],
    projects: [
    ],
  },
];
