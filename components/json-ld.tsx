const BASE_URL = "https://nanocomputingict.com";

/**
 * NAP constants, taken from public/Company_Profile_NCIS.md ("Corporate
 * Registry" table) so the structured data and the visible site cannot drift
 * apart.
 *
 * ⚠️ BEFORE GOING LIVE: confirm every value here matches your Google Business
 * Profile exactly. Inconsistent name/address/phone between the website, the
 * schema and the GBP listing is the leading cause of local ranking loss.
 * ProfessionalService is the most sensitive schema type for this.
 */
export const NAP = {
  legalName: "Nano Computing & ICT Solutions",
  brandName: "Nano Computing ICT",
  telephone: "+251923787878",
  email: "info@nanocomputingict.com",
  streetAddress: "Rayuma Building 2nd Floor, Office 214, Airport Road",
  addressLocality: "Addis Ababa",
  addressRegion: "Addis Ababa",
  addressCountry: "ET",
  /** Mon-Sat 08:30-18:30, per the company profile. */
  openingHours: "Mo-Sa 08:30-18:30",
  vatId: "0047510946",
} as const;

export const SERVICES = [
  {
    name: "CCTV & Security Camera Systems",
    description:
      "Design, installation and maintenance of CCTV and IP surveillance systems for homes, shops, offices and multi-site businesses in Addis Ababa.",
  },
  {
    name: "Door Access Control Systems",
    description:
      "Keypad, card, fingerprint and biometric access control systems that keep unauthorised people out while logging every entry.",
  },
  {
    name: "Time Attendance Systems",
    description:
      "Card and fingerprint time and attendance systems that track working hours, lunch, leave and sick days, and export reports ready for payroll.",
  },
  {
    name: "Computer Network Design & Installation",
    description:
      "Structured network cabling, switching, Wi-Fi, routing, firewalls and server infrastructure designed and maintained for business use.",
  },
  {
    name: "Computer Repair & Apple Computer Service",
    description:
      "Onsite computer, networking and Mac repair, maintenance, upgrades and data recovery for residential and business customers.",
  },
  {
    name: "Web Development",
    description:
      "Websites, online stores and business software across PHP, React and the front end, with WooCommerce, Shopify or BigCommerce.",
  },
  {
    name: "Mobile App Development",
    description:
      "Cross-platform mobile apps for Android and iOS from a single codebase, or native builds where a project calls for them.",
  },
] as const;

/** Sitewide entity description. Rendered once, in the root layout. */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#organization`,
    name: NAP.brandName,
    legalName: NAP.legalName,
    alternateName: NAP.legalName,
    url: BASE_URL,
    logo: `${BASE_URL}/nano-logo.png`,
    image: `${BASE_URL}/nano-logo.png`,
    description:
      "Security and ICT engineering company in Addis Ababa, Ethiopia. CCTV and IP surveillance, door access control, time and attendance systems, computer network design and installation, server infrastructure, web and mobile development, and computer repair — all installed and maintained by our own engineers.",
    slogan: "Your Integrated Safety Partner",
    telephone: NAP.telephone,
    email: NAP.email,
    vatID: NAP.vatId,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.00183938941426,
      longitude: 38.767092074654975,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:30",
        closes: "18:30",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Addis Ababa" },
      { "@type": "Country", name: "Ethiopia" },
    ],
    knowsAbout: [
      "CCTV installation",
      "IP surveillance",
      "Security camera systems",
      "Door access control",
      "Biometric access control",
      "Fingerprint access control",
      "Time and attendance systems",
      "Structured network cabling",
      "Server infrastructure",
      "Firewalls",
      "Web development",
      "Mobile app development",
      "Computer repair",
      "Apple computer repair",
      "Data recovery",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": `${BASE_URL}/#service-catalog`,
      name: "Security and ICT services",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Per-route breadcrumb trail. Render on any page below the home page. */
export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", path: "/" },
      ...trail,
    ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}