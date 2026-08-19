"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MapPin, CheckCircle, Circle, Play, Square, FileSignature } from "lucide-react";
import { toast } from "sonner";

export default function ActiveVisitPage() {
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, label: "Assist with ambulation", completed: false },
    { id: 2, label: "Prepare light meal", completed: false },
    { id: 3, label: "Medication reminder", completed: false },
  ]);

  const toggleTask = (id: number) => {
    if (!hasClockedIn || hasClockedOut) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleClockIn = () => {
    toast.success("Clocked in successfully. GPS verified.");
    setHasClockedIn(true);
  };

  const handleClockOut = () => {
    if (tasks.some(t => !t.completed)) {
      toast.error("Please complete all tasks before clocking out.");
      return;
    }
    toast.success("Clocked out successfully. Visit completed.");
    setHasClockedOut(true);
  };

  return (
    <div className="w-full animate-in fade-in duration-500 max-w-lg mx-auto pb-20">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Visit</h1>
        <p className="text-sm text-slate-500 mt-1">
          Dorothy Vance
        </p>
        <div className="flex justify-center items-center gap-1 mt-2 text-xs font-semibold text-slate-500">
          <MapPin className="w-3.5 h-3.5" /> 123 Example Street, Suite 400
        </div>
      </div>

      <div className="space-y-4">
        {/* EVV Controls */}
        <Card className="p-4 shadow-sm border-slate-200 text-center">
          {!hasClockedIn ? (
            <button 
              onClick={handleClockIn}
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2 shadow-[0_8px_30px_rgba(16,185,129,0.2)]"
            >
              <Play className="w-6 h-6 fill-current" /> Clock In
            </button>
          ) : !hasClockedOut ? (
            <div className="space-y-4">
              <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                Clocked in at 9:00 AM
              </div>
              <button 
                onClick={handleClockOut}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold text-lg hover:bg-red-600 transition-colors flex justify-center items-center gap-2 shadow-[0_8px_30px_rgba(239,68,68,0.2)]"
              >
                <Square className="w-6 h-6 fill-current" /> Clock Out
              </button>
            </div>
          ) : (
            <div className="text-sm font-bold text-slate-600 bg-slate-100 p-4 rounded-xl">
              Visit Completed<br/>
              <span className="text-xs font-normal">09:00 AM - 01:05 PM (4h 5m)</span>
            </div>
          )}
        </Card>

        {/* Care Plan Tasks */}
        <Card className={`p-4 shadow-sm border-slate-200 ${(!hasClockedIn || hasClockedOut) ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Care Plan Tasks</h3>
          <div className="space-y-2">
            {tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${task.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
              >
                {task.completed ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <span className={`text-sm font-semibold ${task.completed ? 'text-emerald-800 line-through' : 'text-slate-700'}`}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Client Signature */}
        <Card className={`p-4 shadow-sm border-slate-200 ${(!hasClockedIn || hasClockedOut) ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Client Signature</h3>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Required</span>
          </div>
          <div className="h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
            <div className="text-center">
              <FileSignature className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span className="text-xs font-semibold">Sign Here</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
