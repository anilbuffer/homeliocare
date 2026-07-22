"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const COLORS = {
  "Wrong GPS location": "#F59E0B",
  "Missing clock-in": "#EF4444",
  "Missing clock-out": "#F97316",
  "Time mismatch": "#EAB308",
  "Manual adjustment": "#3B82F6",
};

interface ComplianceDonutProps {
  data: { name: string; value: number }[];
  overallCompliance: number;
  onSegmentClick: (name: string) => void;
}

export function ComplianceDonut({ data, overallCompliance, onSegmentClick }: ComplianceDonutProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all duration-200 h-full flex flex-col justify-between"
    >
      <h3 className="text-sm font-bold text-slate-900 mb-2 shrink-0">Compliance Breakdown</h3>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 items-center gap-4 min-h-[220px]">
        {/* Donut Chart with Center Text */}
        <div className="relative w-full h-[200px] flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{overallCompliance}%</span>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Verified</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                onClick={(entry) => onSegmentClick(entry.name as string)}
                className="cursor-pointer focus:outline-none"
                animationBegin={100}
                animationDuration={600}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name as keyof typeof COLORS] || "#CBD5E1"}
                    opacity={activeIndex === undefined || activeIndex === index ? 1 : 0.6}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    className="transition-opacity duration-200 outline-none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#0F172A', fontWeight: 600, fontSize: '12px' }}
                formatter={(value, name) => [`${value} Exceptions`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend list matching screenshot */}
        <div className="space-y-2.5 pr-2">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => onSegmentClick(item.name)}
              className="flex items-center justify-between text-xs cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] || "#CBD5E1" }}
                />
                <span className="text-slate-600 font-medium truncate">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900 ml-2 shrink-0">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

