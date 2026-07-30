"use client";

import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dateRanges = ["This Month", "Last Quarter", "Year to Date", "Custom"];

interface IncidentsHeaderProps {
  onReportIncident: () => void;
}

export function IncidentsHeader({ onReportIncident }: IncidentsHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="mb-2">
        <h1 className="text-base font-semibold text-slate-900 tracking-tight">Incident Reports</h1>
        <p className="text-xs text-slate-500 mt-1">Manage and track incident reports, regulatory compliance, and corrective actions.</p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
          >
            {selectedRange}
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-2 right-0 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 py-1.5 min-w-[160px] z-20"
              >
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-teal transition-colors"
                  >
                    {range}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReportIncident}
          className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Report Incident
        </motion.button>
      </div>
    </div>
  );
}
