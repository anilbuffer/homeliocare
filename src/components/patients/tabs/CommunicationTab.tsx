import React from "react";
import { Card, cn } from "@/components/ui/Card";
import { Patient } from "@/lib/patients/mockData";
import { MessageSquare, Phone, Lock } from "lucide-react";

export function CommunicationTab({ patient }: { patient: Patient }) {
  if (!patient.communication) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
          <h3 className="text-lg font-medium text-slate-700 mb-2">No active communications</h3>
        </Card>
      </div>
    );
  }

  const { familyThread, logs, internalNotes } = patient.communication;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Family portal thread */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-brand-teal" />
            <h3 className="text-sm font-semibold text-slate-700">Family portal thread</h3>
          </div>
          <div className="space-y-6">
            {familyThread.map((msg) => (
              <div key={msg.id} className={cn("flex flex-col max-w-[80%]", msg.direction === "outbound" ? "ml-auto items-end" : "mr-auto items-start")}>
                <div className="text-xs text-slate-500 mb-1.5 flex gap-1.5">
                  <span className="font-medium">{msg.sender}</span>
                  <span>·</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className={cn(
                  "p-3.5 rounded-2xl text-sm",
                  msg.direction === "outbound" 
                    ? "bg-emerald-50 text-emerald-900 rounded-tr-sm" 
                    : "bg-slate-100 text-slate-800 rounded-tl-sm"
                )}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Call & SMS log */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-700">Call & SMS log</h3>
          </div>
          <div className="space-y-6 divide-y divide-slate-100">
            {logs.map((log, idx) => (
              <div key={log.id} className={idx !== 0 ? "pt-6" : ""}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-slate-800">{log.type}</h4>
                  <span className="text-xs text-slate-500">{log.timestamp}</span>
                </div>
                <div className="text-xs text-slate-500 mb-1.5 flex gap-1.5">
                  <span>{log.contact}</span>
                  {log.duration && (
                    <>
                      <span>·</span>
                      <span>{log.duration}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-slate-600">{log.summary}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Internal care-team notes */}
      <Card className="border-purple-200 overflow-hidden">
        <div className="bg-purple-50/50 p-4 border-b border-purple-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-500" />
          <h3 className="text-sm font-semibold text-purple-900">Internal care-team notes</h3>
          <span className="text-[10px] font-bold text-purple-500 tracking-wider uppercase ml-1">Staff Only</span>
        </div>
        <div className="p-6 space-y-4 divide-y divide-slate-100">
          {internalNotes.map((note, idx) => (
            <div key={note.id} className={idx !== 0 ? "pt-4" : ""}>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                <span className="font-semibold text-slate-700">{note.author}</span>
                <span>·</span>
                <span>{note.timestamp}</span>
              </div>
              <p className="text-sm text-slate-600">{note.note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
