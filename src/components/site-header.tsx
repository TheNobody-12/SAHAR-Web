import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-400" />
            <span className="font-bold text-xl">SAHAHR</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className="hover:text-rose-700" href="/#programs">Programs</Link>
          <Link className="hover:text-rose-700" href="/about">About</Link>
          <Link className="hover:text-rose-700" href="/events">Events</Link>
          <Link className="hover:text-rose-700" href="/#impact">Impact</Link>
          <Link className="hover:text-rose-700" href="/#stories">Stories</Link>
          <Link className="hover:text-rose-700" href="/#contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex">Become a Member</Button>
          <Button className="bg-rose-600 hover:bg-rose-700">Donate</Button>
        </div>
      </div>
    </header>
  );
}

