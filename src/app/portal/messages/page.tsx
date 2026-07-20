"use client";

import React, { useState, useRef, useEffect } from "react";
import { messageThreads, careTeam } from "@/lib/portalMockData";
import { Send, Phone, Info, Image as ImageIcon, Paperclip, Mic, Check, CheckCheck, Edit, ChevronLeft, X, User } from "lucide-react";
import clsx from "clsx";

export default function PortalMessagesPage() {
  const [threads, setThreads] = useState(messageThreads);
  const [activeThreadId, setActiveThreadId] = useState(threads[0]?.id);
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeThread?.messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeThreadId) return;

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: inputValue.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messages: [
            ...t.messages,
            { sender: "Linda Alvarez", text: inputValue.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isOwn: true }
          ]
        };
      }
      return t;
    }));
    setInputValue("");
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeThreadId) {
      setThreads(prev => prev.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            lastMessage: `[File: ${file.name}]`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            messages: [
              ...t.messages,
              { sender: "Linda Alvarez", text: `[File attached: ${file.name}]`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isOwn: true }
            ]
          };
        }
        return t;
      }));
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      if (activeThreadId) {
        setThreads(prev => prev.map(t => {
          if (t.id === activeThreadId) {
            return {
              ...t,
              lastMessage: `[Voice Message]`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              messages: [
                ...t.messages,
                { sender: "Linda Alvarez", text: `[Voice Message - 0:05]`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isOwn: true }
              ]
            };
          }
          return t;
        }));
      }
    } else {
      setIsRecording(true);
    }
  };

  const handleStartNewChat = (member: typeof careTeam[0]) => {
    // Check if thread already exists
    const existingThread = threads.find(t => t.careTeamMember === member.name);
    if (existingThread) {
      setActiveThreadId(existingThread.id);
    } else {
      const newThread = {
        id: `thread-${Date.now()}`,
        careTeamMember: member.name,
        photo: member.photo,
        lastMessage: "Started a new conversation",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: 0,
        messages: []
      };
      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
    }
    setShowNewMessageModal(false);
    setShowListOnMobile(false);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4 lg:mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
          <p className="text-xs text-text-secondary mt-1">Communicate directly with your care team.</p>
        </div>
        <a href="tel:555-123-4567" className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl font-medium text-sm transition-colors border border-amber-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <Phone className="w-4 h-4" />
          Need urgent help?
        </a>
      </div>

      {/* Out of hours notice */}
      <div className="bg-blue-50/80 backdrop-blur-sm text-blue-700 p-3 rounded-xl flex items-center gap-3 text-sm mb-6 shrink-0 border border-blue-100/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <Info className="w-5 h-5 shrink-0 text-blue-500" />
        <p>Your care team typically responds within 2 hours during business hours (9am-5pm). For urgent needs, call (555) 123-4567.</p>
      </div>

      <div className="flex-1 backdrop-blur-xl bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle flex overflow-hidden relative">
        {/* Thread List */}
        <div className={clsx(
          "w-full sm:w-[320px] bg-[#fcfdfd] border-r border-slate-200/50 flex flex-col shrink-0",
          !showListOnMobile && "hidden sm:flex"
        )}>
          <div className="px-4 py-3 bg-[#fcfdfd]/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-10 flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-slate-800">Recent</h2>
            <button onClick={() => setShowNewMessageModal(true)} className="p-2 text-brand-teal hover:bg-brand-teal/10 rounded-full transition-colors flex items-center justify-center group relative" title="New Message">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
            {threads.map(thread => {
              const isActive = activeThreadId === thread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setShowListOnMobile(false);
                  }}
                  className={clsx(
                    "w-full text-left p-3.5 rounded-2xl transition-all duration-300 relative group border",
                    isActive
                      ? "bg-white border-brand-teal/20 shadow-[0_8px_30px_-6px_rgba(20,184,166,0.12)] scale-[1.02] z-10"
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-100 hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-brand-teal rounded-r-full" />
                  )}
                  <div className="flex gap-3.5 items-start">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-slate-200 to-slate-100 group-hover:from-brand-teal/20 group-hover:to-brand-teal/10 transition-colors">
                        <img src={thread.photo} alt={thread.careTeamMember} className="w-full h-full rounded-full object-cover border border-white" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[2.5px] border-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] bg-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex justify-between items-center mb-1">
                        <div className={clsx(
                          "font-semibold text-sm truncate pr-2 transition-colors",
                          isActive ? "text-brand-teal" : "text-slate-900"
                        )}>
                          {thread.careTeamMember}
                        </div>
                        <span className="text-[11px] text-slate-400 whitespace-nowrap font-medium">
                          {thread.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate leading-snug">
                        {thread.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        {activeThread && (
          <div className={clsx(
            "flex-1 flex flex-col h-full bg-[#f8fafd] min-w-0 relative",
            showListOnMobile && "hidden sm:flex"
          )}>
            <div className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-slate-200/50 bg-[#fcfdfd]/80 backdrop-blur-md sticky top-0 z-20 shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowListOnMobile(true)} className="sm:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Back to messages">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img src={activeThread.photo} alt={activeThread.careTeamMember} className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-brand-teal" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{activeThread.careTeamMember}</h2>
                  <div className="text-xs text-brand-teal flex items-center gap-1 font-medium">
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInfoPanel(!showInfoPanel)}
                  className={clsx(
                    "p-2 rounded-lg transition-colors",
                    showInfoPanel ? "text-brand-teal bg-brand-teal/10" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 flex flex-col min-w-0 relative">
                <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-6 pb-36 space-y-6 custom-scrollbar">
                  {activeThread.messages.map((msg, idx) => (
                    <div key={idx} className={clsx("flex gap-3", msg.isOwn ? "justify-end" : "justify-start")}>
                      {!msg.isOwn && (
                        <img src={activeThread.photo} alt="" className="w-8 h-8 rounded-full mt-auto" />
                      )}
                      <div className={clsx(
                        "max-w-[70%]",
                        msg.isOwn ? "items-end flex flex-col" : "items-start flex flex-col"
                      )}>
                        {!msg.isOwn && (
                          <span className="text-xs text-slate-500 mb-1 ml-1">{activeThread.careTeamMember}</span>
                        )}
                        <div className={clsx(
                          "p-3 rounded-2xl relative group shadow-[0_6px_32px_rgba(0,0,0,0.06)]",
                          msg.isOwn ? "bg-brand-teal text-white rounded-br-sm shadow-brand-teal/20" : "bg-white border border-slate-100 text-slate-800 rounded-bl-sm shadow-slate-200/50"
                        )}>
                          <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 mx-1">
                          <span>{msg.time}</span>
                          {msg.isOwn && <CheckCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Composer (Floating) */}
                <div className="p-4 shrink-0 bg-gradient-to-t from-[#f8fafd] via-[#f8fafd] to-transparent pt-8 absolute bottom-0 left-0 right-0 z-20">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 bg-white border border-slate-200/60 rounded-2xl p-2 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] focus-within:ring-4 focus-within:ring-brand-teal/10 focus-within:border-brand-teal/50 transition-all">
                    <div className="flex items-end gap-2 flex-1 min-w-0">
                      <input type="file" ref={fileInputRef} hidden onChange={handleAttachment} />
                      <button onClick={() => fileInputRef.current?.click()} className="p-2 shrink-0 text-slate-400 hover:text-brand-teal rounded-lg transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type a message..."
                        className="flex-1 min-w-0 bg-transparent resize-none text-sm p-2 max-h-32 focus:outline-none placeholder:text-slate-400"
                        rows={1}
                      />
                      <div className="flex sm:hidden items-center gap-1 shrink-0 pb-1">
                        <button
                          type="button"
                          onClick={handleMicClick}
                          className={clsx("p-2 rounded-lg transition-colors", isRecording ? "text-red-500 bg-red-50" : "text-slate-400 hover:text-brand-teal")}
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                        <button onClick={handleSendMessage} className="p-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-end gap-1 pt-2 sm:pt-0 sm:pb-1">
                      <button
                        type="button"
                        onClick={handleMicClick}
                        className={clsx("p-2 rounded-lg transition-colors", isRecording ? "text-red-500 bg-red-50" : "text-slate-400 hover:text-brand-teal")}
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      <button onClick={handleSendMessage} className="p-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              {showInfoPanel && (
                <div className="w-64 border-l border-slate-200/50 bg-[#fcfdfd] shrink-0 flex flex-col">
                  <div className="px-4 py-3 border-b border-slate-200/50 flex items-center justify-between">
                    <h3 className="font-medium text-slate-900">Details</h3>
                    <button onClick={() => setShowInfoPanel(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="px-4 py-3 flex flex-col items-center text-center border-b border-slate-200/50">
                    <img src={activeThread.photo} alt={activeThread.careTeamMember} className="w-20 h-20 rounded-full object-cover mb-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" />
                    <h3 className="font-semibold text-slate-900">{activeThread.careTeamMember}</h3>
                    <p className="text-xs text-brand-teal mt-1">Care Team Member</p>
                  </div>
                  <div className="p-4 flex-1 overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">Availability</p>
                        <p className="text-sm text-slate-700">Mon-Fri, 9:00 AM - 5:00 PM</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">Role</p>
                        <p className="text-sm text-slate-700">Primary Caregiver</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-semibold text-slate-900">New Message</h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-500 mb-4 font-medium">Select a care team member to start a chat</p>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {careTeam.map(member => (
                  <button
                    key={member.id}
                    onClick={() => handleStartNewChat(member)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 hover:border-slate-100 text-left"
                  >
                    <img src={member.photo} alt={member.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                    <div>
                      <div className="font-medium text-slate-900">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
