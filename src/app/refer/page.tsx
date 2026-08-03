"use client";

import React, { useState } from "react";
import { PublicReferralForm } from "@/components/referrals/PublicReferralForm";
import { ReferralConfirmation } from "@/components/referrals/ReferralConfirmation";

export default function ReferPage() {
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  return (
    <>
      {!submittedReference ? (
        <PublicReferralForm 
          onSubmitSuccess={(ref: string) => setSubmittedReference(ref)} 
        />
      ) : (
        <ReferralConfirmation referenceNumber={submittedReference} />
      )}
    </>
  );
}
