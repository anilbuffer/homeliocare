"use client";

import React, { useState } from "react";
import { billingData } from "@/lib/portalMockData";
import { Receipt, CreditCard, Download, ExternalLink, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortalBillingPage() {
  const [panelType, setPanelType] = useState<'pay-balance' | 'view-details' | 'add-payment' | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleOpenPanel = (type: 'pay-balance' | 'view-details' | 'add-payment', invoice?: any) => {
    setPanelType(type);
    if (invoice) {
      setSelectedInvoice(invoice);
    } else {
      setSelectedInvoice(null);
    }
  };

  const closePanel = () => {
    setPanelType(null);
    setTimeout(() => setSelectedInvoice(null), 300);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Billing & Payments</h1>
        <p className="text-xs text-text-secondary mt-1">Manage your invoices and payment methods safely and securely.</p>
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
              <button
                onClick={() => handleOpenPanel('pay-balance')}
                className="flex-1 bg-brand-teal hover:bg-teal-600 text-white font-medium py-2.5 rounded-xl transition-colors"
              >
                Pay Balance
              </button>
              <button
                onClick={() => handleOpenPanel('view-details')}
                className="flex-1 bg-white border border-border-subtle text-text-primary font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
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
          <button
            onClick={() => handleOpenPanel('add-payment')}
            className="w-full text-sm text-brand-teal font-medium hover:underline text-left"
          >
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
                <div className={`px-2.5 py-1 rounded-md text-xs font-medium w-16 text-center ${invoice.status === 'Paid' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'
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
                  <button
                    onClick={() => alert(`Downloading ${invoice.id}...`)}
                    className="p-2 text-slate-400 hover:text-brand-teal hover:bg-[#E6F7F1] rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {invoice.status === 'Due' && (
                    <button
                      onClick={() => handleOpenPanel('pay-balance', invoice)}
                      className="px-3 py-1.5 text-sm font-medium bg-brand-teal text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Panel overlay */}
      <AnimatePresence>
        {panelType && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-border-subtle"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">
                  {panelType === 'pay-balance' ? 'Make a Payment' :
                    panelType === 'view-details' ? 'Balance Details' :
                      'Add Payment Method'}
                </h2>
                <button
                  onClick={closePanel}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                {panelType === 'pay-balance' && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-border-subtle flex justify-between items-center">
                      <span className="text-sm font-medium text-text-secondary">Amount to pay</span>
                      <span className="text-xl font-bold text-text-primary">
                        ${selectedInvoice ? selectedInvoice.amount.toFixed(2) : billingData.currentBalance.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-text-primary mb-3">Payment Method</h3>
                      <div className="border border-brand-teal ring-1 ring-brand-teal rounded-xl p-4 flex items-center justify-between bg-white cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-brand-teal" />
                          <div>
                            <div className="text-sm font-medium text-text-primary">Visa ending in 4242</div>
                            <div className="text-xs text-text-secondary">Expires 12/28</div>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-[5px] border-brand-teal bg-white" />
                      </div>
                      <button
                        onClick={() => setPanelType('add-payment')}
                        className="mt-3 text-sm text-brand-teal font-medium hover:underline"
                      >
                        + Use a different method
                      </button>
                    </div>

                    <div className="pt-4 mt-auto">
                      <button
                        onClick={() => {
                          alert('Payment processed successfully!');
                          closePanel();
                        }}
                        className="w-full py-2.5 bg-brand-teal text-white rounded-xl text-sm font-medium hover:bg-brand-teal/90 transition-colors shadow-sm"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                )}

                {panelType === 'view-details' && (
                  <div className="space-y-6">
                    <p className="text-sm text-text-secondary">
                      Your current balance is composed of the following items.
                    </p>

                    <div className="space-y-4">
                      {billingData.invoices.filter(inv => inv.status === 'Due').map(invoice => (
                        <div key={invoice.id} className="flex justify-between items-center p-3 border border-border-subtle rounded-xl">
                          <div>
                            <div className="text-sm font-medium text-text-primary">{invoice.id}</div>
                            <div className="text-xs text-text-secondary">{invoice.date}</div>
                          </div>
                          <div className="font-semibold text-text-primary">${invoice.amount.toFixed(2)}</div>
                        </div>
                      ))}

                      {/* Mock unbilled activity */}
                      <div className="flex justify-between items-center p-3 border border-border-subtle rounded-xl bg-slate-50">
                        <div>
                          <div className="text-sm font-medium text-text-primary">Recent Unbilled Activity</div>
                          <div className="text-xs text-text-secondary">Oct 20 - Present</div>
                        </div>
                        <div className="font-semibold text-text-primary">$0.00</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border-subtle flex justify-between items-center">
                      <span className="font-semibold text-text-primary">Total Balance</span>
                      <span className="text-lg font-bold text-text-primary">${billingData.currentBalance.toFixed(2)}</span>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setPanelType('pay-balance')}
                        className="w-full py-2.5 bg-brand-teal text-white rounded-xl text-sm font-medium hover:bg-brand-teal/90 transition-colors shadow-sm"
                      >
                        Pay Full Balance
                      </button>
                    </div>
                  </div>
                )}

                {panelType === 'add-payment' && (
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary mb-6">
                      Add a new credit card or bank account for future payments.
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Name on Card</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Card Number</label>
                      <div className="relative">
                        <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-10 pr-3 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => {
                          alert('Payment method added successfully!');
                          setPanelType('pay-balance');
                        }}
                        className="w-full py-2.5 bg-brand-teal text-white rounded-xl text-sm font-medium hover:bg-brand-teal/90 transition-colors shadow-sm"
                      >
                        Save Payment Method
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

