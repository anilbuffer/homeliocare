import React from "react";
import { Calendar, LayoutDashboard, ChevronDown, Filter } from "lucide-react";
import clsx from "clsx";

export type LayoutMode = "Calendar" | "Board";

interface FilterBarProps {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  caregiverFilter: string;
  setCaregiverFilter: (val: string) => void;
  patientFilter: string;
  setPatientFilter: (val: string) => void;
  regionFilter: string;
  setRegionFilter: (val: string) => void;
  uniqueCaregivers: string[];
  uniquePatients: string[];
  uniqueRegions: string[];
}

const SHIFT_FILTERS = [
  "All Shifts",
  "Unfilled",
  "Confirmed",
  "In Progress",
  "Completed",
  "Call-Offs",
];

export function FilterBar({
  layoutMode,
  setLayoutMode,
  activeFilter,
  setActiveFilter,
  caregiverFilter,
  setCaregiverFilter,
  patientFilter,
  setPatientFilter,
  regionFilter,
  setRegionFilter,
  uniqueCaregivers,
  uniquePatients,
  uniqueRegions,
}: FilterBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] mb-4 space-y-3">
      {/* Top row: Horizontal Filter Pills & Layout View Toggle */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Scrollable Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {SHIFT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={clsx(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border shrink-0",
                activeFilter === filter
                  ? "bg-brand-teal text-white border-brand-teal shadow-sm"
                  : "bg-slate-50/80 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Calendar vs Board View Mode Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          <div className="flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 w-full sm:w-auto">
            <button
              onClick={() => setLayoutMode("Calendar")}
              className={clsx(
                "flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                layoutMode === "Calendar"
                  ? "bg-white text-brand-teal shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setLayoutMode("Board")}
              className={clsx(
                "flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                layoutMode === "Board"
                  ? "bg-white text-brand-teal shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
        <div className="relative">
          <select
            value={caregiverFilter}
            onChange={(e) => setCaregiverFilter(e.target.value)}
            className="w-full appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
          >
            <option value="">Filter by Caregiver...</option>
            {uniqueCaregivers.map((cg) => (
              <option key={cg} value={cg}>
                {cg}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={patientFilter}
            onChange={(e) => setPatientFilter(e.target.value)}
            className="w-full appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
          >
            <option value="">Filter by Patient...</option>
            {uniquePatients.map((cl) => (
              <option key={cl} value={cl}>
                {cl}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="w-full appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
          >
            <option value="">Filter by Region...</option>
            {uniqueRegions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
