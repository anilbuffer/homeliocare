"use client";

import React, { useState } from "react";
import { PerformanceTab } from "@/components/caregivers/tabs/PerformanceTab";
import { mockCaregivers, Caregiver } from "@/lib/caregivers/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import { User, Search, MessageSquare, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/components/ui/Card";

export default function ScopedCaregiversPage() {
  // In a real app, filter to only assigned caregivers
  const assignedCaregivers = Object.values(mockCaregivers).slice(0, 4);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(assignedCaregivers[0] || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [coachingNote, setCoachingNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  const filteredCaregivers = assignedCaregivers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSaveNote = () => {
    if (!coachingNote.trim()) return;
    setIsSavingNote(true);
    setTimeout(() => {
      setIsSavingNote(false);
      setCoachingNote("");
      toast.success("Coaching note saved successfully");
    }, 800);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">My Team Performance</h1>
          <p className="text-xs text-slate-500 font-normal mt-1">View performance metrics and log coaching notes for your assigned caregivers.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
        {/* Left sidebar: Roster */}
        <Card className="lg:col-span-1 flex flex-col h-[40vh] lg:h-auto bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search team..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {filteredCaregivers.map((cg) => (
              <button
                key={cg.id}
                onClick={() => setSelectedCaregiver(cg)}
                className={cn(
                  "w-full text-left p-2 rounded-xl transition-all flex items-center gap-3 mb-2",
                  selectedCaregiver?.id === cg.id
                    ? "bg-brand-teal/10 border border-brand-teal/20"
                    : "hover:bg-slate-50 border border-slate-200"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-200 shrink-0 overflow-hidden">
                  {cg.avatarUrl ? (
                    <img src={cg.avatarUrl} alt={cg.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-semibold bg-slate-50 text-xs ">
                      {cg.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className={cn("text-sm font-semibold truncate", selectedCaregiver?.id === cg.id ? "text-brand-teal" : "text-slate-700")}>
                    {cg.name}
                  </div>
                  <div className="text-[10px] text-normal text-slate-500 truncate">{cg.role}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Right side: Detail View */}
        <div className="lg:col-span-3 space-y-4 flex flex-col">
          {selectedCaregiver ? (
            <>
              {/* Quick Coaching Note Entry */}
              <Card className="shrink-0 flex flex-col bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
                <CardHeader
                  title={
                    <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-brand-teal" />
                      Log Coaching Note for {selectedCaregiver.name}
                    </span>
                  }
                  className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 mb-0"
                />
                <div className="px-4 py-3">
                  <textarea
                    rows={3}
                    placeholder="Document field guidance, positive feedback, or areas for improvement discussed..."
                    value={coachingNote}
                    onChange={(e) => setCoachingNote(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-colors resize-none mb-3"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNote}
                      disabled={!coachingNote.trim() || isSavingNote}
                      className="px-4 py-2 bg-brand-teal text-white text-sm font-semibold rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                    >
                      {isSavingNote ? "Saving..." : <><Save className="w-4 h-4" /> Save Note</>}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Existing Performance Tab component */}
              <div className="flex-1 min-h-0 bg-transparent">
                <PerformanceTab caregiver={selectedCaregiver} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
              <User className="w-12 h-12 mb-3 text-slate-300" />
              <p>Select a team member to view performance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
