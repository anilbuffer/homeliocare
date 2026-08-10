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
  onCompareRoutes?: (visitId: string) => void;
  caregivers?: Caregiver[];
}

export function VisitQueue({ visits, selectedVisitId, onSelectVisit, onAssign, activeCaregiver, onDragOverVisit, onCompareRoutes, caregivers = [] }: VisitQueueProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Unassigned" | "Assigned" | "Completed">("All");
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Group visits (mocking a single "TODAY" group for simplicity)
  const filteredVisits = visits.filter((v) => {
    const matchesSearch = v.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || v.id.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="relative w-full h-full transition-all duration-300 shrink-0 z-30">
      <div className="absolute inset-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-lg overflow-hidden bg-white border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-slate-100 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Visits Queue</h2>
              <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                Filter: 
                <button onClick={() => setFilterStatus("All")} className={clsx("px-1.5 py-0.5 rounded transition-colors", filterStatus === "All" ? "bg-slate-200 text-slate-800" : "text-slate-400 hover:text-slate-600")}>All ({counts.All})</button>
                |
                <button onClick={() => setFilterStatus("Unassigned")} className={clsx("px-1.5 py-0.5 rounded transition-colors", filterStatus === "Unassigned" ? "bg-red-100 text-red-700" : "text-slate-400 hover:text-slate-600")}>Unassigned ({counts.Unassigned})</button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search visits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 overflow-y-auto p-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
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
                        "flex-1 bg-white rounded-xl border p-2 transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]",
                        isSelected ? "border-brand-teal shadow-[0_0_0_1px_rgba(14,163,131,1)]" : "border-slate-200",
                        dragOverId === v.id && v.status === "Unassigned" && "border-brand-teal shadow-[0_0_0_2px_rgba(14,163,131,0.5)] bg-emerald-50/30"
                      )}>
                        <div className="flex items-start justify-between mb-0.5">
                          <h3 className="font-semibold text-slate-800 text-xs truncate pr-2">{v.patientName}</h3>
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
                          if (v.status === "Unassigned") {
                            return (
                              <div className="mt-2 flex flex-col gap-1 mb-2">
                                <div className="text-[10px] font-semibold text-slate-600 flex items-center justify-between gap-1">
                                  <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">⚡</span> AI Match Suggestions
                                  </div>
                                  {onCompareRoutes && (
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); onCompareRoutes(v.id); }}
                                      className="text-brand-teal hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-1.5 py-0.5 rounded transition-colors flex items-center gap-1"
                                    >
                                      ⚖️ Compare
                                    </button>
                                  )}
                                </div>
                                <div className="bg-slate-50 rounded border border-slate-200 divide-y divide-slate-100 text-[10px] overflow-hidden">
                                  <div className="p-1.5 flex justify-between items-center hover:bg-emerald-50 cursor-pointer transition-colors group" onClick={() => onAssign?.('c1', v.id)}>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-slate-700 group-hover:text-emerald-700">Priya Patel (RN)</span>
                                      <span className="text-slate-500 text-[9px]">+0.8 mi detour, 98% skill match</span>
                                    </div>
                                    <span className="text-emerald-600 font-semibold text-[9px] bg-emerald-100/50 px-1.5 py-0.5 rounded border border-emerald-200">Best Fit</span>
                                  </div>
                                  <div className="p-1.5 flex justify-between items-center hover:bg-amber-50 cursor-pointer transition-colors group" onClick={() => onAssign?.('c2', v.id)}>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-slate-700 group-hover:text-amber-700">Maria Santos (CNA)</span>
                                      <span className="text-slate-500 text-[9px]">+3.2 mi detour, overtime warning</span>
                                    </div>
                                    <span className="text-amber-600 font-semibold text-[9px] bg-amber-100/50 px-1.5 py-0.5 rounded border border-amber-200">Warn</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }

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

    </div>
  );
}
