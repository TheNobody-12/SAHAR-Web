"use client";

import { useEffect, useState } from "react";
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

  return { events, error };
}

export default function BulkImageUploadTool() {
  const { events, error: eventsError } = useEvents();
  const [category, setCategory] = useState<string>("");
  const [cultureGroup, setCultureGroup] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [pending, setPending] = useState<PendingFile[]>([]);
  const client = useClient({ apiVersion: "2024-02-05" });

  const canUpload =
    pending.length > 0 &&
    !pending.some(
      (p) => p.status === "duplicate" || p.status === "uploading" || p.status === "error"
    );

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList).filter((file) => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > MAX_FILE_SIZE) return false;
      return true;
    });

    const newPending: PendingFile[] = files.map((file) => {
      const title = file.name.replace(/\.[^/.]+$/, "");
      return {
        id: Math.random().toString(36).slice(2),
        file,
        previewUrl: URL.createObjectURL(file),
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
      if (file) URL.revokeObjectURL(file.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  function clearAll() {
    pending.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPending([]);
  }

  useEffect(() => {
    let cancelled = false;

    async function checkDuplicates() {
      const slugs = pending.map((p) => p.slug);
      if (slugs.length === 0) return;

      const existingSlugs = await client.fetch<string[]>(
        `*[_type == "galleryItem" && slug.current in $slugs].slug.current`,
        { slugs }
      );

      if (cancelled) return;

      const existing = new Set(existingSlugs);

      setPending((prev) =>
        prev.map((p) => {
          if (p.status === "uploading" || p.status === "done") return p;
          if (existing.has(p.slug)) {
            return { ...p, status: "duplicate", error: "Slug already exists" };
          }
          return { ...p, status: "pending", error: undefined };
        })
      );
    }

    checkDuplicates();
    return () => {
      cancelled = true;
    };
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
          style={{ border: "2px dashed #d1d5db" }}
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
                onClick={() => {
                  // upload logic in next task
                }}
              />

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
