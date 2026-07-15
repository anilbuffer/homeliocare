"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MyTraining } from "@/components/training/MyTraining";
import { ManageTraining } from "@/components/training/ManageTraining";
import { RequiredTraining } from "@/components/training/RequiredTraining";
import { MyCertifications } from "@/components/training/MyCertifications";

type ViewType = "my-training" | "manage-training" | "required-training" | "my-certifications";

export default function TrainingPage() {
  const [view, setView] = useState<ViewType>("my-training");

  const tabs: { id: ViewType; label: string }[] = [
    { id: "my-training", label: "My Training" },
    { id: "manage-training", label: "Manage Training" },
    { id: "required-training", label: "Required Training" },
    { id: "my-certifications", label: "My Certifications" },
  ];

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Training Center</h2>
          <p className="text-xs text-text-secondary mt-0.5">Compliance, certifications & continuing education</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-slate-200/60 p-1 rounded-full relative overflow-x-auto [&::-webkit-scrollbar]:hidden w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${view === tab.id ? "text-slate-800" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {view === tab.id && (
                <motion.div
                  layoutId="training-tab-indicator"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_6px_32px_rgba(0,0,0,0.06)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {view === "my-training" ? (
          <motion.div
            key="my-training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <MyTraining />
          </motion.div>
        ) : view === "manage-training" ? (
          <motion.div
            key="manage-training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ManageTraining />
          </motion.div>
        ) : view === "required-training" ? (
          <motion.div
            key="required-training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <RequiredTraining />
          </motion.div>
        ) : (
          <motion.div
            key="my-certifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <MyCertifications />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
