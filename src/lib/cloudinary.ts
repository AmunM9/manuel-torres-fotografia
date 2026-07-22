const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "hn2odsuq";

/** URL de entrega de Cloudinary (formato/calidad auto, limitada a `w`). */
export function cldUrl(publicId: string, w: number): string {
  const path = publicId
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_limit,w_${w}/${path}`;
}
