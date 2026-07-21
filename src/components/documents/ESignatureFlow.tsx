"use client";

import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, FileText, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ESignatureFlowProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  onSuccess: () => void;
}

export function ESignatureFlow({ isOpen, onClose, documentName, onSuccess }: ESignatureFlowProps) {
  const [step, setStep] = useState<"terms" | "sign" | "success">("terms");
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSign = () => {
    if (signature.trim().length < 3) return;
    setStep("success");
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Sign Document</h3>
                    <p className="text-xs text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">{documentName}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {step === "terms" && (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex gap-3 text-sm text-blue-900">
                      <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Electronic Signature Agreement</p>
                        <p className="text-blue-700/80">By proceeding, you agree that your electronic signature is the legally binding equivalent to your handwritten signature. This document will be securely stored with an immutable audit trail.</p>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal"
                      />
                      <span className="text-sm text-slate-700 font-medium">I have read and agree to the terms of the electronic signature disclosure.</span>
                    </label>

                    <button
                      disabled={!agreed}
                      onClick={() => setStep("sign")}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${agreed ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20 hover:bg-teal-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                    >
                      Continue to Sign
                    </button>
                  </div>
                )}

                {step === "sign" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Type your full name to sign</label>
                      <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-lg font-medium"
                      />
                    </div>
                    
                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center min-h-[120px]">
                       {signature ? (
                         <div className="font-[Caveat,cursive] text-4xl text-slate-800 opacity-80">{signature}</div>
                       ) : (
                         <div className="text-slate-400 text-sm font-medium flex items-center gap-2">
                           <AlertCircle className="w-4 h-4" />
                           Signature preview will appear here
                         </div>
                       )}
                    </div>

                    <button
                      disabled={signature.trim().length < 3}
                      onClick={handleSign}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${signature.trim().length >= 3 ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20 hover:bg-teal-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                    >
                      Sign & Complete
                    </button>
                  </div>
                )}

                {step === "success" && (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">Document Signed</h4>
                      <p className="text-slate-500 text-sm mt-1">An audit log entry has been generated.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
