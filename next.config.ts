import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export served by GitHub Pages (see .github/workflows/deploy.yml).
  output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ["dirceu.sysko.io"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
