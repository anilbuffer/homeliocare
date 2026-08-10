"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Plus, Repeat, Calendar, CheckCircle2, AlertTriangle, PlayCircle, Search, ArrowUpDown, X } from "lucide-react";
import clsx from "clsx";
import { CreatePatternModal } from "@/components/scheduling/CreatePatternModal";

interface RecurringPattern {
  id: string;
  patientName: string;
  rule: string;
  duration: string;
  status: "Active" | "Paused" | "Expired";
  primaryCaregiver: string;
  autoBroadcast: boolean;
  upcomingGeneratedCount: number;
  fatigueRisk?: boolean;
}

const mockPatterns: RecurringPattern[] = [
  {
    id: "rp-1",
    patientName: "Dorothy Vance",
    rule: "Mon / Wed / Fri • 9:00 AM - 1:00 PM",
    duration: "12 weeks (Ends Nov 15)",
    status: "Active",
    primaryCaregiver: "Maria Alvarez",
    autoBroadcast: true,
    upcomingGeneratedCount: 6,
  },
  {
    id: "rp-2",
    patientName: "Frank Delaney",
    rule: "Tue / Thu • 2:00 PM - 6:00 PM",
    duration: "Ongoing",
    status: "Active",
    primaryCaregiver: "Robert Chen",
    autoBroadcast: true,
    upcomingGeneratedCount: 4,
  },
  {
    id: "rp-3",
    patientName: "Arthur Pendelton",
    rule: "Everyday • 8:00 AM - 8:00 PM (Split)",
    duration: "6 weeks (Ends Oct 10)",
    status: "Active",
    primaryCaregiver: "Multiple",
    autoBroadcast: false,
    upcomingGeneratedCount: 14,
    fatigueRisk: true,
  },
];

export default function RecurringPatternsPage() {
  const [patterns, setPatterns] = useState<RecurringPattern[]>(mockPatterns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editingPattern, setEditingPattern] = useState<RecurringPattern | null>(null);

  const togglePause = (id: string) => {
    setPatterns(patterns.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: p.status === "Active" ? "Paused" : "Active"
        }
      }
      return p;
    }));
  };

  const filteredPatterns = patterns.filter(p =>
    p.patientName.toLowerCase().includes(search.toLowerCase()) ||
    p.primaryCaregiver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 lg:mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Repeat className="w-5 h-5 text-brand-teal" />
            Recurring Patterns
          </h1>
          <p className="text-xs text-slate-500">
            Define recurring rules, manage the Auto-Scheduler Engine, and configure shift auto-broadcasting.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patterns..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal w-full sm:w-64 transition-all bg-white"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-brand-teal hover:bg-teal-600 text-white font-bold text-sm shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/25 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Pattern</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 lg:mb-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-white px-4 py-3 border border-indigo-100 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">Auto-Scheduler Engine</div>
              <div className="text-xs text-slate-500">Generating slots 14 days out</div>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white px-4 py-3 border border-emerald-100 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">Auto-Broadcaster</div>
              <div className="text-xs text-slate-500">Active on {patterns.filter(p => p.autoBroadcast).length} patterns</div>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white px-4 py-3 border border-amber-100 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">Fatigue Warnings</div>
              <div className="text-xs text-slate-500">{patterns.filter(p => p.fatigueRisk).length} pattern(s) flagged</div>
            </div>
          </div>
        </Card>
      </div>
      <Card noPadding className="bg-white rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-4 lg:mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Patient <ArrowUpDown className="w-3 h-3" /></div></th>
                <th className="px-4 py-3">Schedule Rule & Duration</th>
                <th className="px-4 py-3">Caregiver & Settings</th>
                <th className="px-4 py-3"><div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">Pending Slots (14d) <ArrowUpDown className="w-3 h-3" /></div></th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPatterns.map(pattern => (
                <tr key={pattern.id} className={clsx("hover:bg-slate-50/80 transition-colors", pattern.fatigueRisk && "bg-amber-50/30")}>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1.5">
                      <div className="font-medium text-slate-900 text-sm">{pattern.patientName}</div>
                      <span className={clsx(
                        "w-max px-2 py-1 rounded-full text-[11px] font-semibold tracking-wider",
                        pattern.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      )}>
                        {pattern.status}
                      </span>
                      {pattern.fatigueRisk && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-200 flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" /> Fatigue Risk
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100 w-max">
                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-xs text-slate-700 font-medium">{pattern.rule}</span>
                      </div>
                      <div className="text-xs text-slate-500 pl-1">{pattern.duration}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="space-y-2">
                      <div className="font-semibold text-slate-800 text-sm">
                        {pattern.primaryCaregiver}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        {pattern.autoBroadcast ? (
                          <span className="flex items-center gap-1 text-emerald-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Broadcast On
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Auto-Broadcast Off
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-brand-teal">{pattern.upcomingGeneratedCount}</span>
                      <span className="text-xs text-slate-500 font-medium">slots</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingPattern(pattern);
                          setIsModalOpen(true);
                        }}
                        className="text-xs font-semibold text-brand-teal hover:text-teal-700 bg-brand-teal/10 hover:bg-brand-teal/20 px-3 py-1.5 rounded-lg transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => togglePause(pattern.id)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                        {pattern.status === "Active" ? "Pause" : "Resume"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPatterns.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    No patterns found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <CreatePatternModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPattern(null);
        }}
        pattern={editingPattern}
      />
    </div>
  );
}
