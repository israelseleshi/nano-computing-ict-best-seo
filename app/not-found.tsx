import Link from "next/link";
import FloatingHeader from "@/components/floating-header";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const destinations = [
  {
    href: "/services",
    title: "Our Services",
    body: "CCTV, access control, time attendance, networking, web and mobile development.",
  },
  {
    href: "/about",
    title: "About us",
    body: "Who we are, how we work, and the standards every project is held to.",
  },
  {
    href: "/shop",
    title: "Shop",
    body: "Network devices, computers and accessories we install ourselves.",
  },
  {
    href: "/contacts",
    title: "Contact us",
    body: "Call, email or visit us at Rayuma Building, Airport Road.",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-black selection:bg-black selection:text-white">
      <FloatingHeader />

      <main className="pt-32 sm:pt-36 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            Error 404
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-6xl font-black tracking-tight text-black text-balance">
            We could not find that page.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed text-zinc-600">
            The link may be out of date, or the page may have moved. Here is
            where most people were heading.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2">
            {destinations.map((destination) => (
              <Link
                key={destination.href}
                href={destination.href}
                className="group bg-canvas p-6 transition-colors duration-200 hover:bg-zinc-50 sm:p-8"
              >
                <h2 className="text-lg font-bold tracking-tight text-black">
                  {destination.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                  {destination.body}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-zinc-800"
          >
            Back to home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}