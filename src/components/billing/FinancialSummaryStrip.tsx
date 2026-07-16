"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { clsx } from "clsx";

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      // Easing function (easeOutQuart)
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(value * ease);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const formattedValue = value >= 1000 ? Math.round(displayValue).toLocaleString("en-US") : (Math.round(displayValue * 10) / 10).toLocaleString("en-US", { minimumFractionDigits: value % 1 !== 0 ? 1 : 0, maximumFractionDigits: 1 });

  return (
    <span>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

const metrics = [
  {
    title: "Total Revenue",
    value: 614000,
    prefix: "$",
    trend: "+5.2%",
    trendDir: "up",
    subtext: "vs. last period",
    color: "text-brand-teal"
  },
  {
    title: "Outstanding AR",
    value: 27200,
    prefix: "$",
    trend: "-3.1%",
    trendDir: "down",
    subtext: "lower is better",
    color: "text-red-500"
  },
  {
    title: "Denial Rate",
    value: 4.2,
    suffix: "%",
    trend: "-0.4%",
    trendDir: "down",
    subtext: "target < 5%",
    color: "text-red-500"
  },
  {
    title: "Avg. DSO",
    value: 38,
    suffix: " days",
    trend: "-2%",
    trendDir: "down",
    subtext: "target < 45",
    color: "text-amber-500"
  },
  {
    title: "Claims Submitted",
    value: 312,
    trend: "+7.1%",
    trendDir: "up",
    subtext: "this period",
    color: "text-brand-teal"
  },
  {
    title: "Collections Rate",
    value: 96.8,
    suffix: "%",
    trend: "+0.6%",
    trendDir: "up",
    subtext: "of billed",
    color: "text-brand-teal"
  }
];

export function FinancialSummaryStrip() {
  return (
    <div className="grid w-full sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, i) => (
        <Card
          key={i}
          className="p-4 sm:p-5 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="text-sm font-medium text-slate-500 mb-2">{metric.title}</div>
          <div className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
            <AnimatedNumber value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
          </div>
          <div className="flex items-center gap-1 text-xs mt-auto">
            <span className={clsx("flex items-center font-medium", metric.color)}>
              {metric.trendDir === "up" ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
              {metric.trend}
            </span>
            <span className="text-slate-400 ml-1">{metric.subtext}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
