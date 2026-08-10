import React, { useState, useEffect } from "react";
import { type Visit } from "@/lib/mockTrackerData";
import { X, MapPin, User, Clock } from "lucide-react";

interface EditVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | null;
  onSave: (visit: Visit) => void;
}

export function EditVisitModal({ isOpen, onClose, visit, onSave }: EditVisitModalProps) {
  const [patientName, setPatientName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [caregiverId, setCaregiverId] = useState("");

  useEffect(() => {
    if (visit && isOpen) {
      setPatientName(visit.patientName);
      setAddress(visit.address);
      setTime(visit.time);
      setCaregiverId(visit.caregiverId || "");
    }
  }, [visit, isOpen]);

  if (!isOpen || !visit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedVisit: Visit = {
      ...visit,
      patientName,
      address,
      time,
      caregiverId: caregiverId || undefined,
      status: caregiverId ? (visit.status === "Unassigned" ? "Assigned" : visit.status) : "Unassigned",
    };
    onSave(updatedVisit);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-base font-semibold text-slate-900">Edit Visit #{visit.id.replace('v-', '4570')}</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" /> Patient Name
            </label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" /> Address
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" /> Time Window
            </label>
            <input
              type="text"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" /> Assign Caregiver
            </label>
            <select
              value={caregiverId}
              onChange={(e) => setCaregiverId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all bg-white"
            >
              <option value="">-- Unassigned --</option>
              <option value="c1">Priya Patel (RN)</option>
              <option value="c2">Maria Santos (CNA)</option>
              <option value="c3">Marcus Johnson (LPN)</option>
            </select>
          </div>
        </form>
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-brand-teal hover:bg-teal-600 text-white text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-brand-teal/20 active:scale-95 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
