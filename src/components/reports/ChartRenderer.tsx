"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface ChartRendererProps {
  type: "bar" | "line" | "donut" | "table" | "kpi";
  data: any[];
  xAxisKey?: string;
  dataKeys?: { key: string; color: string; name?: string }[];
  height?: number | string;
}

const COLORS = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#64748b"];

export function ChartRenderer({ type, data, xAxisKey = "name", dataKeys = [], height = 300 }: ChartRendererProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8" style={{ minHeight: height }}>
        <div className="text-sm">No data available for this period</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xl">
          <p className="text-slate-900 font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-500">{entry.name}:</span>
              <span className="text-slate-900 font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === "bar") {
    return (
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey={xAxisKey} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
            {dataKeys.map((dk, i) => (
              <Bar key={dk.key} dataKey={dk.key} name={dk.name || dk.key} fill={dk.color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "line") {
    return (
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey={xAxisKey} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
            {dataKeys.map((dk, i) => (
              <Line 
                key={dk.key} 
                type="monotone" 
                dataKey={dk.key} 
                name={dk.name || dk.key} 
                stroke={dk.color} 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "donut") {
    const dataKeyName = dataKeys[0]?.key || "value";
    return (
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey={dataKeyName}
              nameKey="name"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '0.5rem', color: '#0f172a' }}
              itemStyle={{ color: '#0f172a' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "kpi") {
    // For KPI, we just show the first item's primary value
    const firstItem = data[0];
    const key = dataKeys[0]?.key;
    const value = firstItem ? firstItem[key as string] : "--";
    return (
      <div className="w-full h-full flex flex-col items-center justify-center" style={{ minHeight: height }}>
        <div className="text-4xl font-bold text-slate-900">{value}</div>
        {dataKeys[0]?.name && <div className="text-sm font-medium text-slate-500 mt-2">{dataKeys[0].name}</div>}
      </div>
    );
  }

  if (type === "table") {
    // A simple table renderer
    const headers = Object.keys(data[0] || {}).filter(k => k !== "id");
    
    return (
      <div className="w-full overflow-auto" style={{ maxHeight: height }}>
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <tr>
              {headers.map(h => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors last:border-0">
                {headers.map(h => (
                  <td key={h} className="px-4 py-3">{row[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
