// app/about/page.tsx
// (Server Component by default — no 'use client')
import {
  Card as UICard,
  CardContent as UICardContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
} from "@/components/ui/card";
import Carousel from "@/components/carousel";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const BOARD = [
  { name: "Member 1", title: "Board Member", img: "/images/avatar.svg" },
  { name: "Member 2", title: "Board Member", img: "/images/avatar.svg" },
  { name: "Member 3", title: "Board Member", img: "/images/avatar.svg" },
  { name: "Member 4", title: "Board Member", img: "/images/avatar.svg" },
  { name: "Member 5", title: "Board Member", img: "/images/avatar.svg" },
  { name: "Member 6", title: "Board Member", img: "/images/avatar.svg" },
  { name: "Member 7", title: "Board Member", img: "/images/avatar.svg" },
  { name: "Member 8", title: "Board Member", img: "/images/avatar.svg" },
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto h-full px-4 flex items-end pb-10">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
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
            South Asian Heritage Association of Hamilton and Region exists to
            educate the public on matters relating to the rich heritage,
            culture, history, traditions,and languages of South Asian community
            by providing courses, seminars,workshops and other educational
            programs on such matters. The Organization will also work with other
            charitable, educational or Governmental agencies in program to
            advance the South Asian Culture, Traditions art and language.{" "}
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section id="mission" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <UICard className="rounded-2xl">
            <UICardHeader>
              <UICardTitle>Mission</UICardTitle>
            </UICardHeader>
            <UICardContent className="text-gray-700">
              To celebrate South Asian heritage and support our community
              through programs that promote belonging, learning, and well-being.
            </UICardContent>
          </UICard>
          <UICard className="rounded-2xl">
            <UICardHeader>
              <UICardTitle>Vision</UICardTitle>
            </UICardHeader>
            <UICardContent className="text-gray-700">
              A connected, inclusive Hamilton where diversity is embraced and
              everyone can thrive.
            </UICardContent>
          </UICard>
          <UICard className="rounded-2xl">
            <UICardHeader>
              <UICardTitle>Values</UICardTitle>
            </UICardHeader>
            <UICardContent className="text-gray-700">
              Community • Inclusion • Respect • Collaboration • Transparency.
            </UICardContent>
          </UICard>
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
                You can download a copy of the by‑laws{" "}
                <a
                  className="text-rose-700 underline"
                  href="/documents/sahahr-by-laws.pdf"
                >
                  here
                </a>
                .
              </p>

              <div>
                <h3 className="font-semibold text-lg">Vision</h3>
                <p className="mt-2">
                  We envision a community that is inclusive, democratic,
                  respects and celebrates the cultural diversity of Canada, and
                  where the South Asian community plays an active and integrated
                  role in all aspects of civic, political, social and cultural
                  life of Canada.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Mission</h3>
                <p className="mt-2">
                  Our mission is to educate, showcase and promote the cultures
                  of South Asia through cultural, literary and other events in
                  Hamilton and beyond.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Objectives</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>
                    Promote a positive image of the South Asian community in
                    Hamilton and Region by showcasing South Asian cultures.
                  </li>
                  <li>
                    Enable and facilitate South Asian Canadians to participate
                    and integrate in the civic, social and cultural life of
                    Canada.
                  </li>
                  <li>
                    Promote the interests and rights of the South Asian Canadian
                    community through partnerships with municipal, provincial
                    and federal bodies and other organizations in Hamilton.
                  </li>
                  <li>
                    Instill in youth of South Asian origin a sense of pride in
                    their cultural heritage.
                  </li>
                  <li>
                    Foster and encourage cooperation among members and with
                    other organizations.
                  </li>
                  <li>
                    Support social and cultural activities while not affiliating
                    SAHAHR with any religious or political activities.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Definitions</h3>
                <p className="mt-2">
                  “South Asia” includes Afghanistan, Bangladesh, Bhutan, India,
                  Maldives, Nepal, Pakistan, and Sri Lanka. “People of South
                  Asian origin” are individuals who trace their ancestry from
                  any country of South Asia, irrespective of their place of
                  birth or residence.
                </p>
              </div>

              <details className="mt-2">
                <summary className="cursor-pointer font-medium text-gray-800">
                  More by‑law notes
                </summary>
                <div className="mt-3 space-y-3 text-gray-700">
                  <p>
                    The by‑laws relate to the transaction of SAHAHR’s affairs.
                    They will be reviewed every 5 years during a strategic
                    review. Amendments can be made by the Board and ratified by
                    the General Body as needed.
                  </p>
                  <p>
                    An Appendix contains information that may change from time
                    to time and can be revised by the Secretary with Board
                    approval; prior versions are retained as historical records
                    with effective dates.
                  </p>
                </div>
              </details>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Partners & Sponsors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="h-16 rounded-xl bg-gray-100" />
            <div className="h-16 rounded-xl bg-gray-100" />
            <div className="h-16 rounded-xl bg-gray-100" />
            <div className="h-16 rounded-xl bg-gray-100" />
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
