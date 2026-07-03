'use client';

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { SanityPost } from "@/lib/types";
import { PostCard } from "@/components/post-card";
import RangoliDivider from "@/components/rangoli-divider";

type Props = {
  posts: SanityPost[];
};

export function BlogClient({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(posts.flatMap((p) => p.categories || []).filter(Boolean))
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
      const matchC =
        category === "All" || (p.categories || []).includes(category);
      return matchQ && matchC;
    });
  }, [posts, query, category]);

  return (
    <main className="min-h-screen bg-warm-ivory">
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">News & Blog</h1>
          <p className="text-gray-600 mt-2">
            Stories, updates, and announcements from the SAHAHR community.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 md:items-end">
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <PostCard key={p._id} post={p} index={i} />
          ))}
        </div>
      </section>
      <RangoliDivider />
    </main>
  );
}
