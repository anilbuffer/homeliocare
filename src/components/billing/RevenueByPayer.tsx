"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { clsx } from "clsx";

const payers = [
  { name: "Medicare", value: 168000, percentage: 34, color: "#0EA383", trend: "+4.2%" },
  { name: "Medicaid", value: 252000, percentage: 52, color: "#3B82F6", trend: "+1.4%" },
  { name: "Private Pay", value: 136000, percentage: 28, color: "#8B5CF6", trend: "+2.8%" },
  { name: "Commercial", value: 58000, percentage: 12, color: "#F97316", trend: "+0.9%" },
];

export function RevenueByPayer() {
  const [activePayer, setActivePayer] = useState<string | null>(null);
  
  const totalValue = 614000;
  
  // Calculate SVG arc paths based on percentages
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <Card>
      <CardHeader 
        title="Revenue by Payer" 
        action={<span className="text-slate-500">Click a segment or legend to filter the claims pipeline below.</span>} 
      />
      
      <div className="flex flex-col md:flex-row items-center gap-12 mt-4">
        {/* Donut Chart */}
        <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {payers.map((payer, i) => {
              const dashArray = (payer.percentage / 100) * circumference;
              const dashOffset = currentOffset;
              currentOffset -= dashArray;
              
              const isActive = activePayer === payer.name || activePayer === null;
              
              return (
                <motion.circle
                  key={payer.name}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={payer.color}
                  strokeWidth="24"
                  strokeDasharray={`${dashArray} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className={clsx("cursor-pointer transition-opacity duration-300", isActive ? "opacity-100" : "opacity-30")}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${dashArray} ${circumference}` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  onClick={() => setActivePayer(activePayer === payer.name ? null : payer.name)}
                />
              );
            })}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-slate-500 font-medium">Total Revenue</span>
            <span className="text-3xl font-bold text-slate-900">${totalValue.toLocaleString("en-US")}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {payers.map((payer) => {
            const isActive = activePayer === payer.name || activePayer === null;
            
            return (
              <div 
                key={payer.name} 
                className={clsx(
                  "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-200 border",
                  isActive ? "bg-slate-50 border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]" : "bg-slate-50/50 border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-200"
                )}
                onClick={() => setActivePayer(activePayer === payer.name ? null : payer.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payer.color }} />
                  <div>
                    <div className="font-medium text-slate-900">{payer.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-slate-700">${payer.value.toLocaleString("en-US")}</span>
                      <span className="flex items-center text-xs font-medium text-brand-teal">
                        <ArrowUp className="w-3 h-3 mr-0.5" />
                        {payer.trend}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-medium text-slate-400">{payer.percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
