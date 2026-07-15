"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IncidentsHeader } from "./IncidentsHeader";
import { IncidentsKpiStrip } from "./IncidentsKpiStrip";
import { IncidentTypeChart } from "./IncidentTypeChart";
import { IncidentQueue } from "./IncidentQueue";
import { TrendsPanel } from "./TrendsPanel";
import { IncidentDetailPanel } from "./IncidentDetailPanel";
import { ReportIncidentForm } from "./ReportIncidentForm";
import { mockIncidents } from "@/lib/mockIncidentData";
import { Incident } from "@/types/incidents";

export function IncidentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);

  // In a real app, you would fetch this data
  const incidents = mockIncidents;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full space-y-6"
      >
        <IncidentsHeader onReportIncident={() => setIsReportFormOpen(true)} />

        <motion.div variants={itemVariants}>
          <IncidentsKpiStrip />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[800px]">
          {/* Left Column: Charts */}
          <div className="flex flex-col gap-6 lg:col-span-1 h-full">
            <IncidentTypeChart 
              onSelectCategory={(category) => setSelectedCategory(category === selectedCategory ? null : category)} 
            />
            <TrendsPanel />
          </div>

          {/* Right Column: Queue */}
          <div className="lg:col-span-2 h-full min-h-[500px]">
            <IncidentQueue 
              incidents={incidents}
              selectedCategory={selectedCategory}
              onRowClick={setSelectedIncident}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Modals & Panels */}
      {selectedIncident && (
        <IncidentDetailPanel 
          incident={selectedIncident} 
          onClose={() => setSelectedIncident(null)} 
        />
      )}

      <ReportIncidentForm 
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
      />
    </>
  );
}
