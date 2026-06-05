import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sanityFetch } from "@/lib/sanity";
import { SanityEvent } from "@/lib/types";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";

type Props = { params: Promise<{ slug: string }> };

const eventQuery = `
*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  date,
  category,
  location,
  summary,
  body,
  registerUrl,
  "image": {
    ...image,
    "url": image.asset->url,
    "alt": coalesce(image.alt, title)
  }
}`;

const relatedQuery = `
*[_type == "event" && slug.current != $slug && date >= now()] | order(date asc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  date,
  category,
  location,
  summary,
  "image": {
    "url": image.asset->url,
    "alt": coalesce(image.alt, title)
  }
}`;

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const [event, related] = await Promise.all([
    sanityFetch<SanityEvent | null>({
      query: eventQuery,
      params: { slug },
      revalidate: 300,
    }),
    sanityFetch<SanityEvent[]>({
      query: relatedQuery,
      params: { slug },
      revalidate: 300,
    }),
  ]);

  if (!event) return notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-gray-950 via-slate-900 to-rose-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <Link href="/events" className="text-sm text-white/80 hover:text-white hover:underline inline-flex items-center gap-1 mb-4">
            ← Back to Events
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-white/90 mt-4">
            {event.date && (
              <div className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>
            )}
            {event.location && (
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
            {event.category && (
              <div className="inline-flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>{event.category}</span>
              </div>
            )}
          </div>
          {event.registerUrl && (
            <div className="mt-6">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <a href={event.registerUrl} target="_blank" rel="noreferrer">Register for this event</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Poster — full image, no crop */}
      {event.image?.url && (
        <section className="py-10 bg-gray-100">
          <div className="max-w-3xl mx-auto px-4">
            <Image
              src={event.image.url}
              alt={event.image.alt || `Event poster for ${event.title}`}
              width={1200}
              height={1600}
              className="w-full h-auto rounded-2xl shadow-lg bg-white"
              style={{ objectFit: "contain" }}
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {event.summary && (
            <p className="text-xl text-gray-800 leading-relaxed font-medium">{event.summary}</p>
          )}
          <div className="prose prose-lg max-w-none">
            <PortableText value={event.body || []} components={portableTextComponents} />
          </div>
        </div>
      </article>

      {/* Related Events */}
      {related.length > 0 && (
        <section className="py-16 bg-warm-ivory border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">More Upcoming Events</h2>
              <Link href="/events" className="text-rose-700 font-medium hover:underline inline-flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((e) => (
                <Card key={e._id} className="rounded-2xl overflow-hidden flex flex-col shadow-sm border-gray-100">
                  <Link href={`/events/${e.slug}`} className="relative block w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={e.image?.url || "/images/placeholder-event.svg"}
                      alt={e.image?.alt || e.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </Link>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-rose-700 font-medium text-sm mb-2">
                      <Calendar className="h-4 w-4" /> {formatDate(e.date)}
                    </div>
                    <h3 className="font-semibold text-lg">
                      <Link href={`/events/${e.slug}`} className="hover:text-rose-700">
                        {e.title}
                      </Link>
                    </h3>
                    {e.summary && <p className="text-gray-600 mt-1 text-sm line-clamp-2">{e.summary}</p>}
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
  if (!iso) return "Date TBA";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value?: { asset?: { _ref?: string | null } | null; alt?: string | null } }) => {
      if (!value?.asset?._ref) return null;
      const url = builder.image(value).width(1200).quality(80).url();
      return (
        <Image
          src={url}
          alt={value?.alt || "Event image"}
          width={1200}
          height={800}
          className="my-6 rounded-xl w-full h-auto object-cover"
        />
      );
    },
  },
};

const builder = createImageUrlBuilder(sanityClient);
