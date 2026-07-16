"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, MapPin, HeartHandshake, Wrench, Wallet, Scale, GraduationCap, ShieldCheck } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, href: "/dashboard", title: "Dashboard" },
  { id: "scheduling", icon: CalendarDays, href: "/scheduling", title: "Scheduling" },
  { id: "tracker", icon: MapPin, href: "/caregivers-tracker", title: "Tracker" },
  { id: "team", icon: HeartHandshake, href: "/caregivers", title: "Team" },
  { id: "Incidents", icon: Wrench, href: "/incidents", title: "Incidents" },
  { id: "Billing", icon: Wallet, href: "/billing", title: "Billing" },
  { id: "Quality", icon: Scale, href: "/quality-assurance", title: "Quality" },
  { id: "Training", icon: GraduationCap, href: "/training", title: "Training" },
  { id: "EVV", icon: ShieldCheck, href: "/evv-monitoring", title: "EVV" },
];

export function IconRail() {
  return (
    <div className="w-16 flex-shrink-0 bg-[#0B2A3D] text-white flex flex-col items-center py-6 h-screen relative z-40 border-r border-[#0e354a]">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="w-10 h-10 rounded-lg bg-brand-teal flex items-center justify-center font-bold text-lg mb-8 hover:brightness-110 transition-all shadow-md"
        title="Homelio Care"
      >
        H
      </Link>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-center gap-4 w-full">
        {navItems.map((item) => {
          const isActive = item.id === "tracker"; // Currently hardcoded as we're on the tracker page
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              title={item.title}
              className={clsx(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all group",
                isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-[#1a3d53]"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-brand-teal rounded-xl opacity-100 shadow-[0_0_15px_rgba(14,163,131,0.4)]" />
              )}
              <Icon className={clsx("w-5 h-5 relative z-10")} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
