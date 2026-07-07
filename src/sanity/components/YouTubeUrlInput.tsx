"use client";

import { useCallback, useRef } from "react";
import {
  StringInputProps,
  set,
  useClient,
  useFormValue,
} from "sanity";
import { TextInput, useToast } from "@sanity/ui";
import {
  extractYouTubeVideoId,
  fetchYouTubeThumbnail,
} from "@/sanity/lib/youtube";

export default function YouTubeUrlInput(props: StringInputProps) {
  const { value, onChange, elementProps } = props;
  const client = useClient({ apiVersion: "2024-02-05" });
  const toast = useToast();

  const documentId = useFormValue(["_id"]) as string | undefined;
  const title = useFormValue(["title"]) as string | undefined;
  const imageValue = useFormValue(["image"]) as
    | { asset?: { _ref?: string } }
    | undefined;

  const latestUrlRef = useRef<string>(value ?? "");

  const handleBlur = useCallback(
    async (event: React.FocusEvent<HTMLInputElement>) => {
      elementProps.onBlur(event);

      const url = value ?? "";
      latestUrlRef.current = url;

      const videoId = extractYouTubeVideoId(url);
      if (!videoId) return;
      if (!documentId) return;
      if (imageValue?.asset?._ref) return;

      try {
        const file = await fetchYouTubeThumbnail(videoId);

        if (latestUrlRef.current !== url) return;

        const asset = await client.assets.upload("image", file);

        if (latestUrlRef.current !== url) return;

        await client
          .patch(documentId)
          .set({
            image: {
              _type: "image",
              asset: { _type: "reference", _ref: asset._id },
              alt: title?.trim() || "YouTube video thumbnail",
            },
          })
          .commit();

        toast.push({
          status: "success",
          title: "Thumbnail fetched",
          description: "YouTube thumbnail was set automatically.",
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Thumbnail fetch failed";
        toast.push({
          status: "error",
          title: "Could not fetch thumbnail",
          description: message,
        });
      }
    },
    [client, documentId, elementProps, imageValue, title, toast, value]
  );

  return (
    <TextInput
      {...elementProps}
      value={value ?? ""}
      onChange={(event) => onChange(set(event.currentTarget.value || undefined))}
      onBlur={handleBlur}
      placeholder="https://www.youtube.com/watch?v=..."
    />
  );
}
