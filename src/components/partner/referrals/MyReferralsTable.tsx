"use client";

import React, { useState } from "react";
import { mockReferrals, mockTeamMembers } from "@/lib/partner/mockData";
import { ReferralStatus } from "@/lib/partner/types";
import { format, parseISO } from "date-fns";
import { Search, Filter, Clock, ChevronDown } from "lucide-react";
import { getStatusColor } from "@/components/partner/dashboard/PartnerRecentReferrals";
import clsx from "clsx";

export function MyReferralsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [memberFilter, setMemberFilter] = useState<string>("All");

  const filteredReferrals = mockReferrals.filter(ref => {
    const matchesSearch = ref.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.serviceRequested.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || ref.status === statusFilter;
    const matchesMember = memberFilter === "All" || ref.submittingMember === memberFilter;
    return matchesSearch && matchesStatus && matchesMember;
  });

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      {/* Table Header / Controls */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient or service..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none w-full sm:w-auto bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Received">Received</option>
              <option value="Under Review">Under Review</option>
              <option value="Assessment Scheduled">Assessment Scheduled</option>
              <option value="Accepted as Client">Accepted as Client</option>
              <option value="Not a Fit">Not a Fit</option>
              <option value="Referred Elsewhere">Referred Elsewhere</option>
              <option value="Additional Info Requested">Additional Info Requested</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative w-full sm:w-auto">
            <select
              value={memberFilter}
              onChange={e => setMemberFilter(e.target.value)}
              className="appearance-none w-full sm:w-auto bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal cursor-pointer"
            >
              <option value="All">All Members</option>
              {mockTeamMembers.map(tm => (
                <option key={tm.id} value={tm.name}>{tm.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100">
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">Patient Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">Service Requested</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">Submitted By</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">Date Submitted</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-slate-800 whitespace-nowrap">{ref.patientName}</div>
                    {ref.urgency === "Discharge within 24-48h" && (
                      <div className="flex items-center gap-1 text-[10px] font-medium text-red-600 mt-1 whitespace-nowrap">
                        <Clock className="w-3 h-3" /> Urgent
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 max-w-[200px] truncate">
                    {ref.serviceRequested}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {ref.submittingMember}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {format(parseISO(ref.submittedAt), "MMM d, yyyy")}
                    <div className="text-xs text-slate-400 mt-0.5 text-[10px] whitespace-nowrap">{format(parseISO(ref.submittedAt), "h:mm a")}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-start gap-1 whitespace-nowrap">
                      <span
                        className={clsx(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
                          getStatusColor(ref.status)
                        )}
                      >
                        {ref.status}
                      </span>
                      {ref.notes && ref.status === "Additional Info Requested" && (
                        <span className="text-[10px] text-amber-600 mt-1 max-w-[200px] truncate block " title={ref.notes}>
                          {ref.notes}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Filter className="w-8 h-8 text-slate-300 mb-3" />
                    <p className="text-base font-medium text-slate-700 mb-1">No referrals found</p>
                    <p className="text-xs">Try adjusting your filters or search term.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
