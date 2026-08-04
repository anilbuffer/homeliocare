"use client";

import React, { useState, useRef } from "react";
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
  AlertTriangle,
  ShieldAlert,
  Send
} from "lucide-react";
import { feedbackHistoryData } from "@/lib/portalMockData";
import clsx from "clsx";

export function FeedbackFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Form State
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isComplaint, setIsComplaint] = useState(false);
  const [requestCallback, setRequestCallback] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setPhoto(null);
    }, 3000);
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
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-brand-teal to-teal-500 text-white p-2 lg:p-3 md:px-6 md:py-3 rounded-full shadow-[0_8px_30px_rgb(13,148,136,0.3)] hover:shadow-[0_8px_30px_rgb(13,148,136,0.5)] transition-all duration-300 flex items-center gap-3 group"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      >
        <MessageCircleHeart className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="hidden md:block font-semibold whitespace-nowrap tracking-wide">
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
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] flex flex-col bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-teal-100 rounded-full">
                    <MessageCircleHeart className="w-5 h-5 text-brand-teal" />
                  </div>
                  <h2 className="text-base font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">We Value Your Feedback</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-4 styled-scrollbar">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1, damping: 12 }}
                        className="w-14 h-14 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-full flex items-center justify-center mb-6 shadow-inner"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Thank you!</h3>
                      <p className="text-sm text-slate-500 max-w-[280px]">
                        {isComplaint
                          ? "We've received your formal complaint. A supervisor will review it and follow up within 24 business hours."
                          : "Your feedback has been received. Thank you for helping us improve our care!"}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-3"
                    >
                      {/* Rating */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rate your experience</span>
                        <div className="flex gap-1" onMouseLeave={() => setHoveredStar(0)}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 relative"
                            >
                              <Star
                                className={clsx(
                                  "w-6 h-6 transition-all duration-300",
                                  (hoveredStar || rating) >= star
                                    ? "fill-amber-400 text-amber-400 drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)]"
                                    : "fill-slate-100 text-slate-200"
                                )}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {/* Category */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700">What is this regarding?</label>
                          <div className="relative group">
                            <select
                              required
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 focus:border-brand-teal focus:bg-white appearance-none transition-all cursor-pointer group-hover:border-slate-200"
                            >
                              <option value="" disabled>Select a category...</option>
                              {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700">Details</label>
                          <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Please share your thoughts..."
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 focus:border-brand-teal focus:bg-white resize-none transition-all placeholder:text-slate-400 hover:border-slate-200"
                          />
                        </div>

                        {/* Photo Attachment */}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setPhoto(e.target.files[0]);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="group w-full text-center flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-100 text-brand-teal text-sm font-semibold hover:bg-teal-50 transition-colors border-2 border-transparent hover:border-teal-100/50"
                          >
                            <Camera className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
                            {photo ? (
                              <span className="truncate max-w-[200px]">{photo.name}</span>
                            ) : (
                              <>
                                Attach a photo <span className="text-teal-600/60 font-normal">(optional)</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Complaint Toggle */}
                      <div className={clsx(
                        "px-4 py-3 rounded-xl border transition-all duration-300",
                        isComplaint ? "bg-rose-50 border-rose-200" : "bg-slate-50 border-slate-200 hover:border-slate-200"
                      )}>
                        <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setIsComplaint(!isComplaint)}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              {isComplaint && <ShieldAlert className="w-4 h-4 text-rose-500" />}
                              <span className={clsx(
                                "text-sm font-bold transition-colors",
                                isComplaint ? "text-rose-700" : "text-slate-700"
                              )}>This is a formal complaint</span>
                            </div>
                            <span className="text-xs text-slate-500 block leading-relaxed pr-4">
                              This will be reviewed by a supervisor, not your caregiver directly.
                            </span>
                          </div>

                          {/* Custom Toggle Switch */}
                          <div className={clsx(
                            "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none",
                            isComplaint ? "bg-rose-500" : "bg-slate-200"
                          )}>
                            <span
                              className={clsx(
                                "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out",
                                isComplaint ? "translate-x-5" : "translate-x-0"
                              )}
                            />
                          </div>
                        </div>

                        <AnimatePresence>
                          {isComplaint && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-rose-200">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                  <div className={clsx(
                                    "w-4 h-4 rounded-[6px] border-2 flex items-center justify-center transition-colors",
                                    requestCallback ? "bg-rose-500 border-rose-500" : "bg-white border-slate-300 group-hover:border-rose-300"
                                  )}>
                                    {requestCallback && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                  </div>
                                  <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={requestCallback}
                                    onChange={(e) => setRequestCallback(e.target.checked)}
                                  />
                                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                                    I would like a callback regarding this issue
                                  </span>
                                </label>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        type="submit"
                        disabled={!rating || !category || !description}
                        className="relative w-full py-4 border border-slate-200 bg-gradient-to-r from-brand-teal to-teal-500 hover:from-teal-500 hover:to-teal-400 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-[14px] rounded-xl transition-all shadow-[0_8px_20px_rgb(13,148,136,0.2)] hover:shadow-[0_8px_25px_rgb(13,148,136,0.3)] disabled:shadow-none flex items-center justify-center gap-2 overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Submit Feedback
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                        {(!(!rating || !category || !description)) && (
                          <div className="absolute inset-0 bg-white translate-y-[110%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* History Section */}
                {!isSubmitted && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex items-center justify-between w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_32px_rgba(0,0,0,0.25)] transition-shadow">
                          <Clock className="w-4 h-4 text-brand-teal" />
                        </div>
                        <span className="font-semibold text-slate-700 text-[14px]">
                          My Feedback History
                        </span>
                      </div>
                      <div className={clsx(
                        "p-1.5 rounded-full bg-white border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-transform duration-300",
                        showHistory ? "rotate-180" : ""
                      )}>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {showHistory && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 pt-3">
                            {feedbackHistoryData.map((item, index) => (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={item.id}
                                className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:border-slate-100 transition-all relative overflow-hidden"
                              >
                                {/* Left indicator line */}
                                <div className={clsx(
                                  "absolute left-0 top-0 bottom-0 w-1",
                                  item.type === 'complaint' ? "bg-amber-400" : "bg-emerald-400"
                                )} />
                                <div className="flex items-start justify-between mb-2 pl-2.5">
                                  <div className="flex items-center gap-2">
                                    {item.type === 'complaint' ? (
                                      <div className="p-1.5 bg-amber-100 rounded-xl">
                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                      </div>
                                    ) : (
                                      <div className="p-1.5 bg-emerald-100 rounded-xl">
                                        <MessageCircleHeart className="w-4 h-4 text-emerald-500" />
                                      </div>
                                    )}
                                    <span className="text-[14px] font-semibold text-slate-700">{item.category}</span>
                                  </div>
                                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{item.date}</span>
                                </div>
                                <p className="text-[12px] text-slate-600 mb-2 pl-3 leading-relaxed line-clamp-2">{item.description}</p>
                                <div className="flex justify-end pl-3">
                                  <span className={clsx(
                                    "text-[10px] px-3 py-1 rounded-xl font-semibold",
                                    item.status === "Resolved" ? "bg-emerald-100 text-emerald-600" :
                                      item.status === "Being Reviewed" ? "bg-amber-100 text-amber-600" :
                                        "bg-slate-100 text-slate-600"
                                  )}>
                                    {item.status}
                                  </span>
                                </div>
                              </motion.div>
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

