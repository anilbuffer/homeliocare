"use client";

import React, { useState } from "react";
import { mockFindings, Finding } from "./mockData";
import { AlertCircle, FileText, CalendarDays, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export function FindingsTable() {
  const [findings] = useState<Finding[]>(mockFindings);

  const getSeverityColor = (severity: Finding['severity']) => {
    switch (severity) {
      case "Critical": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Major": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Minor": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
  };

  const getStatusColor = (status: Finding['status']) => {
    switch (status) {
      case "Open": return "bg-slate-500/10 text-text-primary border-slate-500/20";
      case "In Progress": return "bg-brand-teal/10 text-brand-teal border-brand-teal/20";
      case "Closed": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-brand-teal" />
          <h3 className="text-lg font-medium text-text-primary">Findings & Corrective Actions</h3>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border-subtle bg-slate-50/50">
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Description</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Severity</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Source Audit</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Owner</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Due Date</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {findings.map((finding) => (
              <tr key={finding.id} className="hover:bg-slate-50/30 transition-colors cursor-pointer group">
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-text-primary max-w-[300px] truncate">{finding.description}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{finding.id}</div>
                </td>
                <td className="px-5 py-4">
                  <span className={clsx("px-2.5 py-1 text-xs font-medium rounded-full border whitespace-nowrap", getSeverityColor(finding.severity))}>
                    {finding.severity}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary hover:text-brand-teal transition-colors">
                    <FileText className="w-4 h-4 opacity-70" />
                    {finding.sourceAuditType}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-text-primary whitespace-nowrap">{finding.owner}</span>
                </td>
                <td className="px-5 py-4">
                  <div className={clsx(
                    "flex items-center gap-2 text-sm whitespace-nowrap",
                    (finding.status !== "Closed" && new Date(finding.dueDate) < new Date('2026-07-16')) ? "text-red-400 font-medium" : "text-text-primary"
                  )}>
                    <CalendarDays className="w-4 h-4 opacity-70" />
                    {finding.dueDate}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className={clsx("px-2.5 py-1 text-xs font-medium rounded-full border whitespace-nowrap", getStatusColor(finding.status))}>
                      {finding.status}
                    </span>
                    <button className="text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-brand-teal/20 rounded">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {findings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-text-secondary text-sm">
                  No open findings — great work
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
