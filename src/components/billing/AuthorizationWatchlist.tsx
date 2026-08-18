"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, CalendarDays, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { toast } from "sonner";

interface ExpiringAuth {
  id: string;
  clientName: string;
  payer: string;
  authNumber: string;
  expirationDate: string;
  daysRemaining: number;
  unitsAuthorized: number;
  unitsConsumed: number;
  status: "EXPIRING" | "RENEWAL_REQUESTED";
}

const mockAuths: ExpiringAuth[] = [
  { id: "AUTH-8821", clientName: "Mary Smith", payer: "Medicaid", authNumber: "MA-992140", expirationDate: "2026-08-15", daysRemaining: 19, unitsAuthorized: 480, unitsConsumed: 450, status: "EXPIRING" },
  { id: "AUTH-8843", clientName: "Robert Chen", payer: "BlueCross", authNumber: "BC-110294", expirationDate: "2026-08-05", daysRemaining: 9, unitsAuthorized: 120, unitsConsumed: 110, status: "EXPIRING" },
  { id: "AUTH-8891", clientName: "James Wilson", payer: "Medicaid", authNumber: "MA-774129", expirationDate: "2026-07-30", daysRemaining: 3, unitsAuthorized: 200, unitsConsumed: 195, status: "EXPIRING" },
  { id: "AUTH-8892", clientName: "Sarah Connor", payer: "Medicare Part B", authNumber: "MCR-19842", expirationDate: "2026-08-02", daysRemaining: 6, unitsAuthorized: 80, unitsConsumed: 76, status: "EXPIRING" },
];

export function AuthorizationWatchlist() {
  const [auths, setAuths] = useState<ExpiringAuth[]>(mockAuths);

  const handleRenew = (id: string) => {
    setAuths(prev => prev.map(a => a.id === id ? { ...a, status: "RENEWAL_REQUESTED" } : a));
    toast.success("Authorization renewal requested.");
    // Simulate disappearance after short delay
    setTimeout(() => {
      setAuths(prev => prev.filter(a => a.id !== id));
    }, 2000);
  };

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Authorization Watchlist
          </h2>
          <p className="text-xs text-slate-500">
            Expiring within 30 days or approaching unit limits.
          </p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3" />
          {auths.filter(a => a.status === "EXPIRING").length} Action Needed
        </div>
      </div>

      <div className="divide-y divide-slate-200 flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {auths.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No authorizations expiring soon.
            </div>
          ) : (
            auths.map(auth => {
              const unitPercentage = Math.round((auth.unitsConsumed / auth.unitsAuthorized) * 100);
              const isCriticallyLow = auth.daysRemaining <= 14 || unitPercentage >= 90;

              return (
                <motion.div
                  key={auth.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="flex-1 flex gap-3">
                      <div className={clsx(
                        "p-2 rounded-lg shrink-0 h-fit",
                        isCriticallyLow ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                      )}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-xs text-slate-900">{auth.clientName}</h3>
                          <span className="text-xs font-medium text-slate-500">{auth.payer} • {auth.authNumber}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-2">

                          {/* Expiration */}
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                              <CalendarDays className="w-3 h-3" />
                              Expires {auth.expirationDate}
                            </div>
                            <div className={clsx(
                              "text-xs font-medium mt-1",
                              auth.daysRemaining <= 14 ? "text-rose-600" : "text-amber-600"
                            )}>
                              {auth.daysRemaining} days remaining
                            </div>
                          </div>

                          {/* Units */}
                          <div>
                            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
                              <span>Units Consumed</span>
                              <span>{unitPercentage}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={clsx(
                                  "h-full rounded-full",
                                  unitPercentage >= 90 ? "bg-rose-500" : "bg-amber-500"
                                )}
                                style={{ width: `${Math.min(unitPercentage, 100)}%` }}
                              />
                            </div>
                            <div className="text-xs text-slate-500 text-medium mt-1 text-right">
                              {auth.unitsConsumed} / {auth.unitsAuthorized}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center justify-end mt-3 lg:mt-0">
                      {auth.status === "RENEWAL_REQUESTED" ? (
                        <div className="flex items-center gap-1 text-brand-teal font-medium bg-teal-50 px-3 py-1.5 rounded-xl w-full justify-center text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Requested
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.00 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRenew(auth.id)}
                          className="flex items-center justify-center gap-1 bg-white border border-slate-200 hover:border-brand-teal hover:text-brand-teal text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all w-full cursor-pointer shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Initiate Renewal
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
