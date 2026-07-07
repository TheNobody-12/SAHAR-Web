"use client";

import { useEffect, useRef, useState } from "react";
import { useClient } from "sanity";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Select,
  Stack,
  Text,
  TextInput,
} from "@sanity/ui";
import { slugify } from "@/sanity/lib/slugify";

const CATEGORY_OPTIONS = [
  { title: "Events", value: "Events" },
  { title: "Culture", value: "Culture" },
  { title: "Community", value: "Community" },
  { title: "Food", value: "Food" },
  { title: "People", value: "People" },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_BATCH_SIZE = 50;

type PendingStatus = "pending" | "duplicate" | "uploading" | "done" | "error";

type PendingFile = {
  id: string;
  file: File;
  previewUrl: string;
  title: string;
  slug: string;
  status: PendingStatus;
  error?: string;
};

type EventOption = { _id: string; title: string };

function getStatusColor(status: PendingStatus): string {
  switch (status) {
    case "duplicate":
    case "error":
      return "var(--card-critical-fg-color)";
    case "done":
      return "var(--card-positive-fg-color)";
    default:
      return "var(--card-fg-color)";
  }
}

function useEvents() {
  const client = useClient({ apiVersion: "2024-02-05" });
  const [events, setEvents] = useState<EventOption[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    client
      .fetch<EventOption[]>(`*[_type == "event"] | order(date desc) { _id, title }`)
      .then(setEvents)
      .catch(() => setError("Could not load events. Please try again."));
  }, [client]);

  return { client, events, error };
}

export default function BulkImageUploadTool() {
  const { client, events, error: eventsError } = useEvents();
  const [category, setCategory] = useState<string>("");
  const [cultureGroup, setCultureGroup] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [rejectedMessage, setRejectedMessage] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const previewUrlsRef = useRef<Set<string>>(new Set());

  const canUpload =
    pending.length > 0 &&
    !pending.some(
      (p) => p.status === "duplicate" || p.status === "uploading" || p.status === "error"
    );

  const isUploadingRef = useRef(false);

  async function handleUpload() {
    if (isUploadingRef.current) return;
    const toUpload = pending.filter((p) => p.status === "pending");
    if (toUpload.length === 0) return;

    isUploadingRef.current = true;

    setPending((prev) =>
      prev.map((p) =>
        toUpload.some((u) => u.id === p.id) ? { ...p, status: "uploading" } : p
      )
    );

    await Promise.all(
      toUpload.map(async (p) => {
        try {
          const asset = await client.assets.upload("image", p.file);

          await client.create({
            _type: "galleryItem",
            title: p.title,
            slug: { _type: "slug", current: p.slug },
            category: category || undefined,
            cultureGroup: cultureGroup || undefined,
            event: eventId ? { _type: "reference", _ref: eventId, _weak: true } : undefined,
            image: {
              _type: "image",
              asset: { _type: "reference", _ref: asset._id },
              alt: p.title,
            },
          });

          setPending((prev) =>
            prev.map((item) =>
              item.id === p.id ? { ...item, status: "done" } : item
            )
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          setPending((prev) =>
            prev.map((item) =>
              item.id === p.id
                ? { ...item, status: "error", error: message }
                : item
            )
          );
        }
      })
    );

    isUploadingRef.current = false;
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList);
    const accepted: File[] = [];
    const rejected: { name: string; reason: string }[] = [];
    const availableSlots = Math.max(0, MAX_BATCH_SIZE - pending.length);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        rejected.push({ name: file.name, reason: "not an image" });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        rejected.push({ name: file.name, reason: "larger than 10 MB" });
        return;
      }
      if (accepted.length >= availableSlots) {
        rejected.push({ name: file.name, reason: "batch limit reached" });
        return;
      }
      accepted.push(file);
    });

    if (rejected.length > 0) {
      const nonImage = rejected.filter((r) => r.reason === "not an image").length;
      const tooLarge = rejected.filter((r) => r.reason === "larger than 10 MB").length;
      const overLimit = rejected.filter((r) => r.reason === "batch limit reached").length;
      const parts: string[] = [];
      if (nonImage > 0) parts.push(`${nonImage} not an image`);
      if (tooLarge > 0) parts.push(`${tooLarge} over 10 MB`);
      if (overLimit > 0) parts.push(`${overLimit} over batch limit`);
      setRejectedMessage(`Rejected ${rejected.length} file(s): ${parts.join(", ")}.`);
    } else {
      setRejectedMessage("");
    }

    if (accepted.length === 0) return;

    const newPending: PendingFile[] = accepted.map((file) => {
      const title = file.name.replace(/\.[^/.]+$/, "");
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.add(previewUrl);
      return {
        id: Math.random().toString(36).slice(2),
        file,
        previewUrl,
        title,
        slug: slugify(title),
        status: "pending",
      };
    });

    setPending((prev) => [...prev, ...newPending]);
  }

  function updateTitle(id: string, title: string) {
    setPending((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, title, slug: slugify(title), status: "pending" } : p
      )
    );
  }

  function removeFile(id: string) {
    setPending((prev) => {
      const file = prev.find((p) => p.id === id);
      if (file) {
        URL.revokeObjectURL(file.previewUrl);
        previewUrlsRef.current.delete(file.previewUrl);
      }
      return prev.filter((p) => p.id !== id);
    });
  }

  function clearAll() {
    pending.forEach((p) => {
      URL.revokeObjectURL(p.previewUrl);
      previewUrlsRef.current.delete(p.previewUrl);
    });
    setPending([]);
    setRejectedMessage("");
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  useEffect(() => {
    const urls = previewUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function checkDuplicates() {
      const slugs = pending.map((p) => p.slug);
      if (slugs.length === 0) return;

      let existing = new Set<string>();
      try {
        const existingSlugs = await client.fetch<string[]>(
          `*[_type == "galleryItem" && slug.current in $slugs].slug.current`,
          { slugs }
        );
        if (cancelled) return;
        existing = new Set(existingSlugs);
      } catch {
        // Leave existing empty; network errors should not block the editor.
        // The upload path will surface actual write failures.
      }

      const slugCounts = new Map<string, number>();
      pending.forEach((p) => {
        slugCounts.set(p.slug, (slugCounts.get(p.slug) || 0) + 1);
      });

      setPending((prev) =>
        prev.map((p) => {
          if (p.status === "uploading" || p.status === "done") return p;
          const isDuplicate = existing.has(p.slug) || (slugCounts.get(p.slug) || 0) > 1;
          if (isDuplicate) {
            return { ...p, status: "duplicate", error: "Slug already exists" };
          }
          if (p.status === "error") return p;
          return { ...p, status: "pending", error: undefined };
        })
      );
    }

    checkDuplicates();
    return () => {
      cancelled = true;
    };
    // Derived slug list is intentionally used to trigger duplicate checks only when slugs change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending.map((p) => p.slug).join(","), client]);

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Heading as="h2" size={1}>Bulk Upload to Gallery</Heading>
        <Text muted>
          Select images, set default metadata, and create gallery items in one
          pass.
        </Text>

        <Card padding={4} tone="transparent">
          <Stack space={4}>
            <Text weight="semibold">Batch defaults</Text>
            <Grid columns={[1, 1, 3]} gap={3}>
              <Stack space={2}>
                <Text size={1}>Category</Text>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.currentTarget.value)}
                >
                  <option value="">— Select —</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.title}
                    </option>
                  ))}
                </Select>
              </Stack>

              <Stack space={2}>
                <Text size={1}>Culture Group</Text>
                <TextInput
                  placeholder="e.g., Indian"
                  value={cultureGroup}
                  onChange={(e) => setCultureGroup(e.currentTarget.value)}
                />
              </Stack>

              <Stack space={2}>
                <Text size={1}>Event</Text>
                <Select
                  value={eventId}
                  onChange={(e) => setEventId(e.currentTarget.value)}
                >
                  <option value="">— None —</option>
                  {events.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.title}
                    </option>
                  ))}
                </Select>
                {eventsError && (
                  <Text size={1} style={{ color: "var(--card-critical-fg-color)" }}>
                    {eventsError}
                  </Text>
                )}
              </Stack>
            </Grid>
          </Stack>
        </Card>

        <Card
          padding={4}
          tone="transparent"
          style={{
            border: `2px dashed ${isDragging ? "var(--card-focus-ring-color)" : "#d1d5db"}`,
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Stack space={4} style={{ alignItems: "center" }}>
            <Text>Drag images here or click to browse</Text>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => addFiles(e.target.files)}
              style={{ display: "none" }}
              id="bulk-upload-input"
            />
            <label htmlFor="bulk-upload-input">
              <Button as="a" mode="ghost" text="Select images" />
            </label>
          </Stack>
        </Card>

        {rejectedMessage && (
          <Card padding={3} tone="critical">
            <Text size={1}>{rejectedMessage}</Text>
          </Card>
        )}

        {pending.length > 0 && (
          <Card padding={4} tone="transparent">
            <Stack space={4}>
              <Flex justify="space-between" align="center">
                <Text weight="semibold">{pending.length} image(s) ready</Text>
                <Button
                  mode="bleed"
                  tone="critical"
                  text="Clear all"
                  onClick={clearAll}
                />
              </Flex>

              <Button
                text={`Upload ${pending.length} image(s)`}
                tone="primary"
                disabled={!canUpload}
                onClick={handleUpload}
              />

              <Text size={1} muted>
                Done: {pending.filter((p) => p.status === "done").length} /{" "}
                {pending.length}
              </Text>

              <Grid columns={[1, 1, 2]} gap={3}>
                {pending.map((p) => (
                  <Card key={p.id} padding={3}>
                    <Flex gap={3} align="flex-start">
                      <Box style={{ width: 64, height: 64, flexShrink: 0 }}>
                        <img
                          src={p.previewUrl}
                          alt={p.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                      <Stack space={2} style={{ flex: 1 }}>
                        <TextInput
                          value={p.title}
                          onChange={(e) => updateTitle(p.id, e.currentTarget.value)}
                          label="Title"
                        />
                        <Text size={1} muted>Slug: {p.slug}</Text>
                        <Text
                          size={1}
                          weight="semibold"
                          style={{ color: getStatusColor(p.status) }}
                        >
                          {p.status.toUpperCase()}
                          {p.error ? ` — ${p.error}` : null}
                        </Text>
                        <Button
                          mode="bleed"
                          tone="critical"
                          text="Remove"
                          onClick={() => removeFile(p.id)}
                        />
                      </Stack>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
