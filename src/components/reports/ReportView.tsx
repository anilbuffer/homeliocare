import React, { useState } from "react";
import { motion } from "framer-motion";
import { ReportDefinition } from "@/lib/reports-mock-data";
import { ChartRenderer } from "./ChartRenderer";
import { Download, FileSpreadsheet, X, Calendar, Share2, Printer } from "lucide-react";

interface ReportViewProps {
  report: ReportDefinition;
  onClose: () => void;
}

export function ReportView({ report, onClose }: ReportViewProps) {
  const [period, setPeriod] = useState<"mtd" | "ytd" | "last_year">("mtd");
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setExportType(type);
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      setExportType(null);
      alert(`${type} export complete!`);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[16px] md:rounded-[20px] border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200">
                {report.category}
              </span>
              <h2 className="text-xl font-semibold text-slate-900">{report.title}</h2>
            </div>
            <p className="text-slate-500 text-xs md:text-sm">{report.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('PDF')}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-medium transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
            >
              {isExporting && exportType === 'PDF' ? (
                <span className="animate-pulse">Generating...</span>
              ) : (
                <><Download className="w-4 h-4" /> PDF</>
              )}
            </button>
            <button
              onClick={() => handleExport('Excel')}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-medium transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
            >
              <FileSpreadsheet className="w-4 h-4" /> Excel
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-full transition-colors ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 sm:px-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal p-1.5 shadow-[0_6px_32px_rgba(0,0,0,0.06)] outline-none transition-all"
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
            >
              <option value="mtd">Month to Date</option>
              <option value="ytd">Year to Date</option>
              <option value="last_year">Last Year</option>
            </select>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 text-xs text-brand-teal hover:text-brand-teal/80 transition-colors px-3 py-1.5 bg-brand-teal/10 rounded-lg font-medium">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 bg-white border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] rounded-lg font-medium">
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] h-[250px] sm:h-[300px]">
              <ChartRenderer
                type={report.chartType}
                data={report.data}
                xAxisKey={report.xAxisKey}
                dataKeys={report.dataKeys}
                height="100%"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col h-[250px] sm:h-[300px]">
              <div className="px-3 sm:px-4 py-3 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <h3 className="font-semibold text-slate-900">Underlying Data</h3>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChartRenderer
                  type="table"
                  data={report.data}
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
