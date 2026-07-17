import React from "react";
import { Clock, AlertTriangle, FileText, CheckCircle2, MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { Referral } from "./types";

interface ReferralListViewProps {
  referrals: Referral[];
  onReferralClick: (referral: Referral) => void;
}

export function ReferralListView({ referrals, onReferralClick }: ReferralListViewProps) {
  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="p-4 whitespace-nowrap">Client</th>
              <th className="p-4 whitespace-nowrap">Stage</th>
              <th className="p-4 whitespace-nowrap">Source</th>
              <th className="p-4 whitespace-nowrap">Time in Stage</th>
              <th className="p-4 whitespace-nowrap">Next Action</th>
              <th className="p-4 whitespace-nowrap">Coordinator</th>
              <th className="p-4 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {referrals.map(referral => (
              <tr 
                key={referral.id} 
                onClick={() => onReferralClick(referral)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-sm font-bold text-brand-teal shrink-0">
                      {referral.clientInitials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{referral.clientName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">ID: {referral.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {referral.stage}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-slate-600">{referral.source}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">{referral.daysInStage} days</span>
                    {referral.daysInStage > 7 && (
                      <AlertTriangle className="w-4 h-4 text-amber-500 ml-1" />
                    )}
                  </div>
                </td>
                <td className="p-4 max-w-[200px] truncate">
                  {referral.nextAction ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-800 truncate" title={referral.nextAction.description}>
                        {referral.nextAction.description}
                      </span>
                      <span className={clsx(
                        "text-xs mt-0.5",
                        referral.nextAction.isOverdue ? "text-red-600 font-medium" : "text-slate-500"
                      )}>
                        Due: {new Date(referral.nextAction.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400 italic">No pending actions</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-medium text-indigo-600 shrink-0">
                      {referral.assignedCoordinator.name.charAt(0)}
                    </div>
                    <span className="text-sm text-slate-600">{referral.assignedCoordinator.name}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            
            {referrals.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No referrals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
