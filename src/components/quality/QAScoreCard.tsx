"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Award } from "lucide-react";

export function QAScoreCard() {
  const [score, setScore] = useState(0);
  const targetScore = 92.1;

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setScore(Math.min(targetScore, (targetScore * currentStep) / steps));
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const data = [
    { name: "Chart", value: 35, color: "#14b8a6" },
    { name: "Visit", value: 25, color: "#0ea5e9" },
    { name: "Doc", value: 20, color: "#8b5cf6" },
    { name: "Plan", value: 10, color: "#f59e0b" },
    { name: "Med", value: 10, color: "#ef4444" },
  ];

  let cumulativePercent = 0;

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 h-full flex flex-col sm:flex-row lg:flex-col 2xl:flex-row gap-6 items-center justify-between xl:justify-center 2xl:justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-brand-teal/20 rounded-lg text-brand-teal">
            <Award className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-text-primary">Agency QA Score</h2>
        </div>
        <div className="flex items-end gap-4 mt-4">
          <div className="text-4xl font-bold text-text-primary tabular-nums tracking-tight">
            {score.toFixed(1)}<span className="text-2xl text-text-secondary">%</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full mb-1">
            <ArrowUpRight className="w-4 h-4" />
            +2.4%
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-2">vs. last period (89.7%)</p>
      </div>

      <div className="relative w-40 h-40 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {data.map((slice, i) => {
            const startAngle = (cumulativePercent / 100) * Math.PI * 2;
            const sliceAngle = (slice.value / 100) * Math.PI * 2;
            cumulativePercent += slice.value;

            const dashArray = `${(slice.value / 100) * 283} 283`;
            const dashOffset = (1 - (cumulativePercent - slice.value) / 100) * 283;

            return (
              <motion.circle
                key={i}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={slice.color}
                strokeWidth="10"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - ((slice.value / 100) * 283) }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                className="origin-center"
                style={{ transform: `rotate(${(cumulativePercent - slice.value) * 3.6}deg)` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold text-text-primary">{targetScore.toFixed(0)}</span>
          <span className="text-xs text-text-secondary">Score</span>
        </div>
      </div>
    </div>
  );
}
