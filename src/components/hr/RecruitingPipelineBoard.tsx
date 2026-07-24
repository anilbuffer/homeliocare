"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Filter,
  CheckCircle2,
  Lock,
  UserCheck
} from "lucide-react";
import { Candidate, CandidateStage, CandidateSource } from "@/types/hr";
import { CandidateDetailPanel } from "./CandidateDetailPanel";
import { AddCandidateModal } from "./AddCandidateModal";
import clsx from "clsx";

interface RecruitingPipelineBoardProps {
  initialCandidates: Candidate[];
  initialStageFilter?: CandidateStage | null;
}

const STAGES: CandidateStage[] = [
  "Applied",
  "Phone Screen",
  "Interview Scheduled",
  "Background Check",
  "Offer",
  "Hired"
];

export function RecruitingPipelineBoard({ initialCandidates, initialStageFilter }: RecruitingPipelineBoardProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [bulkActionMessage, setBulkActionMessage] = useState<string | null>(null);
  const [draggedCandidateId, setDraggedCandidateId] = useState<string | null>(null);

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {
      const matchSearch =
        cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.positionApplied.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPosition = positionFilter === "All" || cand.positionApplied.includes(positionFilter);
      const matchSource = sourceFilter === "All" || cand.source === sourceFilter;

      return matchSearch && matchPosition && matchSource;
    });
  }, [candidates, searchQuery, positionFilter, sourceFilter]);

  // Stage Grouping
  const candidatesByStage = useMemo(() => {
    const map: Record<CandidateStage, Candidate[]> = {
      "Applied": [],
      "Phone Screen": [],
      "Interview Scheduled": [],
      "Background Check": [],
      "Offer": [],
      "Hired": []
    };
    filteredCandidates.forEach((c) => {
      if (map[c.stage]) {
        map[c.stage].push(c);
      }
    });
    return map;
  }, [filteredCandidates]);

  // Drag and Drop Handlers
  const handleDragStart = (candId: string) => {
    setDraggedCandidateId(candId);
  };

  const handleDrop = (targetStage: CandidateStage) => {
    if (!draggedCandidateId) return;

    const cand = candidates.find(c => c.id === draggedCandidateId);
    if (cand) {
      const isOigFlagged = cand.oigSamCheck.status === "Flagged" && !cand.oigSamCheck.overrideBy;
      const isBgFlagged = cand.backgroundCheck.status === "Flagged";
      const isOnboardingIncomplete =
        !cand.onboardingChecklist.policyAcknowledged ||
        !cand.onboardingChecklist.i9Submitted ||
        !cand.onboardingChecklist.w4Submitted;

      if (targetStage === "Hired" && (isOigFlagged || isBgFlagged || isOnboardingIncomplete)) {
        alert(`Compliance Hard Gate: Cannot move ${cand.name} to Hired stage due to pending background check or OIG flags.`);
        setDraggedCandidateId(null);
        return;
      }

      setCandidates(prev =>
        prev.map(c => (c.id === draggedCandidateId ? { ...c, stage: targetStage } : c))
      );
    }
    setDraggedCandidateId(null);
  };

  // Keyboard Click-to-Advance fallback
  const handleAdvanceStage = (cand: Candidate) => {
    const currentIndex = STAGES.indexOf(cand.stage);
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1];

      const isOigFlagged = cand.oigSamCheck.status === "Flagged" && !cand.oigSamCheck.overrideBy;
      const isBgFlagged = cand.backgroundCheck.status === "Flagged";
      const isOnboardingIncomplete =
        !cand.onboardingChecklist.policyAcknowledged ||
        !cand.onboardingChecklist.i9Submitted ||
        !cand.onboardingChecklist.w4Submitted;

      if (nextStage === "Hired" && (isOigFlagged || isBgFlagged || isOnboardingIncomplete)) {
        alert(`Compliance Hard Gate: Cannot move ${cand.name} to Hired stage due to pending flags.`);
        return;
      }

      setCandidates(prev =>
        prev.map(c => (c.id === cand.id ? { ...c, stage: nextStage } : c))
      );
    }
  };

  // Bulk Actions
  const handleBulkMove = (newStage: CandidateStage) => {
    setCandidates(prev =>
      prev.map(c => (selectedCandidateIds.includes(c.id) ? { ...c, stage: newStage } : c))
    );
    setBulkActionMessage(`Moved ${selectedCandidateIds.length} candidate(s) to ${newStage}`);
    setSelectedCandidateIds([]);
    setTimeout(() => setBulkActionMessage(null), 3000);
  };

  const handleBulkSendMsg = () => {
    setBulkActionMessage(`Sent templated onboarding email to ${selectedCandidateIds.length} candidate(s).`);
    setSelectedCandidateIds([]);
    setTimeout(() => setBulkActionMessage(null), 3000);
  };

  const toggleSelectCandidate = (candId: string) => {
    setSelectedCandidateIds(prev =>
      prev.includes(candId) ? prev.filter(id => id !== candId) : [...prev, candId]
    );
  };

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate by name, role, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-full border border-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
            />
          </div>

          {/* Position Filter */}
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 outline-none shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <option value="All">All Positions</option>
            <option value="CNA">CNA</option>
            <option value="HHA">HHA</option>
            <option value="RN">RN</option>
            <option value="Companion">Companion</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 outline-none shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <option value="All">All Sources</option>
            <option value="Indeed">Indeed</option>
            <option value="ZipRecruiter">ZipRecruiter</option>
            <option value="Employee Referral">Employee Referral</option>
            <option value="CNA Program">CNA Program</option>
          </select>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal/90 active:scale-95 transition-all text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_6px_24px_rgba(14,163,131,0.6)]"
        >
          <Plus className="w-4 h-4" />
          Add Candidate
        </button>
      </div>

      {/* Bulk Action Bar */}
      {selectedCandidateIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          <span className="font-bold">{selectedCandidateIds.length} Candidate(s) Selected</span>
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => e.target.value && handleBulkMove(e.target.value as CandidateStage)}
              className="bg-slate-800 text-white px-3 py-1.5 rounded-xl border border-slate-700 font-bold"
            >
              <option value="">Move Stage...</option>
              {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={handleBulkSendMsg}
              className="px-4 py-1.5 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal/90"
            >
              Send Email / SMS
            </button>
          </div>
        </motion.div>
      )}

      {bulkActionMessage && (
        <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3 rounded-full border border-emerald-200 flex items-center gap-2 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          {bulkActionMessage}
        </div>
      )}

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1 w-full min-h-[600px] custom-scrollbar">
        {STAGES.map((stage) => {
          const list = candidatesByStage[stage] || [];
          return (
            <div
              key={stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(stage)}
              className="flex flex-col min-w-[310px] max-w-[310px] bg-slate-100/70 backdrop-blur-md rounded-2xl border border-slate-200/80 h-full overflow-hidden"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-sm">{stage}</h3>
                  <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {list.length}
                  </span>
                </div>
              </div>

              {/* Column Content Cards */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar">
                {list.map((cand) => {
                  const isSelected = selectedCandidateIds.includes(cand.id);
                  const isOigFlagged = cand.oigSamCheck.status === "Flagged" && !cand.oigSamCheck.overrideBy;
                  const isBgFlagged = cand.backgroundCheck.status === "Flagged";

                  return (
                    <motion.div
                      key={cand.id}
                      draggable
                      onDragStart={() => handleDragStart(cand.id)}
                      onClick={() => setSelectedCandidate(cand)}
                      className={clsx(
                        "bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 relative space-y-2.5 group",
                        isSelected ? "border-brand-teal ring-2 ring-brand-teal/20" : "border-slate-200/80 hover:border-brand-teal/40"
                      )}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => toggleSelectCandidate(cand.id)}
                            className="rounded text-brand-teal focus:ring-brand-teal"
                          />
                          <h4 className="font-bold text-slate-900 text-xs tracking-tight">{cand.name}</h4>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">{cand.dateApplied}</span>
                      </div>

                      <div className="text-xs text-slate-700 font-bold">{cand.positionApplied}</div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200/60">
                          {cand.source}
                        </span>
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200/60">
                          {cand.statusTag}
                        </span>
                      </div>

                      {/* Flag Warning Badges */}
                      {(isOigFlagged || isBgFlagged) && (
                        <div className="bg-red-50 text-red-800 text-[10px] font-bold p-2 rounded-xl flex items-center gap-1.5 border border-red-200">
                          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                          {isOigFlagged ? "OIG Exclusion Flagged" : "Background Flagged"}
                        </div>
                      )}

                      {/* Card Footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>{cand.assignedRecruiter.split(" ")[0]}</span>
                        {cand.stage !== "Hired" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdvanceStage(cand);
                            }}
                            title="Click to advance to next stage"
                            className="text-brand-teal hover:underline font-bold flex items-center gap-0.5 opacity-80 group-hover:opacity-100"
                          >
                            Advance <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {list.length === 0 && (
                  <div className="h-28 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-semibold">
                    No candidates in stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        existingCandidates={candidates}
        onAddCandidate={(newC) => setCandidates(prev => [newC, ...prev])}
      />

      {selectedCandidate && (
        <CandidateDetailPanel
          candidate={selectedCandidate}
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          onUpdateCandidate={(updated) => {
            setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
            setSelectedCandidate(updated);
          }}
        />
      )}
    </div>
  );
}
