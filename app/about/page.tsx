import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/json-ld";
import FloatingHeader from "@/components/floating-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nano Computing & ICT Solutions is a security and ICT engineering company in Addis Ababa, Ethiopia. Seven-plus years, 200+ turnkey projects across eight service domains, and 24/7 technical support from the team that installed the system.",
};

const stats = [
  { value: "7+", label: "Years in business" },
  { value: "200+", label: "Turnkey projects delivered" },
  { value: "8", label: "Service domains" },
  { value: "24/7", label: "Technical support" },
];

const principles = [
  {
    title: "We stay responsible after the handover",
    body: "Installing equipment is the easy part. We build the systems our clients run their businesses on, and we answer the phone afterwards. Every project comes with after-sales care from the same engineers who built it.",
  },
  {
    title: "We tell you honestly what it takes",
    body: "Some sites need four cameras, some need forty, and a few need almost nothing. We would rather say so than sell a system that does not earn its cost.",
  },
  {
    title: "We install what we sell",
    body: "Everything we put in your building, our own technicians have worked on. We know the equipment because we have had to maintain it at 2am.",
  },
  {
    title: "We fit the budget you actually have",
    body: "The same problem can be solved three ways. We will show you the options, including the one that costs less, and explain what each one gives up.",
  },
];

const leadership = [
  {
    name: "Dawit Seleshi",
    role: "Founder and General Manager",
    body: "Overall strategic leadership, site surveys, turnkey project estimation, quality assurance and client liaison.",
  },
  {
    name: "Solomei M.",
    role: "Human Resource Director",
    body: "Organisational development, talent acquisition, staff welfare and workforce administration.",
  },
  {
    name: "Tameru H.",
    role: "Engineering Team Director",
    body: "Engineering evaluation of electrical and electronic systems, hardware testing, research programs and technical deployment protocols.",
  },
];

const sectors = [
  "Corporate offices",
  "Industrial estates",
  "Universities and schools",
  "Hospitals and clinics",
  "Commercial retail",
  "Residential compounds",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-black selection:bg-black selection:text-white">
      <FloatingHeader />

      <BreadcrumbSchema trail={[{ name: "About", path: "/about" }]} />

      <main className="pt-24 sm:pt-28">
        {/* Page title */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-5 sm:py-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black text-balance">
              About
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black text-balance">
                  IT services, security and software under one roof.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[15px] sm:text-base leading-relaxed text-zinc-600">
                  Nano Computing &amp; ICT Solutions is a security and ICT
                  engineering company based in Addis Ababa. For more than seven
                  years we have designed, installed and maintained the systems
                  Ethiopian businesses run on — from a single camera over a shop
                  door to a full building of network, servers and structured
                  cabling.
                </p>
                <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-zinc-600">
                  We are a registered enterprise in the Federal Democratic
                  Republic of Ethiopia, and every engagement is backed by 24/7
                  technical support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="border-b border-zinc-200 bg-canvas">
          <dl className="mx-auto grid w-full max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-10 sm:py-14 ${
                  index < 3 ? "border-b border-zinc-200 lg:border-b-0" : ""
                } ${index % 2 === 0 ? "pr-6" : ""} ${
                  index === 1 ? "lg:border-l lg:border-zinc-200 lg:pl-10" : ""
                } ${index === 3 ? "lg:border-l lg:border-zinc-200 lg:pl-10" : ""} ${
                  index === 2 ? "lg:border-l lg:border-zinc-200 lg:pl-10" : ""
                }`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-4xl sm:text-5xl font-black tracking-tight text-black">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[13px] leading-snug text-zinc-500">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Founder quote */}
        <section className="border-b border-zinc-200 bg-canvas">
          <figure className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <blockquote className="max-w-4xl">
              <p className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-black text-balance">
                &ldquo;We do not only fit equipment. We build the systems our
                clients run their businesses on, and we stay responsible for
                them afterwards.&rdquo;
              </p>
              <figcaption className="mt-6 text-[13px] text-zinc-500">
                <span className="font-semibold text-zinc-900">Dawit Seleshi</span>{" "}
                — Founder and General Manager
              </figcaption>
            </blockquote>
          </figure>
        </section>

        {/* What we stand for */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              What we stand for
            </h2>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <h3 className="text-lg font-bold tracking-tight text-black">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              Who you will be working with
            </h2>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3">
              {leadership.map((person) => (
                <div key={person.name}>
                  <h3 className="text-lg font-bold tracking-tight text-black">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                    {person.role}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
                    {person.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              Who we work with
            </h2>
            <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
              {sectors.map((sector) => (
                <li
                  key={sector}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-[14px] text-zinc-700"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}