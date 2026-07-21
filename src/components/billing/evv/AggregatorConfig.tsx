"use client";

import React, { useState } from "react";
import { mockStateConfigs } from "@/lib/mock-data/evv";
import { AltEVVCertification } from "./AltEVVCertification";
import { Settings, Save, Server, Globe, Key, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function AggregatorConfig() {
  const [configs] = useState(mockStateConfigs);
  const [selectedState, setSelectedState] = useState(configs[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("EVV Aggregator configuration saved successfully.");
    }, 1500);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-1 space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 mb-3 px-2">States</h3>
        {configs.map((config) => (
          <button
            key={config.state}
            onClick={() => setSelectedState(config)}
            className={`relative w-full text-left px-4 py-3 rounded-2xl transition-all border ${selectedState.state === config.state
              ? "bg-white border-transparent shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              : "bg-white border-slate-200 hover:bg-slate-100 text-slate-600"
              }`}
          >
            {selectedState.state === config.state && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-teal rounded-r-full" />
            )}
            <div className="flex justify-between items-center">
              <span className={`font-semibold ${selectedState.state === config.state ? 'text-brand-teal' : 'text-slate-700'}`}>
                {config.state}
              </span>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">
                {config.aggregator}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${config.altEvvStatus === 'Active' ? 'bg-emerald-500' :
                config.altEvvStatus === 'Testing' ? 'bg-blue-500' :
                  config.altEvvStatus === 'Vendor Approved' ? 'bg-amber-500' : 'bg-slate-300'
                }`} />
              {config.altEvvStatus}
            </div>
          </button>
        ))}
      </div>

      <div className="lg:col-span-3" key={selectedState.state}>
        <Card className="p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {selectedState.state} - {selectedState.aggregator}
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">Configure API credentials and state-specific EVV rules.</p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto justify-center flex items-center gap-2 bg-brand-teal text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-teal/90 transition-all shadow-md shadow-brand-teal/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 active:scale-95">
              <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
              {isSaving ? 'Saving...' : 'Save Config'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-teal" />
                Connection Settings
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">API Endpoint URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-slate-100"
                    defaultValue={`https://api.${selectedState.aggregator.toLowerCase()}.com/v1/evv`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Provider ID / Agency ID</label>
                <div className="relative">
                  <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-slate-100"
                    defaultValue="PRV-849201"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">API Key / Token</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-slate-100"
                    defaultValue="************************"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-brand-teal" />
                State Mandated Rules
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Rounding Rule (Minutes)</label>
                  <select
                    className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-slate-100"
                    defaultValue={selectedState.roundingRuleMinutes}
                  >
                    <option value={1}>Exact (1 min)</option>
                    <option value={7}>7/8 Minute Rule</option>
                    <option value={15}>15 Minute Rule</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Grace Period (Minutes)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.04)] shadow-slate-100"
                    defaultValue={selectedState.gracePeriodMinutes}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Available Reason Codes</label>
                <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-2 max-h-[180px] overflow-y-auto space-y-1">
                  {selectedState.reasonCodes.map(rc => (
                    <div key={rc.code} className="flex gap-3 text-sm px-3 py-2 rounded-lg bg-white border border-slate-100 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
                      <span className="font-bold text-slate-800 min-w-[36px]">{rc.code}</span>
                      <span className="text-slate-600">{rc.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <AltEVVCertification status={selectedState.altEvvStatus} />
        </Card>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 z-[100]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
