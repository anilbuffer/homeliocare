"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { AlertCircle, Calendar } from "lucide-react";

export default function AuthorizationAlertsPage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Authorization Expiry Alerts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Proactive alerts for expiring patient authorizations requiring clinical recertification.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-4 shadow-sm border-amber-200 bg-amber-50/50">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="mt-1 bg-amber-100 p-2 rounded-xl text-amber-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Dorothy Vance</h3>
                <div className="text-sm text-slate-700 mt-1">
                  <strong>Payer:</strong> Medicaid MLTC <br/>
                  <strong>Auth #:</strong> AUTH-88192 <br/>
                </div>
                <div className="mt-2 text-amber-700 font-semibold text-sm flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Expires in 14 days (Nov 7, 2023)
                </div>
              </div>
            </div>
            <button className="bg-brand-teal text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors">
              Request Recertification from Clinical
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
