import React, { useState, useRef, useEffect } from "react";
import { 
  MoreVertical, Phone, Mail, MessageSquare, AlertCircle, 
  Paperclip, Send, Smile, Info, ShieldAlert, Check, CheckCheck
} from "lucide-react";
import { Conversation, mockMessages, Message, mockContacts } from "./mockData";
import clsx from "clsx";

interface ActiveThreadPaneProps {
  conversation: Conversation | null;
  onToggleDetails: () => void;
  showDetails: boolean;
}

export function ActiveThreadPane({ conversation, onToggleDetails, showDetails }: ActiveThreadPaneProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<"in-app" | "sms" | "email">("in-app");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation) {
      setMessages(mockMessages[conversation.id] || []);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
        <MessageSquare className="w-16 h-16 mb-4 text-slate-300" />
        <p>Select a conversation to start messaging</p>
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
    <div className="flex-1 flex flex-col h-full bg-slate-50 min-w-0">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={primaryParticipant.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
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
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <MoreVertical className="w-5 h-5" />
          </button>
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
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === "me";
          const sender = isMe ? null : mockContacts[msg.senderId] || primaryParticipant;

          return (
            <div key={msg.id} className={clsx("flex gap-3", isMe ? "justify-end" : "justify-start")}>
              {!isMe && (
                <img src={sender?.avatar} alt="" className="w-8 h-8 rounded-full mt-auto" />
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
                  "p-3 rounded-2xl relative group",
                  msg.isInternalNote ? "bg-amber-100 text-amber-900 border border-amber-200" :
                  isMe ? "bg-brand-teal text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
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

      {/* Composer */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        
        {/* PHI Warning */}
        {isPHIWarningVisible && (
          <div className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <p>This will be sent via SMS, which isn't a secure channel for health information. Consider using in-app messaging instead.</p>
          </div>
        )}

        <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-brand-teal/20 focus-within:border-brand-teal transition-all">
          
          <div className="flex flex-col gap-2">
             <button 
                onClick={handleAttachment}
                disabled={isUploading}
                className="p-2 text-slate-400 hover:text-brand-teal rounded-lg transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Paperclip className="w-5 h-5" />
                )}
              </button>
          </div>

          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-transparent resize-none text-sm p-2 max-h-32 focus:outline-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          <div className="flex items-center gap-2 pb-1">
            {primaryParticipant.preferredLanguage && (
               <button 
                  onClick={handleTranslate}
                  className="text-xs font-medium text-brand-teal px-2 py-1 rounded hover:bg-brand-teal/10 transition-colors"
                >
                  {isTranslating ? "Translating..." : "Translate"}
                </button>
            )}
           
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value as any)}
              className="text-xs bg-slate-200 border-none rounded p-1.5 focus:ring-0 text-slate-700"
            >
              <option value="in-app">In-App</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
            
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
  );
}
