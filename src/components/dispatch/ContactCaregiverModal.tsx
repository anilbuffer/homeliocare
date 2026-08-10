import React, { useState } from "react";
import { type Visit } from "@/lib/mockTrackerData";
import { X, Send, User } from "lucide-react";

interface ContactCaregiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | null;
  onSend: (message: string) => void;
}

export function ContactCaregiverModal({ isOpen, onClose, visit, onSend }: ContactCaregiverModalProps) {
  const [message, setMessage] = useState("");

  if (!isOpen || !visit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const caregiverName = visit.caregiverId === 'c1' ? 'Priya Patel' : visit.caregiverId === 'c2' ? 'Maria Santos' : 'Caregiver';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-teal" />
            Contact {caregiverName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 text-xs text-blue-800 font-medium">
          Regarding Visit #{visit.id.replace('v-', '4570')} - {visit.patientName}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Message</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Type your message to ${caregiverName} here...`}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all resize-none"
            />
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-5 py-2 rounded-xl bg-brand-teal hover:bg-teal-600 text-white text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-brand-teal/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
