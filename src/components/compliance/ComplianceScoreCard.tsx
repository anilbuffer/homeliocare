"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ComplianceScoreData } from "@/types/compliance";

const COLORS = [
  "#00B4D8", // HIPAA
  "#90E0EF", // OSHA
  "#03045E", // State Compliance
  "#0077B6", // Medicaid
  "#48CAE4", // Medicare
  "#ADE8F4", // Background Checks
  "#CAF0F8", // License Monitoring
  "#023E8A", // Vaccinations
  "#0096C7", // Policy Acknowledgment
];

interface ComplianceScoreCardProps {
  data: ComplianceScoreData;
  onCategoryClick?: (category: string) => void;
}

export function ComplianceScoreCard({ data, onCategoryClick }: ComplianceScoreCardProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Animate score counter
    const timer = setTimeout(() => {
      setScore(data.overallScore);
    }, 100);
    return () => clearTimeout(timer);
  }, [data.overallScore]);

  const chartData = data.breakdown.map((item, index) => ({
    name: item.category,
    value: item.score,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 max-w-5xl mx-auto p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Agency Compliance Score</h2>
          <p className="text-sm text-slate-500 mb-6">Aggregate compliance across all staff and categories</p>

          <div className="flex items-end gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-blue-400"
            >
              {score.toFixed(1)}%
            </motion.div>
            <div className={`flex items-center gap-1 text-sm font-medium pb-2 ${data.trend >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {data.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(data.trend)}% vs last month
            </div>
          </div>
        </div>

        <div className="h-56 w-56 md:h-64 md:w-64 shrink-0 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                onClick={(entry: any) => {
                  if (entry && typeof entry.name === 'string') {
                    onCategoryClick?.(entry.name);
                  }
                }}
                className="cursor-pointer focus:outline-none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.5rem', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#0f172a' }}
                formatter={(value: any) => [`${value}%`, 'Compliance']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Categories</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{data.breakdown.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
