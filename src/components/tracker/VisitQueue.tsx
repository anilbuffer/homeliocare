"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Home, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Clock } from "lucide-react";
import clsx from "clsx";
import { Visit } from "@/lib/mockTrackerData";

interface VisitQueueProps {
  visits: Visit[];
  selectedVisitId: string | null;
  onSelectVisit: (id: string | null) => void;
}

export function VisitQueue({ visits, selectedVisitId, onSelectVisit }: VisitQueueProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Assigned" | "Unassigned" | "Completed">("All");
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const getIconForStatus = (status: Visit["status"]) => {
    switch (status) {
      case "Unassigned": return <AlertCircle className="w-4 h-4 text-white" />;
      case "Completed": return <CheckCircle2 className="w-4 h-4 text-white" />;
      default: return <Home className="w-4 h-4 text-white" />; // Assigned or In Progress
    }
  };

  const getColorForStatus = (status: Visit["status"]) => {
    switch (status) {
      case "Unassigned": return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
      case "Completed": return "bg-brand-teal shadow-[0_0_10px_rgba(14,163,131,0.4)]";
      default: return "bg-brand-teal shadow-[0_0_10px_rgba(14,163,131,0.4)]";
    }
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
        <div className="p-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Visit Queue</h2>
            <button className="text-slate-400 hover:text-slate-600">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search visits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all placeholder:text-slate-400"
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
                    "flex-shrink-0 relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors z-10",
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
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="text-xs font-semibold text-slate-400 tracking-wider mb-4 pl-8">TODAY</div>

          <div className="relative">
            {/* Vertical Line connecting timeline dots */}
            <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100 -z-10"></div>

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
                    className="relative flex gap-4 mb-6 group cursor-pointer"
                  >
                    {/* Icon Dot */}
                    <div className="shrink-0 mt-1">
                      <div className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white z-10 relative transition-transform",
                        getColorForStatus(v.status),
                        isSelected && "scale-110"
                      )}>
                        {getIconForStatus(v.status)}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={clsx(
                      "flex-1 bg-white rounded-xl border p-4 transition-all hover:shadow-md",
                      isSelected ? "border-brand-teal shadow-[0_0_0_1px_rgba(14,163,131,1)]" : "border-slate-200"
                    )}>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-slate-800 text-sm truncate pr-2">{v.clientName}</h3>
                        <span className={clsx(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0",
                          v.status === "Unassigned" ? "bg-red-50 text-red-600" :
                            v.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                              "bg-slate-50 text-slate-600"
                        )}>
                          {v.status.toLowerCase()}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 mb-2">Visit #{v.id.replace('v-', '4570')}</div>

                      <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-md mb-2">
                        {v.address}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
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
