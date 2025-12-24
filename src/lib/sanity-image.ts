import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "./sanity";

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: Image | undefined | null) {
  return builder.image(source as never);
}
