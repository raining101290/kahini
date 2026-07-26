import { ImageResponse } from "next/og";
import { site, siteMetadata } from "@/content/site";

export const runtime = "edge";
export const alt = siteMetadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          background: "#0a0710",
          padding: "80px 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            background: "#f0a202",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#f4ede2",
            letterSpacing: "-0.02em",
          }}
        >
          {site.brand.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#f4ede2",
            opacity: 0.8,
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
