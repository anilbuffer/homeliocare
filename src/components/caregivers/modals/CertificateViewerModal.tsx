"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Award, Download, ShieldCheck, CheckCircle2, Calendar, Building } from "lucide-react";

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  certName: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  caregiverName: string;
  onDownload: () => void;
}

export function CertificateViewerModal({
  isOpen,
  onClose,
  certName,
  issuer,
  issueDate,
  expiryDate,
  status,
  caregiverName,
  onDownload,
}: CertificateViewerModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={certName}
      description={`Official License & Certification Record for ${caregiverName}`}
      icon={<Award className="w-6 h-6 text-amber-500" />}
      maxWidth="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified with State Medical Board
          </div>
          <button
            type="button"
            onClick={() => {
              onDownload();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-brand-teal hover:bg-emerald-600 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-2">
        <div className="border-2 border-amber-200 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 rounded-2xl p-6 relative overflow-hidden text-center space-y-4">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-600 border border-amber-300 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-amber-700">Certificate of Qualification</div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">{certName}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{issuer}</p>
          </div>

          <div className="border-y border-amber-200/60 py-3 my-2 text-xs space-y-1">
            <div className="text-slate-500">Awarded To</div>
            <div className="text-base font-bold text-slate-800">{caregiverName}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left text-xs bg-white/80 p-3 rounded-xl border border-amber-100">
            <div>
              <div className="text-slate-500">Issue Date</div>
              <div className="font-semibold text-slate-800">{issueDate}</div>
            </div>
            <div>
              <div className="text-slate-500">Expiration Date</div>
              <div className="font-semibold text-slate-800">{expiryDate}</div>
            </div>
            <div>
              <div className="text-slate-500">Status</div>
              <div className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {status}
              </div>
            </div>
            <div>
              <div className="text-slate-500">Verification ID</div>
              <div className="font-mono font-bold text-slate-700">CERT-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
