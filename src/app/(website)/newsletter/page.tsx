import NewsletterForm from "@/components/newsletter-form";
import FeedbackForm from "@/components/feedback-form";
import { sanityFetch } from "@/lib/sanity";
import type { SanityPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

const newsletterQuery = `
*[_type == "post" && isNewsletter == true] | order(date desc) {
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

export default async function NewsletterPage() {
  const newsletters = await sanityFetch<SanityPost[]>({
    query: newsletterQuery,
    revalidate: 0,
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Newsletter</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Subscribe for monthly updates on programs, events, and community opportunities. We respect your time and inbox.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* Newsletter issues */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Latest Issues</h2>
            <p className="text-gray-600 mt-2">Published newsletters from Sanity (filtered by “Is Newsletter”).</p>
          </div>

          {newsletters.length === 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              No newsletter issues found in Sanity. Publish a post with “Is Newsletter” enabled to show it here.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsletters.map((n) => (
                <article
                  key={n._id}
                  className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
                >
                  {n.coverImage?.url ? (
                    <Image
                      src={n.coverImage.url}
                      alt={n.coverImage.alt || `Cover image for ${n.title}`}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-contain bg-white"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="h-44 w-full bg-gray-100" />
                  )}
                  <div className="p-5 space-y-2">
                    <div className="text-rose-700 font-medium text-sm">
                      {formatDate(n.date)}
                    </div>
                    <h3 className="text-xl font-semibold leading-snug">
                      <Link href={n.slug ? `/blog/${n.slug}` : "#"} className="hover:text-rose-700">
                        {n.title}
                      </Link>
                    </h3>
                    {n.excerpt && <p className="text-gray-600 text-sm">{n.excerpt}</p>}
                    <div className="pt-1">
                      <Link
                        href={n.slug ? `/blog/${n.slug}` : "#"}
                        className="text-rose-700 font-medium hover:underline"
                      >
                        Read issue →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feedback */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <FeedbackForm title="Tell us what you’d like to see" placeholder="What topics or updates would you like in our newsletter?" />
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
