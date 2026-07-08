"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MyTraining } from "@/components/training/MyTraining";
import { ManageTraining } from "@/components/training/ManageTraining";

export default function TrainingPage() {
  const [view, setView] = useState<"my-training" | "manage-training">("my-training");

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Training Center</h2>
          <p className="text-xs text-text-secondary mt-0.5">Compliance, certifications & continuing education</p>
        </div>

        {/* Toggle */}
        <div className="flex gap-6 bg-slate-200/60 p-1 rounded-full relative">
          <div
            className="absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
            style={{ left: view === "my-training" ? "4px" : "calc(50% - 4px)" }}
          />
          <button
            onClick={() => setView("my-training")}
            className={`text-center relative z-10 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "my-training" ? "text-slate-800" : "text-slate-500 hover:text-slate-700"
              }`}
          >
            My Training
          </button>
          <button
            onClick={() => setView("manage-training")}
            className={`text-center relative z-10 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "manage-training" ? "text-slate-800" : "text-slate-500 hover:text-slate-700"
              }`}
          >
            Manage Training
          </button>
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
        ) : (
          <motion.div
            key="manage-training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ManageTraining />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
