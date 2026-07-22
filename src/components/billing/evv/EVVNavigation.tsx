"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Settings, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

export function EVVNavigation() {
  const pathname = usePathname();

  const links = [
    { name: "Submission Dashboard", href: "/billing/evv", icon: Activity },
    { name: "Visit Maintenance", href: "/billing/evv/maintenance", icon: ClipboardList },
    { name: "State Config & Connectors", href: "/billing/evv/config", icon: Settings },
  ];

  return (
    <div className="inline-flex items-center p-1.5 bg-slate-100/80 backdrop-blur-md border border-slate-200/60 rounded-2xl mb-8 shadow-inner">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-all rounded-xl flex items-center gap-2 z-10 ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Icon className={`w-4 h-4 ${isActive ? 'text-brand-teal' : ''}`} />
              {link.name}
            </span>
            {isActive && (
              <motion.div
                layoutId="evv-nav-active"
                className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-slate-200/50"
                initial={false}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
