import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Phone, Mail, Calendar, FileText, CheckCircle2, ChevronRight, MessageSquarePlus, Stethoscope, Copy, ShieldCheck, AlertTriangle } from "lucide-react";
import clsx from "clsx";

import { Referral } from "./types";

interface ReferralDetailPanelProps {
  referral: Referral | null;
  onClose: () => void;
  onUpdate: (referral: Referral) => void;
}

export function ReferralDetailPanel({ referral, onClose, onUpdate }: ReferralDetailPanelProps) {
  if (!referral) return null;

  return (
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
          <div className="flex-shrink-0 px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-semibold text-slate-600">
                {referral.clientInitials}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{referral.clientName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-500">{referral.source} Referral</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sm font-medium text-brand-teal bg-teal-50 px-2 py-0.5 rounded-full">
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
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
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <Copy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="w-full">
                      <h4 className="font-semibold text-amber-900 text-sm">Possible Duplicate Detected</h4>
                      <p className="text-sm text-amber-700 mt-1 mb-3">Matched with {referral.duplicateMatches?.length} existing record(s).</p>
                      {referral.duplicateMatches?.map(match => (
                        <div key={match.id} className="bg-white border border-amber-100 rounded-lg p-3 flex justify-between items-center mb-2">
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

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
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
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-medium">
                    {referral.assignedCoordinator.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{referral.assignedCoordinator.name}</div>
                    <div className="text-xs text-slate-500">Assigned</div>
                  </div>
                </div>
              </div>
            </div>

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
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        "w-5 h-5 rounded flex items-center justify-center shrink-0",
                        doc.status === "Verified" ? "bg-emerald-100 text-emerald-600" :
                        doc.status === "Uploaded" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"
                      )}>
                        {doc.status === "Verified" ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                         doc.status === "Uploaded" ? <FileText className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{doc.status}</span>
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
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900">{comm.author}</span>
                          <span className="text-xs text-slate-400">{new Date(comm.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{comm.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200 flex gap-3">
            <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 rounded-xl transition-colors">
              Decline
            </button>
            <button className="flex-1 bg-brand-teal hover:bg-teal-600 text-white font-medium py-2.5 rounded-xl shadow-md transition-colors">
              Move to Next Stage
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
