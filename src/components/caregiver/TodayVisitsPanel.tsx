"use client";

import React from "react";
import { Clock, MapPin, Navigation, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Visit } from "@/lib/caregiver/caregiverPortalData";
import { Avatar } from "@/components/ui/Avatar";

interface TodayVisitsPanelProps {
  visits: Visit[];
  activeVisitId: string;
  onSelectVisit: (visitId: string) => void;
}

export function TodayVisitsPanel({
  visits,
  activeVisitId,
  onSelectVisit,
}: TodayVisitsPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:border-brand-teal/30 transition-all duration-300 p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900">Today&apos;s Visits</h3>
          <p className="text-xs text-gray-500 mt-0.5">{visits.length} visits scheduled today</p>
        </div>
        <span className="text-xs bg-brand-teal/10 text-brand-teal font-semibold px-2.5 py-1 rounded-full">
          Jul 22, 2026
        </span>
      </div>

      <div className="space-y-3">
        {visits.map((v, idx) => {
          const isActive = v.id === activeVisitId;
          const isCompleted = v.status === "Completed";
          const isInProgress = v.status === "In Progress";

          return (
            <React.Fragment key={v.id}>
              {/* Distance / Travel Time connector between visits */}
              {idx > 0 && (
                <div className="my-1.5 pl-6 flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                  <div className="w-0.5 h-6 bg-gray-200 ml-2" />
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full border border-slate-200">
                    <Navigation className="w-3 h-3 text-blue-500 transform rotate-45" />
                    <span>Travel: <strong className="text-gray-800">{v.travelTimeFromPreviousMin || 12} mins</strong> ({v.travelDistanceMiles || 3.5} mi)</span>
                  </div>
                </div>
              )}

              <div
                onClick={() => onSelectVisit(v.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${isActive
                  ? "border-brand-teal bg-brand-teal/5 shadow-xs ring-1 ring-brand-teal"
                  : isCompleted
                    ? "border-gray-200 bg-gray-50 opacity-80"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/60"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    src={v.clientPhoto}
                    name={v.clientName}
                    size="lg"
                    className="rounded-xl w-11 h-11 border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{v.clientName}</h4>
                      {isInProgress && (
                        <span className="text-[10px] bg-brand-teal text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                          In Progress
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-brand-teal" /> Done
                        </span>
                      )}
                      {v.status === "Scheduled" && !isActive && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          Scheduled
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1 font-medium">
                      <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{v.scheduledStartTime} - {v.scheduledEndTime}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{v.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span>Tasks: {v.tasks.filter((t) => t.completed).length}/{v.tasks.length} done</span>
                  <span className="text-brand-teal font-semibold flex items-center hover:underline">
                    View Details <ChevronRight className="w-3 h-3 inline" />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
