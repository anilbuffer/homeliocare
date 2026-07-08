"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const data = [
  { day: "Mon", Scheduled: 120, Completed: 118 },
  { day: "Tue", Scheduled: 132, Completed: 128 },
  { day: "Wed", Scheduled: 141, Completed: 135 },
  { day: "Thu", Scheduled: 138, Completed: 138 },
  { day: "Fri", Scheduled: 145, Completed: 140 },
  { day: "Sat", Scheduled: 85, Completed: 80 },
  { day: "Sun", Scheduled: 75, Completed: 75 },
];

export function VisitsChart() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader 
        title="Visits this week" 
        action={<Badge variant="success">96% Completion</Badge>}
      />
      <div className="flex-1 min-h-[250px] w-full mt-4 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9EC" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7684" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7684" }} />
            <Tooltip 
              cursor={{ fill: "#F4F6F8" }}
              contentStyle={{ borderRadius: "12px", border: "1px solid #E5E9EC", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", color: "#6B7684", paddingTop: "20px" }} />
            <Bar dataKey="Scheduled" fill="#E5E9EC" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Completed" fill="#0EA383" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
