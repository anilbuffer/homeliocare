"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Home, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { Caregiver, Visit } from "@/lib/mockTrackerData";

interface LiveMapProps {
  caregivers: Caregiver[];
  visits: Visit[];
  selectedCaregiverId: string | null;
  selectedVisitId: string | null;
  onSelectCaregiver: (id: string | null) => void;
  onSelectVisit: (id: string | null) => void;
}

export function LiveMap({
  caregivers,
  visits,
  selectedCaregiverId,
  selectedVisitId,
  onSelectCaregiver,
  onSelectVisit,
}: LiveMapProps) {
  
  // Find connections (assigned visits)
  const connections = visits
    .filter(v => v.caregiverId && v.status !== "Completed")
    .map(v => {
      const cg = caregivers.find(c => c.id === v.caregiverId);
      if (cg) {
        return {
          id: `${cg.id}-${v.id}`,
          x1: cg.location.x,
          y1: cg.location.y,
          x2: v.location.x,
          y2: v.location.y,
          isActive: selectedCaregiverId === cg.id || selectedVisitId === v.id,
        };
      }
      return null;
    }).filter(Boolean) as { id: string, x1: number, y1: number, x2: number, y2: number, isActive: boolean }[];

  const getVisitColor = (status: Visit["status"]) => {
    switch (status) {
      case "Unassigned": return "bg-red-500 border-red-500";
      case "Completed": return "bg-brand-teal border-brand-teal"; // Homelio teal
      default: return "bg-brand-teal border-brand-teal";
    }
  };

  return (
    <div className="flex-1 h-screen relative bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center">
      {/* Mock Map Background - grid pattern to look like streets/blocks */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      {/* Curved mock roads */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none" preserveAspectRatio="none">
         <path d="M 0,25% Q 40%,30% 80%,25% T 100%,35%" stroke="#38bdf8" strokeWidth="12" fill="none" />
         <path d="M 30%,0 Q 35%,40% 30%,80% T 40%,100%" stroke="#38bdf8" strokeWidth="12" fill="none" />
         <path d="M 0,65% Q 60%,70% 100%,50%" stroke="#38bdf8" strokeWidth="8" fill="none" />
         <path d="M 70%,0 Q 65%,50% 80%,100%" stroke="#38bdf8" strokeWidth="10" fill="none" />
         <path d="M 0,85% Q 50%,80% 100%,90%" stroke="#38bdf8" strokeWidth="6" fill="none" />
      </svg>
      
      {/* Street Labels */}
      <div className="absolute top-[28%] left-[10%] text-[10px] text-slate-500 font-medium -rotate-6 pointer-events-none">Market St</div>
      <div className="absolute top-[68%] left-[60%] text-[10px] text-slate-500 font-medium rotate-[-4deg] pointer-events-none">Mission Ave</div>
      <div className="absolute top-[18%] left-[75%] text-[10px] text-slate-500 font-medium rotate-3 pointer-events-none">Sunset Blvd</div>
      <div className="absolute top-[82%] left-[20%] text-[10px] text-slate-500 font-medium rotate-[12deg] pointer-events-none">Bay St</div>
      
      {/* Top status indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 z-10 shadow-lg">
        <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
        Live - {caregivers.filter(c => c.status === "Active").length} caregivers on shift
      </div>

      {/* SVG Canvas for Routes */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {connections.map(conn => (
          <g key={conn.id}>
            {/* Background dashed line */}
            <line
              x1={`${conn.x1}%`}
              y1={`${conn.y1}%`}
              x2={`${conn.x2}%`}
              y2={`${conn.y2}%`}
              stroke="rgba(14, 163, 131, 0.3)"
              strokeWidth={conn.isActive ? 3 : 2}
              strokeDasharray="4 4"
            />
            {/* Animated solid line on top if active */}
            {conn.isActive && (
              <motion.line
                x1={`${conn.x1}%`}
                y1={`${conn.y1}%`}
                x2={`${conn.x2}%`}
                y2={`${conn.y2}%`}
                stroke="#0EA383"
                strokeWidth="4"
                filter="url(#glow)"
                strokeDasharray="8 8"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Client Markers */}
      {visits.map(v => {
        const isSelected = selectedVisitId === v.id || (selectedCaregiverId && v.caregiverId === selectedCaregiverId);
        
        return (
          <div
            key={v.id}
            onClick={() => onSelectVisit(isSelected ? null : v.id)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{ left: `${v.location.x}%`, top: `${v.location.y}%` }}
          >
            <div className={clsx(
              "w-6 h-6 rounded-md flex items-center justify-center text-white shadow-lg border-2",
              getVisitColor(v.status),
              isSelected && "ring-4 ring-white/30 scale-125"
            )}>
              {v.status === "Unassigned" ? <AlertCircle className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
            </div>
          </div>
        );
      })}

      {/* Caregiver Markers */}
      {caregivers.map(cg => {
        const isSelected = selectedCaregiverId === cg.id;
        const isFaded = selectedCaregiverId && !isSelected;
        
        return (
          <div
            key={cg.id}
            onClick={() => onSelectCaregiver(isSelected ? null : cg.id)}
            className={clsx(
              "absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110",
              isFaded && "opacity-40"
            )}
            style={{ left: `${cg.location.x}%`, top: `${cg.location.y}%` }}
          >
            {cg.status === "Active" && !isFaded && (
              <div className="absolute inset-0 bg-brand-teal rounded-full animate-ping opacity-30 scale-150" />
            )}
            <div className={clsx(
              "relative w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white",
              cg.status === "Active" ? "bg-brand-teal" : "bg-slate-500",
              isSelected && "ring-4 ring-white/30 scale-125 z-30"
            )}>
              <User className="w-4 h-4" />
            </div>
            
            {/* Label */}
            <div className={clsx(
              "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-[#1e293b]/90 text-white text-xs font-medium rounded whitespace-nowrap shadow-lg border border-slate-700/50 transition-opacity",
              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
              {cg.name}
            </div>
          </div>
        );
      })}
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-[#0f172a]/90 backdrop-blur-sm border border-slate-700/50 text-slate-300 p-4 rounded-xl text-xs space-y-3 z-30 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-teal" /> Active caregiver
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Offline
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Urgent visit
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-teal" /> Completed
        </div>
      </div>
    </div>
  );
}
