"use client";
import { useMemo } from "react";

type Props = {
  className?: string;
  theme?: "light" | "dark";
};

export default function AuroraBackground({ className = "", theme = "dark" }: Props) {
  const blobs = useMemo(
    () => [
      // x, y, size, color, anim
      { x: "-10%", y: "-20%", s: "55vmax", c: "rgba(244,63,94,0.22)", k: "aurora-drift", d: "12s", delay: "0s" }, // rose-500
      { x: "70%", y: "-15%", s: "45vmax", c: "rgba(14,165,233,0.18)", k: "aurora-drift-2", d: "14s", delay: "-3s" }, // sky-500
      { x: "-20%", y: "65%", s: "50vmax", c: "rgba(251,191,36,0.18)", k: "aurora-drift-3", d: "16s", delay: "-2s" }, // amber-400
    ],
    []
  );

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`} aria-hidden>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(1200px 600px at 20% 0%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(1000px 600px at 100% 0%, rgba(255,255,255,0.04), transparent 60%), linear-gradient(180deg, #0b1221 0%, #0b1221 60%)"
              : "radial-gradient(1200px 600px at 20% 0%, rgba(244,63,94,0.12), transparent 60%), radial-gradient(1000px 600px at 100% 0%, rgba(14,165,233,0.10), transparent 60%), linear-gradient(180deg, #ffffff 0%, #ffffff 60%)",
        }}
      />
      {/* Aurora blobs */}
      {blobs.map((b, i) => (
        <div
          key={i}
          className="pointer-events-none absolute blur-3xl aurora-blob"
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            background: `radial-gradient(closest-side, ${b.c}, transparent)`,
            animation: `${b.k} ${b.d} ease-in-out ${b.delay} infinite alternate`,
          }}
        />
      ))}
      {/* Subtle decorative pattern (South Asian inspired paisley dots) */}
      <svg className="absolute inset-0 opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill={theme === "dark" ? "#ffffff" : "#0b1221"} />
            <circle cx="18" cy="18" r="1" fill={theme === "dark" ? "#ffffff" : "#0b1221"} />
            <circle cx="30" cy="8" r="1.2" fill={theme === "dark" ? "#ffffff" : "#0b1221"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}
