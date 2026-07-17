"use client";

import React from "react";
import { Sparkles, TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { ChronologyInsights } from "@/lib/patients/mockChronology";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface AITimelineInsightsProps {
  insights: ChronologyInsights | null;
  onPatternClick: (patternId: string, relatedEntryIds: string[]) => void;
  isLoading?: boolean;
}

export function AITimelineInsights({ insights, onPatternClick, isLoading }: AITimelineInsightsProps) {
  if (isLoading) {
    return (
      <Card className="p-6 mb-8 bg-slate-50/50 border-slate-200 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      </Card>
    );
  }

  if (!insights) {
    return null;
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Improving": return <TrendingUp className="w-4 h-4 mr-1.5" />;
      case "Declining": return <TrendingDown className="w-4 h-4 mr-1.5" />;
      case "Needs attention": return <AlertCircle className="w-4 h-4 mr-1.5" />;
      case "Stable":
      default: return <Minus className="w-4 h-4 mr-1.5" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Improving": return "success";
      case "Declining": return "error";
      case "Needs attention": return "warning";
      case "Stable":
      default: return "default";
    }
  };

  return (
    <Card className="p-6 mt-8 bg-gradient-to-br from-slate-50 to-white border-brand-teal/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
      {/* Decorative AI background element */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-brand-teal font-semibold">
            <Sparkles className="w-5 h-5" />
            <h3>AI Progress Insights</h3>
          </div>
          <Badge variant={getTrendColor(insights.trend)}>
            <div className="flex items-center">
              {getTrendIcon(insights.trend)}
              {insights.trend}
            </div>
          </Badge>
        </div>

        <p className="text-slate-700 leading-relaxed mb-6">
          {insights.summary}
        </p>

        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Key Patterns</h4>
          <ul className="space-y-2">
            {insights.flaggedPatterns.map(pattern => (
              <li key={pattern.id}>
                <button
                  onClick={() => onPatternClick(pattern.id, pattern.relatedEntryIds)}
                  className="text-left w-full flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-teal/30 hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-sm text-slate-700 group-hover:text-brand-teal transition-colors">
                    {pattern.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
          <span className="text-slate-500 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {insights.confidenceNote}
          </span>
          <span className="text-slate-400 italic">
            AI-generated summary for reference only. Not a substitute for clinical judgment.
          </span>
        </div>
      </div>
    </Card>
  );
}
