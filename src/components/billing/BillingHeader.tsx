"use client";

import React, { useState } from "react";
import { Plus, ChevronDown, LayoutDashboard, Send, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NewClaimModal } from "./NewClaimModal";

const dateRanges = ["This Month", "Last Quarter", "Year to Date", "Custom"];

export function BillingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const pathname = usePathname();

  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Billing & Claims Workspace</h1>
          <p className="text-sm text-slate-500 mt-1">Track revenue, resolve denials, and keep AR moving.</p>
        </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-medium whitespace-nowrap text-slate-700 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
          >
            {selectedRange}
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 py-1.5 min-w-[160px] z-20">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-teal transition-colors"
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-teal text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-teal/90 transition-colors shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/20 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          New Claim
        </button>
      </div>
      </div>

      <div className="flex items-center p-1.5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl overflow-x-auto border border-slate-200 w-full sm:w-max max-w-full">
        <Link 
          href="/billing"
          className={`relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl flex items-center gap-2 ${
            pathname === "/billing" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </span>
          {pathname === "/billing" && (
            <motion.div
              layoutId="billing-tab"
              className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </Link>
        <Link 
          href="/billing/claims"
          className={`relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl flex items-center gap-2 ${
            pathname === "/billing/claims" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Send className="w-4 h-4" />
            Claims Clearinghouse
          </span>
          {pathname === "/billing/claims" && (
            <motion.div
              layoutId="billing-tab"
              className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </Link>
        <Link 
          href="/billing/private-pay"
          className={`relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl flex items-center gap-2 ${
            pathname === "/billing/private-pay" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Private Pay
          </span>
          {pathname === "/billing/private-pay" && (
            <motion.div
              layoutId="billing-tab"
              className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </Link>

      </div>

      <NewClaimModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
