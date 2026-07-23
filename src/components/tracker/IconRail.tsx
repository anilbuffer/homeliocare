"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  HeartHandshake,
  Wrench,
  Wallet,
  Scale,
  GraduationCap,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import clsx from "clsx";

const adminNavItems = [
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

const schedulerNavItems = [
  { id: "dashboard", icon: LayoutDashboard, href: "/scheduler", title: "Dashboard" },
  { id: "scheduling", icon: CalendarDays, href: "/scheduler/board", title: "Scheduling & Shift Board" },
  { id: "tracker", icon: MapPin, href: "/scheduler/tracker", title: "Caregiver Tracker" },
  { id: "caregivers", icon: HeartHandshake, href: "/scheduler/caregivers", title: "Caregivers" },
  { id: "messages", icon: MessageSquare, href: "/scheduler/messages", title: "Messages" },
];

export function IconRail() {
  const pathname = usePathname();
  const isScheduler = pathname?.startsWith("/scheduler");
  const navItems = isScheduler ? schedulerNavItems : adminNavItems;
  const logoHref = isScheduler ? "/scheduler" : "/dashboard";

  return (
    <div className="w-16 flex-shrink-0 bg-[#0B2A3D] text-white flex flex-col items-center py-6 h-screen relative z-40 border-r border-[#0e354a] select-none">
      {/* Logo */}
      <Link
        href={logoHref}
        className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center font-bold text-lg mb-8 hover:brightness-110 transition-all shadow-md shadow-brand-teal/30 shrink-0"
        title={isScheduler ? "Homelio Care - Scheduler Portal" : "Homelio Care"}
      >
        H
      </Link>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-center gap-3 w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.id === "tracker" && pathname?.includes("tracker"));
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

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50">
                {item.title}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
