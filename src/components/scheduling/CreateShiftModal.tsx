import React, { useState } from "react";
import { X, Calendar, MapPin, Clock, FileText, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Shift } from "@/lib/scheduling/mockData";

interface CreateShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newShift: Shift) => void;
}

export function CreateShiftModal({ isOpen, onClose, onCreate }: CreateShiftModalProps) {
  const [patientName, setPatientName] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("Queens");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("13:00");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create an ISO string for today if date is empty, otherwise use date
    const shiftDate = date || new Date().toISOString().split('T')[0];
    const startIso = `${shiftDate}T${startTime}:00Z`;
    const endIso = `${shiftDate}T${endTime}:00Z`;
    
    const newShift: Shift = {
      id: `s-new-${Math.random().toString(36).substring(7)}`,
      patientId: `p-${Math.random().toString(36).substring(7)}`,
      patientName: patientName || "New Patient",
      patientAddress: address || "123 Main St",
      requiredSkills: ["HHA"],
      startTime: startIso,
      endTime: endIso,
      status: "Unfilled",
      region: region,
      assignedCaregiverId: null,
      shiftNumber: `#${Math.floor(Math.random() * 1000)}`,
      notes: notes,
    };
    
    onCreate(newShift);
    onClose();
    
    // Reset form
    setPatientName("");
    setAddress("");
    setRegion("Queens");
    setDate("");
    setStartTime("09:00");
    setEndTime("13:00");
    setNotes("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">Create New Shift</h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <form id="create-shift-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                        placeholder="123 Care Ave, NY"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                    >
                      <option value="Queens">Queens</option>
                      <option value="Brooklyn">Brooklyn</option>
                      <option value="Manhattan">Manhattan</option>
                      <option value="Bronx">Bronx</option>
                      <option value="Staten Island">Staten Island</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Start</label>
                        <input
                          type="time"
                          required
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full px-2 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">End</label>
                        <input
                          type="time"
                          required
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full px-2 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent min-h-[80px]"
                        placeholder="Any special instructions..."
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="create-shift-form"
                className="px-5 py-2.5 rounded-xl font-medium text-white bg-brand-teal hover:bg-brand-teal/90 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 transition-all"
              >
                Create Shift
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
