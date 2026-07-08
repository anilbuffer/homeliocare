import React from "react";
import { Calendar, LayoutDashboard, ChevronDown } from "lucide-react";
import clsx from "clsx";

export type LayoutMode = "Calendar" | "Board";

interface FilterBarProps {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  caregiverFilter: string;
  setCaregiverFilter: (val: string) => void;
  clientFilter: string;
  setClientFilter: (val: string) => void;
  regionFilter: string;
  setRegionFilter: (val: string) => void;
  uniqueCaregivers: string[];
  uniqueClients: string[];
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
  clientFilter,
  setClientFilter,
  regionFilter,
  setRegionFilter,
  uniqueCaregivers,
  uniqueClients,
  uniqueRegions,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 mb-4">
      {/* Pill Filters */}
      <div className="flex flex-wrap gap-2">
        {SHIFT_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={clsx(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
              activeFilter === filter
                ? "bg-brand-teal text-white border-brand-teal"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              value={caregiverFilter}
              onChange={(e) => setCaregiverFilter(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3 pr-7 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full text-xs font-medium text-slate-600 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <option value="">Caregiver</option>
              {uniqueCaregivers.map(cg => (
                <option key={cg} value={cg}>{cg}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3 pr-7 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full text-xs font-medium text-slate-600 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <option value="">Client</option>
              {uniqueClients.map(cl => (
                <option key={cl} value={cl}>{cl}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-3 pr-7 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full text-xs font-medium text-slate-600 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <option value="">Region</option>
              {uniqueRegions.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-white/80 backdrop-blur-md rounded-xl p-1 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] ml-2">
          <button
            onClick={() => setLayoutMode("Calendar")}
            className={clsx(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all",
              layoutMode === "Calendar"
                ? "bg-brand-teal text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <Calendar className="w-4 h-4" />
            Calendar
          </button>
          <button
            onClick={() => setLayoutMode("Board")}
            className={clsx(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all",
              layoutMode === "Board"
                ? "bg-brand-teal text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            Board
          </button>
        </div>
      </div>
    </div>
  );
}
