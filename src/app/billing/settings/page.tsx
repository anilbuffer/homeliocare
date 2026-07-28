"use client";

import React, { useState } from "react";
import {
  Building,
  Receipt,
  CreditCard,
  FileText,
  Bell,
  Save,
  CheckCircle2,
  Sliders,
  Globe,
  Lock
} from "lucide-react";

export default function BillingSettingsPage() {
  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"organization" | "invoicing" | "payments" | "tax" | "notifications">("organization");

  // Success Toast state
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Organization Form State
  const [agencyName, setAgencyName] = useState("Homelio Regional Care");
  const [contactName, setContactName] = useState("Marcus Billington");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [email, setEmail] = useState("billing@homeliocare.com");
  const [address, setAddress] = useState("123 Care Lane, Springfield, IL 62701");

  // Invoicing Settings State
  const [invoiceTerm, setInvoiceTerm] = useState("Net 30");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [lateFee, setLateFee] = useState("1.5");
  const [invoicePrefix, setInvoicePrefix] = useState("INV-");

  // Payment Gateway State
  const [gateway, setGateway] = useState("stripe");
  const [autoCharge, setAutoCharge] = useState(false);
  const [acceptCreditCards, setAcceptCreditCards] = useState(true);
  const [acceptACH, setAcceptACH] = useState(true);

  // Tax & NPI State
  const [taxId, setTaxId] = useState("XX-XXXX123");
  const [npiNumber, setNpiNumber] = useState("1234567890");
  const [taxonomyCode, setTaxonomyCode] = useState("251E00000X");

  // Notification Settings State
  const [emailNewInvoices, setEmailNewInvoices] = useState(true);
  const [emailOverdue, setEmailOverdue] = useState(true);
  const [emailPaymentReceived, setEmailPaymentReceived] = useState(true);
  const [emailDenials, setEmailDenials] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Billing Settings
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-0.5">Configuration & Preferences</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your agency details, invoicing preferences, payment gateways, and billing alerts.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
            <span>Settings updated successfully!</span>
          </div>
        )}
      </div>

      {/* Desktop 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Left Vertical Tab Navigation (1/4 width) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-1 self-start">
          {[
            { id: "organization", label: "Organization Profile", icon: Building, desc: "Agency info & contacts" },
            { id: "invoicing", label: "Invoicing Terms", icon: Receipt, desc: "Terms, fees & prefixes" },
            { id: "payments", label: "Payment Gateways", icon: CreditCard, desc: "Stripe, ACH & Auto-charge" },
            { id: "tax", label: "Tax & NPI Details", icon: FileText, desc: "EIN, NPI & Taxonomy" },
            { id: "notifications", label: "Billing Alerts", icon: Bell, desc: "Email & overdue notices" },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${isActive
                    ? "bg-brand-teal text-white shadow-xs font-bold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium"
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-brand-teal"}`} />
                <div>
                  <div className="text-xs font-bold leading-tight">{t.label}</div>
                  <div className={`text-[11px] mt-0.5 ${isActive ? "text-teal-100" : "text-gray-400 font-normal"}`}>
                    {t.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Main Form Container (3/4 width) */}
        <div className="lg:col-span-3">
          {/* TAB 1: ORGANIZATION PROFILE */}
          {activeTab === "organization" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Organization Profile</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Primary details for your agency that appear on invoices and claims.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs md:col-span-2">
                  <label className="font-bold text-gray-800">Agency Legal Name</label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Primary Billing Contact Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Billing Support Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Billing Support Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div className="space-y-1.5 text-xs md:col-span-2">
                  <label className="font-bold text-gray-800">Official Business Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: INVOICING TERMS */}
          {activeTab === "invoicing" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Invoicing Configuration</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Configure default payment terms, late fees, and generation settings.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Configuration
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Default Payment Terms</span>
                      <span className="text-[11px] text-gray-500 lh-0.6 inline-block">Applies to newly generated private pay invoices.</span>
                    </div>
                    <select
                      value={invoiceTerm}
                      onChange={(e) => setInvoiceTerm(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="Due on Receipt">Due on Receipt</option>
                      <option value="Net 15">Net 15</option>
                      <option value="Net 30">Net 30</option>
                      <option value="Net 60">Net 60</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Late Fee Percentage (%)</span>
                      <span className="text-[11px] text-gray-500 lh-0.6 inline-block">Monthly percentage penalty applied to overdue balances.</span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={lateFee}
                      onChange={(e) => setLateFee(e.target.value)}
                      className="w-24 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900"
                    />
                  </div>
                </div>

                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Invoice Number Prefix</span>
                      <span className="text-[11px] text-gray-500 lh-0.6 inline-block">Prefix added to auto-generated invoice numbers.</span>
                    </div>
                    <input
                      type="text"
                      value={invoicePrefix}
                      onChange={(e) => setInvoicePrefix(e.target.value)}
                      className="w-32 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-gray-900 block">Auto-generate Recurring Invoices</span>
                    <span className="text-[11px] text-gray-500 lh-0.6 inline-block">Automatically generate invoices based on recurring care plans.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoGenerate}
                    onChange={(e) => setAutoGenerate(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: PAYMENT GATEWAYS */}
          {activeTab === "payments" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Payment Gateways & Options</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Manage how clients can submit payments to your organization.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Payments
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 gap-3 rounded-xl border border-slate-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Primary Payment Processor</span>
                      <span className="text-[11px] text-gray-500 lh-0.6 inline-block">Select the provider integrated for client portal payments.</span>
                    </div>
                    <select
                      value={gateway}
                      onChange={(e) => setGateway(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                    >
                      <option value="stripe">Stripe</option>
                      <option value="authorize">Authorize.Net</option>
                      <option value="square">Square</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-emerald-950 block">Gateway Connection Active</span>
                      <span className="text-[11px] text-emerald-800">Your Stripe account is successfully linked and verified.</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg hover:bg-emerald-100/60"
                  >
                    Manage API Keys
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Accept Credit Cards</span>
                      <span className="text-gray-500 text-[11px]">Allow clients to pay via Visa, Mastercard, AMEX (Gateway fees apply).</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={acceptCreditCards}
                      onChange={(e) => setAcceptCreditCards(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Accept ACH Bank Transfers</span>
                      <span className="text-gray-500 text-[11px]">Allow direct debit from client bank accounts (Lower fees).</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={acceptACH}
                      onChange={(e) => setAcceptACH(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">Enable Auto-Charge Setup</span>
                      <span className="text-gray-500 text-[11px]">Allow clients to save payment methods for automatic recurring payments.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoCharge}
                      onChange={(e) => setAutoCharge(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: TAX & NPI */}
          {activeTab === "tax" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Tax & Provider IDs</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Critical identifiers required for Medicaid/Medicare and insurance claims.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save IDs
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Tax ID / EIN</label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-mono tracking-wider"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">National Provider Identifier (NPI)</label>
                  <input
                    type="text"
                    value={npiNumber}
                    onChange={(e) => setNpiNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-mono tracking-wider"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-gray-800">Primary Taxonomy Code</label>
                  <input
                    type="text"
                    value={taxonomyCode}
                    onChange={(e) => setTaxonomyCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-teal font-mono tracking-wider"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.04)] space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Billing Team Notifications</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Manage which alerts the primary billing contact receives.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Alerts
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">New Invoice Generated</span>
                    <span className="text-gray-500 text-[11px]">Receive an email when automated recurring invoices are generated.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNewInvoices}
                    onChange={(e) => setEmailNewInvoices(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Overdue Account Alert</span>
                    <span className="text-gray-500 text-[11px]">Notify when a client account passes the late fee threshold.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailOverdue}
                    onChange={(e) => setEmailOverdue(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Payment Received</span>
                    <span className="text-gray-500 text-[11px]">Immediate alert upon successful processing of credit card or ACH.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailPaymentReceived}
                    onChange={(e) => setEmailPaymentReceived(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">Claim Denial Notice</span>
                    <span className="text-gray-500 text-[11px]">Priority alert when an ERA (835) returns a denied claim status.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailDenials}
                    onChange={(e) => setEmailDenials(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded accent-brand-teal"
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
