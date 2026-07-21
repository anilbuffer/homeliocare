"use client";

import { useState } from "react";
import { CreditCard, Plus, ShieldCheck, FileText, Settings, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function PayerSetup() {
  const [payers, setPayers] = useState([
    { id: 1, name: "Medicaid (State Default)", type: "Government", clearinghouse: "Waystar", status: "Active" },
    { id: 2, name: "BlueCross BlueShield", type: "Commercial MCO", clearinghouse: "Change Healthcare", status: "Active" },
    { id: 3, name: "Private Pay", type: "Direct", clearinghouse: "Stripe", status: "Active" },
    { id: 4, name: "Aetna Better Health", type: "Commercial MCO", clearinghouse: "Waystar", status: "Pending" },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      setPayers([{ id: Math.random(), name: "New Payer", type: "Commercial MCO", clearinghouse: "Waystar", status: "Pending" }, ...payers]);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Payer Setup & Integrations</h3>
          <p className="text-xs text-text-secondary mt-1">Manage accepted payers, MCOs, and clearinghouse integrations.</p>
        </div>
        <button 
          onClick={handleAdd}
          disabled={isAdding}
          className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 disabled:opacity-70 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
        >
          {isAdding ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? "Adding..." : "Add Payer"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {payers.map((payer) => (
            <Card key={payer.id} className="p-5 flex items-center justify-between group hover:border-brand-teal/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  payer.type === "Government" ? "bg-emerald-50 text-emerald-600" :
                  payer.type === "Direct" ? "bg-purple-50 text-purple-600" :
                  "bg-blue-50 text-blue-600"
                }`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{payer.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">{payer.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {payer.clearinghouse}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${
                  payer.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {payer.status}
                </span>
                <button className="text-xs font-medium text-brand-teal hover:text-teal-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Settings className="w-3.5 h-3.5" /> Configure
                </button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <h4 className="font-semibold mb-2">Clearinghouse Status</h4>
            <p className="text-sm text-slate-300 mb-6">Your agency is currently connected to 2 active clearinghouses.</p>
            
            <div className="space-y-3">
              <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-sm font-medium">Waystar</span>
                </div>
                <span className="text-xs text-slate-400">Connected</span>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-sm font-medium">Stripe (CC)</span>
                </div>
                <span className="text-xs text-slate-400">Connected</span>
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> View Remittance Rules
            </button>
          </div>
          
          <Card className="p-6">
             <h4 className="font-semibold text-slate-900 mb-2">Need a new integration?</h4>
             <p className="text-xs text-slate-500 mb-4">We support over 40+ Medicaid clearinghouses and MCO direct connections.</p>
             <button className="text-sm font-medium text-brand-teal flex items-center gap-1 hover:underline">
               Browse Integration Marketplace <ExternalLink className="w-3.5 h-3.5" />
             </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
