# SEO Plan — Nano Computing ICT Solutions

**Site:** `nanocomputingict.com`
**Prepared:** 2026-10-03
**Stack:** Next.js 16.3.6 (App Router, Turbopack) · React 19 · Tailwind v4
**Scope:** all 5 public routes, with the services page treated in depth

---

## 0. How to read this document

Sections are split into three tiers:

| Tier | Meaning |
| --- | --- |
| 🔴 **BUG** | Something actively broken right now, costing rankings today |
| 🟡 **GAP** | Missing but not yet costing traffic |
| 🟢 **OPPORTUNITY** | New surface area or capability to build |

Every claim in sections 1–3 was **verified against the running site or a live API response** during preparation. Data-collection method and limitations are stated in section 9.

---

## 1. Executive summary

The site scores **100/100 on Lighthouse SEO** and is, by that measure, perfect. It is not. Lighthouse's SEO category runs **11 audits**, and the audit responsible for the single most damaging bug on this site passes cleanly for the wrong reason.

The three findings that matter most:

1. 🔴 **Every page canonicalises to the homepage.** `/services`, `/contacts`, `/about` and `/shop` all emit `<link rel="canonical" href="https://nanocomputingict.com">`. This instructs Google to treat four pages as duplicates of the home page and drop them from the index. It is set in one place — `app/layout.tsx:68-69` — and it is almost certainly why these pages do not rank for anything.

2. 🔴 **The home page `<h1>` is not a heading, it is a rotating tagline.** It reads "Your Integrated Safety Partner", where the second half is a `FlipTitle` that mutates every 3 seconds between *Safety Partner*, *ICT Partner* and *Security Partner*. The primary heading on the most important page is non-deterministic, and contains no service or location keywords.

3. 🔴 **There is no structured data anywhere.** Zero JSON-LD across all routes. For a local business this is the largest single missed opportunity: no rich results, no knowledge-panel eligibility, and no structured entity for AI/LLM surfaces to cite.

Underneath those: no sitemap, no robots file, no OG image (despite declaring `twitter:card = summary_large_image`), no `metadataBase`, and two near-empty pages carrying almost no content.

None of this requires a content marketing budget to begin fixing. The overwhelming majority of the work in this plan is engineering, not writing.

---

## 2. Current state audit

Measured against the dev server, 2026-10-03.

### 2.1 Route-by-route

| Route | Title | Desc len | Canonical | h1 | h2 | JSON-LD | og:image |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Your Integrated Safety Partner | 295 | **homepage** 🔴 | rotating tagline 🔴 | 1 | 0 🔴 | **missing** 🔴 |
| `/services` | Services \| nano computing… | 268 | **homepage** 🔴 | Our Services | 5 | 0 🔴 | **missing** 🔴 |
| `/contacts` | Contact us \| nano computing… | 218 | **homepage** 🔴 | Contact us | 0 | 0 🔴 | **missing** 🔴 |
| `/about` | About \| nano computing… | 85 | **homepage** 🔴 | About | 0 | 0 🔴 | **missing** 🔴 |
| `/shop` | Shop \| nano computing… | 88 | **homepage** 🔴 | Shop | 0 | 0 🔴 | **missing** 🔴 |

All images have `alt` attributes (3 per route, zero missing) ✅
`lang="en"` is set correctly ✅
Heading order is valid on every page (single h1, h2s nested below) ✅

### 2.2 🔴 Missing infrastructure

| File | Status | Consequence |
| --- | --- | --- |
| `app/sitemap.ts` | **absent** | No XML sitemap. Google discovers pages only via internal links. |
| `app/robots.ts` | **absent** | No crawl directives, no sitemap pointer, no AI-crawler policy. |
| `app/opengraph-image.*` | **absent** | No social share image generated. |
| `app/not-found.tsx` | **absent** | Generic 404. Opportunity for helpful recovery links. |
| `app/manifest.ts` | **absent** | No web app manifest. |

### 2.3 Why Lighthouse says 100

The SEO category contains 11 audits. Reading the raw report:

```
canonical            score=1   ← passes: URL is a valid absolute URL.
                               It does NOT check that the canonical is
                               self-referencing or unique per page.
structured-data      score=null ← "not applicable" because nothing is there.
                               Absence is not scored as failure.
robots-txt           score=null ← manual/unaudited.
is-crawlable         score=1
sitemap              NOT IN CATEGORY AT ALL
```

`structured-data` and `robots-txt` return `null`, not `0`. **Missing is scored as "nothing to check", not "failed".** That is the entire gap between the score and reality, and it is why this plan exists: a green Lighthouse report is not evidence of an indexable site.

---

## 3. 🔴 Bug: canonical URL collapse

### The defect

`app/layout.tsx:68-70`:

```ts
alternates: {
  canonical: "https://nanocomputingict.com",
},
```

Metadata is inherited down the tree. Declaring a canonical once in the **root** layout stamps that same URL onto **every** descendant route. Verified output:

```
/          → <link rel="canonical" href="https://nanocomputingict.com">
/services  → <link rel="canonical" href="https://nanocomputingict.com">
/contacts  → <link rel="canonical" href="https://nanocomputingict.com">
/about     → <link rel="canonical" href="https://nanocomputingict.com">
/shop      → <link rel="canonical" href="https://nanocomputingict.com">
```

### Why it is fatal

A canonical is a *consolidation hint*: "index this URL instead." Applied to `/services`, it tells Google the services page does not deserve its own index entry. Consequences:

- Only the homepage can rank. `/services` cannot outrank `/` for anything.
- Signals that would build authority on `/services` (links, engagement, quotes) are consolidated onto `/`, discarding them.
- Any future service page inherits the same defect, so the site structurally cannot grow a long-tail footprint.

This is a hard blocker. Nothing else in this plan produces measurable gains until it is fixed.

### The fix

Remove `alternates` from `app/layout.tsx`. In App Router, a route's own metadata resolves to its own URL automatically once a root canonical no longer overrides it.

Verify each route then emits a self-referencing canonical:

```ts
// app/services/page.tsx
export const metadata: Metadata = {
  // ...
};
// No `alternates` needed — Next emits https://<host>/services
```

If a canonical must be explicit, set it per route, never in the root layout:

```ts
alternates: { canonical: "/services" }   // relative — resolved against metadataBase
```

### Related: `metadataBase` is missing

`app/layout.tsx` never sets `metadataBase`. Next.js therefore cannot resolve relative OG/Twitter/canonical URLs to absolute ones and falls back to `http://localhost:3000` during development. Once real OG images are added (§7), this must be set first:

```ts
metadataBase: new URL("https://nanocomputingict.com"),
```

---

## 4. 🔴 Bug: the home page h1 is a rotating tagline

`components/home-hero.tsx:35-44`:

```tsx
<h1 id="hero-title" ...>
  Your Integrated{" "}
  <FlipTitle
    words={["Safety Partner", "ICT Partner", "Security Partner"]}
    className="px-0 text-white"
  />
</h1>
```

`FlipTitle` → `FlipWords` re-renders the second half on a 3-second interval (`components/flip-title.tsx:14`, `duration = 3000`).

Two independent problems:

**a. It is not a keyword-bearing heading.** "Your Integrated Safety Partner" is a brand tagline. The home page's single `<h1>` should state what the business is and where it operates. Neither is present.

**b. The h1 mutates.** The served HTML and the rendered text differ, and the rendered text changes every 3 seconds. This is exactly the kind of unstable, non-deterministic primary heading that undermines both crawling and AI/LLM extraction, which typically sample a single render.

**Fix.** Make the h1 static and descriptive; keep the rotation as a decorative element below it.

```tsx
<h1 id="hero-title" className="...">
  CCTV, access control and ICT infrastructure
  <span className="block text-white/60">in Addis Ababa, Ethiopia</span>
</h1>
<p className="...">
  Your integrated safety partner — CCTV and access control, time
  attendance, networks, servers and software, designed, installed and
  maintained by our engineering team.
</p>
```

`FlipTitle` remains valid inside `<p>` (it is already used this way in `home-hero.tsx:46`'s sibling and in `contact-section.tsx:61`). Do not put it in a heading again.

---

## 5. 🟡 Thin content on `/about` and `/shop`

Both pages now render a title and nothing else (85 and 88 character descriptions). Thin pages are a liability:

- They generate no long-tail surface area.
- They can be classified as **soft 404s** or low-value pages, which drags crawl budget perception.
- They are the weakest possible destination for any internal link.

Options, in order of preference:

1. **Build them out.** `/about` → company story, team, the standards work is held to, the 7+ years / 200+ projects claims already in `app/layout.tsx`. `/shop` → the actual product categories (Network Devices, Computer Accessories, Computers — these exist as real categories on the live WordPress site and in `site-footer.tsx`).
2. **Merge / noindex** if neither will ever get real content.

Leaving them as title-only stubs is not a viable steady state.

---

## 6. Content and keyword strategy

### 6.1 Method and its limits

Data was gathered via **986 live calls** to Google Suggest, with recursive 2-level expansion — **4,743 unique suggestion strings**, 4,210 after noise filtering.

> **No volume data exists in this plan.** Google Suggest returns no search volumes, CPCs or difficulty figures. Suggest frequency is a *proxy* for demand, not a measurement of it. Any real volume number would require Keyword Planner, Ahrefs, Semrush or DataForSEO. Relative demand here is inferred from **how consistently a term surfaces across independent seed queries and geo variants** — a defensible but imperfect signal.

### 6.2 🔴 The headline opportunity: empty local queries

These seeds returned **zero suggestions**, re-confirmed individually:

```
cctv maintenance addis ababa            → 0
cctv repair addis ababa                 → 0
server installation addis ababa         → 0
lan cabling addis ababa                 → 0
access control system addis ababa       → 0
access control system price in ethiopia → 0
firewall installation addis ababa       → 0
server installation ethiopia            → 0
```

Google discards the geo modifier and falls back to generic completions. The standard reading: **nobody — including every competitor — has built search demand into these terms.** There is no established SERP to displace, and no competitor holding the position.

Equally, `access control system price` surfaces geo variants for **Bangladesh, Kenya, Nigeria, Pakistan, Ghana, Nepal, Uganda, India** — **Ethiopia is absent**. Competing countries own this space.

This is a real opening, and it is cheap: these are pages a competitor would have to build from scratch.

### 6.3 Verified geo-flagged keywords

Google's own `firefox`-client suggest responses carry `google:suggestsubtypes`, where codes `22`/`30` mark **Google's own geo-modification of the query**. This is a stronger local-intent signal than string matching. **149 suggestions carried the flag; 137 are service-relevant.** Highest-value subset, flagged under both `gl=et` and `gl=us` (locale-stable):

| Keyword | Service |
| --- | --- |
| `security camera installation in addis ababa` | CCTV |
| `cctv installer in addis ababa` | CCTV |
| `security camera installation in ethiopia` | CCTV |
| `cctv camera installation in ethiopia` | CCTV |
| `cctv camera installation price in ethiopia` | CCTV |
| `cctv camera price in addis ababa` | CCTV |
| `security camera price in addis ababa` | CCTV |
| `cctv camera shop in addis ababa` | CCTV / retail |
| `security camera supplier in addis ababa` | CCTV / retail |
| `cctv camera supplier in ethiopia` | CCTV / retail |
| `cctv camera importer in ethiopia` | CCTV / retail |
| `computer repair in addis ababa` | Repair |
| `laptop repair addis ababa` | Repair |
| `macbook repair addis ababa` | Repair / Apple |
| `computer maintenance in addis ababa` | Repair |
| `data recovery addis ababa` | Repair |
| `networking company in addis ababa` | Networking |
| `web development company in ethiopia` | Web |
| `website design company in ethiopia` | Web |
| `web developer in addis ababa` | Web |

`gl=et`-only, also verified: `time attendance machine in ethiopia` · `biometric attendance machine price in ethiopia` · `attendance machine price in ethiopia` · `surveillance camera price in ethiopia` · `outdoor cctv camera price in ethiopia` · `wifi service in ethiopia` · `wifi cost in ethiopia` · `firewall price in ethiopia` · `cisco firewall price in ethiopia` · `access switch price in ethiopia` · `network cable price in ethiopia` · `network trunk price in ethiopia` · `door lock price in ethiopia` · `website development price in ethiopia` · `website development cost in ethiopia` · `app developer in ethiopia` · `mobile app developers in ethiopia` · `security service providers in ethiopia` · `security systems in ethiopia` · `home security system in ethiopia` · `cctv installation training` · `cctv and alarm installation courses`

Note the **pricing cluster**: `price in ethiopia` / `cost in ethiopia` recurs across CCTV, attendance, networking, web and doors. See §6.5.

### 6.4 Competitor landscape

| Competitor | Domain | Positioning observed |
| --- | --- | --- |
| Safe Technology PLC | safetechet.com | Broadest service list — CCTV, security fence, gate automation, access control, attendance, parking barrier, bollard, video intercom, fire alarm, PBX, PA, data networking. Strong brand recall in Suggest. |
| SOLFET | solfet.com | Authorized Dahua distributor. Explicit "CCTV Company in Ethiopia", "Access Control Company in Ethiopia". FAQ schema. |
| Seventech Solutions | seventech.et | **Geo-slug pages**: `/time-attendance-machine-in-ethiopia/`, `/structured-network-cabling-in-ethiopia/` |
| Abay Tech Solutions | abaytechsolutions.com | `/products/security-camera` — "CCTV & Security Camera Installation in Ethiopia" |
| iSense Technologies | isense-tech.com | Founded 2007. `/services.html` with integration narrative. |
| AddisTech | addistechsolution.com | ZKTeco distributor. Google rating 3.7. |
| IE Networks | ienetworksolutions.com | "Largest IT Company in Ethiopia" — enterprise positioning. |
| Prokal Technologies | prokaltech.com | UNV + ZKTeco + BDCOM distributor; Bole/Kality/Akaki geo copy. |
| Mac & More | mac-more.com | Claims **Apple Authorized Service Provider in Ethiopia** — outranks Nano on Mac. |

**Google autocomplete names four of these as recognised local entities** — `safe tech security camera cctv addis ababa`, `salem computer maintenance and networking addis ababa`, `server engineering and trading plc addis ababa`, `wubsites website design and development service in addis ababa`. Nano Computing appears in **none**, despite holding a 5.0 Google Places rating.

### 6.5 Verified content gaps in the market

1. **No geo-suffixed URLs anywhere in the category.** Every competitor uses a flat root. Nobody owns `/cctv-installation-addis-ababa/`.
2. **Almost no published pricing.** Only one outlier (DreamTech: "Packages start at ETB 15,000, including VAT"), while `price in ethiopia` suggestions are pervasive. Nobody captures this.
3. **Repair and data recovery are the strongest verified demand with the weakest site coverage.** `computer repair in addis ababa`, `laptop repair addis ababa`, `macbook repair addis ababa`, `data recovery addis ababa` are all geo-flagged — and Nano sells repair services (per the live site) while the current build has no repair page at all.
4. Competitors rank for **noun-phrase brand lookups** (`networking company in addis ababa`), not "get me a quote" intent. Informational, low-commitment.

### 6.6 Keyword map

| Cluster | Primary target page | Supporting targets |
| --- | --- | --- |
| CCTV installation | `/services` (§8) + `/services/cctv-installation` | price, supplier, shop, importer |
| CCTV maintenance & repair | **new** `/services/cctv-maintenance` | zero-suggestion geo terms — no competition |
| Access control | `/services` + **new** `/services/access-control` | door lock price, biometric |
| Time attendance | `/services` + **new** `/services/time-attendance` | attendance machine price in ethiopia |
| Networking | `/services` + **new** `/services/networking` | lan cabling addis ababa, firewall price |
| Web & mobile | `/services` | web development price/cost in ethiopia |
| Computer repair | **new** `/services/computer-repair` | laptop, macbook, data recovery — verified demand, zero coverage |
| Pricing | **new** `/pricing` | the whole `price in ethiopia` cluster |
| Brand/entity | `/about` | 7+ years, 200+ projects, 24/7 support |

---

## 7. Technical infrastructure to build

### 7.1 `app/sitemap.ts` 🟡

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nanocomputingict.com";
  const now = new Date();
  const routes = ["", "/services", "/contacts", "/about", "/shop"];
  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : r === "/services" ? 0.9 : 0.6,
    })),
    // add each new service page here as it ships
  ];
}
```

Regenerate automatically when service pages are added in §9.

### 7.2 `app/robots.ts` 🟡

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nanocomputingict.com/sitemap.xml",
    host: "nanocomputingict.com",
  };
}
```

Note: do **not** disallow `/_next/`. Next.js serves required assets from there; blocking it breaks rendering for every crawler.

### 7.3 `app/opengraph-image.tsx` 🟡

Every route declares `twitter:card = summary_large_image`, which requires an image. None exists — social shares currently render as bare text links.

```tsx
import { ImageResponse } from "next/og";

export const alt = "nano computing ICT Solutions — CCTV, access control and networks in Addis Ababa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center",
                    width: "100%", height: "100%", background: "#0a0a0a", color: "#fff",
                    padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 64, fontWeight: 800 }}>nano computing ICT Solutions</div>
        <div style={{ fontSize: 32, color: "#a1a1aa", marginTop: 16 }}>
          CCTV · Access Control · Networks · Servers · Software
        </div>
        <div style={{ fontSize: 28, color: "#71717a", marginTop: 12 }}>Addis Ababa, Ethiopia</div>
      </div>
    ),
    { ...size }
  );
}
```

Place in `app/` to apply site-wide, or per route to customise. Set `metadataBase` (§3) first.

### 7.4 `app/not-found.tsx` 🟢

A 404 that links to `/services`, `/contacts` and the shop recovers stranded visitors and distributes internal links.

### 7.5 `llms.txt` 🟢

`app/llms.txt/route.ts` serving a plain-text summary of services + contact details. Increasingly read by AI assistants; low cost, no downside, no established ranking effect — treat as cheap experiment, not a ranking lever.

---

## 8. The services page (in depth)

This is the site's highest-value asset and the right target for most investment. It currently has 5 well-structured `<h2>` service sections and the strongest on-page copy on the site — a good foundation that is being actively suppressed by the canonical bug.

### 8.1 Position the page for the primary cluster

`/services` should own **"CCTV installation Addis Ababa"** and the service-category head terms. It cannot rank for them until §3 is fixed.

### 8.2 Per-service depth, not just anchors

The services page is a single scrolling document. A visitor who needs CCTV pricing should not have to read past four unrelated sections. Recommended IA:

```
/services                     overview — all five, short scannable summaries
/services/cctv-installation   full page: coverage types, HD vs IP, NVR, remote view,
                              maintenance, pricing bands, FAQ, embedded video
/services/access-control
/services/time-attendance
/services/networking
/services/computer-repair     ← verified demand, currently zero coverage
```

Each child page: unique `title` and `description`, an H1 with the geo term, 600–1000 words of genuinely useful local content, an FAQ block, and its own JSON-LD (§9). Link each child up to `/services` and back down with `breadcrumbList` markup.

This also **fixes the architecture for long-tail**: one durable page per service beats five sections on one page.

### 8.3 On-page copy corrections

Current per-service `summary` and `points` (in `app/services/page.tsx`) are strong, but they contain **no location language at all** — zero occurrences of "Addis Ababa" or "Ethiopia" in any of the 5 sections. Natural, non-stuffed insertions:

- `service-section.tsx` subtitle area → "Installed and maintained across Addis Ababa."
- Each section's closing line → service + location, e.g. "CCTV installation in Addis Ababa for shops, offices and homes."
- The page intro section → one sentence establishing service area and response coverage.

Keep the existing conversational voice. It is a genuine differentiator; the competitors write vendor boilerplate.

### 8.4 Video SEO (significant, currently unexploited)

Five autoplaying videos, each with `aria-label` ✅ but **no structured data and no transcript**. `ServiceVideo` does not emit `VideoObject` markup.

Recommended:

1. Wrap each in `VideoObject` JSON-LD (`name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`, `contentUrl`).
2. Add `public/videos/<service>/transcript.txt` and link it as the text alternative.
3. Keep `preload="metadata"` ✅ — already correct for bandwidth.

Real user impact is secondary here — no customer will search for a transcript. The value is entity richness and LLM citability.

### 8.5 Performance — the video is the LCP risk

The services page stacks up to five autoplaying videos totalling ~12 MB, several simultaneously in view. This directly threatens Core Web Vitals, which are a ranking input.

- Confirm each video is lazy-started — only play when in view (`preload="metadata"` ✅, but `autoPlay` is unconditional).
- Serve WebM/AV1 with MP4 fallback via `<source>`.
- Poster images (`poster` attribute) so a paused/unsupported video is not an empty box.
- Target LCP < 2.5s, CLS < 0.1, INP < 200ms; measure with §10 tooling.

### 8.6 Internal linking

- Home page bento cards → the matching `/services/*` page (currently the bento cards are **not** links at all; verified in `features-section-demo-3.tsx`).
- Footer "SERVICES" column → `/services` plus each child page.
- `service-section.tsx` → its own child page via a "All CCTV services →" link.

---

## 9. Structured data 🟡

Zero JSON-LD currently. Add in priority order.

### 9.1 `ProfessionalService` — every page, via a shared component

Highest-value single change. Makes the business entity explicit for local results and AI surfaces.

```tsx
// components/json-ld.tsx
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://nanocomputingict.com/#organization",
    name: "Nano Computing ICT Solutions",
    url: "https://nanocomputingict.com",
    logo: "https://nanocomputingict.com/nano-logo.png",
    image: "https://nanocomputingict.com/nano-logo.png",
    description:
      "CCTV and security camera installation, door access control, time and attendance systems, computer network design and installation, server infrastructure, web and mobile development in Addis Ababa, Ethiopia.",
    telephone: "+251923787878",
    email: "info@nanocomputingict.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rayuma Building, Airport Road",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    areaServed: [
      { "@type": "City", name: "Addis Ababa" },
      { "@type": "Country", name: "Ethiopia" },
    ],
    knowsAbout: [
      "CCTV installation", "Security camera systems", "Door access control",
      "Biometric access control", "Time and attendance systems",
      "Structured network cabling", "Server infrastructure",
      "Web development", "Mobile app development", "Computer repair",
    ],
    openingHours: "Mo-Sa 08:00-18:00",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Render once in `app/layout.tsx`.

> **Confirm all NAP data before publishing.** Phone, address and hours above are taken from `app/layout.tsx` and `contact-section.tsx` in this codebase. `ProfessionalService` is the most sensitive schema type — inconsistent NAP across schema, Google Business Profile and the website is the classic cause of local ranking loss. Verify every field against the GBP listing before shipping. If the GBP address differs from `Rayuma Building, Airport Road`, resolve that first.

### 9.2 `BreadcrumbList`

On every non-home route. Cheap, and improves SERP presentation.

### 9.3 `Service` + `VideoObject`

On `/services` and each `/services/*` page (§8.2, §8.4).

### 9.4 `FAQPage`

Only if the visible FAQ content genuinely exists. Marking up content that isn't on the page risks a manual action — do not fabricate.

### 9.5 Validation

```bash
curl -X POST https://validator.schema.org/validate \
  -d "output=json" \
  --data-urlencode "url=https://nanocomputingict.com/services"
```

Verified: this endpoint works with **no API key** and `isRendered: true`, so it catches schema injected by client JS. Validate every URL type before shipping.

---

## 10. Tooling stack

Researched and verified 2026-10-03. Free tiers listed first.

### 10.1 Agent skills (procedural knowledge — free)

Install: `npx skills add <owner/repo> --skill <name>`

| Skill | Installs | Use |
| --- | --- | --- |
| [`seo-audit`](https://skills.sh/coreyhaines31/marketingskills/seo-audit) | 219K | 5-layer audit: crawlability, technical, on-page, content, authority |
| [`programmatic-seo`](https://skills.sh/coreyhaines31/marketingskills/programmatic-seo) | 139K | Template page generation — relevant at §8.2 scale |
| [`ai-seo`](https://skills.sh/coreyhaines31/marketingskills/ai-seo) | 135K | AI Overviews / ChatGPT / Perplexity citation optimisation |
| [`seo`](https://skills.sh/addyosmani/web-quality-skills/seo) | 48K | Evidence-led: runs live Lighthouse, then checks signals Lighthouse can't |
| [`seo-local`](https://skills.sh/agricidaniel/claude-seo/seo-local) | 6.0K | Local SEO — most relevant skill for this business |
| [`google-search-console`](https://skills.sh/kostja94/marketing-skills/google-search-console) | 1.8K | Reading GSC reports |

**Most valuable here:** `coreyhaines31/marketingskills` (52,473★, MIT, pushed same day) and `AgriciDaniel/claude-seo` (18,192★, 20+ granular skills).

⚠️ Skills are **procedural, not data**. They cannot supply search volume or competitor metrics. They tell an agent *how* to audit; §10.2–10.3 supply the *what*.

### 10.2 MCP servers

| Server | Cost | Notes |
| --- | --- | --- |
| **Google Search Console** via [`lionkiii/google-searchconsole-mcp`](https://github.com/lionkiii/google-searchconsole-mcp) | Free | Easiest auth — browser OAuth, **no Google Cloud project** |
| [`mikusnuz/gsc-mcp`](https://github.com/mikusnuz/gsc-mcp) | Free | 13 tools, broadest coverage (URL inspection, sitemaps) |
| [`ahonn/mcp-server-gsc`](https://github.com/ahonn/mcp-server-gsc) | Free | Most popular (275★) |
| **DataForSEO** — `https://mcp.dataforseo.com/v3/mcp` | **$50 min top-up** | Live SERP + volume + difficulty at ~$0.002/query. The one paid recommendation |
| GA4 — [`googleanalytics/google-analytics-mcp`](https://github.com/googleanalytics/google-analytics-mcp) | Free | Official Google server, 3,363★. Read-only, experimental |

**There is no official Google Search Console MCP server.** Google ships 50+ MCP servers (`github.com/google/mcp`) and Search Console is not among them — verified independently.

⚠️ **Do not use `egebese/dataseo-mcp`.** It scrapes Ahrefs' free interface via CAPTCHA-solving services and disclaims ToS compliance. Never on client work.

### 10.3 Free keyword research — verified working, no API key

| Method | Endpoint | Verified |
| --- | --- | --- |
| Google Suggest | `suggestqueries.google.com/complete/search?client=chrome&hl=en&gl=et&q=` | ✅ 854 live calls |
| Geo-subtype capture | same, `client=firefox` | ✅ Returns `google:suggestsubtypes` — Google's own geo flag |
| Wikipedia opensearch | `en.wikipedia.org/w/api.php?action=opensearch` | ✅ Descriptive UA required or it throttles |
| Google Trends | `trendspyg` — https://github.com/flack0x/trendspyg | ✅ Free MCP, no key |

**Dead ends — do not build on these:**

- 🔴 **Google Programmable Search JSON API is closed to new customers** (official docs, updated 2026-02-18). Existing customers must migrate by 2027-01-01.
- 🔴 **`pytrends` is archived.** Google rotated its cookies. Use `trendspyg`.
- 🔴 **Brave Search API free tier eliminated Feb 2026** — $5/1,000 req, card required.
- 🔴 **Google Keyword Planner** has no programmatic volume API for non-advertisers.

### 10.4 Technical auditing

| Tool | Cost | Use |
| --- | --- | --- |
| [`unlighthouse`](https://github.com/harlan-zw/unlighthouse) | Free | Crawls the **whole site** with Lighthouse. No key, no quota — the PSI escape hatch |
| [`@lhci/cli`](https://github.com/GoogleChrome/lighthouse-ci) | Free | Per-commit Lighthouse in CI. **Stops regressions** |
| [`validator.schema.org`](https://validator.schema.org/) | Free | `POST /validate`, renders JS, **no key**. Primary structured-data check |
| [PageSpeed Insights API](https://developers.google.com/pagespeedonline/v5/runPagespeed) | Free with key | ⚠️ **Without a key: HTTP 429**, tested. With a key: 25,000/day |
| [CrUX API](https://developer.chrome.com/docs/crux/api) | Free with key | Real-user CWV. **150 queries/min, no daily cap** |
| Sitebulb | 14-day trial | MCP is **read-only** — cannot start crawls |

⚠️ **Screaming Frog has no free CLI.** Use Unlighthouse + LHCI.
⚠️ `audit-ci` is the *accessibility* CI action, not SEO. Easy to confuse with LHCI.

### 10.5 Google Search Console quotas

Source: https://developers.google.com/webmaster-tools/limits

| Resource | Limit |
| --- | --- |
| Search Analytics | 1,200 QPM per site/user |
| URL Inspection | 600 QPM, **2,000 QPD** per site |
| Row cap | **25,000 rows per request** |
| **Daily row cap** | **~50,000 rows/day/search type/property** |
| Data retention | ~16 months |
| **Reporting lag** | **2–3 days** |

The row cap is why GSC totals rarely reconcile with the dashboard. For a small site the QPM limits are irrelevant; **the row cap and the 2–3 day lag are the real constraints** — design dashboards around weekly, not daily, movement.

---

## 11. Local SEO 🟡

**This is a local business and local ranking is the whole game.** `ProfessionalService` schema (§9.1) is necessary but not sufficient — it must agree with Google Business Profile.

1. **Claim and complete GBP.** Nano appears to hold a **5.0 rating** — real and valuable, but invisible without a complete profile.
2. **Exact NAP parity** across GBP, schema, footer and every page. Inconsistency is the leading cause of local ranking loss.
3. **Category selection.** Primary "Security system installer" / "Computer support and services"; secondary "Electrician" or "Telecommunications service" where genuinely applicable.
4. **Geo property:** use a **Domain property** (`sc-domain:nanocomputingict.com`) so www/non-www share one credential and one Sitemap.
5. **Photos:** the shop interior (`public/nano-1.jpg`), installed CCTV, racks. Real local photos outperform stock.
6. **Reviews:** ask after job completion. A 5.0 with volume beats 4.9 without.

---

## 12. Prioritised roadmap

### P0 — Unblock indexing (do first, ~2 hours)

| # | Action | File |
| --- | --- | --- |
| 1 | Remove root `alternates.canonical` 🔴 | `app/layout.tsx:68-70` |
| 2 | Set `metadataBase` | `app/layout.tsx` |
| 3 | Replace the rotating h1 with a static keyword h1 🔴 | `components/home-hero.tsx:35-44` |
| 4 | Verify each route emits a self-referencing canonical | — |

Without #1 nothing else can be measured.

### P1 — Foundation (~1 day)

5. `app/sitemap.ts` · 6. `app/robots.ts` · 7. `app/opengraph-image.tsx` · 8. `ProfessionalService` + `BreadcrumbList` JSON-LD · 9. Custom `app/not-found.tsx` · 10. Confirm live NAP matches schema before shipping #8.

### P2 — Content architecture (~1 week)

11. Build the six `/services/*` pages (§8.2) · 12. Add location language to `/services` copy (§8.3) · 13. Make bento cards link to their service pages (§8.6) · 14. Build out or noindex `/about` and `/shop` (§5) · 15. Add `/pricing` targeting the `price in ethiopia` cluster (§6.3).

### P3 — Enrichment (~1 week)

16. `VideoObject` markup + transcripts (§8.4) · 17. FAQ blocks with matching `FAQPage` markup · 18. GBP optimisation and NAP audit (§11) · 19. Link building — no local competitor has published pricing.

### P4 — Measurement (ongoing)

20. Connect GSC via MCP (§10.2) · 21. CrUX + LHCI baselines (§10.4) · 22. Weekly GSC review; expand via Suggest as new pages ship (§10.3).

### Expected sequencing

P0–P1 is under a day and fixes every structural defect. P2 is where ranking movement becomes possible. **Do not measure before P0 lands** — a canonical bug makes post-fix improvement impossible to attribute.

---

## 13. Verification checklist

Run after every change.

```bash
# 1. Per-route canonical must be self-referencing and unique
for r in / /services /contacts /about /shop; do
  echo -n "$r → "
  curl -s "https://nanocomputingict.com$r" \
    | grep -o '<link rel="canonical" href="[^"]*"'
done
# Expect: /services → .../services   (NOT the homepage)

# 2. No absolute localhost URLs in metadata
curl -s https://nanocomputingict.com/services | grep -c 'localhost'   # expect 0

# 3. Sitemap and robots resolve
curl -sI https://nanocomputingict.com/sitemap.xml | head -1   # 200
curl -s  https://nanocomputingict.com/robots.txt

# 4. Structured data valid (no key)
curl -s -X POST https://validator.schema.org/validate \
  -d "output=json" --data-urlencode "url=https://nanocomputingict.com/services"

# 5. Exactly one h1 per page, and it is static
curl -s https://nanocomputingict.com/ | grep -c '<h1'   # expect 1
```

Plus, in CI:

```bash
npx unlighthouse --site https://nanocomputingict.com
npx @lhci/cli autorun
```

---

## 14. Honest limitations

Stated plainly, because a plan that overstates its evidence is worse than no plan:

1. **No search volume data exists anywhere in this document.** Google Suggest provides none. Every demand signal here is *suggest frequency across seeds* — a proxy. **Real volumes require DataForSEO (~$50) or Keyword Planner.** Prioritise accordingly: validate the §6.2 "zero-suggestion" opportunities, since those rest on the strongest inference (no competition) rather than on volume.
2. **No keyword difficulty data was obtained.** "Low competition" for the zero-suggestion terms is inferred from absence of competitors, not measured.
3. **Local ranking is modelled on documented Google behaviour, not on this site's data.** No GSC property is connected, so there is no baseline. P4 exists to establish one.
4. **Traffic projections are deliberately absent.** Without volume and difficulty data any forecast would be invention.
5. **The live WordPress site has known defects** found during competitor research — placeholder theme text ("This is the heading / Offering the best image box wordpress plugin") on the homepage, a mislabeled Computer Repair slider, broken `about.html` links. Any migration should not carry these forward.
6. **§9.1's NAP values are taken from this codebase and are unverified against Google Business Profile.** Publishing inconsistent NAP is actively harmful. Confirm first.
7. **Competitor findings are from their public marketing copy and page structure**, not from backlink or traffic data — neither of which was obtainable for free.

---

## 15. Sources

**Verified APIs** — Google Suggest (`suggestqueries.google.com`, 854 calls) · Google Suggest firefox client (132 calls, geo subtypes) · Wikipedia opensearch · `validator.schema.org/validate` · PageSpeed Insights API (no-key quota test) · GSC quotas doc · SEO MCP endpoints (live `initialize` probes, all returned 401 as expected for unauthenticated)

**Verified repos** — checked via GitHub API for stars/licence/last-push: `coreyhaines31/marketingskills` 52,473★ · `AgriciDaniel/claude-seo` 18,192★ · `every-app/open-seo` 22,200★ · `addyosmani/web-quality-skills` 2,867★ · `googleanalytics/google-analytics-mcp` 3,363★ · `ahonn/mcp-server-gsc` 275★ · `harlan-zw/unlighthouse` 4,878★ · `GoogleChrome/lighthouse-ci` 7,102★ · `pa11y` 4,568★ · `dequelabs/axe-core` 7,587★ · `flack0x/trendspyg` 53★

**Explicitly NOT verified** — Bing autosuggest behaviour · `Autom8Minds/seo-mcp` capability claims (2★) · `localseodata/mcp-server` uptime and pricing · Sitebulb headless/CLI mode · Google Keyword Planner programmatic access · Semrush/Ahrefs plan tier claims for MCP access (secondary source)

**Do not use** — `egebese/dataseo-mcp` (CAPTCHA-solving against Ahrefs ToS) · Google Programmable Search JSON API (closed to new customers) · `pytrends` (archived) · any agent-marketed "SEO tool" repo under 10★