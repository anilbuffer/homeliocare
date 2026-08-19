"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

export default function EVVExceptionsPage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">EVV Exceptions & Alerts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time field monitoring for late clock-ins, missed shifts, or GPS out-of-bounds.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Exception 1 */}
        <Card className="p-4 shadow-sm border-rose-200 bg-rose-50/30">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="mt-1 bg-rose-100 p-2 rounded-xl text-rose-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Late Clock-In (15+ mins)</h3>
                <div className="text-sm text-slate-700 mt-1">
                  <strong>Caregiver:</strong> Maria Alvarez <br/>
                  <strong>Client:</strong> Dorothy Vance
                </div>
                <div className="text-xs text-rose-600 font-semibold mt-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Shift started at 08:30 AM. Currently 08:47 AM.
                </div>
              </div>
            </div>
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              Contact Caregiver
            </button>
          </div>
        </Card>

        {/* Exception 2 */}
        <Card className="p-4 shadow-sm border-amber-200 bg-amber-50/30">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="mt-1 bg-amber-100 p-2 rounded-xl text-amber-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">GPS Out of Bounds</h3>
                <div className="text-sm text-slate-700 mt-1">
                  <strong>Caregiver:</strong> Robert Chen <br/>
                  <strong>Client:</strong> Frank Delaney
                </div>
                <div className="text-xs text-amber-600 font-semibold mt-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Clocked out 1.2 miles away from client home.
                </div>
              </div>
            </div>
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              Review Exception
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
