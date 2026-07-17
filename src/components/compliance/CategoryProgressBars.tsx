"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { ComplianceScoreData } from "@/types/compliance";

interface CategoryProgressBarsProps {
  data: ComplianceScoreData["breakdown"];
}

export function CategoryProgressBars({ data }: CategoryProgressBarsProps) {
  // Assuming a total staff count of 247 for demonstration purposes
  const TOTAL_STAFF = 247;

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-brand-teal/10 rounded-lg text-brand-teal">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Compliance by Category</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {data.map((item, index) => {
          const compliantCount = Math.round((item.score / 100) * TOTAL_STAFF);
          let barColor = "bg-red-500";
          if (item.score >= 95) barColor = "bg-brand-teal";
          else if (item.score >= 80) barColor = "bg-amber-400";

          return (
            <div key={item.category} className="group px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="flex justify-between items-center text-sm mb-2.5">
                <span className="font-semibold text-slate-800">{item.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{compliantCount} / {TOTAL_STAFF}</span>
                  <span className={`font-bold ${item.score >= 95 ? "text-emerald-500" : item.score >= 80 ? "text-amber-500" : "text-red-500"
                    }`}>
                    {item.score}%
                  </span>
                </div>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                  className={`absolute top-0 left-0 bottom-0 rounded-full ${barColor} shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
