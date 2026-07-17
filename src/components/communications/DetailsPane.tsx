import React from "react";
import { X, FileText, Image as ImageIcon, Link as LinkIcon, User, Phone, Mail, Settings } from "lucide-react";
import { Conversation } from "./mockData";
import clsx from "clsx";

interface DetailsPaneProps {
  conversation: Conversation | null;
  onClose: () => void;
  isOpen: boolean;
}

export function DetailsPane({ conversation, onClose, isOpen }: DetailsPaneProps) {
  if (!isOpen || !conversation) return null;

  const primaryParticipant = conversation.participants[0];

  return (
    <div className="w-[300px] border-l border-slate-200 bg-white flex flex-col h-full shrink-0 animate-in slide-in-from-right-10 duration-200 ease-out">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
        <h3 className="font-semibold text-slate-800">Details</h3>
        <button 
          onClick={onClose}
          className="p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Contact Profile Info */}
        <div className="p-6 text-center border-b border-slate-100">
          <img 
            src={primaryParticipant.avatar} 
            alt={primaryParticipant.name} 
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow-sm"
          />
          <h2 className="font-semibold text-lg text-slate-900">{primaryParticipant.name}</h2>
          <p className="text-sm text-slate-500 mb-4">{primaryParticipant.role}</p>
          
          <div className="flex justify-center gap-3">
            <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
              <Mail className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info List */}
        <div className="p-6 space-y-4 border-b border-slate-100">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{primaryParticipant.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{primaryParticipant.email}</span>
          </div>
          {primaryParticipant.preferredLanguage && (
            <div className="flex items-center gap-3 text-sm">
              <Settings className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">Prefers {primaryParticipant.preferredLanguage}</span>
            </div>
          )}
        </div>

        {/* Linked Records */}
        {conversation.linkedRecord && (
          <div className="p-6 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Linked Records</h4>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-brand-teal/30 hover:bg-brand-teal/5 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{conversation.linkedRecord.label}</p>
                <p className="text-xs text-slate-500">{conversation.linkedRecord.type}</p>
              </div>
            </div>
          </div>
        )}

        {/* Shared Media / Files (Mocked) */}
        <div className="p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Shared Files</h4>
          <div className="space-y-3">
             <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 truncate">care_plan_v2.pdf</p>
                  <p className="text-xs text-slate-400">Oct 12 • 2.4 MB</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded bg-purple-50 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 truncate">wound_photo_1.jpg</p>
                  <p className="text-xs text-slate-400">Oct 10 • 1.1 MB</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
