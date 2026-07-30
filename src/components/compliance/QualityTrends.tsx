"use client";

import React from "react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { mockQualityTrends, mockPatternAlerts } from "@/lib/mock-data/compliance-dashboard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function QualityTrends() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] h-auto lg:h-full flex flex-col">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-teal" />
            Quality Trends & Patterns
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Clinical outcome trends and detected risk patterns.</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col xl:flex-row gap-4">
        {/* Trend Chart (Recharts) */}
        <div className="flex-1 min-w-[200px] h-64 xl:h-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockQualityTrends}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                labelStyle={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}
              />
              <Line
                type="monotone"
                dataKey="falls"
                name="Falls"
                stroke="#FBBF24"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#FBBF24', strokeWidth: 2 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="hospitalizations"
                name="Hospitalizations"
                stroke="#FB7185"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#FB7185', strokeWidth: 2 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="complaints"
                name="Complaints"
                stroke="#0EA383"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#0EA383', strokeWidth: 2 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Pattern Alerts */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600 px-1">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Falls</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Hospitalizations</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-brand-teal" /> Complaints</div>
          </div>
          <div className="flex-1 bg-amber-50/50 rounded-xl px-4 py-3 border border-amber-100 flex flex-col justify-start">
            <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Pattern Alerts
            </h4>
            <ul className="space-y-1">
              {mockPatternAlerts.map((alert, i) => (
                <li key={i} className="text-[12px] text-amber-800/80 leading-relaxed flex items-start gap-2.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_6px_32px_rgba(0,0,0,0.06)]" />
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
