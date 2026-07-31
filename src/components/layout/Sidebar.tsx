"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Activity,
  HeartHandshake,
  Receipt,
  ShieldAlert,
  CheckSquare,
  Award,
  GraduationCap,
  BarChart3,
  Inbox,
  MessageSquare,
  Settings,
  ShieldCheck,
  ChevronDown,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  FileText,
  UserPlus,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import { useAuth } from "@/hooks/useAuth";

const getNavGroups = (role?: string) => {
  if (role === "CLIENT") {
    return [
      {
        label: "",
        items: [
          { name: "Overview", icon: LayoutDashboard, id: "overview" },
          { name: "Scheduling", icon: CalendarDays, id: "scheduling" },
          { name: "Care Plan", icon: HeartHandshake, id: "care-plan" },
          { name: "Visit History", icon: CalendarDays, id: "visits" },
          { name: "Billing & Payments", icon: Receipt, id: "billing" },
          { name: "Messages", icon: MessageSquare, id: "messages" },
          { name: "Documents", icon: FileText, id: "documents" },
        ],
      },
    ];
  }

  if (role === "CAREGIVER") {
    return [
      {
        label: "Caregiver Navigation",
        items: [
          { name: "Today", icon: LayoutDashboard, id: "today" },
          { name: "Schedule", icon: CalendarDays, id: "schedule" },
          { name: "Messages", icon: MessageSquare, id: "messages", badge: 1 },
          { name: "Training", icon: GraduationCap, id: "training", badge: 1 },
          { name: "Profile", icon: User, id: "profile" },
        ],
      },
    ];
  }

  if (role === "HR") {
    return [
      {
        label: "HR & People Operations",
        items: [
          { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
          { name: "Recruiting", icon: UserPlus, id: "recruiting" },
          { name: "Caregivers", icon: HeartHandshake, id: "caregivers" },
          { name: "Training", icon: GraduationCap, id: "training" },
          { name: "Payroll", icon: Receipt, id: "payroll" },
          { name: "Messages", icon: MessageSquare, id: "messages" },
        ],
      },
    ];
  }

  if (role === "SCHEDULER") {
    return [
      {
        label: "Dispatch & Scheduling",
        items: [
          { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
          { name: "Scheduling & Shift Board", icon: CalendarDays, id: "board" },
          { name: "Caregivers", icon: HeartHandshake, id: "caregivers" },
          { name: "Messages", icon: MessageSquare, id: "messages" },
        ],
      },
    ];
  }

  if (role === "INTAKE_COORDINATOR") {
    return [
      {
        label: "",
        items: [
          { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
          { name: "Referral & Intake", icon: Inbox, id: "referrals" },
          { name: "Patients", icon: Users, id: "patients" },
          { name: "Scheduling", icon: CalendarDays, id: "scheduling" },
          { name: "Communications", icon: MessageSquare, id: "communications" },
        ],
      },
    ];
  }

  if (role === "BILLING_FINANCE_STAFF") {
    return [
      {
        label: "",
        items: [
          { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
          { name: "Billing & Claims Workspace", icon: Receipt, id: "billing-workspace" },
          { name: "Authorizations", icon: ShieldCheck, id: "authorizations" },
          { name: "Payroll", icon: Receipt, id: "payroll" },
          { name: "Reports (Financial)", icon: BarChart3, id: "reports" },
          { name: "Messages", icon: MessageSquare, id: "messages" },
        ],
      },
    ];
  }

  if (role === "CLINICAL_SUPERVISOR_RN") {
    return [
      {
        label: "",
        items: [
          { name: "Clinical Dashboard", icon: LayoutDashboard, id: "dashboard" },
          { name: "Patients", icon: Users, id: "patients" },
          { name: "Assessments & Care Plan", icon: CheckSquare, id: "assessments" },
          { name: "QA (Audits)", icon: Award, id: "qa" },
          { name: "Incident Reports", icon: ShieldAlert, id: "incidents" },
          { name: "Messages", icon: MessageSquare, id: "messages" },
        ],
      },
    ];
  }

  if (role === "QA_COMPLIANCE_OFFICER") {
    return [
      {
        label: "",
        items: [
          { name: "Compliance Dashboard", icon: LayoutDashboard, id: "dashboard" },
          { name: "Compliance Tracking", icon: CheckSquare, id: "compliance" },
          { name: "Quality Assurance", icon: Award, id: "qa" },
          { name: "Incident Reports", icon: ShieldAlert, id: "incidents" },
          { name: "Reports (Compliance)", icon: BarChart3, id: "reports" },
          { name: "Messages", icon: MessageSquare, id: "messages" },
        ],
      },
    ];
  }

  if (role === "FIELD_SUPERVISOR") {
    return [
      {
        label: "",
        items: [
          { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
          { name: "Supervisory Visits", icon: CheckSquare, id: "visits" },
          { name: "Incident Reports", icon: ShieldAlert, id: "incidents" },
          { name: "Caregivers", icon: Users, id: "caregivers" },
          { name: "Messages", icon: MessageSquare, id: "messages" },
        ],
      },
    ];
  }

  // Default ADMIN / other roles
  return [
    {
      label: "",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
        { name: "User Management", icon: ShieldCheck, id: "users" },
        { name: "Patients", icon: Users, id: "patients" },
        { name: "Scheduling", icon: CalendarDays, id: "scheduling" },
        { name: "Caregivers & HR", icon: HeartHandshake, id: "caregivers" },
        { name: "Billing & Claims", icon: Receipt, id: "billing-admin" },
      ],
    },
    {
      label: "COMPLIANCE & QUALITY",
      items: [
        { name: "Incident & Risk", icon: ShieldAlert, id: "incidents" },
        { name: "Compliance Tracking", icon: CheckSquare, id: "compliance" },
        { name: "EVV Compliance", icon: Activity, id: "evv-monitoring" },
        { name: "Quality Assurance", icon: Award, id: "qa" },
      ],
    },
    {
      label: "TALENT & GROWTH",
      items: [
        { name: "Training (LMS)", icon: GraduationCap, id: "training" },
        { name: "Referrals & Intake", icon: Inbox, id: "referrals" },
        { name: "Communications", icon: MessageSquare, id: "communications" },
        { name: "Reports & BI", icon: BarChart3, id: "reports" },
        { name: "Payroll", icon: Receipt, id: "payroll" },
      ],
    },
  ];
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showHipaaTooltip, setShowHipaaTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const safeUser = mounted ? currentUser : null;

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    router.push("/login");
  };

  const activeItem = React.useMemo(() => {
    // portal
    if (pathname?.startsWith("/portal/visits")) return "visits";
    if (pathname?.startsWith("/portal/schedule")) return "scheduling";
    if (pathname?.startsWith("/portal/messages")) return "messages";
    if (pathname?.startsWith("/portal/billing")) return "billing";
    if (pathname?.startsWith("/portal/documents")) return "documents";
    if (pathname?.startsWith("/portal/care-plan")) return "care-plan";
    if (pathname === "/portal" || pathname?.startsWith("/portal")) return "overview";

    // caregiver
    if (pathname === "/caregiver/schedule" || pathname?.startsWith("/caregiver/schedule")) return "schedule";
    if (pathname === "/caregiver/messages" || pathname?.startsWith("/caregiver/messages")) return "messages";
    if (pathname === "/caregiver/training" || pathname?.startsWith("/caregiver/training")) return "training";
    if (pathname === "/caregiver/profile" || pathname?.startsWith("/caregiver/profile")) return "profile";
    if (pathname === "/caregiver" || pathname?.startsWith("/caregiver")) return "today";

    // hr
    if (pathname?.startsWith("/hr/recruiting")) return "recruiting";
    if (pathname?.startsWith("/hr/caregivers")) return "caregivers";
    if (pathname?.startsWith("/hr/training")) return "training";
    if (pathname?.startsWith("/hr/payroll")) return "payroll";
    if (pathname?.startsWith("/hr/messages")) return "messages";
    if (pathname?.startsWith("/hr/dashboard") || pathname === "/hr") return "dashboard";

    // scheduler
    if (pathname === "/scheduler/board") return "board";
    if (pathname === "/scheduler/tracker") return "tracker";
    if (pathname === "/scheduler/caregivers") return "caregivers";
    if (pathname === "/scheduler/messages") return "messages";
    if (pathname?.startsWith("/scheduler")) return "dashboard";

    if (pathname?.startsWith("/users")) return "users";
    if (pathname?.startsWith("/training")) return "training";
    if (pathname?.startsWith("/billing/workspace") || pathname === "/billing/workspace") return "billing-workspace";
    if (pathname?.startsWith("/billing/authorizations")) return "authorizations";
    if (pathname?.startsWith("/billing/payroll")) return "payroll";
    if (pathname?.startsWith("/billing/reports")) return "reports";
    if (pathname?.startsWith("/billing/messages")) return "messages";
    if (pathname?.startsWith("/clinical/messages")) return "messages";
    if (pathname?.startsWith("/compliance/messages")) return "messages";
    if (pathname?.startsWith("/field-supervisor/messages")) return "messages";
    if (pathname?.startsWith("/clinical/patients")) return "patients";
    if (pathname?.startsWith("/clinical/assessments")) return "assessments";
    if (pathname?.startsWith("/clinical/qa")) return "qa";
    if (pathname?.startsWith("/compliance/qa")) return "qa";
    if (pathname?.startsWith("/clinical/incidents")) return "incidents";
    if (pathname?.startsWith("/compliance/incidents")) return "incidents";
    if (pathname?.startsWith("/compliance/tracking") || (pathname === "/compliance" && safeUser?.role !== "QA_COMPLIANCE_OFFICER")) return "compliance";
    if (pathname?.startsWith("/billing") && !pathname?.startsWith("/billing/workspace") && safeUser?.role === "ADMIN") return "billing-admin";
    if (pathname?.startsWith("/billing") && !pathname?.startsWith("/billing/workspace") && safeUser?.role !== "ADMIN") return "dashboard";
    if (pathname?.startsWith("/scheduling") || pathname?.startsWith("/intake/scheduling")) return "scheduling";
    if (pathname?.startsWith("/patients") || pathname?.startsWith("/intake/patients")) return "patients";
    if (pathname?.startsWith("/evv-monitoring")) return "evv-monitoring";
    if (pathname?.startsWith("/quality-assurance")) return "qa";
    if (pathname?.startsWith("/field-supervisor/visits")) return "visits";
    if (pathname?.startsWith("/field-supervisor/caregivers")) return "caregivers";
    if (pathname?.startsWith("/incidents")) return "incidents";
    if (pathname?.startsWith("/field-supervisor/incidents")) return "incidents";
    if (pathname?.startsWith("/referrals") || pathname?.startsWith("/intake/referrals")) return "referrals";
    if (pathname?.startsWith("/communications") || pathname?.startsWith("/intake/communications")) return "communications";
    if (pathname?.startsWith("/compliance/reports")) return "reports";
    if (pathname?.startsWith("/reports") && !pathname?.startsWith("/compliance/reports")) return "reports";
    if (pathname?.startsWith("/payroll")) return "payroll";
    if (pathname?.startsWith("/clinical/settings") || pathname?.startsWith("/field-supervisor/settings") || pathname?.startsWith("/billing/settings") || pathname?.startsWith("/intake/settings") || pathname?.startsWith("/compliance/settings") || pathname?.startsWith("/settings")) return "settings";
    if (pathname === "/dashboard" || pathname === "/" || pathname?.startsWith("/intake/dashboard") || pathname === "/clinical" || pathname === "/compliance" || pathname === "/field-supervisor") return "dashboard";
    return "dashboard";
  }, [pathname, safeUser?.role]);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-slate-900/60 z-40 min-[1120px]:hidden backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={clsx(
          "bg-sidebar-bg text-white flex flex-col h-screen fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out min-[1120px]:translate-x-0 min-[1120px]:sticky min-[1120px]:top-0 shadow-[4px_0_24px_rgba(0,0,0,0.15)] min-[1120px]:shadow-none select-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "min-[1120px]:w-[76px] w-[240px]" : "w-[240px]"
        )}
      >
        {/* Floating Edge Toggle Button matching requested screenshot */}
        <button
          onClick={toggleCollapse}
          title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
          className="hidden min-[1120px]:flex absolute -right-4 top-4 z-50 w-7 h-7 rounded-full bg-brand-teal text-white items-center justify-center shadow-lg border-1 border-white ring-1.5 ring-slate-900/80 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-4.5 h-4.5" />
          ) : (
            <PanelLeftClose className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Header / Logo Area */}
        <div
          className={clsx(
            "flex items-center h-20 border-b border-sidebar-active/40 transition-all duration-300 relative",
            isCollapsed ? "px-3 justify-center" : "px-5 justify-start"
          )}
        >
          <Link href={safeUser?.role === "CLIENT" ? "/portal" : safeUser?.role === "CAREGIVER" ? "/caregiver" : safeUser?.role === "HR" ? "/hr/dashboard" : safeUser?.role === "SCHEDULER" ? "/scheduler" : safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance" : safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/dashboard" : safeUser?.role === "BILLING_FINANCE_STAFF" ? "/billing" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical" : safeUser?.role === "FIELD_SUPERVISOR" ? "/field-supervisor" : "/dashboard"} className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center font-bold text-lg text-white shadow-md shadow-brand-teal/30 shrink-0 group-hover:scale-105 transition-transform">
              H
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate pr-4">
                <span className="font-bold text-base tracking-wide text-white block leading-tight truncate">
                  Homelio Care
                </span>
                {safeUser?.role === "CAREGIVER" && (
                  <span className="text-[10px] font-medium uppercase tracking-wider text-brand-teal flex items-center gap-1 mt-0.5">
                    <HeartHandshake className="w-3 h-3 inline" /> Caregiver Portal
                  </span>
                )}
                {safeUser?.role === "HR" && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-teal mt-0.5">
                    HR Portal
                  </span>
                )}
                {safeUser?.role === "SCHEDULER" && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-teal mt-0.5">
                    Dispatch Portal
                  </span>
                )}
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          {!isCollapsed && (
            <button
              onClick={onClose}
              className="absolute right-4 min-[1120px]:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/80">
          {getNavGroups(safeUser?.role).map((group, index) => (
            <div key={index}>
              {group.label ? (
                !isCollapsed ? (
                  <div className="px-3 text-[11px] font-semibold text-text-secondary tracking-wider uppercase mb-2 truncate">
                    {group.label}
                  </div>
                ) : (
                  <div className="h-px bg-slate-800 my-2 mx-2" />
                )
              ) : null}

              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeItem === item.id;
                  const Icon = item.icon;

                  let href = "#";
                  if (item.id === "dashboard") href = safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance" : safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/dashboard" : safeUser?.role === "BILLING_FINANCE_STAFF" ? "/billing" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical" : safeUser?.role === "FIELD_SUPERVISOR" ? "/field-supervisor" : safeUser?.role === "HR" ? "/hr/dashboard" : safeUser?.role === "SCHEDULER" ? "/scheduler" : "/dashboard";
                  if (item.id === "users") href = "/users";
                  if (item.id === "training") href = safeUser?.role === "CAREGIVER" ? "/caregiver/training" : safeUser?.role === "HR" ? "/hr/training" : "/training";
                  if (item.id === "billing-admin") href = "/billing/workspace";
                  if (item.id === "billing-workspace") href = "/billing/workspace";
                  if (item.id === "authorizations") href = "/billing/authorizations";
                  if (item.id === "payroll") href = safeUser?.role === "HR" ? "/hr/payroll" : safeUser?.role === "BILLING_FINANCE_STAFF" ? "/billing/payroll" : "/payroll";
                  if (item.id === "reports") href = safeUser?.role === "BILLING_FINANCE_STAFF" ? "/billing/reports" : safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance/reports" : "/reports";
                  if (item.id === "messages") href = safeUser?.role === "CLIENT" ? "/portal/messages" : safeUser?.role === "CAREGIVER" ? "/caregiver/messages" : safeUser?.role === "HR" ? "/hr/messages" : safeUser?.role === "SCHEDULER" ? "/scheduler/messages" : safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance/messages" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical/messages" : safeUser?.role === "FIELD_SUPERVISOR" ? "/field-supervisor/messages" : "/billing/messages";
                  if (item.id === "scheduling") href = safeUser?.role === "CLIENT" ? "/portal/schedule" : safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/scheduling" : "/scheduling";
                  if (item.id === "patients") href = safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/patients" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical/patients" : "/patients";
                  if (item.id === "caregivers") href = safeUser?.role === "HR" ? "/hr/caregivers" : safeUser?.role === "SCHEDULER" ? "/scheduler/caregivers" : safeUser?.role === "FIELD_SUPERVISOR" ? "/field-supervisor/caregivers" : "/caregivers";
                  if (item.id === "evv-monitoring") href = "/evv-monitoring";
                  if (item.id === "qa") href = safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance/qa" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical/qa" : "/quality-assurance";
                  if (item.id === "visits") href = safeUser?.role === "CLIENT" ? "/portal/visits" : "/field-supervisor/visits";
                  if (item.id === "incidents") href = safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance/incidents" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical/incidents" : safeUser?.role === "FIELD_SUPERVISOR" ? "/field-supervisor/incidents" : "/incidents";
                  if (item.id === "assessments") href = "/clinical/assessments";
                  if (item.id === "compliance") href = safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance/tracking" : "/compliance";
                  if (item.id === "referrals") href = safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/referrals" : "/referrals";
                  if (item.id === "communications") href = safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/communications" : "/communications";
                  if (item.id === "settings") href = safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance/settings" : safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/settings" : safeUser?.role === "BILLING_FINANCE_STAFF" ? "/billing/settings" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical/settings" : safeUser?.role === "FIELD_SUPERVISOR" ? "/field-supervisor/settings" : "/settings";
                  if (item.id === "overview") href = "/portal";
                  if (item.id === "care-plan") href = "/portal/care-plan";
                  if (item.id === "billing") href = "/portal/billing";
                  if (item.id === "documents") href = "/portal/documents";
                  if (item.id === "today") href = "/caregiver";
                  if (item.id === "schedule") href = "/caregiver/schedule";
                  if (item.id === "profile") href = "/caregiver/profile";
                  if (item.id === "recruiting") href = "/hr/recruiting";
                  if (item.id === "board") href = "/scheduler/board";

                  return (
                    <li key={item.id} className="relative group">
                      {isActive && (
                        <motion.div
                          layoutId="active-nav"
                          className="absolute inset-0 bg-brand-teal rounded-xl shadow-md shadow-brand-teal/20"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}

                      <Link
                        href={href}
                        onClick={() => {
                          if (onClose) onClose();
                        }}
                        className={clsx(
                          "relative flex items-center justify-between rounded-xl text-sm font-medium transition-colors z-10",
                          isCollapsed ? "p-3" : "px-3.5 py-2.5",
                          isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-sidebar-active/60"
                        )}
                      >
                        <div className={clsx("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
                          <Icon className="w-5 h-5 shrink-0" />
                          {!isCollapsed && <span className="truncate">{item.name}</span>}
                        </div>
                        {/* Badge */}
                        {(item as any).badge && (item as any).badge > 0 && (
                          <span
                            className={clsx(
                              "flex items-center justify-center font-bold rounded-full transition-colors",
                              isCollapsed
                                ? "absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-brand-teal text-white ring-2 ring-sidebar-bg"
                                : "px-2 py-0.5 text-xs",
                              !isCollapsed && (isActive
                                ? "bg-white text-brand-teal"
                                : "bg-brand-teal/20 text-brand-teal border border-brand-teal/30")
                            )}
                          >
                            {(item as any).badge}
                          </span>
                        )}
                      </Link>

                      {/* Tooltip for Mini View */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 flex items-center gap-2 translate-x-1 group-hover:translate-x-0">
                          <span>{item.name}</span>
                          {(item as any).badge && (item as any).badge > 0 && (
                            <span className="bg-brand-teal text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                              {(item as any).badge}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* HIPAA Card */}
        {safeUser?.role !== "CLIENT" && (
          <div className="px-3 mb-3 relative group">
            {isCollapsed ? (
              <div
                onMouseEnter={() => setShowHipaaTooltip(true)}
                onMouseLeave={() => setShowHipaaTooltip(false)}
                className="bg-[#0e354a] rounded-xl p-3 flex items-center justify-center border border-sidebar-active/60 cursor-pointer hover:bg-sidebar-active/50 transition-colors relative"
              >
                <div className="relative">
                  <ShieldCheck className="w-5 h-5 text-brand-teal" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-sidebar-bg"></span>
                </div>

                <AnimatePresence>
                  {showHipaaTooltip && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full ml-4 bottom-0 w-56 bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl z-50 text-left pointer-events-none"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                        <ShieldCheck className="w-4 h-4 text-brand-teal" />
                        {safeUser?.role === "CAREGIVER" ? "EVV & HIPAA Compliant" : safeUser?.role === "SCHEDULER" ? "HIPAA Protected" : "HIPAA Compliant"}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-normal">
                        {safeUser?.role === "SCHEDULER" ? "Role-scoped scheduler view." : "Data encrypted in transit and at rest."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-[#0e354a] rounded-xl p-4 flex items-start gap-3 border border-sidebar-active">
                <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">
                    {safeUser?.role === "CAREGIVER" ? "EVV & HIPAA Compliant" : safeUser?.role === "SCHEDULER" ? "HIPAA Protected" : "HIPAA Compliant"}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {safeUser?.role === "SCHEDULER" ? "Role-scoped scheduler view." : "Data encrypted in transit and at rest."}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-active/60 relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={clsx(
              "flex items-center gap-3 w-full hover:bg-sidebar-active p-2 rounded-xl transition-colors text-left cursor-pointer",
              isCollapsed && "justify-center"
            )}
            title={isCollapsed ? `${safeUser?.name || "Agency Admin"}` : undefined}
          >
            <div className="w-9 h-9 rounded-full bg-slate-600 shrink-0 overflow-hidden flex items-center justify-center ring-2 ring-brand-teal/40">
              <User className="w-4.5 h-4.5 text-slate-300" />
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-white truncate">
                    {safeUser?.name || "Agency Executive"}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {safeUser?.role === "CLIENT" ? "Family Member" : safeUser?.role === "CAREGIVER" ? "Caregiver (Field Staff)" : safeUser?.role === "SCHEDULER" ? "Scheduler / Dispatcher" : safeUser?.role === "HR" ? "HR Recruiter" : safeUser?.role || "ADMIN"}
                  </div>
                </div>
                <ChevronDown
                  className={clsx("w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200", isProfileOpen && "rotate-180")}
                />
              </>
            )}
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={clsx(
                  "absolute bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5",
                  isCollapsed
                    ? "left-full ml-4 bottom-3 w-48"
                    : "bottom-[calc(100%-10px)] left-3 right-3 mb-2"
                )}
              >
                <div className="flex flex-col gap-1">
                  <Link
                    href={safeUser?.role === "QA_COMPLIANCE_OFFICER" ? "/compliance/settings" : safeUser?.role === "INTAKE_COORDINATOR" ? "/intake/settings" : safeUser?.role === "BILLING_FINANCE_STAFF" ? "/billing/settings" : safeUser?.role === "CLINICAL_SUPERVISOR_RN" ? "/clinical/settings" : safeUser?.role === "FIELD_SUPERVISOR" ? "/field-supervisor/settings" : "/settings"}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-sidebar-active rounded-xl transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </Link>
                  <div className="h-px w-full bg-sidebar-active/60 my-0.5" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}
