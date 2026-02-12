import { sanityFetch } from "@/lib/sanity";
import { SanityPost } from "@/lib/types";
import { BlogClient } from "./blog-client";

const postsQuery = `
*[_type == "post"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  categories,
  excerpt,
  "coverImage": {
    "url": coverImage.asset->url,
    "alt": coalesce(coverImage.alt, title)
  }
}`;

export default async function BlogIndexPage() {
  const posts = await sanityFetch<SanityPost[]>({
    query: postsQuery,
    revalidate: 300,
  });

  return <BlogClient posts={posts} />;
}
