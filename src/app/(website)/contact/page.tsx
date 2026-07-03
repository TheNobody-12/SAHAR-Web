import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — SAHAHR",
  description: "Get in touch with SAHAHR for programs, partnerships, and volunteering.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">Contact Us</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Questions about programs, partnerships, or volunteering? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send a message</h2>
            <form className="space-y-4" action="#" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="contact-name" name="name" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium mb-1">Subject</label>
                <Input id="contact-subject" name="subject" placeholder="How can we help?" required />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-gray-100">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-700 grid place-items-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:info@sahahr.org" className="text-gray-600 hover:text-rose-700">info@sahahr.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-700 grid place-items-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <p className="text-gray-600">Hamilton, Ontario, Canada</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-700 grid place-items-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Response Time</div>
                    <p className="text-gray-600">We typically respond within 2 business days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-64 bg-gray-100 grid place-items-center">
              <p className="text-gray-500 text-sm">Map embed — add Google Maps iframe here</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
