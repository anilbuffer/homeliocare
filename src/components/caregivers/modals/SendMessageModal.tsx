"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { MessageSquare, Send, Bell, Mail, Smartphone } from "lucide-react";

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  caregiverPhone: string;
  caregiverEmail: string;
  onSendMessage: (details: { subject: string; channel: string; message: string }) => void;
}

export function SendMessageModal({
  isOpen,
  onClose,
  caregiverName,
  caregiverPhone,
  caregiverEmail,
  onSendMessage,
}: SendMessageModalProps) {
  const [channel, setChannel] = useState<"App & SMS" | "Email" | "App Only">("App & SMS");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage({
      subject: subject || "Message from HR",
      channel,
      message,
    });
    setSubject("");
    setMessage("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Message"
      description={`Send a direct notification or email to ${caregiverName}`}
      icon={<MessageSquare className="w-6 h-6 text-blue-500" />}
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
            disabled={!message.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
          <div><span className="font-semibold">Phone:</span> {caregiverPhone}</div>
          <div><span className="font-semibold">Email:</span> {caregiverEmail}</div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Delivery Channel
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "App & SMS", label: "App & SMS", icon: Smartphone },
              { id: "Email", label: "Email", icon: Mail },
              { id: "App Only", label: "App Only", icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = channel === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setChannel(item.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/50 text-blue-700 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Schedule update, compliance reminder, etc."
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Message Body *
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            required
          />
        </div>
      </form>
    </Modal>
  );
}
