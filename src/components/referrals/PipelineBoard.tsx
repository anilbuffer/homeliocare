import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, FileText, CheckCircle2, Copy } from "lucide-react";
import clsx from "clsx";

import { Referral, ReferralStage } from "./types";
import { initialReferrals } from "./MockData";
import { ReferralDetailPanel } from './ReferralDetailPanel';
import { ReferralListView } from "./ReferralListView";
import { ReferralTaskView } from "./ReferralTaskView";
import { HandoffSummaryModal } from "./HandoffSummaryModal";

const PIPELINE_STAGES: ReferralStage[] = [
  "Referral Received",
  "Contact Attempted",
  "Initial Assessment Scheduled",
  "Insurance Verification",
  "Eligibility Confirmed",
  "Consent & Agreements",
  "Care Plan Setup",
  "Admitted"
];

function calculateDischargeUrgency(deadline?: string) {
  if (!deadline) return "none";
  const msRemaining = new Date(deadline).getTime() - Date.now();
  const hrsRemaining = msRemaining / (1000 * 60 * 60);
  if (hrsRemaining <= 24) return "danger";
  return "warning";
}

function calculateDocsCompleteness(docs: Referral["documents"]) {
  if (!docs || docs.length === 0) return { completed: 0, total: 0 };
  const completed = docs.filter(d => d.status === "Verified" || d.status === "Uploaded").length;
  return { completed, total: docs.length };
}

interface ReferralCardProps {
  referral: Referral;
  onClick: (referral: Referral) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

function ReferralCard({ referral, onClick, onDragStart }: ReferralCardProps) {
  const urgency = calculateDischargeUrgency(referral.dischargeDeadline);
  const docs = calculateDocsCompleteness(referral.documents);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      draggable
      onDragStart={(e: any) => onDragStart(e, referral.id)}
      onClick={() => onClick(referral)}
      className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden cursor-pointer select-none mb-3"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-text-primary text-sm">{referral.clientName} </h4>
          <p className="text-xs text-text-secondary">{referral.source} • {referral.daysInStage}d in stage</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 shrink-0">
          {referral.clientInitials}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {referral.dischargeDeadline && (
          <div className={clsx(
            "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border",
            urgency === "danger" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"
          )}>
            <Clock className="w-3 h-3" />
            &lt; 24h
          </div>
        )}

        {referral.isPossibleDuplicate && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Copy className="w-3 h-3" />
            Duplicate?
          </div>
        )}

        {referral.serviceZoneStatus === "out-of-zone" ? (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-red-50 text-red-700 border border-red-200">
            <AlertTriangle className="w-3 h-3" />
            Out of Zone
          </div>
        ) : referral.serviceZoneStatus === "near-capacity" ? (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            Near Capacity
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            In Zone
          </div>
        )}

        {docs.total > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
            <FileText className="w-3 h-3" />
            {docs.completed}/{docs.total} Docs
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-brand-teal/20 flex items-center justify-center text-[10px] font-medium text-brand-teal">
            {referral.assignedCoordinator.name.charAt(0)}
          </div>
          <span className="text-[11px] text-slate-500">{referral.assignedCoordinator.name}</span>
        </div>
        {referral.nextAction?.isOverdue && (
          <span className="text-[10px] font-medium text-red-600">Action Overdue</span>
        )}
      </div>
    </motion.div>
  );
}

interface PipelineBoardProps {
  viewMode: "pipeline" | "list" | "tasks";
}

export function PipelineBoard({ viewMode }: PipelineBoardProps) {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [activeReferral, setActiveReferral] = useState<Referral | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<ReferralStage | null>(null);

  const [handoffModalOpen, setHandoffModalOpen] = useState(false);
  const [pendingAdmitReferral, setPendingAdmitReferral] = useState<Referral | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, stage: ReferralStage) => {
    e.preventDefault();
    setDragOverStage(stage);
  };

  const handleDrop = (e: React.DragEvent, stage: ReferralStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");

    if (id && stage) {
      if (stage === "Admitted") {
        const refToAdmit = referrals.find(r => r.id === id);
        if (refToAdmit) {
          setPendingAdmitReferral(refToAdmit);
          setHandoffModalOpen(true);
        }
      } else {
        setReferrals(prev => prev.map(ref => {
          if (ref.id === id) {
            return { ...ref, stage, daysInStage: 0 };
          }
          return ref;
        }));
      }
    }
    setDraggedId(null);
    setDragOverStage(null);
  };

  const confirmAdmit = () => {
    if (pendingAdmitReferral) {
      setReferrals(prev => prev.map(ref => {
        if (ref.id === pendingAdmitReferral.id) {
          return { ...ref, stage: "Admitted", daysInStage: 0 };
        }
        return ref;
      }));
      setHandoffModalOpen(false);
      setPendingAdmitReferral(null);
      // In a real app, redirect to /patients/[id] or show a success toast here
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setDragOverStage(null);
  };

  const updateReferral = (updatedRef: Referral) => {
    setReferrals(prev => prev.map(r => r.id === updatedRef.id ? updatedRef : r));
    setActiveReferral(updatedRef);
  };

  if (viewMode === "list") {
    return (
      <>
        <ReferralListView referrals={referrals} onReferralClick={setActiveReferral} />
        <ReferralDetailPanel
          referral={activeReferral}
          onClose={() => setActiveReferral(null)}
          onUpdate={updateReferral}
        />
      </>
    );
  }

  if (viewMode === "tasks") {
    return (
      <>
        <ReferralTaskView referrals={referrals} onReferralClick={setActiveReferral} />
        <ReferralDetailPanel
          referral={activeReferral}
          onClose={() => setActiveReferral(null)}
          onUpdate={updateReferral}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {PIPELINE_STAGES.map(stage => {
          const stageReferrals = referrals.filter(r => r.stage === stage)
            .sort((a, b) => {
              // Sort by discharge deadline if exists
              if (a.dischargeDeadline && b.dischargeDeadline) {
                return new Date(a.dischargeDeadline).getTime() - new Date(b.dischargeDeadline).getTime();
              }
              if (a.dischargeDeadline) return -1;
              if (b.dischargeDeadline) return 1;
              return 0;
            });

          const isDragOver = dragOverStage === stage;

          return (
            <div
              key={stage}
              className={clsx(
                "flex-shrink-0 w-80 flex flex-col bg-slate-50/50 rounded-xl border transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden",
                isDragOver ? "border-brand-teal bg-teal-50/10" : "border-slate-200"
              )}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-white rounded-t-xl">
                <h3 className="font-semibold text-sm text-slate-700">{stage}</h3>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">
                  {stageReferrals.length}
                </span>
              </div>

              <div className="p-3 flex-1 overflow-y-auto min-h-[400px]">
                <AnimatePresence>
                  {stageReferrals.map(ref => (
                    <ReferralCard
                      key={ref.id}
                      referral={ref}
                      onClick={setActiveReferral}
                      onDragStart={handleDragStart}
                    />
                  ))}
                </AnimatePresence>
                {stageReferrals.length === 0 && (
                  <div className="text-center p-4 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl pointer-events-none">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ReferralDetailPanel
        referral={activeReferral}
        onClose={() => setActiveReferral(null)}
        onUpdate={updateReferral}
      />

      {pendingAdmitReferral && (
        <HandoffSummaryModal
          isOpen={handoffModalOpen}
          onClose={() => {
            setHandoffModalOpen(false);
            setPendingAdmitReferral(null);
          }}
          referral={pendingAdmitReferral}
          onConfirm={confirmAdmit}
        />
      )}
    </>
  );
}
