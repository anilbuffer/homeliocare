"use client";

import React, { useState } from "react";
import { Search, Filter, Calendar as CalendarIcon, User, ChevronRight } from "lucide-react";
import { mockAudits, Audit, AuditType, AuditStatus } from "./mockData";
import clsx from "clsx";

export function AuditList() {
  const [audits] = useState<Audit[]>(mockAudits);

  const getStatusColor = (status: AuditStatus) => {
    switch (status) {
      case "Completed": return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
      case "In Progress": return "bg-amber-400/10 text-amber-400 border-amber-400/20";
      case "Overdue": return "bg-red-400/10 text-red-400 border-red-400/20";
      default: return "bg-slate-400/10 text-text-secondary border-slate-400/20";
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-medium text-text-primary">Audit Schedule & Assignment</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search audits..."
              className="w-full bg-white border border-border-subtle rounded-xl pl-9 pr-4 py-2 text-sm text-text-primary placeholder-slate-400 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
            />
          </div>
          <button className="p-2 border border-border-subtle rounded-xl hover:bg-slate-50 transition-colors text-text-primary">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-border-subtle bg-slate-50/50">
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Subject</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Type</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Supervisor</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Due Date</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {audits.map((audit) => (
              <tr key={audit.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={audit.avatarUrl} alt={audit.subjectName} className="w-8 h-8 rounded-full bg-slate-100" />
                    <div>
                      <div className="text-sm font-medium text-text-primary whitespace-nowrap">{audit.subjectName}</div>
                      <div className="text-xs text-text-secondary">{audit.subjectType}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-text-primary whitespace-nowrap">{audit.type}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary whitespace-nowrap">
                    <User className="w-4 h-4 text-slate-500" />
                    {audit.assignedSupervisor}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className={clsx(
                    "flex items-center gap-2 text-sm whitespace-nowrap",
                    audit.status === "Overdue" ? "text-red-400 font-medium" : "text-text-primary"
                  )}>
                    <CalendarIcon className="w-4 h-4 opacity-70" />
                    {audit.dueDate}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={clsx("px-2.5 py-1 text-xs font-medium rounded-full border whitespace-nowrap", getStatusColor(audit.status))}>
                    {audit.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-brand-teal hover:text-text-primary hover:bg-brand-teal rounded-lg transition-colors whitespace-nowrap">
                    {audit.status === "Completed" ? "View" : (audit.status === "In Progress" ? "Continue" : "Start")}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {audits.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-text-secondary text-sm">
                  No audits scheduled this month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
