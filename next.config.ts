import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.REPO_NAME || "";

const nextConfig: NextConfig = {
  output: "export",
  // When deploying to GitHub Pages, set basePath to the repo name
  basePath: isProd && repoName ? `/${repoName}` : "",
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
