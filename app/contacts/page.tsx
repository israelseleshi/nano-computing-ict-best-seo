import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/json-ld";
import ContactSection from "@/components/contact-section";
import FloatingHeader from "@/components/floating-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Contact Nano Computing ICT Solutions in Addis Ababa, Ethiopia. CCTV and access control, time attendance, computer networking, servers and software development. Call +251 923 78 78 78 or email info@nanocomputingict.com.",
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-canvas text-black selection:bg-black selection:text-white">
      <FloatingHeader />

      <BreadcrumbSchema trail={[{ name: "Contact us", path: "/contacts" }]} />

      <main className="pt-32 sm:pt-36 pb-24 sm:pb-32">
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}