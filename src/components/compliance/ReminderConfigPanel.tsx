"use client";

import React, { useState } from "react";
import { Bell, Mail, Smartphone, BellRing, Settings } from "lucide-react";
import { ReminderLogEntry } from "@/types/compliance";

interface ReminderConfigPanelProps {
  logs: ReminderLogEntry[];
}

export function ReminderConfigPanel({ logs }: ReminderConfigPanelProps) {
  const [enabled, setEnabled] = useState(true);

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
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white/50">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-teal" />
          Automated Reminders
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">{enabled ? "ON" : "OFF"}</span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? "bg-brand-teal" : "bg-slate-300"}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${enabled ? "translate-x-5.5 left-[2px]" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-900">Schedule Configuration</div>
          <div className="text-xs text-slate-500">60, 30, 14, and 1 days before expiry</div>
        </div>
        <button className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors border border-slate-200">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-bold m-4 mb-0">Recent Logs</h4>
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 bg-white m-4 p-4 rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]  hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner border border-slate-100/50 ${log.channel === "email" ? "bg-blue-500/10 text-blue-400" :
              log.channel === "sms" ? "bg-purple-500/10 text-purple-400" :
                "bg-emerald-500/10 text-emerald-400"
              }`}>
              {log.channel === "email" ? <Mail className="w-4 h-4" /> :
                log.channel === "sms" ? <Smartphone className="w-4 h-4" /> :
                  <BellRing className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">{log.caregiverName}</div>
              <div className="text-xs text-slate-500 truncate">{log.itemName}</div>
              <div className="text-xs text-slate-500 mt-1" suppressHydrationWarning>
                {formatLogDate(log.sentAt)}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${log.status === "Sent" ? "bg-slate-50 border-slate-200 text-slate-500" :
                log.status === "Opened" ? "bg-emerald-50 border-emerald-200 text-emerald-500" :
                  "bg-red-50 border-red-200 text-red-500"
                }`}>
                {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
