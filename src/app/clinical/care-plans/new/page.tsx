"use client";

import React from "react";
import { ComprehensiveCarePlanForm } from "@/components/clinical/ComprehensiveCarePlanForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewCarePlanPage() {
  return (
    <div className="w-full mx-auto max-w-[1400px]">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link 
          href="/clinical" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clinical Dashboard
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ComprehensiveCarePlanForm />
      </motion.div>
    </div>
  );
}
