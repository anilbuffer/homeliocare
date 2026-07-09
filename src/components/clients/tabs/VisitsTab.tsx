import React from "react";
import { Card } from "@/components/ui/Card";
import { Client } from "@/lib/clients/mockData";
import { Calendar } from "lucide-react";

export function VisitsTab({ client }: { client: Client }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Upcoming Visits</h3>
          <button className="text-sm font-medium text-brand-teal hover:underline">View All</button>
        </div>
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No upcoming visits scheduled.</p>
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Visit History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Date</th>
                <th className="px-4 py-3">Caregiver</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">EVV Status</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No previous visits recorded.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
