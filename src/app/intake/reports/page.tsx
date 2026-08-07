"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportsStatsRow } from "@/components/reports/ReportsStatsRow";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportView } from "@/components/reports/ReportView";
import {
  allPrebuiltReports,
  ReportDefinition
} from "@/lib/reports-mock-data";

export default function IntakeReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportDefinition | null>(null);

  // Filter reports for the intake category
  const categoryReports = allPrebuiltReports.filter(r => r.category === "Intake");

  return (
    <>
      <div className="max-w-full mx-auto w-full">
        <ReportsHeader />

        <ReportsStatsRow />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-6">
          {categoryReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onView={(r) => setActiveReport(r)}
            />
          ))}
          {categoryReports.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              No reports found for this category.
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeReport && (
          <ReportView
            report={activeReport}
            onClose={() => setActiveReport(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
