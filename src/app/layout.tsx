import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth/RBACContext";
import { RBACProvider } from "@/lib/rbac/rbacStore";
import { Toaster } from "sonner";
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
        <RBACProvider>
          <AuthProvider>{children}</AuthProvider>
        </RBACProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
