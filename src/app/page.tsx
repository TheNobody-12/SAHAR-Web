import { sanityFetch } from "@/lib/sanity";
import { HomeClient } from "./home-client";
import {
  SanityEvent,
  SanityImpactStat,
  SanityProgram,
} from "@/lib/types";

const programsQuery = `
*[_type == "program"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  ctaLabel,
  ctaUrl,
  "heroImage": {
    "url": heroImage.asset->url,
    "alt": coalesce(heroImage.alt, title)
  }
}`;

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
  const [programs, events, settings] = await Promise.all([
    sanityFetch<SanityProgram[]>({ query: programsQuery, revalidate: 300 }),
    sanityFetch<SanityEvent[]>({ query: eventsQuery, revalidate: 300 }),
    sanityFetch<SiteSettings | null>({ query: statsQuery, revalidate: 600 }),
  ]);

  return (
    <HomeClient
      programs={programs}
      events={events}
      stats={settings?.impactStats || []}
    />
  );
}
