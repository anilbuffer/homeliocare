"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { ShieldAlert, CheckCircle2, RefreshCw, ExternalLink, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ScreeningDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  onResolveFlag: () => void;
}

export function ScreeningDetailsModal({
  isOpen,
  onClose,
  caregiverName,
  onResolveFlag,
}: ScreeningDetailsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Background & Screening Audit Details"
      description={`Official registry & exclusion check report for ${caregiverName}`}
      icon={<ShieldAlert className="w-6 h-6 text-amber-500" />}
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Close Report
          </button>
          <button
            type="button"
            onClick={() => {
              onResolveFlag();
              onClose();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-brand-teal hover:bg-emerald-600 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Clear Registry Flag & Mark Verified
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-2">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Flag Notice: State Nurse Aide Registry Sync
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            State registry match notice requiring HR review: License verification returned a pending renewal notice for active CNA license #CNA-99214-GA.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-800">Checkr Criminal Background Check</div>
              <div className="text-slate-500 mt-0.5">7-Year Nationwide Search • Cleared Jul 15, 2026</div>
            </div>
            <Badge variant="success">Pass / Clear</Badge>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-800">OIG / SAM Federal Exclusion Database</div>
              <div className="text-slate-500 mt-0.5">Monthly Automated Medicaid Exclusion Audit</div>
            </div>
            <Badge variant="success">No Match Found</Badge>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-800">Sex Offender Registry Search</div>
              <div className="text-slate-500 mt-0.5">NSOPW Federal Database</div>
            </div>
            <Badge variant="success">Pass / Clear</Badge>
          </div>
        </div>
      </div>
    </Modal>
  );
}
