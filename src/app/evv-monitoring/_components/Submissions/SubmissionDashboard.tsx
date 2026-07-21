import React from "react";
import { CheckCircle2, AlertCircle, Clock, Server, ArrowUpRight, Search, FileText } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

const mockSubmissions = [
  { id: "SUB-8921", state: "NY", aggregator: "HHAeXchange", date: "Today, 10:15 AM", status: "Accepted", count: 142 },
  { id: "SUB-8920", state: "OH", aggregator: "Sandata", date: "Today, 09:30 AM", status: "Partial Rejection", count: 85, rejected: 3 },
  { id: "SUB-8919", state: "NY", aggregator: "HHAeXchange", date: "Yesterday, 06:00 PM", status: "Accepted", count: 120 },
  { id: "SUB-8918", state: "OH", aggregator: "Sandata", date: "Yesterday, 05:45 PM", status: "Accepted", count: 76 },
];

export function SubmissionDashboard() {
  return (
    <div className="space-y-4">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Accepted Rate</p>
            <p className="text-2xl font-bold text-slate-900">98.2%</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Rejected Visits</p>
            <p className="text-2xl font-bold text-slate-900">3</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Submissions</p>
            <p className="text-2xl font-bold text-slate-900">423</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-brand-teal to-teal-700 rounded-2xl p-4 border border-teal-600 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center justify-between text-white">
          <div>
            <p className="text-xs font-medium text-teal-100 uppercase tracking-wider">Pending Batch</p>
            <p className="text-2xl font-bold">14 Visits</p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
            Submit Now
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Recent Aggregator Submissions</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search batch ID..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Batch ID</th>
                <th className="p-4">Aggregator</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Visits Included</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockSubmissions.map((sub, idx) => (
                <motion.tr 
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-medium text-slate-900">{sub.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {sub.state}
                      </div>
                      <span className="font-medium text-slate-700">{sub.aggregator}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {sub.date}
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 font-medium">
                    {sub.count} visits
                  </td>
                  <td className="p-4">
                    {sub.status === "Accepted" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Accepted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Partial Rejection ({sub.rejected})
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-brand-teal hover:text-teal-700 font-semibold text-sm flex items-center gap-1.5 ml-auto">
                      <FileText className="w-4 h-4" />
                      View JSON
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
