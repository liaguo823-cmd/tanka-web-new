import type { NextConfig } from "next";

const repo = "tanka-web-current";
const isProd = process.env.NODE_ENV === "production";
// Optional sub-path (e.g. "/v2") so we can deploy the same repo to a
// nested URL alongside the root build.
const subPath = process.env.SUB_PATH ?? "";
const prodBase = `/${repo}${subPath}`;

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  // GitHub Pages serves at https://<user>.github.io/<repo>/, so all asset
  // URLs need the repo prefix in production.
  basePath: isProd ? prodBase : undefined,
  assetPrefix: isProd ? `${prodBase}/` : undefined,
  // Pages doesn't run the Next image optimizer.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "icons.duckduckgo.com" },
    ],
  },
  // Pages prefers trailing-slash URLs to avoid 404s.
  trailingSlash: true,
  // Exposed to the browser so the asset() helper can prepend basePath
  // to raw <img src> URLs (next/image already does this on its own).
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? prodBase : "",
  },
};

export default nextConfig;
