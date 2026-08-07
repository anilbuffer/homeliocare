import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Phone, Mail, Calendar, FileText, CheckCircle2, ChevronRight, MessageSquarePlus, Stethoscope, Copy, ShieldCheck, AlertTriangle, ExternalLink, CalendarCheck, Clock, User, Sparkles, Play, Volume2 } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { ReferredOutModal } from "../intake/ReferredOutModal";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";

import { Referral, ReferralStage } from "./types";

interface ReferralDetailPanelProps {
  referral: Referral | null;
  onClose: () => void;
  onUpdate: (referral: Referral) => void;
}

const STAGES: ReferralStage[] = [
  "Referral Received",
  "Contact Attempted",
  "Clinical Review",
  "Insurance Verification",
  "Insurance Verification / Authorization",
  "Eligibility Confirmed",
  "Assigned to Care Team",
  "Consent & Agreements",
  "Admitted",
  "Converted"
];

export function ReferralDetailPanel({ referral, onClose, onUpdate }: ReferralDetailPanelProps) {
  const { currentUser } = useAuth();
  const [isReferredOutModalOpen, setIsReferredOutModalOpen] = React.useState(false);
  const [isBookAssessmentModalOpen, setIsBookAssessmentModalOpen] = React.useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = React.useState(false);
  const [isBooking, setIsBooking] = React.useState(false);
  const [isFollowingUp, setIsFollowingUp] = React.useState(false);
  const isIntakeCoordinator = currentUser?.role === "INTAKE_COORDINATOR";

  if (!referral) return null;

  const latestAICall = referral.communications.find(c => c.summary && c.recordingUrl);

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%", boxShadow: "-20px 0 40px rgba(0,0,0,0)" }}
            animate={{ x: 0, boxShadow: "-20px 0 40px rgba(0,0,0,0.1)" }}
            exit={{ x: "100%", boxShadow: "-20px 0 40px rgba(0,0,0,0)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl h-full bg-slate-50 flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-semibold text-slate-600">
                  {referral.clientInitials}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{referral.clientName}</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium text-slate-700">{referral.workflowType || 'Referral'}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">{referral.source}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-medium text-brand-teal bg-teal-50 px-2 py-0.5 rounded-full">
                      {referral.stage}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {/* AI Call Summary (Top Placement) */}
              {latestAICall && (
                <div className="bg-purple-50 border border-purple-200/60 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
                    <Sparkles className="w-16 h-16 text-purple-600" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        AI Call Summary
                      </h3>
                      <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full border border-purple-100">
                        <button className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors shrink-0">
                          <Play className="w-3 h-3 ml-0.5" />
                        </button>
                        <div className="w-20 h-1 bg-purple-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-600 w-1/3 rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-bold text-purple-800">03:45</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs text-purple-900 font-medium">
                      {latestAICall.summary?.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Alerts Section */}
              {(referral.nextAction?.isOverdue || referral.isPossibleDuplicate) && (
                <div className="space-y-3">
                  {referral.nextAction?.isOverdue && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900 text-sm">Overdue Action</h4>
                        <p className="text-sm text-red-700 mt-1">{referral.nextAction.description} was due {new Date(referral.nextAction.dueDate).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  )}

                  {referral.isPossibleDuplicate && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                      <Copy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="w-full">
                        <h4 className="font-semibold text-amber-900 text-sm">Possible Duplicate Detected</h4>
                        <p className="text-sm text-amber-700 mt-1 mb-2">Matched with {referral.duplicateMatches?.length} existing record(s).</p>
                        {referral.duplicateMatches?.map(match => (
                          <div key={match.id} className="bg-white border border-amber-200/60 rounded-xl px-3 py-2 flex justify-between items-center mb-2">
                            <div>
                              <div className="font-medium text-slate-800 text-sm">{match.name}</div>
                              <div className="text-xs text-slate-500">DOB: {match.dob}</div>
                            </div>
                            <div className="flex gap-2">
                              <button className="text-xs font-medium text-amber-700 hover:text-amber-800 bg-amber-100 px-3 py-1.5 rounded-md">Merge</button>
                              <button className="text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-md">Dismiss</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Intake Notes */}
              {referral.intakeNotes && (
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <h3 className="text-sm font-semibold text-teal-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Intake Notes
                  </h3>
                  <p className="text-xs text-teal-900 leading-relaxed">
                    {referral.intakeNotes}
                  </p>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Referral Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="block text-xs text-slate-500">Received</span>
                      <span className="block text-sm font-medium text-slate-900">{new Date(referral.dateReceived).toLocaleDateString()}</span>
                    </div>
                    {referral.referringParty && (
                      <div>
                        <span className="block text-xs text-slate-500">Referring Party</span>
                        <span className="block text-sm font-medium text-slate-900">{referral.referringParty}</span>
                      </div>
                    )}
                    {referral.sourceDetails && (
                      <div>
                        <span className="block text-xs text-slate-500">Source Details</span>
                        <span className="block text-sm font-medium text-slate-900">{referral.sourceDetails}</span>
                      </div>
                    )}
                    {referral.dischargeDeadline && (
                      <div>
                        <span className="block text-xs text-slate-500">Discharge Deadline</span>
                        <span className="block text-sm font-medium text-red-600">{new Date(referral.dischargeDeadline).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Coordinator</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex items-center justify-center text-slate-600 font-medium">
                      {referral.assignedCoordinator.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{referral.assignedCoordinator.name}</div>
                      <div className="text-xs text-slate-500">Assigned</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demographics & Contact */}
              {referral.demographics && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-teal" />
                      Patient Demographics & Contact
                    </h3>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50">
                    {referral.dob && (
                      <div>
                        <div className="text-xs text-slate-500">Date of Birth</div>
                        <div className="text-sm font-medium text-slate-900">{referral.dob}</div>
                      </div>
                    )}
                    {referral.demographics.gender && (
                      <div>
                        <div className="text-xs text-slate-500">Gender</div>
                        <div className="text-sm font-medium text-slate-900">{referral.demographics.gender}</div>
                      </div>
                    )}
                    {referral.phone && (
                      <div>
                        <div className="text-xs text-slate-500">Phone</div>
                        <div className="text-sm font-medium text-slate-900">{referral.phone}</div>
                      </div>
                    )}
                    {referral.demographics.email && (
                      <div>
                        <div className="text-xs text-slate-500">Email</div>
                        <div className="text-sm font-medium text-slate-900">{referral.demographics.email}</div>
                      </div>
                    )}
                    {(referral.demographics.address || referral.demographics.city || referral.demographics.state || referral.demographics.zip) && (
                      <div className="sm:col-span-2">
                        <div className="text-xs text-slate-500">Address</div>
                        <div className="text-sm font-medium text-slate-900">
                          {referral.demographics.address}
                          {referral.demographics.city && `, ${referral.demographics.city}`}
                          {referral.demographics.state && ` ${referral.demographics.state}`}
                          {referral.demographics.zip && ` ${referral.demographics.zip}`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Insurance & Zone */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-teal" />
                    Eligibility & Insurance
                  </h3>
                </div>
                <div className="p-4 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-slate-500">Service Zone Check</div>
                      <div className="text-sm font-medium text-slate-900 mt-1 flex items-center gap-2">
                        {referral.serviceZoneStatus === "in-zone" ? (
                          <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> In Zone ({referral.serviceZoneName})</>
                        ) : (
                          <><AlertTriangle className="w-4 h-4 text-amber-500" /> Warning</>
                        )}
                      </div>
                    </div>
                  </div>
                  {referral.insurance && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                      <div>
                        <div className="text-xs text-slate-500">Payer</div>
                        <div className="text-sm font-medium text-slate-900">{referral.insurance.payer}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Status</div>
                        <div className="text-sm font-medium text-slate-900">
                          <span className={clsx(
                            "px-2 py-1 rounded-md text-xs",
                            referral.insurance.status === "Verified" ? "bg-emerald-100 text-emerald-700" :
                              referral.insurance.status === "Pending" ? "bg-amber-100 text-amber-700" :
                                "bg-red-100 text-red-700"
                          )}>
                            {referral.insurance.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-teal" />
                    Documents & Consents
                  </h3>
                </div>
                <div className="p-2">
                  {[...referral.documents, ...referral.consents.map(c => ({ name: c.name, status: c.signed ? "Verified" : "Missing" }))].map((doc, i) => (
                    <div key={i} className="flex flex-col p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div className={clsx(
                            "w-5 h-5 rounded flex items-center justify-center shrink-0",
                            doc.status === "Verified" ? "bg-emerald-100 text-emerald-600" :
                              doc.status === "Uploaded" ? "bg-blue-100 text-blue-600" : "bg-rose-100 text-rose-600"
                          )}>
                            {doc.status === "Verified" ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                              doc.status === "Uploaded" ? <FileText className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                        </div>
                        <span className={clsx("text-xs font-bold uppercase", doc.status === "Missing" ? "text-rose-600" : "text-slate-500")}>
                          {doc.status}
                        </span>
                      </div>

                      {doc.status === "Missing" && (
                        <div className="flex flex-wrap gap-2 mt-2 ml-8">
                          <button className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 px-3 py-1.5 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">eFax Hospital</button>
                          <button className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 px-3 py-1.5 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">Send SMS Link to Family</button>
                          <button className="text-[10px] font-semibold text-brand-teal bg-teal-50 border border-teal-100 hover:bg-teal-100 hover:border-teal-200 px-3 py-1.5 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">Upload File</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comm Log Placeholder */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <MessageSquarePlus className="w-4 h-4 text-brand-teal" />
                    Communication Log
                  </h3>
                  <button className="text-xs font-medium text-brand-teal hover:text-teal-700">Add Note</button>
                </div>
                <div className="p-4 space-y-4">
                  {referral.communications.length === 0 ? (
                    <div className="text-center text-sm text-slate-500 py-4">No communications logged yet.</div>
                  ) : (
                    referral.communications.map(comm => (
                      <div key={comm.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 mt-1">
                          {comm.type === "call" ? <Phone className="w-4 h-4" /> :
                            comm.type === "email" ? <Mail className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-900">{comm.author}</span>
                            <span className="text-xs text-slate-400">{new Date(comm.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{comm.content}</p>

                          {/* Recording Player (Mock) */}
                          {comm.recordingUrl && (
                            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center gap-3">
                              <button className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center hover:bg-teal-600 transition-colors shrink-0">
                                <Play className="w-4 h-4 ml-0.5" />
                              </button>
                              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-teal w-1/3 rounded-full"></div>
                              </div>
                              <span className="text-xs font-medium text-slate-500 shrink-0">03:45</span>
                              <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
                            </div>
                          )}

                          {/* AI Summary */}
                          {comm.summary && (
                            <div className="mt-3 bg-purple-50 border border-purple-200/60 rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                                <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">AI Call Summary</span>
                              </div>
                              <p className="text-xs text-purple-800 leading-relaxed">{comm.summary}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] relative z-20">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onUpdate({ ...referral, stage: "Converted" });
                    onClose();
                  }}
                  className="flex-1 bg-brand-teal hover:bg-teal-600 text-white text-[13px] font-bold py-3 px-4 rounded-xl shadow-[0_4px_12px_rgba(14,163,131,0.2)] hover:shadow-[0_6px_16px_rgba(14,163,131,0.3)] hover:-translate-y-0.5 transition-all text-center"
                >
                  Convert to Active Admission
                </button>
                <button
                  onClick={() => setIsBookAssessmentModalOpen(true)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-bold py-3 px-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all text-center"
                >
                  Fast-Track Assessment
                </button>
                <button
                  onClick={() => setIsReferredOutModalOpen(true)}
                  className="flex-1 bg-white border-2 border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 text-[13px] font-bold py-3 px-4 rounded-xl transition-all text-center"
                >
                  Mark Unqualified / Decline
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <ReferredOutModal
        isOpen={isReferredOutModalOpen}
        onClose={() => setIsReferredOutModalOpen(false)}
        onConfirm={(reason, agency) => {
          console.log("Referred out", { reason, agency });
          onUpdate({ ...referral, stage: "Converted" });
          onClose();
        }}
        clientName={referral?.clientName}
      />

      <Modal
        isOpen={isBookAssessmentModalOpen}
        onClose={() => !isBooking && setIsBookAssessmentModalOpen(false)}
        title="Schedule Assessment"
        description={`Schedule an initial assessment for ${referral?.clientName}. This will add them to the daily schedule queue.`}
        maxWidth="md"
        footer={
          <>
            <button
              onClick={() => setIsBookAssessmentModalOpen(false)}
              disabled={isBooking}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsBooking(true);
                setTimeout(() => {
                  setIsBooking(false);
                  setIsBookAssessmentModalOpen(false);
                  toast.success("Assessment booked! Added to today's schedule queue.");
                  onUpdate({ ...referral, stage: "Initial Assessment Scheduled" });
                  onClose();
                }, 1000);
              }}
              disabled={isBooking}
              className="px-4 py-2 text-sm font-medium bg-brand-teal text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isBooking ? "Booking..." : "Confirm Schedule"}
            </button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input type="date" disabled={isBooking} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
            <input type="time" disabled={isBooking} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assign Clinician</label>
            <select disabled={isBooking} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white disabled:opacity-50">
              <option value="">Select assessor...</option>
              <option value="sarah">Sarah Jenkins, RN</option>
              <option value="maria">Maria Santos, CC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location Details</label>
            <textarea disabled={isBooking} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50" rows={2} defaultValue={referral?.demographics?.address || ""}></textarea>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isFollowUpModalOpen}
        onClose={() => !isFollowingUp && setIsFollowUpModalOpen(false)}
        title="Schedule Follow-Up"
        description={`Set a follow-up reminder for ${referral?.clientName}. This will add the task to your follow-up queue.`}
        maxWidth="md"
        footer={
          <>
            <button
              onClick={() => setIsFollowUpModalOpen(false)}
              disabled={isFollowingUp}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsFollowingUp(true);
                setTimeout(() => {
                  setIsFollowingUp(false);
                  setIsFollowUpModalOpen(false);
                  toast.success("Follow-up scheduled successfully!");
                  onUpdate({
                    ...referral,
                    nextAction: {
                      description: "Scheduled Follow Up",
                      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                      isOverdue: false
                    }
                  });
                  onClose();
                }, 800);
              }}
              disabled={isFollowingUp}
              className="px-4 py-2 text-sm font-medium bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm"
            >
              {isFollowingUp ? "Saving..." : "Set Follow-Up"}
            </button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input type="date" disabled={isFollowingUp} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
              <input type="time" disabled={isFollowingUp} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Follow-Up</label>
            <select disabled={isFollowingUp} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white disabled:opacity-50 appearance-none">
              <option value="">Select a reason...</option>
              <option value="docs">Missing Documentation (Orders, Consent)</option>
              <option value="insurance">Insurance Authorization Pending</option>
              <option value="unreachable">Client / Family Unreachable</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
            <textarea disabled={isFollowingUp} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal disabled:opacity-50" rows={3} placeholder="Provide any specifics needed for the follow-up..."></textarea>
          </div>
        </div>
      </Modal>
    </>
  );
}
