"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Navigation, ExternalLink, Activity } from "lucide-react";
import { mockCaregivers } from "@/lib/mockTrackerData";

export function CompactCoverageMap() {
  const activeCaregivers = mockCaregivers.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 mb-5">
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 sm:gap-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <Navigation className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
              <span>Live Field Coverage Map</span>
              <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live EVV GPS
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">Real-time caregiver position & active visits</p>
          </div>
        </div>

        <Link
          href="/scheduler/tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-teal-700 hover:underline transition-colors self-start xs:self-auto shrink-0"
        >
          <span>View Full Tracker</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>

      {/* Embedded Map Visual */}
      <div className="relative w-full h-[190px] sm:h-[220px] rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-inner group">
        {/* Map grid background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Map lines simulating roads */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-700/50 stroke-2 fill-none">
          <path d="M 0 60 Q 150 120 400 80 T 800 150" />
          <path d="M 120 0 Q 180 100 220 220" />
          <path d="M 450 0 Q 400 120 500 220" />
          <path d="M 0 160 Q 300 140 800 190" />
        </svg>

        {/* Pulsing Active Caregiver Markers */}
        <div className="absolute top-[20%] left-[6%] sm:left-[20%] flex items-center gap-1.5 sm:gap-2 group/marker cursor-pointer">
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping" />
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 border-2 border-white text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-lg">
              MO
            </div>
          </div>
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-slate-700 shadow-md whitespace-nowrap">
            Mabel O. <span className="text-emerald-400 font-semibold">• On Shift</span>
          </div>
        </div>

        <div className="absolute top-[55%] left-[30%] sm:left-[55%] flex items-center gap-1.5 sm:gap-2 group/marker cursor-pointer">
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping" />
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 border-2 border-white text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-lg">
              MA
            </div>
          </div>
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-slate-700 shadow-md whitespace-nowrap">
            Maria A. <span className="text-emerald-400 font-semibold">• Transit</span>
          </div>
        </div>

        <div className="absolute top-[28%] right-[4%] sm:right-[15%] flex items-center gap-1.5 sm:gap-2 group/marker cursor-pointer">
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-blue-400/40 animate-ping" />
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500 border-2 border-white text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-lg">
              JO
            </div>
          </div>
          <div className="hidden xs:block bg-slate-900/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-slate-700 shadow-md whitespace-nowrap">
            James O. <span className="text-blue-400 font-semibold">• Scheduled</span>
          </div>
        </div>

        {/* Legend / Overlay */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700/80 text-[10px] sm:text-[11px] text-slate-300 flex items-center gap-2.5 sm:gap-4">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>On-Site (14)</span>
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 shrink-0" />
            <span>Transit (4)</span>
          </span>
        </div>
      </div>
    </div>
  );
}
