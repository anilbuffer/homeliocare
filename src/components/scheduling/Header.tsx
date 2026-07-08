import React from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

interface HeaderProps {
  viewMode: "Day" | "Week" | "Month";
  setViewMode: (mode: "Day" | "Week" | "Month") => void;
  openShiftsCount: number;
}

export function Header({ viewMode, setViewMode, openShiftsCount }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Scheduling & Shift Board</h1>
        <p className="text-sm text-slate-500 mt-1">
          {openShiftsCount} open shifts need coverage today
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-white/80 backdrop-blur-md rounded-full p-1 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          {(["Day", "Week", "Month"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={clsx(
                "px-5 py-1.5 rounded-full text-sm font-medium transition-all",
                viewMode === mode
                  ? "bg-brand-teal text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        <button className="inline-flex items-center gap-2 bg-brand-teal hover:bg-[#0c8f72] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95">
          <Plus className="w-4 h-4" />
          Create Shift
        </button>
      </div>
    </div>
  );
}
