import React from "react";
import { ScheduledReport } from "@/lib/reports-mock-data";
import { Play, Edit2, Copy, Trash2 } from "lucide-react";

interface ScheduledReportsListProps {
  reports: ScheduledReport[];
}

export function ScheduledReportsList({ reports }: ScheduledReportsListProps) {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Scheduled Reports</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="text-xs text-slate-500 uppercase border-b border-slate-100">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Schedule</th>
              <th className="px-4 py-3 font-medium">Recipients</th>
              <th className="px-4 py-3 font-medium">Format</th>
              <th className="px-4 py-3 font-medium">Next Run</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors last:border-0">
                <td className="px-4 py-4 font-medium text-slate-900">{report.name}</td>
                <td className="px-4 py-4">{report.schedule}</td>
                <td className="px-4 py-4 text-xs max-w-xs truncate" title={report.recipients}>{report.recipients}</td>
                <td className="px-4 py-4">{report.format}</td>
                <td className="px-4 py-4">{new Date(report.nextRunDate).toLocaleDateString()}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.active ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}>
                    {report.active ? "Active" : "Paused"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  No scheduled reports.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
