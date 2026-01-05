import { sanityFetch } from "@/lib/sanity";
import { HomeClient } from "./home-client";
import {
  SanityEvent,
  SanityImpactStat,
} from "@/lib/types";

const eventsQuery = `
*[_type == "event"] | order(date asc)[0...3] {
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

const statsQuery = `
*[_type == "siteSettings"][0]{
  impactStats
}`;

type SiteSettings = {
  impactStats?: SanityImpactStat[];
};

export default async function SahahrLanding() {
  const [events, settings] = await Promise.all([
    sanityFetch<SanityEvent[]>({ query: eventsQuery, revalidate: 300 }),
    sanityFetch<SiteSettings | null>({ query: statsQuery, revalidate: 600 }),
  ]);

  return (
    <HomeClient
      events={events}
      stats={settings?.impactStats || []}
    />
  );
}
