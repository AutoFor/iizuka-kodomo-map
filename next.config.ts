import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 向けに静的書き出し（out/ に HTML を生成）
  output: "export",
  images: { unoptimized: true },
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
