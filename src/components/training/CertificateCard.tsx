"use client";

import React from "react";
import { Award, Download } from "lucide-react";

interface CertificateCardProps {
  name: string;
  issued: string;
  expires: string;
  status: "Active" | "Expiring Soon" | "Expired";
}

export function CertificateCard({ name, issued, expires, status }: CertificateCardProps) {

  const statusConfig = {
    "Active": {
      badge: "bg-brand-teal text-white",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      border: "border-teal-200"
    },
    "Expiring Soon": {
      badge: "bg-accent-amber text-white",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      border: "border-amber-200"
    },
    "Expired": {
      badge: "bg-accent-red text-white",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      border: "border-red-200"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`bg-white/70 backdrop-blur-xl rounded-2xl border ${config.border} shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col relative`}>
      {/* Status Ribbon/Badge */}
      <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-[10px] font-bold uppercase tracking-wider ${config.badge}`}>
        {status}
      </div>

      <div className="flex items-center gap-4 mb-6 mt-2">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${config.iconBg}`}>
          <Award className={`w-6 h-6 ${config.iconColor}`} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 text-sm leading-snug">{name}</h4>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 mb-6">
        <div>
          <span className="block text-[10px] uppercase font-semibold text-slate-400 mb-0.5">Issued</span>
          {issued}
        </div>
        <div className="text-right">
          <span className="block text-[10px] uppercase font-semibold text-slate-400 mb-0.5">Expires</span>
          <span className={status === "Expired" ? "text-accent-red font-semibold" : ""}>{expires}</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-colors mt-auto">
        <Download className="w-4 h-4" />
        Download PDF
      </button>
    </div>
  );
}
