// app/about/page.tsx
// (Server Component by default — no 'use client')
import {
  Card as UICard,
  CardContent as UICardContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
} from "@/components/ui/card";
import Carousel from "@/components/carousel";
import BoardMembersFeature, { type BoardMember, type SanityBoardMember } from "@/components/board/BoardMembersFeature";
import { sanityClient, sanityFetch } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { HandHeart, Users, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Ensure we always fetch fresh board data from Sanity (no stale cache).
export const revalidate = 0;

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
  { name: "City of Hamilton Enrichment Fund", img: "/sponsors/city-of-hamilton.png" },
  { name: "CUPE 3906", img: "/sponsors/cupe-3906.png" },
  { name: "GSA McMaster University", img: "/sponsors/gsa-mcmaster.png" },
  { name: "Government of Canada", img: "/sponsors/canada-wordmark.png" },
];

const FALLBACK_BOARD_MEMBERS: BoardMember[] = [
  {
    id: "member-1",
    name: "Member 1",
    role: "President",
    img: "/images/avatar.svg",
    bio: "Leads strategy and partnerships.",
    order: 1,
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "member-2",
    name: "Member 2",
    role: "Vice President",
    img: "/images/avatar.svg",
    bio: "Supports programs and governance.\n\nBorn and raised in Nepal, Kusum Bhatta is pursuing her Ph.D. in the School of Social Work at McMaster University, where she obtained her Master's degree in Gender Studies and Feminist Research. She is the co-chair of the Women's Committee, serving as a President of the Graduate Student Association, Vice President of CUPE 3906, and representing Social Sciences as a student senate representative at McMaster University. Her research and advocacy efforts draw attention to the essential contributions of immigrant aging women of color, who are often undervalued and unrecognized for their care work.",
    order: 2,
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "member-3",
    name: "Member 3",
    role: "Treasurer",
    img: "/images/avatar.svg",
    bio: "Oversees finances and reporting.",
    order: 3,
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "member-4",
    name: "Member 4",
    role: "Secretary",
    img: "/images/avatar.svg",
    bio: "Coordinates meetings and records.",
    order: 4,
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "member-5",
    name: "Member 5",
    role: "Board Member",
    img: "/images/avatar.svg",
    bio: "Program liaison.",
    order: 5,
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "member-6",
    name: "Member 6",
    role: "Board Member",
    img: "/images/avatar.svg",
    bio: "Community outreach.",
    order: 6,
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "member-7",
    name: "Member 7",
    role: "Board Member",
    img: "/images/avatar.svg",
    bio: "Volunteer coordination.",
    order: 7,
    facebookUrl: "https://facebook.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "member-8",
    name: "Member 8",
    role: "Board Member",
    img: "/images/avatar.svg",
    bio: "Partnerships and sponsorships.",
    order: 8,
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
];

type BoardDataResult = { members: BoardMember[]; reason?: string };

function portableTextToPlainText(blocks?: SanityBoardMember["bio"]): string {
  if (!blocks?.length) return "";
  return blocks
    .map((block) => block?.children?.map((child) => child?.text ?? "").join("").trim() ?? "")
    .filter(Boolean)
    .join("\n\n");
}

const imageBuilder = createImageUrlBuilder(sanityClient);

function buildBoardImageUrl(photo?: SanityBoardMember["photo"]) {
  if (!photo?.asset?._ref) return photo?.asset?.url;
  return imageBuilder
    .image({
      _type: "image",
      asset: { _ref: photo.asset._ref },
      crop: photo.crop,
      hotspot: photo.hotspot,
    })
    .width(800)
    .height(800)
    .fit("crop")
    .auto("format")
    .url();
}

function normalizeSanityBoardMembersServer(docs: SanityBoardMember[]): BoardMember[] {
  return docs.map((doc) => {
    const bio = portableTextToPlainText(doc.bio);
    return {
      id: doc._id,
      name: doc.name,
      role: doc.role,
      group: doc.isExecutive ? "executive" : undefined,
      order: doc.order,
      photoUrl: buildBoardImageUrl(doc.photo),
      photoAlt: doc.photo?.alt,
      bio: bio || "",
      facebookUrl: doc.facebookUrl,
      instagramUrl: doc.instagramUrl,
      twitterUrl: doc.twitterUrl,
      linkedinUrl: doc.linkedinUrl,
    };
  });
}

async function getBoardMembers(): Promise<BoardDataResult> {
  try {
    const docs = await sanityFetch<SanityBoardMember[]>({
      query: `
        *[_type == "boardMember"] | order(order asc) {
          _id,
          name,
          role,
          isExecutive,
          order,
          photo{
            asset->{_ref, url},
            crop,
            hotspot,
            alt
          },
          bio,
          facebookUrl,
          instagramUrl,
          twitterUrl,
          linkedinUrl
        }
      `,
      revalidate: 0,
    });

    const normalized = normalizeSanityBoardMembersServer(docs);
    if (normalized.length) return { members: normalized };
    return { members: FALLBACK_BOARD_MEMBERS, reason: "No published board members found in Sanity (boardMember collection is empty)." };
  } catch (error) {
    return {
      members: FALLBACK_BOARD_MEMBERS,
      reason: `Failed to load from Sanity: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export default async function AboutPage() {
  const boardData = await getBoardMembers();
  const boardMembers = boardData.members;
  const usingFallback = boardData.reason !== undefined;

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

      {/* Board of Directors - integrated feature */}
      <section id="board" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {usingFallback && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {boardData.reason}
            </div>
          )}
          <BoardMembersFeature members={boardMembers} />
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
                className="h-24 rounded-xl bg-white border border-gray-200 shadow-sm grid place-items-center px-3"
              >
                {p.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-h-16 max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-gray-700 text-sm font-medium">
                    {p.name}
                  </span>
                )}
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
