"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle } from "lucide-react";

export function EvvCompliance() {
  const compliance = 98.2;
  const data = [
    { value: compliance },
    { value: 100 - compliance }
  ];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="EVV Compliance" action={<span className="text-brand-teal text-sm font-medium">Exceptions →</span>} />
      
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-20 h-20 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#0EA383" />
                <Cell fill="#E5E9EC" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
            {compliance}%
          </div>
        </div>
        
        <div className="bg-accent-red/10 border border-accent-red/20 rounded-xl p-3 flex-1 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-accent-red mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-accent-red">14 Visits at Risk</div>
            <div className="text-xs text-accent-red/80 mt-0.5">Missing EVV data may block billing.</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-auto">
        <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Top Exceptions</div>
        
        <div className="flex justify-between items-center bg-slate-50 border border-border-subtle rounded-lg p-2.5">
          <span className="text-sm font-medium">Missing Location</span>
          <Badge variant="error">8</Badge>
        </div>
        <div className="flex justify-between items-center bg-slate-50 border border-border-subtle rounded-lg p-2.5">
          <span className="text-sm font-medium">Late Clock-out</span>
          <Badge variant="warning">4</Badge>
        </div>
        <div className="flex justify-between items-center bg-slate-50 border border-border-subtle rounded-lg p-2.5">
          <span className="text-sm font-medium">No Signature</span>
          <Badge variant="warning">2</Badge>
        </div>
      </div>
    </Card>
  );
}
