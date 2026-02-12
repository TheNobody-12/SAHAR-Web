import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await sanityFetch<SanityEvent | null>({
    query: eventQuery,
    params: { slug },
    revalidate: 300,
  });

  if (!event) return notFound();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
          <Link href="/events" className="text-sm text-rose-700 hover:underline">
            ← Back to Events
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-700">
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
            <Button asChild>
              <a href={event.registerUrl} target="_blank" rel="noreferrer">
                Register
              </a>
            </Button>
          )}
        </div>
      </section>

      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {event.image?.url && (
            <Image
              src={event.image.url}
              alt={event.image.alt || `Event image for ${event.title}`}
              width={1600}
              height={900}
              className="w-full h-auto rounded-2xl bg-gray-100 object-contain"
              sizes="(min-width: 1024px) 900px, 100vw"
              priority
            />
          )}
          {event.summary && (
            <p className="text-lg text-gray-800 leading-relaxed">{event.summary}</p>
          )}
          <div className="prose prose-lg max-w-none">
            <PortableText value={event.body || []} components={portableTextComponents} />
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
