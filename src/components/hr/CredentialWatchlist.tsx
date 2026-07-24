"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, BellRing, ArrowUpDown, ShieldAlert, Check } from "lucide-react";
import { CredentialWatchItem } from "@/types/hr";
import clsx from "clsx";

interface CredentialWatchlistProps {
  initialItems: CredentialWatchItem[];
}

export function CredentialWatchlist({ initialItems }: CredentialWatchlistProps) {
  const [items, setItems] = useState<CredentialWatchItem[]>(initialItems);
  const [sortField, setSortField] = useState<"daysRemaining" | "caregiverName" | "credentialType">("daysRemaining");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [notifiedIds, setNotifiedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSort = (field: "daysRemaining" | "caregiverName" | "credentialType") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    let comparison = 0;
    if (sortField === "daysRemaining") {
      comparison = a.daysRemaining - b.daysRemaining;
    } else if (sortField === "caregiverName") {
      comparison = a.caregiverName.localeCompare(b.caregiverName);
    } else if (sortField === "credentialType") {
      comparison = a.credentialType.localeCompare(b.credentialType);
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleNotify = (item: CredentialWatchItem) => {
    setNotifiedIds(prev => [...prev, item.id]);
    setToastMessage(`SMS & Email reminder sent to ${item.caregiverName} for ${item.credentialType}`);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="bg-white backdrop-blur-xl p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">Credential & Compliance Watchlist</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Surfacing expiring certs before they block shift scheduling.</p>
        </div>

        {/* Sort Controls as Rounded-Full Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Sort by:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => handleSort("daysRemaining")}
              className={clsx(
                "px-3 py-1 rounded-full font-bold transition-all text-xs flex items-center gap-1",
                sortField === "daysRemaining" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              )}
            >
              Days Remaining
              <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleSort("caregiverName")}
              className={clsx(
                "px-3 py-1 rounded-full font-bold transition-all text-xs flex items-center gap-1",
                sortField === "caregiverName" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              )}
            >
              Caregiver Name
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-blue-50 text-blue-900 text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 border border-blue-200 shadow-xs"
        >
          <BellRing className="w-4 h-4 text-blue-600 shrink-0" />
          {toastMessage}
        </motion.div>
      )}

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Caregiver</th>
              <th className="py-3 px-4">Credential Type</th>
              <th className="py-3 px-4">Expiration Date</th>
              <th className="py-3 px-4">Urgency Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedItems.map((item) => {
              const isNotified = notifiedIds.includes(item.id);
              const isExpired = item.daysRemaining <= 0;
              const isUrgentRed = item.daysRemaining <= 7;

              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <Link
                      href={`/hr/caregivers/${item.caregiverId}`}
                      className="font-medium text-slate-900 hover:text-brand-teal hover:underline transition-colors"
                    >
                      {item.caregiverName}
                    </Link>
                    <div className="text-[11px] text-slate-400 font-regular">{item.role}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                      {item.credentialType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {item.expiryDate}
                  </td>
                  <td className="py-3 px-4">
                    {isExpired ? (
                      <span className="bg-red-100 text-red-700 font-medium px-3 py-1 rounded-full inline-flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        Expired ({Math.abs(item.daysRemaining)}d ago)
                      </span>
                    ) : isUrgentRed ? (
                      <span className="bg-red-100 text-red-700 font-medium px-3 py-1 rounded-full inline-flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        Expires in {item.daysRemaining} days (Critical)
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 font-medium px-3 py-1 rounded-full inline-flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Expires in {item.daysRemaining} days
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {isNotified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Reminded
                      </span>
                    ) : (
                      <button
                        onClick={() => handleNotify(item)}
                        className="px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-full transition-all active:scale-95 flex items-center gap-1.5 ml-auto border border-amber-200"
                      >
                        <BellRing className="w-3.5 h-3.5" />
                        Notify Caregiver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

            {sortedItems.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400 font-semibold">
                  No credentials expiring in the next 30 days — you&apos;re all caught up!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
