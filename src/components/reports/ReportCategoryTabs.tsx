import React from "react";
import { ReportCategory } from "@/lib/reports-mock-data";

interface ReportCategoryTabsProps {
  categories: ReportCategory[];
  activeCategory: ReportCategory;
  onSelect: (category: ReportCategory) => void;
}

export function ReportCategoryTabs({ categories, activeCategory, onSelect }: ReportCategoryTabsProps) {
  return (
    <div className="flex bg-white rounded-2xl p-1.5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] mb-6 overflow-x-auto max-w-full w-fit [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative px-5 py-2 text-sm font-semibold transition-all rounded-xl whitespace-nowrap ${isActive
                ? "bg-brand-teal/10 text-brand-teal border border-brand-teal/20 shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                : "text-slate-600 hover:text-slate-900 border border-transparent hover:bg-slate-50"
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
