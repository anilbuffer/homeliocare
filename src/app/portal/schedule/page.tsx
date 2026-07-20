"use client";

import React, { useState } from "react";
import { upcomingVisits, todaysVisit, careTeam } from "@/lib/portalMockData";
import { CalendarDays, Clock, User, MessageSquare, Plus, ChevronRight, CalendarCheck, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortalSchedulePage() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [panelType, setPanelType] = useState<'visit' | 'change-request' | null>(null);

  // Helper to get caregiver photo
  const getCaregiverPhoto = (name: string) => {
    const member = careTeam.find(c => c.name === name);
    return member?.photo || "https://i.pravatar.cc/150?u=default";
  };

  const handleOpenVisit = (visit: any, isToday: boolean = false) => {
    setSelectedItem({ ...visit, isToday });
    setPanelType('visit');
  };

  const closePanel = () => {
    setPanelType(null);
    setTimeout(() => setSelectedItem(null), 300); // wait for animation
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Schedule</h1>
          <p className="text-xs text-text-secondary mt-1">
            View upcoming care visits and coordinate with the care team.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPanelType('change-request')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border-subtle hover:bg-slate-50 text-text-primary rounded-xl text-sm font-medium transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4" />
            Request Change
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Today's Visit (if applicable) */}
        <section>
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 pl-1 border-b border-border-subtle pb-2">
            Today
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => handleOpenVisit(todaysVisit, true)}
            className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-brand-teal/20 cursor-pointer hover:border-brand-teal/50 transition-colors group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full -mr-10 -mt-10 blur-xl group-hover:bg-brand-teal/10 transition-colors"></div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#E6F7F1] text-brand-teal text-xs font-semibold rounded-full flex items-center gap-1.5">
                    <CalendarCheck className="w-3.5 h-3.5" />
                    {todaysVisit.status === 'Scheduled' ? 'Upcoming Today' : todaysVisit.status}
                  </span>
                  <span className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {todaysVisit.timeWindow}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  Visit with {todaysVisit.caregiver.name}
                </h3>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-border-subtle group-hover:bg-white transition-colors">
                <img
                  src={todaysVisit.caregiver.photo}
                  alt={todaysVisit.caregiver.name}
                  className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white"
                />
                <div>
                  <div className="font-medium text-text-primary text-sm">{todaysVisit.caregiver.name}</div>
                  <div className="text-xs text-text-secondary">Primary Caregiver</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Upcoming Visits */}
        <section>
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 pl-1 border-b border-border-subtle pb-2 mt-8">
            Upcoming
          </h2>

          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle overflow-hidden">
            <div className="divide-y divide-border-subtle">
              {upcomingVisits.map((visit, index) => (
                <motion.div
                  key={visit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOpenVisit(visit)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-3 w-48">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary text-sm">{visit.date}</div>
                        <div className="text-xs text-text-secondary mt-0.5 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {visit.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={getCaregiverPhoto(visit.caregiverName)}
                        alt={visit.caregiverName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-sm font-medium text-slate-700">{visit.caregiverName}</span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-teal transition-colors" />
                </motion.div>
              ))}
            </div>

            {upcomingVisits.length === 0 && (
              <div className="p-8 text-center text-text-secondary">
                <CalendarDays className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                <p>No upcoming visits scheduled.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Slide-over Panel overlay */}
      <AnimatePresence>
        {panelType && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-border-subtle"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">
                  {panelType === 'visit' ? 'Visit Details' : 'Request Change'}
                </h2>
                <button
                  onClick={closePanel}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                {panelType === 'visit' && selectedItem && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-border-subtle">
                      <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                        <CalendarDays className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary">{selectedItem.date || 'Today'}</div>
                        <div className="text-sm text-text-secondary mt-0.5">{selectedItem.time || selectedItem.timeWindow}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-text-primary mb-3">Caregiver</h3>
                      <div className="flex items-center gap-4 p-4 rounded-2xl border border-border-subtle bg-white">
                        <img
                          src={selectedItem.isToday ? selectedItem.caregiver.photo : getCaregiverPhoto(selectedItem.caregiverName)}
                          alt={selectedItem.isToday ? selectedItem.caregiver.name : selectedItem.caregiverName}
                          className="w-12 h-12 rounded-full object-cover shadow-sm"
                        />
                        <div>
                          <div className="font-medium text-text-primary">
                            {selectedItem.isToday ? selectedItem.caregiver.name : selectedItem.caregiverName}
                          </div>
                          <div className="text-xs text-text-secondary mt-0.5">Primary Caregiver</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border-subtle">
                      <h3 className="text-sm font-medium text-text-primary mb-3">Tasks to be Completed</h3>
                      <ul className="space-y-3">
                        {['Medication reminders', 'Light housekeeping', 'Meal preparation', 'Companionship'].map((task, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 w-5 h-5 rounded border border-border-subtle bg-slate-50 flex items-center justify-center shrink-0" />
                            <span className="text-sm text-text-secondary">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-auto">
                      <button className="w-full py-2.5 bg-brand-teal text-white rounded-xl text-sm font-medium hover:bg-brand-teal/90 transition-colors shadow-sm">
                        Contact Caregiver
                      </button>
                    </div>
                  </div>
                )}

                {panelType === 'change-request' && (
                  <div className="space-y-6">
                    <p className="text-sm text-text-secondary">
                      Submit a request to change an upcoming schedule. Our coordination team will review and confirm availability.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Which visit?</label>
                        <select className="w-full px-3 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 bg-white">
                          <option>Select a visit...</option>
                          <option>Tomorrow, Oct 25 - Sarah Jenkins</option>
                          <option>Friday, Oct 27 - Marcus Thorne</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Requested Change</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="px-3 py-2 border border-brand-teal bg-brand-teal/5 text-brand-teal rounded-xl text-sm font-medium">Reschedule</button>
                          <button className="px-3 py-2 border border-border-subtle hover:bg-slate-50 text-text-secondary rounded-xl text-sm font-medium">Cancel Visit</button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Additional Notes</label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 bg-white"
                          placeholder="Please let us know any preferred dates/times or reasons..."
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="w-full py-2.5 bg-brand-teal text-white rounded-xl text-sm font-medium hover:bg-brand-teal/90 transition-colors shadow-sm">
                        Submit Request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
