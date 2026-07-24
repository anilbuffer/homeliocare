"use client";

import React, { useState } from "react";
import { mockEvvSubmissions, mockStateConfigs } from "@/lib/mock-data/evv";
import { AlertCircle, Clock, Save, FileText, CheckCircle2, ChevronRight, CornerDownRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";

export function VisitCorrectionQueue() {
  const searchParams = useSearchParams();
  const initialVisitId = searchParams.get('visitId');

  const [rejectedSubmissions] = useState(mockEvvSubmissions.filter(s => s.status === 'Rejected'));
  const [selectedSubmission, setSelectedSubmission] = useState(
    rejectedSubmissions.find(s => s.visitId === initialVisitId) || rejectedSubmissions[0]
  );
  const [isResolving, setIsResolving] = useState(false);

  if (!selectedSubmission) {
    return (
      <Card className="p-12 text-center flex flex-col items-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900">All Caught Up!</h2>
        <p className="text-slate-500 mt-2">There are no rejected EVV submissions to review.</p>
      </Card>
    );
  }

  const stateConfig = mockStateConfigs.find(c => c.state === selectedSubmission.state);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* List / Queue Panel */}
      <Card noPadding className="lg:col-span-1 flex flex-col max-h-[700px]">
        <div className="px-5 py-4 border-b border-slate-100/50 bg-white/50 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            Action Required ({rejectedSubmissions.length})
          </h2>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1">
          {rejectedSubmissions.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubmission(sub)}
              className={`w-full text-left p-3 rounded-xl transition-all border flex items-start gap-3 ${selectedSubmission.id === sub.id
                ? "bg-rose-50 border-rose-200 shadow-sm"
                : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200"
                }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-semibold text-sm truncate ${selectedSubmission.id === sub.id ? 'text-rose-700' : 'text-slate-900'}`}>
                    {sub.patientName}
                  </span>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{sub.date}</span>
                </div>
                <div className="text-xs text-slate-500 truncate mb-1">Caregiver: {sub.caregiverName}</div>
                <div className={`text-xs truncate font-medium ${selectedSubmission.id === sub.id ? 'text-rose-600' : 'text-rose-500'}`}>
                  Error: {sub.rejectReason}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${selectedSubmission.id === sub.id ? 'text-rose-400 translate-x-1' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>
      </Card>

      {/* Form / Detail Panel */}
      <Card noPadding className="lg:col-span-2 flex flex-col h-full min-h-[500px]">
        <div className="px-6 py-5 border-b border-slate-100/50 flex justify-between items-start bg-white/50 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Rejected</span>
              <span className="text-sm font-medium text-slate-500">{selectedSubmission.aggregator} ({selectedSubmission.state})</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Visit {selectedSubmission.visitId}</h2>
          </div>
          <button
            onClick={() => setIsResolving(true)}
            className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-brand-teal/20 hover:-translate-y-0.5"
          >
            <CornerDownRight className="w-4 h-4" />
            Correct & Resubmit
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {/* Rejection Details */}
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-8">
            <h3 className="text-sm font-semibold text-rose-900 mb-1 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Error Description
            </h3>
            <p className="text-sm text-rose-700">{selectedSubmission.rejectReason}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <FileText className="w-4 h-4 text-slate-400" /> Visit Information
              </h3>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Patient</label>
                <div className="text-sm font-medium text-slate-900">{selectedSubmission.patientName}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Caregiver</label>
                <div className="text-sm font-medium text-slate-900">{selectedSubmission.caregiverName}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Service Type</label>
                <div className="text-sm font-medium text-slate-900">{selectedSubmission.serviceType}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Clock className="w-4 h-4 text-slate-400" /> Date & Time
              </h3>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Date of Service</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                  defaultValue={selectedSubmission.date}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Clock In</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                    defaultValue={selectedSubmission.beginTime.includes('AM') ? '08:00' : '09:00'} // Mocking standard time format
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Clock Out</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                    defaultValue={selectedSubmission.endTime.includes('PM') ? '12:00' : '13:00'} // Mocking standard time format
                  />
                </div>
              </div>
            </div>
          </div>

          {/* State Required Reason Code Section */}
          <div className="border border-brand-teal/20 bg-brand-teal/5 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-brand-teal mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> State Mandated Exception Resolution
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Reason Code <span className="text-rose-500">*</span>
                </label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-teal/50">
                  <option value="">Select a reason code required by {selectedSubmission.state}...</option>
                  {stateConfig?.reasonCodes.map(rc => (
                    <option key={rc.code} value={rc.code}>{rc.code} - {rc.description}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">This code will be sent to {selectedSubmission.aggregator} to justify the manual adjustment.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Resolution Notes <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                  placeholder="Provide additional details regarding this correction..."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-slate-100/50">
            <button className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
              Discard Changes
            </button>
            <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-brand-teal/20 hover:-translate-y-0.5">
              <Save className="w-4 h-4" />
              Save & Resubmit to Aggregator
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
