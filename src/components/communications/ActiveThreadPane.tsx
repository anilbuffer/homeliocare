import React, { useState, useRef, useEffect } from "react";
import {
  MoreVertical, Phone, Mail, MessageSquare, AlertCircle,
  Paperclip, Send, Smile, Info, ShieldAlert, Check, CheckCheck, Mic, ChevronLeft, Edit,
  Archive, BellOff, EyeOff, Trash2, X
} from "lucide-react";
import { Conversation, mockMessages, Message, mockContacts, Contact } from "./mockData";
import clsx from "clsx";

interface ActiveThreadPaneProps {
  conversation: Conversation | null;
  onToggleDetails: () => void;
  showDetails: boolean;
  onBack?: () => void;
  isCreatingNew?: boolean;
  onStartNew?: () => void;
}

export function ActiveThreadPane({ conversation, onToggleDetails, showDetails, onBack, isCreatingNew, onStartNew }: ActiveThreadPaneProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<"in-app" | "sms" | "email">("in-app");
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<Contact | null>(null);
  const [isRecipientDropdownOpen, setIsRecipientDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const recipientDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setIsOptionsMenuOpen(false);
      }
      if (recipientDropdownRef.current && !recipientDropdownRef.current.contains(event.target as Node)) {
        setIsRecipientDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (conversation) {
      setMessages(mockMessages[conversation.id] || []);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isCreatingNew) {
    const contactsArray = Object.values(mockContacts);
    const filteredContacts = contactsArray.filter(c =>
      c.name.toLowerCase().includes(recipientSearch.toLowerCase()) ||
      c.role.toLowerCase().includes(recipientSearch.toLowerCase())
    );

    return (
      <div className="flex-1 flex flex-col h-full bg-[#f8fafd] min-w-0 relative">
        <div className="h-14 flex items-center px-4 lg:px-6 border-b border-slate-200/50 bg-[#fcfdfd]/80 backdrop-blur-md sticky top-0 z-20 shrink-0">
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden p-2 mr-2 text-slate-500 hover:bg-slate-100 hover:text-brand-teal rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <h2 className="font-semibold text-slate-900 text-lg">New Message</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] p-6 space-y-6">

            <div ref={recipientDropdownRef}>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">To</label>
              <div className="relative">
                {selectedRecipient ? (
                  <div className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      {selectedRecipient.avatar ? (
                        <img src={selectedRecipient.avatar} alt={selectedRecipient.name} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200 shrink-0">
                          {selectedRecipient.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-slate-800">{selectedRecipient.name}</span>
                        <span className="text-xs text-slate-500 ml-2 bg-slate-200/50 px-1.5 py-0.5 rounded">{selectedRecipient.role}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRecipient(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      value={recipientSearch}
                      onChange={(e) => {
                        setRecipientSearch(e.target.value);
                        setIsRecipientDropdownOpen(true);
                      }}
                      onFocus={() => setIsRecipientDropdownOpen(true)}
                      placeholder="Search patients, family members, or staff..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all placeholder:text-slate-400"
                    />

                    {isRecipientDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)] z-50 p-1 custom-scrollbar">
                        {filteredContacts.length > 0 ? filteredContacts.map(contact => (
                          <button
                            key={contact.id}
                            onClick={() => {
                              setSelectedRecipient(contact);
                              setIsRecipientDropdownOpen(false);
                              setRecipientSearch("");
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg text-left transition-colors"
                          >
                            {contact.avatar ? (
                              <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                                {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-slate-800">{contact.name}</div>
                              <div className="text-xs text-slate-500">{contact.role}</div>
                            </div>
                          </button>
                        )) : (
                          <div className="p-4 text-sm text-slate-500 text-center">No contacts found</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Channel</label>
              <div className="flex flex-wrap gap-3">
                {['In-App', 'SMS', 'Email'].map(channel => (
                  <button
                    key={channel}
                    className={clsx(
                      "px-5 py-2 text-sm font-medium rounded-xl border transition-all",
                      channel === 'In-App'
                        ? "border-brand-teal bg-brand-teal/5 text-brand-teal shadow-[0_2px_10px_-2px_rgba(20,184,166,0.2)]"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
              <textarea
                rows={6}
                placeholder="Type your message here..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all resize-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button className="px-6 py-2.5 bg-brand-teal text-white font-medium rounded-xl shadow-[0_8px_30px_-6px_rgba(20,184,166,0.3)] hover:shadow-[0_12px_40px_-6px_rgba(20,184,166,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white h-full relative overflow-hidden">
        {/* Abstract Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative w-80 h-80 mb-6">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            {/* Background Frame */}
            <rect x="40" y="60" width="220" height="160" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />

            {/* Sidebar Line */}
            <path d="M90 60V220" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" />

            {/* Sidebar Mock Items */}
            <rect x="55" y="80" width="20" height="8" rx="4" fill="#CBD5E1" />
            <rect x="55" y="100" width="16" height="8" rx="4" fill="#E2E8F0" />
            <rect x="55" y="120" width="22" height="8" rx="4" fill="#E2E8F0" />

            {/* Chat Bubble 1 (Left) */}
            <rect x="110" y="90" width="100" height="40" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2" />
            <path d="M110 115L100 120L115 105" fill="white" stroke="#E2E8F0" strokeWidth="2" strokeLinejoin="round" />
            <rect x="125" y="104" width="40" height="4" rx="2" fill="#94A3B8" />
            <rect x="125" y="114" width="60" height="4" rx="2" fill="#CBD5E1" />

            {/* Chat Bubble 2 (Right / Primary) */}
            <rect x="150" y="145" width="90" height="50" rx="12" fill="#F0FDFA" stroke="#CCFBF1" strokeWidth="2" />
            <path d="M240 180L250 185L235 170" fill="#F0FDFA" stroke="#CCFBF1" strokeWidth="2" strokeLinejoin="round" />
            <rect x="165" y="159" width="55" height="4" rx="2" fill="#5EEAD4" />
            <rect x="165" y="169" width="40" height="4" rx="2" fill="#99F6E4" />
            <rect x="165" y="179" width="50" height="4" rx="2" fill="#99F6E4" />

            {/* Selection Cursor */}
            <circle cx="150" cy="180" r="16" fill="#14B8A6" fillOpacity="0.15" />
            <path d="M150 170L145 195L155 188Z" fill="#14B8A6" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />

            {/* Floating Decorative Elements */}
            <circle cx="270" cy="50" r="6" fill="#FBBF24" />
            <circle cx="30" cy="220" r="8" fill="#818CF8" />
            <path d="M250 250L256 238L266 244Z" fill="#F472B6" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mb-3 relative z-10">No conversation selected</h3>
        <p className="text-[15px] text-slate-500 max-w-[320px] text-center leading-relaxed relative z-10 mb-6">
          Select a chat from the sidebar to view the conversation, or start a new message.
        </p>
        <button onClick={onStartNew} className="relative z-10 px-5 py-2.5 bg-brand-teal text-white font-medium rounded-xl shadow-[0_8px_30px_-6px_rgba(20,184,166,0.3)] hover:shadow-[0_12px_40px_-6px_rgba(20,184,166,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Start New Message
        </button>
      </div>
    );
  }

  const primaryParticipant = conversation.participants[0];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId: conversation.id,
      senderId: "me",
      content: inputValue,
      timestamp: "Just now",
      channelMode: selectedChannel,
      deliveryStatus: "sent",
      isInternalNote: false, // Could add a toggle for this in UI
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleAttachment = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // In a real app, add attachment to message composer state
    }, 2000);
  };

  const handleTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
    }, 1500);
  };

  const isPHIWarningVisible = selectedChannel === "sms" && inputValue.toLowerCase().includes("clinical");

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafd] min-w-0 relative">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-2 lg:px-6 border-b border-slate-200/50 bg-[#fcfdfd]/80 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-2 lg:gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-teal rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="relative">
            {primaryParticipant.avatar ? (
              <img src={primaryParticipant.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                {primaryParticipant.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className={clsx(
              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
              primaryParticipant.status === "online" ? "bg-brand-teal" :
                primaryParticipant.status === "away" ? "bg-amber-500" : "bg-slate-400"
            )} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">{conversation.participants.map(p => p.name).join(", ")}</h2>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              {primaryParticipant.role}
              {conversation.linkedRecord && (
                <>
                  <span>•</span>
                  <span className="bg-slate-100 px-1.5 rounded text-slate-600">{conversation.linkedRecord.label}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={onToggleDetails}
            className={clsx(
              "p-2 rounded-lg transition-colors",
              showDetails ? "bg-brand-teal/10 text-brand-teal" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            )}
          >
            <Info className="w-5 h-5" />
          </button>
          <div className="relative" ref={optionsMenuRef}>
            <button
              onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
              className={clsx(
                "p-2 rounded-lg transition-colors",
                isOptionsMenuOpen ? "bg-slate-200 text-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              )}
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isOptionsMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)] border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-teal transition-colors text-left">
                  <Archive className="w-4 h-4" />
                  Archive conversation
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-teal transition-colors text-left">
                  <EyeOff className="w-4 h-4" />
                  Mark as unread
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-teal transition-colors text-left">
                  <BellOff className="w-4 h-4" />
                  Mute notifications
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                  <Trash2 className="w-4 h-4" />
                  Delete conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Escalation Banner */}
      {conversation.isUrgent && (
        <div className="bg-red-50 border-b border-red-100 p-3 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            Escalated — awaiting response
          </div>
          <button className="text-sm text-red-600 hover:text-red-800 font-semibold">
            Resolve
          </button>
        </div>
      )}

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-6 pb-30 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === "me";
          const sender = isMe ? null : mockContacts[msg.senderId] || primaryParticipant;

          return (
            <div key={msg.id} className={clsx("flex gap-3", isMe ? "justify-end" : "justify-start")}>
              {!isMe && (
                sender?.avatar ? (
                  <img src={sender.avatar} alt="" className="w-8 h-8 rounded-full mt-auto shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs mt-auto shrink-0">
                    {sender?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                )
              )}

              <div className={clsx(
                "max-w-[70%]",
                isMe ? "items-end flex flex-col" : "items-start flex flex-col"
              )}>
                {/* Sender Name (if not me) */}
                {!isMe && (
                  <span className="text-xs text-slate-500 mb-1 ml-1">{sender?.name}</span>
                )}

                {/* Bubble */}
                <div className={clsx(
                  "p-3 rounded-2xl relative group shadow-[0_6px_32px_rgba(0,0,0,0.06)]",
                  msg.isInternalNote ? "bg-amber-100 text-amber-900 border border-amber-200 shadow-amber-900/5" :
                    isMe ? "bg-brand-teal text-white rounded-br-sm shadow-brand-teal/20" : "bg-white border border-slate-100 text-slate-800 rounded-bl-sm shadow-slate-200/50"
                )}>
                  {/* Internal Note Label */}
                  {msg.isInternalNote && (
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Internal Note
                    </div>
                  )}

                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>

                  {/* Channel indicator for non-in-app */}
                  {msg.channelMode !== "in-app" && (
                    <div className={clsx(
                      "text-[10px] mt-1 flex items-center gap-1",
                      isMe ? "text-teal-100" : "text-slate-400"
                    )}>
                      {msg.channelMode === "sms" ? <Phone className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                      via {msg.channelMode.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Metadata (Time, Status) */}
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 mx-1">
                  <span>{msg.timestamp}</span>
                  {isMe && (
                    <span>
                      {msg.deliveryStatus === "sent" && <Check className="w-3 h-3" />}
                      {msg.deliveryStatus === "delivered" && <CheckCheck className="w-3 h-3" />}
                      {msg.deliveryStatus === "read" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                      {msg.deliveryStatus === "failed" && <span className="text-red-500">Failed</span>}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer (Floating) */}
      <div className="p-4 shrink-0 bg-gradient-to-t from-[#f8fafd] via-[#f8fafd] to-transparent pt-8 absolute bottom-0 left-0 right-0 z-20">

        {/* PHI Warning */}
        {isPHIWarningVisible && (
          <div className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-800 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <p>This will be sent via SMS, which isn't a secure channel for health information. Consider using in-app messaging instead.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 bg-white border border-slate-200/60 rounded-2xl p-2 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] focus-within:ring-4 focus-within:ring-brand-teal/10 focus-within:border-brand-teal/50 transition-all">

          <div className="flex items-end gap-2 flex-1 min-w-0">
            <button
              onClick={handleAttachment}
              disabled={isUploading}
              className="p-2 shrink-0 text-slate-400 hover:text-brand-teal rounded-lg transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
              ) : (
                <Paperclip className="w-5 h-5" />
              )}
            </button>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 min-w-0 bg-transparent resize-none text-sm p-2 max-h-32 focus:outline-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            {/* Mic and Send (Mobile View - placed inline with input) */}
            <div className="flex sm:hidden items-center gap-1 shrink-0 pb-1">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-brand-teal rounded-lg transition-colors"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controls row (Desktop view inline, Mobile view bottom row) */}
          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-none border-slate-100 sm:pb-1">

            <div className="flex items-center gap-2 px-2 sm:px-0">
              <span className="text-[10px] font-semibold text-slate-400 uppercase sm:hidden tracking-wider">Channel:</span>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value as any)}
                className="text-xs bg-slate-100/80 sm:bg-slate-200 border-none rounded-lg p-1.5 focus:ring-0 text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <option value="in-app">In-App</option>
                <option value="sms">SMS</option>
                <option value="email">Email</option>
              </select>
            </div>

            {/* Mic and Send (Desktop View) */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-brand-teal rounded-lg transition-colors"
              >
                <Mic className="w-5 h-5" />
              </button>

              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
