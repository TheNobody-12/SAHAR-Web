export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] || null;
      }
      return parsed.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchThumbnailBlob(
  videoId: string,
  quality: "maxresdefault" | "hqdefault"
): Promise<Blob> {
  const response = await fetch(
    `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
  );
  if (!response.ok) {
    throw new Error(`Thumbnail ${quality} not found`);
  }
  return response.blob();
}

export async function fetchYouTubeThumbnail(videoId: string): Promise<File> {
  let blob: Blob;
  try {
    blob = await fetchThumbnailBlob(videoId, "maxresdefault");
  } catch {
    blob = await fetchThumbnailBlob(videoId, "hqdefault");
  }
  return new File([blob], `${videoId}.jpg`, { type: "image/jpeg" });
}
