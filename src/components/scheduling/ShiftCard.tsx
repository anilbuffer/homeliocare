import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { format, parseISO } from "date-fns";
import type { Shift } from "@/lib/scheduling/mockData";
import { motion } from "framer-motion";

interface ShiftCardProps {
  shift: Shift;
  onClick: () => void;
}

export function ShiftCard({ shift, onClick }: ShiftCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: shift.id, data: { type: "Shift", shift } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isUnfilled = shift.status === "Unfilled";

  const formatTime = (isoString: string) => {
    try {
      return format(parseISO(isoString), "ha").toLowerCase();
    } catch {
      return isoString;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={clsx(
        "bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-3 text-left cursor-grab active:cursor-grabbing hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all relative overflow-hidden group mb-3",
        isDragging && "opacity-50 border-brand-teal ring-2 ring-brand-teal/20",
        isUnfilled ? "border-dashed border-red-300 bg-red-50/50" : ""
      )}
    >
      {/* Pulse effect for unfilled */}
      {isUnfilled && (
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-red-100/50 pointer-events-none"
        />
      )}

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="font-semibold text-slate-800 text-sm truncate">
            {shift.patientName}
          </div>
          {isUnfilled ? (
            <div className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              Unfilled
            </div>
          ) : shift.status === "Completed" ? (
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              Completed
            </div>
          ) : shift.status === "In Progress" ? (
            <div className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              In Progress
            </div>
          ) : shift.status === "Pending Confirmation" ? (
            <div className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              Pending
            </div>
          ) : (
            <div className="text-[10px] font-bold text-brand-teal bg-brand-teal/10 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              Confirmed
            </div>
          )}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{shift.patientAddress}</span>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-1">
            {shift.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {shift.assignedCaregiverName && (
              <div className="flex items-center gap-1.5 bg-brand-teal/5 pl-1 pr-2 py-0.5 rounded-full border border-brand-teal/10">
                <div className="w-4 h-4 rounded-full bg-brand-teal/20 flex items-center justify-center text-[8px] font-bold text-brand-teal uppercase">
                  {shift.assignedCaregiverName.substring(0, 2)}
                </div>
                <span className="text-[10px] font-medium text-brand-teal">
                  {shift.assignedCaregiverName.split(" ")[0]}
                </span>
              </div>
            )}
            <span className="text-[10px] font-mono text-slate-400">
              {shift.shiftNumber}
            </span>
          </div>
        </div>

        {isUnfilled && (
          <div className="mt-1 flex items-center gap-1 text-xs text-red-500 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            Needs coverage
          </div>
        )}
      </div>
    </div>
  );
}
