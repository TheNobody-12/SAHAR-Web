"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function ProgramCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-700 grid place-items-center mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
          {title}
        </h3>
        <p className={`text-gray-600 text-sm transition-all duration-300 ${hovered ? "line-clamp-none" : "line-clamp-3"}`}>
          {description}
        </p>
        <div className="mt-auto pt-4">
          <span className="text-sm font-medium text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Learn more →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
