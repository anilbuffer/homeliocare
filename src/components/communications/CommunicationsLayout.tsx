"use client";

import React, { useState } from "react";
import { ConversationCategory, mockConversations } from "./mockData";
import { ConversationListPane } from "./ConversationListPane";
import { ActiveThreadPane } from "./ActiveThreadPane";
import { DetailsPane } from "./DetailsPane";
import { AnnouncementsPane } from "./AnnouncementsPane";
import { ChevronLeft, Search, Inbox, AtSign, BellOff, Archive, Users, Heart, Users2, Shield, Megaphone } from "lucide-react";
import clsx from "clsx";

export type FilterType = "All" | "Unread" | "Mentions" | "Muted" | "Archived";

export function CommunicationsLayout() {
  const [activeCategory, setActiveCategory] = useState<ConversationCategory | "All">("All");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "thread" | "details">("list");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const activeConversation = mockConversations.find(c => c.id === activeConversationId) || null;

  const handleSelectCategory = (category: ConversationCategory | "All") => {
    setActiveCategory(category);
    setActiveFilter("All");
    setActiveConversationId(null);
    setMobileView("list");
    setIsMobileSidebarOpen(false);
  };

  const handleSelectFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    setActiveCategory("All");
    setActiveConversationId(null);
    setMobileView("list");
    setIsMobileSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setMobileView("thread");
  };

  const CATEGORIES: { id: ConversationCategory, icon: React.ReactNode }[] = [
    { id: "Clients", icon: <Users className="w-4 h-4" /> },
    { id: "Family Members", icon: <Heart className="w-4 h-4" /> },
    { id: "Staff & Caregivers", icon: <Users2 className="w-4 h-4" /> },
    { id: "Care Team Channels", icon: <Shield className="w-4 h-4" /> },
    { id: "Announcements", icon: <Megaphone className="w-4 h-4" /> }
  ];

  const FILTERS: { id: FilterType, label: string, icon: React.ReactNode }[] = [
    { id: "All", label: "Home", icon: <Inbox className="w-4 h-4" /> },
    { id: "Unread", label: "Unread", icon: <Inbox className="w-4 h-4" /> },
    { id: "Mentions", label: "Mentions", icon: <AtSign className="w-4 h-4" /> },
    { id: "Muted", label: "Muted", icon: <BellOff className="w-4 h-4" /> },
    { id: "Archived", label: "Archived", icon: <Archive className="w-4 h-4" /> }
  ];

  return (
    <div className="flex h-full overflow-hidden bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] relative">

      {/* MOBILE SIDEBAR BACKDROP */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 xl:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR (Responsive: Fixed Drawer on Mobile/Tablet/Small Laptop, Static Pane on Desktop) */}
      <div className={clsx(
        "bg-slate-50/80 backdrop-blur-3xl border-r border-slate-200/50 flex flex-col shrink-0 transition-transform duration-300 z-50",
        "w-[280px] xl:w-[260px]",
        "fixed inset-y-0 left-0 h-full xl:relative xl:h-auto xl:translate-x-0",
        isMobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full xl:translate-x-0"
      )}>
           <div className="p-5 h-full overflow-y-auto custom-scrollbar">
             
             {/* Mobile Close Button */}
             <div className="flex xl:hidden justify-end mb-2 -mt-2 -mr-2">
               <button 
                 onClick={() => setIsMobileSidebarOpen(false)}
                 className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <line x1="18" y1="6" x2="6" y2="18"></line>
                   <line x1="6" y1="6" x2="18" y2="18"></line>
                 </svg>
               </button>
             </div>

             {/* Search Bar */}
             <div className="relative group mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search chat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-200/50 border-transparent rounded-full text-sm 
                             placeholder:text-slate-500 text-slate-800
                             focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 
                             transition-all outline-none"
                />
              </div>

              {/* Shortcuts / Filters */}
              <div className="mb-6">
                <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Shortcuts</h3>
                <div className="space-y-0.5">
                  {FILTERS.map(f => {
                    const isActive = activeFilter === f.id && activeCategory === "All";
                    return (
                      <button
                        key={f.id}
                        onClick={() => handleSelectFilter(f.id)}
                        className={clsx(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                          isActive 
                            ? "bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] text-brand-teal ring-1 ring-brand-teal/10" 
                            : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                        )}
                      >
                        <span className={clsx("transition-colors", isActive ? "text-brand-teal" : "text-slate-400 group-hover:text-slate-500")}>
                          {f.icon}
                        </span>
                        {f.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Categories / Spaces */}
              <div>
                <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Spaces & Categories</h3>
                <div className="space-y-0.5">
                  {CATEGORIES.map(c => {
                    const isActive = activeCategory === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleSelectCategory(c.id)}
                        className={clsx(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                          isActive 
                            ? "bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] text-brand-teal ring-1 ring-brand-teal/10" 
                            : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                        )}
                      >
                        <span className={clsx("transition-colors", isActive ? "text-brand-teal" : "text-slate-400 group-hover:text-slate-500")}>
                          {c.icon}
                        </span>
                        {c.id}
                      </button>
                    )
                  })}
                </div>
              </div>
           </div>
        </div>

        {/* MIDDLE LIST (Hidden on mobile when thread is open) */}
        <div className={clsx(
          "w-full lg:w-auto h-full shrink-0 flex flex-col transition-all duration-300 bg-white",
          "lg:flex", 
          mobileView === "list" ? "flex" : "hidden"
        )}>
          <ConversationListPane
            activeCategory={activeCategory}
            activeFilter={activeFilter}
            searchQuery={searchQuery}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onOpenSidebar={() => setIsMobileSidebarOpen(true)}
          />
        </div>

        {/* RIGHT PANE (Thread) */}
        <div className={clsx(
          "flex-1 h-full min-w-0 bg-white relative transition-all duration-300",
          "lg:flex",
          mobileView === "thread" ? "flex" : "hidden"
        )}>
          {activeCategory === "Announcements" ? (
            <AnnouncementsPane />
          ) : (
            <ActiveThreadPane
              conversation={activeConversation}
              showDetails={showDetails}
              onToggleDetails={() => {
                setShowDetails(!showDetails);
                if (!showDetails) setMobileView("details");
              }}
              onBack={() => setMobileView("list")}
            />
          )}
        </div>

        {/* FAR RIGHT (Details) */}
        {activeCategory !== "Announcements" && (
          <div className={clsx(
            "h-full bg-white border-l border-slate-200 transition-all duration-300",
            "lg:block z-30",
            showDetails ? "lg:w-[320px] xl:w-[380px]" : "lg:w-0 lg:border-l-0 overflow-hidden",
            mobileView === "details" ? "fixed inset-0 w-full" : "hidden lg:block"
          )}>
            
            {/* Mobile Details Back Button */}
            {mobileView === "details" && (
              <div className="lg:hidden p-4 border-b border-slate-200 flex items-center bg-white sticky top-0 z-10">
                <button 
                  onClick={() => {
                    setMobileView("thread");
                    setShowDetails(false);
                  }} 
                  className="flex items-center text-slate-500 hover:text-brand-teal text-sm font-medium"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Back to chat
                </button>
              </div>
            )}

            <div className="h-full overflow-y-auto">
              <DetailsPane
                conversation={activeConversation}
                isOpen={showDetails || mobileView === "details"}
                onClose={() => {
                  setShowDetails(false);
                  if (mobileView === "details") setMobileView("thread");
                }}
              />
            </div>
          </div>
        )}
    </div>
  );
}
