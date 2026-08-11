"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { IntakeKpiStrip } from "@/components/intake/IntakeKpiStrip";
import { IntakeUrgencyQueue } from "@/components/intake/IntakeUrgencyQueue";
import { AssessmentBookingWidget } from "@/components/intake/AssessmentBookingWidget";
import { PipelineSnapshot } from "@/components/intake/PipelineSnapshot";
import { FollowUpQueue } from "@/components/intake/FollowUpQueue";
import { Plus, Sparkles, PlayCircle, PauseCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function IntakeDashboard() {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleAudioBriefing = () => {
    if (!("speechSynthesis" in window)) {
      toast.error("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const text = `${greeting} James. You have 2 urgent hospital discharges pending S L A breach for Eleanor Whitfield and Arthur Pendelton. 3 assessments are unassigned for tomorrow.`;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
    toast.success("Playing AI audio briefing...");
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-full mx-auto space-y-4">

      {/* Header Section with AI Briefing */}
      <div className="flex flex-col gap-6">
        {/* AI Briefing Banner */}
        <div className="w-full bg-gradient-to-r from-brand-teal/10 to-accent-blue/10 border border-brand-teal/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-[0_6px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
          {/* Sparkle decorative background */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-teal/20 rounded-full blur-3xl"></div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-teal to-accent-blue flex items-center justify-center shrink-0 shadow-[0_6px_32px_rgba(0,0,0,0.06)] shadow-brand-teal/30 z-10">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 z-10">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                AI Morning Briefing
                <span className="bg-brand-teal/20 text-brand-teal px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold animate-pulse">Live</span>
              </h2>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {greeting} James. You have <span className="text-red-600 font-semibold bg-red-50 px-1 rounded">2 urgent hospital discharges pending SLA breach</span> (Eleanor Whitfield & Arthur Pendelton). <span className="text-amber-600 font-bold bg-amber-50 px-1 rounded">3 assessments are unassigned</span> for tomorrow.
            </p>
          </div>
          <button
            onClick={toggleAudioBriefing}
            className="shrink-0 flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-teal hover:text-brand-teal text-slate-700 px-4 py-2 rounded-full text-xs font-bold shadow-[0_6px_32px_rgba(0,0,0,0.06)] transition-all active:scale-95 z-10"
          >
            {isPlayingAudio ? (
              <>
                <PauseCircle className="w-4 h-4 text-brand-teal animate-pulse" />
                Stop Audio
              </>
            ) : (
              <>
                <PlayCircle className="w-4 h-4 text-brand-teal" />
                Play Audio
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Intake Control Center
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              <span className="font-semibold text-brand-teal">4 new inquiries</span> need first contact, <span className="font-semibold text-accent-blue">8 assessments</span> scheduled today.
            </p>
          </div>

          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full md:w-auto items-center justify-center gap-2 bg-brand-teal hover:bg-teal-600 active:scale-95 transition-all text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-[0_6px_24px_rgba(14,163,131,0.25)] hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Intake
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 md:right-0 mt-2 w-full md:w-48 bg-white border border-slate-200 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[60] py-1 overflow-hidden origin-top-right"
                >
                  <button
                    onClick={() => {
                      router.push("/intake/inquiries/new");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-teal transition-colors"
                  >
                    New Inquiry
                  </button>
                  <button
                    onClick={() => {
                      router.push("/intake/referrals/new");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-teal transition-colors"
                  >
                    New Referral
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Row 1: KPI Strip */}
      <IntakeKpiStrip />

      {/* Row 2 & 3: Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Left Column (Urgency Queue dominates) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="h-[400px]">
            <IntakeUrgencyQueue />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[350px]">
              <PipelineSnapshot />
            </div>
            <div className="h-[350px]">
              <FollowUpQueue />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="h-[400px]">
            <AssessmentBookingWidget />
          </div>
        </div>

      </div>


    </div>
  );
}
