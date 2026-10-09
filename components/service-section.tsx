"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import ServiceVideo from "@/components/service-video";

export interface Service {
  id: string;
  title: string;
  summary: string;
  points: string[];
  /** Short service + location line. Carries the geo term naturally. */
  locationNote: string;
  video: string;
  videoLabel: string;
  bleed: "left" | "right";
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function ServiceSection({ service }: { service: Service }) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const bleedLeft = service.bleed === "left";
  const sectionRef = useRef<HTMLElement>(null);

  // Progress of this section only, from entering the viewport to leaving it
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Drift keeps a scale margin so the panel never uncovers an edge
  const videoY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.12, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const parallaxOn = isDesktop && !reduceMotion;

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      ref={sectionRef}
      id={service.id}
      className="relative border-b border-zinc-200 bg-canvas"
      aria-labelledby={`${service.id}-title`}
    >
      {/* Video: 60% of the row, bleeding to the viewport edge, full section height */}
      <div
        className={`w-full overflow-hidden lg:absolute lg:inset-y-0 lg:w-[60%] ${
          bleedLeft ? "lg:left-0" : "lg:right-0"
        }`}
      >
        <motion.div
          className="h-full will-change-transform"
          style={parallaxOn ? { y: videoY, scale: videoScale } : undefined}
        >
          <motion.div {...reveal()} className="h-full">
            <ServiceVideo
              src={service.video}
              playbackRate={1}
              label={service.videoLabel}
              className="block w-full h-auto lg:h-full lg:object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Copy: 40% of the row, drifting slower than the video */}
      <motion.div
        className={`w-full will-change-transform lg:w-[40%] px-4 sm:px-6 py-20 sm:py-28 lg:min-h-[70vh] lg:flex lg:flex-col lg:justify-center ${
          bleedLeft
            ? "lg:ml-[60%] lg:pr-[max(1.5rem,calc((100vw-80rem)/2+2rem))] lg:pl-10"
            : "lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))] lg:pr-10"
        }`}
        style={parallaxOn ? { y: copyY } : undefined}
      >
        <motion.div {...reveal(0.1)}>
          <h2
            id={`${service.id}-title`}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.05] tracking-tight text-black text-balance"
          >
            {service.title}
          </h2>

          <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-zinc-600">
            {service.summary}
          </p>

          <ul className="mt-7 space-y-3">
            {service.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] text-zinc-700">
                <span
                  className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-black"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-2 border-black pl-4 text-[15px] font-medium leading-relaxed text-zinc-700">
            {service.locationNote}
          </p>

          <Link
            href="/contacts"
            className="mt-7 inline-flex w-fit items-center rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Request a quote
            <span className="sr-only"> for {service.title}</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}