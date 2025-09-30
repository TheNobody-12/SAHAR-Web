"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Tile = { src: string; alt: string; label: string };

const IMAGES: Tile[] = [
  { src: "/images/event1.jpeg", alt: "Classical dance performance on stage", label: "Festival" },
  { src: "/images/event2.jpeg", alt: "Volunteers and friends at outdoor event", label: "Performance" },
  { src: "/images/event3.jpeg", alt: "Community gathering at the SAHAHR table", label: "Community Gathering" },
  { src: "/images/event4.jpeg", alt: "Henna art in progress", label: "Arts & Culture" },
  { src: "/images/event5.jpeg", alt: "Volunteers supporting the event", label: "Volunteers" },
];

export default function HeroMosaic() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 6000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused]);

  const tile = (offset: number, cls: string, chipCls = "") => {
    const t = IMAGES[(index + offset) % IMAGES.length];
    const key = `${(index + offset) % IMAGES.length}`;
    return (
      <motion.figure
        key={`wrap-${key}-${offset}`}
        className={`group relative ${cls}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0.0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image src={t.src} alt={t.alt} fill className="object-cover" priority />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className={`absolute left-3 bottom-3 inline-flex items-center rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-gray-900 shadow ${chipCls}`}>
          {t.label}
        </div>
      </motion.figure>
    );
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-6 -left-10 h-40 w-40 rounded-full bg-rose-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -right-10 h-48 w-48 rounded-full bg-amber-300/30 blur-3xl" />

      <div className="grid grid-cols-2 gap-4">
        {tile(0, "rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-[4/5]")}
        {tile(1, "rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-[4/5] translate-y-6")}
        {tile(2, "col-span-2 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-[16/9]", "px-3 py-1.5 text-xs font-semibold")}
      </div>
    </div>
  );
}

