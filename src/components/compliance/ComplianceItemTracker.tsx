"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, ChevronDown, CheckCircle2, AlertTriangle,
  XCircle, Clock, Upload, Mail, MoreVertical, Calendar, FileText
} from "lucide-react";
import { ComplianceItem, ComplianceStatus } from "@/types/compliance";

interface ComplianceItemTrackerProps {
  items: ComplianceItem[];
}

export function ComplianceItemTracker({ items }: ComplianceItemTrackerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "All">("All");
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case "Compliant":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 whitespace-nowrap"><CheckCircle2 className="w-3.5 h-3.5" /> Compliant</span>;
      case "Expiring":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20 whitespace-nowrap"><AlertTriangle className="w-3.5 h-3.5" /> Expiring</span>;
      case "Expired":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-400/10 text-red-400 border border-red-400/20 whitespace-nowrap"><XCircle className="w-3.5 h-3.5" /> Expired</span>;
      case "Pending":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20 whitespace-nowrap"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  const getDaysRemainingPill = (expiryDate?: string, status?: ComplianceStatus) => {
    if (!expiryDate) return null;
    if (status === "Expired") return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-400/20 text-red-400 whitespace-nowrap">Expired</span>;
    if (status === "Pending") return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-400/20 text-slate-500 whitespace-nowrap">N/A</span>;

    // Naive calculation for demo purposes
    const expiry = new Date(expiryDate);
    const today = new Date("2026-07-16");
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-400/20 text-amber-400 whitespace-nowrap">{diffDays} days left</span>;
    }
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-400 whitespace-nowrap">{diffDays} days left</span>;
  };

  return (
    <>
      <div className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex flex-col">
        <div className="pb-4 border-b border-slate-200 flex flex-col md:flex-row items-start sm:items-center justify-between gap-4 bg-white/50">
          <h3 className="text-lg font-bold text-slate-900">Compliance Item Tracker</h3>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search staff or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-900 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-900 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Compliant">Compliant</option>
                <option value="Expiring">Expiring</option>
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
            <button className="p-2 border border-slate-200 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-slate-50 text-slate-500 hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal/20">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg whitespace-nowrap">Staff Member</th>
                <th className="px-6 py-4 whitespace-nowrap">Compliance Item</th>
                <th className="px-6 py-4 whitespace-nowrap">Issue / Expiry</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-right rounded-tr-lg whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedItem(item)}
                    className={`group cursor-pointer hover:bg-slate-50/80 transition-all duration-200 ${item.status === "Expired" ? "border-l-[3px] border-l-red-500" : "border-l-[3px] border-l-transparent"}`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3.5">
                        {item.caregiver.avatarUrl ? (
                          <img src={item.caregiver.avatarUrl} alt={item.caregiver.name} className="w-9 h-9 rounded-full object-cover bg-slate-100 ring-2 ring-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0">
                            {item.caregiver.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-brand-teal transition-colors whitespace-nowrap">{item.caregiver.name}</div>
                          <div className="text-[10px]  text-slate-500 font-medium whitespace-nowrap">{item.caregiver.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-semibold text-slate-800 whitespace-nowrap">{item.itemName}</div>
                      <div className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 inline-block mt-1.5 whitespace-nowrap">{item.category}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-medium text-slate-600 flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {item.issueDate ? new Date(item.issueDate).toLocaleDateString('en-US') : "N/A"} - {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('en-US') : "N/A"}
                      </div>
                      <div className="mt-2">
                        {getDaysRemainingPill(item.expiryDate, item.status)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        {item.status === "Expiring" || item.status === "Expired" ? (
                          <button className="p-1.5 text-brand-teal hover:bg-brand-teal/10 rounded transition-colors" title="Send Reminder">
                            <Mail className="w-4 h-4" />
                          </button>
                        ) : null}
                        <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors" title="Upload Document">
                          <Upload className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors" title="More Actions">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500/50 mb-3" />
                      <p className="text-sm">No items found matching the current filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-white border-l border-slate-200 z-50 shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                <h3 className="text-lg font-bold text-slate-900">Item Details</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 flex-1 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  {selectedItem.caregiver.avatarUrl ? (
                    <img src={selectedItem.caregiver.avatarUrl} alt={selectedItem.caregiver.name} className="w-12 h-12 rounded-full object-cover bg-slate-100 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                      {selectedItem.caregiver.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{selectedItem.caregiver.name}</h4>
                    <p className="text-sm text-brand-teal">{selectedItem.caregiver.role}</p>
                  </div>
                </div>

                {/* Item Info */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Item Name</div>
                    <div className="text-base font-medium text-slate-900">{selectedItem.itemName}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Category</div>
                      <div className="text-sm font-medium text-slate-600">{selectedItem.category}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Status</div>
                      <div>{getStatusBadge(selectedItem.status)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Issue Date</div>
                      <div className="text-sm font-medium text-slate-600">{selectedItem.issueDate ? new Date(selectedItem.issueDate).toLocaleDateString('en-US') : "N/A"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Expiry Date</div>
                      <div className="text-sm font-medium text-slate-600">{selectedItem.expiryDate ? new Date(selectedItem.expiryDate).toLocaleDateString('en-US') : "N/A"}</div>
                    </div>
                  </div>
                </div>

                {/* Document Preview (Mock) */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" /> Current Document
                  </h4>
                  <div className="border border-slate-200 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50">
                    {selectedItem.status === "Pending" ? (
                      <>
                        <Upload className="w-8 h-8 text-slate-500 mb-3" />
                        <div className="text-sm font-medium text-slate-900 mb-1">No document uploaded</div>
                        <div className="text-xs text-slate-500">Upload a file to mark as compliant</div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-20 bg-slate-100 rounded-lg mb-3 flex items-center justify-center shadow-inner">
                          <FileText className="w-8 h-8 text-slate-500" />
                        </div>
                        <div className="text-sm font-medium text-brand-teal hover:underline cursor-pointer">View_Document.pdf</div>
                        <div className="text-xs text-slate-500 mt-1">Uploaded on {selectedItem.issueDate}</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Verification/Action History */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Verification History</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">Verified by Sarah Jenkins</div>
                        <div className="text-xs text-slate-500">Jan 16, 2024 at 10:22 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 grid grid-cols-2 gap-3 mt-auto">
                <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-200 text-slate-900 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" /> Replace
                </button>
                <button className="px-4 py-2 border border-brand-teal-200 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,180,216,0.3)] hover:shadow-[0_0_20px_rgba(0,180,216,0.5)]">
                  <CheckCircle2 className="w-4 h-4" /> Mark Renewed
                </button>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
