import React from "react";
import { Calendar, AlertCircle, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import clsx from "clsx";
import { Referral } from "./types";

interface ReferralTaskViewProps {
  referrals: Referral[];
  onReferralClick: (referral: Referral) => void;
}

export function ReferralTaskView({ referrals, onReferralClick }: ReferralTaskViewProps) {
  // Filter and sort referrals that have a nextAction
  const tasks = referrals
    .filter(r => r.nextAction)
    .sort((a, b) => {
      // Sort overdue first, then by date
      if (a.nextAction!.isOverdue && !b.nextAction!.isOverdue) return -1;
      if (!a.nextAction!.isOverdue && b.nextAction!.isOverdue) return 1;
      return new Date(a.nextAction!.dueDate).getTime() - new Date(b.nextAction!.dueDate).getTime();
    });

  return (
    <div className="w-full">
      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          No pending tasks.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map(referral => (
            <div 
              key={referral.id}
              className={clsx(
                "bg-white backdrop-blur-xl rounded-2xl p-5 border shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden flex flex-col group cursor-pointer",
                referral.nextAction!.isOverdue ? "border-red-200 hover:border-red-300" : "border-slate-200 hover:border-brand-teal/60"
              )}
              onClick={() => onReferralClick(referral)}
            >
              {referral.nextAction!.isOverdue && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
              )}
              
              <div className="flex justify-between items-start mb-4">
                <span className={clsx(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                  referral.nextAction!.isOverdue 
                    ? "bg-red-50 text-red-700 border-red-100" 
                    : "bg-amber-50 text-amber-700 border-amber-100"
                )}>
                  {referral.nextAction!.isOverdue ? (
                    <AlertCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {referral.nextAction!.isOverdue ? "Overdue" : "Pending"}
                </span>
                
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(referral.nextAction!.dueDate).toLocaleDateString()}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-800 mb-2 leading-tight">
                {referral.nextAction!.description}
              </h4>
              
              <div className="bg-slate-50 rounded-lg p-3 mb-4 mt-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/10 flex items-center justify-center text-[10px] font-bold text-brand-teal">
                    {referral.clientInitials}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{referral.clientName}</span>
                </div>
                <div className="text-xs text-slate-500 pl-7">
                  Stage: {referral.stage}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-medium text-indigo-600">
                    {referral.assignedCoordinator.name.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-600">{referral.assignedCoordinator.name}</span>
                </div>
                
                <button className="text-brand-teal flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
