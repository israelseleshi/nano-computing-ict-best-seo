import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/json-ld";
import FloatingHeader from "@/components/floating-header";
import SiteFooter from "@/components/site-footer";
import ServiceSection, { type Service } from "@/components/service-section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CCTV and security camera installation for homes and businesses in Addis Ababa, Ethiopia. High-definition surveillance with intruder and fire detection, time attendance systems, computer network design & installation, and mobile app development for Android and iOS.",
};

const services: Service[] = [
  {
    id: "cctv-security",
    title: "CCTV & Security Camera Systems",
    summary:
      "Nobody plans for the night something goes missing. A camera system records who's at your gate, who was on your floor and what actually happened at 3am, so an argument about a break-in ends with footage instead of guesses. We install and maintain CCTV for homes and businesses across Addis Ababa, from a single camera over the front door to full coverage of every entrance, corridor and car park. Some setups watch for intruders on their own, and others fold fire and smoke detection into the same run of cable.",
    points: [
      "One camera over the door, or every entrance, corridor and car park covered",
      "Footage that settles the argument instead of starting one",
      "Intruder detection on its own, or bundled with fire and smoke alarms",
      "Homes, shops, offices and multi-site businesses",
    ],
    locationNote:
      "CCTV installation in Addis Ababa for homes, shops, offices and multi-site businesses.",
    video: "/gemini_generated_security-camera_video_dcb142c8.mp4",
    videoLabel: "CCTV surveillance cameras covering a building exterior footage",
    bleed: "left",
  },
  {
    id: "time-attendance",
    title: "Time Attendance Systems",
    summary:
      "Knowing who came in, who left and who was late shouldn't depend on a handwritten register. A time and attendance system logs every entry for you, by card or by fingerprint, and keeps track of working hours, lunch breaks, leave and sick days along the way. At the end of the month you get reports you can hand straight to payroll, instead of adding up a stack of paper.",
    points: [
      "Card or fingerprint terminals, whichever suits your door",
      "Working hours, lunch, leave and sick days tracked for you",
      "Reports that add up cleanly at payday",
      "No more guessing who's on shift",
    ],
    locationNote:
      "Time and attendance systems in Addis Ababa, reporting straight into your existing payroll process.",
    video:
      "/gemini_generated_time-attendance-and-door-access-control_video_f623316e.mp4",
    videoLabel: "Time attendance and door access control terminal footage",
    bleed: "right",
  },
  {
    id: "networking",
    title: "Computer Network Design & Installation",
    summary:
      "Almost everything a business does runs over its network: email, video calls, file shares, the cloud. When it's slow or drops out, everything else slows down with it. So we design, cable, configure and maintain computer networks properly: real structured cabling, sensible switching and Wi-Fi, routing and firewalls, and servers set up to keep your data moving safely. You get a network that holds up on a busy day, and a direct line to us when it needs attention.",
    points: [
      "Proper structured cabling, not loose cables behind a desk",
      "Switching, Wi-Fi and internet routing that hold up under load",
      "Firewalls and secure connections for your data",
      "Servers, hardware and software set up by people who do it daily",
    ],
    locationNote:
      "Computer network design and installation across Addis Ababa, from structured cabling to server configuration.",
    video: "/gemini_generated_networking_a2cddbf8.mp4",
    videoLabel: "Network infrastructure and structured cabling footage",
    bleed: "left",
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    summary:
      "Most apps shouldn't need writing twice. We build cross-platform mobile apps that run on Android and iOS from a single codebase (using Ionic, PhoneGap, Cordova and Sencha Touch) so you can reach both stores without paying for two teams. And when a project genuinely needs to go native, we build native iOS and Android apps too, working directly inside each platform's own framework.",
    points: [
      "One codebase, both app stores: Ionic, PhoneGap, Cordova, Sencha Touch",
      "Native iOS and Android builds when a project calls for them",
      "Faster launches without maintaining two separate codebases",
      "Updates and support after your app goes live",
    ],
    locationNote:
      "Mobile app development in Addis Ababa for Android and iOS, from a single codebase to native builds.",
    video: "/gemini_generated_mobile-app-development_video_639bd522.mp4",
    videoLabel: "Mobile app development on phone and desktop footage",
    bleed: "right",
  },
  {
    id: "web-development",
    title: "Web Development",
    summary:
      "Websites, online stores and the software behind them, built on the stack that actually fits your project rather than the one that is easiest to sell you. Front end, back end, and the commerce layer on top.",
    points: [
      "PHP: Laravel, CodeIgniter, Zend, CakePHP",
      "JavaScript: React, Angular, Ember, Socket.io",
      "Front end: HTML5, CSS3, Less, Bootstrap",
      "E-commerce: WordPress, WooCommerce, Shopify, BigCommerce",
    ],
    locationNote:
      "Web development in Addis Ababa for businesses that need to sell online or run their own software.",
    video: "/gemini_generated_web-development_video_b8c6383b.mp4",
    videoLabel: "Web development workspace and code footage",
    bleed: "left",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-canvas text-black selection:bg-black selection:text-white">
      <FloatingHeader />

      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }]} />

      <main className="pt-24 sm:pt-28">
        {/* Page intro */}
        <section className="border-b border-zinc-200 bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-5 sm:py-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black text-balance">
              Our Services
            </h1>
          </div>
        </section>

        {services.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}