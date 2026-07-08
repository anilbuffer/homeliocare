"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Sparkles, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function MiniGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const data = [
    { value: value },
    { value: 100 - value }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-16 h-16 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={24}
              outerRadius={32}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#E5E9EC" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">
          {value}%
        </div>
      </div>
      <div className="text-xs text-text-secondary font-medium text-center">{label}</div>
    </div>
  );
}

export function BottomGlance() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 flex items-center justify-around divide-x divide-border-subtle" noPadding>
        <div className="flex-1">
          <MiniGauge value={85} label="Caregiver Utilization" color="#3B82F6" />
        </div>
        <div className="flex-1">
          <MiniGauge value={12} label="Compliance Alerts" color="#F97316" />
        </div>
        <div className="flex-1">
          <MiniGauge value={96} label="Avg Visit Completion" color="#0EA383" />
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-sidebar-bg to-[#0e354a] text-white border-none flex flex-col justify-center relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-teal opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-accent-purple opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-6 h-6 text-brand-teal" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Need something?</h3>
            <p className="text-sm text-slate-300">Ask Sidekick to run reports or find patients.</p>
          </div>
        </div>
        
        <button className="relative z-10 mt-5 w-full bg-brand-teal hover:bg-[#0c8c70] active:scale-[0.98] transition-all text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-teal/20">
          Chat with Sidekick <ArrowRight className="w-4 h-4" />
        </button>
      </Card>
    </div>
  );
}
