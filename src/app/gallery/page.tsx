"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  category: "Events" | "Culture" | "Community" | "Food";
};

const IMAGES: GalleryItem[] = [
  { src: "/images/event1.jpeg", alt: "Crowd enjoying a South Asian cultural festival in Hamilton", category: "Events" },
  { src: "/images/event2.jpeg", alt: "Traditional dance performance on stage", category: "Culture" },
  { src: "/images/event3.jpeg", alt: "Community gathering and friends meeting at an outdoor event", category: "Community" },
  { src: "/images/event4.jpeg", alt: "Henna art in progress on the hand", category: "Culture" },
  { src: "/images/event5.jpeg", alt: "Volunteers serving delicious food at a program", category: "Food" },
];

const CATEGORIES: ("All" | GalleryItem["category"])[] = [
  "All",
  "Events",
  "Culture",
  "Community",
  "Food",
];

export default function GalleryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return IMAGES.filter((img) => {
      const matchQ = query
        ? img.alt.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchC = category === "All" || img.category === category;
      return matchQ && matchC;
    });
  }, [query, category]);

  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">Gallery</h1>
          <p className="text-gray-600 mt-2">Moments from our programs, festivals, and community life.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 md:items-end">
          <div className="md:flex-1">
            <label className="text-sm font-medium" htmlFor="gallery-search">Search</label>
            <Input
              id="gallery-search"
              placeholder="Search photos (e.g., dance, food)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="md:w-64">
            <label className="text-sm font-medium" htmlFor="gallery-category">Category</label>
            <select
              id="gallery-category"
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number])}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-600">No images match your filters.</div>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img, i) => (
                <li key={`${img.src}-${i}`} className="group relative">
                  <button
                    className="block w-full overflow-hidden rounded-xl ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`View larger: ${img.alt}`}
                  >
                    <FallbackImg src={img.src} alt={img.alt} />
                  </button>
                  <div className="mt-2 text-sm text-gray-700 line-clamp-2" aria-hidden>
                    {img.alt}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {openIndex !== null && filtered[openIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
              className="absolute -top-2 -right-2 z-10 grid place-items-center h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative w-full aspect-[16/10] bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src={filtered[openIndex].src}
                alt={filtered[openIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-white/90">
              <p className="text-sm md:text-base">{filtered[openIndex].alt}</p>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={prev} aria-label="Previous image">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={next} aria-label="Next image">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FallbackImg({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100">
      {ok ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setOk(false)}
        />
      ) : (
        <Image
          src="/images/placeholder-event.svg"
          alt={`${alt} placeholder`}
          fill
          className="object-contain p-6 opacity-70"
        />
      )}
    </div>
  );
}
