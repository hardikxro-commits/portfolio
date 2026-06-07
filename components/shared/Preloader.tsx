"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState("Initializing");
  const [showGoldLine, setShowGoldLine] = useState(false);
  const [showName, setShowName] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [removed, setRemoved] = useState(false);

  const labels: [number, number, string][] = [
    [0, 20, "Initializing"],
    [20, 45, "Loading assets"],
    [45, 65, "Building stars"],
    [65, 85, "Rendering world"],
    [85, 100, "Almost ready"],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.2 + Math.random() * 1.2,
        baseAlpha: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.02 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const p = progressRef.current;

      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        const alphaFactor = 0.5 + 0.5 * Math.sin(star.phase);
        const brightness = 0.3 + 0.7 * (p / 100);
        const alpha = star.baseAlpha * alphaFactor * brightness;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 163, 90, ${alpha})`;
        ctx.fill();
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.max(canvas.width, canvas.height) * 0.6;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, "rgba(15, 11, 10, 0)");
      gradient.addColorStop(0.5, "rgba(15, 11, 10, 0.4)");
      gradient.addColorStop(1, "rgba(15, 11, 10, 0.9)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (p < 100) {
        progressRef.current = Math.min(
          p + (p >= 90 ? 0.25 : 0.6),
          100
        );
      }
    };

    const loop = () => {
      draw();
      const p = Math.round(progressRef.current);
      setProgress(p);

      if (p < 100) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        draw();
        setShowName(true);
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => {
            setRemoved(true);
            onComplete();
          }, 900);
        }, 620);
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  useEffect(() => {
    for (const [, end, label] of labels) {
      if (progress < end) {
        setPhaseLabel(label);
        break;
      }
    }
  }, [progress, labels]);

  useEffect(() => {
    if (progress > 5) setShowGoldLine(true);
  }, [progress]);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0B0A] overflow-hidden transition-all duration-800 ease-in-out ${
        hiding ? "opacity-0 translate-y-[-20px]" : "opacity-100 translate-y-0"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
        style={{ width: "100%", height: "100%" }}
      />

      <div
        className="absolute left-0 w-full h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.5), transparent)",
          animation: "scanline 2.2s linear infinite",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p
          className="font-display leading-none tracking-tight text-center select-none"
          style={{
            fontSize: "clamp(80px, 18vw, 220px)",
            color: progress >= 100 ? "#F5F0E8" : "transparent",
            WebkitTextStroke: "1px rgba(196,163,90,0.6)",
            textShadow: progress >= 100 ? "0 0 80px rgba(196,163,90,0.3)" : "none",
            transition: "color 0.6s ease, text-shadow 0.6s ease",
          }}
        >
          {progress}%
        </p>

        <p
          className="font-sans text-[11px] tracking-[0.35em] uppercase"
          style={{ color: "rgba(196,163,90,0.7)" }}
        >
          {phaseLabel}
        </p>

        {showGoldLine && (
          <div
            className="h-[1px]"
            style={{
              width: "200px",
              background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.8), transparent)",
              animation: "gold-line-grow 0.8s ease-out forwards",
            }}
          />
        )}

        {showName && (
          <p
            className="font-sans text-[13px] tracking-[0.2em] uppercase transition-all duration-700 ease-out"
            style={{
              color: "rgba(245,240,232,0.5)",
              opacity: showName ? 1 : 0,
              transform: showName ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Hardik Nishad
          </p>
        )}
      </div>
    </div>
  );
}
