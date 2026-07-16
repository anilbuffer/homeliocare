import React from "react";
import { Card } from "@/components/ui/Card";
import { Patient } from "@/lib/patients/mockData";
import { Badge } from "@/components/ui/Badge";
import { Clock, CheckCircle, AlertCircle, ChevronDown, Filter } from "lucide-react";

export function VisitsTab({ patient }: { patient: Patient }) {
  if (!patient.visits) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
          <h3 className="text-lg font-medium text-slate-700 mb-2">No visits found</h3>
        </Card>
      </div>
    );
  }

  const { upcoming, history } = patient.visits;

  const getStatusBadge = (type: string) => {
    switch (type) {
      case "Scheduled": return <Badge variant="info" className="bg-blue-50 text-blue-600"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5"></span>Scheduled</Badge>;
      case "Completed": return <Badge variant="success" className="bg-emerald-50 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span>Completed</Badge>;
      case "Late": return <Badge variant="warning" className="bg-amber-50 text-amber-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1.5"></span>Late</Badge>;
      case "Missed": return <Badge variant="error" className="bg-rose-50 text-rose-600"><span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5"></span>Missed</Badge>;
      default: return <Badge variant="default">{type}</Badge>;
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "pending": return <><Clock className="w-4 h-4 text-slate-400 mr-1.5" /> <span className="text-slate-500">pending</span></>;
      case "verified": return <><CheckCircle className="w-4 h-4 text-emerald-500 mr-1.5" /> <span className="text-emerald-700">verified</span></>;
      case "flagged": return <><AlertCircle className="w-4 h-4 text-rose-500 mr-1.5" /> <span className="text-rose-700">flagged</span></>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Upcoming visits */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Upcoming visits</h3>
        <div className="space-y-3">
          {upcoming.map((visit) => (
            <Card key={visit.id} className="p-4 flex items-center justify-between border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
              <div className="flex items-center w-1/4">
                <span className="font-semibold text-slate-800">{visit.date}</span>
                <span className="text-slate-500 ml-2">{visit.time}</span>
              </div>
              <div className="w-1/4 text-slate-700 font-medium">{visit.staff}</div>
              <div className="w-1/6 text-slate-500 text-sm">{visit.duration}</div>
              <div className="w-1/6 flex items-center text-sm">{getVerificationIcon(visit.status)}</div>
              <div className="w-1/6 flex items-center justify-end gap-3">
                {getStatusBadge(visit.type)}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Visit history */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Visit history</h3>
          <button className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
            <Filter className="w-4 h-4 mr-1.5" /> Missed / late only
          </button>
        </div>
        <div className="space-y-3">
          {history.map((visit) => (
            <Card key={visit.id} className="p-4 flex items-center justify-between border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
              <div className="flex items-center w-1/4">
                <span className="font-semibold text-slate-800">{visit.date}</span>
                <span className="text-slate-500 ml-2">{visit.time}</span>
              </div>
              <div className="w-1/4 text-slate-700 font-medium">{visit.staff}</div>
              <div className="w-1/6 text-slate-500 text-sm">{visit.duration}</div>
              <div className="w-1/6 flex items-center text-sm">{getVerificationIcon(visit.status)}</div>
              <div className="w-1/6 flex items-center justify-end gap-3">
                {getStatusBadge(visit.type)}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
