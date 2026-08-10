import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables static export for cPanel static hosting
  output: "export",
  
  // Since we are deploying to a subdomain (homeliocare.creativebuffer.com),
  // the app is served at the root (/). We do not need a basePath.
  // basePath: process.env.NODE_ENV === "production" ? "/homeliocare" : "",
  
  // Required for static export if you use the Next.js <Image /> component
  images: {
    unoptimized: true,
  },

  // Generates /page/index.html instead of /page.html, working seamlessly with default cPanel/Apache configurations
  trailingSlash: true,
};

export default nextConfig;
