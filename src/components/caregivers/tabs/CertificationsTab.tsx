"use client";

import React, { useState } from "react";
import { Caregiver, CaregiverPolicyAck } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  FileSignature,
  Clock,
  Send,
  Check,
  FileCheck2
} from "lucide-react";
import { cn } from "@/components/ui/Card";

// Default policy acknowledgments fallback if caregiver record lacks pre-populated data
const defaultCaregiverPolicies: CaregiverPolicyAck[] = [
  {
    id: "pa-1",
    policyName: "Agency Code of Conduct",
    category: "Corporate Governance",
    version: "v3.2",
    status: "Signed",
    signedDate: "Jul 21, 2025",
  },
  {
    id: "pa-2",
    policyName: "HIPAA Privacy & Security Policy",
    category: "Regulatory Compliance",
    version: "v4.1",
    status: "Signed",
    signedDate: "Jul 21, 2025",
  },
  {
    id: "pa-3",
    policyName: "Emergency Response & Evacuation Plan",
    category: "Safety & Emergency",
    version: "v2.0",
    status: "Overdue",
    dueDate: "Jul 10, 2026",
  },
  {
    id: "pa-4",
    policyName: "Infection Prevention & PPE Protocol",
    category: "Clinical Protocols",
    version: "v3.0",
    status: "Signed",
    signedDate: "May 06, 2025",
  },
  {
    id: "pa-5",
    policyName: "Workplace Violence & Safety Policy",
    category: "Employee Safety",
    version: "v1.8",
    status: "Signed",
    signedDate: "Jun 03, 2025",
  },
];

export function CertificationsTab({ caregiver }: { caregiver: Caregiver }) {
  const policiesList = caregiver.policyAcknowledgments && caregiver.policyAcknowledgments.length > 0
    ? caregiver.policyAcknowledgments
    : defaultCaregiverPolicies;

  const signedCount = policiesList.filter((p) => p.status === "Signed").length;
  const overdueCount = policiesList.filter((p) => p.status === "Overdue").length;
  const pendingCount = policiesList.filter((p) => p.status === "Pending").length;

  const [remindedItems, setRemindedItems] = useState<Record<string, boolean>>({});

  const handleSendReminder = (policyId: string) => {
    setRemindedItems((prev) => ({ ...prev, [policyId]: true }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Certifications & Training Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Certifications & Credentials</h3>
          <p className="text-xs text-slate-500 mt-0.5">Active licenses, CPR cards, and clinical credentials.</p>
        </div>
        <button className="text-sm font-semibold text-brand-teal hover:text-emerald-700 flex items-center gap-1 transition-colors self-start sm:self-auto">
          <span>View Training Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {caregiver.certifications.map((cert) => (
          <Card
            key={cert.id}
            className="p-4 sm:p-5 flex flex-col h-full group hover:border-brand-teal/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  cert.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : cert.status === "Expiring Soon"
                    ? "bg-amber-50 text-amber-600 border-amber-200"
                    : "bg-rose-50 text-rose-600 border-rose-200"
                )}
              >
                <Award className="w-5 h-5" />
              </div>
              <Badge
                variant={
                  cert.status === "Active"
                    ? "success"
                    : cert.status === "Expiring Soon"
                    ? "warning"
                    : "error"
                }
              >
                {cert.status}
              </Badge>
            </div>

            <div className="mb-4 flex-1">
              <h4 className="font-bold text-slate-800 mb-1 group-hover:text-brand-teal transition-colors">{cert.name}</h4>
              <p className="text-xs sm:text-sm text-slate-500">{cert.issuer}</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-500">Issued</span>
                <span className="font-medium text-slate-700">{cert.issueDate}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-500">Expires</span>
                <span
                  className={cn(
                    "font-medium",
                    cert.status === "Expiring Soon"
                      ? "text-amber-600 font-bold"
                      : cert.status === "Expired"
                      ? "text-rose-600 font-bold"
                      : "text-slate-700"
                  )}
                >
                  {cert.expiryDate}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {caregiver.certifications.length === 0 && (
        <Card className="p-8 sm:p-12 text-center flex flex-col items-center justify-center border-dashed border-2">
          <Award className="w-12 h-12 text-slate-300 mb-3" />
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No certifications on file yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            This caregiver hasn't uploaded or completed any trackable certifications yet.
          </p>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* REVERSE LOOKUP: Policy & Regulatory Acknowledgment Checklist */}
      {/* ========================================================================= */}
      <Card className="overflow-hidden border border-slate-200 shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/80 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-teal/10 text-brand-teal border border-brand-teal/20 shrink-0">
              <FileSignature className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                Policy & Regulatory Acknowledgments
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Staff compliance checklist for required agency policies and codes of conduct.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start md:self-center">
            {overdueCount > 0 && (
              <Badge variant="error" className="animate-pulse">
                {overdueCount} Overdue
              </Badge>
            )}
            {pendingCount > 0 && (
              <Badge variant="warning">
                {pendingCount} Pending
              </Badge>
            )}
            <Badge variant="success">
              {signedCount} / {policiesList.length} Signed
            </Badge>
          </div>
        </div>

        {/* Policy Checklist Rows */}
        <div className="divide-y divide-slate-100">
          {policiesList.map((item) => {
            const isReminded = remindedItems[item.id];

            return (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  {/* Checklist Status Icon */}
                  {item.status === "Signed" ? (
                    <div className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0 mt-0.5 sm:mt-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  ) : item.status === "Overdue" ? (
                    <div className="p-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 shrink-0 mt-0.5 sm:mt-0">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 shrink-0 mt-0.5 sm:mt-0">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                  )}

                  {/* Policy Title & Metadata */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm sm:text-base">{item.policyName}</span>
                      {item.version && (
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                          {item.version}
                        </span>
                      )}
                      {item.category && (
                        <span className="text-[10px] font-medium bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100 shrink-0">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Simple Checklist Format: "Agency Code of Conduct ✓ Jul 21" */}
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                      {item.status === "Signed" ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Signed on {item.signedDate || "Jul 21, 2025"}
                        </span>
                      ) : item.status === "Overdue" ? (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Overdue (Required by {item.dueDate || "Jul 10, 2026"})
                        </span>
                      ) : (
                        <span className="text-amber-600 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Pending Signature (Due by {item.dueDate || "Jul 30, 2026"})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-start md:self-center shrink-0 w-full sm:w-auto">
                  {item.status === "Signed" ? (
                    <button className="w-full sm:w-auto text-xs text-slate-700 hover:text-brand-teal font-semibold border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 min-h-[38px] active:scale-95 touch-manipulation">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>View Signed Copy</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSendReminder(item.id)}
                      disabled={isReminded}
                      className={`w-full sm:w-auto text-xs font-semibold px-3.5 py-2 rounded-xl border transition-colors flex items-center justify-center gap-1.5 min-h-[38px] active:scale-95 touch-manipulation ${
                        isReminded
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : "bg-brand-teal text-white border-brand-teal hover:bg-brand-teal/90 shadow-sm"
                      }`}
                    >
                      {isReminded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-slate-400" />
                          <span>Reminder Sent</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Signature Reminder</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Required Training List */}
      <Card className="mt-6 overflow-hidden border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-sm sm:text-base">Required Training Modules</h4>
          <Badge variant="brand">2 Pending</Badge>
        </div>
        <div className="divide-y divide-slate-200">
          <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <div className="font-semibold text-slate-800 text-sm">HIPAA Compliance 2026</div>
                <div className="text-xs text-slate-500">Completed on Jan 15, 2026</div>
              </div>
            </div>
            <button className="text-xs sm:text-sm text-brand-teal font-semibold hover:underline self-end sm:self-center">
              View Certificate
            </button>
          </div>
          <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <div className="font-semibold text-slate-800 text-sm">Infection Control & PPE</div>
                <div className="text-xs text-slate-500">Completed on Feb 02, 2026</div>
              </div>
            </div>
            <button className="text-xs sm:text-sm text-brand-teal font-semibold hover:underline self-end sm:self-center">
              View Certificate
            </button>
          </div>
          <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <div className="font-semibold text-slate-800 text-sm">Advanced Dementia Care</div>
                <div className="text-xs text-amber-600 font-medium">Due by Jul 30, 2026</div>
              </div>
            </div>
            <button className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-100 self-end sm:self-center">
              Send Reminder
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
