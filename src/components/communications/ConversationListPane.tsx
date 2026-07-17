import React from "react";
import { Phone, Mail, MessageSquare, AlertCircle, Search } from "lucide-react";
import { ConversationCategory, mockConversations } from "./mockData";
import { FilterType } from "./CommunicationsLayout";
import clsx from "clsx";

interface ConversationListPaneProps {
  activeCategory: ConversationCategory | "All";
  activeFilter: FilterType;
  searchQuery: string;
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onOpenSidebar?: () => void;
}

export function ConversationListPane({
  activeCategory,
  activeFilter,
  searchQuery,
  activeConversationId,
  onSelectConversation,
  onOpenSidebar
}: ConversationListPaneProps) {

  const filteredConversations = mockConversations.filter(c => {
    // If we are looking at announcements, only show announcements
    if (activeCategory === "Announcements" && c.categoryId !== "Announcements") return false;
    
    // If a specific category is selected, filter by it.
    if (activeCategory !== "All" && c.categoryId !== activeCategory) return false;

    // Apply global filters
    if (activeFilter === "Unread" && c.unreadCount === 0) return false;
    if (activeFilter === "Mentions") { /* Add logic for mentions if needed */ }
    if (activeFilter === "Archived") { /* Add logic for archived if needed */ }

    // Basic search simulation
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = c.participants.some(p => p.name.toLowerCase().includes(q)) ||
        c.lastMessage.content.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#fcfdfd] border-r border-slate-200/50 w-full sm:w-[360px] shrink-0">
      
      {/* Dynamic Header */}
      <div className="p-5 bg-[#fcfdfd]/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onOpenSidebar && (
            <button 
              onClick={onOpenSidebar}
              className="xl:hidden p-2 -ml-2 text-slate-500 hover:text-brand-teal hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}
          <h2 className="text-[17px] font-semibold text-slate-800">
            {activeCategory !== "All" ? activeCategory : activeFilter === "All" ? "Home" : activeFilter}
          </h2>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <Search className="w-5 h-5 opacity-50" />
              </div>
              <p className="text-sm font-medium">No conversations found.</p>
            </div>
          ) : (
            filteredConversations.map(conv => {
              const primaryParticipant = conv.participants[0];
              const isActive = activeConversationId === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={clsx(
                    "w-full text-left p-3.5 rounded-2xl transition-all duration-300 relative group border",
                    isActive 
                      ? "bg-white border-brand-teal/20 shadow-[0_8px_30px_-6px_rgba(20,184,166,0.12)] scale-[1.02] z-10" 
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-100 hover:shadow-sm"
                  )}
                >
                  {/* Indicator Line for Active */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-brand-teal rounded-r-full" />
                  )}

                  <div className="flex gap-3.5 items-start">
                    {/* Premium Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-slate-200 to-slate-100 group-hover:from-brand-teal/20 group-hover:to-brand-teal/10 transition-colors">
                        <img
                          src={primaryParticipant.avatar}
                          alt={primaryParticipant.name}
                          className="w-full h-full rounded-full object-cover border border-white"
                        />
                      </div>
                      <div className={clsx(
                        "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[2.5px] border-white shadow-sm",
                        primaryParticipant.status === "online" ? "bg-emerald-500" :
                          primaryParticipant.status === "away" ? "bg-amber-400" : "bg-slate-300"
                      )} />
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      {/* Name & Time */}
                      <div className="flex justify-between items-center mb-1">
                        <div className={clsx(
                          "font-semibold truncate pr-2 transition-colors",
                          isActive ? "text-brand-teal" : "text-slate-900"
                        )}>
                          {conv.participants.map(p => p.name).join(", ")}
                        </div>
                        <span className={clsx(
                          "text-[11px] whitespace-nowrap font-medium",
                          conv.unreadCount > 0 ? "text-brand-teal" : "text-slate-400"
                        )}>
                          {conv.lastMessage.timestamp}
                        </span>
                      </div>

                      {/* Role & Badges */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[11px] font-medium text-slate-500">
                          {primaryParticipant.role}
                        </span>
                        
                        {conv.isUrgent && (
                          <span className="flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-md">
                            <AlertCircle className="w-3 h-3" /> Urgent
                          </span>
                        )}
                        {conv.linkedRecord && (
                          <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md truncate max-w-[100px] border border-slate-200">
                            {conv.linkedRecord.label}
                          </span>
                        )}
                      </div>

                      {/* Message Preview & Unread Count */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-1.5 min-w-0">
                          {conv.lastMessage.channelMode === "sms" && <Phone className="w-3 h-3 text-slate-400 shrink-0" />}
                          {conv.lastMessage.channelMode === "email" && <Mail className="w-3 h-3 text-slate-400 shrink-0" />}
                          {conv.lastMessage.channelMode === "in-app" && <MessageSquare className="w-3 h-3 text-slate-400 shrink-0" />}
                          <p className={clsx(
                            "text-sm truncate leading-snug",
                            conv.unreadCount > 0 ? "font-medium text-slate-800" : "text-slate-500"
                          )}>
                            {conv.lastMessage.content}
                          </p>
                        </div>
                        
                        {conv.unreadCount > 0 && (
                          <div className="shrink-0 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-brand-teal text-white text-[11px] font-bold rounded-full shadow-sm shadow-brand-teal/30">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
    </div>
  );
}
