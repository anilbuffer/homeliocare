"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Calendar, CheckCircle2, Check, X } from "lucide-react";
import { cn } from "@/components/ui/Card";

interface EditAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  onSave: () => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["Morning (6am-2pm)", "Afternoon (2pm-10pm)", "Night (10pm-6am)"];

export function EditAvailabilityModal({
  isOpen,
  onClose,
  caregiverName,
  onSave,
}: EditAvailabilityModalProps) {
  // Initialize mock availability state
  const [grid, setGrid] = useState<Record<string, boolean>>({
    "0-0": true, "0-1": true, "0-2": true, "0-3": true, "0-4": true, "0-5": false, "0-6": false,
    "1-0": true, "1-1": true, "1-2": true, "1-3": true, "1-4": true, "1-5": false, "1-6": false,
    "2-0": false, "2-1": false, "2-2": false, "2-3": false, "2-4": false, "2-5": true, "2-6": false,
  });

  const toggleCell = (tIdx: number, dIdx: number) => {
    const key = `${tIdx}-${dIdx}`;
    setGrid((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Availability Grid"
      description={`Click shift cells to toggle availability for ${caregiverName}`}
      icon={<Calendar className="w-6 h-6 text-brand-teal" />}
      maxWidth="3xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-emerald-600 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save Schedule Grid
          </button>
        </>
      }
    >
      <div className="space-y-4 py-2">
        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
          💡 Click any box below to toggle caregiver's availability between <strong>Available</strong> (Green) and <strong>Unavailable</strong> (Grey).
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-2 text-left font-medium text-slate-500 w-1/4">Shift</th>
                {DAYS.map((day) => (
                  <th key={day} className="p-2 text-center font-medium text-slate-800">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMES.map((time, tIdx) => (
                <tr key={time} className="border-t border-slate-100">
                  <td className="p-2 text-slate-600 font-medium whitespace-nowrap text-xs">{time}</td>
                  {DAYS.map((day, dIdx) => {
                    const isAvailable = !!grid[`${tIdx}-${dIdx}`];
                    return (
                      <td key={`${time}-${day}`} className="p-1">
                        <button
                          type="button"
                          onClick={() => toggleCell(tIdx, dIdx)}
                          className={cn(
                            "w-full h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer border text-xs font-bold",
                            isAvailable
                              ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300 shadow-sm"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-400 border-slate-200"
                          )}
                        >
                          {isAvailable ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
