import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { name: "CCTV & IP Surveillance", href: "/services" },
  { name: "Access Control", href: "/services" },
  { name: "Structured Networking", href: "/services" },
  { name: "Server Infrastructure", href: "/services" },
  { name: "Software Development", href: "/services" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contacts" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

const socials = [
  {
    label: "X",
    href: "#",
    path: "M4 4l7.5 9.8L4.4 20H7l5.6-6.5L17.6 20H20l-8-10.2L19.6 4H17l-5 5.8L7.4 4H4z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.6 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2.03-3.3-2.03 0-2.34 1.57-2.34 3.2V21h-4V9z",
  },
  {
    label: "Email",
    href: "mailto:info@nanocomputingict.com",
    path: "M3 5.5A1.5 1.5 0 014.5 4h15A1.5 1.5 0 0121 5.5v13a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5v-13zm2.2.5L12 12.2 18.8 6H5.2zM5 7.9V18h14V7.9l-7 5.6-7-5.6z",
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 bg-canvas">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16 sm:px-8 sm:pt-20">
        {/* Brand + Link Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 active:scale-[0.98] transition-transform duration-100"
            >
              <Image
                src="/nano-logo.png"
                alt="nano Computing Logo"
                width={216}
                height={216}
                className="h-[108px] w-auto object-contain"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-[15.5px] font-bold tracking-tight text-black">
                  <span className="font-extrabold">nano</span> Computing ICT Solutions
                </span>
                <span className="mt-0.5 text-[12px] font-medium tracking-normal text-zinc-500">
                  Your Integrated Safety Partner
                </span>
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-500">
              We build and maintain the systems your workplace runs on: CCTV
              and access control, networks, servers and software. Based in
              Addis Ababa, and reachable when you need us.
            </p>

            <div className="mt-7 flex items-center gap-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-zinc-400 transition-colors duration-200 hover:text-black active:scale-[0.94] transition-transform"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer services"
            className="col-span-1 md:col-span-3 lg:col-span-2 lg:col-start-7"
          >
            <h3 className="text-[14px] font-semibold tracking-tight text-black">
              Services
            </h3>
            <ul className="mt-6 space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-zinc-700 transition-colors duration-200 hover:text-black"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-label="Footer company"
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-[14px] font-semibold tracking-tight text-black">
              Company
            </h3>
            <ul className="mt-6 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-zinc-700 transition-colors duration-200 hover:text-black"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer legal" className="col-span-1 md:col-span-2">
            <h3 className="text-[14px] font-semibold tracking-tight text-black">
              Legal
            </h3>
            <ul className="mt-6 space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-zinc-700 transition-colors duration-200 hover:text-black"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-200/80 py-8 text-center md:mt-16">
          <p className="text-[13px] text-zinc-500">
            &copy; {new Date().getFullYear()} Nano Computing ICT Solutions
          </p>
        </div>
      </div>

      {/* Full-bleed illustration, anchored to the bottom edge */}
      <div className="relative z-0 -mt-[11%] w-full overflow-hidden sm:-mt-[12.5%] md:-mt-[13.6%]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white via-white/60 to-transparent"
        />
        <Image
          src="/Connected City Network Security Banner.png"
          alt="Connected city security network: surveillance, access control and cloud infrastructure"
          width={2138}
          height={736}
          className="h-auto w-full object-contain object-bottom"
          loading="lazy"
        />
      </div>
    </footer>
  );
}