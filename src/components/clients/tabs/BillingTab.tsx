import React from "react";
import { Card } from "@/components/ui/Card";
import { Client } from "@/lib/clients/mockData";
import { Receipt, DollarSign, Activity } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function BillingTab({ client }: { client: Client }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Linked Claims</h3>
          </div>
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100">
            <Receipt className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No recent claims for this client.</p>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-teal" /> Authorization
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">Hours Used</span>
                <span className="text-slate-500">45 / 120 hrs</span>
              </div>
              <ProgressBar progress={37.5} color="bg-brand-teal" className="h-2" />
            </div>
            <p className="text-xs text-slate-500">{client.insurance.authorizationStatus}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-brand-teal" /> Outstanding Balance
          </h3>
          <div className="text-3xl font-bold text-slate-800">$0.00</div>
          <p className="text-sm text-slate-500 mt-1">All accounts are current.</p>
        </Card>
      </div>
    </div>
  );
}
