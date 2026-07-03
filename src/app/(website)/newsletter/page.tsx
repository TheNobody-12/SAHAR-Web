import NewsletterForm from "@/components/newsletter-form";
import FeedbackForm from "@/components/feedback-form";
import RangoliDivider from "@/components/rangoli-divider";
import { PostCard } from "@/components/post-card";
import { sanityFetch } from "@/lib/sanity";
import type { SanityPost } from "@/lib/types";

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
      <section className="py-12 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Latest Issues</h2>
            <p className="text-gray-600 mt-2">Check out our latest newsletters and stay updated with what&apos;s happening in our community.</p>
          </div>

          {newsletters.length === 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              There are currently no newsletters available. Please subscribe above to be notified when the next one is published.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsletters.map((n, i) => (
                <PostCard key={n._id} post={n} index={i} cta="Read issue" />
              ))}
            </div>
          )}
        </div>
      </section>

      <RangoliDivider />

      {/* Feedback */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <FeedbackForm title="Tell us what you’d like to see" placeholder="What topics or updates would you like in our newsletter?" />
        </div>
      </section>
    </main>
  );
}