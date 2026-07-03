import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center space-y-6">
        <div className="text-8xl font-extrabold text-rose-200" style={{ fontFamily: "var(--font-playfair), serif" }}>
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="text-gray-600">
          Sorry, we could not find the page you are looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button asChild size="lg">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/events" className="inline-flex items-center gap-2">
              <Search className="h-4 w-4" />
              Explore events
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
