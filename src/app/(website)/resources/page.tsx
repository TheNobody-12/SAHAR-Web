'use client';

import { useState } from "react";
import { Card as UICard, CardContent as UICardContent, CardHeader as UICardHeader, CardTitle as UICardTitle } from "@/components/ui/card";
import NewsletterForm from "@/components/newsletter-form";
import FeedbackForm from "@/components/feedback-form";
import RangoliDivider from "@/components/rangoli-divider";

type Resource = {
  title: string;
  desc: string;
  href: string;
  category: "Health" | "Education" | "Legal" | "Settlement";
};

const RESOURCES: Resource[] = [
  { title: "Public Health Services", desc: "Clinics, vaccination, and community health programs.", href: "https://www.hamilton.ca/people-programs/public-health", category: "Health" },
  { title: "Mental Health Supports", desc: "Counselling and crisis lines for youth and adults.", href: "https://www.ontario.ca/page/mental-health-services", category: "Health" },
  { title: "Adult Language Training (LINC)", desc: "Free English classes for newcomers.", href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/improve-english-french/classes.html", category: "Education" },
  { title: "Schools & Continuing Education", desc: "Find local school boards and adult learning.", href: "https://www.hwdsb.on.ca/", category: "Education" },
  { title: "Community Legal Clinics", desc: "Free legal information and services.", href: "https://www.legalclinic.ca/", category: "Legal" },
  { title: "Tenant Rights & Housing", desc: "Help with rental issues and Landlord-Tenant Board.", href: "https://tribunalsontario.ca/ltb/", category: "Legal" },
  { title: "Settlement Services", desc: "Orientation, referrals, and newcomer supports.", href: "https://settlement.org/ontario/", category: "Settlement" },
  { title: "Employment Supports", desc: "Job search and resume help for newcomers.", href: "https://www.ontario.ca/page/employment-ontario", category: "Settlement" },
];

const CATS = ["All", "Health", "Education", "Legal", "Settlement"] as const;

export default function ResourcesPage() {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === active);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">Community Resource Guide</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">Trusted links to health, education, legal, and settlement supports across Hamilton & Region.</p>
        </div>
      </section>

      {/* Quick subscribe */}
      <section className="bg-rose-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-bold">Get updates and new resources</h2>
            <p className="mt-2 text-white/90">Subscribe to monthly highlights, programs, and community services.</p>
          </div>
          <NewsletterForm
            className="flex flex-col sm:flex-row gap-3"
            inputClassName="bg-white text-black rounded-xl px-4 py-2 focus-visible:ring-rose-600 border-transparent"
            buttonClassName="bg-black hover:bg-gray-800 text-white rounded-xl px-6 py-2"
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-rose-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-rose-50 hover:text-rose-700"
                }`}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <UICard key={r.title} className="rounded-2xl shadow-sm border-gray-100 bg-white hover:shadow-md transition-shadow">
                <UICardHeader>
                  <UICardTitle className="text-xl">{r.title}</UICardTitle>
                </UICardHeader>
                <UICardContent className="text-gray-700">
                  <p>{r.desc}</p>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-rose-700 font-medium hover:underline">
                    Visit →
                  </a>
                </UICardContent>
              </UICard>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No resources found in this category.
            </div>
          )}
        </div>
      </section>

      <RangoliDivider />

      {/* Suggest a resource */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <FeedbackForm title="Suggest a resource" placeholder="Share a link and a short description…" />
        </div>
      </section>
    </main>
  );
}
