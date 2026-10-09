import FlipTitle from "@/components/flip-title";

export default function HomeHero() {
  return (
    <section
      className="relative isolate flex min-h-[92vh] w-full items-end overflow-hidden bg-neutral-950"
      aria-labelledby="hero-title"
    >
      {/* Full-bleed background video, radially masked into the page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
        }}
      >
        <video
          className="h-full w-full object-cover object-center"
          src="/gemini_generated_networking_a2cddbf8.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 sm:pb-24 lg:pb-28">
        {/* Static by design: the h1 is the page's primary heading and must not
            change under a crawler or an AI extractor. The rotating tagline
            lives in the paragraph below instead. */}
        <h1
          id="hero-title"
          className="max-w-4xl text-balance text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          CCTV, access control and ICT infrastructure in Addis Ababa
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          Your integrated{" "}
          <FlipTitle
            words={["safety partner", "ICT partner", "security partner"]}
            className="px-0 text-white"
          />{" "}
          — CCTV and security camera systems, time attendance, networks, servers
          and software, designed, installed and maintained by our own
          engineering team.
        </p>

      </div>
    </section>
  );
}