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
  Music,
  Heart,
  BookOpen,
  MapPin,
  UsersRound,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroMosaic from "@/components/hero-mosaic";
import AuroraBackground from "@/components/aurora-background";
import { SanityEvent, SanityImpactStat } from "@/lib/types";
import FeedbackForm from "@/components/feedback-form";
import RangoliDivider from "@/components/rangoli-divider";
import CountUp from "@/components/count-up";
import ProgramCard from "@/components/program-card";
import TestimonialCard from "@/components/testimonial-card";

type Props = {
  events: SanityEvent[];
  stats: SanityImpactStat[];
};

const programs = [
  {
    icon: Music,
    title: "Cultural Festivals",
    description:
      "Mega festivals and community celebrations that bring together thousands to experience the richness of South Asian culture through music, dance, food, and art.",
  },
  {
    icon: Sparkles,
    title: "Youth Programs",
    description:
      "Leadership development, mentorship, and cultural education designed to help young people connect with their heritage while building skills for the future.",
  },
  {
    icon: Heart,
    title: "Senior Support",
    description:
      "Social connection and wellness activities that ensure our elders remain engaged, supported, and celebrated as vital members of the community.",
  },
  {
    icon: MapPin,
    title: "Newcomer Resources",
    description:
      "Settlement support and community navigation to help new arrivals find their footing, build networks, and feel at home in Hamilton.",
  },
  {
    icon: BookOpen,
    title: "Language & Arts",
    description:
      "Workshops in South Asian languages, classical music, traditional dance, and crafts that keep cultural knowledge alive across generations.",
  },
  {
    icon: UsersRound,
    title: "Volunteer Network",
    description:
      "Meaningful opportunities to give back, develop new skills, and build lasting friendships while supporting community initiatives.",
  },
];

export function HomeClient({ events, stats }: Props) {
  const eventCards = events;
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
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 hover:text-white">
                <Link href="/contact">Become a Member</Link>
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
        <div className="relative z-10 border-t border-white/10 mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-white/50 text-sm mb-4">Supported by</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <img src="/sponsors/city-of-hamilton.png" alt="City of Hamilton" className="h-12 w-auto object-contain" />
              <img src="/sponsors/cupe-3906.png" alt="CUPE 3906" className="h-12 w-auto object-contain" />
              <img src="/sponsors/gsa-mcmaster.png" alt="McMaster GSA" className="h-12 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-16 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Building community through culture, education, and support for every generation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <ProgramCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
      <RangoliDivider />

      {/* Events */}
      {eventCards.length > 0 && (
        <section id="events" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {eventCards.map((e, i) => (
                <Card
                  key={e._id || e.title}
                  className={`overflow-hidden flex flex-col ${
                    i % 2 ? "card-swoop-br" : "card-swoop-bl"
                  }`}
                >
                  <Link
                    href={e.slug ? `/events/${e.slug}` : (e.registerUrl || "#")}
                    className="relative block w-full aspect-[4/3] bg-gray-100 hover:opacity-90 transition-opacity overflow-hidden"
                  >
                    <Image
                      src={e.image?.url || "/images/placeholder-event.svg"}
                      alt={e.image?.alt || e.title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-rose-700 font-medium mb-2">
                      <Calendar className="h-4 w-4" /> {formatDate(e.date)}
                    </div>
                    <h3 className="font-semibold text-lg">{e.title}</h3>
                    <p className="text-gray-600 mt-1 flex-1">{e.summary}</p>
                    <div className="mt-4 flex gap-2">
                      {e.registerUrl && (
                        <Button className="flex-1" asChild>
                          <Link href={e.registerUrl}>Register</Link>
                        </Button>
                      )}
                      {e.slug && (
                        <Button variant={e.registerUrl ? "outline" : "default"} asChild className="flex-1">
                          <Link href={`/events/${e.slug}`}>More Details</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact */}
      <section id="impact" className="py-16 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Community Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((s, idx) => {
              const Icon = impactIcons[idx % impactIcons.length];
              return (
                <motion.div
                  key={`${s.label}-${s.value}-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="rounded-2xl text-center shadow-sm border-gray-100 bg-white">
                    <CardContent className="p-6 space-y-3">
                      <div className="mx-auto h-11 w-11 rounded-xl bg-rose-50 text-rose-700 grid place-items-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-4xl font-extrabold" style={{ fontFamily: "var(--font-playfair), serif" }}>
                        <CountUp value={s.value} />
                      </div>
                      <div className="text-gray-600">{s.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
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
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.name}
                quote={t.quote}
                name={t.name}
                context={t.context}
                index={i}
              />
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
