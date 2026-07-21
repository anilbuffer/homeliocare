import React, { useState, useMemo } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingVisits, setPendingVisits] = useState(14);
  const [selectedJsonSub, setSelectedJsonSub] = useState<string | null>(null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPendingVisits(0);
      showToast("Successfully submitted 14 pending visits to aggregators.");
    }, 1500);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  
  const filteredSubmissions = useMemo(() => {
    if (!searchQuery) return mockSubmissions;
    const q = searchQuery.toLowerCase();
    return mockSubmissions.filter(s => 
      s.id.toLowerCase().includes(q) || 
      s.aggregator.toLowerCase().includes(q)
    );
  }, [searchQuery]);
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="bg-gradient-to-br from-brand-teal to-teal-700 rounded-2xl p-4 sm:p-5 border border-teal-600 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
          <div>
            <p className="text-xs font-medium text-teal-100 uppercase tracking-wider">Pending Batch</p>
            <p className="text-2xl font-bold">{pendingVisits} Visits</p>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || pendingVisits === 0}
            className="w-full sm:w-auto justify-center bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Submitting...' : 'Submit Now'}
            {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-900">Recent Aggregator Submissions</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search batch ID or aggregator..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all shadow-sm"
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
              {filteredSubmissions.map((sub, idx) => (
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
                    <button 
                      onClick={() => setSelectedJsonSub(sub.id)}
                      className="text-brand-teal hover:text-teal-700 font-semibold text-sm flex items-center gap-1.5 ml-auto">
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

      {/* JSON Viewer Modal */}
      {selectedJsonSub && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[80vh]">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Raw JSON - {selectedJsonSub}</h2>
              <button onClick={() => setSelectedJsonSub(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <AlertCircle className="w-5 h-5 opacity-0" /> {/* Keeping spacing, actually let's just use text 'X' or Lucide X if imported... I'll just keep it as is with invisible icon but proper hit area */}
                <span className="absolute">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-slate-900 overflow-y-auto flex-1">
              <pre className="text-xs sm:text-sm text-emerald-400 font-mono overflow-x-auto whitespace-pre">
{`{
  "batchId": "${selectedJsonSub}",
  "status": "Accepted",
  "timestamp": "${new Date().toISOString()}",
  "recordsProcessed": 142,
  "recordsFailed": 0,
  "warnings": [],
  "metadata": {
    "aggregator": "HHAeXchange",
    "version": "v1.2",
    "processingTimeMs": 1432
  }
}`}
              </pre>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button 
                onClick={() => setSelectedJsonSub(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-xl transition-colors">
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 z-[100]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
