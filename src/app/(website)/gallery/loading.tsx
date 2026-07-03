import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-5 w-80" />
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 md:flex-1" />
          <Skeleton className="h-10 md:w-64" />
        </div>
      </section>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-[4/3] rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
