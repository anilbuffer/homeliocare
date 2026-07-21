"use client";

import React from "react";
import { EVVException } from "../types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { MapPin, Clock, AlertCircle } from "lucide-react";

interface ExceptionRowProps {
  exception: EVVException;
  onClick: (exception: EVVException) => void;
  index: number;
}

const severityColors = {
  critical: "bg-red-50 text-red-700 border-red-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

const statusColors = {
  New: "bg-slate-100 text-slate-700",
  "Under Review": "bg-indigo-50 text-indigo-700",
  Resolved: "bg-emerald-50 text-emerald-700",
  Disputed: "bg-rose-50 text-rose-700",
};

export function ExceptionRow({ exception, onClick, index }: ExceptionRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.01, backgroundColor: "#f8fafc" }}
      onClick={() => onClick(exception)}
      className="flex items-center py-2.5 px-4 border-b border-slate-100 cursor-pointer bg-white last:border-0 transition-colors"
    >
      {/* Caregiver & Patient */}
      <div className="flex-[1.5] min-w-[200px] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-100">
          {exception.caregiver.avatarUrl ? (
            <img src={exception.caregiver.avatarUrl} alt={exception.caregiver.name} className="w-full h-full object-cover bg-slate-100" />
          ) : (
            <div className="w-full h-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
              {exception.caregiver.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <div className="font-semibold text-slate-900 text-[13px] leading-tight">{exception.caregiver.name}</div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 leading-tight">
            to {exception.patient.name}
          </div>
        </div>
      </div>

      {/* Exception Type Badge */}
      <div className="flex-1 min-w-[150px]">
        <span className={clsx(
          "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
          severityColors[exception.severity]
        )}>
          {exception.type}
        </span>
      </div>

      {/* Details (Time / Distance) */}
      <div className="flex-[1.5] min-w-[200px] flex flex-col justify-center gap-0.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Sch: {exception.scheduledTime.start}</span>
        </div>

        {exception.timeDeltaMinutes !== undefined && exception.timeDeltaMinutes !== 0 && (
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className={exception.timeDeltaMinutes < 0 ? "text-red-600" : "text-amber-600"}>
              {exception.timeDeltaMinutes < 0 ? "-" : "+"}{Math.abs(exception.timeDeltaMinutes)}m delta
            </span>
          </div>
        )}

        {exception.gpsDistanceMiles && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
            <MapPin className="w-3.5 h-3.5" />
            <span>{exception.gpsDistanceMiles} mi away</span>
          </div>
        )}
      </div>

      {/* Billing Impact */}
      <div className="w-[100px] shrink-0 text-right pr-4">
        {exception.estimatedBillingImpact > 0 ? (
          <div className="text-red-600 font-bold text-sm flex items-center justify-end gap-1">
            <AlertCircle className="w-3 h-3" />
            ${exception.estimatedBillingImpact}
          </div>
        ) : (
          <div className="text-slate-400 font-medium text-xs">--</div>
        )}
      </div>

      {/* Status & Actions */}
      <div className="w-[140px] shrink-0 ml-4 flex items-center justify-between">
        <span className={clsx(
          "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold text-center whitespace-nowrap leading-tight",
          statusColors[exception.status]
        )}>
          {exception.status}
        </span>
        <button className="text-brand-teal text-xs font-semibold hover:text-brand-teal/80 transition-colors bg-brand-teal/5 px-2.5 py-1 rounded-lg">
          Review
        </button>
      </div>
    </motion.div>
  );
}
