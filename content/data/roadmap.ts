export interface RoadmapItem {
  id: string;
  title: string;
  category: string;
  status: "completed" | "current" | "future";
  description?: string;
}

export const roadmap: RoadmapItem[] = [
  {
    id: "html",
    title: "HTML",
    category: "Frontend",
    status: "current",
    description: "Learning semantic HTML, best practices, accessibility, and document structure.",
  },
  {
    id: "css",
    title: "CSS",
    category: "Frontend",
    status: "future",
    description: "Flexbox, Grid, responsive design, animations, and modern layout techniques.",
  },
  {
    id: "javascript",
    title: "JavaScript",
    category: "Frontend",
    status: "current",
    description: "Building comfort with variables, functions, DOM manipulation, ES6+ basics.",
  },
  {
    id: "vs-code",
    title: "VS Code & Editor Proficiency",
    category: "Tools",
    status: "current",
    description: "Getting comfortable with shortcuts, extensions, integrated terminal, Git integration.",
  },
  {
    id: "framer",
    title: "Framer (Design & Prototyping)",
    category: "Tools",
    status: "current",
    description: "Learning interactive prototyping, components, smart animate, and design handoff.",
  },
  {
    id: "python",
    title: "Python Fundamentals",
    category: "Backend",
    status: "current",
    description: "Learning syntax, data structures, functions, and basic scripting.",
  },
  {
    id: "git",
    title: "Git & Version Control",
    category: "DevOps",
    status: "current",
    description: "Getting started with init, commit, push, pull, branches, and GitHub basics.",
  },
  {
    id: "react",
    title: "React & Next.js",
    category: "Frontend",
    status: "future",
    description: "Components, hooks, state management, App Router, server components.",
  },
  {
    id: "typescript",
    title: "TypeScript",
    category: "Frontend",
    status: "future",
    description: "Types, generics, utility types, strict mode patterns.",
  },
  {
    id: "node-express",
    title: "Node.js & Express",
    category: "Backend",
    status: "future",
    description: "REST APIs, middleware, error handling, authentication, backend architecture.",
  },
  {
    id: "databases",
    title: "Databases (SQL & NoSQL)",
    category: "Backend",
    status: "future",
    description: "PostgreSQL, MongoDB, Prisma ORM, query optimization, data modeling.",
  },
  {
    id: "docker",
    title: "Docker & Containers",
    category: "DevOps",
    status: "future",
    description: "Containerization, Docker Compose, multi-stage builds, deployment.",
  },
  {
    id: "python-ml",
    title: "Python for ML",
    category: "AI/ML",
    status: "future",
    description: "NumPy, Pandas, Matplotlib, scikit-learn basics, data preprocessing.",
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    category: "AI/ML",
    status: "future",
    description: "Neural networks, CNNs, RNNs, transformers using TensorFlow/PyTorch.",
  },
  {
    id: "llm-apps",
    title: "LLM Application Development",
    category: "AI/ML",
    status: "future",
    description: "RAG pipelines, fine-tuning, prompt engineering, LangChain, AI agents.",
  },
  {
    id: "cloud-aws",
    title: "Cloud (AWS/GCP)",
    category: "DevOps",
    status: "future",
    description: "EC2, S3, Lambda, Cloud Run, serverless architecture, infrastructure as code.",
  },
  {
    id: "system-design",
    title: "System Design",
    category: "Backend",
    status: "future",
    description: "Distributed systems, microservices, caching, load balancing, scalability patterns.",
  },
];
