"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

type MenuItem = { label: string; href: string };
type MenuGroup = { label: string; href: string; items?: MenuItem[] };

const MENUS: MenuGroup[] = [
  {
    label: "Blog",
    href: "/blog",
    items: [
      { label: "Latest Posts", href: "/blog" },
      { label: "Categories", href: "/blog/categories" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    items: [
      { label: "Upcoming", href: "/events" },
      { label: "Past Events", href: "/events?view=past" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Board", href: "/about#board" },
      { label: "By‑Laws", href: "/about#bylaws" },
    ],
  },
  { label: "Gallery", href: "/gallery", items: [{ label: "Photos", href: "/gallery" }] },
  { label: "Contact", href: "/#contact", items: [{ label: "Get in touch", href: "/#contact" }] },
  { label: "Community Resource Guide", href: "/resources", items: [
    { label: "Health", href: "/resources#health" },
    { label: "Education", href: "/resources#education" },
    { label: "Legal", href: "/resources#legal" },
  ] },
  { label: "Newsletter", href: "/newsletter", items: [{ label: "Subscribe", href: "/newsletter" }] },
];

function useOnClickOutside<T extends HTMLElement>(ref: React.RefObject<T>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export function SiteHeader() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setOpenKey(null));

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-400" />
            <span className="font-bold text-xl">SAHAHR</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm" ref={menuRef}>
          {MENUS.map((m) => {
            const key = m.label.toLowerCase().replace(/\s+/g, "-");
            const isOpen = openKey === key;
            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setOpenKey(key)}
                onMouseLeave={() => setOpenKey(null)}
              >
                <Link
                  href={m.href}
                  className="inline-flex items-center gap-1 hover:text-rose-700 focus:outline-none"
                  aria-haspopup={m.items ? "menu" : undefined}
                  aria-expanded={m.items ? isOpen : undefined}
                  onFocus={() => setOpenKey(key)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenKey(null);
                  }}
                >
                  {m.label}
                  {m.items && (
                    <ChevronDown
                      className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  )}
                </Link>
                {m.items && isOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 mt-2 min-w-48 rounded-xl border bg-white shadow-lg p-1"
                  >
                    {m.items.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => setOpenKey(null)}
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex">Become a Member</Button>
          <Button className="bg-rose-600 hover:bg-rose-700">Donate</Button>
          <button
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white" ref={menuRef}>
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {MENUS.map((m) => {
              const key = m.label.toLowerCase().replace(/\s+/g, "-");
              const isOpen = openKey === key;
              return (
                <div key={key} className="">
                  <button
                    className="w-full flex items-center justify-between py-2 text-left"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => setOpenKey(isOpen ? null : key)}
                  >
                    <Link href={m.href} className="hover:text-rose-700" onClick={() => setMobileOpen(false)}>
                      {m.label}
                    </Link>
                    {m.items && <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} aria-hidden />}
                  </button>
                  {m.items && isOpen && (
                    <div role="menu" className="pl-3 pb-2 space-y-1">
                      {m.items.map((it) => (
                        <Link
                          key={it.label}
                          href={it.href}
                          role="menuitem"
                          className="block rounded-md px-3 py-2 text-sm hover:bg-rose-50 hover:text-rose-700"
                          onClick={() => setMobileOpen(false)}
                        >
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
