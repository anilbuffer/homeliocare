"use client";

import React from "react";
import { billingData } from "@/lib/portalMockData";
import { Receipt, CreditCard, Download, ExternalLink, ShieldCheck } from "lucide-react";

export default function PortalBillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Billing & Payments</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your invoices and payment methods safely and securely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Balance */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-text-secondary font-medium">Current Balance</div>
              <div className="text-3xl font-bold text-text-primary">${billingData.currentBalance.toFixed(2)}</div>
            </div>
          </div>
          
          {billingData.currentBalance > 0 && (
            <div className="flex items-center gap-3 mt-6">
              <button className="flex-1 bg-brand-teal hover:bg-teal-600 text-white font-medium py-2.5 rounded-xl transition-colors">
                Pay Balance
              </button>
              <button className="flex-1 bg-white border border-border-subtle text-text-primary font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                View Details
              </button>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Payment Method</h2>
          <div className="p-4 border border-border-subtle rounded-xl flex items-center gap-3 bg-slate-50 mb-4">
            <CreditCard className="w-5 h-5 text-slate-500" />
            <div>
              <div className="text-sm font-medium text-text-primary">Visa ending in 4242</div>
              <div className="text-xs text-text-secondary">Expires 12/28</div>
            </div>
          </div>
          <button className="w-full text-sm text-brand-teal font-medium hover:underline text-left">
            + Add Payment Method
          </button>
        </div>
      </div>

      {/* Insurance Info */}
      <div className="bg-[#E6F7F1] border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-teal-900">Coverage Information</div>
          <p className="text-sm text-teal-800 mt-1">Your current authorization covers up to 20 hours per week of personal care services. You are responsible for any hours scheduled beyond this amount.</p>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle overflow-hidden">
        <div className="p-5 border-b border-border-subtle">
          <h2 className="text-lg font-semibold text-text-primary">Invoice History</h2>
        </div>
        <div className="divide-y divide-border-subtle">
          {billingData.invoices.map(invoice => (
            <div key={invoice.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`px-2.5 py-1 rounded-md text-xs font-medium w-16 text-center ${
                  invoice.status === 'Paid' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'
                }`}>
                  {invoice.status}
                </div>
                <div>
                  <div className="font-medium text-text-primary text-sm">{invoice.date}</div>
                  <div className="text-xs text-text-secondary">{invoice.id}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end">
                <div className="font-medium text-text-primary">${invoice.amount.toFixed(2)}</div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-brand-teal hover:bg-[#E6F7F1] rounded-lg transition-colors" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                  {invoice.status === 'Due' && (
                    <button className="px-3 py-1.5 text-sm font-medium bg-brand-teal text-white rounded-lg hover:bg-teal-600 transition-colors">
                      Pay
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
