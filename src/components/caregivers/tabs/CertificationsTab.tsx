"use client";

import React from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Award, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/components/ui/Card";

export function CertificationsTab({ caregiver }: { caregiver: Caregiver }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Certifications & Training</h3>
        <button className="text-sm font-medium text-brand-teal hover:text-emerald-700 flex items-center gap-1 transition-colors">
          View Training Center <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {caregiver.certifications.map((cert) => (
          <Card key={cert.id} className="p-5 flex flex-col h-full group hover:border-brand-teal/30 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                cert.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                  cert.status === "Expiring Soon" ? "bg-amber-50 text-amber-600" :
                    "bg-rose-50 text-rose-600"
              )}>
                <Award className="w-5 h-5" />
              </div>
              <Badge variant={
                cert.status === "Active" ? "success" :
                  cert.status === "Expiring Soon" ? "warning" : "error"
              }>
                {cert.status}
              </Badge>
            </div>

            <div className="mb-4 flex-1">
              <h4 className="font-bold text-slate-800 mb-1">{cert.name}</h4>
              <p className="text-sm text-slate-500">{cert.issuer}</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Issued</span>
                <span className="font-medium text-slate-700">{cert.issueDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Expires</span>
                <span className={cn(
                  "font-medium",
                  cert.status === "Expiring Soon" ? "text-amber-600" :
                    cert.status === "Expired" ? "text-rose-600" : "text-slate-700"
                )}>{cert.expiryDate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {caregiver.certifications.length === 0 && (
        <Card className="p-12 text-center flex flex-col items-center justify-center border-dashed border-2">
          <Award className="w-12 h-12 text-slate-300 mb-3" />
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No certifications on file yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">This caregiver hasn't uploaded or completed any trackable certifications yet.</p>
        </Card>
      )}

      {/* Required Training List */}
      <Card className="mt-8 overflow-hidden border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 pb-3 flex items-center justify-between">
          <h4 className="font-semibold text-slate-800">Required Training Modules</h4>
          <Badge variant="brand">2 Pending</Badge>
        </div>
        <div className="divide-y divide-slate-200">
          <div className="py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <div>
                <div className="font-medium text-slate-800">HIPAA Compliance 2026</div>
                <div className="text-xs text-slate-500">Completed on Jan 15, 2026</div>
              </div>
            </div>
            <button className="text-sm text-brand-teal font-medium">View Certificate</button>
          </div>
          <div className="py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <div>
                <div className="font-medium text-slate-800">Infection Control & PPE</div>
                <div className="text-xs text-slate-500">Completed on Feb 02, 2026</div>
              </div>
            </div>
            <button className="text-sm text-brand-teal font-medium">View Certificate</button>
          </div>
          <div className="py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <div>
                <div className="font-medium text-slate-800">Advanced Dementia Care</div>
                <div className="text-xs text-amber-600">Due by Jul 30, 2026</div>
              </div>
            </div>
            <button className="text-sm text-slate-600 font-medium border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100">Send Reminder</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
