"use client";

import React, { useEffect, useState } from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Star, TrendingUp, MessageCircle, ShieldAlert } from "lucide-react";

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
          <div className="text-slate-500 text-sm font-medium mb-1">Care Quality (Client)</div>
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
          <div className="h-64 flex items-end justify-between gap-2 relative">
            {/* Mock chart */}
            <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-slate-200 pb-6 pl-2">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="flex items-center text-xs text-slate-400 w-full relative">
                  <span className="-ml-6 absolute">{n}</span>
                  <div className="w-full h-px bg-slate-100" />
                </div>
              ))}
            </div>
            
            {/* Bars */}
            <div className="w-full h-full flex items-end justify-around pb-6 pl-6 z-10 pt-4">
              {mounted && [4.2, 4.4, 4.3, 4.6, 4.7, 4.9].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group w-1/8">
                  <div 
                    className="w-full max-w-[2rem] bg-brand-teal/80 hover:bg-brand-teal rounded-t-sm transition-all duration-1000 ease-out origin-bottom relative"
                    style={{ height: `${(val / 5) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 mt-2 absolute -bottom-1">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Recent Client Feedback</h3>
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
                <th className="py-3 font-medium">Client Involved</th>
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
