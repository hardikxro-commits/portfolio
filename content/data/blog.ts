export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-jobdesdecode",
    title: "Building JobDesDecode: My First Real Project",
    description:
      "How I built an AI-powered job description decoder from scratch — the idea, the stack, the struggles, and what I learned along the way.",
    date: "June 1, 2026",
    tags: ["JavaScript", "React", "AI", "Cloudflare Workers"],
    readingTime: "5 min read",
    content: `
Every time I opened a job posting, I felt like I was reading a riddle wrapped in corporate jargon. "We need a rockstar ninja who wears many hats" — what does that even mean?

So I decided to build something that cuts through the noise.

## The Idea

JobDesDecode started with a simple premise: paste any job description and get the real story. Not just keywords, but an honest breakdown of what the role actually demands — the required skills, the red flags, the hidden expectations, and whether it's actually worth your time.

I was tired of job descriptions that told you everything except what you actually needed to know. So I built a tool that tells you the truth.

## The Stack

The project lives at **jobdesdecode** on GitHub (yes, all lowercase). It's a full-stack app split into three parts:

- **Client** — A React + Vite frontend with TypeScript, served via GitHub Pages
- **Server** — Express API layer, proxying requests securely
- **Functions** — Cloudflare Workers for AI inference via NVIDIA's API

The AI decoding runs through **NVIDIA's gpt-oss-120b model**, which analyzes the job description and returns structured insights — clarity scores, skill breakdowns, an honesty verdict, and more.

## The Early Days

The first commits were rough. I started with Framer Motion animations — rotating rings, card tilt effects, a scroll-reveal hero section. It looked cool but was mostly me learning how things fit together.

One early commit message says it all: *"feat: minimal framer-motion loader, hero with rotating rings, animated scores, card tilt"*. I was experimenting, breaking things, and slowly figuring out what the app should actually be.

## The Pivot to ChatGPT-Style UI

Originally, the analysis results were displayed as a 3D card deck using GSAP — cards would auto-cycle, flip, and expand. It was fancy, but users had to wait to see all the information.

The turning point was commit **0e70e34**: *"feat: replace card deck with ChatGPT-style stacked result layout, remove CardSwap/gsap"*.

I ripped out the fancy card animations and replaced them with a clean, stacked layout where all results are visible at once. Each section — requirements, red flags, clarity score — appears in a scrollable feed, just like a ChatGPT conversation. It was instantly more usable.

## The API Key Saga

This was the most painful part. The app needs an NVIDIA API key to power the AI analysis. In early versions, the key was hardcoded in the client (I know, I know). Then I moved it to a server-side proxy. Then Cloudflare Workers. Then I added a demo mode so the site works even without a key.

The commit history tells the story:

- *"fix: add demo mode — mock analysis when no API key provided"*
- *"refactor: move API key to server-side proxy for security"*
- *"fix: restore NVIDIA API key fallback so JD decoder and generator both work"*

Each of these was a lesson in why you don't put secrets in client-side code, and how to design fallback paths gracefully.

## Visual Design

The app is dark-themed with a 3D interactive background (Three.js tubes that respond to mouse movement), a custom preloader, and a radial score ring that shows the JD's "clarity score" at a glance. I spent way too long getting the score number to counter-rotate inside the SVG ring so the text stays readable — *"fix: counter-rotate score number inside ring to cancel SVG rotation"*.

There's also a light mode (pastel gradients), responsive mobile layouts with safe-area insets, and even some subtle Naruto easter eggs hidden in the UI for anyone who knows where to look.

## What I Learned

Building JobDesDecode taught me more than any tutorial ever could:

1. **Start simple, then iterate.** The first version had spinning rings and 3D card decks. The final version is a clean stacked layout. I had to build the fancy stuff first to realize I didn't need it.

2. **Security matters from day one.** API keys in client code = bad. Setting up a proper server-side proxy should be step one, not an afterthought.

3. **Mobile-first is real.** I kept finding layout bugs on real phones. *"fix: center navbar layout, optimize for mobile"* — this happened more than once.

4. **Polish is a thousand small fixes.** Scrollbar visibility, print styles, error states, loading transitions, font rendering. Each one is tiny. Together they make the app feel professional.

5. **AI is a tool, not a magic wand.** The NVIDIA model does the heavy lifting, but the real value is in how you present the results — organized, scannable, honest.

## What's Next

JobDesDecode is live at **hardikxro-commits.github.io/jobdesdecode**. The code is open source on GitHub. I'm currently iterating on better mobile UX and thinking about adding support for resume analysis too.

This was my first real project — not a tutorial, not a course assignment, but something I conceived, built, shipped, and kept improving. And honestly? That feeling never gets old.
`,
  },
];
