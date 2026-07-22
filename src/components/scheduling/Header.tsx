import React from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

interface HeaderProps {
  viewMode: "Day" | "Week" | "Month";
  setViewMode: (mode: "Day" | "Week" | "Month") => void;
  openShiftsCount: number;
  onCreateShift?: () => void;
}

export function Header({ viewMode, setViewMode, openShiftsCount, onCreateShift }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Scheduling & Shift Board</h1>
        <p className="text-sm text-slate-500 mt-1">
          {openShiftsCount} open shifts need coverage today
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-white backdrop-blur-xl rounded-full p-1 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          {(["Day", "Week", "Month"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={clsx(
                "px-5 py-1.5 rounded-full text-sm font-medium transition-all",
                viewMode === mode
                  ? "bg-brand-teal text-white shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          onClick={onCreateShift}
          className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Create Shift
        </button>
      </div>
    </div>
  );
}
