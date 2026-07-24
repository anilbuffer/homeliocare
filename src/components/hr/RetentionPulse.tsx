"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RetentionPulseData } from "@/types/hr";
import {
  TrendingDown,
  UserMinus,
  BarChart2,
  HeartHandshake,
  LineChart as LineChartIcon,
  CheckCircle2,
  Info,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

interface RetentionPulseProps {
  data: RetentionPulseData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const isBelowTarget = item.rate < 15;
    const diff = Math.abs(15 - item.rate).toFixed(1);

    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs p-3 rounded-xl shadow-xl border border-slate-800 space-y-1.5 min-w-[160px]">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
          <span className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">{label} Turnover</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-teal/20 text-teal-300">
            {item.month}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-white tracking-tight">{item.rate}%</span>
          <span className="text-[10px] text-slate-400">rate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={clsx(
              "text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1",
              isBelowTarget
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            )}
          >
            <CheckCircle2 className="w-3 h-3" />
            {isBelowTarget ? `${diff}% under 15% target` : `${diff}% over target`}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function RetentionPulse({ data }: RetentionPulseProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const latestRate = data.turnoverTrend[data.turnoverTrend.length - 1]?.rate || 11.2;
  const firstRate = data.turnoverTrend[0]?.rate || 14.2;
  const change12Mo = (latestRate - firstRate).toFixed(1);

  return (
    <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-teal/10 text-brand-teal border border-brand-teal/20 shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                Caregiver Retention & Turnover Pulse
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rolling 12-month turnover analytics, exit interview trends, and separation tracking.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <TrendingDown className="w-4 h-4 text-emerald-600" /> {latestRate}% Rolling Turnover ({change12Mo}% YoY)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Column 1 (lg:col-span-6): 12-Month Turnover Trend Chart */}
        <div className="md:col-span-2 lg:col-span-6 space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-brand-teal" />
                12-Month Turnover Trend
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                Target: &lt;15%
              </span>
            </div>

            {/* Toggle Area vs Bar */}
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/60 text-xs">
              <button
                onClick={() => setChartType("area")}
                className={clsx(
                  "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer",
                  chartType === "area"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <LineChartIcon className="w-3.5 h-3.5 text-brand-teal" />
                Area
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={clsx(
                  "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer",
                  chartType === "bar"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <BarChart2 className="w-3.5 h-3.5 text-brand-teal" />
                Bars
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-white/80 rounded-xl border border-slate-200/70 text-center">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Current</span>
              <span className="text-sm font-extrabold text-slate-900">{latestRate}%</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Peak (Aug)</span>
              <span className="text-sm font-extrabold text-amber-600">14.2%</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Status</span>
              <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" /> Healthy
              </span>
            </div>
          </div>

          {/* Premium Recharts Render */}
          <div className="h-52 w-full pt-2 min-h-[210px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "area" ? (
                  <AreaChart data={data.turnoverTrend} margin={{ top: 12, right: 12, left: -24, bottom: 0 }}>
                    <defs>
                      <linearGradient id="turnoverTealGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA383" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#0EA383" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.7} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }}
                      dy={6}
                    />
                    <YAxis
                      domain={[8, 16]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748B" }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={15}
                      stroke="#EF4444"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: "Target (<15%)",
                        fill: "#EF4444",
                        fontSize: 10,
                        fontWeight: 700,
                        position: "top",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#0EA383"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#turnoverTealGrad)"
                      dot={{ r: 4, fill: "#0EA383", stroke: "#FFFFFF", strokeWidth: 2 }}
                      activeDot={{ r: 7, fill: "#0EA383", stroke: "#FFFFFF", strokeWidth: 3 }}
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={data.turnoverTrend} margin={{ top: 12, right: 12, left: -24, bottom: 0 }}>
                    <defs>
                      <linearGradient id="turnoverBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0EA383" stopOpacity={1} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.8} />
                      </linearGradient>
                      <linearGradient id="turnoverBarMuted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.7} />
                        <stop offset="100%" stopColor="#CBD5E1" stopOpacity={0.5} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.7} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }}
                      dy={6}
                    />
                    <YAxis
                      domain={[0, 16]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748B" }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={15}
                      stroke="#EF4444"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: "Target (<15%)",
                        fill: "#EF4444",
                        fontSize: 10,
                        fontWeight: 700,
                        position: "top",
                      }}
                    />
                    <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                      {data.turnoverTrend.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index >= data.turnoverTrend.length - 3 ? "url(#turnoverBarGrad)" : "url(#turnoverBarMuted)"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">
                Loading chart...
              </div>
            )}
          </div>
        </div>

        {/* Column 2 (lg:col-span-3): Top Exit Reasons */}
        <div className="md:col-span-1 lg:col-span-3 space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-teal" />
                Exit Reasons
              </span>
              <span className="text-[11px] font-semibold text-slate-400">Exit Interviews</span>
            </div>

            <div className="space-y-3">
              {data.topReasons.map((reason) => {
                const isSelected = selectedReason === reason.reason;
                return (
                  <div
                    key={reason.reason}
                    onClick={() => setSelectedReason(isSelected ? null : reason.reason)}
                    className={clsx(
                      "p-2 rounded-xl transition-all cursor-pointer border",
                      isSelected
                        ? "bg-white border-brand-teal/40 shadow-xs"
                        : "border-transparent hover:bg-white/60"
                    )}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800 truncate pr-2" title={reason.reason}>
                        {reason.reason}
                      </span>
                      <span className="text-brand-teal font-extrabold shrink-0">
                        {reason.percentage}% <span className="text-[10px] text-slate-400">({reason.count})</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-brand-teal to-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${reason.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400" /> Schedule is #1 reason
            </span>
            <Link
              href="/hr/caregivers"
              className="text-brand-teal font-bold hover:underline inline-flex items-center gap-0.5"
            >
              Retention plan <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Column 3 (lg:col-span-3): Recent Separations Log */}
        <div className="md:col-span-1 lg:col-span-3 space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <UserMinus className="w-4 h-4 text-slate-600" />
                Recent Separations
              </span>
              <span className="text-[11px] font-semibold text-slate-400">Last 30 Days</span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {data.recentSeparations.map((sep) => (
                <div
                  key={sep.id}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-brand-teal/40 hover:shadow-xs transition-all flex items-start justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <Link
                      href="/hr/caregivers"
                      className="font-bold text-slate-900 hover:text-brand-teal hover:underline transition-colors truncate block"
                    >
                      {sep.caregiverName}
                    </Link>
                    <div className="text-[11px] text-slate-500 font-medium truncate">
                      {sep.role} &bull; {sep.reasonCode}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{sep.effectiveDate}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={clsx(
                        "font-bold text-[10px] px-2 py-0.5 rounded-full inline-block",
                        sep.type === "Voluntary"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      )}
                    >
                      {sep.type}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 font-medium">
                      Rehire: <span className="font-bold text-slate-600">{sep.wouldRehire ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 text-right">
            <Link
              href="/hr/caregivers"
              className="text-[11px] text-brand-teal font-bold hover:underline inline-flex items-center gap-0.5"
            >
              View all caregivers <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

