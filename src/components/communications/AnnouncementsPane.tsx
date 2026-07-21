import React, { useState } from "react";
import { Megaphone, Plus, Users, Calendar, CheckSquare, BarChart } from "lucide-react";
import { mockAnnouncements } from "./mockData";

export function AnnouncementsPane() {
  const [isComposing, setIsComposing] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 min-w-0">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Announcements</h2>
            <p className="text-xs text-slate-500">Agency-wide broadcasts and updates</p>
          </div>
        </div>
        <button
          onClick={() => setIsComposing(true)}
          className="flex items-center gap-1 px-3 py-2 bg-brand-teal text-white text-xs font-medium rounded-lg hover:bg-brand-teal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">

        {isComposing ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">Create New Announcement</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g., Holiday Schedule Update"
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Audience</label>
                <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition-all">
                  <option>All Staff</option>
                  <option>All Families</option>
                  <option>Caregivers Only</option>
                  <option>Nurses Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  rows={5}
                  placeholder="Type your announcement here..."
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="req-ack" className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal" />
                <label htmlFor="req-ack" className="text-sm text-slate-700">Require acknowledgment (track read receipts)</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsComposing(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsComposing(false)}
                className="px-6 py-2 bg-brand-teal text-white text-sm font-medium rounded-lg hover:bg-brand-teal/90 transition-colors"
              >
                Send Broadcast
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-4">
            {mockAnnouncements.map(announcement => (
              <div key={announcement.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-800 text-base">{announcement.title}</h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <Calendar className="w-3 h-3" />
                    {announcement.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-2 whitespace-pre-wrap">{announcement.content}</p>

                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-full">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    Audience: {announcement.audience}
                  </div>

                  {announcement.requiresAcknowledgment && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-full">
                      <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
                      Requires Acknowledgment
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 ml-auto">
                    <BarChart className="w-4 h-4 text-brand-teal" />
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-teal rounded-full" style={{ width: `${announcement.readRate}%` }} />
                    </div>
                    <span>{announcement.readRate}% Read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
