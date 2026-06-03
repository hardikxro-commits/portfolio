export interface TimelineEvent {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "project" | "certification" | "career" | "goal";
  icon: string;
}

export const timeline: TimelineEvent[] = [
  {
    date: "2022",
    title: "Discovered VS Code",
    subtitle: "First code editor",
    description: "Started using VS Code, learning the interface, shortcuts, and extensions that make development efficient.",
    type: "education",
    icon: "Monitor",
  },
  {
    date: "2025-06",
    title: "Started Learning HTML",
    subtitle: "Beginning of my journey",
    description: "Wrote my first HTML page. Started learning about tags, structure, and how the web works.",
    type: "education",
    icon: "Layout",
  },
  {
    date: "2025",
    title: "Started JavaScript",
    subtitle: "First programming language",
    description: "Began learning JavaScript fundamentals — variables, functions, loops, and DOM basics.",
    type: "education",
    icon: "Code2",
  },
  {
    date: "2026-03",
    title: "Started Python",
    subtitle: "Backend exploration",
    description: "Started learning Python — syntax, data structures, and basic scripting.",
    type: "education",
    icon: "Terminal",
  },
  {
    date: "2026-04",
    title: "Learned Framer",
    subtitle: "Design & prototyping",
    description: "Started learning Framer for interactive prototyping, components, and smart animate.",
    type: "education",
    icon: "Sparkles",
  },
  {
    date: "2026-05",
    title: "Started Git & GitHub",
    subtitle: "Version control",
    description: "Created my GitHub account and started learning version control with Git.",
    type: "education",
    icon: "GitFork",
  },
  {
    date: "2026-05",
    title: "JobDesDecode",
    subtitle: "First project",
    description: "Built a job description decoder web tool that analyzes job postings and highlights key requirements.",
    type: "project",
    icon: "Globe",
  },
  {
    date: "2026-06",
    title: "Building Portfolio",
    subtitle: "Current focus",
    description: "Designing and building this portfolio to showcase my work and learning journey.",
    type: "project",
    icon: "Layout",
  },
];
