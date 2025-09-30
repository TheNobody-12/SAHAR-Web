"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/language-switcher";

type MenuItem = { label: string; href: string };
type MenuGroup = { label: string; href: string; items?: MenuItem[] };

// Essentials first; everything else grouped under More
const MENUS: MenuGroup[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/#programs" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/#contact" },
  {
    label: "More",
    href: "#",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Community Resources", href: "/resources" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
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
  const hoverTimeout = useRef<number | null>(null);
  useOnClickOutside(menuRef, () => setOpenKey(null));

  return (
    <header className="sticky top-0 z-50 bg-gray-950 text-white/90">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-400" />
            <span className="font-bold text-xl">SAHAHR</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary" ref={menuRef}>
          {MENUS.map((m) => {
            const key = m.label.toLowerCase().replace(/\s+/g, "-");
            const isOpen = openKey === key;
            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => {
                  if (hoverTimeout.current) {
                    window.clearTimeout(hoverTimeout.current);
                    hoverTimeout.current = null;
                  }
                  setOpenKey(key);
                }}
                onMouseLeave={() => {
                  if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
                  hoverTimeout.current = window.setTimeout(() => setOpenKey(null), 150) as unknown as number;
                }}
              >
                <Link
                  href={m.href}
                  className="inline-flex items-center gap-1 text-white/85 hover:text-primary focus:outline-none"
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
                    className="absolute left-0 mt-2 min-w-48 rounded-xl border bg-white text-gray-900 shadow-lg p-1"
                    onMouseEnter={() => {
                      if (hoverTimeout.current) {
                        window.clearTimeout(hoverTimeout.current);
                        hoverTimeout.current = null;
                      }
                    }}
                    onMouseLeave={() => {
                      if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
                      hoverTimeout.current = window.setTimeout(() => setOpenKey(null), 150) as unknown as number;
                    }}
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
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button>Donate</Button>
          <button
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-md border"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-gray-950 text-white/90" ref={menuRef}>
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
                    <Link href={m.href} className="hover:text-primary" onClick={() => setMobileOpen(false)}>
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
