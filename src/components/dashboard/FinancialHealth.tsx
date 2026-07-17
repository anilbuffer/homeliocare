"use client";

import React from "react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";

const payerData = [
  { name: "Medicare", value: 65, color: "#0EA383" },
  { name: "Medicaid", value: 20, color: "#3B82F6" },
  { name: "Private Pay", value: 10, color: "#8B5CF6" },
  { name: "Commercial", value: 5, color: "#F59E0B" },
];

export function FinancialHealth() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Financial Health" action={<Link href="/billing"><span className="text-brand-teal text-sm font-medium hover:underline cursor-pointer">Details →</span></Link>} />

      <div className="flex gap-4 mb-6">
        <div className="relative w-[160px] h-[160px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={payerData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {payerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg text-text-secondary">Total Rev</span>
            <span className="font-bold text-text-primary">$1.2M</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-2 text-xs">
          {payerData.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="text-text-secondary">{item.name}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-50 border border-border-subtle rounded-xl p-3">
          <div className="text-xs text-text-secondary mb-1">Unbilled</div>
          <div className="font-semibold text-lg">$42,500</div>
        </div>
        <div className="bg-slate-50 border border-border-subtle rounded-xl p-3">
          <div className="text-xs text-text-secondary mb-1">Denied Claims</div>
          <div className="font-semibold text-lg text-accent-red">$8,240</div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text-secondary font-medium">AR Aging</span>
        </div>
        <div className="w-full h-3 flex rounded-full overflow-hidden">
          <div className="bg-brand-teal w-[60%]" title="0-30 Days: 60%" />
          <div className="bg-accent-amber w-[25%]" title="31-60 Days: 25%" />
          <div className="bg-accent-orange w-[10%]" title="61-90 Days: 10%" />
          <div className="bg-accent-red w-[5%]" title="90+ Days: 5%" />
        </div>
        <div className="flex justify-between text-[10px] text-text-secondary mt-1.5">
          <span>0-30 Days</span>
          <span>90+</span>
        </div>
      </div>
    </Card>
  );
}
