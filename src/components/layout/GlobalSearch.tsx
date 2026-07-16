"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  Users,
  Pill,
  Clock,
  ShieldCheck,
  HeartPulse,
  FileText,
  TrendingUp,
  X
} from "lucide-react";

const placeholders = [
  "Search medications...",
  "Search care plans...",
  "Search John's vitals...",
  "Search compliance docs...",
  "Search caregiver notes..."
];

const categoryChips = [
  { label: "Patients", icon: Users, color: "bg-accent-blue/10 text-accent-blue" },
  { label: "Medications", icon: Pill, color: "bg-accent-purple/10 text-accent-purple" },
  { label: "Chronology", icon: Clock, color: "bg-accent-orange/10 text-accent-orange" },
  { label: "Compliance", icon: ShieldCheck, color: "bg-accent-green/10 text-accent-green" },
  { label: "Caregivers", icon: HeartPulse, color: "bg-brand-teal/10 text-brand-teal" },
  { label: "Assessments", icon: FileText, color: "bg-slate-100 text-slate-600" },
];

const trendingKeywords = [
  "Lisinopril",
  "Sarah Jenkins",
  "fall risk",
  "I-9 Form"
];

// Mock search results
const mockResults = [
  {
    id: 1,
    title: "Patient Note: Recent fall risk assessment for John Doe",
    matchedIn: "caregiver note, June 12",
    icon: FileText,
    color: "text-accent-blue"
  },
  {
    id: 2,
    title: "Lisinopril 10mg - Active Prescription",
    matchedIn: "medication name",
    icon: Pill,
    color: "text-accent-purple"
  },
  {
    id: 3,
    title: "Care Plan Update - Fall Prevention",
    matchedIn: "care plan title",
    icon: ShieldCheck,
    color: "text-accent-green"
  }
];

export function GlobalSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fadePlaceholder, setFadePlaceholder] = useState(true);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotating placeholder logic
  useEffect(() => {
    if (showInitialAnimation) return;

    const interval = setInterval(() => {
      setFadePlaceholder(false);
      setTimeout(() => {
        setPlaceholderIndex((current) => (current + 1) % placeholders.length);
        setFadePlaceholder(true);
      }, 300); // Wait for fade out before changing text
    }, 3000);

    return () => clearInterval(interval);
  }, [showInitialAnimation]);

  // Initial animation logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 2000); // 2 seconds for initial icon animation
    return () => clearTimeout(timer);
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    // Simple naive highlight for demo
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={i} className="bg-brand-teal/20 text-brand-teal font-medium rounded px-0.5">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="relative group w-full max-w-full" ref={containerRef}>
      {/* Search Bar Container */}
      <div className={`relative flex items-center w-[200px] min-[1120px]:w-[480px] h-10 bg-white border rounded-full transition-all duration-300 shadow-[0_6px_32px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden ${isFocused ? 'ring-2 ring-brand-teal/50 border-brand-teal' : 'border-border-subtle'}`}>

        <Search className={`w-5 h-5 absolute left-3 transition-colors ${isFocused ? 'text-brand-teal' : 'text-slate-400'}`} />

        {/* The Actual Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full h-full pl-10 pr-[100px] bg-transparent text-sm focus:outline-none z-10"
        />

        {/* Ghost Placeholder & Initial Animation */}
        {!query && (
          <div className="absolute left-10 pointer-events-none flex items-center h-full text-sm text-slate-400">
            {showInitialAnimation ? (
              <div className="flex items-center gap-2 animate-[slideRight_1.5s_ease-out_forwards]">
                <Users className="w-4 h-4 text-accent-blue opacity-50" />
                <Pill className="w-4 h-4 text-accent-purple opacity-50" />
                <FileText className="w-4 h-4 text-accent-green opacity-50" />
                <span className="opacity-0 animate-[fadeIn_0.5s_ease-in_1.5s_forwards]">Initializing search...</span>
              </div>
            ) : (
              <span className={`transition-opacity duration-300 ${fadePlaceholder ? 'opacity-100' : 'opacity-0'}`}>
                {placeholders[placeholderIndex]}
              </span>
            )}
          </div>
        )}

        {/* Search Everything Micro-badge */}
        <div className="absolute right-2 flex items-center pointer-events-none">
          <div className="flex items-center gap-1 bg-brand-teal/10 text-brand-teal text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Global</span>
          </div>
        </div>
      </div>

      {/* Results Dropdown / Modal */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

          {query.length === 0 ? (
            // Idle State
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryChips.map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <button
                        key={chip.label}
                        onClick={() => {
                          setQuery(`category:${chip.label.toLowerCase()} `);
                          // keep focus
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-xs font-medium transition-transform hover:scale-105 active:scale-95 ${chip.color}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Try searching
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => setQuery(keyword)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-border-subtle rounded-full text-xs text-slate-600 transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Active Search State
            <div className="p-3 max-h-[400px] overflow-y-auto">
              <div className="px-3 py-2 text-xs font-medium text-slate-400">
                Search results for "{query}"
              </div>
              <div className="flex flex-col gap-2">
                {mockResults.map((result) => {
                  const Icon = result.icon;
                  return (
                    <button
                      key={result.id}
                      className="w-full text-left p-3 bg-white border border-slate-200 hover:bg-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl transition-colors flex items-start gap-3 group"
                    >
                      <div className={`mt-0.5 p-2 rounded-lg bg-white border border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:border-slate-300 transition-colors ${result.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text-primary truncate">
                          {highlightMatch(result.title, query)}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[11px] font-medium border border-border-subtle text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-lg">
                            matched in: <span className="text-slate-600">{result.matchedIn}</span>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* See all results link */}
                <button className="w-full mt-2 p-3 text-sm text-center text-brand-teal hover:bg-brand-teal/5 font-medium rounded-lg transition-colors">
                  View all results for "{query}"
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
