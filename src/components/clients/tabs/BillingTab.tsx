import React from "react";
import { Card } from "@/components/ui/Card";
import { Client } from "@/lib/clients/mockData";
import { ArrowUpRight } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

export function BillingTab({ client }: { client: Client }) {
  if (!client.billing) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
          <h3 className="text-lg font-medium text-slate-700 mb-2">No billing records</h3>
        </Card>
      </div>
    );
  }

  const { billing } = client;
  const progressPercent = (billing.authorization.used / billing.authorization.total) * 100;
  const remainingHours = billing.authorization.total - billing.authorization.used;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Authorization */}
        <Card className="p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Authorization hours</h3>
            <span className="text-xs text-slate-500 font-medium">{billing.authorization.used} / {billing.authorization.total} hrs</span>
          </div>
          <ProgressBar progress={progressPercent} color="bg-amber-500" className="mb-2" />
          <p className="text-xs text-amber-600 font-medium">{remainingHours} hours remaining</p>
        </Card>

        {/* Outstanding Balance */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Outstanding balance</h3>
          <div className="text-3xl font-bold text-amber-500 mb-1">${billing.balance}</div>
          <p className="text-xs text-slate-500">Client responsibility</p>
        </Card>
      </div>

      {/* Linked claims */}
      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 pb-4">
          <h3 className="text-sm font-semibold text-slate-700">Linked claims</h3>
          <button className="flex items-center text-xs font-semibold text-brand-teal hover:text-emerald-600 transition-colors">
            Open Billing <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wider border-y border-slate-100">
              <tr>
                <th className="px-6 py-4">Claim</th>
                <th className="px-6 py-4">Service Dates</th>
                <th className="px-6 py-4">Payer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {billing.claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-800">{claim.id}</td>
                  <td className="px-6 py-4">{claim.serviceDates}</td>
                  <td className="px-6 py-4">{claim.payer}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{claim.amount}</td>
                  <td className="px-6 py-4">
                    {claim.status === "Draft" && <Badge variant="default" className="text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>Draft</Badge>}
                    {claim.status === "Pending" && <Badge variant="warning" className="bg-amber-50 text-amber-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>Pending</Badge>}
                    {claim.status === "Paid" && <Badge variant="success" className="bg-emerald-50 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>Paid</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
