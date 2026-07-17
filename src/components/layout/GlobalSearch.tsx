"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
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
    color: "text-accent-blue",
    path: "/patients/c-1?tab=chronology"
  },
  {
    id: 2,
    title: "Lisinopril 10mg - Active Prescription",
    matchedIn: "medication name",
    icon: Pill,
    color: "text-accent-purple",
    path: "/patients/c-1?tab=medications"
  },
  {
    id: 3,
    title: "Care Plan Update - Fall Prevention",
    matchedIn: "care plan title",
    icon: ShieldCheck,
    color: "text-accent-green",
    path: "/patients/c-1?tab=careplan"
  }
];

export function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fadePlaceholder, setFadePlaceholder] = useState(true);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery(""); // Clear query on close
    }
  }, [isOpen]);

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

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
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
    <>
      {/* TRIGGER (Desktop: Fake Input, Mobile: Icon Button) */}
      <div
        className="relative flex items-center bg-white border border-border-subtle rounded-full transition-all duration-300 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-text w-10 h-10 min-[1120px]:w-[480px] min-[1120px]:h-10 group"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-5 h-5 absolute left-2.5 min-[1120px]:left-3 text-slate-400 group-hover:text-brand-teal transition-colors" />

        {/* Ghost Placeholder & Initial Animation (Desktop Only) */}
        <div className="hidden min-[1120px]:flex absolute left-10 pointer-events-none items-center h-full text-sm text-slate-400 overflow-hidden pr-[120px] whitespace-nowrap">
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

        {/* Search Everything Micro-badge & Shortcut */}
        <div className="hidden min-[1120px]:flex absolute right-2 items-center pointer-events-none gap-2">
          <div className="flex items-center gap-1 bg-brand-teal/10 text-brand-teal text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Global</span>
          </div>
          <div className="flex items-center gap-0.5 text-xs text-slate-400 font-medium px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* SEARCH DIALOG (Modal) */}
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-start justify-center sm:pt-[10vh] sm:px-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog Container */}
          <div className="relative w-full h-full sm:h-auto sm:max-w-3xl bg-white sm:rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col animate-in fade-in sm:zoom-in-95 duration-200">

            {/* Header / Input Area */}
            <div className="flex items-center border-b border-border-subtle px-4 py-3">
              <Search className="w-6 h-6 text-brand-teal mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search care plans, patients, vitals, caregivers, compliance docs, caregiver notes across every project..."
                className="flex-1 bg-transparent text-sm sm:text-base text-text-primary placeholder:text-slate-400 focus:outline-none h-10 min-w-0 text-ellipsis"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 sm:flex-none sm:max-h-[60vh] overflow-y-auto">
              {query.length === 0 ? (
                // Idle State
                <div className="p-5">
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
                              inputRef.current?.focus();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-current text-xs font-medium transition-transform hover:scale-105 active:scale-95 ${chip.color}`}
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
                <div className="p-3">
                  <div className="px-3 py-2 text-xs font-medium text-slate-400">
                    Search results for "{query}"
                  </div>
                  <div className="flex flex-col gap-2">
                    {mockResults.map((result) => {
                      const Icon = result.icon;
                      return (
                        <button
                          key={result.id}
                          onClick={() => {
                            setIsOpen(false);
                            router.push(result.path);
                          }}
                          className="w-full text-left p-3 bg-white border border-slate-200 hover:bg-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[0_8px_32px_rgb(0,0,0,0.08)] rounded-xl transition-all duration-200 flex items-start gap-3 group"
                        >
                          <div className={`mt-0.5 p-2 rounded-lg bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors ${result.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-brand-teal transition-colors">
                              {highlightMatch(result.title, query)}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <span className="text-[11px] font-medium border border-border-subtle text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                matched in: <span className="text-slate-700">{result.matchedIn}</span>
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

            {/* Footer Navigation Hints */}
            <div className="border-t border-border-subtle bg-slate-50 p-3 px-4 flex items-center justify-between sm:justify-start gap-6 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-medium">↑</span>
                <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-medium">↓</span>
                <span>navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-medium">Enter</span>
                <span>open</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-medium">Esc</span>
                <span>close</span>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
