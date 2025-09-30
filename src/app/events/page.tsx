// app/events/page.tsx
"use client";

import { useMemo, useState } from "react";
// Alias the UI Card pieces to avoid any duplicate identifier collisions
import {
  Card as UICard,
  CardContent as UICardContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Filter, ArrowRight } from "lucide-react";

// Simple in-file dataset. Replace with API/CMS later.
const EVENTS: Array<{
  id: string;
  title: string;
  date: string; // ISO or readable
  month: string; // e.g. "April"
  category: "Cultural" | "Fundraising" | "Community";
  location: string;
  blurb: string;
  image?: string;
  registerUrl?: string;
}> = [
  {
    id: "spring-fest",
    title: "Spring Cultural Festival",
    date: "2025-04-12",
    month: "April",
    category: "Cultural",
    location: "Hamilton City Hall Plaza",
    blurb: "A celebration of music, dance, and regional cuisines.",
    image: "/images/event1.jpeg",
    registerUrl: "#",
  },
  {
    id: "volunteer-onboarding",
    title: "Volunteer Onboarding",
    date: "2025-05-04",
    month: "May",
    category: "Community",
    location: "YWCA Community Room",
    blurb: "Learn how to get involved and support our programs.",
    image: "/images/event2.jpeg",
    registerUrl: "#",
  },
  {
    id: "heritage-story-night",
    title: "Heritage Story Night",
    date: "2025-06-20",
    month: "June",
    category: "Community",
    location: "HCCI Hall",
    blurb: "Community storytelling and intergenerational dialogues.",
    image: "/images/event3.jpeg",
    registerUrl: "#",
  },
  {
    id: "aid-fundraiser",
    title: "Aid & Relief Fundraiser",
    date: "2025-07-11",
    month: "July",
    category: "Fundraising",
    location: "SAHAHR Centre",
    blurb: "Raising funds for emergency support and relief.",
    // no image available in /public/images for this item
    registerUrl: "#",
  },
];

type Category = "All" | "Cultural" | "Fundraising" | "Community";
type Month = "All" | "April" | "May" | "June" | "July";

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [month, setMonth] = useState<Month>("All");

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const matchQ = query
        ? [e.title, e.location, e.blurb].join(" ").toLowerCase().includes(query.toLowerCase())
        : true;
      const matchC = category === "All" || e.category === category;
      const matchM = month === "All" || e.month === month;
      return matchQ && matchC && matchM;
    });
  }, [query, category, month]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Upcoming Events</h1>
            <p className="text-gray-600 mt-2">Find cultural celebrations, workshops, fundraisers, and more.</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium" htmlFor="event-search">Search</label>
            <Input id="event-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, locations..." />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="event-category">Category</label>
            <select
              id="event-category"
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option>All</option>
              <option>Cultural</option>
              <option>Fundraising</option>
              <option>Community</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="event-month">Month</label>
            <select
              id="event-month"
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={month}
              onChange={(e) => setMonth(e.target.value as Month)}
            >
              <option>All</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-600 py-20">
              <Filter className="mx-auto mb-3" aria-hidden />
              No events match your filters. Try clearing them.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e) => (
                <UICard key={e.id} className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div
                    className="h-40 w-full bg-gray-100"
                    style={
                      e.image
                        ? { backgroundImage: `url(${e.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : {}
                    }
                    role="img"
                    aria-label={`${e.title} banner image`}
                  />
                  <UICardContent className="p-5">
                    <div className="flex items-center gap-2 text-rose-700 font-medium mb-2">
                      <Calendar className="h-4 w-4" aria-hidden />
                      <span>{formatDate(e.date)}</span>
                    </div>
                    <UICardTitle className="text-xl leading-snug">{e.title}</UICardTitle>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" aria-hidden />
                      <span>{e.location}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{e.blurb}</p>
                    <div className="mt-4 flex gap-2">
                      <Button asChild>
                        <a href={e.registerUrl || "#"}>Register</a>
                      </Button>
                      <Button asChild variant="outline" className="gap-1">
                        <a href={`#/events/${e.id}`}>
                          Details <ArrowRight className="h-4 w-4" aria-hidden />
                        </a>
                      </Button>
                    </div>
                  </UICardContent>
                </UICard>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// Local, dependency-free date formatter to avoid missing import errors
function formatDate(iso: string) {
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
