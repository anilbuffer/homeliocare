"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  ShieldAlert,
  AlertOctagon,
  Lock,
  Briefcase,
  Star,
  Phone,
  Mail,
  ChevronRight
} from "lucide-react";
import { Candidate, CandidateStage, IntegrationCheckStatus } from "@/types/hr";
import clsx from "clsx";

interface CandidateDetailPanelProps {
  candidate: Candidate;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCandidate: (updated: Candidate) => void;
}

export function CandidateDetailPanel({ candidate, isOpen, onClose, onUpdateCandidate }: CandidateDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<"application" | "checks" | "onboarding" | "notes">("checks");
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteRating, setNewNoteRating] = useState(5);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideReason, setOverrideReason] = useState("");

  if (!isOpen) return null;

  // Check hard compliance gates
  const isOigFlagged = candidate.oigSamCheck.status === "Flagged" && !candidate.oigSamCheck.overrideBy;
  const isBgFlagged = candidate.backgroundCheck.status === "Flagged";
  const isOnboardingIncomplete =
    !candidate.onboardingChecklist.policyAcknowledged ||
    !candidate.onboardingChecklist.hipaaTrainingCompleted ||
    !candidate.onboardingChecklist.abuseReportingCompleted ||
    !candidate.onboardingChecklist.i9Submitted ||
    !candidate.onboardingChecklist.w4Submitted;

  const isHireBlocked = isOigFlagged || isBgFlagged || isOnboardingIncomplete;

  const handleStageChange = (newStage: CandidateStage) => {
    if (newStage === "Hired" && isHireBlocked) {
      alert("Hiring Gated: Candidate has pending compliance or background check flags preventing hire.");
      return;
    }
    onUpdateCandidate({ ...candidate, stage: newStage });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: `n-${Date.now()}`,
      interviewerName: "Sarah Jenkins",
      interviewerRole: "HR Recruiter",
      date: new Date().toISOString().split("T")[0],
      rating: newNoteRating,
      text: newNoteText.trim()
    };

    onUpdateCandidate({
      ...candidate,
      notes: [newNote, ...candidate.notes]
    });
    setNewNoteText("");
  };

  const handleCheckStatusChange = (
    checkType: "backgroundCheck" | "sexOffenderCheck" | "oigSamCheck",
    newStatus: IntegrationCheckStatus
  ) => {
    onUpdateCandidate({
      ...candidate,
      [checkType]: {
        ...candidate[checkType],
        status: newStatus,
        lastCheckedDate: new Date().toISOString().split("T")[0]
      }
    });
  };

  const handleToggleChecklist = (key: keyof Candidate["onboardingChecklist"]) => {
    onUpdateCandidate({
      ...candidate,
      onboardingChecklist: {
        ...candidate.onboardingChecklist,
        [key]: !candidate.onboardingChecklist[key]
      }
    });
  };

  const handleApplyOverride = () => {
    if (!overrideReason.trim()) return;

    onUpdateCandidate({
      ...candidate,
      oigSamCheck: {
        ...candidate.oigSamCheck,
        overrideBy: "Compliance Officer (QA Override)",
        overrideDate: new Date().toISOString().split("T")[0],
        flagReason: `Override Applied: ${overrideReason}`
      }
    });
    setShowOverrideModal(false);
    setOverrideReason("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 z-50 flex justify-end backdrop-blur-sm">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col z-50 border-l border-slate-200"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">{candidate.name}</h2>
                <span className="bg-brand-teal/10 text-brand-teal text-xs font-semibold px-3 py-1 rounded-full border border-brand-teal/20">
                  {candidate.positionApplied}
                </span>
                <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
                  Stage: {candidate.stage}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-2.5 flex-wrap font-medium">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" />{candidate.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" />{candidate.phone}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-400" />Source: {candidate.source}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hard Gate Compliance Alert if flagged */}
          {isHireBlocked && (
            <div className="bg-red-50 border-b border-red-200 p-4 px-5 flex items-start gap-3 text-xs text-red-900">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-red-800 flex items-center gap-2 text-xs">
                  <Lock className="w-3.5 h-3.5" />
                  Hard Compliance Gate Active — Gated from &quot;Hired / Active&quot;
                </div>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-red-700 font-medium">
                  {isOigFlagged && <li>OIG/SAM Medicaid Exclusion Potential Flag (Mandatory Hard Stop)</li>}
                  {isBgFlagged && <li>Background Check Flagged ({candidate.backgroundCheck.flagReason})</li>}
                  {isOnboardingIncomplete && <li>Onboarding Documents / I-9 / W-4 Incomplete</li>}
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Tabs Pill Bar */}
          <div className="p-3 border-b border-slate-200 bg-slate-50/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center bg-slate-200/60 p-1 rounded-full gap-1 overflow-x-auto text-xs font-semibold custom-scrollbar">
              <button
                onClick={() => setActiveTab("checks")}
                className={clsx(
                  "px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5",
                  activeTab === "checks" ? "bg-brand-teal text-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Compliance & Checks
              </button>
              <button
                onClick={() => setActiveTab("onboarding")}
                className={clsx(
                  "px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5",
                  activeTab === "onboarding" ? "bg-brand-teal text-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <FileText className="w-3.5 h-3.5" />
                Onboarding Checklist
              </button>
              <button
                onClick={() => setActiveTab("application")}
                className={clsx(
                  "px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5",
                  activeTab === "application" ? "bg-brand-teal text-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Credentials
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={clsx(
                  "px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5",
                  activeTab === "notes" ? "bg-brand-teal text-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Star className="w-3.5 h-3.5" />
                Interview Notes ({candidate.notes.length})
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs custom-scrollbar">
            {activeTab === "checks" && (
              <div className="space-y-4">
                {/* OIG/SAM Exclusion Check */}
                <div className={clsx(
                  "p-4 rounded-2xl border space-y-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
                  isOigFlagged ? "bg-red-50/80 border-red-300" : candidate.oigSamCheck.status === "Clear" ? "bg-emerald-50/60 border-emerald-200" : "bg-slate-50 border-slate-200"
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <AlertOctagon className={clsx("w-5 h-5 shrink-0", isOigFlagged ? "text-red-600" : "text-emerald-600")} />
                      <div>
                        <div className="font-semibold text-slate-900 text-xs">OIG / SAM Federal Exclusion Check</div>
                        <div className="text-[11px] text-slate-500 font-medium">Status: {candidate.oigSamCheck.status}</div>
                      </div>
                    </div>
                    <select
                      value={candidate.oigSamCheck.status}
                      onChange={(e) => handleCheckStatusChange("oigSamCheck", e.target.value as IntegrationCheckStatus)}
                      className="px-3 py-1.5 rounded-full border border-slate-300 bg-white font-semibold outline-none text-xs shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Pending">Pending</option>
                      <option value="Clear">Clear</option>
                      <option value="Flagged">Flagged</option>
                    </select>
                  </div>

                  {isOigFlagged && (
                    <div className="bg-red-100 border border-red-300 p-3.5 rounded-xl text-red-900 space-y-2">
                      <div className="font-semibold flex items-center justify-between">
                        <span>Federal Medicaid Exclusion Hard Stop Flag</span>
                        <button
                          onClick={() => setShowOverrideModal(true)}
                          className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded-full text-[11px] font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                        >
                          Compliance Override
                        </button>
                      </div>
                      <p className="text-[11px] font-medium">{candidate.oigSamCheck.flagReason || "Potential match on SAM.gov exclusion database."}</p>
                    </div>
                  )}

                  {candidate.oigSamCheck.overrideBy && (
                    <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-amber-900 text-[11px] font-medium">
                      <strong>Override Applied by:</strong> {candidate.oigSamCheck.overrideBy} ({candidate.oigSamCheck.overrideDate})
                    </div>
                  )}
                </div>

                {/* Background Check State Machine */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Background Check ({candidate.backgroundCheck.provider})</div>
                      <div className="text-[11px] text-slate-500 font-medium">Last updated: {candidate.backgroundCheck.lastCheckedDate || "N/A"}</div>
                    </div>
                    <select
                      value={candidate.backgroundCheck.status}
                      onChange={(e) => handleCheckStatusChange("backgroundCheck", e.target.value as IntegrationCheckStatus)}
                      className="px-3 py-1.5 rounded-full border border-slate-300 bg-white font-semibold outline-none text-xs shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Pending">Pending</option>
                      <option value="Clear">Clear</option>
                      <option value="Flagged">Flagged</option>
                    </select>
                  </div>
                  {candidate.backgroundCheck.status === "Flagged" && (
                    <div className="p-3 bg-red-100 text-red-800 rounded-xl text-[11px] font-medium">
                      <strong>Flag Reason:</strong> {candidate.backgroundCheck.flagReason || "Flagged during background verification."}
                    </div>
                  )}
                </div>

                {/* Sex Offender Registry */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="font-semibold text-slate-900 text-xs">Sex Offender Registry Search</div>
                    <div className="text-[11px] text-slate-500 font-medium">Status: {candidate.sexOffenderCheck.status}</div>
                  </div>
                  <select
                    value={candidate.sexOffenderCheck.status}
                    onChange={(e) => handleCheckStatusChange("sexOffenderCheck", e.target.value as IntegrationCheckStatus)}
                    className="px-3 py-1.5 rounded-full border border-slate-300 bg-white font-semibold outline-none text-xs shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Pending">Pending</option>
                    <option value="Clear">Clear</option>
                    <option value="Flagged">Flagged</option>
                  </select>
                </div>

                {/* TB Test */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="font-semibold text-slate-900 text-xs">TB Screening / Chest X-Ray</div>
                    <div className="text-[11px] text-slate-500 font-medium">Result: {candidate.tbTest.result} ({candidate.tbTest.date || "Pending"})</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-xs">
                    {candidate.tbTest.result}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "onboarding" && (
              <div className="space-y-4">
                <div className="font-semibold text-slate-900 text-xs">Pre-Employment Onboarding Checklist</div>
                <div className="space-y-2.5">
                  {[
                    { key: "policyAcknowledged", label: "Agency Policy & Employee Handbook Acknowledgment" },
                    { key: "hipaaTrainingCompleted", label: "HIPAA & Patient Privacy Compliance Module" },
                    { key: "abuseReportingCompleted", label: "Abuse-Reporting & Mandatory Reporting Module" },
                    { key: "i9Submitted", label: "Form I-9 Employment Eligibility Verification (Hard Gate)" },
                    { key: "w4Submitted", label: "Form W-4 Employee Withholding Allowance (Hard Gate)" },
                  ].map((item) => {
                    const isChecked = candidate.onboardingChecklist[item.key as keyof Candidate["onboardingChecklist"]];
                    return (
                      <label
                        key={item.key}
                        className={clsx(
                          "flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
                          isChecked ? "bg-emerald-50/80 border-emerald-200 text-emerald-900 font-semibold" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                        )}
                      >
                        <span className="text-xs">{item.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleChecklist(item.key as keyof Candidate["onboardingChecklist"])}
                          className="w-4 h-4 text-brand-teal rounded-md focus:ring-brand-teal"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "application" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="font-semibold text-slate-900 text-sm">Credential & License Verification</div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium">
                    <div>License Type: <strong>{candidate.credentialVerification.licenseType}</strong></div>
                    <div>License Number: <strong>{candidate.credentialVerification.licenseNumber}</strong></div>
                    <div>Status: <strong className="text-emerald-700">{candidate.credentialVerification.status}</strong></div>
                    <div>CPR/First Aid: <strong>{candidate.credentialVerification.cprCertified ? "Certified" : "Not Certified"}</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">Offer Letter e-Sign Status</div>
                    <div className="text-slate-500 text-[11px] font-medium">Status: {candidate.offerLetter.status}</div>
                  </div>
                  <button className="px-4 py-2 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal/90 shadow-brand-teal/20shadow-[0_4px_24px_rgba(0,0,0,0.04)] active:scale-95">
                    Send Offer e-Sign
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4">
                <form onSubmit={handleAddNote} className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 text-xs">Add Interviewer Note</span>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-slate-500 font-medium">Rating:</span>
                      <select
                        value={newNoteRating}
                        onChange={(e) => setNewNoteRating(Number(e.target.value))}
                        className="bg-white border border-slate-200/80 rounded-full px-3 py-1 font-medium outline-none shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Enter notes on clinical skills, availability, soft skills..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full p-3 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none text-xs bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  />
                  <div className="text-right">
                    <button type="submit" className="px-4 py-1.5 bg-brand-teal text-white font-semibold rounded-full shadow-brand-teal/20 shadow-[0_4px_24px_rgba(0,0,0,0.04)] active:scale-95">
                      Save Note
                    </button>
                  </div>
                </form>

                <div className="space-y-2.5">
                  {candidate.notes.map((note) => (
                    <div key={note.id} className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                      <div className="flex items-center justify-between font-semibold text-slate-800">
                        <span>{note.interviewerName} ({note.interviewerRole})</span>
                        <span className="text-slate-400 font-regular text-[11px]">{note.date}</span>
                      </div>
                      <p className="text-slate-600 font-regular">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Stage Controls */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
            <div className="text-slate-500 font-semibold text-xs">Advance Stage:</div>
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
              {(["Applied", "Phone Screen", "Interview Scheduled", "Background Check", "Offer", "Hired"] as CandidateStage[]).map((stg) => {
                const isCurrent = candidate.stage === stg;
                const isHiredBtn = stg === "Hired";
                return (
                  <button
                    key={stg}
                    onClick={() => handleStageChange(stg)}
                    disabled={isHiredBtn && isHireBlocked}
                    className={clsx(
                      "px-3 py-1.5 rounded-full font-semibold text-[11px] transition-all whitespace-nowrap",
                      isCurrent
                        ? "bg-slate-900 text-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                        : isHiredBtn && isHireBlocked
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                    )}
                  >
                    {stg}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Compliance Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 bg-slate-900/70 z-[60] flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200 text-xs">
            <h3 className="font-semibold text-red-700 text-base flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              Compliance Officer Override
            </h3>
            <p className="text-slate-600 font-medium">
              Provide justification for overriding the OIG/SAM exclusion flag. Override actions are recorded in the security audit log.
            </p>
            <textarea
              rows={3}
              required
              placeholder="e.g. Verified social security number and DOB with official state SAM registry; candidate confirmed not matching excluded individual."
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              className="w-full p-3 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyOverride}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.04)] shadow-red-200"
              >
                Apply Override
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CandidateDetailPanel;



