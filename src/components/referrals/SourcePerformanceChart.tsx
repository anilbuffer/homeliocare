import React, { useState } from "react";
import { PieChart as PieChartIcon, BarChart3, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import clsx from "clsx";

export function SourcePerformanceChart() {
  const [viewType, setViewType] = useState<"bar" | "pie">("bar");

  const data = [
    { source: "Hospitals", volume: 45, conversion: 78 },
    { source: "Individual Doctors", volume: 32, conversion: 65 },
    { source: "Social Workers", volume: 18, conversion: 82 },
    { source: "Online Form", volume: 24, conversion: 45 },
    { source: "Self-Referral", volume: 12, conversion: 50 },
  ];

  const COLORS = ['#0d9488', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Referral Source Performance</h3>
          <p className="text-xs text-slate-500">Volume and conversion rates by channel</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("pie")}
            className={clsx(
              "p-2 rounded-lg transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]",
              viewType === "pie" ? "bg-brand-teal text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            <PieChartIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewType("bar")}
            className={clsx(
              "p-2 rounded-lg transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]",
              viewType === "bar" ? "bg-brand-teal text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        {viewType === "bar" ? (
          <div className="space-y-3">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div className="w-1/3">
                  <span className="text-sm font-medium text-slate-700">{item.source}</span>
                </div>
                <div className="w-1/3 flex items-center gap-2">
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-slate-400 h-2 rounded-full" style={{ width: `${(item.volume / 45) * 100}%` }} />
                  </div>
                  <span className="text-xs text-slate-500 w-8">{item.volume}</span>
                </div>
                <div className="w-1/3 flex items-center justify-end gap-2">
                  <span className="text-sm font-medium text-slate-700">{item.conversion}%</span>
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="40%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="volume"
                  nameKey="source"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`${value} referrals`, name]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingLeft: '20px' }}
                  formatter={(value) => <span className="text-slate-600 text-sm font-medium ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
