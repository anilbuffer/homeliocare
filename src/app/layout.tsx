import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth/RBACContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homeliocare",
  description: "Comprehensive home and property care platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
    >
      <body className="min-h-screen antialiased bg-page-bg text-text-primary font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
