"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Clock, Mail, Phone, FileText, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Caregiver } from "@/lib/mockTrackerData";

interface CaregiverRosterProps {
  caregivers: Caregiver[];
  assignedCaregiverIds: Set<string>;
  selectedCaregiverId: string | null;
  onSelectCaregiver: (id: string | null) => void;
  onHoverCaregiver?: (id: string | null) => void;
  onDragCaregiver?: (id: string | null) => void;
}

export function CaregiverRoster({
  caregivers,
  assignedCaregiverIds,
  selectedCaregiverId,
  onSelectCaregiver,
  onHoverCaregiver,
  onDragCaregiver,
}: CaregiverRosterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Available" | "Assigned" | "Total">("Available");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Filter caregivers
  const filteredCaregivers = caregivers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isAssigned = assignedCaregiverIds.has(c.id);
    const matchesStatus = 
      filterStatus === "Total" || 
      (filterStatus === "Assigned" && isAssigned) || 
      (filterStatus === "Available" && !isAssigned);
    return matchesSearch && matchesStatus;
  });

  const assignedCount = caregivers.filter((c) => assignedCaregiverIds.has(c.id)).length;
  const availableCount = caregivers.filter((c) => !assignedCaregiverIds.has(c.id)).length;
  const totalCount = caregivers.length;

  return (
    <div
      className={clsx(
        "relative h-screen transition-all duration-300 shrink-0 z-30",
        isCollapsed ? "w-0" : "w-[340px]"
      )}
    >
      <div className="absolute inset-0 overflow-hidden bg-white border-r border-slate-200 shadow-sm">
        <div className="w-[340px] h-full flex flex-col">
          {/* Header */}
        <div className="p-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-slate-800">Caregivers</h2>
            <button className="text-slate-400 hover:text-slate-600">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search caregiver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex bg-slate-50 p-0.5 rounded-lg">
            {(["Available", "Assigned", "Total"] as const).map((tab) => {
              const isActive = filterStatus === tab;
              const count = tab === "Available" ? availableCount : tab === "Assigned" ? assignedCount : totalCount;
              return (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={clsx(
                    "flex-1 relative flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-colors z-10",
                    isActive ? (tab === "Available" ? "text-white" : "text-slate-800") : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="roster-tab"
                      className={clsx(
                        "absolute inset-0 rounded-md -z-10 shadow-sm",
                        tab === "Available" ? "bg-brand-teal" : "bg-white border border-slate-200"
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab} <span className={clsx("px-1.5 py-0.5 rounded-full text-[10px]", isActive && tab === "Available" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <AnimatePresence>
            {filteredCaregivers.map((cg, i) => {
              const isSelected = selectedCaregiverId === cg.id;
              const isAvailable = !assignedCaregiverIds.has(cg.id);
              
              return (
                <motion.div
                  key={cg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  onClick={() => onSelectCaregiver(isSelected ? null : cg.id)}
                  draggable={isAvailable}
                  onMouseEnter={() => onHoverCaregiver?.(cg.id)}
                  onMouseLeave={() => onHoverCaregiver?.(null)}
                  onDragStart={(e: any) => {
                    if (isAvailable) {
                      e.dataTransfer.setData("caregiverId", cg.id);
                      e.dataTransfer.effectAllowed = "move";
                      onDragCaregiver?.(cg.id);
                    }
                  }}
                  onDragEnd={() => onDragCaregiver?.(null)}
                  className={clsx(
                    "relative bg-white rounded-xl border p-2 transition-all hover:shadow-md group",
                    isSelected ? "border-brand-teal shadow-[0_0_0_1px_rgba(14,163,131,1)]" : "border-slate-200",
                    isAvailable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                        {cg.avatar}
                      </div>
                      {cg.status === "Active" && (
                         <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-brand-teal border-2 border-white rounded-full">
                           <div className="absolute inset-0 bg-brand-teal rounded-full animate-ping opacity-75"></div>
                         </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-semibold text-slate-800 text-xs truncate pr-2">{cg.name}</h3>
                        <span className={clsx(
                          "text-[9px] px-1 py-0.5 rounded font-medium",
                          cg.status === "Active" ? "bg-brand-teal/10 text-brand-teal" : "bg-slate-100 text-slate-500"
                        )}>
                          {cg.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mb-0.5">Route: {cg.currentRoute}</p>
                      {cg.status === "Active" && (
                        <p className="text-[11px] font-medium text-brand-teal">{cg.distanceToNext} mi to next visit</p>
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  <div className="mt-2 space-y-1 border-t border-slate-100 pt-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span className="truncate">{cg.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{cg.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span>Cert No. {cg.certNo}</span>
                    </div>
                    {cg.specialty !== "N/A" && (
                       <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                         <Stethoscope className="w-3 h-3 text-slate-400" />
                         <span>{cg.specialty}</span>
                       </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-1">
                       <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">
                         <Clock className="w-3 h-3 text-slate-400" />
                         Start {cg.shiftStart}
                       </div>
                       <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">
                         <Clock className="w-3 h-3 text-slate-400" />
                         End {cg.shiftEnd}
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredCaregivers.length === 0 && (
            <div className="text-center py-8 text-sm text-slate-400">
              No caregivers found.
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -translate-y-1/2 -right-3 bg-white border border-slate-200 shadow-sm rounded-full w-6 h-6 flex items-center justify-center text-slate-500 hover:text-brand-teal transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );
}
