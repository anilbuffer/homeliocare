"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Star } from "lucide-react";

const caregiversData = [
  { id: 1, name: "Emily R.", role: "RN", score: 98, rating: 4.9, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sarah J.", role: "HHA", score: 96, rating: 4.8, avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 3, name: "Marcus T.", role: "CNA", score: 94, rating: 4.7, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 4, name: "David K.", role: "PT", score: 91, rating: 4.6, avatar: "https://i.pravatar.cc/150?u=4" },
];

export function TopCaregivers() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Top performing caregivers" action={<Link href="/caregivers"><span className="text-brand-teal text-sm font-medium hover:underline cursor-pointer">Full ranking →</span></Link>} />
      
      <div className="flex-1 space-y-5">
        {caregiversData.map((item, index) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="text-sm font-bold text-slate-400 w-4 text-center">{index + 1}</div>
            <Avatar src={item.avatar} fallback={item.name.charAt(0)} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium text-text-primary text-sm truncate flex items-center gap-2">
                  {item.name} <span className="text-xs text-text-secondary font-normal px-1.5 py-0.5 bg-slate-100 rounded-md">{item.role}</span>
                </div>
                <div className="text-sm font-bold">{item.score}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-accent-amber text-xs w-10">
                  {item.rating} <Star className="w-3 h-3 fill-current" />
                </div>
                <ProgressBar progress={item.score} height="h-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
