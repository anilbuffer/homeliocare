"use client";

import React from "react";
import { TopOffender } from "../types";
import clsx from "clsx";

interface OffenderRowProps {
  offender: TopOffender;
}

export function OffenderRow({ offender }: OffenderRowProps) {
  const initials = offender.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-between p-3 rounded-xl transition-all bg-slate-50/70 border border-slate-100 hover:bg-slate-100/60">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200/80 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-300/40">
          {initials}
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm leading-snug">{offender.name}</div>
          <div className="text-xs text-slate-500 font-medium">Most common: {offender.mostCommonType}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-extrabold text-slate-900 text-sm">{offender.exceptionCount}</div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">EXCEPTIONS</div>
        </div>

        <div
          className={clsx(
            "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border",
            offender.trend === "worsening"
              ? "bg-red-50 text-red-500 border-red-100"
              : offender.trend === "improving"
                ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                : "bg-slate-50 text-slate-400 border-slate-200"
          )}
        >
          {offender.trend === "worsening" && "↗"}
          {offender.trend === "improving" && "↘"}
          {offender.trend === "stable" && "—"}
        </div>
      </div>
    </div>
  );
}

