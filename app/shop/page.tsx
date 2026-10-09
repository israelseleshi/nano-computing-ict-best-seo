import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/json-ld";
import Link from "next/link";
import FloatingHeader from "@/components/floating-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Buy network devices, computers and computer accessories in Addis Ababa from the engineers who install them. Switches, routers, firewalls, cabling, laptops, desktops and Mac repair — with honest advice on what actually fits.",
};

const categories = [
  {
    name: "Network Devices",
    body: "Switches, routers, firewalls, wireless access points, network cable and the small hardware that ties a site together. Tell us what you are trying to connect and we will tell you what fits.",
  },
  {
    name: "Computers",
    body: "Desktops, laptops and workstations for office use, plus upgrades and repairs. We can spec a machine for your workload, or service one you already own.",
  },
  {
    name: "Computer Accessories",
    body: "Monitors, keyboards, storage, power protection and the peripherals that get ignored until they fail. Stock is confirmed at the time of enquiry.",
  },
];

const reasons = [
  {
    title: "We install what we sell",
    body: "Our technicians work on this equipment every week. If something is going to be awkward to install, we already know.",
  },
  {
    title: "Priced for Addis Ababa",
    body: "We supply and install locally, so you are not paying international freight on top of hardware you still have to get installed.",
  },
  {
    title: "One supplier, one warranty",
    body: "Buy the hardware from us and have it installed by us, and there is one place to go when something needs replacing.",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-canvas text-black selection:bg-black selection:text-white">
      <FloatingHeader />

      <BreadcrumbSchema trail={[{ name: "Shop", path: "/shop" }]} />

      <main className="pt-24 sm:pt-28">
        {/* Page title */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-5 sm:py-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black text-balance">
              Shop
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black text-balance">
                  Hardware we are happy to stand behind.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[15px] sm:text-base leading-relaxed text-zinc-600">
                  We are an engineering company first, so we do not push
                  whatever arrived that week. We supply network devices,
                  computers and accessories across Addis Ababa, and we will
                  happily talk you into a smaller, cheaper setup if that is what
                  the job actually needs.
                </p>
                <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-zinc-600">
                  Every quotation includes delivery and installation by our own
                  team. Not sure what you need yet? Start with{" "}
                  <Link
                    href="/services"
                    className="font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-60"
                  >
                    the services we install
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              Browse by category
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
              {categories.map((category) => (
                <div key={category.name} className="bg-canvas p-6 sm:p-8">
                  <h3 className="text-xl font-bold tracking-tight text-black">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
                    {category.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why buy from us */}
        <section className="bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              Why buy from us
            </h2>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3">
              {reasons.map((reason) => (
                <div key={reason.title}>
                  <h3 className="text-lg font-bold tracking-tight text-black">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
              <h3 className="text-2xl font-black tracking-tight text-black text-balance">
                Tell us what the equipment is for.
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600">
                Send us the site, the number of people and the job the equipment
                has to do. We will come back with a shortlist and a price, not a
                catalogue.
              </p>
              <Link
                href="/contacts"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-zinc-800"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}