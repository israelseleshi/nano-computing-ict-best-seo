"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import ServiceVideo from "@/components/service-video";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

interface BentoService {
  id: string;
  title: string;
  description: string;
  video: string;
  videoLabel: string;
  className: string;
  /** Spans the full grid and lays text and video side by side */
  wide?: boolean;
}

const services: BentoService[] = [
  {
    id: "cctv-security",
    title: "CCTV & Security Camera Systems",
    description:
      "Cameras for homes, shops and offices across Addis Ababa, from a single unit over the door to full site coverage, with intruder or fire detection built in.",
    video: "/gemini_generated_security-camera_video_dcb142c8.mp4",
    videoLabel: "CCTV surveillance cameras covering a building exterior footage",
    className: "lg:col-span-6 border-b",
    wide: true,
  },
  {
    id: "time-attendance",
    title: "Time Attendance Systems",
    description:
      "Card or fingerprint terminals that log every entry automatically, track hours, lunch and leave, and hand you reports ready for payroll.",
    video: "/gemini_generated_time-attendance-and-door-access-control_video_f623316e.mp4",
    videoLabel: "Time attendance and door access control terminal footage",
    className: "col-span-1 lg:col-span-3 border-b lg:border-r",
  },
  {
    id: "networking",
    title: "Computer Network Design & Installation",
    description:
      "Structured cabling, switching, Wi-Fi, routing, firewalls and servers, designed and maintained so your network holds up on a busy day.",
    video: "/gemini_generated_networking_a2cddbf8.mp4",
    videoLabel: "Network infrastructure and structured cabling footage",
    className: "col-span-1 lg:col-span-3 border-b",
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    description:
      "Cross-platform apps for Android and iOS from a single codebase, or native builds when a project needs to go deeper.",
    video: "/gemini_generated_mobile-app-development_video_639bd522.mp4",
    videoLabel: "Mobile app development on phone and desktop footage",
    className: "col-span-1 lg:col-span-3 lg:border-r",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Websites, online stores and the software behind them, across PHP, React and the front end, with WooCommerce, Shopify or BigCommerce when you need to sell.",
    video: "/gemini_generated_web-development_video_b8c6383b.mp4",
    videoLabel: "Web development workspace and code footage",
    className: "col-span-1 lg:col-span-3",
  },
];

export default function FeaturesSectionDemo() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <PointerHighlight
          containerClassName="mx-auto"
          rectangleClassName="border-none bg-lime-300/40"
          pointerClassName="hidden"
        >
          <h2 className="px-4 py-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl lg:leading-tight">
            Our Services
          </h2>
        </PointerHighlight>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-normal text-zinc-500 sm:text-base">
          Security, workforce and infrastructure systems, designed, installed
          and maintained by our engineering team in Addis Ababa.
        </p>
      </div>

      <div className="relative mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-6">
          {services.map((service, index) => {
            const video = (
              <ServiceVideo
                src={service.video}
                playbackRate={1}
                label={service.videoLabel}
                className={`block h-full w-full rounded-md object-cover ${
                  service.wide ? "max-h-80" : "max-h-72"
                }`}
              />
            );

            return (
              <FeatureCard key={service.id} className={service.className}>
                {service.wide ? (
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                      <FeatureTitle href={`/services#${service.id}`}>
                    {service.title}
                  </FeatureTitle>
                      <FeatureDescription>{service.description}</FeatureDescription>
                    </div>
                    <motion.div {...reveal(0.1 + index * 0.05)}>{video}</motion.div>
                  </div>
                ) : (
                  <>
                    <FeatureTitle href={`/services#${service.id}`}>
                    {service.title}
                  </FeatureTitle>
                    <FeatureDescription>{service.description}</FeatureDescription>
                    <motion.div
                      {...reveal(0.1 + index * 0.05)}
                      className="mt-7 w-full"
                    >
                      {video}
                    </motion.div>
                  </>
                )}
              </FeatureCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`group relative overflow-hidden p-6 transition-colors duration-300 hover:bg-zinc-50 sm:p-8 ${className ?? ""} border-zinc-200`}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) => {
  return (
    <h3 className="max-w-5xl text-left text-xl font-bold tracking-tight text-black sm:text-2xl">
      {href ? (
        <Link
          href={href}
          className="underline-offset-4 transition-opacity hover:opacity-70 focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </h3>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="mt-4 max-w-xl text-left text-sm font-normal text-zinc-500 sm:text-base">
      {children}
    </p>
  );
};