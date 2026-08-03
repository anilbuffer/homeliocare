"use client";

import React, { useState } from "react";
import { LightweightAuthGate } from "@/components/referrals/LightweightAuthGate";
import { MySubmittedReferralsList } from "@/components/referrals/MySubmittedReferralsList";

export default function ReferStatusPage() {
  const [authenticatedEmail, setAuthenticatedEmail] = useState<string | null>(null);

  return (
    <>
      {!authenticatedEmail ? (
        <LightweightAuthGate onAuthenticated={setAuthenticatedEmail} />
      ) : (
        <MySubmittedReferralsList email={authenticatedEmail} />
      )}
    </>
  );
}
