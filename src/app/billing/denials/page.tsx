"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { XCircle, RefreshCw } from "lucide-react";

export default function DenialsPage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Claims Denials Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Work rejected or denied claims to correct information and resubmit.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-4 shadow-sm border-slate-200">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="mt-1 bg-red-100 p-2 rounded-xl text-red-600">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Claim #CLM-98234</h3>
                <div className="text-sm text-slate-700 mt-1">
                  <strong>Patient:</strong> Arthur Pendelton <br/>
                  <strong>Payer:</strong> Medicare Part B <br/>
                  <strong>Date of Service:</strong> Oct 15, 2023
                </div>
                <div className="mt-3 bg-red-50 text-red-800 p-2.5 rounded-lg border border-red-100 text-sm font-medium">
                  <strong>Reason Code CO-16:</strong> Claim/service lacks information or has submission/billing error(s). Missing modifier.
                </div>
              </div>
            </div>
            <button className="bg-brand-teal text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors flex items-center gap-2 whitespace-nowrap">
              <RefreshCw className="w-4 h-4" /> Correct & Resubmit
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
