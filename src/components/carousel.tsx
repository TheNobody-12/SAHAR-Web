"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

type Props = {
  images: Slide[];
  className?: string;
  aspectClassName?: string; // e.g. "aspect-[16/9]" or "aspect-[4/3]"
  autoPlayMs?: number; // 0 to disable
};

export default function Carousel({
  images,
  className = "",
  aspectClassName = "aspect-[16/9]",
  autoPlayMs = 5000,
}: Props) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlayMs || slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlayMs, slides.length]);

  if (!slides.length) return null;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <div className={"relative w-full overflow-hidden rounded-2xl bg-gray-100 " + className}>
      <div className={"relative w-full " + aspectClassName}>
        <div
          className="absolute inset-0 flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="relative shrink-0 grow-0 basis-full">
              <Image src={s.src} alt={s.alt} fill className="object-cover" priority={i === index} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/40 text-white hover:bg-black/60"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/40 text-white hover:bg-black/60"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

