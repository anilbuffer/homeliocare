import React from "react";
import type { Shift, Caregiver } from "@/lib/scheduling/mockData";
import { format, parseISO } from "date-fns";
import clsx from "clsx";

interface CalendarViewProps {
  viewMode: "Day" | "Week" | "Month";
  shifts: Shift[];
  caregivers: Caregiver[];
  onShiftClick: (shift: Shift) => void;
}

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6am to 10pm
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

export function CalendarView({ viewMode, shifts, caregivers, onShiftClick }: CalendarViewProps) {
  // We'll create a row for Unfilled shifts, and rows for each caregiver
  const unfilledShifts = shifts.filter(s => s.status === "Unfilled");

  const getShiftStyle = (shift: Shift) => {
    if (viewMode === "Week") {
      // Mock all shifts to appear on Wednesday
      return { left: `${(2 / 7) * 100}%`, width: `${(1 / 7) * 100}%` };
    }
    if (viewMode === "Month") {
      // Mock all shifts to appear in Week 3
      return { left: `${(2 / 5) * 100}%`, width: `${(1 / 5) * 100}%` };
    }

    try {
      const start = parseISO(shift.startTime);
      const end = parseISO(shift.endTime);

      const startHour = start.getHours() + start.getMinutes() / 60;
      const endHour = end.getHours() + end.getMinutes() / 60;

      const colStart = Math.max(0, startHour - 6);
      const colSpan = Math.max(0.5, endHour - startHour);

      return {
        left: `${(colStart / 17) * 100}%`,
        width: `${(colSpan / 17) * 100}%`,
      };
    } catch {
      return { left: "0%", width: "10%" }; // fallback
    }
  };

  const getColumns = () => {
    if (viewMode === "Week") return WEEK_DAYS;
    if (viewMode === "Month") return MONTH_WEEKS;
    return HOURS;
  };
  const columns = getColumns();

  const getShiftColor = (status: string) => {
    switch (status) {
      case "Unfilled": return "bg-red-50 border-red-200 text-red-700 border-dashed";
      case "Completed": return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "In Progress": return "bg-blue-50 border-blue-200 text-blue-700";
      case "Pending Confirmation": return "bg-amber-50 border-amber-200 text-amber-700";
      case "Confirmed": return "bg-brand-teal/10 border-brand-teal/30 text-brand-teal";
      default: return "bg-slate-50 border-slate-200 text-slate-700";
    }
  };

  const formatTime = (iso: string) => {
    try {
      return format(parseISO(iso), "ha").toLowerCase();
    } catch {
      return "";
    }
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <div className="min-w-[1000px]">
        {/* Header Row */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <div className="w-32 sm:w-64 shrink-0 py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 sticky left-0 z-20 bg-slate-50/95 backdrop-blur-sm shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
            Caregiver
          </div>
          <div className="flex-1 relative flex">
            {columns.map((col, idx) => (
              <div key={idx} className="flex-1 py-3 text-center text-xs font-medium text-slate-500 border-r border-slate-100 last:border-r-0">
                {viewMode === "Day"
                  ? (typeof col === "number" ? (col > 12 ? `${col - 12}pm` : col === 12 ? '12pm' : `${col}am`) : col)
                  : col}
              </div>
            ))}
          </div>
        </div>

        {/* Unfilled Row */}
        <div className="flex border-b border-slate-200 hover:bg-slate-50 transition-colors">
          <div className="w-32 sm:w-64 shrink-0 py-4 px-2 sm:px-4 border-r border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 sticky left-0 z-10 bg-white/95 backdrop-blur-sm shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
              !
            </div>
            <div className="overflow-hidden w-full">
              <div className="font-semibold text-red-600 text-xs sm:text-sm truncate">Unfilled</div>
              <div className="text-[10px] sm:text-xs text-slate-500 truncate">{unfilledShifts.length} shifts</div>
            </div>
          </div>
          <div className="flex-1 relative">
            {columns.map((_, idx) => (
              <div key={idx} className="absolute top-0 bottom-0 border-r border-slate-100" style={{ left: `${(idx) * (100 / columns.length)}%`, width: `${100 / columns.length}%` }} />
            ))}
            {/* Shifts */}
            {unfilledShifts.map((shift) => (
              <div
                key={shift.id}
                onClick={() => onShiftClick(shift)}
                className={clsx(
                  "absolute top-2 bottom-2 rounded-lg border flex flex-col justify-center px-2 cursor-pointer hover:shadow-md transition-shadow overflow-hidden",
                  getShiftColor(shift.status)
                )}
                style={getShiftStyle(shift)}
              >
                <div className="text-xs font-semibold truncate">{shift.patientName}</div>
                <div className="text-[10px] opacity-80 truncate flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(shift.startTime)}-{formatTime(shift.endTime)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Caregiver Rows */}
        {caregivers.map((caregiver) => {
          const caregiverShifts = shifts.filter(s => s.assignedCaregiverId === caregiver.id);

          return (
            <div key={caregiver.id} className="flex border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors group">
              <div className="w-32 sm:w-64 shrink-0 py-4 px-2 sm:px-4 border-r border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 sticky left-0 z-10 bg-white/95 backdrop-blur-sm shadow-[2px_0_10px_rgba(0,0,0,0.02)] group-hover:bg-slate-50/95 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  {caregiver.name.substring(0, 2)}
                </div>
                <div className="overflow-hidden w-full">
                  <div className="font-semibold text-slate-800 text-xs sm:text-sm truncate">{caregiver.name}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 truncate">{caregiver.credentials.join(" • ")}</div>
                </div>
              </div>
              <div className="flex-1 relative">
                {columns.map((_, idx) => (
                  <div key={idx} className="absolute top-0 bottom-0 border-r border-slate-100" style={{ left: `${(idx) * (100 / columns.length)}%`, width: `${100 / columns.length}%` }} />
                ))}

                {caregiverShifts.map((shift) => (
                  <div
                    key={shift.id}
                    onClick={() => onShiftClick(shift)}
                    className={clsx(
                      "absolute top-2 bottom-2 rounded-lg border flex flex-col justify-center px-2 cursor-pointer hover:shadow-md transition-shadow overflow-hidden",
                      getShiftColor(shift.status)
                    )}
                    style={getShiftStyle(shift)}
                  >
                    <div className="text-xs font-semibold truncate">{shift.patientName}</div>
                    <div className="text-[10px] opacity-80 truncate flex items-center gap-1">
                      <Clock className="w-3 h-3 inline-block" />
                      {formatTime(shift.startTime)}-{formatTime(shift.endTime)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// simple Clock icon just for the CalendarView inside here
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
