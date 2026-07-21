"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { CheckCircle2, Server, ArrowRightLeft, Clock, Activity, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export function ClearinghouseStatus() {
  const providers = [
    { name: "Waystar", status: "Operational", ping: "24ms", type: "Primary 837/835", lastSync: "2 mins ago", active: true },
    { name: "Office Ally", status: "Operational", ping: "45ms", type: "Secondary", lastSync: "1 hour ago", active: false },
    { name: "Availity", status: "Degraded", ping: "150ms", type: "Eligibility (270/271)", lastSync: "5 mins ago", active: true, degraded: true },
  ];

  return (
    <Card className="bg-white backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:border-brand-teal/60 transition-all">
      <CardHeader 
        title="Clearinghouse Connections" 
        action={
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
            <Activity className="w-3.5 h-3.5" />
            System Healthy
          </div>
        }
      />
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((provider, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={clsx(
              "p-4 rounded-xl border flex flex-col gap-3 relative overflow-hidden",
              provider.active ? (provider.degraded ? "bg-amber-50/50 border-amber-200" : "bg-white border-slate-200 shadow-sm") : "bg-slate-50 border-slate-100 opacity-60 grayscale"
            )}
          >
            {provider.active && !provider.degraded && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent via-transparent to-green-100 opacity-50" />
            )}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={clsx("p-2 rounded-lg", provider.degraded ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600")}>
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{provider.name}</h3>
                  <p className="text-xs text-slate-500">{provider.type}</p>
                </div>
              </div>
              {provider.active && !provider.degraded && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {provider.degraded && <AlertCircle className="w-5 h-5 text-amber-500" />}
            </div>

            <div className="flex items-center gap-4 mt-2 pt-3 border-t border-slate-100/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                {provider.ping}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {provider.lastSync}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
