import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, FileText, CheckCircle2, Copy, Activity, MapPin, Loader2, Building2, Globe, Zap } from "lucide-react";
import clsx from "clsx";

import { Referral, ReferralStage } from "./types";
import { initialReferrals } from "./MockData";
import { ReferralDetailPanel } from './ReferralDetailPanel';
import { ReferralListView } from "./ReferralListView";
import { ReferralTaskView } from "./ReferralTaskView";
import { HandoffSummaryModal } from "./HandoffSummaryModal";

function SmartRNModal({ isOpen, onClose, referral, onConfirm }: { isOpen: boolean, onClose: () => void, referral: Referral | null, onConfirm: (rnName: string) => void }) {
  if (!isOpen || !referral) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Schedule Assessment</h3>
        <p className="text-sm text-slate-500 mb-4">Geographic matching for {referral.clientName}</p>

        <div className="space-y-3 mb-6">
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-teal-100 transition-colors" onClick={() => onConfirm("Jane Doe, RN")}>
            <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold shrink-0">JD</div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-teal-900">Jane Doe, RN</h4>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-200 text-teal-800">Closest Match</span>
              </div>
              <p className="text-xs text-teal-700 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> 2.4 miles away (Est. 8 mins)</p>
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => onConfirm("Mike Smith, RN")}>
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0">MS</div>
            <div>
              <h4 className="font-semibold text-slate-700">Mike Smith, RN</h4>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> 5.1 miles away (Est. 15 mins)</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
        </div>
      </motion.div>
    </div>
  );
}
const PIPELINE_STAGES: ReferralStage[] = [
  "Referral Received",
  "Clinical Review",
  "Contact Attempted",
  "Insurance Verification",
  "Eligibility Confirmed",
  "Assigned to Care Team",
  "Consent & Agreements",
  "Admitted",
  "Converted"
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
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-text-primary text-sm">{referral.clientName}</h4>
            <span className={clsx(
              "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
              referral.workflowType === "Referral" ? "bg-purple-100 text-purple-700" : "bg-teal-100 text-brand-teal"
            )}>
              {referral.workflowType || "Inquiry"}
            </span>
          </div>
          <p className="text-xs text-text-secondary">{referral.source} • {referral.daysInStage}d in stage</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 shrink-0">
          {referral.clientInitials}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {/* Document Completeness */}
        {docs.total > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
            <div className="relative w-3 h-3 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-3.5 h-3.5 -rotate-90">
                <path className="text-slate-200" strokeWidth="6" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-brand-teal transition-all duration-500" strokeWidth="6" strokeDasharray={`${(docs.completed / docs.total) * 100}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </div>
            {docs.completed}/{docs.total} Docs
          </div>
        )}

        {/* Insurance Status */}
        {referral.insurance && (
          <div className={clsx(
            "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border",
            referral.insurance.status === "Verified" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-orange-50 text-orange-700 border-orange-200"
          )}>
            {referral.insurance.status === "Verified" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            {referral.insurance.payer} {referral.insurance.status === "Verified" ? "(Verified)" : "- Prior Auth Required"}
          </div>
        )}

        {/* AI Urgency Pill */}
        {(referral.readmissionRisk === "High" || urgency === "danger" || referral.urgency === "High") && (
          <div className={clsx("flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.04)] animate-pulse border",
            referral.urgency === "High" ? "bg-red-100 text-red-700 border-red-300" : "bg-rose-100 text-rose-700 border-rose-200")}>
            <Activity className="w-3 h-3" />
            {referral.urgency === "High" ? "🔴 Urgent (Discharge < 48h)" : referral.readmissionRisk === "High" ? "High Readmission Risk" : "Same-Day Discharge"}
          </div>
        )}

        {referral.workflowType === "Referral" ? (
          <>
            {referral.npi ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                NPI on File
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-3 h-3" />
                Missing NPI
              </div>
            )}

            {referral.clinicalReviewStatus && (
              <div className={clsx(
                "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border",
                referral.clinicalReviewStatus === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  referral.clinicalReviewStatus === "Denied" ? "bg-red-50 text-red-700 border-red-200" :
                    "bg-amber-50 text-amber-700 border-amber-200"
              )}>
                Clinical {referral.clinicalReviewStatus}
              </div>
            )}
          </>
        ) : (
          <>
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
          </>
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
  referrals: Referral[];
  setReferrals: React.Dispatch<React.SetStateAction<Referral[]>>;
}

export function PipelineBoard({ viewMode, referrals, setReferrals }: PipelineBoardProps) {
  const [segment, setSegment] = useState<"All" | "Referral" | "Inquiry">("All");
  const [activeReferral, setActiveReferral] = useState<Referral | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<ReferralStage | null>(null);

  const [handoffModalOpen, setHandoffModalOpen] = useState(false);
  const [pendingAdmitReferral, setPendingAdmitReferral] = useState<Referral | null>(null);

  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [pendingAssessmentRef, setPendingAssessmentRef] = useState<Referral | null>(null);
  const [eligibilityCheckId, setEligibilityCheckId] = useState<string | null>(null);

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
      const ref = referrals.find(r => r.id === id);
      if (!ref) return;

      if (ref.workflowType === "Referral") {
        const invalidReferralStages = ["Contact Attempted", "Initial Assessment Scheduled", "Insurance Verification"];
        if (invalidReferralStages.includes(stage)) {
          setDraggedId(null);
          setDragOverStage(null);
          return;
        }
      } else {
        const invalidInquiryStages = ["Clinical Review", "Assigned to Care Team"];
        if (invalidInquiryStages.includes(stage)) {
          setDraggedId(null);
          setDragOverStage(null);
          return;
        }
      }

      if (ref.workflowType === "Referral" && stage === "Eligibility Confirmed") {
        if (ref.clinicalReviewStatus === "Pending" || ref.clinicalReviewStatus === "Denied") {
          alert("Cannot move to Eligibility Confirmed: Clinical Review must be Approved");
          setDraggedId(null);
          setDragOverStage(null);
          return;
        }
      }

      if (stage === "Admitted" || stage === "Converted") {
        const refToAdmit = referrals.find(r => r.id === id);
        if (refToAdmit) {
          setPendingAdmitReferral(refToAdmit);
          setHandoffModalOpen(true);
        }
      } else if (stage === "Initial Assessment Scheduled") {
        const refToAssess = referrals.find(r => r.id === id);
        if (refToAssess) {
          setPendingAssessmentRef(refToAssess);
          setAssessmentModalOpen(true);
        }
      } else {
        setReferrals(prev => prev.map(r => {
          if (r.id === id) {
            if (stage === "Insurance Verification") {
              setEligibilityCheckId(id);
              setTimeout(() => {
                setEligibilityCheckId(null);
                setReferrals(curr => curr.map(currR => currR.id === id ? { ...currR, insurance: { payer: currR.insurance?.payer || "Unknown", status: "Verified" } } : currR));
              }, 3000);
            }
            return { ...r, stage, daysInStage: 0 };
          }
          return r;
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

  const confirmAssessment = (rnName: string) => {
    if (pendingAssessmentRef) {
      setReferrals(prev => prev.map(ref => {
        if (ref.id === pendingAssessmentRef.id) {
          return { ...ref, stage: "Initial Assessment Scheduled", daysInStage: 0, assessment: { assignedAssessor: rnName, status: "Pending" } };
        }
        return ref;
      }));
      setAssessmentModalOpen(false);
      setPendingAssessmentRef(null);
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

  const filteredReferrals = referrals.filter(r => {
    if (segment === "Referral") return r.workflowType === "Referral";
    if (segment === "Inquiry") return r.workflowType === "Inquiry";
    return true;
  });

  return (
    <>
      <div className="flex items-center gap-2 mb-4 bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-1 rounded-xl w-fit">
        {(["All", "Referral", "Inquiry"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSegment(tab)}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              segment === tab ? "bg-brand-teal text-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab === "All" ? "All Intakes" : tab === "Referral" ? "Clinical Referrals" : "Direct Inquiries"}
          </button>
        ))}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {PIPELINE_STAGES.map(stage => {
          const stageReferrals = filteredReferrals.filter(r => r.stage === stage)
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

      <SmartRNModal
        isOpen={assessmentModalOpen}
        onClose={() => {
          setAssessmentModalOpen(false);
          setPendingAssessmentRef(null);
        }}
        referral={pendingAssessmentRef}
        onConfirm={confirmAssessment}
      />

      <AnimatePresence>
        {eligibilityCheckId && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-[100]"
          >
            <Loader2 className="w-5 h-5 text-brand-teal animate-spin" />
            <div>
              <p className="text-sm font-semibold">Running Eligibility Check...</p>
              <p className="text-xs text-slate-400">Querying 270/271 clearinghouse</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
