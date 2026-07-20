"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportCategoryTabs } from "@/components/reports/ReportCategoryTabs";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportView } from "@/components/reports/ReportView";
import { CustomReportBuilder } from "@/components/reports/CustomReportBuilder";
import { SavedReportsList } from "@/components/reports/SavedReportsList";
import { ScheduledReportsList } from "@/components/reports/ScheduledReportsList";
import {
  ReportCategory,
  allPrebuiltReports,
  mockSavedReports,
  mockScheduledReports,
  ReportDefinition
} from "@/lib/reports-mock-data";

const categories: ReportCategory[] = ["Clinical", "HR", "Scheduling", "Financial", "Compliance", "Custom Reports"];

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ReportCategory>("Clinical");
  const [activeReport, setActiveReport] = useState<ReportDefinition | null>(null);

  // Filter reports for the active category
  const categoryReports = allPrebuiltReports.filter(r => r.category === activeCategory);

  return (
    <AppLayout>
      <div className="max-w-full mx-auto w-full">
        <ReportsHeader
          savedCount={mockSavedReports.length}
          scheduledCount={mockScheduledReports.length}
          onBuildCustom={() => setActiveCategory("Custom Reports")}
        />

        <ReportCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeCategory === "Custom Reports" ? (
              <div className="space-y-12">
                <section>
                  <CustomReportBuilder />
                </section>
                <section>
                  <SavedReportsList reports={mockSavedReports} />
                </section>
                <section>
                  <ScheduledReportsList reports={mockScheduledReports} />
                </section>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-3">
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
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeReport && (
          <ReportView
            report={activeReport}
            onClose={() => setActiveReport(null)}
          />
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
