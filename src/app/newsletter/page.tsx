import NewsletterForm from "@/components/newsletter-form";
import FeedbackForm from "@/components/feedback-form";

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Newsletter</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Subscribe for monthly updates on programs, events, and community opportunities. We respect your time and inbox.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* Feedback */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <FeedbackForm title="Tell us what you’d like to see" placeholder="What topics or updates would you like in our newsletter?" />
        </div>
      </section>
    </main>
  );
}

