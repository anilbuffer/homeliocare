"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { PartnerKpiStrip } from "@/components/partner/dashboard/PartnerKpiStrip";
import { PartnerRecentReferrals } from "@/components/partner/dashboard/PartnerRecentReferrals";
import { ReferralSubmitWidget } from "@/components/partner/dashboard/ReferralSubmitWidget";
import { Bell, ShieldCheck, Building2 } from "lucide-react";
import { mockOrganization } from "@/lib/partner/mockData";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function PartnerDashboard() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
              Welcome back, {mockOrganization.name}
            </h1>
            <span className="inline-flex items-center gap-1 bg-brand-teal/10 text-brand-teal text-xs font-medium px-3 py-1 rounded-full border border-brand-teal/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <Building2 className="w-3.5 h-3.5" />
              Referral Partner
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-2 font-regular flex-wrap">
            <span>{today}</span>
            <span>&bull;</span>
            <span><span className="text-brand-teal font-semibold">5 active</span> referrals</span>
            <span>&bull;</span>
            <span><span className="text-indigo-600 font-semibold">2 pending</span> review</span>
          </p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
        {/* Row 1: KPI Strip */}
        <motion.div variants={itemVariants}>
          <PartnerKpiStrip />
        </motion.div>

        {/* Row 2: Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {/* Left Column (2/3 width) - Recent Referrals */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col h-full">
            <PartnerRecentReferrals />
          </motion.div>

          {/* Right Column (1/3 width) - Submit Widget & Updates */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <motion.div variants={itemVariants}>
              <ReferralSubmitWidget />
            </motion.div>

            {/* Agency Updates */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#0e354a] to-slate-900 rounded-2xl p-4 text-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/60 transition-all duration-300 relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/20 rounded-bl-full -z-0" />
              <div className="relative z-10 flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-brand-teal" />
                <h3 className="font-semibold text-lg">Agency Updates</h3>
              </div>
              <p className="text-xs text-slate-300 mb-3 lg:mb-4 leading-relaxed">
                We've recently expanded our service area to include the North County region. You can now refer patients in zip codes starting with 902xx.
              </p>
              <div className="text-xs font-medium text-brand-teal">
                Posted 2 days ago
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
