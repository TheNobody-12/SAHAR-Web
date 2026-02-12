'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Filter, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card as UICard,
  CardContent as UICardContent,
  CardTitle as UICardTitle,
} from "@/components/ui/card";
import { SanityEvent } from "@/lib/types";

type Props = {
  events: SanityEvent[];
};

export function EventsClient({ events }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [month, setMonth] = useState<string>("All");
  const [visible, setVisible] = useState(6);

  const monthOptions = useMemo(() => {
    const months = Array.from(
      new Set(
        events
          .map((e) => (e.date ? monthLabel(e.date) : null))
          .filter(Boolean) as string[]
      )
    );
    return ["All", ...months];
  }, [events]);

  const categoryOptions = useMemo(() => {
    const cats = Array.from(
      new Set(events.map((e) => e.category).filter(Boolean) as string[])
    );
    return ["All", ...cats];
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchQ = query
        ? [e.title, e.location, e.summary]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      const matchC = category === "All" || e.category === category;
      const matchM =
        month === "All" || monthLabel(e.date ?? "") === (month as string);
      return matchQ && matchC && matchM;
    });
  }, [events, query, category, month]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Upcoming Events</h1>
            <p className="text-gray-600 mt-2">
              Find cultural celebrations, workshops, fundraisers, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium" htmlFor="event-search">
              Search events
            </label>
            <Input
              id="event-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or location"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="event-category">
              Category
            </label>
            <select
              id="event-category"
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              {categoryOptions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="event-month">
              Month
            </label>
            <select
              id="event-month"
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              aria-label="Filter by month"
            >
              {monthOptions.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-4 text-sm text-gray-600">
            Showing {Math.min(filtered.length, visible)} of {filtered.length} events
          </div>
          {filtered.length === 0 ? (
            <div className="text-center text-gray-600 py-20">
              <Filter className="mx-auto mb-3" aria-hidden />
              No events match your filters. Try clearing them.
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, visible).map((e) => (
                  <UICard
                    key={e._id}
                    className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                  <div className="relative w-full bg-gray-100">
                    {e.image?.url ? (
                      <div className="relative w-full min-h-[200px]">
                        <Image
                          src={e.image.url}
                          alt={e.image.alt || e.title}
                          fill
                          className="object-contain lg:object-cover"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full min-h-[200px]">
                        <Image
                          src="/images/placeholder-event.svg"
                          alt={`${e.title} placeholder image`}
                          fill
                          className="object-contain p-6 opacity-70"
                        />
                      </div>
                    )}
                  </div>
                  <UICardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-rose-700 font-medium mb-2">
                      <Calendar className="h-4 w-4" aria-hidden />
                      <span>{formatDate(e.date)}</span>
                    </div>
                    <UICardTitle className="text-xl leading-snug">
                      {e.slug ? (
                        <Link href={`/events/${e.slug}`} className="hover:text-rose-700">
                          {e.title}
                        </Link>
                      ) : (
                        e.title
                      )}
                    </UICardTitle>
                    {e.category && (
                      <div className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-wide text-gray-600">
                        <span className="px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
                          {e.category}
                        </span>
                      </div>
                    )}
                    {e.location && (
                      <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <MapPin className="h-4 w-4" aria-hidden />
                        <span>{e.location}</span>
                      </div>
                    )}
                    {e.summary && <p className="text-gray-600 mt-2 line-clamp-3">{e.summary}</p>}
                    <div className="mt-auto pt-4 flex flex-col gap-2">
                      <Button asChild>
                        <a href={e.registerUrl || "#"}>Register</a>
                      </Button>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="w-full gap-1">
                          <a href={e.slug ? `/events/${e.slug}` : "#"}>
                            Details <ArrowRight className="h-4 w-4" aria-hidden />
                          </a>
                        </Button>
                        <Button asChild variant="ghost" className="w-full" aria-label={`Add ${e.title} to calendar`}>
                          <a href={calendarLink(e)} target="_blank" rel="noreferrer">
                            Add to calendar
                          </a>
                        </Button>
                      </div>
                    </div>
                  </UICardContent>
                </UICard>
              ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={() => setVisible((v) => v + 6)}>
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function formatDate(iso?: string) {
  if (!iso) return "Date TBA";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

function monthLabel(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "long" });
  } catch {
    return "";
  }
}

function calendarLink(event: SanityEvent) {
  if (!event.date) return "#";
  const start = new Date(event.date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2 hours default
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d+Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title || "Event",
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.summary || "",
    location: event.location || "",
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}
