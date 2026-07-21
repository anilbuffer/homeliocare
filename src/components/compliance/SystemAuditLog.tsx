"use client";

import React, { useState } from "react";
import { ShieldAlert, Download, Search, Filter, History, UserCheck, ShieldCheck } from "lucide-react";

const systemLogs = [
  { id: 1, action: "PHI Accessed", user: "Sarah Jenkins (RN)", target: "Patient Record: Eleanor Vance", time: "10:24 AM", date: "Jul 21, 2026", status: "Success", ip: "192.168.1.45" },
  { id: 2, action: "Failed Login", user: "Unknown", target: "System Access", time: "09:12 AM", date: "Jul 21, 2026", status: "Failed", ip: "203.0.113.82" },
  { id: 3, action: "Password Changed", user: "Marcus Johnson (Caregiver)", target: "User Account", time: "08:45 AM", date: "Jul 21, 2026", status: "Success", ip: "192.168.1.112" },
  { id: 4, action: "Care Plan Updated", user: "Dr. Emily Wong", target: "Patient Record: Robert Chen", time: "04:30 PM", date: "Jul 20, 2026", status: "Success", ip: "10.0.0.15" },
  { id: 5, action: "Report Exported", user: "Admin (System)", target: "Compliance Quarterly Report", time: "02:15 PM", date: "Jul 20, 2026", status: "Success", ip: "192.168.1.10" }
];

export function SystemAuditLog() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-teal" />
            System-Wide Audit Log (HIPAA)
          </h2>
          <p className="text-xs text-slate-500 mt-1">Immutable record of all system access and PHI interactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal w-full sm:w-64 transition-colors"
            />
          </div>
          <button className="p-2 text-slate-500 hover:text-brand-teal hover:bg-brand-teal/10 rounded-full transition-colors" title="Filter Logs">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-brand-teal hover:bg-brand-teal/10 rounded-full transition-colors" title="Export Audit Log">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-4 py-3 font-semibold">Timestamp</th>
              <th className="px-4 py-3 font-semibold">Action & Status</th>
              <th className="px-4 py-3 font-semibold">User / Actor</th>
              <th className="px-4 py-3 font-semibold">Target Resource</th>
              <th className="px-4 py-3 font-semibold">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {systemLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-900">{log.time}</div>
                      <div className="text-xs text-slate-500">{log.date}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {log.status === "Success" ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                    )}
                    <span className="font-medium">{log.action}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    {log.user}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
                    {log.target}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-slate-500">
                  {log.ip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
        <button className="text-sm font-medium text-brand-teal hover:text-teal-700 transition-colors">
          View Older Logs
        </button>
      </div>
    </div>
  );
}
