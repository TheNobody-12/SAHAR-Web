// app/about/page.tsx
// (Server Component by default — no 'use client')
import {
  Card as UICard,
  CardContent as UICardContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
} from "@/components/ui/card";
import Carousel from "@/components/carousel";
import {
  Facebook,
  HandHeart,
  Instagram,
  Linkedin,
  Twitter,
  Users,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const BOARD = [
  { name: "Member 1", title: "President", img: "/images/avatar.svg", bio: "Leads strategy and partnerships." },
  { name: "Member 2", title: "Vice President", img: "/images/avatar.svg", bio: "Supports programs and governance." },
  { name: "Member 3", title: "Treasurer", img: "/images/avatar.svg", bio: "Oversees finances and reporting." },
  { name: "Member 4", title: "Secretary", img: "/images/avatar.svg", bio: "Coordinates meetings and records." },
  { name: "Member 5", title: "Board Member", img: "/images/avatar.svg", bio: "Program liaison." },
  { name: "Member 6", title: "Board Member", img: "/images/avatar.svg", bio: "Community outreach." },
  { name: "Member 7", title: "Board Member", img: "/images/avatar.svg", bio: "Volunteer coordination." },
  { name: "Member 8", title: "Board Member", img: "/images/avatar.svg", bio: "Partnerships and sponsorships." },
];

const missionCards = [
  {
    title: "Mission",
    icon: Globe2,
    points: [
      "Celebrate South Asian heritage through culture, arts, and language.",
      "Offer programs that promote belonging, learning, and well‑being.",
    ],
  },
  {
    title: "Vision",
    icon: Users,
    points: [
      "An inclusive Hamilton where diversity is embraced.",
      "Communities thrive through connection and shared stories.",
    ],
  },
  {
    title: "Values",
    icon: HandHeart,
    points: [
      "Community • Inclusion • Respect • Collaboration • Transparency.",
    ],
  },
];

const partners = [
  { name: "Community Partner 1" },
  { name: "Community Partner 2" },
  { name: "Sponsor A" },
  { name: "Sponsor B" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Full‑width hero */}
      <section className="relative w-full h-[48vh] md:h-[60vh] lg:h-[68vh]">
        <Image
          src="/images/event5.jpeg"
          alt="SAHAHR community gathering"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/25 to-black/5" />
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto h-full px-4 flex items-end pb-10">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
                Belonging Through Culture and Community
              </h1>
              <p className="mt-3 max-w-2xl text-white/90">
                We celebrate South Asian heritage and strengthen connections across Hamilton & Region.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="#mission">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Slideshow Carousel */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Carousel
            aspectClassName="aspect-[16/9]"
            images={[
              { src: "/images/event1.jpeg", alt: "Festival highlights" },
              { src: "/images/event4.jpeg", alt: "Community workshop" },
              { src: "/images/event5.jpeg", alt: "Cultural performance" },
            ]}
          />
        </div>
      </section>

      {/* About intro */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold">About SAHAHR</h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            South Asian Heritage Association of Hamilton and Region exists to educate, celebrate, and connect our community through programs that honor culture, language, and shared experiences.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section id="mission" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {missionCards.map((m) => (
            <UICard key={m.title} className="rounded-2xl shadow-sm border-gray-100">
              <UICardHeader className="space-y-3">
                <div className="h-11 w-11 rounded-xl bg-rose-50 text-rose-700 grid place-items-center">
                  <m.icon className="h-5 w-5" />
                </div>
                <UICardTitle>{m.title}</UICardTitle>
              </UICardHeader>
              <UICardContent className="text-gray-700 space-y-2">
                {m.points.map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                    <p>{p}</p>
                  </div>
                ))}
              </UICardContent>
            </UICard>
          ))}
        </div>
      </section>

      {/* Constitution / By-Laws */}
      <section id="bylaws" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Constitution or By‑Laws
          </h2>
          <UICard className="rounded-2xl">
            <UICardHeader>
              <UICardTitle>SAHAHR By‑Laws</UICardTitle>
              <p className="text-gray-600 text-sm">
                By‑laws of South Asian Heritage Association of Hamilton and
                Region (SAHAHR) — 6 February 2021
              </p>
            </UICardHeader>
            <UICardContent className="space-y-6 text-gray-700">
              <p>
                Download the full by‑laws{" "}
                <a
                  className="text-rose-700 underline"
                  href="/documents/sahahr-by-laws.pdf"
                >
                  here
                </a>
                . Below is a quick summary of key objectives.
              </p>

              <div>
                <h3 className="font-semibold text-lg">Key Objectives</h3>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Showcase South Asian culture through festivals, arts, and educational programs.</li>
                  <li>Support newcomers, youth, and seniors with community resources and mentorship.</li>
                  <li>Promote inclusion and civic engagement with partners across Hamilton & Region.</li>
                  <li>Foster cooperation among community members and partner organizations.</li>
                  <li>Remain non-partisan and respectful of all backgrounds.</li>
                </ul>
              </div>
            </UICardContent>
          </UICard>
        </div>
      </section>

      {/* Board of Directors */}
      <section id="board" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Board of Directors
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {BOARD.slice(0,4).map((m, i) => (
              <UICard
                key={m.name}
                className={`overflow-hidden shadow-sm border-gray-200 transition-all ${
                  i % 2 ? 'card-swoop-bl' : 'card-swoop-br'
                } hover:shadow-lg hover:-translate-y-1`}
              >
                <div
                  className="h-48 bg-gray-100"
                  style={
                    m.img
                      ? {
                          backgroundImage: `url(${m.img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                  role="img"
                  aria-label={`${m.name} headshot`}
                />
                <UICardContent className="p-5">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-gray-600 text-sm">{m.title}</div>
                  <p className="mt-2 text-sm text-gray-600">{m.bio}</p>
                  <div className="mt-3 flex items-center gap-3 text-gray-500">
                    <a href="#" aria-label={`${m.name} on Facebook`} className="hover:text-rose-700">
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label={`${m.name} on Instagram`} className="hover:text-rose-700">
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label={`${m.name} on Twitter`} className="hover:text-rose-700">
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label={`${m.name} on LinkedIn`} className="hover:text-rose-700">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </UICardContent>
              </UICard>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Partners & Sponsors
            </h2>
            <Button variant="outline" asChild>
              <Link href="/contact">Become a partner</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {partners.map((p) => (
              <div
                key={p.name}
                className="h-16 rounded-xl bg-white border border-gray-200 shadow-sm grid place-items-center px-3"
              >
                <span className="text-gray-700 text-sm font-medium">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold">Volunteer with us</h3>
            <p className="text-gray-600 mt-2">
              Join our events, youth programs, and cultural celebrations. Your skills and time help us reach more families.
            </p>
          </div>
          <div className="text-right">
            <Button asChild size="lg">
              <Link href="/contact">Sign up to volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact blurb */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Work with us</h3>
            <p className="text-gray-600 mt-2">
              Interested in partnering, volunteering, or joining our board? We’d
              love to connect.
            </p>
          </div>
          <div className="text-right">
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-rose-600 text-white hover:bg-rose-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
