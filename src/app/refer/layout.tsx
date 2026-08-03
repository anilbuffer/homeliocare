import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export const metadata = {
  title: "Submit a Referral | Homelio",
  description: "Public referral form for healthcare providers.",
};

export default function ReferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-900">
      {/* Minimal Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/refer" className="flex items-center gap-2 group">
            <div className="bg-teal-600 text-white p-1.5 rounded-lg group-hover:bg-teal-700 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-slate-800">
              Homelio
            </span>
          </Link>
          <div className="text-sm text-slate-500">
            Provider Referral Portal
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
