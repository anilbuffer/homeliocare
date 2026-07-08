"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Home, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Clock } from "lucide-react";
import clsx from "clsx";
import { Visit, Caregiver } from "@/lib/mockTrackerData";

interface VisitQueueProps {
  visits: Visit[];
  selectedVisitId: string | null;
  onSelectVisit: (id: string | null) => void;
  onAssign?: (caregiverId: string, visitId: string) => void;
  activeCaregiver?: Caregiver | null;
  onDragOverVisit?: (visitId: string | null) => void;
  caregivers?: Caregiver[];
}

export function VisitQueue({ visits, selectedVisitId, onSelectVisit, onAssign, activeCaregiver, onDragOverVisit, caregivers = [] }: VisitQueueProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Assigned" | "Unassigned" | "Completed">("All");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Group visits (mocking a single "TODAY" group for simplicity)
  const filteredVisits = visits.filter((v) => {
    const matchesSearch = v.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || v.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All"
      || (filterStatus === "Assigned" && (v.status === "Assigned" || v.status === "In Progress"))
      || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      All: visits.length,
      Assigned: visits.filter(v => v.status === "Assigned" || v.status === "In Progress").length,
      Unassigned: visits.filter(v => v.status === "Unassigned").length,
      Completed: visits.filter(v => v.status === "Completed").length,
    };
  };
  const counts = getStatusCounts();

  const getIconForStatus = (status: Visit["status"], className?: string) => {
    const defaultClassName = className || "w-4 h-4 text-white";
    switch (status) {
      case "Unassigned": return <AlertCircle className={defaultClassName} />;
      case "Completed": return <CheckCircle2 className={defaultClassName} />;
      default: return <Home className={defaultClassName} />; // Assigned or In Progress
    }
  };

  const getColorForStatus = (status: Visit["status"]) => {
    switch (status) {
      case "Unassigned": return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
      case "Completed": return "bg-brand-teal shadow-[0_0_10px_rgba(14,163,131,0.4)]";
      default: return "bg-brand-teal shadow-[0_0_10px_rgba(14,163,131,0.4)]";
    }
  };

  const getDistanceInfo = (v: Visit, specificCaregiver?: Caregiver | null) => {
    const targetCaregiver = specificCaregiver || activeCaregiver;
    if (!targetCaregiver) return null;
    const dx = targetCaregiver.location.x - v.location.x;
    const dy = targetCaregiver.location.y - v.location.y;
    const rawDist = Math.sqrt(dx * dx + dy * dy);
    const miles = (rawDist / 10).toFixed(1);
    const minutes = Math.round((rawDist / 10) * 3 + 5);
    return { miles, minutes, name: targetCaregiver.name };
  };

  return (
    <div
      className={clsx(
        "relative h-screen transition-all duration-300 shrink-0 z-30",
        isCollapsed ? "w-0" : "w-[340px]"
      )}
    >
      <div className="absolute inset-0 overflow-hidden bg-white border-l border-slate-200 shadow-sm">
        <div className="w-[340px] h-full flex flex-col">
          {/* Header */}
        <div className="p-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-slate-800">Visit Queue</h2>
            <button className="text-slate-400 hover:text-slate-600">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search visits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {(["All", "Assigned", "Unassigned", "Completed"] as const).map((tab) => {
              const isActive = filterStatus === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={clsx(
                    "flex-shrink-0 relative flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium rounded-full transition-colors z-10",
                    isActive ? "text-white" : "text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="queue-tab"
                      className="absolute inset-0 bg-brand-teal rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab} <span className={clsx("px-1.5 py-0.5 rounded-full text-[10px]", isActive ? "bg-white/20 text-white" : "bg-white text-slate-500 border border-slate-200")}>{counts[tab]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="text-[11px] font-semibold text-slate-400 tracking-wider mb-2 pl-6">TODAY</div>

          <div className="relative">
            {/* Vertical Line connecting timeline dots */}
            <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-slate-100 -z-10"></div>

            <AnimatePresence>
              {filteredVisits.map((v, i) => {
                const isSelected = selectedVisitId === v.id;

                return (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    onClick={() => onSelectVisit(isSelected ? null : v.id)}
                    className="relative flex gap-3 mb-3 group cursor-pointer"
                    onDragOver={(e) => {
                      if (v.status === "Unassigned") {
                        e.preventDefault(); // Allow drop
                        e.dataTransfer.dropEffect = "move";
                      } else {
                        e.dataTransfer.dropEffect = "none";
                      }
                    }}
                    onDragEnter={() => {
                      if (v.status === "Unassigned") {
                        setDragOverId(v.id);
                        onDragOverVisit?.(v.id);
                      }
                    }}
                    onDragLeave={() => {
                      if (v.status === "Unassigned" && dragOverId === v.id) {
                        setDragOverId(null);
                        onDragOverVisit?.(null);
                      }
                    }}
                    onDrop={(e) => {
                      if (v.status === "Unassigned") {
                        e.preventDefault();
                        setDragOverId(null);
                        onDragOverVisit?.(null);
                        const caregiverId = e.dataTransfer.getData("caregiverId");
                        if (caregiverId && onAssign) {
                          onAssign(caregiverId, v.id);
                        }
                      }
                    }}
                  >
                    {/* Icon Dot */}
                    <div className="shrink-0 mt-0.5">
                      <div className={clsx(
                        "w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white z-10 relative transition-transform",
                        getColorForStatus(v.status),
                        isSelected && "scale-110"
                      )}>
                        {getIconForStatus(v.status, "w-3 h-3 text-white")}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={clsx(
                      "flex-1 bg-white rounded-xl border p-2 transition-all hover:shadow-md",
                      isSelected ? "border-brand-teal shadow-[0_0_0_1px_rgba(14,163,131,1)]" : "border-slate-200",
                      dragOverId === v.id && v.status === "Unassigned" && "border-brand-teal shadow-[0_0_0_2px_rgba(14,163,131,0.5)] bg-emerald-50/30"
                    )}>
                      <div className="flex items-start justify-between mb-0.5">
                        <h3 className="font-semibold text-slate-800 text-xs truncate pr-2">{v.clientName}</h3>
                        <span className={clsx(
                          "text-[9px] px-1 py-0.5 rounded font-medium shrink-0",
                          v.status === "Unassigned" ? "bg-red-50 text-red-600" :
                            v.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                              "bg-slate-50 text-slate-600"
                        )}>
                          {v.status.toLowerCase()}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 mb-1.5">Visit #{v.id.replace('v-', '4570')}</div>

                      <div className="text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded-md mb-1.5">
                        {v.address}
                      </div>

                      {(() => {
                        const assignedCaregiver = v.caregiverId ? caregivers.find(c => c.id === v.caregiverId) : null;
                        const distInfo = getDistanceInfo(v, assignedCaregiver);
                        
                        return (
                          <div className={clsx(
                            "text-[10px] font-medium p-1 rounded flex items-center gap-1 mb-1.5 transition-colors",
                            distInfo 
                              ? "bg-emerald-50/50 text-brand-teal" 
                              : "bg-slate-50 text-slate-400"
                          )}>
                            📍 {distInfo 
                              ? `~${distInfo.miles} mi (est.) · ${distInfo.minutes} min from ${distInfo.name}`
                              : "-- mi · -- min (Unassigned)"
                            }
                          </div>
                        );
                      })()}

                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {v.time}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {filteredVisits.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400 pl-8">
                No visits found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -translate-y-1/2 -left-3 bg-white border border-slate-200 shadow-sm rounded-full w-6 h-6 flex items-center justify-center text-slate-500 hover:text-brand-teal transition-colors z-50"
      >
        {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
