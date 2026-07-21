"use client";

import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { FileCheck, FileWarning, Search, Filter, MoreVertical, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui/Card";

interface OnboardingHire {
  id: string;
  name: string;
  role: string;
  startDate: string;
  avatarUrl?: string;
  progress: number; // 0 to 100
  documents: {
    i9: "completed" | "missing" | "pending";
    w4: "completed" | "missing" | "pending";
    backgroundCheck: "completed" | "missing" | "pending";
    cprCert: "completed" | "missing" | "pending";
  };
}

const mockNewHires: OnboardingHire[] = [
  {
    id: "1",
    name: "Amanda Riley",
    role: "Registered Nurse (RN)",
    startDate: "Oct 15, 2026",
    progress: 75,
    documents: {
      i9: "completed",
      w4: "completed",
      backgroundCheck: "completed",
      cprCert: "missing",
    }
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Home Health Aide",
    startDate: "Oct 22, 2026",
    progress: 25,
    documents: {
      i9: "pending",
      w4: "missing",
      backgroundCheck: "pending",
      cprCert: "completed",
    }
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Certified Nursing Assistant",
    startDate: "Nov 01, 2026",
    progress: 100,
    documents: {
      i9: "completed",
      w4: "completed",
      backgroundCheck: "completed",
      cprCert: "completed",
    }
  }
];

const DocumentStatusIcon = ({ status }: { status: "completed" | "missing" | "pending" }) => {
  if (status === "completed") return <FileCheck className="w-4 h-4 text-emerald-500" />;
  if (status === "missing") return <FileWarning className="w-4 h-4 text-rose-500" />;
  return <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />;
};

const DocumentStatusText = ({ status, label }: { status: "completed" | "missing" | "pending", label: string }) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <DocumentStatusIcon status={status} />
      <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">{label}</span>
    </div>
  );
};

export function OnboardingList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      {/* Controls */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex flex-1 items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search new hires..."
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm"
            />
          </div>
          <button className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">New Hire</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4">Onboarding Progress</th>
              <th className="px-6 py-4 text-center">Required Documents</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockNewHires.map((hire) => (
              <tr key={hire.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={hire.avatarUrl} alt={hire.name} fallback={hire.name.substring(0, 2)} size="sm" />
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-brand-teal transition-colors">
                        {hire.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{hire.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {hire.startDate}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 w-48">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          hire.progress === 100 ? "bg-emerald-500" : "bg-brand-teal"
                        )}
                        style={{ width: `${hire.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600 w-8">{hire.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-6">
                    <DocumentStatusText status={hire.documents.i9} label="I-9" />
                    <DocumentStatusText status={hire.documents.w4} label="W-4" />
                    <DocumentStatusText status={hire.documents.backgroundCheck} label="BGC" />
                    <DocumentStatusText status={hire.documents.cprCert} label="CPR" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {hire.progress < 100 && (
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Send Reminder">
                        <Mail className="w-4 h-4" />
                      </button>
                    )}
                    <button className="text-brand-teal font-medium hover:text-emerald-700 transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-emerald-50">
                      Review
                    </button>
                    <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
