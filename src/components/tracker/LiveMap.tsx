"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Home, ShieldAlert, CheckCircle2, ShoppingBag, Utensils, Stethoscope } from "lucide-react";
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

  const getVisitIconInfo = (status: Visit["status"]) => {
    switch (status) {
      case "Unassigned":
        return {
          bg: "bg-orange-500",
          ring: "ring-orange-500/50",
          icon: <ShieldAlert className="w-3.5 h-3.5 text-white" />
        };
      case "Completed":
        return {
          bg: "bg-blue-500",
          ring: "ring-blue-500/50",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-white" />
        };
      default:
        return {
          bg: "bg-blue-500",
          ring: "ring-blue-500/50",
          icon: <Home className="w-3.5 h-3.5 text-white" />
        };
    }
  };

  return (
    <div className="flex-1 h-screen relative bg-[#0b0f19] overflow-hidden flex flex-col items-center justify-center">
      {/* 1. Deep Charcoal/Midnight Palette & Map Base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e293b 4px, transparent 4px),
            linear-gradient(to bottom, #1e293b 4px, transparent 4px)
          `,
          backgroundSize: '120px 120px',
          opacity: 0.10
        }}
      />

      {/* Mock Subdued Building Footprints */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <rect x="10%" y="15%" width="8%" height="12%" fill="#334155" rx="4" />
        <rect x="25%" y="45%" width="15%" height="8%" fill="#334155" rx="4" />
        <rect x="70%" y="30%" width="12%" height="18%" fill="#334155" rx="4" />
        <rect x="65%" y="75%" width="20%" height="15%" fill="#334155" rx="4" />
        <rect x="15%" y="65%" width="10%" height="20%" fill="#334155" rx="4" />
        <rect x="45%" y="10%" width="12%" height="25%" fill="#334155" rx="4" />
        <rect x="85%" y="10%" width="8%" height="12%" fill="#334155" rx="4" />
        {/* Additional Landmarks */}
        <rect x="35%" y="80%" width="18%" height="10%" fill="#334155" rx="4" />
        <rect x="5%" y="35%" width="12%" height="14%" fill="#334155" rx="4" />
        <rect x="55%" y="50%" width="10%" height="12%" fill="#334155" rx="4" />
        <rect x="80%" y="55%" width="14%" height="10%" fill="#334155" rx="4" />
      </svg>

      {/* Curved mock roads - slate grey */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <path d="M 0,25% Q 40%,30% 80%,25% T 100%,35%" stroke="#334155" strokeWidth="40" fill="none" opacity="1" />
        <path d="M 30%,0 Q 35%,40% 30%,80% T 40%,100%" stroke="#334155" strokeWidth="40" fill="none" opacity="1" />
        <path d="M 0,65% Q 60%,70% 100%,50%" stroke="#334155" strokeWidth="28" fill="none" opacity="1" />
        <path d="M 70%,0 Q 65%,50% 80%,100%" stroke="#334155" strokeWidth="32" fill="none" opacity="1" />
        <path d="M 0,85% Q 50%,80% 100%,90%" stroke="#334155" strokeWidth="24" fill="none" opacity="1" />
      </svg>

      {/* Muted Street Labels */}
      <div className="absolute top-[27%] left-[12%] text-[10px] text-slate-400 font-light tracking-wide -rotate-6 pointer-events-none opacity-90">MARKET ST</div>
      <div className="absolute top-[67%] left-[62%] text-[10px] text-slate-400 font-light tracking-wide rotate-[-4deg] pointer-events-none opacity-90">MISSION AVE</div>
      <div className="absolute top-[17%] left-[77%] text-[10px] text-slate-400 font-light tracking-wide rotate-3 pointer-events-none opacity-90">SUNSET BLVD</div>
      <div className="absolute top-[81%] left-[22%] text-[10px] text-slate-400 font-light tracking-wide rotate-[12deg] pointer-events-none opacity-90">BAY ST</div>
      <div className="absolute top-[45%] left-[35%] text-[10px] text-slate-400 font-light tracking-wide rotate-6 pointer-events-none opacity-90">OAK ST</div>
      <div className="absolute top-[12%] left-[48%] text-[10px] text-slate-400 font-light tracking-wide -rotate-2 pointer-events-none opacity-90">PINE AVE</div>
      <div className="absolute top-[52%] left-[85%] text-[10px] text-slate-400 font-light tracking-wide rotate-[10deg] pointer-events-none opacity-90">ELM BLVD</div>
      <div className="absolute top-[88%] left-[75%] text-[10px] text-slate-400 font-light tracking-wide -rotate-[8deg] pointer-events-none opacity-90">MAIN ST</div>
      {/* Additional Crowded Labels */}
      <div className="absolute top-[35%] left-[5%] text-[10px] text-slate-400 font-light tracking-wide rotate-12 pointer-events-none opacity-90">WASHINGTON ST</div>
      <div className="absolute top-[60%] left-[15%] text-[10px] text-slate-400 font-light tracking-wide -rotate-3 pointer-events-none opacity-90">JACKSON ST</div>
      <div className="absolute top-[20%] left-[30%] text-[10px] text-slate-400 font-light tracking-wide rotate-2 pointer-events-none opacity-90">POWELL ST</div>
      <div className="absolute top-[75%] left-[40%] text-[10px] text-slate-400 font-light tracking-wide -rotate-6 pointer-events-none opacity-90">STOCKTON ST</div>
      <div className="absolute top-[30%] left-[55%] text-[10px] text-slate-400 font-light tracking-wide rotate-8 pointer-events-none opacity-90">GRANT AVE</div>
      <div className="absolute top-[90%] left-[55%] text-[10px] text-slate-400 font-light tracking-wide -rotate-12 pointer-events-none opacity-90">COLUMBUS AVE</div>
      <div className="absolute top-[40%] left-[70%] text-[10px] text-slate-400 font-light tracking-wide rotate-4 pointer-events-none opacity-90">KEARNY ST</div>
      <div className="absolute top-[8%] left-[90%] text-[10px] text-slate-400 font-light tracking-wide -rotate-5 pointer-events-none opacity-90">MONTGOMERY ST</div>
      <div className="absolute top-[95%] left-[10%] text-[10px] text-slate-400 font-light tracking-wide rotate-3 pointer-events-none opacity-90">SANSOME ST</div>
      <div className="absolute top-[70%] left-[92%] text-[10px] text-slate-400 font-light tracking-wide -rotate-10 pointer-events-none opacity-90">BATTERY ST</div>

      {/* Top status indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#1e293b]/80 backdrop-blur-md border border-slate-700/70 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-3 z-10 shadow-xl">
        <div className="relative flex h-3 w-3 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="tracking-wide">Live • {caregivers.filter(c => c.status === "Active").length} Active</span>
      </div>

      {/* SVG Canvas for Routes */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connections.map(conn => {
          return (
            <g key={conn.id}>
              <motion.line
                x1={`${conn.x1}%`}
                y1={`${conn.y1}%`}
                x2={`${conn.x2}%`}
                y2={`${conn.y2}%`}
                stroke="#0d9488"
                strokeWidth={conn.isActive ? 6 : 4}
                strokeDasharray="8 12"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 40 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Background POI Markers */}
      {[
        { id: 1, name: "NBA Store", type: "shopping", x: 15, y: 20 },
        { id: 2, name: "Bucatini", type: "food", x: 45, y: 45 },
        { id: 3, name: "Summit Health", type: "medical", x: 25, y: 65 },
        { id: 4, name: "Paris Saint-Germain Store", type: "shopping", x: 20, y: 85 },
        { id: 5, name: "Vaishali Diamond", type: "shopping", x: 42, y: 15 },
        { id: 6, name: "Dishes", type: "food", x: 62, y: 40 },
        { id: 7, name: "Rahul Patel, DPM", type: "medical", x: 45, y: 55 },
        { id: 8, name: "KBL, LLP", type: "office", x: 5, y: 50 },
        { id: 9, name: "Läderach", type: "food", x: 8, y: 38 },
      ].map(poi => (
        <div
          key={poi.id}
          className="absolute z-0 -translate-x-1/2 -translate-y-1/2 flex items-center pointer-events-none opacity-80"
          style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
        >
          {/* Teardrop-like marker base */}
          <div className="relative w-[18px] h-[18px] bg-[#0f172a] rounded-full flex items-center justify-center border-[1.5px] border-slate-600 shadow-md">
            {poi.type === 'shopping' && <ShoppingBag className="w-2.5 h-2.5 text-orange-500" />}
            {poi.type === 'food' && <Utensils className="w-2.5 h-2.5 text-blue-400" />}
            {poi.type === 'medical' && <Stethoscope className="w-2.5 h-2.5 text-teal-400" />}
            {poi.type === 'office' && <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />}
          </div>
          <div
            className="ml-1.5 text-[9px] font-medium tracking-wide whitespace-nowrap"
            style={{
              color: poi.type === 'shopping' ? '#f97316' : poi.type === 'food' ? '#60a5fa' : poi.type === 'medical' ? '#2dd4bf' : '#94a3b8',
              textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 1px rgba(0,0,0,1)'
            }}
          >
            {poi.name}
          </div>
        </div>
      ))}

      {/* Client/Visit Markers */}
      {visits.map(v => {
        const isSelected = selectedVisitId === v.id || (selectedCaregiverId && v.caregiverId === selectedCaregiverId);
        
        return (
          <div
            key={v.id}
            onClick={() => onSelectVisit(isSelected ? null : v.id)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-110 flex flex-col items-center group"
            style={{ left: `${v.location.x}%`, top: `${v.location.y}%` }}
          >
            {/* Marker Shape */}
            <div className={clsx(
              "relative flex items-center justify-center text-white shadow-lg z-10",
              v.status === "Unassigned" ? "bg-[#ef4444] w-6 h-6 rounded-md" : "bg-[#10b981] w-6 h-6 rounded-xl",
              isSelected && "ring-2 ring-white scale-110"
            )}>
              {v.status === "Unassigned" ? (
                <span className="text-white font-bold text-[10px]">!</span>
              ) : (
                <Home className="w-3.5 h-3.5 text-white" />
              )}
            </div>

            {/* Visit POI Label (Tooltip) */}
            <div
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-[#0f172a]/90 backdrop-blur-md rounded border border-slate-700/50 shadow-xl text-[11px] font-semibold tracking-wide whitespace-nowrap flex flex-col items-start pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
            >
              <span className="text-[#38bdf8]">{v.clientName}</span>
              <span className="text-[9px] text-[#cbd5e1]">{v.time}</span>
            </div>
          </div>
        );
      })}

      {/* Caregiver Markers */}
      {caregivers.map(cg => {
        const isSelected = selectedCaregiverId === cg.id;
        const isFaded = selectedCaregiverId && !isSelected;
        const isOffline = cg.status === "Offline";

        return (
          <div
            key={cg.id}
            onClick={() => onSelectCaregiver(isSelected ? null : cg.id)}
            className={clsx(
              "absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group",
              isFaded ? "opacity-30 scale-90" : "hover:scale-110"
            )}
            style={{ left: `${cg.location.x}%`, top: `${cg.location.y}%` }}
          >
            <div className="relative flex items-center justify-center">
              {/* Radar Wave for Active Caregivers */}
              {!isOffline && (
                <div className="absolute w-16 h-16 rounded-full bg-[#0d9488]/30 animate-[ping_3s_ease-in-out_infinite]" />
              )}
              {!isOffline && (
                <div className="absolute w-16 h-16 rounded-full bg-[#0d9488]/40" />
              )}

              {/* Inner Icon Container */}
              <div className={clsx(
                "relative w-8 h-8 rounded-full flex items-center justify-center shadow-xl border-2 z-10",
                isOffline ? "bg-[#475569] border-[#cbd5e1]" : "bg-[#10b981] border-white",
                isSelected && `ring-2 ring-white scale-110`
              )}>
                <User className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Caregiver POI Label (Tooltip) */}
            <div
              className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2 py-1 bg-[#0f172a]/90 backdrop-blur-md rounded border border-slate-700/50 shadow-xl text-[11px] font-semibold tracking-wide whitespace-nowrap pointer-events-none flex flex-col items-start opacity-0 group-hover:opacity-100 transition-opacity z-50"
            >
              <span className={isOffline ? "text-[#94a3b8]" : "text-[#34d399]"}>{cg.name}</span>
              <span className="text-[9px] text-[#cbd5e1]">{cg.specialty}</span>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-[#0b0f19]/80 backdrop-blur-md border border-slate-700/50 text-slate-300 p-4 rounded-xl text-xs space-y-3 z-30 shadow-2xl">
        <div className="font-semibold text-slate-200 mb-1">Status Legend</div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> Active / Smooth
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> Alert / Delayed
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-orange-500 rounded-sm rotate-45 border border-[#0f172a]" /> Priority Visit
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500 border border-[#0f172a]" /> Routine Check-in
        </div>
      </div>
    </div>
  );
}
