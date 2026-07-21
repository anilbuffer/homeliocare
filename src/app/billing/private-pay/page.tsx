"use client";

import React from "react";
import { motion } from "framer-motion";
import { BillingHeader } from "@/components/billing/BillingHeader";
import { StripeOverview } from "@/components/billing/private-pay/StripeOverview";
import { AutoInvoicing } from "@/components/billing/private-pay/AutoInvoicing";

export default function PrivatePayWorkspace() {
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <StripeOverview />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <AutoInvoicing />
          </motion.div>
        </div>

      </motion.div>
    </>
  );
}
