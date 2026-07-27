"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Calendar, Clock, User, FileText, CheckCircle2 } from "lucide-react";
import { mockPatients } from "@/lib/patients/mockData";

interface ScheduleShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  onScheduleShift: (shift: {
    id: string;
    patientName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: "Upcoming";
    type: string;
  }) => void;
}

export function ScheduleShiftModal({
  isOpen,
  onClose,
  caregiverName,
  onScheduleShift,
}: ScheduleShiftModalProps) {
  const patientList = Object.values(mockPatients);
  const [patientName, setPatientName] = useState(patientList[0]?.name || "Robert Hayes");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [shiftType, setShiftType] = useState("Personal Care & Companionship");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleShift({
      id: `shift-${Date.now()}`,
      patientName,
      date,
      startTime,
      endTime,
      status: "Upcoming",
      type: shiftType,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Shift"
      description={`Assign a new care shift to ${caregiverName}`}
      icon={<Calendar className="w-6 h-6 text-brand-teal" />}
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
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-teal hover:bg-emerald-600 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Confirm Shift Schedule
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Patient
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <select
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white"
            >
              {patientList.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.address})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Start Time
            </label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="09:00 AM"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              End Time
            </label>
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="05:00 PM"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Service Type
          </label>
          <select
            value={shiftType}
            onChange={(e) => setShiftType(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white"
          >
            <option value="Personal Care & Companionship">Personal Care & Companionship</option>
            <option value="Skilled Nursing Visit">Skilled Nursing Visit</option>
            <option value="Dementia / Memory Care">Dementia / Memory Care</option>
            <option value="Respite Care">Respite Care</option>
            <option value="Medication Administration">Medication Administration</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Shift Notes / Instructions
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special instructions, transportation requirements, or care plan reminders..."
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none"
          />
        </div>
      </form>
    </Modal>
  );
}
