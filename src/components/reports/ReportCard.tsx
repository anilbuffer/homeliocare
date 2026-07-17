import React from "react";
import { motion } from "framer-motion";
import { ReportDefinition } from "@/lib/reports-mock-data";
import { ChartRenderer } from "./ChartRenderer";

interface ReportCardProps {
  report: ReportDefinition;
  onView: (report: ReportDefinition) => void;
}

export function ReportCard({ report, onView }: ReportCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-white backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative group"
    >
      <div className="mb-4">
        <h3 className="text-slate-900 font-semibold mb-1">{report.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{report.description}</p>
      </div>

      <div className="h-40 pointer-events-none relative overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent z-10" />
        <ChartRenderer
          type={report.chartType}
          data={report.data}
          xAxisKey={report.xAxisKey}
          dataKeys={report.dataKeys}
          height={160}
        />
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <button
          onClick={() => onView(report)}
          className="w-full py-2 text-brand-teal bg-brand-teal/10 hover:bg-brand-teal/20 rounded-xl text-sm font-semibold transition-all duration-300"
        >
          View Report
        </button>
      </div>
    </motion.div>
  );
}
