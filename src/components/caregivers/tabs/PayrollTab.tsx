"use client";

import React from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DollarSign, Clock, FileText, Download, TrendingUp, CalendarDays } from "lucide-react";

export function PayrollTab({ caregiver }: { caregiver: Caregiver }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-white/80 text-sm font-medium mb-1">Current Period Earnings</div>
          <div className="text-3xl font-bold text-white mb-2">$1,450.00</div>
          <div className="text-xs font-medium text-emerald-400 bg-emerald-400/10 w-fit px-2 py-0.5 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +$120 vs last period
          </div>
          <div className="absolute bottom-6 right-6 text-white/10">
            <DollarSign className="w-16 h-16" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-slate-500 text-sm font-medium">Hours (Current Period)</div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">32.5<span className="text-lg text-slate-400 font-medium ml-1">hrs</span></div>
          <div className="text-xs text-slate-500">
            Regular: <span className="font-medium text-slate-700">30 hrs</span> • Overtime: <span className="font-medium text-slate-700">2.5 hrs</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="text-slate-500 text-sm font-medium">Next Pay Date</div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">Jul 20</div>
          <div className="text-xs text-slate-500">
            Direct deposit to account ending in 1234
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Recent Pay Stubs</h3>
            <button className="text-sm font-medium text-brand-teal hover:text-emerald-700 transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { period: "Jul 01 - Jul 15, 2026", date: "Jul 20, 2026", amount: "$1,450.00", status: "Processing" },
              { period: "Jun 16 - Jun 30, 2026", date: "Jul 05, 2026", amount: "$1,320.50", status: "Paid" },
              { period: "Jun 01 - Jun 15, 2026", date: "Jun 20, 2026", amount: "$1,480.00", status: "Paid" },
            ].map((stub, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 group-hover:text-brand-teal transition-colors">
                      {stub.period}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Paid on {stub.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-slate-800">{stub.amount}</div>
                    <Badge variant={stub.status === "Paid" ? "success" : "warning"} className="text-[10px] px-1.5 py-0">
                      {stub.status}
                    </Badge>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-brand-teal hover:bg-teal-50 rounded-lg transition-colors" title="Download Pay Stub">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Mileage Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500">
                    <th className="pb-3 text-left font-medium">Date</th>
                    <th className="pb-3 text-left font-medium">Route</th>
                    <th className="pb-3 text-right font-medium">Miles</th>
                    <th className="pb-3 text-right font-medium">Reimbursement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr>
                    <td className="py-3 font-medium text-slate-700">Jul 14</td>
                    <td className="py-3 text-slate-600 truncate max-w-[150px]">Client A to Client B</td>
                    <td className="py-3 text-right font-medium text-slate-700">12.5</td>
                    <td className="py-3 text-right text-slate-600">$8.12</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-700">Jul 12</td>
                    <td className="py-3 text-slate-600 truncate max-w-[150px]">Office to Client A</td>
                    <td className="py-3 text-right font-medium text-slate-700">5.2</td>
                    <td className="py-3 text-right text-slate-600">$3.38</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Bonuses & Adjustments</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-slate-800">Weekend Shift Premium</div>
                  <div className="text-xs text-slate-500">Jul 11, 2026</div>
                </div>
                <div className="font-semibold text-emerald-600">+$50.00</div>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-slate-800">Equipment Deposit</div>
                  <div className="text-xs text-slate-500">Jun 01, 2026</div>
                </div>
                <div className="font-semibold text-slate-600">-$25.00</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
