"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { MapPin, Clock } from "lucide-react";

const feedData = [
  { id: 1, time: "Just now", caregiver: "Emily R.", patient: "Arthur D.", address: "124 Cherry Ln", status: "In progress", variant: "info" as const, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, time: "10 mins ago", caregiver: "Marcus T.", patient: "Helen S.", address: "892 Oak St", status: "Completed", variant: "success" as const, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, time: "15 mins ago", caregiver: "Sarah J.", patient: "Robert M.", address: "450 Pine Ave", status: "In progress", variant: "info" as const, avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, time: "In 20 mins", caregiver: "David K.", patient: "Mary W.", address: "12 Maple Dr", status: "Scheduled", variant: "warning" as const, avatar: "https://i.pravatar.cc/150?u=4" },
];

export function LiveVisitFeed() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Live visit feed" action={<span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green"></span></span>} />
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
        {feedData.map((item) => (
          <div key={item.id} className="flex gap-4 items-start pb-4 border-b border-border-subtle last:border-0 last:pb-0">
            <Avatar src={item.avatar} fallback={item.caregiver.charAt(0)} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-text-primary text-sm truncate">
                  {item.caregiver} <span className="text-text-secondary font-normal">→ {item.patient}</span>
                </div>
                <Badge variant={item.variant} className="ml-2 shrink-0">{item.status}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </div>
                <div className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.address}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
