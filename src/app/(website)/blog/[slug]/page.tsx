import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { sanityFetch } from "@/lib/sanity";
import { SanityPost } from "@/lib/types";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";

type Props = { params: Promise<{ slug: string }> };

const postQuery = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  date,
  categories,
  excerpt,
  content,
  "coverImage": {
    ...coverImage,
    "url": coverImage.asset->url,
    "alt": coalesce(coverImage.alt, title)
  }
}`;

const relatedQuery = `
*[_type == "post" && slug.current != $slug] | order(date desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coalesce(coverImage.alt, title)
  }
}`;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    sanityFetch<SanityPost | null>({
      query: postQuery,
      params: { slug },
      revalidate: 300,
    }),
    sanityFetch<SanityPost[]>({
      query: relatedQuery,
      params: { slug },
      revalidate: 300,
    }),
  ]);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link href="/blog" className="text-sm text-rose-700 hover:underline inline-flex items-center gap-1">
            ← Back to News
          </Link>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-600">
            <div className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            {(post.categories || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(post.categories || []).map((c) => (
                  <Badge key={c} variant="outline" className="text-gray-600">
                    {c}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-10">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {post.coverImage?.url && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || `Cover image for ${post.title}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 900px, 100vw"
                priority
              />
            </div>
          )}
          {post.excerpt && (
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{post.excerpt}</p>
          )}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content || []} components={portableTextComponents} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-warm-ivory border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">More Stories</h2>
              <Link href="/blog" className="text-rose-700 font-medium hover:underline inline-flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Card key={p._id} className="rounded-2xl overflow-hidden flex flex-col shadow-sm border-gray-100">
                  <Link href={`/blog/${p.slug}`} className="relative block w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={p.coverImage?.url || "/images/placeholder-event.svg"}
                      alt={p.coverImage?.alt || p.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </Link>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="text-rose-700 font-medium text-sm mb-2">
                      {formatDate(p.date)}
                    </div>
                    <h3 className="font-semibold text-lg">
                      <Link href={`/blog/${p.slug}`} className="hover:text-rose-700">
                        {p.title}
                      </Link>
                    </h3>
                    {p.excerpt && <p className="text-gray-600 mt-1 text-sm line-clamp-2">{p.excerpt}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
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

type PortableImageValue = {
  asset?: { _ref?: string | null } | null;
  alt?: string | null;
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value?: PortableImageValue }) => {
      if (!value?.asset?._ref) return null;
      const url = builder.image(value).width(1200).quality(80).url();
      return (
        <Image
          src={url}
          alt={value?.alt || "Blog image"}
          width={1200}
          height={800}
          className="my-6 rounded-xl w-full h-auto object-cover"
        />
      );
    },
  },
};

const builder = createImageUrlBuilder(sanityClient);
