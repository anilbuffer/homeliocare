"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

const credentialsData = [
  { id: 1, name: "David K.", cert: "CPR & First Aid", days: 3, avatar: "", variant: "error" as const },
  { id: 2, name: "Sarah J.", cert: "HHA License", days: 12, avatar: "", variant: "warning" as const },
  { id: 3, name: "Marcus T.", cert: "TB Test", days: 28, avatar: "", variant: "warning" as const },
  { id: 4, name: "Emily R.", cert: "RN License", days: 45, avatar: "", variant: "success" as const },
];

export function CredentialTracker() {
  return (
    <Card className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
      <CardHeader title="Training Expiry" action={<Link href="/training"><span className="text-brand-teal text-sm font-medium hover:underline cursor-pointer">Manage →</span></Link>} />

      <div className="flex-1 space-y-4">
        {credentialsData.map((item) => (
          <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-border-subtle last:border-0 last:pb-0">
            <Avatar src={item.avatar} fallback={item.name.charAt(0)} size="md" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-text-primary text-sm truncate mb-0.5">
                {item.name}
              </div>
              <div className="text-xs text-text-secondary truncate">
                {item.cert}
              </div>
            </div>
            <Badge variant={item.variant} className="shrink-0">
              {item.days} days
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
