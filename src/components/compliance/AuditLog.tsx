"use client";

import React, { useState } from "react";
import { Search, Download, ShieldCheck, User, Settings, CheckCircle2 } from "lucide-react";
import { AuditLogEntry } from "@/types/compliance";

interface AuditLogProps {
  logs: AuditLogEntry[];
}

export function AuditLog({ logs }: AuditLogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatLogDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-[400px]">
      <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/50">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-teal" />
          Audit Log
        </h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-900 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-sm text-slate-600 hover:text-brand-teal hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal/20">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4 space-y-3">
        {filteredLogs.map((log) => {
          let Icon = Settings;
          if (log.user === "System") Icon = Settings;
          else if (log.action.includes("Verified")) Icon = CheckCircle2;
          else Icon = User;

          return (
            <div key={log.id} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200">
              <div className="shrink-0 mt-0.5 text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-slate-900">{log.action}</span>
                  <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100" suppressHydrationWarning>
                    {formatLogDate(log.timestamp)}
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-2">{log.details}</div>
                <div className="text-xs font-medium text-brand-teal bg-brand-teal/5 inline-block px-2 py-1 rounded-md">By: {log.user}</div>
              </div>
            </div>
          );
        })}
        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-slate-500">No logs found.</div>
        )}
      </div>
    </div>
  );
}
