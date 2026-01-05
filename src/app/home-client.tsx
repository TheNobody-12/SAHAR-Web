'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Globe2,
  HandHeart,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroMosaic from "@/components/hero-mosaic";
import AuroraBackground from "@/components/aurora-background";
import { SanityEvent, SanityImpactStat } from "@/lib/types";
import FeedbackForm from "@/components/feedback-form";

type Props = {
  events: SanityEvent[];
  stats: SanityImpactStat[];
};

export function HomeClient({ events, stats }: Props) {
  const eventCards = events.length ? events : fallbackEvents;
  const impactStats = stats.length ? stats : fallbackStats;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-rose-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <AuroraBackground theme="dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-5">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              Celebrating South Asian Heritage in Hamilton
            </motion.h1>
            <p className="text-lg text-white/80 max-w-2xl">
              We unite communities through cultural programs, festivals, and support services for youth, seniors, and newcomers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Link href="/events">See Upcoming Events</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Badge className="bg-emerald-600 text-white">Registered Non‑Profit</Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                Volunteer‑Led
              </Badge>
            </div>
          </div>
          <HeroMosaic />
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {eventCards.map((e, i) => (
              <Card
                key={e._id || e.title}
                className={`overflow-hidden ${
                  i % 2 ? "card-swoop-br" : "card-swoop-bl"
                }`}
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={e.image?.url || "/images/placeholder-event.svg"}
                    alt={e.image?.alt || e.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-rose-700 font-medium mb-2">
                    <Calendar className="h-4 w-4" /> {formatDate(e.date)}
                  </div>
                  <h3 className="font-semibold text-lg">{e.title}</h3>
                  <p className="text-gray-600 mt-1">{e.summary}</p>
                  <div className="mt-4 flex gap-2">
                    <Button className="w-full" asChild>
                      <Link href={e.registerUrl || "#"}>Register</Link>
                    </Button>
                    {e.slug && (
                      <Button variant="outline" asChild className="w-full">
                        <Link href={`/events/${e.slug}`}>Details</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Community Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((s, idx) => {
              const Icon = impactIcons[idx % impactIcons.length];
              return (
                <Card key={`${s.label}-${s.value}-${idx}`} className="rounded-2xl text-center shadow-sm border-gray-100">
                  <CardContent className="p-6 space-y-3">
                    <div className="mx-auto h-11 w-11 rounded-xl bg-rose-50 text-rose-700 grid place-items-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-4xl font-extrabold">{s.value}</div>
                    <div className="text-gray-600">{s.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stories / Testimonials */}
      <section id="stories" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Stories from Our Community
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="rounded-2xl shadow-sm border-gray-100">
                <CardContent className="p-6 space-y-3">
                  <p className="text-lg leading-relaxed text-gray-700">“{t.quote}”</p>
                  <div className="text-sm text-gray-600">
                    {t.name} · {t.context}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact anchor for links; subscribe form lives in footer */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-3xl font-bold">Get in touch</h3>
            <p className="mt-2 text-gray-300">
              Questions about programs or partnerships? Send us a note and we’ll respond soon.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              We respect your privacy. Your message is used only to respond to your inquiry.
            </p>
          </div>
          <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-6">
            <FeedbackForm
              title="Send a message"
              placeholder="How can we help?"
              className="text-gray-900"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const fallbackEvents: SanityEvent[] = [
  { _id: "fallback-e1", title: "Spring Cultural Festival", date: "2025-04-12", summary: "A celebration of music, dance, and regional cuisines.", image: { url: "/images/event4.jpeg", alt: "Spring Cultural Festival" } },
  { _id: "fallback-e2", title: "Volunteer Onboarding", date: "2025-05-04", summary: "Learn how to get involved and support our programs.", image: { url: "/images/event2.jpeg", alt: "Volunteer Onboarding" } },
  { _id: "fallback-e3", title: "Heritage Story Night", date: "2025-06-20", summary: "Community storytelling and intergenerational dialogues.", image: { url: "/images/event7.jpeg", alt: "Heritage Story Night" } },
];

const fallbackStats: SanityImpactStat[] = [
  { value: "5k+", label: "Event Attendees" },
  { value: "120+", label: "Active Volunteers" },
  { value: "40+", label: "Annual Programs" },
  { value: "10+", label: "Partner Orgs" },
];

const testimonials = [
  {
    name: "Aisha K.",
    context: "Parent, Cultural Workshops",
    quote:
      "The workshops helped my kids connect with their roots and make new friends. We felt welcomed from the very first day.",
  },
  {
    name: "Ravi P.",
    context: "Volunteer",
    quote:
      "Volunteering with SAHAHR has been rewarding. The team is organized and truly cares about the community.",
  },
  {
    name: "Farah S.",
    context: "Newcomer",
    quote:
      "The events and resources made settling in Hamilton easier. I met mentors who guided me through my first months.",
  },
];

const impactIcons = [Users, HandHeart, Globe2, BarChart3];

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
