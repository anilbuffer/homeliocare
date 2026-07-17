"use client";

import React from "react";
import { FileSignature, Check, AlertTriangle } from "lucide-react";
import { PolicyAcknowledgment } from "@/types/compliance";

interface PolicyAcknowledgmentMatrixProps {
  policies: PolicyAcknowledgment[];
}

export function PolicyAcknowledgmentMatrix({ policies }: PolicyAcknowledgmentMatrixProps) {
  // Aggregate all unique caregivers that need to acknowledge policies (for the matrix columns)
  const uniqueCaregivers = Array.from(new Set(
    policies.flatMap(p => p.acknowledgments.map(a => a.caregiverName))
  )).slice(0, 5); // Limit for demo

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col">
      <div className="pb-4 border-b border-slate-200 bg-white/50">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-brand-teal" />
          Regulatory & Policy Acknowledgment
        </h3>
        <p className="text-sm text-slate-500 mt-1">Track staff signatures on critical agency policies.</p>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-slate-50/95 backdrop-blur-sm text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 rounded-tl-lg">Policy Name</th>
              <th className="px-6 py-4">Applicable Roles</th>
              {uniqueCaregivers.map(cg => (
                <th key={cg} className="px-4 py-4 text-center truncate max-w-[100px]" title={cg}>
                  {cg.split(" ")[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {policies.map(policy => (
              <tr key={policy.id} className="hover:bg-slate-50/80 transition-colors duration-200">
                <td className="px-6 py-5">
                  <div className="text-sm font-semibold text-slate-800">{policy.policyName}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-1.5 flex-wrap">
                    {policy.requiredForRoles.map(role => (
                      <span key={role} className="text-[10px] font-bold uppercase tracking-wide bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded shadow-[0_8px_30px_rgb(0,0,0,0.04)]">{role}</span>
                    ))}
                  </div>
                </td>
                {uniqueCaregivers.map(cgName => {
                  const ack = policy.acknowledgments.find(a => a.caregiverName === cgName);
                  const isAcknowledged = !!ack?.acknowledgedAt;

                  return (
                    <td key={cgName} className="px-4 py-5 text-center">
                      {isAcknowledged ? (
                        <div className="flex justify-center" title={`Signed on ${new Date(ack.acknowledgedAt!).toLocaleDateString('en-US')}`}>
                          <div className="bg-emerald-50 p-1.5 rounded-full border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <Check className="w-4 h-4 text-emerald-500" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center" title="Missing Signature">
                          <div className="bg-amber-50 p-1.5 rounded-full border border-amber-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
