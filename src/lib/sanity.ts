import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-01-01";

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET. Add them to your environment."
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  perspective: process.env.SANITY_API_TOKEN ? "previewDrafts" : "published",
});

export async function sanityFetch<ResponseType>({
  query,
  params = {},
  revalidate = 300,
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number;
}) {
  return sanityClient.fetch<ResponseType>(query, params, {
    next: { revalidate },
  });
}
