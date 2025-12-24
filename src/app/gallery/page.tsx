import { sanityFetch } from "@/lib/sanity";
import { SanityGalleryItem } from "@/lib/types";
import { GalleryClient } from "./gallery-client";

const galleryQuery = `
*[_type == "galleryItem"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  "alt": coalesce(alt, title),
  "image": {
    "url": image.asset->url,
    "alt": coalesce(image.alt, title)
  }
}`;

export default async function GalleryPage() {
  const items = await sanityFetch<SanityGalleryItem[]>({
    query: galleryQuery,
    revalidate: 300,
  });

  return <GalleryClient items={items} />;
}
