"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { IntakeKpiStrip } from "@/components/intake/IntakeKpiStrip";
import { IntakeUrgencyQueue } from "@/components/intake/IntakeUrgencyQueue";
import { AssessmentBookingWidget } from "@/components/intake/AssessmentBookingWidget";
import { PipelineSnapshot } from "@/components/intake/PipelineSnapshot";
import { FollowUpQueue } from "@/components/intake/FollowUpQueue";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { NewInquiryModal } from "@/components/referrals/NewInquiryModal";
import { NewReferralModal } from "@/components/referrals/NewReferralModal";

export default function IntakeDashboard() {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {greeting}, {currentUser?.name?.split(" ")[0] || "Coordinator"}
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
                    setIsInquiryModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-teal transition-colors"
                >
                  New Inquiry
                </button>
                <button
                  onClick={() => {
                    setIsReferralModalOpen(true);
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

      <NewInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        onSubmit={(data) => {
          console.log("New inquiry submitted:", data);
          toast.success("Inquiry created successfully");
        }}
      />
      <NewReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        onSubmit={(data) => {
          console.log("New referral submitted:", data);
          toast.success("Referral created successfully");
        }}
      />
    </div>
  );
}
