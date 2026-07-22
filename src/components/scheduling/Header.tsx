import React from "react";
import { Plus, Calendar, Clock, AlertCircle } from "lucide-react";
import clsx from "clsx";

interface HeaderProps {
  viewMode: "Day" | "Week" | "Month";
  setViewMode: (mode: "Day" | "Week" | "Month") => void;
  openShiftsCount: number;
  onCreateShift?: () => void;
}

export function Header({ viewMode, setViewMode, openShiftsCount, onCreateShift }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Scheduling & Shift Board</h1>
          {openShiftsCount > 0 && (
            <span className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-red-200/60 inline-flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {openShiftsCount} Open
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time dispatch, caregiver coverage, and shift shift tracking.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
        {/* Day / Week / Month Pill Switcher */}
        <div className="flex bg-white backdrop-blur-xl rounded-2xl p-1 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:border-brand-teal/40 transition-all duration-300">
          {(["Day", "Week", "Month"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={clsx(
                "px-3.5 sm:px-5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200",
                viewMode === mode
                  ? "bg-brand-teal text-white shadow-md"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Create Shift Primary Button */}
        <button
          onClick={onCreateShift}
          className="flex items-center justify-center gap-2 bg-brand-teal text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-[0_6px_32px_rgba(0,0,0,0.08)] active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Create Shift</span>
        </button>
      </div>
    </div>
  );
}
