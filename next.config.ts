import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables static export for cPanel static hosting
  output: "export",
  
  // Set the base path to match the subfolder in cPanel (public_html/homeliocare)
  // We only apply this in production so local development is unaffected
  basePath: process.env.NODE_ENV === "production" ? "/homeliocare" : "",
  
  // Required for static export if you use the Next.js <Image /> component
  images: {
    unoptimized: true,
  },

  // Generates /page/index.html instead of /page.html, working seamlessly with default cPanel/Apache configurations
  trailingSlash: true,
};

export default nextConfig;
