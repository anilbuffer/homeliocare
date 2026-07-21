"use client";

import React, { useState } from "react";
import Link from "next/link";
import { carePlanSummary, medicationsData, todosData, carePlanChangeRequests } from "@/lib/portalMockData";
import {
  Heart, Target, CheckCircle2, ClipboardList,
  Pill, AlertCircle, Clock, Info, Check, MessageSquare, Plus, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type Tab = "overview" | "medications" | "todos";

export default function PortalCarePlanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  const toggleTodo = (id: string) => {
    setCompletedTodos((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
            Care Plan
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Current goals, daily tasks, and how you can help.
          </p>
        </div>
        <div className="w-10 h-10 bg-[#b8e1d3] rounded-full flex items-center justify-center text-brand-teal shrink-0">
          <Heart className="w-5 h-5" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1.5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 border border-slate-200 w-full sm:w-max max-w-full">
        <button
          onClick={() => setActiveTab("overview")}
          className={clsx(
            "relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl",
            activeTab === "overview" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          )}
        >
          <span className="relative z-10">Overview & Tasks</span>
          {activeTab === "overview" && (
            <motion.div
              layoutId="careplan-tab-indicator"
              className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("medications")}
          className={clsx(
            "relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl",
            activeTab === "medications" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          )}
        >
          <span className="relative z-10">Medications</span>
          {activeTab === "medications" && (
            <motion.div
              layoutId="careplan-tab-indicator"
              className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("todos")}
          className={clsx(
            "relative px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-xl",
            activeTab === "todos" ? "text-brand-teal" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          )}
        >
          <span className="relative z-10">Things You Can Help With</span>
          {activeTab === "todos" && (
            <motion.div
              layoutId="careplan-tab-indicator"
              className="absolute inset-0 bg-brand-teal/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-teal/20"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Focus Areas */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle">
              <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-teal" />
                Focus Areas
              </h2>

              <div className="space-y-6">
                {carePlanSummary.focusAreas.map((area, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-border-subtle">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-text-primary">{area.title}</h3>
                        <p className="text-xs text-text-secondary mt-1">{area.description}</p>
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

            {/* What to expect during visits */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle">
              <h2 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-brand-teal" />
                What to expect during visits
              </h2>
              <p className="text-xs text-text-secondary mb-6">
                A summary of the everyday tasks our caregivers perform during scheduled visits.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carePlanSummary.tasks?.map((taskGroup, idx) => (
                  <div key={idx}>
                    <h3 className="font-medium text-text-primary text-sm uppercase tracking-wider mb-3">
                      {taskGroup.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {taskGroup.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6 flex gap-3 items-start">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                This is a simplified summary of the active care plan. For full clinical details or to request changes, please message your Care Coordinator.
              </p>
            </div>

            {/* Change Requests Section */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-teal" />
                  Change Requests
                </h2>
                <button className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  New Request
                </button>
              </div>

              <div className="space-y-4">
                {carePlanChangeRequests.map(request => (
                  <div key={request.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-text-primary text-sm mb-1">{request.description}</h3>
                      <p className="text-xs text-text-secondary flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Requested on {request.date}
                      </p>
                    </div>
                    <div>
                      <span className={clsx(
                        "px-2.5 py-1 text-xs font-medium rounded-full",
                        request.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                        request.status === "Pending Review" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      )}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "medications" && (
          <motion.div
            key="medications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Our caregivers provide friendly reminders and observe medication taking. They do not clinically administer medications. If you have concerns about a medication, please message the Care Team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {medicationsData.map((med) => (
                <div key={med.id} className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E6F7F1] text-brand-teal flex items-center justify-center">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{med.name}</h3>
                        <p className="text-xs text-text-secondary">{med.purpose}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {med.schedule}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500">Today's Status:</span>
                      {med.todayStatus === "reminded" && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Reminded
                        </span>
                      )}
                      {med.todayStatus === "upcoming" && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5" /> Upcoming
                        </span>
                      )}
                      {med.todayStatus === "declined" && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                          <AlertCircle className="w-3.5 h-3.5" /> Declined
                        </span>
                      )}
                    </div>
                    {med.declineReason && (
                      <p className="text-xs text-amber-600 mt-2 ml-1">
                        Note: {med.declineReason}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "todos" && (
          <motion.div
            key="todos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border-subtle">
              <p className="text-sm text-text-secondary mb-6">
                A simple list of things the care team flagged that you might need to stay aware of or help with.
              </p>

              <div className="space-y-4">
                {todosData.map((todo) => {
                  const isDone = completedTodos.includes(todo.id);
                  return (
                    <div key={todo.id} className={clsx("group border rounded-xl p-4 transition-colors bg-white", isDone ? "border-brand-teal/50 bg-teal-50/10" : "border-slate-200 hover:border-brand-teal/30")}>
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={clsx(
                            "w-5 h-5 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors",
                            isDone ? "border-brand-teal bg-brand-teal text-white" : "border-slate-300 bg-white"
                          )}
                        >
                          {isDone && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <div className="flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                          <h3 className={clsx("font-medium text-sm mb-1 transition-colors", isDone ? "text-slate-400 line-through" : "text-text-primary")}>{todo.text}</h3>
                          <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <Clock className="w-3.5 h-3.5" />
                            By {todo.dueDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-4 ml-9">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={clsx(
                            "flex items-center gap-1.5 text-sm font-medium transition-colors",
                            isDone ? "text-slate-500 hover:text-slate-700" : "text-brand-teal hover:text-teal-700"
                          )}
                        >
                          <Check className="w-4 h-4" /> {isDone ? "Mark as undone" : "Mark as done"}
                        </button>
                        <span className="text-slate-300">|</span>
                        <Link
                          href={`/portal/messages?subject=${encodeURIComponent(todo.text)}`}
                          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" /> Ask a question
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
