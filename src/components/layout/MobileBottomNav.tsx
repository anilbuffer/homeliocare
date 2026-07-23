"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  HeartHandshake,
  Receipt,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard, pattern: ["/dashboard", "/"] },
  { name: "Scheduler", href: "/scheduling", icon: CalendarDays, pattern: ["/scheduling", "/scheduler"] },
  { name: "Caregivers", href: "/caregivers", icon: HeartHandshake, pattern: ["/caregivers"] },
  { name: "Billing", href: "/billing", icon: Receipt, pattern: ["/billing"] },
  { name: "Settings", href: "/settings", icon: Settings, pattern: ["/settings"] },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const isItemActive = (patterns: string[]) => {
    if (!pathname) return false;
    return patterns.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 min-[1120px]:hidden bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-3 py-2 text-white shadow-2xl">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isItemActive(item.pattern);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 min-h-[44px] min-w-[56px] text-center select-none active:scale-95",
                active ? "text-brand-teal font-bold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              {active && (
                <motion.div
                  layoutId="activeMobileNavTab"
                  className="absolute inset-0 bg-brand-teal/15 rounded-xl border border-brand-teal/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={clsx("w-5 h-5 relative z-10 transition-transform duration-200", active && "scale-110")} />
              <span className="text-[10px] mt-1 relative z-10 leading-tight tracking-tight font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
