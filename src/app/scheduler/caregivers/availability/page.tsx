"use client";

import React, { useState, useMemo } from "react";
import { mockCaregivers } from "@/lib/mockTrackerData";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";
import { Search, UserCheck, UserX, Clock, Calendar, ArrowUpDown, X, HeartHandshake, Check, Eye } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CaregiverAvailabilityPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "status" | "hours" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editingCaregiver, setEditingCaregiver] = useState<any>(null);

  const handleSort = (field: "name" | "status" | "hours") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const getHours = (id: string) => {
    // Deterministic mock hours based on id length or char codes
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 20 + (hash % 20); // 20 to 40 hours
  };

  const filteredCaregivers = useMemo(() => {
    let result = mockCaregivers.filter(cg =>
      cg.name.toLowerCase().includes(search.toLowerCase()) ||
      cg.specialty.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy) {
      result = [...result].sort((a, b) => {
        let valA: any;
        let valB: any;

        if (sortBy === "name") {
          valA = a.name;
          valB = b.name;
        } else if (sortBy === "status") {
          valA = a.status;
          valB = b.status;
        } else if (sortBy === "hours") {
          valA = getHours(a.id);
          valB = getHours(b.id);
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [search, sortBy, sortDirection]);

  return (
    <div className="w-full animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 lg:mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Caregiver Availability
          </h1>
          <p className="text-xs text-slate-500">Manage real-time availability, schedule preferences, and time-off requests.</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search caregivers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal w-full sm:w-64 transition-all bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 flex flex-col justify-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-800">Available Now</div>
              <div className="text-xl font-semibold text-emerald-600">{mockCaregivers.filter(c => c.status === "Active").length}</div>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 flex flex-col justify-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
              <UserX className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-800">Off-Duty / Unavailable</div>
              <div className="text-xl font-semibold text-slate-600">{mockCaregivers.filter(c => c.status === "Offline").length}</div>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex flex-col justify-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-800">Pending PTO Requests</div>
              <div className="text-xl font-semibold text-indigo-600">3</div>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 flex flex-col justify-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-800">Fatigue Warnings</div>
              <div className="text-xl font-semibold text-amber-600">1</div>
            </div>
          </div>
        </Card>
      </div>

      <Card noPadding className="bg-white rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800" onClick={() => handleSort("name")}>
                    Caregiver <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800" onClick={() => handleSort("status")}>
                    Current Status <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Standard Availability</th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800" onClick={() => handleSort("hours")}>
                    Weekly Hours <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCaregivers.map((cg) => {
                const hours = getHours(cg.id);
                const percent = Math.min(100, Math.round((hours / 40) * 100));

                return (
                  <tr key={cg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-xs">
                          {cg.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{cg.name}</div>
                          <div className="text-[11px] text-slate-500">{cg.specialty}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx(
                        "px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 w-max",
                        cg.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      )}>
                        <div className={clsx("w-1.5 h-1.5 rounded-full", cg.status === "Active" ? "bg-emerald-500" : "bg-slate-400")} />
                        {cg.status === "Active" ? "Available / On-Duty" : "Off-Duty"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {['M', 'T', 'W', 'Th', 'F'].map(day => (
                          <span key={day} className="w-6 h-6 rounded-md bg-brand-teal/10 text-brand-teal flex items-center justify-center text-[10px] font-bold border border-brand-teal/20">
                            {day}
                          </span>
                        ))}
                        {['S', 'Su'].map(day => (
                          <span key={day} className="w-6 h-6 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold border border-slate-200">
                            {day}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                          <div className="bg-brand-teal h-1.5 rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{hours} / 40</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/caregivers/${cg.id}`}
                          className="inline-flex items-center gap-1 text-[12px] font-semibold bg-indigo-50 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Eye className="w-3 h-3" /> View Details
                        </Link>
                        <button
                          onClick={() => setEditingCaregiver(cg)}
                          className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-teal bg-brand-teal/10 hover:bg-brand-teal/20 hover:text-teal-700 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredCaregivers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    No caregivers found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Profile Drawer */}
      <AnimatePresence>
        {editingCaregiver && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingCaregiver(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-l border-slate-200 overflow-y-auto flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-brand-teal" />
                  <h2 className="font-bold text-slate-900 text-base">Edit Profile & Availability</h2>
                </div>
                <button
                  onClick={() => setEditingCaregiver(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-6 flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-teal to-teal-600 text-white font-semibold text-lg flex items-center justify-center shrink-0 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    {editingCaregiver.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{editingCaregiver.name}</h3>
                    <p className="text-xs font-semibold text-brand-teal">{editingCaregiver.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-normal uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {editingCaregiver.id}
                      </span>
                      <span className={clsx(
                        "text-[10px] font-semibold px-2.5 py-0.5 rounded-full border",
                        editingCaregiver.status === "Active"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-800 border-slate-200"
                      )}>
                        {editingCaregiver.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      defaultValue={editingCaregiver.email}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Phone Number</label>
                    <input
                      type="text"
                      defaultValue={editingCaregiver.phone}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Standard Availability</label>
                    <div className="flex gap-2 flex-wrap">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <label key={day} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 cursor-pointer w-full hover:bg-slate-100 transition-colors">
                          <input type="checkbox" defaultChecked className="accent-brand-teal w-4 h-4" />
                          <span>{day}</span>
                        </label>
                      ))}
                      {['Saturday', 'Sunday'].map(day => (
                        <label key={day} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 cursor-pointer w-full hover:bg-slate-100 transition-colors">
                          <input type="checkbox" className="accent-brand-teal w-4 h-4" />
                          <span>{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setEditingCaregiver(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingCaregiver(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-teal hover:bg-brand-teal/90 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_2px_10px_rgba(13,148,136,0.2)]"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
