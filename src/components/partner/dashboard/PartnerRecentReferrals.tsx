"use client";

import React from "react";
import Link from "next/link";
import { mockReferrals } from "@/lib/partner/mockData";
import { ArrowRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ReferralStatus } from "@/lib/partner/types";
import clsx from "clsx";

export function getStatusColor(status: ReferralStatus) {
  switch (status) {
    case "Accepted as Client":
      return "bg-brand-teal/10 text-brand-teal border-brand-teal/20";
    case "Under Review":
    case "Assessment Scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Additional Info Requested":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Not a Fit":
    case "Referred Elsewhere":
      return "bg-slate-100 text-slate-600 border-slate-200";
    case "Received":
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

export function PartnerRecentReferrals() {
  // Show top 4 recent referrals
  const recentReferrals = mockReferrals.slice(0, 4);

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative flex flex-col">
      <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 text-lg">Recent Referrals</h3>
        <Link
          href="/partner/referrals"
          className="text-sm font-medium text-brand-teal hover:text-teal-700 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-wider whitespace-nowrap">Patient</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-wider whitespace-nowrap">Service</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-wider whitespace-nowrap">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentReferrals.map((ref) => (
              <tr key={ref.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 whitespace-nowrap">
                      {ref.patientInitials}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-brand-teal transition-colors whitespace-nowrap">
                        {ref.patientName}
                      </div>
                      {ref.urgency === "Discharge within 24-48h" && (
                        <div className="flex items-center gap-1 text-[10px] font-medium text-red-600 mt-0.5 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          Urgent Discharge
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-slate-600 whitespace-nowrap">{ref.serviceRequested}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
                      getStatusColor(ref.status)
                    )}
                  >
                    {ref.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {formatDistanceToNow(new Date(ref.submittedAt), { addSuffix: true })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
