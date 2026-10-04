import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Hay dos layouts raíz (español en la raíz, inglés bajo /en), así que el
    // 404 global se define en app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
