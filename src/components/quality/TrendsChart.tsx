"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', score: 85 },
  { name: 'Feb', score: 86 },
  { name: 'Mar', score: 84 },
  { name: 'Apr', score: 88 },
  { name: 'May', score: 89 },
  { name: 'Jun', score: 92.1 },
];

export function TrendsChart() {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 h-full flex flex-col">
      <h3 className="text-lg font-medium text-text-primary mb-4">QA Score Trend</h3>
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 100]} dx={-10} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
              itemStyle={{ color: '#14b8a6', fontWeight: 600 }}
              cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#14b8a6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
              dot={{ fill: '#ffffff', stroke: '#14b8a6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#14b8a6', stroke: '#ffffff', strokeWidth: 2 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
