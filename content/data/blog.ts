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
    slug: "building-nothing-vault",
    title: "Building Nothing Vault: A Secure Photo Vault for Android",
    description:
      "How I built an Android photo vault with AES-256 encryption, biometric auth, PIN-protected folders, and a decoy screen — all following Nothing's design language.",
    date: "June 5, 2026",
    tags: ["Kotlin", "Jetpack Compose", "Android", "Security"],
    readingTime: "6 min read",
    content: `
I wanted a way to keep private photos hidden in plain sight. Most gallery vault apps are either ugly, unreliable, or ask for subscriptions. So I built my own — Nothing Vault.

## The Concept

Nothing Vault is an Android app that looks like it has no purpose. The lock screen greets you with the word "Nothing" and a PIN pad. Enter the correct PIN and you're in your vault. Enter a wrong one and you get a decoy screen that says "There's nothing here. Close it and go about your day."

The app is designed to follow Nothing's design language — dark backgrounds, dot-matrix-inspired typography, glassmorphic cards with frosted glass effects, and purple accent (#6C63FF). It's minimal to the point of being invisible.

## How It Works

### Multi-Folder PIN System

Each folder in the vault has its own PIN. On the setup screen, you create folders by name and assign a 4-6 digit PIN to each. PINs are hashed with PBKDF2WithHmacSHA256 using a per-folder randomly generated salt (16 bytes, 10,000 iterations). No PINs are ever stored in plaintext.

When you enter a PIN on the lock screen, the app iterates through all folders and checks each one using \`SecurityUtils.verifyPin()\`. Match found? You're in. No match after 6 digits? You're sent to the decoy screen.

### AES-256-GCM Encryption

All imported photos are encrypted with AES-256 in GCM mode before being saved to disk. The encryption key is generated and stored in the Android KeyStore — hardware-backed, never directly accessible to the app as plaintext.

The flow for importing a photo:
1. Read the image URI from the content provider
2. Copy it to a temporary file
3. Encrypt with AES-256-GCM using a key from KeyStore
4. Generate a thumbnail (max 512px, JPEG quality 80)
5. Delete the temp file
6. Save the photo metadata (encrypted filename, IV, thumbnail path) to a JSON index

Each encrypted file has a 12-byte IV prepended. Decryption reads the IV first, then decrypts the rest with GCM authentication tag verification.

### Biometric Authentication

If the device has a fingerprint sensor, you can assign biometric unlock to any folder. The app uses Android's BiometricPrompt API with \`BIOMETRIC_STRONG\` authentication. When enabled, the lock screen shows a fingerprint icon on the bottom row. Tapping it launches the system biometric dialog — on successful authentication, it opens the assigned biometric folder directly.

### Decoy Screen

The decoy screen is the app's best feature. It's a completely blank screen with the word "Nothing" and a message saying the app has no purpose. Even the app's name in the launcher is just "Nothing." If someone forces you to unlock your phone, entering the wrong PIN makes the app look like a useless placeholder.

### UI Components

I built several custom Compose components from scratch:

- **GlassmorphicCard** — A card with frosted glass effect using backdrop blur and semi-transparent overlays
- **LiquidGlassBackground** — An animated gradient background that shifts color slowly, creating a liquid-like effect
- **PinPad** — A custom numeric keypad with spring-animated press feedback and haptic vibration on each keypress
- **PinDot indicators** — Animated dots that scale up and change color as you type your PIN

The gallery view uses a 3-column lazy grid with a smart pre-decryption cache. As you scroll, the app pre-decrypts thumbnails and full-resolution images ahead of your current viewport position, keeping up to 128 thumbnails and 16 full-resolution bitmaps in an LRU cache.

## The Tech Stack

- **Language:** Kotlin
- **UI:** Jetpack Compose with Material 3
- **Navigation:** Navigation Compose with animated fade transitions
- **Encryption:** AES-256-GCM via javax.crypto, keys stored in Android KeyStore
- **PIN Hashing:** PBKDF2WithHmacSHA256 (10,000 iterations, 16-byte salt)
- **Biometrics:** AndroidX BiometricPrompt with BIOMETRIC_STRONG
- **Secure Preferences:** EncryptedSharedPreferences (AES256-SIV / AES256-GCM)
- **Min SDK:** 26 (Android 8.0)
- **Target SDK:** 34 (Android 14)

## What I Learned

1. **Android KeyStore is powerful but subtle.** The key is created once and stored in hardware-backed storage. You can't extract it, but you can reference it by alias. The \`KeyGenParameterSpec\` builder requires explicitly setting purposes, block modes, and padding schemes — get it wrong and you get \`InvalidAlgorithmParameterException\` at runtime.

2. **BiometricPrompt needs an executor.** The API requires a one-thread executor for the authentication callback. I used \`Executors.newSingleThreadExecutor()\` and it works, but the callback runs on that thread — so UI updates need to be posted back to the main thread.

3. **GCM mode needs unique IVs.** AES-GCM is deterministic if you reuse the same IV and key. I generate a fresh 12-byte IV for every encryption operation and store it alongside the encrypted file. The IV is not secret — it just needs to be unique per key.

4. **Thumbnail caching is essential for performance.** Decrypting full-resolution images for the grid view would be unusably slow. I generate small thumbnails (max 512px) at import time and cache them in memory with an LRU cache (LinkedHashMap with max 128 entries).

5. **Jetpack Compose animations are surprisingly capable.** The PIN dot animations use \`animateColorAsState\` and \`animateFloatAsState\` with spring physics (\`dampingRatio = 0.5\` — very bouncy). The navigation uses \`fadeIn/fadeOut\` with \`tween(300)\`. It all feels smooth without any custom animation code.

## What's Next

The app is open source on GitHub. Current plans include:

- Adding a "recover to gallery" feature that decrypts photos back to the device's camera roll
- Supporting video files (currently only images)
- Adding a fake calculator or notes app as an alternative decoy
- Supporting pattern unlock alongside PIN

Nothing Vault taught me that the best security is invisible. If no one knows the app exists, they can't target it. And that's the whole point.
`,
  },
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
