import React from "react";
import { MyReferralsTable } from "@/components/partner/referrals/MyReferralsTable";

export default function MyReferralsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col mb-2">
        <h2 className="text-lg font-semibold text-slate-800">My Referrals</h2>
        <p className="text-xs text-slate-500">Track and filter all referrals submitted by your organization.</p>
      </div>

      <MyReferralsTable />
    </div>
  );
}
