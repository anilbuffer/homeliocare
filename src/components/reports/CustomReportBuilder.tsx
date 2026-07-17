import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Database, LayoutTemplate, Filter, BarChart2, CheckCircle2 } from "lucide-react";
import { ChartRenderer } from "./ChartRenderer";

export function CustomReportBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sources, setSources] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [chartType, setChartType] = useState<"table" | "bar" | "line" | "donut" | "kpi">("table");

  const availableSources = [
    { id: "clients", name: "Clients", desc: "Demographics, status, care plans" },
    { id: "caregivers", name: "Caregivers", desc: "HR, availability, compliance" },
    { id: "visits", name: "Visits", desc: "Schedules, EVV, duration" },
    { id: "claims", name: "Claims", desc: "Billing, payments, denials" },
    { id: "incidents", name: "Incidents", desc: "Reports, categories, severity" }
  ];

  const availableFields = [
    { id: "status", name: "Status" },
    { id: "duration", name: "Duration" },
    { id: "date", name: "Date" },
    { id: "cost", name: "Cost" },
    { id: "type", name: "Type" },
  ];

  const toggleSource = (id: string) => {
    setSources(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleField = (id: string) => {
    setFields(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const mockPreviewData = [
    { name: "Group A", value: 400, cost: 2400 },
    { name: "Group B", value: 300, cost: 1398 },
    { name: "Group C", value: 300, cost: 9800 },
    { name: "Group D", value: 200, cost: 3908 },
  ];

  const steps = [
    { num: 1, title: "Data Source", icon: Database },
    { num: 2, title: "Fields & Metrics", icon: LayoutTemplate },
    { num: 3, title: "Filters", icon: Filter },
    { num: 4, title: "Visualization", icon: BarChart2 },
  ];

  return (
    <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">

      {/* Left Column: Builder Steps */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Report Builder</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2 mb-8">
            {steps.map(step => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;

              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left
                    ${isActive ? "bg-brand-teal/10 text-brand-teal shadow-[0_6px_32px_rgba(0,0,0,0.06)]" :
                      isPast ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 cursor-not-allowed"}
                  `}
                  disabled={!isPast && !isActive}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    ${isActive ? "bg-brand-teal text-white" :
                      isPast ? "bg-white border border-slate-200 text-slate-600 shadow-[0_6px_32px_rgba(0,0,0,0.06)]" : "bg-slate-100 border border-slate-200/50 text-slate-400"}
                  `}>
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="font-medium text-sm">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Middle/Right Column: Active Step Content & Preview */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-6 flex-1 overflow-y-auto border-b border-slate-100">
          <AnimatePresence mode="wait">

            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Choose Data Sources</h3>
                <p className="text-slate-500 mb-6 text-sm">Select one or more data domains to include in this report.</p>
                <div className="space-y-3">
                  {availableSources.map(source => (
                    <label key={source.id} className={`flex items-start gap-4 p-4 rounded-xl border shadow-[0_6px_32px_rgba(0,0,0,0.06)] cursor-pointer transition-colors hover:-translate-y-0.5
                      ${sources.includes(source.id) ? "border-brand-teal bg-brand-teal/5" : "border-slate-200 bg-white hover:border-brand-teal/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]"}
                    `}>
                      <input
                        type="checkbox"
                        className="mt-1 accent-brand-teal w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                        checked={sources.includes(source.id)}
                        onChange={() => toggleSource(source.id)}
                      />
                      <div>
                        <div className="text-slate-900 font-semibold mb-0.5">{source.name}</div>
                        <div className="text-sm text-slate-500">{source.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Select Fields & Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableFields.map(field => (
                    <label key={field.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] bg-white cursor-pointer hover:border-brand-teal/30 hover:-translate-y-0.5 transition-all">
                      <input
                        type="checkbox"
                        className="accent-brand-teal w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                        checked={fields.includes(field.id)}
                        onChange={() => toggleField(field.id)}
                      />
                      <span className="text-slate-700 font-medium">{field.name}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Add Filters</h3>
                <div className="p-8 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl text-center text-slate-500 hover:border-brand-teal/30 hover:bg-brand-teal/5 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_6px_32px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform">
                    <Filter className="w-6 h-6 text-slate-400 group-hover:text-brand-teal" />
                  </div>
                  <p className="font-medium text-slate-700 mb-1">Click to add condition groups</p>
                  <p className="text-sm">Filter your data by specific criteria.</p>
                  <button className="mt-6 px-5 py-2.5 bg-white border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-brand-teal/30 text-slate-700 font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5">
                    + Add Filter
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Choose Visualization</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["table", "bar", "line", "donut", "kpi"].map(type => (
                    <button
                      key={type}
                      onClick={() => setChartType(type as any)}
                      className={`px-5 py-2.5 rounded-xl border font-medium text-sm capitalize transition-all hover:-translate-y-0.5
                        ${chartType === type ? "border-brand-teal bg-brand-teal text-white shadow-md shadow-brand-teal/20" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]"}
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="p-6 bg-slate-50/50 border border-slate-200 rounded-2xl relative">
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white border border-slate-200 rounded-md shadow-[0_6px_32px_rgba(0,0,0,0.06)] text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Preview</div>
                  <ChartRenderer
                    type={chartType}
                    data={mockPreviewData}
                    dataKeys={[{ key: "value", color: "#10b981" }, { key: "cost", color: "#8b5cf6" }]}
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="p-5 flex justify-between items-center bg-slate-50/50">
          <button
            className="px-5 py-2.5 text-slate-500 hover:text-slate-900 font-semibold transition-colors text-sm disabled:opacity-50 disabled:hover:text-slate-500"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Back
          </button>

          {currentStep < 4 ? (
            <button
              className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal/90 shadow-lg shadow-brand-teal/20 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 flex items-center gap-2"
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex gap-3">
              <button className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white bg-white rounded-xl text-sm font-semibold transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5">
                Save & Schedule
              </button>
              <button className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal/90 shadow-lg shadow-brand-teal/20 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5">
                Save Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
