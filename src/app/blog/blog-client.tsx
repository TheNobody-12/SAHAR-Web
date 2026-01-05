'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card as UICard,
  CardContent as UICardContent,
  CardTitle as UICardTitle,
} from "@/components/ui/card";
import { SanityPost } from "@/lib/types";

type Props = {
  posts: SanityPost[];
};

export function BlogClient({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(
        posts
          .flatMap((p) => p.categories || [])
          .filter(Boolean)
      )
    );
    return ["All", ...cats];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchQ = query
        ? [p.title, p.excerpt, (p.categories || []).join(" ")]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      const matchC = category === "All" || (p.categories || []).includes(category);
      return matchQ && matchC;
    });
  }, [posts, query, category]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">News & Blog</h1>
          <p className="text-gray-600 mt-2">
            Stories, updates, and announcements from the SAHAHR community.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 md:items-end">
          <div className="md:flex-1">
            <label className="text-sm font-medium" htmlFor="blog-search">
              Search
            </label>
            <Input
              id="blog-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
            />
          </div>
          <div className="md:w-64">
            <label className="text-sm font-medium" htmlFor="blog-category">
              Category
            </label>
            <select
              id="blog-category"
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <UICard
              key={p._id}
              className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full bg-gray-100">
                {p.coverImage?.url ? (
                  <div className="relative w-full min-h-[200px]">
                    <Image
                      src={p.coverImage.url}
                      alt={p.coverImage.alt || `Cover image for ${p.title}`}
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                ) : (
                  <div className="h-44 w-full bg-gray-100" />
                )}
              </div>
              <UICardContent className="p-5">
                <div className="text-rose-700 font-medium text-sm">
                  {formatDate(p.date)}
                </div>
                <UICardTitle className="mt-1 text-xl leading-snug">
                  <Link href={p.slug ? `/blog/${p.slug}` : "#"} className="hover:text-rose-700">
                    {p.title}
                  </Link>
                </UICardTitle>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(p.categories || []).map((c) => (
                    <Badge key={c} variant="outline">
                      {c}
                    </Badge>
                  ))}
                </div>
                {p.excerpt && <p className="text-gray-600 mt-3">{p.excerpt}</p>}
                <div className="mt-4">
                  <Link
                    href={p.slug ? `/blog/${p.slug}` : "#"}
                    className="text-rose-700 font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </UICardContent>
            </UICard>
          ))}
        </div>
      </section>
    </main>
  );
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
