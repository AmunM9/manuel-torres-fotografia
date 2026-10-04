import { ImageResponse } from "next/og";
import { cldUrl } from "@/lib/cloudinary";

export const OG_SIZE = { width: 1200, height: 630 };

interface BrandImageText {
  title: string;
  subtitle: string;
}

const HERO_ID = "manuel-torres/paola-andres/_MAN7574";

/** Imagen Open Graph de marca, compartida por ambos idiomas. */
export function brandImage({ title, subtitle }: BrandImageText) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#17140f",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cldUrl(HERO_ID, 1200)}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(23,20,15,0.82) 0%, rgba(23,20,15,0.35) 55%, rgba(23,20,15,0.05) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "72px",
            color: "#faf7f2",
          }}
        >
          <div
            style={{
              fontSize: 30,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Manuel Torres
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 18 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, opacity: 0.85, marginTop: 20 }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
