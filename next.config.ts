import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Use webpack for now since next-pwa requires it
  webpack: (config) => {
    return config;
  },
};

// Conditionally apply PWA config only in production
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default process.env.NODE_ENV === "production" ? withPWA(nextConfig) : nextConfig;
