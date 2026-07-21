"use client";

import React from "react";
import { TopOffender } from "../types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import clsx from "clsx";

interface OffenderRowProps {
  offender: TopOffender;
}

export function OffenderRow({ offender }: OffenderRowProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl transition-all bg-white/40 backdrop-blur-md border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:bg-white/60 hover:shadow-[0_6px_20px_rgb(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
          {offender.avatarUrl ? (
            <img src={offender.avatarUrl} alt={offender.name} className="w-full h-full object-cover bg-slate-100" />
          ) : (
            <div className="w-full h-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
              {offender.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-slate-900 text-sm">{offender.name}</div>
          <div className="text-xs text-slate-500 font-medium">Most common: {offender.mostCommonType}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-bold text-slate-900">{offender.exceptionCount}</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Exceptions</div>
        </div>

        <div className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center shadow-[0_6px_32px_rgba(0,0,0,0.06)] border",
          offender.trend === "worsening" ? "bg-red-50 text-red-600 border-red-100" :
            offender.trend === "improving" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
              "bg-slate-50 text-slate-400 border-slate-200"
        )}>
          {offender.trend === "worsening" && <TrendingUp className="w-4 h-4" />}
          {offender.trend === "improving" && <TrendingDown className="w-4 h-4" />}
          {offender.trend === "stable" && <Minus className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}
