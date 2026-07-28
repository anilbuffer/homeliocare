"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FinancialSummaryStrip } from "@/components/billing/FinancialSummaryStrip";
import { PreBillingScrubQueue } from "@/components/billing/PreBillingScrubQueue";
import { DenialWorkQueue } from "@/components/billing/DenialWorkQueue";
import { AuthorizationWatchlist } from "@/components/billing/AuthorizationWatchlist";
import { ARAging } from "@/components/billing/ARAging";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function BillingDashboard() {
  const { currentUser } = useAuth();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, {currentUser?.name?.split(" ")[0] || "Marcus"}
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            2 claims ready to submit, 3 denials need action, 5 accounts over 90 days.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.success("Batch claim submission initiated.")}
          className="bg-brand-teal hover:bg-brand-teal/90 text-white px-4 py-1.5 rounded-full font-medium shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-brand-teal/20 transition-all flex items-center gap-2"
        >
          <Plus className="h-3.5 w-3.5" />
          Submit Claims
        </motion.button>
      </div>

      <motion.div variants={itemVariants}>
        <FinancialSummaryStrip />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PreBillingScrubQueue />
      </motion.div>

      <motion.div variants={itemVariants}>
        <DenialWorkQueue />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <AuthorizationWatchlist />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <ARAging onClaimClick={() => { }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
