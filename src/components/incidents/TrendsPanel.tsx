"use client";

import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const trendData = [
  { name: "Week 1", incidents: 4 },
  { name: "Week 2", incidents: 7 },
  { name: "Week 3", incidents: 3 },
  { name: "Week 4", incidents: 8 },
];

const patternsData = [
  { text: "3 falls for Robert M. in 30 days", type: "warning", highlight: "Action required" },
  { text: "2 medication errors by Marcus T. this month", type: "error", highlight: "High risk" },
];

export function TrendsPanel() {
  return (
    <Card className="flex flex-col">
      <CardHeader title="Trends & Patterns" subtitle="Last 30 days" />
      
      <div className="flex-1 flex flex-col gap-4">
        {/* Chart */}
        <div className="h-[140px] w-full -mx-2 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} 
                dy={10} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.5)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                }}
                itemStyle={{ color: '#0f172a', fontWeight: 600 }}
              />
              <Area 
                type="monotone" 
                dataKey="incidents" 
                stroke="#14b8a6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorIncidents)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#14b8a6', className: "drop-shadow-md" }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Patterns List */}
        <div className="flex-1 space-y-3 mt-2">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Detected Patterns</h4>
          {patternsData.map((pattern, i) => {
            const isError = pattern.type === "error";
            const Icon = isError ? AlertCircle : AlertTriangle;
            
            return (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className={cn(
                  "p-3 rounded-xl text-sm border relative overflow-hidden group",
                  isError 
                    ? "bg-red-50/50 border-red-100 text-red-900" 
                    : "bg-amber-50/50 border-amber-100 text-amber-900"
                )}
              >
                {/* Subtle gradient background effect */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  isError ? "bg-gradient-to-r from-red-100/50 to-transparent" : "bg-gradient-to-r from-amber-100/50 to-transparent"
                )} />

                <div className="flex items-start gap-3 relative z-10">
                  <div className={cn(
                    "p-2 rounded-xl shrink-0 mt-0.5",
                    isError ? "bg-red-100 text-red-600 shadow-inner shadow-red-200" : "bg-amber-100 text-amber-600 shadow-inner shadow-amber-200"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium leading-snug">{pattern.text}</div>
                    <div className={cn(
                      "text-[10px] font-bold uppercase tracking-wider mt-1.5 inline-block px-2 py-0.5 rounded-md",
                      isError ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {pattern.highlight}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
