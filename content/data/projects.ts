export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
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
    description: "Paste any job description and get a plain-English breakdown of what the role actually asks for, what skills matter, and what to watch out for.",
    longDescription: "Job descriptions are usually full of vague corporate speak. This tool takes any job posting and gives you a straightforward breakdown — the must-have skills, the nice-to-haves, red flags, salary hints, and an honest readability score. No buzzwords, no fluff.",
    tags: ["JavaScript", "HTML", "CSS", "GitHub Pages"],
    githubUrl: "https://github.com/hardikxro-commits/jobdesdecode",
    liveUrl: "https://jobdesdecode.pages.dev",
    featured: true,
    image: "/images/projects/jobdesdecode-thumb.gif",
    challenges: [
      "Taking messy job descriptions and pulling out useful info automatically",
      "Making the results easy to scan without feeling overwhelming",
    ],
    learnings: [
      "How to parse and organize text in JavaScript",
      "How to deploy a project on GitHub Pages",
      "What it takes to ship something from start to finish",
    ],
    date: "2026-05",
  },
  {
    slug: "nothing-vault",
    title: "Nothing Vault",
    description: "An Android app that hides your photos behind PIN-protected folders. Get the PIN right and you're in. Get it wrong and it looks like a broken app with nothing inside.",
    longDescription: "A photo vault for Android that keeps your private pictures hidden. Each folder has its own PIN. Enter the correct PIN and the folder opens. Enter a wrong one and you get a blank screen that makes the app look like a useless placeholder. Photos are encrypted using the phone's hardware security, so even if someone copies the files, they can't read them.",
    tags: ["Kotlin", "Jetpack Compose", "Android", "AES Encryption"],
    githubUrl: "https://github.com/hardikxro-commits/nothing-gallery",
    downloadUrl: "https://github.com/hardikxro-commits/nothing-gallery/releases/download/latest/Nothing-Vault.apk",
    featured: true,
    image: "/images/projects/nothing-vault-thumb.png",
    challenges: [
      "Getting encryption to actually work — Android's KeyStore is picky about how you set up your crypto keys",
      "Building a lock screen that either unlocks a folder or shows a decoy, depending on which PIN you type",
      "Pre-decrypting photos ahead of time so scrolling through the gallery doesn't lag",
    ],
    learnings: [
      "How Android KeyStore works and why you can't just grab the key as a byte array",
      "How to navigate between screens in Jetpack Compose and pass data around",
      "How to integrate fingerprint unlock with Android's BiometricPrompt API",
      "How to hash PINs properly with PBKDF2 so they're never stored as plaintext",
      "How to build custom UI components in Compose — a PIN pad, animated dots, frosted cards",
    ],
    date: "2026-06",
  },
];
