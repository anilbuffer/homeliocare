"use client";

import React, { useState } from "react";
import { Mail, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

interface LightweightAuthGateProps {
  onAuthenticated: (email: string) => void;
}

export function LightweightAuthGate({ onAuthenticated }: LightweightAuthGateProps) {
  const [step, setStep] = useState<"email" | "passcode">("email");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Mock sending email
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("passcode");
    }, 1000);
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.length < 6) return;
    
    setIsSubmitting(true);
    // Mock verification
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthenticated(email);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Referral Status</h1>
          <p className="text-slate-500 text-sm">
            Securely access updates on referrals you've submitted.
          </p>
        </div>

        <div className="p-8">
          {step === "email" ? (
            <form onSubmit={handleRequestPasscode} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="authEmail" className="text-sm font-medium text-slate-700 block">
                  Enter your email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    required
                    id="authEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="name@hospital.org"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  We'll send a secure, one-time passcode to this email. No password required.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-600/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Passcode"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyPasscode} className="space-y-6">
              <div className="bg-green-50 text-green-800 text-sm p-3 rounded-lg flex items-start gap-2 border border-green-200 mb-6">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" />
                <p>We sent a 6-digit passcode to <strong>{email}</strong>.</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="passcode" className="text-sm font-medium text-slate-700 block text-center">
                  Enter the 6-digit code
                </label>
                <input
                  required
                  id="passcode"
                  type="text"
                  maxLength={6}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-3 text-center text-2xl font-mono tracking-[0.5em] border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow uppercase"
                  placeholder="------"
                  autoComplete="one-time-code"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || passcode.length < 6}
                className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-600/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Verifying..." : "View My Referrals"}
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Use a different email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
