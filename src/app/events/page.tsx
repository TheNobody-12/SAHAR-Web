// app/events/page.tsx
import { sanityFetch } from "@/lib/sanity";
import { SanityEvent } from "@/lib/types";
import { EventsClient } from "./events-client";

const eventsQuery = `
*[_type == "event"] | order(date asc) {
  _id,
  title,
  "slug": slug.current,
  date,
  category,
  location,
  summary,
  registerUrl,
  "image": {
    "url": image.asset->url,
    "alt": coalesce(image.alt, title)
  }
}`;

export default async function EventsPage() {
  const events = await sanityFetch<SanityEvent[]>({
    query: eventsQuery,
    revalidate: 300,
  });

  return <EventsClient events={events} />;
}
