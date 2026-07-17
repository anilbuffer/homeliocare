import React, { useState } from "react";
import { Search, Filter, BellRing, Phone, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { Conversation, ConversationCategory, mockConversations } from "./mockData";
import clsx from "clsx";

interface ConversationListPaneProps {
  activeCategory: ConversationCategory;
  onSelectCategory: (category: ConversationCategory) => void;
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const CATEGORIES: ConversationCategory[] = [
  "Clients",
  "Family Members",
  "Staff & Caregivers",
  "Care Team Channels",
  "Announcements"
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
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-full sm:w-[320px] shrink-0">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar pt-2 px-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={clsx(
              "px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              activeCategory === category
                ? "border-brand-teal text-brand-teal"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {activeCategory !== "Announcements" && (
        <>
          {/* Search & Filters */}
          <div className="p-4 space-y-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {["All", "Unread", "Mentions", "Muted", "Archived"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as any)}
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                    activeFilter === f
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                No conversations found.
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
                      "w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors flex gap-3 relative",
                      isActive && "bg-slate-50"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-teal" />
                    )}
                    
                    {/* Avatar with Presence */}
                    <div className="relative shrink-0">
                      <img
                        src={primaryParticipant.avatar}
                        alt={primaryParticipant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={clsx(
                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                        primaryParticipant.status === "online" ? "bg-brand-teal" :
                        primaryParticipant.status === "away" ? "bg-amber-500" : "bg-slate-400"
                      )} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <div className="font-medium text-slate-900 truncate pr-2">
                          {conv.participants.map(p => p.name).join(", ")}
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {conv.lastMessage.timestamp}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs text-slate-500 truncate">
                          {primaryParticipant.role}
                        </span>
                        {conv.isUrgent && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            <AlertCircle className="w-3 h-3" /> URGENT
                          </span>
                        )}
                        {conv.linkedRecord && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded truncate">
                            {conv.linkedRecord.label}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {conv.lastMessage.channelMode === "sms" && <Phone className="w-3 h-3 text-slate-400" />}
                        {conv.lastMessage.channelMode === "email" && <Mail className="w-3 h-3 text-slate-400" />}
                        {conv.lastMessage.channelMode === "in-app" && <MessageSquare className="w-3 h-3 text-slate-400" />}
                        <p className="text-sm text-slate-600 truncate flex-1">
                          {conv.lastMessage.content}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="bg-brand-teal text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
