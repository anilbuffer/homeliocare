"use client";

import React, { useEffect, useState } from "react";
import { Check, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/components/ui/Card";
import { WorkflowStageData, IncidentStatus } from "@/types/incidents";
import { differenceInMinutes, parseISO } from "date-fns";

interface WorkflowStepperProps {
  workflow: WorkflowStageData[];
}

const STAGES: IncidentStatus[] = [
  "Reported",
  "Assigned",
  "Investigated",
  "Corrective Action",
  "Closed"
];

function getSlaStatus(startedAt?: string, slaTargetHours?: number, completedAt?: string) {
  if (!startedAt || !slaTargetHours) return "on-track";
  
  if (completedAt) {
    const elapsedMinutes = differenceInMinutes(parseISO(completedAt), parseISO(startedAt));
    if (elapsedMinutes > slaTargetHours * 60) return "breached";
    return "completed-on-time";
  }

  // Not completed yet, calculate based on current time
  const elapsedMinutes = differenceInMinutes(new Date(), parseISO(startedAt));
  const targetMinutes = slaTargetHours * 60;
  
  if (elapsedMinutes > targetMinutes) return "breached";
  if (elapsedMinutes > targetMinutes * 0.75) return "warning"; // 75% of SLA consumed
  return "on-track";
}

function formatTimeRemaining(startedAt: string, slaTargetHours: number) {
  const targetMinutes = slaTargetHours * 60;
  const elapsedMinutes = differenceInMinutes(new Date(), parseISO(startedAt));
  const remaining = targetMinutes - elapsedMinutes;
  
  if (remaining < 0) {
    const overdue = Math.abs(remaining);
    if (overdue > 1440) return `${Math.floor(overdue / 1440)}d overdue`;
    if (overdue > 60) return `${Math.floor(overdue / 60)}h overdue`;
    return `${overdue}m overdue`;
  }
  
  if (remaining > 1440) return `${Math.floor(remaining / 1440)}d left`;
  if (remaining > 60) return `${Math.floor(remaining / 60)}h left`;
  return `${remaining}m left`;
}

export function WorkflowStepper({ workflow }: WorkflowStepperProps) {
  // Use a tick to update live timers
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Determine current active stage (last one with startedAt but no completedAt, or the next one if the previous is completed)
  let activeStageIndex = 0;
  for (let i = 0; i < STAGES.length; i++) {
    const data = workflow.find(w => w.stage === STAGES[i]);
    if (data?.completedAt) {
      activeStageIndex = i + 1;
    } else if (data?.startedAt) {
      activeStageIndex = i;
      break;
    } else {
      break;
    }
  }

  return (
    <div className="py-4">
      <div className="flex justify-between relative">
        {/* Connecting Background Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 -z-10" />
        
        {/* Animated Progress Line */}
        <div 
          className="absolute top-4 left-4 h-0.5 bg-brand-teal -z-10 transition-all duration-1000 ease-in-out" 
          style={{ width: `calc(${(activeStageIndex / (STAGES.length - 1)) * 100}% - 32px)` }}
        />

        {STAGES.map((stageName, index) => {
          const data = workflow.find(w => w.stage === stageName);
          const isCompleted = !!data?.completedAt;
          const isActive = index === activeStageIndex;
          const isPending = index > activeStageIndex;
          
          let slaStatus = getSlaStatus(data?.startedAt, data?.slaTargetHours, data?.completedAt);
          
          let nodeColor = "bg-slate-200 border-slate-200 text-slate-400";
          if (isCompleted) {
            nodeColor = "bg-brand-teal border-brand-teal text-white";
            if (slaStatus === "breached") nodeColor = "bg-accent-red border-accent-red text-white";
          } else if (isActive) {
            nodeColor = "bg-white border-brand-teal text-brand-teal shadow-[0_0_0_4px_rgba(20,184,166,0.1)]";
            if (slaStatus === "warning") {
              nodeColor = "bg-white border-accent-amber text-accent-amber shadow-[0_0_0_4px_rgba(245,158,11,0.1)] transition-colors duration-500";
            } else if (slaStatus === "breached") {
              nodeColor = "bg-white border-accent-red text-accent-red shadow-[0_0_0_4px_rgba(239,68,68,0.1)] transition-colors duration-500";
            }
          }

          return (
            <div key={stageName} className="flex flex-col items-center w-24 relative group">
              <div className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 z-10 transition-all duration-500", nodeColor)}>
                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-semibold">{index + 1}</span>}
              </div>
              
              <div className="text-xs font-medium text-center leading-tight mb-1">
                {stageName}
              </div>

              {/* SLA Timer / Status */}
              <div className="h-6 flex items-center justify-center w-full">
                {isActive && data?.startedAt && data.slaTargetHours && (
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full transition-colors duration-500",
                    slaStatus === "breached" ? "bg-accent-red/10 text-accent-red" :
                    slaStatus === "warning" ? "bg-accent-amber/10 text-accent-amber" :
                    "bg-brand-teal/10 text-brand-teal"
                  )}>
                    {slaStatus === "breached" ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {formatTimeRemaining(data.startedAt, data.slaTargetHours)}
                  </div>
                )}
                
                {isCompleted && data?.completedAt && (
                  <div className="text-[10px] text-slate-400">
                    {new Date(data.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
