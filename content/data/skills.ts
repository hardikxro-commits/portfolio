export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: "Frontend" | "Backend" | "AI/ML" | "Databases" | "DevOps" | "Tools";
}

export const skills: Skill[] = [
  { name: "React", icon: "Code2", proficiency: 0, category: "Frontend" },
  { name: "Next.js", icon: "Globe", proficiency: 0, category: "Frontend" },
  { name: "TypeScript", icon: "FileCode", proficiency: 0, category: "Frontend" },
  { name: "Tailwind CSS", icon: "Paintbrush", proficiency: 0, category: "Frontend" },
  { name: "HTML", icon: "Layout", proficiency: 30, category: "Frontend" },
  { name: "CSS", icon: "Paintbrush", proficiency: 0, category: "Frontend" },
  { name: "JavaScript", icon: "Code2", proficiency: 30, category: "Frontend" },
  { name: "Framer Motion", icon: "Sparkles", proficiency: 0, category: "Frontend" },
  { name: "Node.js", icon: "Server", proficiency: 0, category: "Backend" },
  { name: "Express", icon: "Server", proficiency: 0, category: "Backend" },
  { name: "Python", icon: "Terminal", proficiency: 5, category: "Backend" },
  { name: "REST APIs", icon: "Link", proficiency: 0, category: "Backend" },
  { name: "PostgreSQL", icon: "Database", proficiency: 0, category: "Databases" },
  { name: "MongoDB", icon: "Database", proficiency: 0, category: "Databases" },
  { name: "Prisma", icon: "Database", proficiency: 0, category: "Databases" },
  { name: "TensorFlow", icon: "Brain", proficiency: 0, category: "AI/ML" },
  { name: "PyTorch", icon: "Brain", proficiency: 0, category: "AI/ML" },
  { name: "LLM APIs", icon: "MessageSquare", proficiency: 0, category: "AI/ML" },
  { name: "OpenAI", icon: "Sparkles", proficiency: 0, category: "AI/ML" },
  { name: "Git", icon: "GitFork", proficiency: 4, category: "DevOps" },
  { name: "Docker", icon: "Container", proficiency: 0, category: "DevOps" },
  { name: "VS Code", icon: "Monitor", proficiency: 25, category: "Tools" },
  { name: "Figma", icon: "Pen", proficiency: 0, category: "Tools" },
  { name: "Framer", icon: "Sparkles", proficiency: 40, category: "Tools" },
  { name: "Postman", icon: "TestTube", proficiency: 0, category: "Tools" },
  { name: "Linux", icon: "Terminal", proficiency: 0, category: "Tools" },
];
