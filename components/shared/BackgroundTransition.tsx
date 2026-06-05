"use client";

export function BackgroundTransition() {
  return (
    <div className="fixed inset-0 -z-20" aria-hidden="true">
      <picture>
        <source srcSet="/images/bg-mobile.jpg" media="(max-width: 768px)" />
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.25] saturate-[0.6]"
        />
      </picture>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F0B0A]/75 via-[#0F0B0A]/30 to-[#0F0B0A]" />
    </div>
  );
}
