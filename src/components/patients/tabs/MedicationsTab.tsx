import React from "react";
import { Card } from "@/components/ui/Card";
import { Patient } from "@/lib/patients/mockData";
import { cn } from "@/components/ui/Card";

export function MedicationsTab({ patient }: { patient: Patient }) {
  if (!patient.medications) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
          <h3 className="text-lg font-medium text-slate-700 mb-2">No medications recorded</h3>
        </Card>
      </div>
    );
  }

  const { scheduled, prn, mar } = patient.medications;

  const renderMarCell = (status: "taken" | "missed" | "pending" | "na") => {
    const statusClasses = {
      taken: "bg-emerald-500",
      missed: "bg-rose-500",
      pending: "bg-amber-400",
      na: "bg-slate-200"
    };
    return (
      <div className="px-1 py-1">
        <div className={cn("h-8 rounded-sm w-full", statusClasses[status])} title={status}></div>
      </div>
    );
  };

  const TableHeader = ({ title }: { title: string }) => (
    <h3 className="text-sm font-semibold text-slate-700 mb-3">{title}</h3>
  );

  return (
    <div className="space-y-8">
      {/* Scheduled medications */}
      <div>
        <TableHeader title="Scheduled medications" />
        <Card className="overflow-hidden bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 border-b border-slate-100">Medication</th>
                  <th className="px-4 py-3 border-b border-slate-100">Dosage</th>
                  <th className="px-4 py-3 border-b border-slate-100">Frequency</th>
                  <th className="px-4 py-3 border-b border-slate-100">Started</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scheduled.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 ">
                      <p className="font-semibold text-slate-800">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.prescriber}</p>
                    </td>
                    <td className="px-4 py-3 ">{med.dosage}</td>
                    <td className="px-4 py-3 ">{med.frequency}</td>
                    <td className="px-4 py-3 ">{med.started}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* MAR */}
      <div>
        <TableHeader title="MAR — last 14 days" />
        <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Dates Row */}
              <div className="flex text-xs text-slate-500 font-medium mb-2 pl-16">
                {mar.dates.map((date, i) => (
                  <div key={i} className="flex-1 text-center">{date}</div>
                ))}
              </div>

              {/* Time slots */}
              {["am", "noon", "pm", "night"].map((time, idx) => {
                const rowData = mar[time as keyof typeof mar] as Array<"taken" | "missed" | "pending" | "na">;
                if (!Array.isArray(rowData)) return null;

                return (
                  <div key={time} className="flex items-center mb-1">
                    <div className="w-16 text-xs font-semibold text-slate-600 capitalize">
                      {time === "am" ? "AM" : time === "pm" ? "PM" : time}
                    </div>
                    {rowData.map((status, i) => (
                      <div key={i} className="flex-1">
                        {renderMarCell(status)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-500"></div> taken</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-rose-500"></div> missed</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-400"></div> pending</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-slate-200"></div> na</div>
          </div>
        </Card>
      </div>

      {/* PRN medications */}
      <div>
        <TableHeader title="PRN medications" />
        <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-100">Medication</th>
                  <th className="px-6 py-4 border-b border-slate-100">Dosage</th>
                  <th className="px-6 py-4 border-b border-slate-100">Frequency</th>
                  <th className="px-6 py-4 border-b border-slate-100">Started</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prn.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.prescriber}</p>
                    </td>
                    <td className="px-6 py-4">{med.dosage}</td>
                    <td className="px-6 py-4">{med.frequency}</td>
                    <td className="px-6 py-4">{med.started}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
