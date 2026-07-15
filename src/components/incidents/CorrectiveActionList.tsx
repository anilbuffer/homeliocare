"use client";

import React, { useState } from "react";
import { Check, Calendar } from "lucide-react";
import { CorrectiveAction } from "@/types/incidents";
import { cn } from "@/components/ui/Card";

interface CorrectiveActionListProps {
  actions: CorrectiveAction[];
}

export function CorrectiveActionList({ actions }: CorrectiveActionListProps) {
  // Use state to handle local optimistic updates/animations
  const [localActions, setLocalActions] = useState<CorrectiveAction[]>(actions);

  const toggleAction = (id: string) => {
    setLocalActions(prev => prev.map(action => {
      if (action.id === id) {
        return {
          ...action,
          status: action.status === "Pending" ? "Completed" : "Pending",
          completedDate: action.status === "Pending" ? new Date().toISOString() : undefined
        };
      }
      return action;
    }));
  };

  if (!localActions || localActions.length === 0) {
    return (
      <div className="text-sm text-slate-500 italic py-2">
        No corrective actions assigned.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {localActions.map(action => {
        const isCompleted = action.status === "Completed";
        
        return (
          <div 
            key={action.id}
            className={cn(
              "flex gap-3 p-3 rounded-xl border transition-all duration-300",
              isCompleted ? "bg-slate-50 border-slate-200" : "bg-white border-brand-teal/20 hover:border-brand-teal/40 shadow-sm"
            )}
          >
            <button
              onClick={() => toggleAction(action.id)}
              className={cn(
                "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300",
                isCompleted 
                  ? "bg-brand-teal border-brand-teal text-white" 
                  : "border-slate-300 bg-white hover:border-brand-teal"
              )}
            >
              {isCompleted && (
                <Check className="w-3.5 h-3.5 animate-in zoom-in spin-in-12 duration-300" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className={cn(
                "text-sm font-medium transition-colors duration-300",
                isCompleted ? "text-slate-500 line-through" : "text-slate-800"
              )}>
                {action.description}
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">
                    {action.ownerName.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-500">{action.ownerName}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {isCompleted && action.completedDate 
                    ? `Done ${new Date(action.completedDate).toLocaleDateString()}`
                    : `Due ${new Date(action.dueDate).toLocaleDateString()}`
                  }
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
