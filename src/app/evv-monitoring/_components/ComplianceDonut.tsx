"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";
import { motion } from "framer-motion";

const COLORS = {
  "Wrong GPS location": "#F59E0B",
  "Missing clock-in": "#EF4444",
  "Missing clock-out": "#EF4444",
  "Time mismatch": "#F59E0B",
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden h-full flex flex-col"
    >
      <h3 className="text-base font-semibold text-slate-900 mb-4 shrink-0">Compliance Breakdown</h3>

      <div className="relative min-h-[150px] shrink-0">
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-900">{overallCompliance}%</span>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Verified</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={70}
              paddingAngle={1}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              onClick={(entry) => onSegmentClick(entry.name as string)}
              className="cursor-pointer focus:outline-none"
              animationBegin={200}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS] || "#CBD5E1"}
                  opacity={activeIndex === undefined || activeIndex === index ? 1 : 0.6}
                  className="transition-opacity duration-300 outline-none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0F172A', fontWeight: 600 }}
              formatter={(value, name) => [`${value} Exceptions`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] || "#CBD5E1" }}
              />
              <span className="text-xs text-slate-600 font-medium">{item.name}</span>
            </div>
            <span className="text-xs font-semibold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
