import NewsletterForm from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 pt-12 pb-4 border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h3 className="text-2xl font-bold">Subscribe to our newsletter</h3>
            <p className="mt-2 text-white/80">Monthly updates on events, programs, and opportunities.</p>
          </div>
          <NewsletterForm variant="dark" />
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 pt-8 pb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/80">© {new Date().getFullYear()} SAHAHR — South Asian Heritage Association of Hamilton & Region</p>
        <div className="flex gap-3 text-sm text-white/70">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Accessibility</a>
          <a href="/#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
