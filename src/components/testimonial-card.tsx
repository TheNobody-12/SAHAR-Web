"use client";

import { motion } from "framer-motion";

export default function TestimonialCard({
  quote,
  name,
  context,
  index,
}: {
  quote: string;
  name: string;
  context: string;
  index: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hues = ["bg-rose-100 text-rose-700", "bg-amber-100 text-amber-700", "bg-indigo-100 text-indigo-700", "bg-emerald-100 text-emerald-700"];
  const hueClass = hues[index % hues.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm relative"
    >
      <span className="absolute top-4 left-6 text-6xl text-rose-200 leading-none select-none" style={{ fontFamily: "var(--font-playfair), serif" }} aria-hidden>
        “
      </span>
      <div className="relative z-10">
        <p className="text-lg leading-relaxed text-gray-700 mb-6 pt-4">
          {quote}
        </p>
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full grid place-items-center text-sm font-bold ${hueClass}`}>
            {initials}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{context}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
