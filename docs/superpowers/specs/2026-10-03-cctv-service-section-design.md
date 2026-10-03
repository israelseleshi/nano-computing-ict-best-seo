# CCTV Service Section — Design

**Date:** 2026-10-03
**Status:** Approved
**Scope:** Add a CCTV & security camera service to the services page and the home page "Our Services" bento grid.

## Background

The site currently presents four services: Time Attendance Systems, Computer Network Design & Installation, Mobile App Development, and Web Development. CCTV is absent from both the services page and the home page bento grid.

This is a content gap rather than a cosmetic one. `app/layout.tsx:18` already advertises "High-definition CCTV & IP surveillance" in the site-wide metadata, and CCTV security camera installation is the first keyword in `app/layout.tsx`'s keyword list. The services page metadata never mentions it.

Source copy is taken from the live `nanocomputingict.com/services` page, "CCTV, Security System" block.

## Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Copy voice | Rewrite into the existing house voice | The source is vendor-style marketing prose with typos ("SECUIRTY"). Verbatim use would read as a different company from the four adjacent sections. |
| Bento placement | Full-width feature card at top | CCTV is the #1 service on the live site and the #1 site keyword. Leading with it on both surfaces keeps the two pages consistent. |
| Data structure | Duplicate into both files, matching the current pattern | The service arrays are already duplicated across the two surfaces and have already drifted. This change follows the existing convention rather than refactoring. See Non-goals. |
| `bleed` handling | Hand-set per entry, as today | Consistent with the existing four entries. Inserting CCTV first requires flipping the four existing values to preserve alternation. |

## Source content mapping

Facts preserved from `nanocomputingict.com/services`:

- Security systems for both businesses and homes
- Securing property against burglary and other damage
- Home security and family safety
- Intrusion detection into an area or building
- Some systems detect intrusion only; others combine fire and intrusion protection

Deliberately dropped: the investment-justification framing and the "stop worrying" reassurance, both of which are marketing register rather than the house voice.

## Implementation

### 1. `app/services/page.tsx`

Insert a new first entry into the `services` array, shaped exactly like the existing four:

| Field | Value |
| --- | --- |
| `id` | `cctv-security` |
| `title` | `CCTV & Security Camera Systems` |
| `video` | `/gemini_generated_security-camera_video_dcb142c8.mp4` |
| `videoLabel` | `CCTV surveillance cameras covering a building exterior footage` |
| `bleed` | `left` |

**Summary:**

> Nobody plans for the night something goes missing. A camera system records who's at your gate, who was on your floor and what actually happened at 3am, so an argument about a break-in ends with footage instead of guesses. We install and maintain CCTV for homes and businesses across Addis Ababa, from a single camera over the front door to full coverage of every entrance, corridor and car park. Some setups watch for intruders on their own, and others fold fire and smoke detection into the same run of cable.

**Points:**

- One camera over the door, or every entrance, corridor and car park covered
- Footage that settles the argument instead of starting one
- Intruder detection on its own, or bundled with fire and smoke alarms
- Homes, shops, offices and multi-site businesses

Flip the `bleed` of the four existing entries to preserve left/right alternation:

| Service | Current | New |
| --- | --- | --- |
| CCTV & Security Camera Systems | — | `left` |
| Time Attendance Systems | `left` | `right` |
| Computer Network Design & Installation | `right` | `left` |
| Mobile App Development | `left` | `right` |
| Web Development | `right` | `left` |

The `ServiceSection` component requires no change. It consumes `service.bleed` and already renders at 60/40 with alternating parallax.

### 2. `app/services/page.tsx` metadata

Replace the `description` export so it leads with CCTV, matching both the new section order and the site-wide metadata:

> CCTV and security camera installation for homes and businesses in Addis Ababa, Ethiopia. High-definition surveillance with intruder and fire detection, time attendance systems, computer network design & installation, and mobile app development for Android and iOS.

### 3. `components/features-section-demo-3.tsx`

Insert a new first entry into the `services` array:

| Field | Value |
| --- | --- |
| `id` | `cctv-security` |
| `title` | `CCTV & Security Camera Systems` |
| `video` | `/gemini_generated_security-camera_video_dcb142c8.mp4` |
| `videoLabel` | `CCTV surveillance cameras covering a building exterior footage` |
| `className` | `lg:col-span-6 border-b` |
| `wide` | `true` (new optional field) |

**Description** (short form, matched to the ~157 character length of the existing four):

> Cameras for homes, shops and offices across Addis Ababa, from a single unit over the door to full site coverage, with intruder or fire detection built in.

Add an optional `wide?: boolean` to the array's element type. When `wide` is set, render the card body as `lg:grid-cols-2` with the text column and the video column side by side, `items-center`, text column first and video column second. Narrow cards keep the current stacked title, description, then video layout untouched.

Reuse the existing `FeatureTitle`, `FeatureDescription` and `ServiceVideo` primitives so type scale and video treatment stay identical.

### 4. Border handling

No rework required. The existing per-card `className` border strings already encode the 2×2 pattern for the four narrow cards, and they land in the same two rows once the wide card takes the row above them. Each card's `className` changes only by span, not by border.

Resulting layout:

```
row 1  [ CCTV & Security Camera Systems ...................... lg:col-span-6 ]  border-b

row 2  [ Time Attendance Systems      | Computer Network Design ]  border-b + lg:border-r | border-b
row 3  [ Mobile App Development      | Web Development         ]  lg:border-r           | (none)
```

### 5. Not changed

- `components/bento` intro subcopy — already reads "Security, workforce and infrastructure systems", still accurate
- `components/home-hero.tsx` — dark hero, unaffected
- `components/floating-header.tsx` and `components/site-footer.tsx` — no anchor-based service navigation exists, so no nav additions are needed
- `components/service-section.tsx` and `components/service-video.tsx` — already generic over the `Service` shape

## Non-goals

- **No shared data module.** `app/services/page.tsx` and `components/features-section-demo-3.tsx` keep their own arrays. Consolidating them into `lib/services.ts` would remove real drift, and deriving `bleed` from array index would make alternation impossible to break — but both were declined in favour of matching the existing pattern. Worth revisiting if the service count grows past roughly ten.
- **No other services.** The live site also lists Door Access Control, Computer Repair and Apple Computer Service. None are present here and all are out of scope for this change.
- **No new video.** `gemini_generated_security-camera_video_dcb142c8.mp4` already exists in `public/`. The unused `gemini_generated-cctv-camera-_video_80afdcd0.mp4` is left alone.

## Verification

- `npm run lint` — clean
- `npx tsc --noEmit` — clean
- `npm run build` — all 9 static routes generate
- `bg-canvas` page background from the preceding change must still resolve to `#f2f2f2`
- Manual check: CCTV leads both pages; bento row 1 spans full width with no orphaned cell; no doubled or missing hairline borders; CCTV video autoplays muted and loops, and pauses with visible controls under `prefers-reduced-motion`