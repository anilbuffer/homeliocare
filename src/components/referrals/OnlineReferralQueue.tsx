import React from "react";
import { Inbox, UserPlus } from "lucide-react";

export function OnlineReferralQueue() {
  const queue = [
    { id: "q1", name: "David Miller", date: "10 mins ago", type: "Post-Op Care" },
    { id: "q2", name: "Sarah Connor", date: "2 hours ago", type: "Elder Care" },
  ];

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex-1 flex flex-col max-h-80">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
          <Inbox className="w-4 h-4 text-brand-teal" />
          Inbound Queue
        </h3>
        <span className="bg-brand-teal/10 text-brand-teal text-xs font-bold px-2 py-0.5 rounded-full">
          {queue.length} New
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
        {queue.map(item => (
          <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center hover:border-slate-200 transition-colors">
            <div>
              <h4 className="text-sm font-medium text-slate-800">{item.name}</h4>
              <p className="text-xs text-slate-500">{item.type} • {item.date}</p>
            </div>
            <button className="text-brand-teal hover:bg-teal-50 p-2 rounded-lg transition-colors" title="Claim Referral">
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        ))}
        {queue.length === 0 && (
          <div className="text-center text-sm text-slate-500 py-4">
            No unclaimed referrals.
          </div>
        )}
      </div>
    </div>
  );
}
