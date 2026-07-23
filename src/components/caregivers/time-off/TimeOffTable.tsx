"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Check, X, Search, Filter } from "lucide-react";

interface TimeOffRequest {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  type: "PTO" | "Sick Leave" | "Unpaid";
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Denied";
  submittedAt: string;
}

const mockRequests: TimeOffRequest[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "Registered Nurse (RN)",
    type: "PTO",
    startDate: "Nov 20, 2026",
    endDate: "Nov 25, 2026",
    reason: "Family vacation",
    status: "Pending",
    submittedAt: "2 days ago"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Physical Therapist",
    type: "Sick Leave",
    startDate: "Oct 28, 2026",
    endDate: "Oct 29, 2026",
    reason: "Medical appointment",
    status: "Approved",
    submittedAt: "1 week ago"
  },
  {
    id: "3",
    name: "Lisa Wong",
    role: "Home Health Aide",
    type: "Unpaid",
    startDate: "Dec 10, 2026",
    endDate: "Dec 15, 2026",
    reason: "Personal reasons",
    status: "Denied",
    submittedAt: "2 weeks ago"
  }
];

export function TimeOffTable() {
  const [requests, setRequests] = useState(mockRequests);

  const handleAction = (id: string, action: "Approved" | "Denied") => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: action } : req));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      {/* Controls */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex flex-1 items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-slate-200 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <button className="px-3.5 py-2 rounded-full bg-white border border-slate-200 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium">
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
              <th className="px-6 py-4">Caregiver</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={req.avatarUrl} alt={req.name} fallback={req.name.substring(0, 2)} size="sm" />
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-brand-teal transition-colors">
                        {req.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{req.submittedAt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="default" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                    {req.type}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-700 font-medium">{req.startDate}</div>
                  <div className="text-xs text-slate-500">to {req.endDate}</div>
                </td>
                <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate" title={req.reason}>
                  {req.reason}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={
                    req.status === "Approved" ? "success" :
                      req.status === "Denied" ? "error" : "warning"
                  }>
                    {req.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  {req.status === "Pending" ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction(req.id, "Denied")}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                        title="Deny"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "Approved")}
                        className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
