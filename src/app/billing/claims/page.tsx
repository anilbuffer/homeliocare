"use client";

import React from "react";
import { motion } from "framer-motion";
import { BillingHeader } from "@/components/billing/BillingHeader";
import { ClearinghouseStatus } from "@/components/billing/clearinghouse/ClearinghouseStatus";
import { EligibilityChecker } from "@/components/billing/clearinghouse/EligibilityChecker";
import { ClaimBatchManager } from "@/components/billing/clearinghouse/ClaimBatchManager";

export default function ClaimsClearinghouseWorkspace() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full space-y-6 pb-20"
      >
        <BillingHeader />

        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <ClearinghouseStatus />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div className="xl:col-span-1" variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <EligibilityChecker />
          </motion.div>
          <motion.div className="xl:col-span-2" variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <ClaimBatchManager />
          </motion.div>
        </div>

      </motion.div>
    </>
  );
}
