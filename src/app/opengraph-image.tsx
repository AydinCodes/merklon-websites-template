import { ImageResponse } from "next/og";
import { site } from "@/site";

// The card people see when the link is shared. Built from src/site.ts at build time.
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 450"><defs><linearGradient id="a" x1="-50" y1="-40" x2="0" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#1e40af"/></linearGradient><linearGradient id="b" x1="0" y1="-40" x2="50" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#1e40af"/></linearGradient><linearGradient id="c" x1="-30" y1="-20" x2="30" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#1e40af"/></linearGradient></defs><g transform="matrix(7.5 0 0 7.5 375 300)"><path d="m -50,20 30,-60 20,20 -30,40 z" fill="url(#a)"/><path d="M 0,-20 20,-40 50,20 H 30 Z" fill="url(#b)"/><path d="M -30,20 0,-20 30,20 0,10 Z" fill="url(#c)" opacity="0.8"/></g></svg>`;

export default function Image() {
  const mark = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`;
  const host = new URL(site.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} width={100} height={60} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: "#18181b" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 38, lineHeight: 1.3, color: "#52525b", maxWidth: 900 }}>{site.tagline}</div>
        </div>
        <div style={{ fontSize: 26, color: "#71717a" }}>{host}</div>
      </div>
    ),
    size
  );
}
