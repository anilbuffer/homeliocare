"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Briefcase, Users, Clock, ShieldCheck, TrendingDown, AlertTriangle } from "lucide-react";
import clsx from "clsx";

interface KpiCardProps {
  title: string;
  value: number;
  suffix?: string;
  decimals?: number;
  subtext: string;
  icon: React.ElementType;
  colorTheme?: "teal" | "blue" | "amber" | "red";
  delay?: number;
  onClick?: () => void;
}

function KpiCard({ title, value, suffix = "", decimals = 0, subtext, icon: Icon, colorTheme = "teal", delay = 0, onClick }: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const colorStyles = {
    teal: "text-brand-teal bg-brand-teal/10 border-brand-teal/20 shadow-[0_2px_10px_rgba(14,163,131,0.12)]",
    blue: "text-blue-600 bg-blue-50/80 border-blue-200/80 shadow-[0_2px_10px_rgba(59,130,246,0.12)]",
    amber: "text-amber-600 bg-amber-50/80 border-amber-200/80 shadow-[0_2px_10px_rgba(245,158,11,0.12)]",
    red: "text-red-600 bg-red-50/80 border-red-200/80 shadow-[0_2px_10px_rgba(239,68,68,0.12)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={clsx(
        "group bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-200 hover:border-brand-teal hover:shadow-[0_8px_30px_rgba(14,163,131,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between select-none",
        onClick && "cursor-pointer active:scale-[0.98]"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold text-slate-500 line-clamp-1">{title}</span>
        <div className={clsx("p-2 rounded-xl border shrink-0 transition-all duration-300 group-hover:scale-110", colorStyles[colorTheme])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
          <span className="text-sm sm:text-base font-medium text-slate-500 ml-0.5">{suffix}</span>
        </div>
        <p className="text-xs font-medium text-slate-500 mt-1.5 flex items-center gap-1">{subtext}</p>
      </div>
    </motion.div>
  );
}

export function HrKpiStrip() {
  const router = useRouter();

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-5">
      <KpiCard
        title="Open Requisitions"
        value={12}
        subtext="+2 added this week"
        icon={Briefcase}
        colorTheme="blue"
        delay={0.05}
        onClick={() => router.push("/hr/recruiting")}
      />
      <KpiCard
        title="Candidates in Pipeline"
        value={28}
        subtext="8 in interview / bg check"
        icon={Users}
        colorTheme="blue"
        delay={0.1}
        onClick={() => router.push("/hr/recruiting")}
      />
      <KpiCard
        title="Avg. Time to Fill"
        value={14.5}
        decimals={1}
        suffix=" days"
        subtext="-2.1 days vs last mo"
        icon={Clock}
        colorTheme="teal"
        delay={0.15}
        onClick={() => router.push("/hr/recruiting")}
      />
      <KpiCard
        title="90-Day Retention"
        value={91.8}
        decimals={1}
        suffix="%"
        subtext="Above 88% goal"
        icon={ShieldCheck}
        colorTheme="teal"
        delay={0.2}
        onClick={() => scrollToElement("retention-pulse")}
      />
      <KpiCard
        title="Turnover Rate (12m)"
        value={11.2}
        decimals={1}
        suffix="%"
        subtext="-1.4% year-over-year"
        icon={TrendingDown}
        colorTheme="teal"
        delay={0.25}
        onClick={() => scrollToElement("retention-pulse")}
      />
      <KpiCard
        title="Expiring Credentials"
        value={4}
        subtext="Next 30 days (1 expired)"
        icon={AlertTriangle}
        colorTheme="amber"
        delay={0.3}
        onClick={() => scrollToElement("credential-watchlist")}
      />
    </div>
  );
}

