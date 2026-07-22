"use client";

import React, { useState } from "react";
import { CaregiverLayout } from "@/components/caregiver/CaregiverLayout";
import {
  INITIAL_OPEN_SHIFTS,
  INITIAL_TIME_OFF,
  OpenShift,
  TimeOffRequest,
} from "@/lib/caregiver/caregiverPortalData";
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  AlertTriangle,
  Send,
  UserCheck,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";

export default function CaregiverSchedulePage() {
  const [openShifts, setOpenShifts] = useState<OpenShift[]>(INITIAL_OPEN_SHIFTS);
  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>(INITIAL_TIME_OFF);
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekRangeLabel = (offset: number) => {
    if (offset === 0) return "Week of Jul 20 - Jul 26, 2026 (Current)";
    if (offset === 1) return "Week of Jul 27 - Aug 02, 2026 (Next Week)";
    if (offset === -1) return "Week of Jul 13 - Jul 19, 2026 (Previous Week)";
    if (offset > 0) return `Week of Jul ${20 + offset * 7} - Aug ${2 + (offset - 1) * 7}, 2026`;
    return `Week of Jul ${20 + offset * 7} - Jul ${26 + offset * 7}, 2026`;
  };

  // Active Tab: Week Grid vs Open Shifts vs Availability vs Time Off
  const [activeTab, setActiveTab] = useState<"week" | "open" | "availability" | "timeoff">("week");

  // Call-off Modal State
  const [showCallOffModal, setShowCallOffModal] = useState(false);
  const [callOffShiftId, setCallOffShiftId] = useState("");
  const [callOffReason, setCallOffReason] = useState("Illness / Unwell");
  const [callOffSubmitted, setCallOffSubmitted] = useState(false);

  // Time-Off Form State
  const [showTimeOffModal, setShowTimeOffModal] = useState(false);
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-08-03");
  const [toReason, setToReason] = useState("Personal / Family");

  // Availability Matrix State (Mon-Sun 8 AM to 8 PM)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [availability, setAvailability] = useState<Record<string, boolean>>({
    "Mon-morning": true,
    "Mon-afternoon": true,
    "Tue-morning": true,
    "Tue-afternoon": true,
    "Wed-morning": true,
    "Wed-afternoon": true,
    "Thu-morning": true,
    "Thu-afternoon": true,
    "Fri-morning": true,
    "Fri-afternoon": false,
    "Sat-morning": true,
    "Sat-afternoon": false,
    "Sun-morning": false,
    "Sun-afternoon": false,
  });

  const toggleAvailabilityCell = (key: string) => {
    setAvailability((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptOpenShift = (shiftId: string) => {
    setOpenShifts((prev) =>
      prev.map((s) => (s.id === shiftId ? { ...s, status: "Accepted" } : s))
    );
  };

  const handleTimeOffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: TimeOffRequest = {
      id: `to-${Date.now()}`,
      startDate,
      endDate,
      reason: toReason,
      status: "Pending",
      submittedAt: new Date().toISOString().split("T")[0],
    };
    setTimeOffRequests([newReq, ...timeOffRequests]);
    setShowTimeOffModal(false);
  };

  const handleCallOffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallOffSubmitted(true);
    setTimeout(() => {
      setCallOffSubmitted(false);
      setShowCallOffModal(false);
    }, 1200);
  };

  return (
    <CaregiverLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Tabs */}
        <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule & Shift Management</h1>
            <p className="text-xs text-gray-500 mt-1">
              View assigned visits, pick up open shifts, edit weekly availability, or request time off.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1.5 rounded-xl text-xs font-semibold">
            {[
              { id: "week", label: "My Week Grid" },
              { id: "open", label: `Open Shifts (${openShifts.filter((s) => s.status === "Available").length})` },
              { id: "availability", label: "Availability Editor" },
              { id: "timeoff", label: "Time-Off Requests" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3 py-2 rounded-lg transition-all ${activeTab === t.id
                  ? "bg-white text-gray-900 shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: WEEK CALENDAR GRID */}
        {activeTab === "week" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setWeekOffset((prev) => prev - 1)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-gray-100 text-gray-600 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setWeekOffset((prev) => prev + 1)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-gray-100 text-gray-600 cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-900">{getWeekRangeLabel(weekOffset)}</h3>
              </div>

              <button
                onClick={() => setShowCallOffModal(true)}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Call-off / Can&apos;t Make Shift</span>
              </button>
            </div>

            {/* Week Grid Columns */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {[
                { day: "Mon", date: "Jul 20", shifts: [{ client: "Eleanor V.", time: "08:30-12:30", type: "Personal Care" }] },
                { day: "Tue", date: "Jul 21", shifts: [{ client: "Arthur P.", time: "13:30-16:30", type: "Mobility & Meal" }] },
                { day: "Wed", date: "Jul 22 (Today)", dateClass: "text-brand-teal font-bold", shifts: [{ client: "Eleanor V.", time: "08:30-12:30", type: "Personal Care" }, { client: "Arthur P.", time: "13:30-16:30", type: "Mobility" }, { client: "Margaret H.", time: "17:00-19:00", type: "Dinner Prep" }] },
                { day: "Thu", date: "Jul 23", shifts: [{ client: "Eleanor V.", time: "08:30-12:30", type: "Personal Care" }] },
                { day: "Fri", date: "Jul 24", shifts: [{ client: "Margaret H.", time: "14:00-18:00", type: "Companion" }] },
                { day: "Sat", date: "Jul 25", shifts: [] },
                { day: "Sun", date: "Jul 26", shifts: [] },
              ].map((d) => (
                <div key={d.day} className="bg-white rounded-2xl border border-slate-200 p-3 min-h-[220px] flex flex-col space-y-2">
                  <div className="border-b border-gray-100 pb-2 text-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">{d.day}</span>
                    <div className={`text-xs ${d.dateClass || "text-gray-700 font-semibold"}`}>{d.date}</div>
                  </div>

                  <div className="space-y-2 flex-1">
                    {d.shifts.length > 0 ? (
                      d.shifts.map((s, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-1">
                          <span className="font-bold text-blue-950 block truncate">{s.client}</span>
                          <span className="text-[11px] font-mono text-blue-800 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-600" /> {s.time}
                          </span>
                          <span className="text-[10px] bg-white text-blue-700 px-1.5 py-0.2 rounded font-medium inline-block border border-blue-100">
                            {s.type}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex items-center justify-center text-[11px] text-gray-400 italic">
                        No shifts
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: OPEN SHIFTS TABLE */}
        {activeTab === "open" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Available Open Shifts Board</h3>
                <p className="text-xs text-gray-500 mt-0.5">Matching your skills, CNA licensure, and North Zone branch location.</p>
              </div>

              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                Instant Acceptance Enabled
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {openShifts.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar src={s.clientPhoto} name={s.clientName} size="md" className="rounded-xl" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{s.clientName}</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-brand-teal" /> {s.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gray-50 text-xs space-y-1 font-medium">
                      <div className="text-gray-800 font-bold">{s.date}</div>
                      <div className="text-gray-600 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> {s.timeWindow}
                      </div>
                    </div>

                    {s.bonusRate && (
                      <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-brand-teal" /> {s.bonusRate}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 font-medium block">Rate</span>
                      <span className="text-sm font-bold text-gray-900">${s.hourlyRate.toFixed(2)}/hr</span>
                    </div>

                    {s.status === "Available" ? (
                      <button
                        onClick={() => handleAcceptOpenShift(s.id)}
                        className="px-4 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                      >
                        Accept Shift
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" /> Accepted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AVAILABILITY GRID */}
        {activeTab === "availability" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Weekly Availability Hours Editor</h3>
                <p className="text-xs text-gray-500 mt-0.5">Feeds the Admin Scheduler match algorithm for shift dispatching.</p>
              </div>
              <button
                onClick={() => alert("Availability preferences saved and synced to Admin Scheduler!")}
                className="px-4 py-2 bg-brand-teal text-white font-bold rounded-xl text-xs shadow-xs hover:bg-brand-teal/90"
              >
                Save Availability
              </button>
            </div>

            <div className="grid grid-cols-7 gap-3">
              {days.map((day) => (
                <div key={day} className="space-y-3">
                  <div className="text-center font-bold text-xs text-gray-700 uppercase pb-2 border-b border-gray-100">{day}</div>

                  {["morning", "afternoon"].map((period) => {
                    const key = `${day}-${period}`;
                    const isAvail = availability[key];
                    return (
                      <button
                        key={period}
                        type="button"
                        onClick={() => toggleAvailabilityCell(key)}
                        className={`w-full p-3 rounded-xl border text-xs font-bold text-center transition-all ${isAvail
                          ? "bg-brand-teal/10 border-brand-teal text-brand-teal shadow-2xs"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                          }`}
                      >
                        <div className="capitalize">{period}</div>
                        <div className="text-[10px] font-normal mt-0.5">{period === "morning" ? "8am - 2pm" : "2pm - 8pm"}</div>
                        <div className="mt-1 font-bold">{isAvail ? "AVAILABLE" : "UNAVAILABLE"}</div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TIME-OFF REQUESTS */}
        {activeTab === "timeoff" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Time-Off Requests & Status</h3>
                <p className="text-xs text-gray-500 mt-0.5">Submit upcoming PTO or medical leave for HR approval.</p>
              </div>
              <button
                onClick={() => setShowTimeOffModal(true)}
                className="px-4 py-2 bg-brand-teal text-white font-bold rounded-xl text-xs shadow-xs hover:bg-brand-teal/90 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Request Time Off
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
                  <tr>
                    <th className="p-3">Dates</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3">Submitted</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Reviewer Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {timeOffRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50/60 font-medium">
                      <td className="p-3 font-bold text-gray-900">{req.startDate} to {req.endDate}</td>
                      <td className="p-3 text-gray-700">{req.reason}</td>
                      <td className="p-3 text-gray-500">{req.submittedAt}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${req.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : req.status === "Pending"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-rose-100 text-rose-800"
                            }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">{req.reviewerNote || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Call-off Modal */}
      <AnimatePresence>
        {showCallOffModal && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Call-off / Shift Relief Request</h3>
              <p className="text-xs text-gray-600 mt-1">
                Immediately notifies the Dispatcher and triggers the smart-replacement shift board on Admin.
              </p>

              <form onSubmit={handleCallOffSubmit} className="my-4 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Select Shift to Call Off</label>
                  <select className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-medium bg-white">
                    <option>Today: Eleanor Vance (08:30 AM - 12:30 PM)</option>
                    <option>Today: Arthur Pendelton (01:30 PM - 04:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Call-off Reason *</label>
                  <select
                    value={callOffReason}
                    onChange={(e) => setCallOffReason(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-medium bg-white"
                  >
                    <option value="Illness / Unwell">Illness / Unwell</option>
                    <option value="Family Emergency">Family Emergency</option>
                    <option value="Vehicle Breakdown">Vehicle Breakdown</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCallOffModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-rose-700"
                  >
                    {callOffSubmitted ? "Notifying Dispatcher..." : "Submit Call-off"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Time Off Modal */}
      <AnimatePresence>
        {showTimeOffModal && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900">Request Time Off</h3>
              <form onSubmit={handleTimeOffSubmit} className="my-4 space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Reason</label>
                  <input
                    type="text"
                    value={toReason}
                    onChange={(e) => setToReason(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-medium"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTimeOffModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-teal text-white rounded-xl font-bold"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CaregiverLayout>
  );
}
