"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, LayoutGrid, List, MoreVertical, Star, ShieldAlert, ArrowRight } from "lucide-react";
import { mockCaregivers, Caregiver } from "@/lib/caregivers/mockData";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { CaregiverKpiStrip } from "@/components/caregivers/CaregiverKpiStrip";
import { cn } from "@/components/ui/Card";

export default function CaregiverRosterPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const caregiversList = Object.values(mockCaregivers).filter(cg =>
    cg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cg.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Caregivers</h2>
          <p className="text-sm text-text-secondary mt-1">{caregiversList.length} active caregivers in roster.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Add Caregiver
          </button>
        </div>
      </div>

      <CaregiverKpiStrip />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 mt-4">
        <div className="flex flex-1 items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search caregivers by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
            />
          </div>
          <button className="px-3.5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium ">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        <div className="flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
          <button
            onClick={() => setViewMode("grid")}
            className={cn("p-2 rounded-full transition-all", viewMode === "grid" ? "bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] bg-brand-teal/20 text-brand-teal" : "text-slate-500 hover:text-slate-700")}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={cn("p-2 rounded-full transition-all", viewMode === "table" ? "bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] text-brand-teal" : "text-slate-500 hover:text-slate-700")}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Roster View */}
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
                <Link href={`/caregivers/${cg.id}`} className="block h-full group">
                  <Card className="h-full hover:border-brand-teal/30 hover:shadow-md transition-all group-hover:scale-[1.02] flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar src={cg.avatarUrl} alt={cg.name} fallback={cg.name.substring(0, 2)} size="lg" />
                        <div>
                          <h3 className="font-semibold text-text-primary group-hover:text-brand-teal transition-colors">{cg.name}</h3>
                          <p className="text-xs text-text-secondary line-clamp-1">{cg.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Status</span>
                        <Badge variant={
                          cg.status === "Active" ? "success" :
                            cg.status === "On Leave" ? "warning" :
                              cg.status === "Inactive" ? "error" : "default"
                        }>{cg.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Rating</span>
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <Star className={cn("w-3.5 h-3.5", cg.rating > 0 ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
                          {cg.rating > 0 ? cg.rating.toFixed(1) : "New"}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Compliance</span>
                        <div className="flex items-center gap-1">
                          {cg.complianceScore === 100 ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                          )}
                          <span className={cn("font-medium", cg.complianceScore === 100 ? "text-emerald-600" : "text-amber-600")}>
                            {cg.complianceScore}%
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {cg.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {skill}
                          </span>
                        ))}
                        {cg.skills.length > 3 && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                            +{cg.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-brand-teal text-sm font-medium mt-auto">
                      View Profile
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
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
            className="bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Caregiver</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Compliance</th>
                    <th className="px-6 py-4">Clients</th>
                    <th className="px-6 py-4">Last Active</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {caregiversList.map((cg) => (
                    <tr key={cg.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <Link href={`/caregivers/${cg.id}`} className="flex items-center gap-3">
                          <Avatar src={cg.avatarUrl} alt={cg.name} fallback={cg.name.substring(0, 2)} size="sm" />
                          <div>
                            <div className="font-medium text-slate-900 group-hover:text-brand-teal transition-colors">{cg.name}</div>
                            <div className="text-xs text-slate-500">{cg.role}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          cg.status === "Active" ? "success" :
                            cg.status === "On Leave" ? "warning" :
                              cg.status === "Inactive" ? "error" : "default"
                        }>{cg.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Star className={cn("w-3.5 h-3.5", cg.rating > 0 ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
                          {cg.rating > 0 ? cg.rating.toFixed(1) : "New"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={cg.complianceScore === 100 ? "success" : cg.complianceScore >= 80 ? "warning" : "error"}>
                          {cg.complianceScore}% Compliant
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {cg.assignedClientsCount} Active
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {cg.lastActiveDate}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/caregivers/${cg.id}`}>
                          <button className="text-brand-teal font-medium hover:text-emerald-700 transition-colors text-sm">
                            View
                          </button>
                        </Link>
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
