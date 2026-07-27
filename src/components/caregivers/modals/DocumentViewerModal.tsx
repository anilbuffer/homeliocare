"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { FileText, Download, Printer, ShieldCheck, CheckCircle2, Calendar, FileSignature } from "lucide-react";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  category?: string;
  signedDate?: string;
  caregiverName: string;
  onDownload: () => void;
}

export function DocumentViewerModal({
  isOpen,
  onClose,
  documentTitle,
  category = "Policy & Compliance",
  signedDate = "Jul 21, 2025",
  caregiverName,
  onDownload,
}: DocumentViewerModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={documentTitle}
      description={`Official Record • Verified digital document copy for ${caregiverName}`}
      icon={<FileSignature className="w-6 h-6 text-brand-teal" />}
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Signature Audit Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              type="button"
              onClick={() => {
                onDownload();
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-teal hover:bg-emerald-600 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 py-2">
        {/* Document Header details */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-3 text-xs">
          <div>
            <div className="text-slate-500 font-medium">Document ID</div>
            <div className="text-slate-800 font-bold font-mono">DOC-2026-88931</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Category</div>
            <div className="text-slate-800 font-semibold">{category}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Signed Date</div>
            <div className="text-slate-800 font-semibold">{signedDate}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Signatory</div>
            <div className="text-slate-800 font-semibold">{caregiverName}</div>
          </div>
        </div>

        {/* PDF Simulated Sheet Preview */}
        <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-inner min-h-[300px] flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{documentTitle}</h2>
              <p className="text-xs text-slate-500 mt-1">HomelioCare Home Health Agency • HR Compliance Office</p>
            </div>
            <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              EXECUTED
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-serif">
            <p>
              This document confirms that <strong>{caregiverName}</strong> has thoroughly reviewed, acknowledged, and agreed to adhere to all standards, regulations, and operational policies outlined in the <strong>{documentTitle}</strong>.
            </p>
            <p>
              By providing an electronic signature, the employee affirms compliance with state regulations, HIPAA data protection guidelines, clinical protocols, and agency standards of patient care.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 font-sans text-[11px]">
              <div><strong>IP Address:</strong> 192.168.1.104 (Authenticated SSO Session)</div>
              <div><strong>Timestamp:</strong> {signedDate} 14:32:08 EST</div>
              <div><strong>Cryptographic Hash:</strong> SHA256: 8f9a2b1c4e5f...</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-end font-sans">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Electronic Signature</div>
              <div className="text-base font-bold text-slate-800 italic font-serif">{caregiverName}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Agency Verification Code</div>
              <div className="text-xs font-mono font-bold text-slate-600">HLC-CERT-9921</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
