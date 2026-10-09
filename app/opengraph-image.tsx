import { ImageResponse } from "next/og";

export const alt =
  "Nano Computing ICT Solutions — CCTV, access control and ICT infrastructure in Addis Ababa, Ethiopia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Generated at build time by Next.js and served from
 * /opengraph-image, so `twitter:card = "summary_large_image"` finally has an
 * image to point at.
 *
 * Deliberately uses satori's built-in font rather than fetching Inter Tight at
 * build time: a build-time network fetch makes the build fail offline. The
 * brand is carried by the black canvas, layout and rules instead.
 *
 * Note: satori supports flexbox only — every element with more than one child
 * needs an explicit display, and CSS grid is not available.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          padding: "72px 80px",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: "#ffffff",
              color: "#0a0a0a",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            n
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
            }}
          >
            <div style={{ fontSize: 27, fontWeight: 700, letterSpacing: -0.4 }}>
              nano computing ICT Solutions
            </div>
            <div style={{ fontSize: 19, color: "#a1a1aa", marginTop: 4 }}>
              Your Integrated Safety Partner
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              letterSpacing: -1.6,
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            CCTV, access control and ICT infrastructure in Addis Ababa
          </div>
          <div
            style={{
              display: "flex",
              height: 5,
              width: 120,
              backgroundColor: "#ffffff",
              marginTop: 36,
            }}
          />
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#d4d4d8" }}>
            CCTV · Access Control · Time Attendance · Networks · Servers · Software
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>
            +251 923 78 78 78
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}