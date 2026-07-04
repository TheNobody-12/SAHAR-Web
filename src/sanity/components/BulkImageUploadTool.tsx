"use client";

import { useEffect, useState } from "react";
import { useClient } from "sanity";
import {
  Box,
  Card,
  Grid,
  Heading,
  Select,
  Stack,
  Text,
  TextInput,
} from "@sanity/ui";

const CATEGORY_OPTIONS = [
  { title: "Events", value: "Events" },
  { title: "Culture", value: "Culture" },
  { title: "Community", value: "Community" },
  { title: "Food", value: "Food" },
  { title: "People", value: "People" },
];

type EventOption = { _id: string; title: string };

function useEvents() {
  const client = useClient({ apiVersion: "2024-02-05" });
  const [events, setEvents] = useState<EventOption[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    client
      .fetch<EventOption[]>(`*[_type == "event"] | order(date desc) { _id, title }`)
      .then(setEvents)
      .catch((err) => {
        console.error("Failed to load events", err);
        setError("Could not load events. Please try again.");
      });
  }, [client]);

  return { events, error };
}

export default function BulkImageUploadTool() {
  const { events, error: eventsError } = useEvents();
  const [category, setCategory] = useState<string>("");
  const [cultureGroup, setCultureGroup] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");

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
      </Stack>
    </Box>
  );
}
