"use client";

import React from "react";
import { motion } from "framer-motion";
import { AssessmentForm } from "@/components/clinical/AssessmentForm";

export default function ClinicalAssessmentsPage() {
  return (
    <div className="w-full mx-auto space-y-6 h-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Assessments & Care Plan Builder
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Complete initial and periodic client evaluations
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[calc(100vh-140px)]"
      >
        <AssessmentForm />
      </motion.div>
    </div>
  );
}
