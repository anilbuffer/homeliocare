"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, LayoutGrid, List, Star, ShieldAlert, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { mockCaregivers } from "@/lib/caregivers/mockData";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/Card";

export default function SchedulerCaregiversPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const caregiversList = Object.values(mockCaregivers).filter((cg) => {
    const matchesSearch =
      cg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cg.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cg.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === "All") return matchesSearch;
    return matchesSearch && cg.status === statusFilter;
  });

  return (
    <div className="w-full mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Caregiver Roster</h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
              Read-Mostly View
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {caregiversList.length} caregivers available for dispatch and scheduling assignments.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search caregivers by name, role, or skills (Hoyer, Dementia)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal/20 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-full transition-all cursor-pointer",
              viewMode === "grid" ? "bg-brand-teal/20 text-brand-teal" : "text-slate-500 hover:text-slate-700"
            )}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={cn(
              "p-2 rounded-full transition-all cursor-pointer",
              viewMode === "table" ? "bg-brand-teal/20 text-brand-teal" : "text-slate-500 hover:text-slate-700"
            )}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Caregiver Roster */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
          >
            {caregiversList.map((cg, index) => (
              <motion.div
                key={cg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card className="h-full bg-white rounded-2xl p-4 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-brand-teal/60 transition-all duration-300 relative flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={cg.avatarUrl} alt={cg.name} fallback={cg.name.substring(0, 2)} size="md" />
                      <div>
                        <h3 className="font-bold text-slate-900">{cg.name}</h3>
                        <p className="text-xs text-slate-500">{cg.role}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        cg.status === "Active"
                          ? "success"
                          : cg.status === "On Leave"
                            ? "warning"
                            : "default"
                      }
                    >
                      {cg.status}
                    </Badge>
                  </div>

                  <div className="space-y-2.5 my-3 flex-1 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Rating</span>
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {cg.rating > 0 ? cg.rating.toFixed(1) : "New"}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span>Active Shifts</span>
                      <span className="font-semibold text-slate-800">{cg.assignedPatientsCount} Patients</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                      {cg.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brand-teal" /> Contact Dispatch
                    </span>
                    <span className="font-semibold text-brand-teal">Available</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Caregiver</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Key Skills</th>
                    <th className="px-4 py-3">Active Patient Load</th>
                    <th className="px-4 py-3">Last Shift</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {caregiversList.map((cg) => (
                    <tr key={cg.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar src={cg.avatarUrl} alt={cg.name} fallback={cg.name.substring(0, 2)} size="sm" />
                          <div>
                            <div className="font-bold text-slate-900">{cg.name}</div>
                            <div className="text-[10px] text-slate-500">{cg.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className="text-[10px]"
                          variant={
                            cg.status === "Active"
                              ? "success"
                              : cg.status === "On Leave"
                                ? "warning"
                                : "default"
                          }
                        >
                          {cg.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 font-semibold text-slate-800">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {cg.rating > 0 ? cg.rating.toFixed(1) : "New"}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {cg.skills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700">
                        {cg.assignedPatientsCount} Assigned
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {cg.lastActiveDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
