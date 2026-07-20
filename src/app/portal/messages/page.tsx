"use client";

import React, { useState } from "react";
import { messageThreads } from "@/lib/portalMockData";
import { Send, Phone, Info, Image as ImageIcon } from "lucide-react";

export default function PortalMessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState(messageThreads[0].id);
  
  const activeThread = messageThreads.find(t => t.id === activeThreadId);

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Messages</h1>
          <p className="text-sm text-text-secondary mt-1">Communicate directly with your care team.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl font-medium text-sm transition-colors border border-amber-200">
          <Phone className="w-4 h-4" />
          Need urgent help?
        </button>
      </div>

      {/* Out of hours notice */}
      <div className="bg-blue-50 text-blue-700 p-3 rounded-xl flex items-center gap-3 text-sm mb-6 shrink-0 border border-blue-100">
        <Info className="w-5 h-5 shrink-0" />
        <p>Your care team typically responds within 2 hours during business hours (9am-5pm). For urgent needs, call (555) 123-4567.</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle flex overflow-hidden">
        {/* Thread List */}
        <div className="w-1/3 border-r border-border-subtle overflow-y-auto">
          {messageThreads.map(thread => (
            <button
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={`w-full text-left p-4 border-b border-border-subtle transition-colors ${
                activeThreadId === thread.id ? "bg-slate-50" : "hover:bg-slate-50/50"
              }`}
            >
              <div className="flex gap-3">
                <img src={thread.photo} alt={thread.careTeamMember} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-medium text-text-primary text-sm truncate">{thread.careTeamMember}</span>
                    <span className="text-xs text-text-secondary shrink-0">{thread.time}</span>
                  </div>
                  <p className="text-sm text-text-secondary truncate">{thread.lastMessage}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Chat Area */}
        {activeThread && (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border-subtle flex items-center gap-3 bg-white">
              <img src={activeThread.photo} alt={activeThread.careTeamMember} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-medium text-text-primary">{activeThread.careTeamMember}</div>
                <div className="text-xs text-brand-teal flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-teal inline-block" />
                  Online
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {activeThread.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.isOwn 
                      ? 'bg-brand-teal text-white rounded-br-sm' 
                      : 'bg-white border border-border-subtle text-text-primary rounded-bl-sm shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${msg.isOwn ? 'text-teal-100' : 'text-text-secondary'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-border-subtle">
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-border-subtle rounded-full text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-teal text-white rounded-full hover:bg-teal-600 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
