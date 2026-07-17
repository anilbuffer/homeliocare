import React, { useState } from "react";
import { XCircle, ChevronDown, ChevronUp } from "lucide-react";

export function RecentlyDeclinedList() {
  const [isExpanded, setIsExpanded] = useState(false);

  const declined = [
    { id: "d1", name: "Robert Jones", reason: "Out of Service Area", date: "Jul 15" },
    { id: "d2", name: "Amanda Chase", reason: "Insurance Not Accepted", date: "Jul 14" },
    { id: "d3", name: "Michael Chen", reason: "Client Declined", date: "Jul 12" },
  ];

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex-1 flex flex-col max-h-80">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors shrink-0"
      >
        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-slate-400" />
          Recently Declined / Lost
        </h3>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>

      {isExpanded && (
        <div className="p-2 space-y-1 bg-white border-t border-slate-200 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          {declined.map(item => (
            <div key={item.id} className="p-3 hover:bg-slate-50 rounded-lg transition-colors flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-slate-800">{item.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.date}</div>
              </div>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-1 rounded-md border border-slate-200">
                {item.reason}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
