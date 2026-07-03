"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SanityPost } from "@/lib/types";

type PostCardProps = {
  post: SanityPost;
  index?: number;
  cta?: string;
};

export function PostCard({ post, index = 0, cta = "Read more" }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      <Link
        href={post.slug ? `/blog/${post.slug}` : "#"}
        className="relative block w-full aspect-[16/10] overflow-hidden bg-gray-100"
        aria-hidden="true"
        tabIndex={-1}
      >
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt || `Cover image for ${post.title}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-rose-100 via-amber-50 to-sky-100" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-rose-700">
          <span className="inline-block w-5 h-px bg-rose-400" />
          {formatDate(post.date)}
        </div>

        <h2 className="mt-3 text-xl font-bold leading-snug text-gray-900 group-hover:text-rose-700 transition-colors">
          <Link href={post.slug ? `/blog/${post.slug}` : "#"}>
            {post.title}
          </Link>
        </h2>

        {post.categories && post.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <Badge
                key={c}
                variant="secondary"
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
              >
                {c}
              </Badge>
            ))}
          </div>
        )}

        {post.excerpt && (
          <p className="mt-4 text-gray-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-5">
          <Link
            href={post.slug ? `/blog/${post.slug}` : "#"}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-800 group/link"
          >
            {cta}
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
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
