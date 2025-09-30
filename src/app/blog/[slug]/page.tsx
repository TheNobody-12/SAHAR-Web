import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { POSTS } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

type Props = { params: { slug: string } };

export default function BlogPostPage({ params }: Props) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link href="/blog" className="text-sm text-rose-700 hover:underline">← Back to News</Link>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">{post.title}</h1>
          <div className="mt-2 text-gray-600">{formatDate(post.date)}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <Badge key={c} variant="outline">{c}</Badge>
            ))}
          </div>
        </div>
      </section>

      <article className="py-8">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
              <Image src={post.coverImage} alt="Cover image" fill className="object-cover" />
            </div>
          )}
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>
      </article>
    </main>
  );
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
  } catch {
    return iso;
  }
}

