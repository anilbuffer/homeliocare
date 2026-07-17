"use client";

import React, { useState } from "react";
import { ConversationCategory, mockConversations } from "./mockData";
import { ConversationListPane } from "./ConversationListPane";
import { ActiveThreadPane } from "./ActiveThreadPane";
import { DetailsPane } from "./DetailsPane";
import { AnnouncementsPane } from "./AnnouncementsPane";
import { ChevronLeft } from "lucide-react";

export function CommunicationsLayout() {
  const [activeCategory, setActiveCategory] = useState<ConversationCategory>("Clients");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "thread" | "details">("list");

  const activeConversation = mockConversations.find(c => c.id === activeConversationId) || null;

  const handleSelectCategory = (category: ConversationCategory) => {
    setActiveCategory(category);
    setActiveConversationId(null);
    setMobileView("list");
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setMobileView("thread");
  };

  return (
    <div className="flex h-full overflow-hidden bg-white rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative">

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-full">
        <ConversationListPane
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
        />

        {activeCategory === "Announcements" ? (
          <AnnouncementsPane />
        ) : (
          <ActiveThreadPane
            conversation={activeConversation}
            showDetails={showDetails}
            onToggleDetails={() => setShowDetails(!showDetails)}
          />
        )}

        {activeCategory !== "Announcements" && (
          <DetailsPane
            conversation={activeConversation}
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden w-full h-full relative">
        {mobileView === "list" && (
          <div className="w-full h-full animate-in slide-in-from-left-4">
            <ConversationListPane
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
            />
          </div>
        )}

        {mobileView === "thread" && activeCategory === "Announcements" && (
          <div className="w-full h-full bg-white flex flex-col z-10 animate-in slide-in-from-right-4">
            <div className="p-2 border-b border-slate-200">
              <button onClick={() => setMobileView("list")} className="flex items-center text-brand-teal text-sm font-medium p-2">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to list
              </button>
            </div>
            <AnnouncementsPane />
          </div>
        )}

        {mobileView === "thread" && activeCategory !== "Announcements" && (
          <div className="w-full h-full bg-white flex flex-col z-10 animate-in slide-in-from-right-4">
            <div className="p-2 border-b border-slate-200 flex justify-between items-center">
              <button onClick={() => setMobileView("list")} className="flex items-center text-brand-teal text-sm font-medium p-2">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to list
              </button>
              <button onClick={() => setMobileView("details")} className="text-sm font-medium text-slate-600 p-2">
                Details
              </button>
            </div>
            <ActiveThreadPane
              conversation={activeConversation}
              showDetails={false}
              onToggleDetails={() => setMobileView("details")}
            />
          </div>
        )}

        {mobileView === "details" && activeCategory !== "Announcements" && (
          <div className="w-full h-full bg-white flex flex-col z-20 animate-in slide-in-from-right-4">
            <div className="p-2 border-b border-slate-200">
              <button onClick={() => setMobileView("thread")} className="flex items-center text-brand-teal text-sm font-medium p-2">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to thread
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <DetailsPane
                conversation={activeConversation}
                isOpen={true}
                onClose={() => setMobileView("thread")}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
