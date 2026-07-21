"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircleHeart,
  X,
  Star,
  Camera,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react";
import { feedbackHistoryData } from "@/lib/portalMockData";
import clsx from "clsx";

export function FeedbackFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isComplaint, setIsComplaint] = useState(false);
  const [requestCallback, setRequestCallback] = useState(false);

  // History State
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      // Reset form
      setRating(0);
      setCategory("");
      setDescription("");
      setIsComplaint(false);
      setRequestCallback(false);
    }, 2500);
  };

  const categories = [
    "Care Quality",
    "Caregiver Conduct",
    "Scheduling",
    "Billing",
    "Communication",
    "Other"
  ];

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-brand-teal text-white p-4 md:px-5 md:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      >
        <MessageCircleHeart className="w-6 h-6" />
        <span className="hidden md:block font-medium whitespace-nowrap">
          Give Feedback
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-slate-50/50">
                <h2 className="text-xl font-semibold text-text-primary">We Value Your Feedback</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">Thank you!</h3>
                      <p className="text-text-secondary">
                        {isComplaint
                          ? "We've received your formal complaint. A supervisor will review it and follow up within 24 business hours."
                          : "We've received your feedback. Thank you for helping us improve our care!"}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Rating */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-text-secondary">How would you rate your recent experience?</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="p-1 group transition-transform hover:scale-110"
                            >
                              <Star
                                className={clsx(
                                  "w-8 h-8 transition-colors",
                                  rating >= star ? "fill-amber-400 text-amber-400" : "text-slate-300 group-hover:text-amber-200"
                                )}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">What is this regarding?</label>
                        <select
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal appearance-none"
                        >
                          <option value="" disabled>Select a category...</option>
                          {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Details</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          placeholder="Please share your thoughts..."
                          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal resize-none"
                        />
                      </div>

                      {/* Photo Attachment */}
                      <button
                        type="button"
                        className="flex items-center gap-2 text-brand-teal text-sm font-medium hover:text-teal-700 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                        Attach a photo (optional)
                      </button>

                      {/* Complaint Toggle */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div className="pt-0.5">
                            <input
                              type="checkbox"
                              checked={isComplaint}
                              onChange={(e) => setIsComplaint(e.target.checked)}
                              className="w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                            />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-text-primary block">This is a formal complaint</span>
                            <span className="text-xs text-text-secondary block mt-1">
                              This will be reviewed by a supervisor, not your caregiver directly.
                            </span>
                          </div>
                        </label>
                        
                        <AnimatePresence>
                          {isComplaint && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-slate-200">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-text-primary">
                                  <input
                                    type="checkbox"
                                    checked={requestCallback}
                                    onChange={(e) => setRequestCallback(e.target.checked)}
                                    className="rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                                  />
                                  I would like a callback regarding this issue
                                </label>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        type="submit"
                        disabled={!rating || !category || !description}
                        className="w-full py-3 bg-brand-teal hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-sm"
                      >
                        Submit Feedback
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* History Section */}
                {!isSubmitted && (
                  <div className="mt-8 border-t border-border-subtle pt-6">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="font-medium text-text-primary text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        My Feedback History
                      </span>
                      {showHistory ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    
                    <AnimatePresence>
                      {showHistory && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 mt-4">
                            {feedbackHistoryData.map((item) => (
                              <div key={item.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {item.type === 'complaint' ? (
                                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                    ) : (
                                      <MessageCircleHeart className="w-3.5 h-3.5 text-brand-teal" />
                                    )}
                                    <span className="text-xs font-semibold text-text-primary">{item.category}</span>
                                  </div>
                                  <span className="text-xs text-text-secondary">{item.date}</span>
                                </div>
                                <p className="text-sm text-text-secondary mb-2 line-clamp-2">{item.description}</p>
                                <div className="flex justify-end">
                                  <span className={clsx(
                                    "text-[10px] px-2 py-1 rounded-full font-medium uppercase tracking-wider",
                                    item.status === "Resolved" ? "bg-emerald-100 text-emerald-700" :
                                    item.status === "Being Reviewed" ? "bg-amber-100 text-amber-700" :
                                    "bg-slate-200 text-slate-700"
                                  )}>
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
