import type { NextConfig } from "next";

// Only the explicit development preview permits embedding. Production keeps
// its frame protection even if a preview flag is accidentally retained.
const embeddedPreview =
  process.env.NODE_ENV !== "production" && process.env.WEB_PREVIEW === "1";
const previewHostnames = (process.env.PREVIEW_HOSTNAMES ?? "")
  .split(",")
  .map((hostname) => hostname.trim())
  .filter(Boolean);
for (const hostname of previewHostnames) {
  if (
    !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
      hostname,
    )
  ) {
    throw new Error(
      "PREVIEW_HOSTNAMES must contain hostnames without schemes, ports, paths or wildcards.",
    );
  }
}

const backendUrl = process.env.BACKEND_URL?.replace(/\/$/, "");
if (backendUrl) {
  const url = new URL(backendUrl);
  if (
    (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) ||
    url.username || url.password || url.pathname !== "/" || url.search || url.hash
  ) throw new Error("BACKEND_URL must be an HTTPS origin (or localhost HTTP for testing).");
}

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1", ...previewHostnames],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "www.apple.com", pathname: "/v/**" },
      { protocol: "https", hostname: "store.storeimages.cdn-apple.com", pathname: "/1/**" },
      { protocol: "https", hostname: "images.samsung.com", pathname: "/is/image/samsung/**" },
      { protocol: "https", hostname: "dyson-h.assetsadobe2.com", pathname: "/is/image/**" },
      { protocol: "https", hostname: "gmedia.playstation.com", pathname: "/is/image/SIEPDC/**" },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: backendUrl ? [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }] : [],
      afterFiles: [], fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          ...(embeddedPreview
            ? []
            : [{ key: "X-Frame-Options", value: "DENY" }]),
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
