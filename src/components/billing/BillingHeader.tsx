"use client";

import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const dateRanges = ["This Month", "Last Quarter", "Year to Date", "Custom"];

export function BillingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Billing & Claims Workspace</h1>
        <p className="text-sm text-slate-500 mt-1">Track revenue, resolve denials, and keep AR moving.</p>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors shadow-sm"
          >
            {selectedRange}
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          {isOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 py-1.5 min-w-[160px] z-20">
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
            </div>
          )}
        </div>
        
        <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-sm shadow-brand-teal/20 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          New Claim
        </button>
      </div>
    </div>
  );
}
