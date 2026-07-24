"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { BellRing, Mail, MessageSquare, Check, Sparkles } from "lucide-react";

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: {
    id: string;
    name: string;
    role: string;
    certificationsExpiring?: number;
    daysOverdue?: number;
    daysLeft?: number;
  } | null;
  onSend: (message: string, channels: string[]) => void;
}

export function SendReminderModal({ isOpen, onClose, staff, onSend }: SendReminderModalProps) {
  const [channels, setChannels] = useState<string[]>(["email", "sms"]);
  const [customNote, setCustomNote] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!staff) return null;

  const toggleChannel = (ch: string) => {
    if (channels.includes(ch)) {
      if (channels.length > 1) {
        setChannels(channels.filter((c) => c !== ch));
      }
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        onSend(customNote, channels);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Compliance Reminder"
      icon={
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] shrink-0">
          <BellRing className="w-5 h-5 text-brand-teal" />
        </div>
      }
      footer={
        !sentSuccess && (
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="px-4 py-2 text-xs font-semibold bg-brand-teal hover:bg-[#0c8a6f] text-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <BellRing className="w-3.5 h-3.5" />
              {isSending ? "Dispatching..." : "Send Reminder Now"}
            </button>
          </div>
        )
      }
    >
      {sentSuccess ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Reminder Sent Successfully!</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Dispatched to {staff.name} via {channels.join(" & ").toUpperCase()}.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Target Info */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-900">{staff.name}</p>
              <p className="text-[11px] text-slate-500">{staff.role} • Caregiver LMS ID: {staff.id}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-amber-100 text-amber-800 border border-amber-200 rounded-full">
              {staff.daysOverdue ? `${staff.daysOverdue}d Overdue` : `${staff.certificationsExpiring || 1} Pending Items`}
            </span>
          </div>

          {/* Delivery Channels */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Dispatch Channels
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toggleChannel("email")}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold transition-all cursor-pointer ${channels.includes("email")
                  ? "bg-brand-teal/10 border-brand-teal text-brand-teal shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email Notification</span>
              </button>
              <button
                type="button"
                onClick={() => toggleChannel("sms")}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold transition-all cursor-pointer ${channels.includes("sms")
                  ? "bg-brand-teal/10 border-brand-teal text-brand-teal shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>SMS Alert</span>
              </button>
            </div>
          </div>

          {/* Note */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-600">
                Personalized Note (Optional)
              </label>
              <button
                type="button"
                onClick={() =>
                  setCustomNote(
                    `Hi ${staff.name.split(" ")[0]}, please complete your mandatory compliance modules by end of this week to maintain active scheduling status.`
                  )
                }
                className="text-[11px] text-brand-teal font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" /> Auto-fill Template
              </button>
            </div>
            <textarea
              rows={3}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Add an urgent message or special instructions..."
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-slate-800"
            />
          </div>

        </div>
      )}
    </Modal>
  );
}
