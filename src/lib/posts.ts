export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  categories: string[];
  excerpt: string;
  content: string;
  coverImage?: string;
};

export const POSTS: Post[] = [
  {
    slug: "spring-cultural-festival",
    title: "Highlights from the Spring Cultural Festival",
    date: "2025-04-15",
    categories: ["Events", "Culture"],
    excerpt:
      "Music, dance, and regional cuisines brought our community together in a vibrant celebration.",
    content:
      "Our Spring Cultural Festival showcased performances, food stalls, and community booths. Thank you to volunteers and partners for making it possible.",
    coverImage: "/images/event1.jpeg",
  },
  {
    slug: "volunteer-onboarding-recap",
    title: "Volunteer Onboarding: Getting Started",
    date: "2025-05-06",
    categories: ["Community", "News"],
    excerpt:
      "New volunteers joined us to learn about programs, roles, and upcoming opportunities.",
    content:
      "We covered program overviews, expectations, and training resources. If you missed it, watch for the next session or reach out to our coordinators.",
    coverImage: "/images/event2.jpeg",
  },
  {
    slug: "heritage-story-night-preview",
    title: "Heritage Story Night: A Preview",
    date: "2025-06-05",
    categories: ["Events", "News"],
    excerpt:
      "Join us for intergenerational stories celebrating identity, journeys, and traditions.",
    content:
      "Bring your stories and listen to voices from across South Asia. Light refreshments will be served.",
    coverImage: "/images/event3.jpeg",
  },
  {
    slug: "aid-fundraiser-announcement",
    title: "Aid & Relief Fundraiser Announced",
    date: "2025-07-01",
    categories: ["News"],
    excerpt:
      "We’re launching a community fundraiser to support emergency relief initiatives.",
    content:
      "Donations will go towards rapid response, supplies, and community support. Details on tickets and performances are coming soon.",
    coverImage: "/images/event4.jpeg",
  },
  {
    slug: "community-resource-guide-v1",
    title: "Community Resource Guide: First Edition",
    date: "2025-05-20",
    categories: ["Resources", "Community"],
    excerpt:
      "Explore health, education, and legal resources curated for newcomers and families.",
    content:
      "This living guide collects trusted resources across the region. Share suggestions to help us improve future editions.",
    coverImage: "/images/event5.jpeg",
  },
  {
    slug: "newsletter-may-2025",
    title: "Newsletter — May 2025",
    date: "2025-05-31",
    categories: ["Newsletter"],
    excerpt:
      "Catch up on recent events, upcoming programs, and volunteer spotlights.",
    content:
      "This month’s issue features program updates, impact stats, and ways to get involved.",
  },
];

export const ALL_CATEGORIES = Array.from(
  new Set(POSTS.flatMap((p) => p.categories))
).sort();

