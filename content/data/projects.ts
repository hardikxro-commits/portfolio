export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image: string;
  challenges?: string[];
  learnings?: string[];
  date: string;
}

export const featuredProjects: Project[] = [
  {
    slug: "jobdesdecode",
    title: "JobDesDecode",
    description: "Web tool that analyzes and breaks down job postings into easy-to-understand sections, highlighting key responsibilities, required skills, and hidden expectations.",
    longDescription: "A web-based tool that helps job seekers make faster, smarter decisions by decoding job descriptions. Parses job postings to extract key responsibilities, required skills, qualifications, and hidden expectations.",
    tags: ["JavaScript", "HTML", "CSS", "GitHub Pages"],
    githubUrl: "https://github.com/hardikxro-commits/jobdesdecode",
    liveUrl: "https://jobdesdecode.pages.dev",
    featured: true,
    image: "/images/projects/jobdesdecode-thumb.jpg",
    challenges: [
      "Parsing unstructured job description text into structured categories",
      "Designing a clean, readable UI for dense information",
    ],
    learnings: [
      "DOM manipulation and text parsing in JavaScript",
      "Deploying with GitHub Pages",
      "Building a complete project from scratch",
    ],
    date: "2026-05",
  },

];
