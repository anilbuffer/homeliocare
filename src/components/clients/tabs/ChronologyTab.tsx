"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Client } from "@/lib/clients/mockData";
import { mockChronologyEntries, mockChronologyInsights, ChronologyCategory } from "@/lib/clients/mockChronology";
import { AITimelineInsights } from "../chronology/AITimelineInsights";
import { MedicalTimeline } from "../chronology/MedicalTimeline";

export function ChronologyTab({ client }: { client: Client }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ChronologyCategory | "all">("all");
  const [highlightedEntryIds, setHighlightedEntryIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for AI insights
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const entries = mockChronologyEntries[client.id] || [];
  const insights = mockChronologyInsights[client.id] || null;

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch =
        searchQuery === "" ||
        entry.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.details && entry.details.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Descending (newest first)
  }, [entries, searchQuery, selectedCategory]);

  const handlePatternClick = (patternId: string, relatedEntryIds: string[]) => {
    // Toggle highlight if clicking the same pattern, or highlight new ones
    if (highlightedEntryIds.length > 0 && highlightedEntryIds.every(id => relatedEntryIds.includes(id))) {
      setHighlightedEntryIds([]); // clear
    } else {
      setHighlightedEntryIds(relatedEntryIds);
    }
  };

  const clearHighlight = () => {
    setHighlightedEntryIds([]);
  };

  return (
    <div className="w-full pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800">Care Timeline</h3>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all w-full sm:w-64 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative flex-shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="appearance-none pl-9 pr-8 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all bg-white font-medium text-slate-600 cursor-pointer"
            >
              <option value="all">All Entries</option>
              <option value="admission">Admission</option>
              <option value="visit">Visits</option>
              <option value="medication">Medication</option>
              <option value="vitals">Vitals</option>
              <option value="incident">Incidents</option>
              <option value="communication">Communication</option>
              <option value="care_plan">Care Plan</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {highlightedEntryIds.length > 0 && (
        <div className="mb-4 p-3 bg-brand-teal/5 border border-brand-teal/20 rounded-lg flex items-center justify-between">
          <span className="text-sm text-brand-teal font-medium">
            Highlighting entries related to AI insight
          </span>
          <button
            onClick={clearHighlight}
            className="text-xs font-semibold px-2 py-1 bg-white text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
          >
            Clear Highlight
          </button>
        </div>
      )}

      <MedicalTimeline
        entries={filteredEntries}
        highlightedEntryIds={highlightedEntryIds}
      />

      <AITimelineInsights
        insights={insights}
        onPatternClick={handlePatternClick}
        isLoading={isLoading}
      />
    </div>
  );
}
