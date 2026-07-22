"use client";

import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import type { Photo } from "@/lib/weddings";
import { cldUrl } from "@/lib/cloudinary";

interface LightboxViewProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
}

/** Overlay a pantalla completa (marfil), navegación una a una + zoom + fullscreen. */
export default function LightboxView({ photos, index, onClose }: LightboxViewProps) {
  const slides = photos.map((p) => ({
    src: cldUrl(p.id, 1600),
    width: p.w,
    height: p.h,
    srcSet: [960, 1600, 2400].map((w) => ({
      src: cldUrl(p.id, w),
      width: w,
      height: Math.round((p.h / p.w) * w),
    })),
  }));

  return (
    <Lightbox
      open={index >= 0}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Counter, Zoom, Fullscreen]}
      counter={{ container: { style: { top: "unset", bottom: 0, left: 0 } } }}
      carousel={{ finite: false, padding: "5%", spacing: "24px" }}
      controller={{ closeOnBackdropClick: true }}
      animation={{ swipe: 320 }}
      zoom={{ maxZoomPixelRatio: 2.5, doubleTapDelay: 250 }}
      styles={{
        root: {
          "--yarl__color_backdrop": "#faf7f2",
          "--yarl__color_button": "rgba(23, 20, 15, 0.5)",
          "--yarl__color_button_active": "#17140f",
          "--yarl__color_button_disabled": "rgba(23, 20, 15, 0.18)",
        },
      }}
    />
  );
}
