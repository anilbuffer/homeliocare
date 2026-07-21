"use client";

import React, { useState } from "react";
import { mockEvvSubmissions } from "@/lib/mock-data/evv";
import { EVVSubmission } from "@/types/evv";
import { CheckCircle2, AlertCircle, Clock, Send, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";

export function EVVDashboard() {
  const [submissions] = useState<EVVSubmission[]>(mockEvvSubmissions);

  const stats = [
    { label: "Total Sent", value: submissions.length, icon: Send, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Accepted", value: submissions.filter(s => s.status === 'Accepted').length, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Rejected", value: submissions.filter(s => s.status === 'Rejected').length, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Pending", value: submissions.filter(s => s.status === 'Sent').length, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="flex items-center justify-between hover:border-brand-teal/30">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/50 flex items-center justify-between bg-white/50">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="p-2 bg-brand-teal/10 rounded-lg">
              <FileText className="w-4 h-4 text-brand-teal" />
            </div>
            Recent Submissions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Visit ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient / Caregiver</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aggregator (State)</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-900">{sub.visitId}</span>
                    <p className="text-xs text-slate-500">{sub.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{sub.patientName}</div>
                    <div className="text-sm text-slate-500">{sub.caregiverName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div>{sub.date}</div>
                    <div className="text-xs text-slate-500">{sub.beginTime} - {sub.endTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{sub.aggregator}</div>
                    <div className="text-xs text-slate-500">{sub.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      sub.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      sub.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {sub.status}
                    </span>
                    {sub.status === 'Rejected' && (
                      <p className="text-xs text-rose-600 mt-1 max-w-[200px] truncate" title={sub.rejectReason}>
                        {sub.rejectReason}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sub.status === 'Rejected' ? (
                      <Link 
                        href={`/billing/evv/maintenance?visitId=${sub.visitId}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:text-teal-700"
                      >
                        Fix Issue <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-400">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
