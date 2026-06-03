import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-7xl font-bold text-accent-primary">404</h1>
      <p className="mt-4 text-lg text-text-secondary">
        This page doesn&apos;t exist (yet).
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Go home
      </Link>
    </div>
  );
}
