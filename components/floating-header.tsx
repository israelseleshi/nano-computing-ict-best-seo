"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Contacts", href: "/contacts" },
];

const hashTargets = navItems
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

const sectionIds = ["home", ...hashTargets];

export default function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navRef = useRef<HTMLElement>(null);

  // Cursor-tracked specular highlight for the glass surface
  const glowX = useMotionValue(-200);
  const glowY = useMotionValue(-200);
  const glowBackground = useMotionTemplate`radial-gradient(220px circle at ${glowX}px ${glowY}px, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 40%, transparent 70%)`;

  // Scroll-linked, interruptible header motion
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.5,
  });
  const headerY = useTransform(smoothScrollY, [0, 220], [0, -18]);
  const headerScale = useTransform(smoothScrollY, [0, 220], [1, 0.965]);
  const topFadeOpacity = useTransform(smoothScrollY, [0, 200], [0.9, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      if (!isHome) {
        setActiveSection("");
        return;
      }

      const scrollPosition = y + 140;
      for (const section of sectionIds) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const update = () => handleScroll();
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const scrollToId = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return false;
    const offset = 96;
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: Math.max(0, elementPosition),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveSection(targetId);
    return true;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Same-page anchor: scroll smoothly without a navigation
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToId(href.substring(1));
      setMobileMenuOpen(false);
      return;
    }

    // Cross-route anchor (e.g. /#about from /services): let Next navigate,
    // the effect below handles the scroll once the home page mounts
    if (href.includes("#")) {
      setMobileMenuOpen(false);
      return;
    }

    // "/" while already on the home page: scroll back to the top
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      setActiveSection("home");
      setMobileMenuOpen(false);
    }
  };

  const isItemActive = (href: string) => {
    if (href === "/") {
      return isHome && (activeSection === "" || activeSection === "home");
    }
    if (!href.includes("#")) return pathname === href;
    const id = href.split("#")[1];
    return isHome && activeSection === id;
  };

  // Land on the right section when arriving via /#anchor
  useEffect(() => {
    if (!isHome) return;
    const id = window.location.hash.substring(1);
    if (!id) return;
    const timer = window.setTimeout(() => scrollToId(id), 80);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <motion.header
      style={reduceMotion ? undefined : { y: headerY, scale: headerScale }}
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none"
    >
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 h-28 -z-10"
        style={{ opacity: topFadeOpacity }}
        aria-hidden="true"
      >
        <div className="size-full bg-gradient-to-b from-white/90 via-white/45 to-transparent" />
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto flex flex-col items-center"
        animate={{ y: 0, opacity: 1 }}
      >
        <nav
          ref={navRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => {
            glowX.set(-200);
            glowY.set(-200);
          }}
          className={`glass-chrome pointer-events-auto relative isolate w-full overflow-hidden rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border border-t-white/70 backdrop-blur-xl backdrop-saturate-180 transition-[background-color,box-shadow,border-color] duration-500 ease-out ${
            isScrolled
              ? "bg-white/85 border-slate-200/90 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/5"
              : "bg-white/70 border-slate-200/80 shadow-[0_6px_24px_-10px_rgba(15,23,42,0.12)]"
          }`}
          aria-label="Main Navigation"
        >
          {/* Specular highlight that tracks the cursor across the glass */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-70"
            style={{ background: glowBackground }}
          />

          {/* Logo & Brand Identity */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 group focus:outline-none active:scale-[0.97] transition-transform duration-100"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.4 }}
              className="relative flex items-center"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_70%)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              />
              {/* The PNG is 500x500 with the mark occupying only the middle 27%,
                  so the box is sized to the footer's 108px and pulled back with
                  negative margins. The transparent padding absorbs the extra
                  space, keeping the pill height and the glow unchanged. */}
              <div className="-my-[34px] sm:-my-[30px]">
                <Image
                  src="/nano-logo.png"
                  alt="nano Computing Logo"
                  width={216}
                  height={216}
                  className="h-[108px] w-auto object-contain"
                  priority
                />
              </div>
            </motion.div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[15.5px] sm:text-[17.5px] font-bold tracking-tight text-black">
                <span className="text-black font-extrabold">nano</span> Computing ICT
                Solutions
              </span>
              <span className="text-[11px] sm:text-[12px] font-medium tracking-normal text-zinc-500 mt-0.5">
                Your Integrated Safety Partner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with spring-driven active pill */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1.5 rounded-full border border-zinc-200/80">
            {navItems.map((item) => {
              const isActive = isItemActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative isolate text-xs lg:text-sm px-4 py-1.5 rounded-full transition-colors duration-200 active:scale-[0.97] ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-600 hover:text-black"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-black shadow-[0_2px_10px_-2px_rgba(0,0,0,0.4)]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", bounce: 0.25, duration: 0.45 }
                      }
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors focus:outline-none active:scale-[0.94] transition-transform duration-100"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <motion.span
                className="block w-5 h-5"
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.span>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu (Floating Glass Island) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, scale: 0.96, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, scale: 0.96, filter: "blur(8px)" }
              }
              transition={
                reduceMotion
                  ? { duration: 0.2 }
                  : { type: "spring", bounce: 0, duration: 0.3 }
              }
              className="glass-chrome pointer-events-auto mt-2 w-full max-w-md bg-white/90 backdrop-blur-xl backdrop-saturate-180 border border-zinc-200 border-t-white/70 rounded-3xl p-4 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.2)] md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = isItemActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm transition-colors active:scale-[0.98] transition-transform duration-100 ${
                        isActive
                          ? "bg-black text-white font-semibold"
                          : "text-zinc-700 hover:bg-zinc-100 hover:text-black font-medium"
                      }`}
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-zinc-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}