export type SanityImage = {
  url?: string | null;
  alt?: string | null;
};

export type SanityProgram = {
  _id: string;
  title: string;
  slug?: string | null;
  category?: string | null;
  summary?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  heroImage?: SanityImage | null;
};

export type SanityEvent = {
  _id: string;
  title: string;
  slug?: string | null;
  date?: string;
  category?: string | null;
  location?: string | null;
  summary?: string | null;
  body?: unknown[];
  registerUrl?: string | null;
  image?: SanityImage | null;
};

export type SanityPost = {
  _id: string;
  title: string;
  slug?: string | null;
  date?: string;
  categories?: string[];
  excerpt?: string | null;
  content?: unknown[];
  coverImage?: SanityImage | null;
};

export type SanityGalleryItem = {
  _id: string;
  title: string;
  slug?: string | null;
  category?: string | null;
  alt?: string | null;
  image?: SanityImage | null;
};

export type SanityResource = {
  _id: string;
  title: string;
  slug?: string | null;
  category?: string | null;
  summary?: string | null;
  link?: string | null;
  contact?: string | null;
  location?: string | null;
  tags?: string[];
};

export type SanityImpactStat = {
  label?: string | null;
  value?: string | null;
};
