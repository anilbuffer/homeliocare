"use client";

import React from "react";
import { carePlanSummary } from "@/lib/portalMockData";
import { Heart, Target, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PortalCarePlanPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
            Care Plan Summary
          </h1>
          <p className="text-sm text-text-secondary mt-1">Current goals and focus areas for the care team.</p>
        </div>
        <div className="w-12 h-12 bg-[#E6F7F1] rounded-full flex items-center justify-center text-brand-teal shrink-0">
          <Heart className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle">
        <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-teal" />
          Focus Areas
        </h2>
        
        <div className="space-y-6">
          {carePlanSummary.focusAreas.map((area, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-border-subtle">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{area.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{area.description}</p>
                </div>
                {area.progress === 100 && (
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    On Track
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>Progress towards goal</span>
                  <span>{area.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${area.progress}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${area.progress === 100 ? 'bg-emerald-500' : 'bg-brand-teal'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6">
        <p className="text-sm text-blue-800 text-center">
          This is a simplified summary of the active care plan. For full clinical details or to request changes, please message your Care Coordinator.
        </p>
      </div>
    </div>
  );
}
