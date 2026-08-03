"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsPage() {
  const data = [
    { month: "Jan", volume: 15, conversion: 60 },
    { month: "Feb", volume: 18, conversion: 65 },
    { month: "Mar", volume: 24, conversion: 71 },
    { month: "Apr", volume: 22, conversion: 68 },
    { month: "May", volume: 28, conversion: 75 },
    { month: "Jun", volume: 24, conversion: 72 }, // Current month mock KPI
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col mb-2 lg:mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Referral Analytics</h2>
        <p className="text-xs text-slate-500">Track your organization's referral volume and conversion rates over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Volume Chart */}
        <div className="bg-white backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 text-base">Referral Volume (6 Months)</h3>
              <p className="text-xs text-slate-500">Total referrals submitted by your organization</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="volume" fill="#0ea383" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Rate Trend */}
        <div className="bg-white backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 text-base">Conversion Rate (6 Months)</h3>
              <p className="text-xs text-slate-500">Percentage of referrals successfully admitted</p>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: any) => [`${value}%`, 'Conversion Rate']}
                />
                <Bar dataKey="conversion" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
