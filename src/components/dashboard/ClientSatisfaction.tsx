"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Star } from "lucide-react";

export function ClientSatisfaction() {
  const score = 4.8;
  const maxScore = 5.0;
  const percentage = (score / maxScore) * 100;
  
  // Recharts pie chart for half circle gauge
  const data = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Client Satisfaction" action={<span className="text-brand-teal text-sm font-medium">View all →</span>} />
      
      {/* Gauge Area */}
      <div className="relative h-[150px] flex items-end justify-center mb-4">
        <div className="absolute inset-0 top-2">
          <ResponsiveContainer width="100%" height="200%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={100}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#0EA383" />
                <Cell fill="#E5E9EC" className="dark:fill-slate-700" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center z-10 flex flex-col items-center translate-y-2">
          <div className="text-4xl font-bold text-text-primary tracking-tight">{score.toFixed(1)}</div>
          <div className="flex items-center gap-1 text-accent-amber mt-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <div className="text-xs font-medium text-text-secondary mt-1">out of {maxScore.toFixed(1)}</div>
        </div>
      </div>

      {/* Sub metrics */}
      <div className="space-y-4 mt-auto">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Punctuality</span>
            <span className="font-medium">4.9</span>
          </div>
          <ProgressBar progress={98} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Care Quality</span>
            <span className="font-medium">4.8</span>
          </div>
          <ProgressBar progress={96} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Communication</span>
            <span className="font-medium">4.6</span>
          </div>
          <ProgressBar progress={92} color="bg-accent-amber" />
        </div>
      </div>
    </Card>
  );
}
