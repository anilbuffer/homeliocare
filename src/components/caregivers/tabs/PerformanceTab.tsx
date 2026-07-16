"use client";

import React, { useEffect, useState } from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Star, TrendingUp, MessageCircle, ShieldAlert } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const performanceData = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.4 },
  { month: 'Mar', score: 4.3 },
  { month: 'Apr', score: 4.6 },
  { month: 'May', score: 4.7 },
  { month: 'Jun', score: 4.9 },
];

export function PerformanceTab({ caregiver }: { caregiver: Caregiver }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rating Breakdown */}
        <Card className="p-5 flex flex-col justify-center bg-gradient-to-br from-brand-teal to-emerald-600 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="text-white/80 text-sm font-medium mb-1">Overall Rating</div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold">{caregiver.rating > 0 ? caregiver.rating.toFixed(1) : "N/A"}</span>
            <span className="text-white/60 text-sm mb-1">/ 5.0</span>
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-4 h-4 ${caregiver.rating >= s ? "fill-current" : caregiver.rating >= s - 0.5 ? "fill-current opacity-50" : "opacity-20"}`} />
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-slate-500 text-sm font-medium mb-1">Punctuality</div>
          <div className="text-2xl font-bold text-slate-800 mb-2">98.5%</div>
          <div className="text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +1.2% this month
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-slate-500 text-sm font-medium mb-1">Care Quality (Patient)</div>
          <div className="text-2xl font-bold text-slate-800 mb-2">4.9/5</div>
          <div className="text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +0.1 vs agency avg
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-slate-500 text-sm font-medium mb-1">Communication</div>
          <div className="text-2xl font-bold text-slate-800 mb-2">4.7/5</div>
          <div className="text-xs font-medium text-slate-500 bg-slate-50 w-fit px-2 py-0.5 rounded-full flex items-center gap-1">
            Consistent with last month
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Performance Trend</h3>
          <div className="h-64 w-full mt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                  <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickCount={6} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '8px 12px' }}
                    itemStyle={{ color: '#14b8a6', fontWeight: 600, fontSize: '14px' }}
                    labelStyle={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    activeDot={{ r: 6, fill: '#14b8a6', stroke: '#ffffff', strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50 rounded-xl animate-pulse" />
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Recent Patient Feedback</h3>
            <button className="text-sm text-brand-teal font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs text-slate-500">2 days ago</span>
              </div>
              <p className="text-sm text-slate-700 italic">"Elena is wonderful with my husband. She is patient and always on time. We couldn't ask for better care."</p>
              <div className="mt-2 text-xs font-medium text-slate-500">- Family of Robert Hayes</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 text-slate-300" />
                </div>
                <span className="text-xs text-slate-500">Last week</span>
              </div>
              <p className="text-sm text-slate-700 italic">"Very professional and knowledgeable. Helped with medication organization perfectly."</p>
              <div className="mt-2 text-xs font-medium text-slate-500">- Mary Johnson</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Incident History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Type</th>
                <th className="py-3 font-medium">Patient Involved</th>
                <th className="py-3 font-medium">Severity</th>
                <th className="py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-slate-300 mb-2" />
                    No incidents reported for this caregiver.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
