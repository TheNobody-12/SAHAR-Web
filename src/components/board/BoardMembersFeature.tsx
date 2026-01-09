"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

/**
 * Board Members UI Feature (matches your UICard design)
 * - Executive Team: image-header cards (sm:2 cols, md:4 cols)
 * - Board Members: mobile accordion + desktop grid, reusing the same card look
 * - Social icons render ONLY when a URL exists (no href="#")
 *
 * Integration options:
 * - If your repo already has UICard/UICardContent + lucide-react icons, pass them via props.
 * - Otherwise, internal fallbacks render fine.
 */

export type BoardMember = {
  id: string;
  name: string;
  role: string; // e.g., President, Vice President, Treasurer, Secretary, Board Member
  group?: "executive" | "board"; // optional; auto-derived if absent
  order?: number; // allow ordering from CMS

  // Image
  img?: string; // matches your existing data shape
  photoUrl?: string; // optional alias
  photoAlt?: string;

  // Content
  bio: string; // supports multi-paragraph with "\n\n" breaks

  // Social links
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
};

// Sanity-friendly input shape; convert with normalizeSanityBoardMembers below.
export type SanityBoardMember = {
  _id: string;
  name: string;
  role: string;
  isExecutive?: boolean;
  order?: number;
  photo?: {
    asset?: { url?: string; _ref?: string };
    alt?: string;
    crop?: unknown;
    hotspot?: unknown;
  };
  bio?: Array<{
    _type?: string;
    children?: Array<{ _type?: string; text?: string }>;
  }>;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
};

function portableTextToPlainText(blocks?: SanityBoardMember["bio"]): string {
  if (!blocks?.length) return "";
  return blocks
    .map((block) =>
      block?.children
        ?.map((child) => child?.text ?? "")
        .join("")
        .trim() ?? ""
    )
    .filter(Boolean)
    .join("\n\n");
}

export function normalizeSanityBoardMembers(docs: SanityBoardMember[]): BoardMember[] {
  return docs.map((doc) => {
    const bio = portableTextToPlainText(doc.bio);
    return {
      id: doc._id,
      name: doc.name,
      role: doc.role,
      group: doc.isExecutive ? "executive" : undefined,
      order: doc.order,
      photoUrl: doc.photo?.asset?.url,
      photoAlt: doc.photo?.alt,
      bio: bio || "",
      facebookUrl: doc.facebookUrl,
      instagramUrl: doc.instagramUrl,
      twitterUrl: doc.twitterUrl,
      linkedinUrl: doc.linkedinUrl,
    };
  });
}

export type ExternalCardComponents = {
  UICard?: React.ComponentType<React.ComponentProps<"div">>;
  UICardContent?: React.ComponentType<React.ComponentProps<"div">>;
};

export type ExternalIcons = {
  Facebook?: React.ComponentType<{ className?: string }>;
  Instagram?: React.ComponentType<{ className?: string }>;
  Twitter?: React.ComponentType<{ className?: string }>;
  Linkedin?: React.ComponentType<{ className?: string }>;
};

// --------- Sample data (replace with your real BOARD array / Sanity fetch) ---------
const sampleMembers: BoardMember[] = [
  {
    id: "1",
    name: "President Name",
    role: "President",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    photoAlt: "President Name, President",
    bio: "Short intro paragraph for the President.\n\nSecond paragraph with more details and contributions.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "2",
    name: "Vice President Name",
    role: "Vice President",
    img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Vice President Name, Vice President",
    bio: "Bio for Vice President.\n\nMore details here.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "3",
    name: "Treasurer Name",
    role: "Treasurer",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Treasurer Name, Treasurer",
    bio: "Bio for Treasurer.\n\nMore details here.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "4",
    name: "Secretary Name",
    role: "Secretary",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Secretary Name, Secretary",
    bio: "Bio for Secretary.\n\nMore details here.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "5",
    name: "Board Member One",
    role: "Board Member",
    img: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Board Member One, Board Member",
    bio: "Board member bio goes here.\n\nSecond paragraph.",
    twitterUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "6",
    name: "Board Member Two",
    role: "Board Member",
    img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Board Member Two, Board Member",
    bio: "Board member bio goes here.\n\nSecond paragraph.\n\nThird paragraph.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
  },
];

const EXEC_ROLES = new Set([
  "President",
  "Vice President",
  "Treasurer",
  "Secretary",
  "Cultural Secretary",
]);

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useIsDesktop(breakpointPx = 1024) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpointPx]);
  return isDesktop;
}

export function splitIntoParagraphs(bio: string): string[] {
  // Paragraphs are separated by one or more blank lines.
  return bio
    .split(/\n\n+/g)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function getBioPreview(bio: string): string {
  return splitIntoParagraphs(bio)[0]?.trim() ?? "";
}

// --------- Fallback Card components (so this file runs standalone) ---------
function FallbackCard(props: React.ComponentProps<"div">) {
  return <div {...props} />;
}

function FallbackCardContent(props: React.ComponentProps<"div">) {
  return <div {...props} />;
}

// --------- Fallback Icons (if you don't pass lucide icons) ---------
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        {children}
      </svg>
    </span>
  );
}

function FacebookFallback({ className }: { className?: string }) {
  return (
    <span className={className}>
      <Icon>
        <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.2-1.5 1.6-1.5H16.7V5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V11H7v3h2.7v8h3.8z" />
      </Icon>
    </span>
  );
}

function InstagramFallback({ className }: { className?: string }) {
  return (
    <span className={className}>
      <Icon>
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 4a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.2-.7a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
      </Icon>
    </span>
  );
}

function TwitterFallback({ className }: { className?: string }) {
  return (
    <span className={className}>
      <Icon>
        <path d="M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.3-1.2 1.6-2.1-.7.4-1.6.7-2.4.9A3.7 3.7 0 0012.6 8c0 .3 0 .6.1.8-3-.2-5.7-1.6-7.4-3.9-.3.6-.5 1.2-.5 1.9 0 1.3.7 2.5 1.7 3.2-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.4 3.5 3.3 3.9-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 1.7 2.2 2.9 4.1 2.9A7.5 7.5 0 012 18.4 10.6 10.6 0 007.7 20c6.9 0 10.7-5.8 10.7-10.7v-.5c.7-.5 1.3-1.1 1.8-1.8z" />
      </Icon>
    </span>
  );
}

function LinkedinFallback({ className }: { className?: string }) {
  return (
    <span className={className}>
      <Icon>
        <path d="M6.5 7.2A1.7 1.7 0 116.5 4a1.7 1.7 0 010 3.2zM5 20h3V9H5v11zm5-11h2.9v1.5h.1c.4-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2.2 3.9 5v6.1h-3v-5.4c0-1.3 0-2.9-1.8-2.9-1.8 0-2.1 1.4-2.1 2.8V20h-3V9z" />
      </Icon>
    </span>
  );
}

type SocialKind = "facebook" | "instagram" | "twitter" | "linkedin";

function SocialLink({
  kind,
  href,
  label,
  icons,
}: {
  kind: SocialKind;
  href: string;
  label: string;
  icons: Required<ExternalIcons>;
}) {
  const IconComp =
    kind === "facebook"
      ? icons.Facebook
      : kind === "instagram"
      ? icons.Instagram
      : kind === "twitter"
      ? icons.Twitter
      : icons.Linkedin;

  return (
    <a
      href={href}
      aria-label={label}
      className="hover:text-rose-700"
      target={href === "#" ? undefined : "_blank"}
      rel={href === "#" ? undefined : "noreferrer"}
    >
      <IconComp className="h-4 w-4" />
    </a>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40"
      />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function MemberImageCard({
  member,
  index,
  Card,
  CardContent,
  icons,
  onOpen,
  clampLines = 3,
}: {
  member: BoardMember;
  index: number;
  Card: React.ComponentType<React.ComponentProps<"div">>;
  CardContent: React.ComponentType<React.ComponentProps<"div">>;
  icons: Required<ExternalIcons>;
  onOpen?: (m: BoardMember) => void;
  clampLines?: number;
}) {
  const img = member.img ?? member.photoUrl;
  const preview = useMemo(() => getBioPreview(member.bio), [member.bio]);

  const lineClampClass =
    clampLines === 2
      ? "line-clamp-2"
      : clampLines === 3
      ? "line-clamp-3"
      : clampLines === 4
      ? "line-clamp-4"
      : "line-clamp-3";

  return (
    <Card
      className={cn(
        "overflow-hidden shadow-sm border border-gray-200 transition-all",
        index % 2 ? "card-swoop-bl" : "card-swoop-br",
        "hover:shadow-lg hover:-translate-y-1"
      )}
    >
      <div className="relative w-full bg-gray-100">
        {img ? (
          <div className="relative w-full min-h-[220px]">
            <Image
              src={img}
              alt={member.photoAlt || `${member.name} headshot`}
              fill
              className="object-contain lg:object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              priority={index < 4}
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-gray-100" aria-label={`${member.name} headshot`} />
        )}
      </div>

      <CardContent className="p-5">
        <div className="font-semibold">{member.name}</div>
        <div className="text-gray-600 text-sm">{member.role}</div>

        <p className={cn("mt-2 text-sm text-gray-600", lineClampClass)}>
          {preview}
        </p>

        <div className="mt-3 flex items-center gap-3 text-gray-500">
          {(["facebook", "instagram", "twitter", "linkedin"] as SocialKind[]).map((kind) => (
            <SocialLink
              key={kind}
              kind={kind}
              href={
                kind === "facebook"
                  ? member.facebookUrl ?? "#"
                  : kind === "instagram"
                  ? member.instagramUrl ?? "#"
                  : kind === "twitter"
                  ? member.twitterUrl ?? "#"
                  : member.linkedinUrl ?? "#"
              }
              label={`${member.name} on ${kind[0].toUpperCase()}${kind.slice(1)}`}
              icons={icons}
            />
          ))}

          {(member.bio?.length ?? 0) > 0 && (
            <button
              onClick={() => onOpen?.(member)}
              className={cn(
                "ml-auto text-sm font-medium text-gray-700 hover:text-rose-700",
                "ml-0 lg:ml-auto"
              )}
            >
              Read more
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MobileAccordionList({
  members,
  icons,
}: {
  members: BoardMember[];
  icons: Required<ExternalIcons>;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white shadow-sm">
      {members.map((m) => {
        const open = openId === m.id;
        const img = m.img ?? m.photoUrl;

        return (
          <div key={m.id} className="p-4">
            <button
              onClick={() => setOpenId(open ? null : m.id)}
              className="flex w-full items-start gap-4 text-left"
              aria-expanded={open}
            >
              <div
                className="h-16 w-16 shrink-0 rounded-2xl bg-zinc-100"
                style={
                  img
                    ? {
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
                role="img"
                aria-label={`${m.name} headshot`}
              />

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-zinc-900">
                  {m.name}
                </div>
                <div className="text-sm text-zinc-600">{m.role}</div>
                <div
                  className={cn(
                    "mt-2 text-sm text-zinc-600",
                    open ? "" : "line-clamp-2"
                  )}
                >
                  {/* {open ? getBioPreview(m.bio) : getBioPreview(m.bio)} */}
                </div>
              </div>

              <div className="mt-1 shrink-0 text-zinc-400">
                {open ? "−" : "+"}
              </div>
            </button>

            {open && (
              <div className="mt-4 pl-20">
                {splitIntoParagraphs(m.bio).map((p, i) => (
                  <p
                    key={i}
                    className="mt-3 text-sm leading-6 text-zinc-700 first:mt-0"
                  >
                    {p}
                  </p>
                ))}

                <div className="mt-3 flex items-center gap-3 text-gray-500">
                  {(["facebook", "instagram", "twitter", "linkedin"] as SocialKind[]).map((kind) => (
                    <SocialLink
                      key={kind}
                      kind={kind}
                      href={
                        kind === "facebook"
                          ? m.facebookUrl ?? "#"
                          : kind === "instagram"
                          ? m.instagramUrl ?? "#"
                          : kind === "twitter"
                          ? m.twitterUrl ?? "#"
                          : m.linkedinUrl ?? "#"
                      }
                      label={`${m.name} on ${kind[0].toUpperCase()}${kind.slice(1)}`}
                      icons={icons}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BoardMembersFeature({
  members = sampleMembers,
  executiveRoles = ["President", "Vice President", "Treasurer", "Secretary"],
  components,
  icons,
}: {
  members?: BoardMember[];
  executiveRoles?: string[];
  components?: ExternalCardComponents;
  icons?: ExternalIcons;
}) {
  const isDesktop = useIsDesktop(1024);
  const [active, setActive] = useState<BoardMember | null>(null);

  const Card = components?.UICard ?? FallbackCard;
  const CardContent = components?.UICardContent ?? FallbackCardContent;

  const resolvedIcons: Required<ExternalIcons> = {
    Facebook: icons?.Facebook ?? ((p) => <FacebookFallback {...p} />),
    Instagram: icons?.Instagram ?? ((p) => <InstagramFallback {...p} />),
    Twitter: icons?.Twitter ?? ((p) => <TwitterFallback {...p} />),
    Linkedin: icons?.Linkedin ?? ((p) => <LinkedinFallback {...p} />),
  };

  const { executive, board } = useMemo(() => {
    const execSet = new Set(executiveRoles.map((r) => r.toLowerCase()));
    const ex: BoardMember[] = [];
    const bo: BoardMember[] = [];

    for (const m of members) {
      const group =
        m.group ??
        (execSet.has(m.role.toLowerCase()) || EXEC_ROLES.has(m.role)
          ? "executive"
          : "board");
      (group === "executive" ? ex : bo).push(m);
    }

    // Keep executive in the provided order if possible
    ex.sort((a, b) => {
      const ia = executiveRoles.findIndex(
        (r) => r.toLowerCase() === a.role.toLowerCase()
      );
      const ib = executiveRoles.findIndex(
        (r) => r.toLowerCase() === b.role.toLowerCase()
      );
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    // Board alphabetical
    bo.sort((a, b) => a.name.localeCompare(b.name));

    return { executive: ex, board: bo };
  }, [members, executiveRoles]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Board of Directors
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600">
          Meet the leaders and volunteers supporting SAHAHR’s mission.
        </p>
      </div>

      {/* Executive Team (Top 4) - matches your snippet */}
      <section id="board" className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Executive Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {executive.slice(0, 4).map((m, i) => (
            <MemberImageCard
              key={m.id}
              member={m}
              index={i}
              Card={Card}
              CardContent={CardContent}
              icons={resolvedIcons}
              onOpen={(mm) => setActive(mm)}
              clampLines={3}
            />
          ))}
        </div>

        {/* Remaining executives (if any beyond 4) */}
        {executive.length > 4 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Other Executive Roles
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {executive.slice(4).map((m, i) => (
                <MemberImageCard
                  key={m.id}
                  member={m}
                  index={i}
                  Card={Card}
                  CardContent={CardContent}
                  icons={resolvedIcons}
                  onOpen={(mm) => setActive(mm)}
                  clampLines={3}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Board Members */}
      <div className="pb-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Board Members</h2>
          <div className="text-sm text-zinc-600">{board.length} members</div>
        </div>

        {/* Mobile: accordion list */}
        <div className="lg:hidden">
          <MobileAccordionList members={board} icons={resolvedIcons} />
        </div>

        {/* Desktop: grid using same card style */}
        <div className="hidden lg:block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {board.map((m, i) => (
              <MemberImageCard
                key={m.id}
                member={m}
                index={i}
                Card={Card}
                CardContent={CardContent}
                icons={resolvedIcons}
                onOpen={(mm) => setActive(mm)}
                clampLines={3}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active ? `${active.name} • ${active.role}` : ""}
      >
        {active && (
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="sm:w-44">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-100 shadow-sm"
                style={
                  active.img || active.photoUrl
                    ? {
                        backgroundImage: `url(${active.img ?? active.photoUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
                role="img"
                aria-label={`${active.name} headshot`}
              />

              <div className="mt-4 flex items-center gap-3 text-gray-500">
                {(["facebook", "instagram", "twitter", "linkedin"] as SocialKind[]).map((kind) => (
                  <SocialLink
                    key={kind}
                    kind={kind}
                    href={
                      kind === "facebook"
                        ? active.facebookUrl ?? "#"
                        : kind === "instagram"
                        ? active.instagramUrl ?? "#"
                        : kind === "twitter"
                        ? active.twitterUrl ?? "#"
                        : active.linkedinUrl ?? "#"
                    }
                    label={`${active.name} on ${kind[0].toUpperCase()}${kind.slice(1)}`}
                    icons={resolvedIcons}
                  />
                ))}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              {splitIntoParagraphs(active.bio).map((p, i) => (
                <p
                  key={i}
                  className="mt-3 text-sm leading-6 text-zinc-700 first:mt-0"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Optional: quick note showing breakpoint used */}
      <div className="sr-only">Desktop: {String(isDesktop)}</div>
    </section>
  );
}
