'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, HeartHandshake, Users, Globe2, ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/newsletter-form";
import HeroMosaic from "@/components/hero-mosaic";
import AuroraBackground from "@/components/aurora-background";

// Single-file preview component for a modern, non-profit style landing page.
// Tailwind + shadcn/ui + framer-motion. Drop into a React app.
export default function SahahrLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top Nav is provided globally via RootLayout's <SiteHeader /> */}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground theme="dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.h1 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.6}} className="text-4xl md:text-6xl font-extrabold leading-tight">
              Celebrating South Asian Heritage in Hamilton
            </motion.h1>
            <p className="mt-5 text-lg text-white/80">
              We unite communities through cultural programs, festivals, and support services for youth, seniors, and newcomers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/events">See Upcoming Events</Link>
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-black border-white/30 hover:bg-white/5"
              >
                <PlayCircle className="h-4 w-4"/> Watch Highlights
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Badge className="bg-emerald-600 text-white">Registered Non‑Profit</Badge>
              <Badge variant="outline" className="border-white/30 text-white">Volunteer‑Led</Badge>
            </div>
          </div>
          <HeroMosaic />
        </div>
      </section>

      {/* Newsletter (below hero)
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Stay in the loop</h3>
            <p className="mt-2 text-gray-600">Get updates on events, programs, and volunteer opportunities.</p>
          </div>
          <NewsletterForm />
        </div>
      </section> */}

      {/* Programs */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Programs & Services</h2>
            <Button variant="ghost" className="gap-2">View All <ArrowRight className="h-4 w-4"/></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(({icon:Icon,title,desc,cta},i)=> (
              <Card key={i} className={`overflow-hidden shadow-sm border-gray-200 ${i % 2 ? 'card-swoop-bl' : 'card-swoop-br'}`}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl grid place-items-center bg-rose-50 text-rose-700">
                    <Icon className="h-6 w-6"/>
                  </div>
                  <CardTitle className="mt-4 text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <p>{desc}</p>
                  <Button variant="outline" className="mt-4">{cta}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Programs */}
      <section id="current-programs" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Current Programs</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {currentPrograms.map((p, i) => (
              <Card key={i} className="rounded-2xl shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <p>{p.desc}</p>
                  <Button asChild className="mt-4">
                    <Link href="/#programs">View Programs</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mid‑page Newsletter CTA */}
      <section className="bg-rose-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-3xl font-bold">Join our newsletter</h3>
            <p className="mt-2 text-white/90">Be first to hear about festivals, programs, and volunteer opportunities.</p>
          </div>
          <NewsletterForm
            className="flex flex-col sm:flex-row gap-3"
            inputClassName="bg-white text-black rounded-xl px-4 py-2 focus-visible:ring-rose-600 border-transparent"
            buttonClassName="bg-black hover:bg-gray-800 text-white rounded-xl px-6 py-2"
          />
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e,i)=> (
              <Card key={i} className={`overflow-hidden ${i % 2 ? 'card-swoop-br' : 'card-swoop-bl'}`}>
                <div className="relative h-40 w-full">
                  <Image src={e.img} alt={e.title} fill className="object-cover" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-rose-700 font-medium mb-2">
                    <Calendar className="h-4 w-4"/> {e.date}
                  </div>
                  <h3 className="font-semibold text-lg">{e.title}</h3>
                  <p className="text-gray-600 mt-1">{e.desc}</p>
                  <Button className="mt-4 w-full">Register</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Community Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s,i)=> (
              <Card key={i} className="rounded-2xl text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-extrabold">{s.value}</div>
                  <div className="mt-2 text-gray-600">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stories / Testimonials */}
      <section id="stories" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Stories from Our Community</h2>
          <Card className="rounded-2xl">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-gray-700">
                “The cultural workshops helped my kids connect with their roots and make new friends. We felt welcomed from the very first day.”
              </p>
              <div className="mt-4 font-semibold">— Community Member</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact anchor for links; subscribe form lives in footer */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold">Get in touch</h3>
          <p className="mt-2 text-gray-300">Questions about programs or partnerships? Reach out and we’ll respond soon.</p>
        </div>
      </section>
    </div>
  );
}

const programs = [
  { icon: Globe2, title: "Cultural Celebrations", desc: "Diwali, Eid, Vaisakhi, Nepali New Year, Tamil Heritage Month and more.", cta: "Explore" },
  { icon: Users, title: "Youth & Newcomers", desc: "Mentorship, language & arts workshops, community engagement.", cta: "Learn more" },
  { icon: HeartHandshake, title: "Support & Advocacy", desc: "Mental health resources, seniors services, and social justice initiatives.", cta: "Get support" },
];

const currentPrograms = [
  {
    title: "South Asian Art & Culture",
    desc:
      "Workshops and showcases celebrating music, dance, literature, and visual arts across South Asia.",
  },
  {
    title: "Youth & Newcomer Engagement",
    desc:
      "Mentorship, language and arts programs, and community events to help youth and newcomers thrive.",
  },
  {
    title: "Community Support & Advocacy",
    desc:
      "Resources for seniors and families, mental health awareness, and advocacy with local partners.",
  },
];

const events = [
  { date: "Sat • Apr 12", title: "Spring Cultural Festival", desc: "A celebration of music, dance, and regional cuisines.", img: "/images/event4.jpeg" },
  { date: "Sun • May 04", title: "Volunteer Onboarding", desc: "Learn how to get involved and support our programs.", img: "/images/event2.jpeg" },
  { date: "Fri • Jun 20", title: "Heritage Story Night", desc: "Community storytelling and intergenerational dialogues.", img: "/images/event7.jpeg" },
];

const stats = [
  { value: "5k+", label: "Event Attendees" },
  { value: "120+", label: "Active Volunteers" },
  { value: "40+", label: "Annual Programs" },
  { value: "10+", label: "Partner Orgs" },
];
