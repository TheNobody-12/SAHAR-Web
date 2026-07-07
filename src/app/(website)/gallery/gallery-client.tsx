'use client';

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { SanityGalleryItem } from "@/lib/types";

function getEmbedUrl(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("vimeo.com")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  return url;
}

type Props = {
  items: SanityGalleryItem[];
};

export function GalleryClient({ items }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [cultureGroup, setCultureGroup] = useState<string>("All");
  const [eventName, setEventName] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[]));
    return ["All", ...cats];
  }, [items]);

  const cultureGroups = useMemo(() => {
    const groups = Array.from(new Set(items.map((i) => i.cultureGroup).filter(Boolean) as string[]));
    return ["All", ...groups];
  }, [items]);

  const eventNames = useMemo(() => {
    const events = Array.from(new Set(items.map((i) => i.eventName).filter(Boolean) as string[]));
    return ["All", ...events];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((img) => {
      const matchQ = query
        ? [img.title, img.alt].filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase())
        : true;
      const matchC = category === "All" || img.category === category;
      const matchCulture = cultureGroup === "All" || img.cultureGroup === cultureGroup;
      const matchEvent = eventName === "All" || img.eventName === eventName;
      return matchQ && matchC && matchCulture && matchEvent;
    });
  }, [items, query, category, cultureGroup, eventName]);

  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openIndex !== null) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [openIndex]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, openIndex]);

  return (
    <main className="min-h-screen bg-[var(--warm-ivory)]">
      <section className="border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-rose-700 mb-3">Moments & Memories</p>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-stone-900">
            Gallery
          </h1>
          <p className="text-stone-600 mt-4 max-w-xl mx-auto">
            A visual journey through our programs, festivals, and community life.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white/60 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-5 flex flex-nowrap md:grid md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible items-end">
          <div className="w-full md:col-span-2 min-w-[140px]">
            <Input
              placeholder="Search gallery..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white border-stone-200 focus-visible:ring-rose-700"
            />
          </div>
          <div className="min-w-[120px]">
            <label className="hidden md:block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5" htmlFor="gallery-category">Category</label>
            <select
              id="gallery-category"
              aria-label="Category"
              className="w-full h-10 rounded-md border border-stone-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          {cultureGroups.length > 1 && (
            <div className="min-w-[120px]">
              <label className="hidden md:block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5" htmlFor="gallery-culture">Culture</label>
              <select
                id="gallery-culture"
                aria-label="Culture"
                className="w-full h-10 rounded-md border border-stone-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
                value={cultureGroup}
                onChange={(e) => setCultureGroup(e.target.value)}
              >
                {cultureGroups.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
          {eventNames.length > 1 && (
            <div className="min-w-[120px]">
              <label className="hidden md:block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5" htmlFor="gallery-event">Event</label>
              <select
                id="gallery-event"
                aria-label="Event"
                className="w-full h-10 rounded-md border border-stone-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              >
                {eventNames.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-stone-500">
              <p className="text-lg">No moments match your filters.</p>
            </div>
          ) : (
            <ul className="columns-2 sm:columns-3 lg:columns-4 gap-5 space-y-5">
              {filtered.map((img, i) => (
                <li key={img._id} className="group relative break-inside-avoid">
                  <button
                    className="block w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-900/5 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rose-700"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`View: ${img.alt || img.title}`}
                  >
                    <div className="relative">
                      <MasonryImg src={img.image?.url || "/images/placeholder-event.svg"} alt={img.alt || img.title || "Gallery image"} />
                      {img.mediaType && img.mediaType !== "image" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-90 transition-opacity group-hover:bg-black/30">
                          <div className="bg-rose-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenIndex(null);
        }}
        className="m-auto bg-transparent p-4 backdrop:bg-black/85 max-w-5xl w-full"
      >
        {openIndex !== null && filtered[openIndex] && (
          <div className="relative w-full">
            <form method="dialog">
              <button
                aria-label="Close"
                className="absolute top-3 right-3 z-10 grid place-items-center h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
            <div className="relative w-full aspect-[16/10] bg-stone-900 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
              {filtered[openIndex].mediaType === "video_url" && filtered[openIndex].videoUrl ? (
                <iframe
                  src={getEmbedUrl(filtered[openIndex].videoUrl!)}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={filtered[openIndex].title || "Video player"}
                ></iframe>
              ) : filtered[openIndex].mediaType === "video_file" && filtered[openIndex].videoFileUrl ? (
                <video
                  src={filtered[openIndex].videoFileUrl!}
                  controls
                  className="w-full h-full object-contain"
                  autoPlay
                ></video>
              ) : (
                <Image
                  src={filtered[openIndex].image?.url || "/images/placeholder-event.svg"}
                  alt={filtered[openIndex].alt || filtered[openIndex].title || "Gallery image"}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              )}
            </div>
            <div className="mt-5 flex items-center justify-between text-white/90">
              <div>
                <p className="text-base md:text-lg font-medium">
                  {filtered[openIndex].title}
                </p>
                {(filtered[openIndex].cultureGroup || filtered[openIndex].eventName) && (
                  <p className="text-sm text-white/60 mt-1">
                    {[filtered[openIndex].cultureGroup, filtered[openIndex].eventName].filter(Boolean).join(" • ")}
                  </p>
                )}
              </div>
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
        )}
      </dialog>
    </main>
  );
}

function MasonryImg({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="relative w-full aspect-[4/3] bg-stone-100">
        <Image
          src="/images/placeholder-event.svg"
          alt={`${alt} placeholder`}
          fill
          className="object-contain p-6 opacity-70"
        />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-stone-100"
      onError={() => setOk(false)}
      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
    />
  );
}
