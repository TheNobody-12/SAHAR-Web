import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/lib/sanity";
import { SanityPost } from "@/lib/types";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";

type Props = { params: { slug: string } };

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

export default async function BlogPostPage({ params }: Props) {
  const post = await sanityFetch<SanityPost | null>({
    query: postQuery,
    params: { slug: params.slug },
    revalidate: 300,
  });

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link href="/blog" className="text-sm text-rose-700 hover:underline">
            ← Back to News
          </Link>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">{post.title}</h1>
          <div className="mt-2 text-gray-600">{formatDate(post.date)}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(post.categories || []).map((c) => (
              <Badge key={c} variant="outline">
                {c}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <article className="py-8">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {post.coverImage?.url && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || `Cover image for ${post.title}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content || []} components={portableTextComponents} />
          </div>
        </div>
      </article>
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

const builder = imageUrlBuilder(sanityClient);
