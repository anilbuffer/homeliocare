"use client";

import React, { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";

const data = [
  { name: "Medication Error", value: 12, color: "#ef4444" },
  { name: "Fall", value: 19, color: "#f59e0b" },
  { name: "Missed Visit", value: 8, color: "#3b82f6" },
  { name: "Late Visit", value: 15, color: "#14b8a6" },
  { name: "Documentation", value: 6, color: "#8b5cf6" },
  { name: "Other", value: 4, color: "#94a3b8" },
];

interface IncidentTypeChartProps {
  onSelectCategory?: (category: string | null) => void;
}

export function IncidentTypeChart({ onSelectCategory }: IncidentTypeChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), []);

  const onPieEnter = (_: any, index: number) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  const handleClick = (entry: any) => {
    if (onSelectCategory) onSelectCategory(entry.name);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader title="Incidents by Category" subtitle="Last 30 days" />
      <div className="flex-1 flex flex-row items-center min-h-0">
        <div className="relative w-[55%] h-full min-h-[220px]">
          {/* Inner Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <span className="block text-3xl font-black text-slate-800 leading-none">{total}</span>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Total</span>
            </motion.div>
          </div>
          <div className="relative z-10 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
                  </filter>
                </defs>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  onClick={handleClick}
                  stroke="none"
                  animationBegin={0}
                  animationDuration={1000}
                  className="cursor-pointer outline-none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                      className="transition-opacity duration-300 outline-none hover:drop-shadow-md"
                      filter="url(#shadow)"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    padding: '10px 14px',
                  }}
                  itemStyle={{ color: '#334155', fontWeight: 600, fontSize: '13px' }}
                  formatter={(value: any) => [`${value} Incidents`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Custom Legend (Right side, single column, small) */}
        <div className="w-[45%] flex flex-col gap-1 pr-2">
          {data.map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left group"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-transform group-hover:scale-125"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors truncate max-w-[90px]">
                  {item.name}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md group-hover:bg-white group-hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all">
                {item.value}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
