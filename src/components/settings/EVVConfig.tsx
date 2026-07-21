"use client";

import React, { useState } from "react";
import { Map, Server, Key, AlertTriangle, Save, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function EVVConfig() {
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">State EVV Configuration</h3>
          <p className="text-xs text-text-secondary mt-1">Configure Electronic Visit Verification (EVV) data aggregators.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-brand-teal shadow-brand-teal/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connected
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
              <Map className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Washington State</h4>
              <p className="text-xs text-slate-500 mt-0.5">Primary Operating State</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Aggregator Platform</label>
              <div className="font-semibold text-slate-900">HHAeXchange</div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Provider ID</label>
                <div className="flex relative">
                  <Server className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input type="text" readOnly value="PRV-849201" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">API Access Token</label>
                <div className="flex relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input type="password" readOnly value="************************" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-dashed">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <Map className="w-8 h-8 text-slate-300" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Add Operating State</h4>
              <p className="text-sm text-slate-500 mt-1 max-w-[250px] mx-auto">Operating in multiple states? Add another state's EVV aggregator configuration.</p>
            </div>
            <button 
              onClick={() => {
                setIsConnecting(true);
                setTimeout(() => setIsConnecting(false), 1500);
              }}
              disabled={isConnecting}
              className="px-5 py-2 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-slate-50 transition-all disabled:opacity-70"
            >
              {isConnecting ? "Opening Config..." : "Configure New State"}
            </button>
          </div>
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-800 text-sm">EVV Compliance Warning Threshold</h4>
          <p className="text-sm text-amber-700/80 mt-1">
            Administrators will be notified when real-time EVV data transmission fails to reach the state aggregator for more than 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
