import React from "react";
import { SavedReport } from "@/lib/reports-mock-data";
import { Play, Edit2, Copy, Trash2 } from "lucide-react";

interface SavedReportsListProps {
  reports: SavedReport[];
}

export function SavedReportsList({ reports }: SavedReportsListProps) {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] mb-8 overflow-hidden">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Saved Reports</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="text-xs text-slate-500 uppercase border-b border-slate-100">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Creator</th>
              <th className="px-4 py-3 font-medium">Data Source</th>
              <th className="px-4 py-3 font-medium">Last Run Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors last:border-0">
                <td className="px-4 py-4 font-medium text-slate-900">{report.name}</td>
                <td className="px-4 py-4">{report.creator}</td>
                <td className="px-4 py-4">{report.dataSource}</td>
                <td className="px-4 py-4">
                  {new Date(report.lastRunDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors" title="Run">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Duplicate">
                      <Copy className="w-4 h-4" />
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
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No saved reports yet — build your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
