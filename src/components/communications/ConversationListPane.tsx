import React, { useState } from "react";
import { Search, Filter, BellRing, Phone, Mail, MessageSquare, AlertCircle, Users, Heart, Users2, Shield, Megaphone } from "lucide-react";
import { Conversation, ConversationCategory, mockConversations } from "./mockData";
import clsx from "clsx";

interface ConversationListPaneProps {
  activeCategory: ConversationCategory;
  onSelectCategory: (category: ConversationCategory) => void;
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const CATEGORIES: { id: ConversationCategory, icon: React.ReactNode }[] = [
  { id: "Clients", icon: <Users className="w-4 h-4" /> },
  { id: "Family Members", icon: <Heart className="w-4 h-4" /> },
  { id: "Staff & Caregivers", icon: <Users2 className="w-4 h-4" /> },
  { id: "Care Team Channels", icon: <Shield className="w-4 h-4" /> },
  { id: "Announcements", icon: <Megaphone className="w-4 h-4" /> }
];

export function ConversationListPane({
  activeCategory,
  onSelectCategory,
  activeConversationId,
  onSelectConversation
}: ConversationListPaneProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Unread" | "Mentions" | "Muted" | "Archived">("All");

  const filteredConversations = mockConversations.filter(c => {
    if (activeCategory === "Announcements") return false; // Handled separately
    if (c.categoryId !== activeCategory) return false;
    if (activeFilter === "Unread" && c.unreadCount === 0) return false;

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
    <div className="flex flex-col h-full bg-slate-50/50 border-r border-slate-200 w-full sm:w-[360px] shrink-0">
      
      {/* Header & Search Area */}
      <div className="p-5 bg-white border-b border-slate-200/60 sticky top-0 z-10 space-y-4">
        
        {/* Category Selector (Modern Dropdown/Scrollable Tabs) */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
                activeCategory === category.id
                  ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              )}
            >
              <span className={clsx("opacity-80", activeCategory === category.id ? "text-white" : "text-slate-500")}>
                {category.icon}
              </span>
              {category.id}
            </button>
          ))}
        </div>

        {activeCategory !== "Announcements" && (
          <div className="space-y-4">
            {/* Elegant Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border-transparent rounded-xl text-sm 
                           placeholder:text-slate-400 text-slate-800
                           focus:bg-white focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 
                           transition-all outline-none"
              />
            </div>

            {/* Subtle Filters */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {["All", "Unread", "Mentions", "Muted", "Archived"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as any)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all",
                    activeFilter === f
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-200/70 hover:text-slate-700"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversation List */}
      {activeCategory !== "Announcements" && (
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
                    "w-full text-left p-3.5 rounded-2xl transition-all duration-200 relative group border",
                    isActive 
                      ? "bg-white border-brand-teal/30 shadow-[0_4px_20px_-4px_rgba(20,184,166,0.15)]" 
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm"
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
      )}
    </div>
  );
}
