"use client";

import React from "react";
import { motion } from "framer-motion";
import { BillingHeader } from "@/components/billing/BillingHeader";
import { PreBillingScrubGate } from "@/components/billing/PreBillingScrubGate";
import { FinancialSummaryStrip } from "@/components/billing/FinancialSummaryStrip";
import { RevenueByPayer } from "@/components/billing/RevenueByPayer";
import { ClaimsPipeline } from "@/components/billing/ClaimsPipeline";
import { ARAging } from "@/components/billing/ARAging";
import { DeniedClaims } from "@/components/billing/DeniedClaims";
import { PaymentRemittance } from "@/components/billing/PaymentRemittance";
import { ClaimDetailPanel } from "@/components/billing/ClaimDetailPanel";

export default function BillingWorkspace() {
  const [selectedClaimId, setSelectedClaimId] = React.useState<string | null>(null);

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
        className="w-full space-y-6"
      >
        <BillingHeader />
        
        <PreBillingScrubGate />

        <FinancialSummaryStrip />

        <RevenueByPayer />

        <ClaimsPipeline onClaimClick={setSelectedClaimId} />

        <ARAging onClaimClick={setSelectedClaimId} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DeniedClaims onClaimClick={setSelectedClaimId} />
          <PaymentRemittance />
        </div>
      </motion.div>

      {selectedClaimId && (
        <ClaimDetailPanel 
          claimId={selectedClaimId} 
          onClose={() => setSelectedClaimId(null)} 
        />
      )}
    </>
  );
}
