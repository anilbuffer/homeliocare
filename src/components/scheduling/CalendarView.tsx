import React from "react";
import type { Shift, Caregiver } from "@/lib/scheduling/mockData";
import { format, parseISO } from "date-fns";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";
import { AlertTriangle, Clock } from "lucide-react";

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

  // Conflict Detection
  const conflicts: string[] = [];
  caregivers.forEach(cg => {
    const cgShifts = shifts.filter(s => s.assignedCaregiverId === cg.id && s.status !== "Call-Off" && s.status !== "Unfilled");
    let totalHours = 0; 
    let hasOverlap = false;

    cgShifts.forEach((s1, i) => {
      try {
        const start1 = parseISO(s1.startTime);
        const end1 = parseISO(s1.endTime);
        // Mock weekly hours by scaling daily hours
        totalHours += ((end1.getTime() - start1.getTime()) / (1000 * 60 * 60)) * 5; 

        cgShifts.forEach((s2, j) => {
          if (i !== j) {
            const start2 = parseISO(s2.startTime);
            const end2 = parseISO(s2.endTime);
            // Overlap check
            if (start1 < end2 && start2 < end1) hasOverlap = true;
          }
        });
      } catch (e) {
        // ignore date parsing errors for mock data
      }
    });

    if (hasOverlap) conflicts.push(`${cg.name} has overlapping scheduled shifts.`);
    if (totalHours > 40) conflicts.push(`${cg.name} exceeds 40 hrs/week (${Math.round(totalHours)} hrs projected).`);
  });

  const getShiftStyle = (shift: Shift) => {
    try {
      const start = parseISO(shift.startTime);
      const end = parseISO(shift.endTime);

      if (viewMode === "Week") {
        const dayIndex = (start.getDay() + 6) % 7;
        return { left: `${(dayIndex / 7) * 100}%`, width: `${(1 / 7) * 100}%` };
      }
      if (viewMode === "Month") {
        const date = start.getDate();
        const weekIndex = Math.min(4, Math.floor((date - 1) / 7));
        return { left: `${(weekIndex / 5) * 100}%`, width: `${(1 / 5) * 100}%` };
      }

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
      case "Unfilled": return "bg-red-50/90 border-red-300 text-red-700 border-dashed hover:bg-red-100";
      case "Completed": return "bg-emerald-50/90 border-emerald-300 text-emerald-800 hover:bg-emerald-100";
      case "In Progress": return "bg-blue-50/90 border-blue-300 text-blue-800 hover:bg-blue-100";
      case "Pending Confirmation": return "bg-amber-50/90 border-amber-300 text-amber-800 hover:bg-amber-100";
      case "Confirmed": return "bg-teal-50/90 border-teal-300 text-teal-900 hover:bg-teal-100";
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
    <div className="space-y-3">
      {/* Conflict Detection Banner */}
      {conflicts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3 shadow-sm animate-in fade-in">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">Scheduling Conflicts Detected</h4>
            <ul className="mt-1 space-y-1">
              {conflicts.map((conflict, i) => (
                <li key={i} className="text-xs font-medium text-amber-700/90 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  {conflict}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Card noPadding className="overflow-hidden border border-slate-200">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="min-w-[850px] lg:min-w-[1000px]">
          {/* Header Row */}
          <div className="flex border-b border-slate-200 bg-slate-50/90">
            <div className="w-36 sm:w-60 shrink-0 py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 sticky left-0 z-50 bg-slate-50/95 backdrop-blur-md shadow-[2px_0_10px_rgba(0,0,0,0.03)]">
              Caregiver
            </div>
            <div className="flex-1 relative flex">
              {columns.map((col, idx) => (
                <div key={idx} className="flex-1 py-3 text-center text-xs font-semibold text-slate-500 border-r border-slate-100 last:border-r-0">
                  {viewMode === "Day"
                    ? (typeof col === "number" ? (col > 12 ? `${col - 12}pm` : col === 12 ? '12pm' : `${col}am`) : col)
                    : col}
                </div>
              ))}
            </div>
          </div>

          {/* Unfilled Row */}
          <div className="flex border-b border-slate-200 hover:bg-slate-50/60 transition-colors">
            <div className="w-36 sm:w-60 shrink-0 py-3.5 px-3 sm:px-4 border-r border-slate-200 flex items-center gap-2.5 sm:gap-3 sticky left-0 z-3 bg-white/95 backdrop-blur-md shadow-[2px_0_10px_rgba(0,0,0,0.03)]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                !
              </div>
              <div className="overflow-hidden w-full">
                <div className="font-semibold text-red-600 text-xs sm:text-sm truncate">Unfilled Shifts</div>
                <div className="text-[10px] sm:text-xs text-slate-400 truncate">{unfilledShifts.length} open shift(s)</div>
              </div>
            </div>
            <div className="flex-1 relative min-h-[56px]">
              {columns.map((_, idx) => (
                <div key={idx} className="absolute top-0 bottom-0 border-r border-slate-100" style={{ left: `${(idx) * (100 / columns.length)}%`, width: `${100 / columns.length}%` }} />
              ))}
              {/* Shifts */}
              {unfilledShifts.map((shift) => (
                <div
                  key={shift.id}
                  onClick={() => onShiftClick(shift)}
                  className={clsx(
                    "absolute top-1.5 bottom-1.5 rounded-xl border flex flex-col justify-center px-2.5 cursor-pointer shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all overflow-hidden z-3",
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
              <div key={caregiver.id} className="flex border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition-colors group">
                <div className="w-36 sm:w-60 shrink-0 py-3.5 px-3 sm:px-4 border-r border-slate-200 flex items-center gap-2.5 sm:gap-3 sticky left-0 z-30 bg-white/95 backdrop-blur-md shadow-[2px_0_10px_rgba(0,0,0,0.03)] group-hover:bg-slate-50/95 transition-colors">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {caregiver.name.substring(0, 2)}
                  </div>
                  <div className="overflow-hidden w-full">
                    <div className="font-semibold text-slate-800 text-xs sm:text-sm truncate">{caregiver.name}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 truncate">{caregiver.credentials.join(" • ")}</div>
                  </div>
                </div>
                <div className="flex-1 relative min-h-[56px]">
                  {columns.map((_, idx) => (
                    <div key={idx} className="absolute top-0 bottom-0 border-r border-slate-100" style={{ left: `${(idx) * (100 / columns.length)}%`, width: `${100 / columns.length}%` }} />
                  ))}

                  {caregiverShifts.map((shift) => (
                    <div
                      key={shift.id}
                      onClick={() => onShiftClick(shift)}
                      className={clsx(
                        "absolute top-1.5 bottom-1.5 rounded-xl border flex flex-col justify-center px-2.5 cursor-pointer shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all overflow-hidden z-60",
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
    </Card>
    </div>
  );
}

// Clock icon helper (imported from lucide-react instead)
