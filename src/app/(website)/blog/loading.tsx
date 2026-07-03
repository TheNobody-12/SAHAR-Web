import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 md:flex-1" />
          <Skeleton className="h-10 md:w-64" />
        </div>
      </section>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
              <Skeleton className="w-full aspect-[4/3]" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
