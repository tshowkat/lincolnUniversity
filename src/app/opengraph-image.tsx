import { ImageResponse } from "next/og";
import { programmes } from "@/data/programmes";

export const alt = "Lincoln University College — Lincoln Online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          backgroundImage: "linear-gradient(120deg, #DF1B22 0%, #A10F14 55%, #0F2D5E 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", opacity: 0.9 }}>
          Lincoln University College · Malaysia
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Earn a Recognised Degree —</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#FFD93D" }}>Anywhere, Anytime</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.95 }}>
          Lincoln Online · {programmes.length} programmes · PhD to Foundation
        </div>
      </div>
    ),
    size,
  );
}
