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
  {
    slug: "nothing-vault",
    title: "Nothing Vault",
    description: "An Android photo vault with AES-256 encryption, biometric authentication, multi-folder PIN management, and a decoy screen — built with Kotlin & Jetpack Compose following Nothing's design language.",
    longDescription: "A secure photo vault app for Android that lets you hide photos behind PIN-protected folders. Each folder has its own PIN — enter the right one to access your vault, enter the wrong one and you're redirected to a decoy screen. Photos are encrypted with AES-256-GCM using Android KeyStore, with PBKDF2 PIN hashing and Android BiometricPrompt integration.",
    tags: ["Kotlin", "Jetpack Compose", "Android", "AES Encryption"],
    githubUrl: "https://github.com/hardikxro-commits/nothing-gallery",
    liveUrl: "https://github.com/hardikxro-commits/nothing-gallery/releases/download/v1.0.0-alpha/Nothing-Vault-v1.0.0-alpha.apk",
    featured: true,
    image: "/images/projects/nothing-vault-thumb.jpg",
    challenges: [
      "Implementing AES-256-GCM encryption with Android KeyStore for secure photo storage and decryption on-the-fly",
      "Designing a dual-purpose lock screen that authenticates to real vault folders or redirects to a decoy screen on wrong PIN",
      "Building a glassmorphic UI from scratch that matches Nothing's minimalist dot-matrix aesthetic",
      "Managing photo caching and pre-decryption for smooth scrolling in the gallery grid",
    ],
    learnings: [
      "Android KeyStore and hardware-backed cryptographic key generation with AES/GCM/NoPadding",
      "Jetpack Compose navigation with multi-route argument passing and animated transitions",
      "BiometricPrompt API integration for fingerprint-based folder unlock",
      "PBKDF2WithHmacSHA256 PIN hashing with per-folder salt for folder-level security",
      "Building custom Compose UI components — glassmorphic cards, PIN pads, liquid glass backgrounds",
    ],
    date: "2026-06",
  },
];
