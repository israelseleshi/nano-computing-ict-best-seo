import FeaturesSectionDemo from "@/components/features-section-demo-3";
import HomeHero from "@/components/home-hero";
import FloatingHeader from "@/components/floating-header";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-black selection:bg-black selection:text-white">
      <FloatingHeader />

      <main>
        <HomeHero />

        <FeaturesSectionDemo />
      </main>

      <SiteFooter />
    </div>
  );
}