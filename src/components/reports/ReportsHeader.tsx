import React from "react";
import { Calendar, FileDown } from "lucide-react";

interface ReportsHeaderProps {
  savedCount: number;
  scheduledCount: number;
  onBuildCustom: () => void;
}

export function ReportsHeader({ savedCount, scheduledCount, onBuildCustom }: ReportsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">Reports & Analytics</h1>
        <p className="text-sm text-slate-500">
          {savedCount} saved reports · {scheduledCount} scheduled
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Global Date Range Selector */}
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select className="bg-transparent border-none text-slate-700 text-sm focus:ring-0 cursor-pointer outline-none font-medium">
            <option value="last30">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={onBuildCustom}
          className="flex items-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
        >
          <FileDown className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
}
