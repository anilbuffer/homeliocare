"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, UserPlus, FileText, CalendarClock } from "lucide-react";
import { cn } from "@/components/ui/Card";

interface HRNavHeaderProps {
  activeTab: "roster" | "recruiting" | "onboarding" | "time-off";
}

export function HRNavHeader({ activeTab }: HRNavHeaderProps) {
  const tabs = [
    { id: "roster", label: "Caregiver Roster", icon: Users, href: "/caregivers" },
    { id: "recruiting", label: "Recruiting Pipeline", icon: UserPlus, href: "/caregivers/recruiting" },
    { id: "onboarding", label: "Onboarding & Docs", icon: FileText, href: "/caregivers/onboarding" },
    { id: "time-off", label: "Time-Off Requests", icon: CalendarClock, href: "/caregivers/time-off" },
  ];

  return (
    <div className="flex flex-col gap-6 mb-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Caregivers & HR</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your caregiver roster, recruiting pipeline, and HR requests.</p>
      </div>

      <div className="flex items-center p-1.5 bg-white backdrop-blur-md rounded-2xl overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/80 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full border border-slate-200/60 w-fit max-w-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl",
                isActive ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="hr-nav-tab-indicator"
                  className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
