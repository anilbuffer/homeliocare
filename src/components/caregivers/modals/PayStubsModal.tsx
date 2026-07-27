"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { DollarSign, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface PayStubsModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  onDownloadPayStub: (period: string) => void;
}

const mockPayStubs = [
  { period: "Jul 01 - Jul 15, 2026", date: "Jul 20, 2026", gross: "$1,450.00", net: "$1,180.20", hours: "32.5 hrs", status: "Processing" },
  { period: "Jun 16 - Jun 30, 2026", date: "Jul 05, 2026", gross: "$1,320.50", net: "$1,075.00", hours: "30.0 hrs", status: "Paid" },
  { period: "Jun 01 - Jun 15, 2026", date: "Jun 20, 2026", gross: "$1,480.00", net: "$1,205.40", hours: "33.0 hrs", status: "Paid" },
  { period: "May 16 - May 31, 2026", date: "Jun 05, 2026", gross: "$1,520.00", net: "$1,238.10", hours: "34.5 hrs", status: "Paid" },
  { period: "May 01 - May 15, 2026", date: "May 20, 2026", gross: "$1,400.00", net: "$1,140.00", hours: "31.0 hrs", status: "Paid" },
];

export function PayStubsModal({ isOpen, onClose, caregiverName, onDownloadPayStub }: PayStubsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Historical Pay Stubs"
      description={`Payroll statements and YTD summary for ${caregiverName}`}
      icon={<DollarSign className="w-6 h-6 text-brand-teal" />}
      maxWidth="2xl"
      footer={
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          Close Pay Statements
        </button>
      }
    >
      <div className="space-y-4 py-2">
        <div className="grid grid-cols-3 gap-3 bg-slate-900 text-white p-4 rounded-2xl">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">YTD Gross Earnings</div>
            <div className="text-lg font-bold text-white">$18,450.00</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">YTD Total Hours</div>
            <div className="text-lg font-bold text-white">412 hrs</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Tax Withholdings</div>
            <div className="text-lg font-bold text-emerald-400">$3,420.00</div>
          </div>
        </div>

        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
          {mockPayStubs.map((stub, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl hover:border-brand-teal/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs sm:text-sm">{stub.period}</div>
                  <div className="text-[11px] text-slate-500">{stub.hours} • Paid {stub.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-slate-800 text-xs sm:text-sm">{stub.gross} Gross</div>
                  <Badge variant={stub.status === "Paid" ? "success" : "warning"} className="text-[10px]">
                    Net: {stub.net}
                  </Badge>
                </div>

                <button
                  type="button"
                  onClick={() => onDownloadPayStub(stub.period)}
                  className="p-2 text-slate-500 hover:text-brand-teal hover:bg-teal-50 rounded-xl transition-colors border border-slate-200"
                  title="Download Pay Stub PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
