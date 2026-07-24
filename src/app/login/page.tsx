"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  UserCircle,
  HeartHandshake,
  CalendarDays,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Activity,
  LockKeyhole,
  Zap,
  RotateCcw,
  Shield,
  ScanEye,
  Cpu,
  Globe,
  Sparkles,
  ArrowRight,
  UserPlus
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/rbac";

interface RoleConfig {
  role: Role;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  email: string;
  badge: string;
  badgeColor: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  spotlightTitle: string;
  spotlightHighlight: string;
  features: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
}

const ROLE_DATA: Record<Role, RoleConfig> = {
  ADMIN: {
    role: "ADMIN",
    title: "Agency Executive & Admin",
    subtitle: "Full Governance & Operations",
    description: "Complete agency oversight, financial reporting, compliance auditing, and multi-branch management.",
    icon: ShieldCheck,
    email: "admin@homeliocare.com",
    badge: "Full Governance",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    metrics: [
      { label: "Active Staff", value: "248 Staff" },
      { label: "HIPAA Audit", value: "99.9%" },
      { label: "Revenue", value: "$1.42M" },
    ],
    highlights: ["Executive BI Dashboards", "Payroll Engine", "Compliance Audit Trails"],
    spotlightTitle: "Autonomous Home Healthcare",
    spotlightHighlight: "Governance Platform",
    features: [
      {
        icon: ScanEye,
        title: "Automated Security & Compliance Auditing",
        desc: "Continuous EVV telemetry scanning and red-teaming compliance simulations."
      },
      {
        icon: Cpu,
        title: "AI-powered Analysis & Telemetry",
        desc: "Real-time threat detection and revenue forecasting using proprietary neural networks."
      },
      {
        icon: Globe,
        title: "Enterprise-grade Reliability",
        desc: "99.99% uptime with global compliance and sovereign data nodes."
      }
    ]
  },
  SCHEDULER: {
    role: "SCHEDULER",
    title: "Scheduler & Dispatcher",
    subtitle: "AI Shift Matching & Call-Off Queue",
    description: "Real-time dispatch, call-off coverage resolution, OT prevention, and automated caregiver matching.",
    icon: CalendarDays,
    email: "alex.rivera@homeliocare.com",
    badge: "Live Dispatcher Hub",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    metrics: [
      { label: "Fill Rate", value: "98.6%" },
      { label: "Open Call-offs", value: "2 Pending" },
      { label: "Avg Dispatch", value: "< 4 mins" },
    ],
    highlights: ["Interactive Drag & Drop Calendar", "Automated Coverage", "Smart Caregiver Match"],
    spotlightTitle: "Intelligent Shift Dispatch &",
    spotlightHighlight: "AI Route Optimizer",
    features: [
      {
        icon: Zap,
        title: "Instant Shift Coverage Engine",
        desc: "Predictive call-off fill suggestions with distance-aware matching."
      },
      {
        icon: Cpu,
        title: "Overtime Prevention Guard",
        desc: "Real-time scheduling telemetry to eliminate unauthorized OT costs."
      },
      {
        icon: Globe,
        title: "Multi-Branch Synchronization",
        desc: "Seamless live syncing across all regional dispatcher hubs."
      }
    ]
  },
  HR: {
    role: "HR",
    title: "HR Manager & Recruiter",
    subtitle: "Staffing & Compliance Portal",
    description: "Recruiting pipelines, candidate onboarding, caregiver roster management, credential watchlist, and training LMS.",
    icon: UserPlus,
    email: "sarah.jenkins@homelio.com",
    badge: "HR & Recruiting Desk",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    metrics: [
      { label: "Pipeline", value: "14 Candidates" },
      { label: "Credential Alerts", value: "3 Expiring" },
      { label: "Retention Rate", value: "94.2%" },
    ],
    highlights: ["Recruiting Pipeline Board", "Credential Watchlist", "Roster & Onboarding"],
    spotlightTitle: "Caregiver Talent & Enterprise",
    spotlightHighlight: "HR Management Hub",
    features: [
      {
        icon: ScanEye,
        title: "Automated Candidate Verification",
        desc: "Instant background check tracking, OIG clearances, and license verification."
      },
      {
        icon: Cpu,
        title: "Credential Watchlist Alerts",
        desc: "Proactive automated notifications for expiring CPR, TB, and driver licenses."
      },
      {
        icon: Globe,
        title: "Integrated LMS & Training Desk",
        desc: "Assign required compliance modules and track staff certification completion."
      }
    ]
  },
  CAREGIVER: {
    role: "CAREGIVER",
    title: "Caregiver & Field Staff",
    subtitle: "Mobile Visit EVV & Care Charting",
    description: "GPS location verification, digital task charting, care plan sign-off, and open shift discovery.",
    icon: HeartHandshake,
    email: "maria.santos@homeliocare.com",
    badge: "GPS EVV Enabled",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    metrics: [
      { label: "EVV Score", value: "100%" },
      { label: "Assigned Visits", value: "6 Today" },
      { label: "Rating Score", value: "4.95 ★" },
    ],
    highlights: ["One-Tap Visit Clock-In", "Care Plan Access", "Instant Shift Claiming"],
    spotlightTitle: "Mobile Point-of-Care &",
    spotlightHighlight: "Verified EVV Portal",
    features: [
      {
        icon: Shield,
        title: "Offline-First Mobile Verification",
        desc: "Clock-in seamlessly even in low connectivity home health environments."
      },
      {
        icon: ScanEye,
        title: "Instant Care Charting",
        desc: "Voice and touch digital vitals logging with immediate supervisor sync."
      },
      {
        icon: Globe,
        title: "Open Shift Instant Marketplace",
        desc: "Claim premium overtime and open shifts directly from your mobile desk."
      }
    ]
  },
  CLIENT: {
    role: "CLIENT",
    title: "Family & Patient Portal",
    subtitle: "Transparent Care Monitoring",
    description: "Live caregiver arrival tracking, visit notes, shift schedules, and direct family communications.",
    icon: UserCircle,
    email: "family.client@homeliocare.com",
    badge: "Family Desk",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    metrics: [
      { label: "Caregiver Status", value: "En Route" },
      { label: "Completed Visits", value: "34 / Mo" },
      { label: "Satisfaction", value: "100%" },
    ],
    highlights: ["Live GPS Tracker", "Care Plan Verification", "Family Messaging Hub"],
    spotlightTitle: "Real-Time Family Transparency &",
    spotlightHighlight: "Patient Wellness Desk",
    features: [
      {
        icon: ShieldCheck,
        title: "Live Caregiver Arrival Tracking",
        desc: "Real-time map telemetry showing caregiver ETA and visit start times."
      },
      {
        icon: Activity,
        title: "Daily Care Summary Feed",
        desc: "Verified shift notes, meal tracking, and medication check-offs."
      },
      {
        icon: Globe,
        title: "Direct Agency Concierge Line",
        desc: "Encrypted messaging with care coordinators and nursing leads."
      }
    ]
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState<Role>("ADMIN");
  const [email, setEmail] = useState<string>(ROLE_DATA.ADMIN.email);
  const [password, setPassword] = useState<string>("••••••••••••");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);

  // Auto update form credentials when a role is selected
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setEmail(ROLE_DATA[role].email);
    setPassword("••••••••••••");
  };

  const handleResetCredentials = () => {
    const current = ROLE_DATA[selectedRole];
    setEmail(current.email);
    setPassword("••••••••••••");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(selectedRole);
      setIsLoading(false);

      if (selectedRole === "ADMIN") {
        router.push("/dashboard");
      } else if (selectedRole === "SCHEDULER") {
        router.push("/scheduler");
      } else if (selectedRole === "HR") {
        router.push("/hr/dashboard");
      } else if (selectedRole === "CLIENT") {
        router.push("/portal");
      } else if (selectedRole === "CAREGIVER") {
        router.push("/caregiver");
      } else {
        router.push("/dashboard");
      }
    }, 750);
  };

  const currentRoleInfo = ROLE_DATA[selectedRole];
  const CurrentRoleIcon = currentRoleInfo.icon;

  // Reusable Role Selector Pill Grid Component
  const RoleSelectorGrid = () => (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200/90 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2dd4bf]" />
          Select Workspace Role:
        </span>
        <span className="text-[11px] text-emerald-300/70 hidden sm:inline-block">
          Auto-fills demo credentials
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3">
        {(Object.keys(ROLE_DATA) as Role[]).map((roleKey) => {
          const rItem = ROLE_DATA[roleKey];
          const isSel = selectedRole === roleKey;
          const RIcon = rItem.icon;

          return (
            <button
              key={roleKey}
              type="button"
              onClick={() => handleRoleSelect(roleKey)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-left transition-all duration-150 flex items-center space-x-2 cursor-pointer ${isSel
                ? "bg-[#0e4d4c] border-[#2dd4bf] text-white shadow-md ring-1 ring-[#2dd4bf]/40"
                : "bg-[#0a2f30]/60 hover:bg-[#0e4d4c]/50 border-[#144747] text-gray-300 hover:text-white"
                }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 ${isSel ? "bg-[#2dd4bf] text-[#062425]" : "bg-[#144747] text-emerald-200"
                  }`}
              >
                <RIcon className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs truncate leading-tight">
                  {rItem.title.split(" ")[0]}
                </div>
                <div className="text-[10px] text-emerald-200/60 truncate">
                  {rItem.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#E5F4F3] font-sans flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-x-hidden select-none">
      {/* Ambient Enterprise Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[750px] h-[750px] rounded-full bg-[#0EA383]/15 blur-[150px]" />
        <div className="absolute top-1/2 -right-40 w-[750px] h-[750px] rounded-full bg-[#0B2A3D]/15 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[#0EA383]/12 blur-[130px]" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#0B2A3D 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Main Responsive Container Card */}
      <div className="relative z-10 w-full max-w-[1560px] min-h-0 lg:min-h-[calc(100vh-3rem)] rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-teal-500/10 overflow-hidden flex flex-col justify-between">

        {/* Main Header (Visible on Mobile & Tablet above split, hidden on Desktop left panel) */}
        <div className="lg:hidden w-full bg-gradient-to-r from-[#062425] via-[#0b3336] to-[#041d1f] rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white mb-3 sm:mb-4 border border-teal-200/40 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-teal text-xl sm:text-2xl font-bold text-white flex items-center justify-center border border-[#166361] shadow-brand-teal/30 shrink-0">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-wide text-white block leading-snug">
                Homelio Care
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-200/70 font-medium">
                Healthcare Enterprise Platform
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-[#0e4d4c]/80 text-[#2dd4bf] px-3 py-1 rounded-full border border-[#166361]/60 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
            <span className="hidden sm:inline">Systems Operational (99.99%)</span>
            <span className="sm:hidden">99.99%</span>
          </div>
        </div>

        {/* MOBILE & TABLET ROLE SELECTOR CONTAINER (Appears directly ABOVE the login form on mobile/tablet) */}
        <div className="lg:hidden w-full bg-[#062425] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-white mb-3 sm:mb-4 border border-teal-200/30 shadow-xs">
          <RoleSelectorGrid />
        </div>

        {/* 2-COLUMN SPLIT LAYOUT (Desktop: 70/30 Split | Tablet: 50/50 Side-by-Side Split | Mobile: Stacked) */}
        <div className="flex-1 flex flex-col md:flex-row lg:flex-row gap-3 sm:gap-4 lg:gap-6 items-stretch">

          {/* ========================================================================= */}
          {/* LEFT PANEL: Enterprise Spotlight & Details (Desktop 70% | Tablet 50% | Mobile Stacked) */}
          {/* ========================================================================= */}
          <div className="order-2 md:order-1 w-full md:w-1/2 lg:w-[67%] xl:w-[70%] bg-gradient-to-br from-[#062425] via-[#0b3336] to-[#041d1f] rounded-xl sm:rounded-2xl lg:rounded-[32px] p-5 sm:p-6 lg:p-10 flex flex-col justify-between text-white relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-teal-200/80">
            {/* Background Ambient Spotlight Glow */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#0EA383]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="h-full flex flex-col justify-between lg:gap-4">
              {/* Desktop Header Bar (Hidden on mobile/tablet as they have top header) */}
              <div className="hidden lg:flex justify-between w-full gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-teal text-2xl font-bold text-white flex items-center justify-center border border-[#166361] shadow-brand-teal/30 shrink-0">
                    H
                  </div>
                  <div>
                    <span className="font-bold text-2xl tracking-wide text-white block">
                      Homelio Care
                    </span>
                    <span className="text-[11px] text-emerald-200/70 font-medium">
                      Healthcare Enterprise Platform
                    </span>
                  </div>
                </div>

                {/* System Telemetry Pill */}
                <div className="flex items-center space-x-2 bg-[#0e4d4c]/80 text-[#2dd4bf] px-3.5 py-1.5 rounded-full border border-[#166361]/60 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
                  <span>Systems Operational (99.99%)</span>
                </div>
              </div>

              {/* Desktop Role Selector Grid (Hidden on mobile/tablet) */}
              <div className="hidden lg:block mb-2">
                <RoleSelectorGrid />
              </div>

              {/* Main Role Headline & Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRole}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4 lg:mb-6"
                >
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/20 mb-3">
                    <CurrentRoleIcon className="w-3.5 h-3.5" />
                    <span>{currentRoleInfo.title}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-3 sm:mb-4">
                    {currentRoleInfo.spotlightTitle}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA383] via-[#2dd4bf] to-[#38bdf8]">
                      {currentRoleInfo.spotlightHighlight}
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100/75 max-w-2xl leading-relaxed">
                    {currentRoleInfo.description}
                  </p>
                </motion.div>
              </AnimatePresence>



              {/* Capability Features Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRole + "_feats"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {currentRoleInfo.features.map((feat, idx) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-[#0a2f30]/50 border border-[#144747]/70 p-3 rounded-xl flex flex-col lg:flex-row gap-4 justify-between space-y-1.5"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#0e4d4c] text-[#2dd4bf] flex items-center justify-center shrink-0 border border-[#166361]">
                          <FeatIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-white mb-0.5 leading-snug">
                            {feat.title}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-emerald-100/60 leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {feat.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Left Panel Footer */}
            <div className="pt-4 lg:pt-6 mt-6 border-t border-[#124445] flex flex-wrap flex-col lg:flex-row items-center justify-between w-full text-xs text-[#527d7e] gap-2">
              <span>&copy; 2026 Homelio Care. All rights reserved.</span>
              <div className="flex items-center space-x-3 text-[11px] text-emerald-200/60">
                <span className="flex items-center space-x-1">
                  <LockKeyhole className="w-3.5 h-3.5 text-[#2dd4bf]" />
                  <span>256-Bit SSL</span>
                </span>
                <span>•</span>
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>
          {/* ========================================================================= */}
          {/* RIGHT PANEL: Authentication Form (Desktop 30% | Tablet 50% | Mobile Stacked) */}
          {/* ========================================================================= */}
          <div className="order-1 md:order-2 w-full md:w-1/2 lg:w-[33%] xl:w-[30%] bg-white rounded-xl sm:rounded-2xl lg:rounded-[28px] p-4 sm:p-6 lg:p-8 flex flex-col justify-between border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col h-full justify-between">
              {/* Form Header */}
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0EA383]/10 text-[#0EA383] border border-[#0EA383]/20">
                    <CurrentRoleIcon className="w-3.5 h-3.5" />
                    <span>{currentRoleInfo.title}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleResetCredentials}
                    className="text-xs font-medium text-[#0EA383] hover:text-[#0EA383]/80 flex items-center space-x-1 bg-[#0EA383]/5 hover:bg-[#0EA383]/10 px-2.5 py-1 rounded-full transition-colors border border-[#0EA383]/15 cursor-pointer"
                    title="Reset credentials to role default"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-6">
                {/* Header Text */}
                <div className="flex flex-col mb-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Sign-in to your account to continue
                  </p>
                </div>
                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA383] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700 block">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-xs font-semibold text-[#0EA383] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA383] focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Keep Me Signed In Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-[#0EA383] border-gray-300 rounded focus:ring-[#0EA383] accent-[#0EA383] cursor-pointer"
                      />
                      <span className="text-xs text-gray-600 font-medium">Keep me signed in</span>
                    </label>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 bg-[#0EA383] hover:bg-[#0c8c70] active:scale-[0.99] text-white font-bold py-3 sm:py-3.5 px-4 rounded-xl transition-all duration-150 flex items-center justify-center space-x-2 shadow-lg shadow-[#0EA383]/20 border border-[#0EA383]/30 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
              {/* Form Footer Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-gray-500">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="font-bold text-[#0EA383] hover:underline cursor-pointer"
                  >
                    Request Access
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password / Request Access Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Request Corporate Access / Reset</h3>
              <p className="text-xs text-gray-500 mb-4">
                Enter your work email address below and our security administrator will verify your credentials.
              </p>

              {resetSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs space-y-2 mb-4">
                  <div className="flex items-center space-x-2 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Access Request Submitted!</span>
                  </div>
                  <p>Check your inbox at <strong>{email}</strong> for authorization instructions.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Corporate Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA383]"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSent(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  Close
                </button>
                {!resetSent && (
                  <button
                    type="button"
                    onClick={() => setResetSent(true)}
                    className="px-4 py-2 text-xs font-semibold bg-[#0EA383] text-white rounded-xl hover:bg-[#0EA383]/90 transition-colors shadow-sm cursor-pointer"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
