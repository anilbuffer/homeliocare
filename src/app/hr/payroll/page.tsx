"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Receipt,
  Lock,
  Search,
  FileText,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  Mail,
  Printer,
  Shield,
  User,
  HelpCircle,
  X,
  ExternalLink,
  Calendar,
  Check,
  AlertTriangle,
  Send,
  Sparkles,
  Building2,
  CreditCard,
  History,
  FileCheck,
  MessageSquare
} from "lucide-react";

// Types
export interface PayrollRecord {
  id: string;
  caregiverId: string;
  name: string;
  role: "CNA" | "HHA" | "RN" | "LPN";
  email: string;
  phone: string;
  baseHours: number;
  otHours: number;
  dtHours: number;
  travelMiles: number;
  travelTime: number;
  rate: number;
  shiftDiff: number;
  grossTotal: number;
  taxWithholding: number;
  netPay: number;
  payPeriod: string;
  status: "Processed & Verified" | "Pending Verification" | "Inquiry Flagged";
  directDeposit: {
    bankName: string;
    accountLast4: string;
    routingLast4: string;
    status: "Active" | "Pending Verification";
  };
  evvShifts: {
    id: string;
    date: string;
    clientName: string;
    scheduledHours: number;
    actualHours: number;
    clockIn: string;
    clockOut: string;
    gpsVerified: boolean;
    status: "Verified" | "Adjusted";
  }[];
}

// Multi-Pay-Period Mock Data
const payrollDataByPeriod: Record<string, PayrollRecord[]> = {
  "Jul 1 - Jul 14, 2026": [
    {
      id: "PAY-2026-07A-01",
      caregiverId: "CG-001",
      name: "Maria Garcia",
      role: "CNA",
      email: "maria.garcia@homeliocare.com",
      phone: "(555) 234-5678",
      baseHours: 35.0,
      otHours: 5.5,
      dtHours: 1.0,
      travelMiles: 120,
      travelTime: 3.5,
      rate: 22.0,
      shiftDiff: 45.0,
      grossTotal: 1045.5,
      taxWithholding: 209.1,
      netPay: 836.4,
      payPeriod: "Jul 1 - Jul 14, 2026",
      status: "Processed & Verified",
      directDeposit: {
        bankName: "Chase Bank",
        accountLast4: "4821",
        routingLast4: "0210",
        status: "Active"
      },
      evvShifts: [
        {
          id: "EVV-101",
          date: "Jul 2, 2026",
          clientName: "Eleanor Vance",
          scheduledHours: 8.0,
          actualHours: 8.5,
          clockIn: "08:02 AM",
          clockOut: "04:32 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-102",
          date: "Jul 5, 2026",
          clientName: "Eleanor Vance",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "08:00 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-103",
          date: "Jul 8, 2026",
          clientName: "Robert Jenkins",
          scheduledHours: 8.0,
          actualHours: 8.0,
          clockIn: "09:00 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-104",
          date: "Jul 11, 2026",
          clientName: "Robert Jenkins",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "09:00 AM",
          clockOut: "06:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-105",
          date: "Jul 13, 2026",
          clientName: "Eleanor Vance",
          scheduledHours: 7.0,
          actualHours: 7.0,
          clockIn: "08:00 AM",
          clockOut: "03:00 PM",
          gpsVerified: true,
          status: "Verified"
        }
      ]
    },
    {
      id: "PAY-2026-07A-02",
      caregiverId: "CG-002",
      name: "James Smith",
      role: "HHA",
      email: "james.smith@homeliocare.com",
      phone: "(555) 876-5432",
      baseHours: 35.5,
      otHours: 0,
      dtHours: 0,
      travelMiles: 85,
      travelTime: 2.0,
      rate: 20.0,
      shiftDiff: 0,
      grossTotal: 910.0,
      taxWithholding: 182.0,
      netPay: 728.0,
      payPeriod: "Jul 1 - Jul 14, 2026",
      status: "Processed & Verified",
      directDeposit: {
        bankName: "Bank of America",
        accountLast4: "9912",
        routingLast4: "1210",
        status: "Active"
      },
      evvShifts: [
        {
          id: "EVV-201",
          date: "Jul 1, 2026",
          clientName: "Arthur Pendelton",
          scheduledHours: 7.0,
          actualHours: 7.0,
          clockIn: "09:00 AM",
          clockOut: "04:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-202",
          date: "Jul 4, 2026",
          clientName: "Arthur Pendelton",
          scheduledHours: 7.5,
          actualHours: 7.5,
          clockIn: "09:00 AM",
          clockOut: "04:30 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-203",
          date: "Jul 7, 2026",
          clientName: "Sophia Martinez",
          scheduledHours: 7.0,
          actualHours: 7.0,
          clockIn: "08:30 AM",
          clockOut: "03:30 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-204",
          date: "Jul 10, 2026",
          clientName: "Sophia Martinez",
          scheduledHours: 7.0,
          actualHours: 7.0,
          clockIn: "08:30 AM",
          clockOut: "03:30 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-205",
          date: "Jul 12, 2026",
          clientName: "Arthur Pendelton",
          scheduledHours: 7.0,
          actualHours: 7.0,
          clockIn: "09:00 AM",
          clockOut: "04:00 PM",
          gpsVerified: true,
          status: "Verified"
        }
      ]
    },
    {
      id: "PAY-2026-07A-03",
      caregiverId: "CG-003",
      name: "Linda Johnson",
      role: "RN",
      email: "linda.johnson@homeliocare.com",
      phone: "(555) 345-6789",
      baseHours: 40.0,
      otHours: 4.0,
      dtHours: 0,
      travelMiles: 150,
      travelTime: 4.0,
      rate: 25.0,
      shiftDiff: 75.0,
      grossTotal: 1275.0,
      taxWithholding: 255.0,
      netPay: 1020.0,
      payPeriod: "Jul 1 - Jul 14, 2026",
      status: "Processed & Verified",
      directDeposit: {
        bankName: "Wells Fargo",
        accountLast4: "5501",
        routingLast4: "1212",
        status: "Active"
      },
      evvShifts: [
        {
          id: "EVV-301",
          date: "Jul 3, 2026",
          clientName: "Clara Hughes",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "07:00 AM",
          clockOut: "04:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-302",
          date: "Jul 6, 2026",
          clientName: "Clara Hughes",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "07:00 AM",
          clockOut: "04:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-303",
          date: "Jul 9, 2026",
          clientName: "George Miller",
          scheduledHours: 8.0,
          actualHours: 8.0,
          clockIn: "08:00 AM",
          clockOut: "04:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-304",
          date: "Jul 12, 2026",
          clientName: "George Miller",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "08:00 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-305",
          date: "Jul 14, 2026",
          clientName: "Clara Hughes",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "07:00 AM",
          clockOut: "04:00 PM",
          gpsVerified: true,
          status: "Verified"
        }
      ]
    },
    {
      id: "PAY-2026-07A-04",
      caregiverId: "CG-004",
      name: "David Miller",
      role: "CNA",
      email: "david.miller@homeliocare.com",
      phone: "(555) 901-2345",
      baseHours: 38.0,
      otHours: 2.0,
      dtHours: 0,
      travelMiles: 95,
      travelTime: 2.5,
      rate: 21.5,
      shiftDiff: 20.0,
      grossTotal: 966.25,
      taxWithholding: 193.25,
      netPay: 773.0,
      payPeriod: "Jul 1 - Jul 14, 2026",
      status: "Pending Verification",
      directDeposit: {
        bankName: "Citibank",
        accountLast4: "3381",
        routingLast4: "3211",
        status: "Active"
      },
      evvShifts: [
        {
          id: "EVV-401",
          date: "Jul 2, 2026",
          clientName: "William Bennett",
          scheduledHours: 8.0,
          actualHours: 8.0,
          clockIn: "08:00 AM",
          clockOut: "04:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-402",
          date: "Jul 6, 2026",
          clientName: "William Bennett",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "08:00 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-403",
          date: "Jul 9, 2026",
          clientName: "Helen Ross",
          scheduledHours: 8.0,
          actualHours: 8.0,
          clockIn: "09:00 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-404",
          date: "Jul 13, 2026",
          clientName: "Helen Ross",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "09:00 AM",
          clockOut: "06:00 PM",
          gpsVerified: true,
          status: "Verified"
        }
      ]
    },
    {
      id: "PAY-2026-07A-05",
      caregiverId: "CG-005",
      name: "Amanda Vance",
      role: "LPN",
      email: "amanda.vance@homeliocare.com",
      phone: "(555) 432-1098",
      baseHours: 40.0,
      otHours: 6.0,
      dtHours: 0,
      travelMiles: 110,
      travelTime: 3.0,
      rate: 24.0,
      shiftDiff: 50.0,
      grossTotal: 1226.0,
      taxWithholding: 245.2,
      netPay: 980.8,
      payPeriod: "Jul 1 - Jul 14, 2026",
      status: "Inquiry Flagged",
      directDeposit: {
        bankName: "Capital One",
        accountLast4: "7102",
        routingLast4: "0511",
        status: "Pending Verification"
      },
      evvShifts: [
        {
          id: "EVV-501",
          date: "Jul 1, 2026",
          clientName: "Frank Wright",
          scheduledHours: 8.0,
          actualHours: 9.5,
          clockIn: "07:30 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Adjusted"
        },
        {
          id: "EVV-502",
          date: "Jul 4, 2026",
          clientName: "Frank Wright",
          scheduledHours: 8.0,
          actualHours: 9.5,
          clockIn: "07:30 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Adjusted"
        },
        {
          id: "EVV-503",
          date: "Jul 8, 2026",
          clientName: "Dorothy Gable",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "08:00 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Verified"
        },
        {
          id: "EVV-504",
          date: "Jul 11, 2026",
          clientName: "Dorothy Gable",
          scheduledHours: 8.0,
          actualHours: 9.0,
          clockIn: "08:00 AM",
          clockOut: "05:00 PM",
          gpsVerified: true,
          status: "Verified"
        }
      ]
    }
  ],
  "Jun 16 - Jun 30, 2026": [
    {
      id: "PAY-2026-06B-01",
      caregiverId: "CG-001",
      name: "Maria Garcia",
      role: "CNA",
      email: "maria.garcia@homeliocare.com",
      phone: "(555) 234-5678",
      baseHours: 40.0,
      otHours: 3.0,
      dtHours: 0,
      travelMiles: 110,
      travelTime: 3.0,
      rate: 22.0,
      shiftDiff: 30.0,
      grossTotal: 1009.0,
      taxWithholding: 201.8,
      netPay: 807.2,
      payPeriod: "Jun 16 - Jun 30, 2026",
      status: "Processed & Verified",
      directDeposit: {
        bankName: "Chase Bank",
        accountLast4: "4821",
        routingLast4: "0210",
        status: "Active"
      },
      evvShifts: []
    },
    {
      id: "PAY-2026-06B-02",
      caregiverId: "CG-002",
      name: "James Smith",
      role: "HHA",
      email: "james.smith@homeliocare.com",
      phone: "(555) 876-5432",
      baseHours: 36.0,
      otHours: 0,
      dtHours: 0,
      travelMiles: 75,
      travelTime: 1.5,
      rate: 20.0,
      shiftDiff: 0,
      grossTotal: 768.75,
      taxWithholding: 153.75,
      netPay: 615.0,
      payPeriod: "Jun 16 - Jun 30, 2026",
      status: "Processed & Verified",
      directDeposit: {
        bankName: "Bank of America",
        accountLast4: "9912",
        routingLast4: "1210",
        status: "Active"
      },
      evvShifts: []
    }
  ],
  "Jun 1 - Jun 15, 2026": [
    {
      id: "PAY-2026-06A-01",
      caregiverId: "CG-003",
      name: "Linda Johnson",
      role: "RN",
      email: "linda.johnson@homeliocare.com",
      phone: "(555) 345-6789",
      baseHours: 40.0,
      otHours: 5.0,
      dtHours: 0,
      travelMiles: 140,
      travelTime: 3.8,
      rate: 25.0,
      shiftDiff: 60.0,
      grossTotal: 1247.5,
      taxWithholding: 249.5,
      netPay: 998.0,
      payPeriod: "Jun 1 - Jun 15, 2026",
      status: "Processed & Verified",
      directDeposit: {
        bankName: "Wells Fargo",
        accountLast4: "5501",
        routingLast4: "1212",
        status: "Active"
      },
      evvShifts: []
    }
  ]
};

export default function HrPayrollPage() {
  const router = useRouter();

  // State Management
  const [selectedPayPeriod, setSelectedPayPeriod] = useState<string>("Jul 1 - Jul 14, 2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [otOnlyFilter, setOtOnlyFilter] = useState<boolean>(false);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // Modals state
  const [selectedPaystub, setSelectedPaystub] = useState<PayrollRecord | null>(null);
  const [activeStubTab, setActiveStubTab] = useState<"statement" | "evv" | "deposit">("statement");
  const [auditingEvvRecord, setAuditingEvvRecord] = useState<PayrollRecord | null>(null);
  const [inquiryRecord, setInquiryRecord] = useState<PayrollRecord | null>(null);
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [inquiryCategory, setInquiryCategory] = useState("Overtime Rate Adjustment");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState("ADP");
  const [isExporting, setIsExporting] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailTarget, setEmailTarget] = useState<PayrollRecord | null>(null);
  const [isSyncingEvv, setIsSyncingEvv] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Dataset filter
  const currentData = payrollDataByPeriod[selectedPayPeriod] || [];

  const filteredData = currentData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caregiverId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "ALL" || item.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
    const matchesOt = !otOnlyFilter || item.otHours > 0 || item.dtHours > 0;

    return matchesSearch && matchesRole && matchesStatus && matchesOt;
  });

  // KPI Calculations
  const totalGrossSpend = filteredData.reduce((acc, c) => acc + c.grossTotal, 0);
  const totalOtHours = filteredData.reduce((acc, c) => acc + c.otHours + c.dtHours, 0);
  const totalMiles = filteredData.reduce((acc, c) => acc + c.travelMiles, 0);
  const totalNetPayout = filteredData.reduce((acc, c) => acc + c.netPay, 0);

  // Handlers
  const handleSyncEvv = () => {
    setIsSyncingEvv(true);
    setTimeout(() => {
      setIsSyncingEvv(false);
      triggerToast("EVV hours successfully synchronized with state aggregator!");
    }, 1500);
  };

  const handleExportDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsExportModalOpen(false);

      // Create download mock CSV/JSON blob
      const csvContent =
        "data:text/csv;charset=utf-8," +
        ["ID,Name,Role,PayPeriod,BaseHours,OTHours,Rate,GrossPay,NetPay"]
          .concat(
            filteredData.map(
              (r) =>
                `${r.id},"${r.name}",${r.role},"${r.payPeriod}",${r.baseHours},${r.otHours},${r.rate},${r.grossTotal},${r.netPay}`
            )
          )
          .join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `Payroll_Report_${selectedExportFormat}_${selectedPayPeriod.replace(/\s+/g, "_")}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      triggerToast(`Export file generated for ${selectedExportFormat}!`);
    }, 1800);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryRecord) return;
    triggerToast(`Payroll inquiry for ${inquiryRecord.name} submitted to Billing Admin.`);
    setInquiryRecord(null);
    setInquiryNotes("");
  };

  const handleSendEmailPaystub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTarget) return;
    triggerToast(`Pay stub statement successfully emailed to ${emailTarget.email}!`);
    setIsEmailModalOpen(false);
    setEmailTarget(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full mx-auto space-y-6 pb-12"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-5 right-5 z-[100] bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold"
          >
            <div className="w-7 h-7 rounded-xl bg-brand-teal text-white flex items-center justify-center font-bold shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Breadcrumb & Actions Header */}
      <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-brand-teal flex items-center justify-center font-bold border border-brand-teal/20">
              <Receipt className="w-5.5 h-5.5 text-brand-teal" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                Caregiver Payroll Reference
                <span className="bg-slate-100 text-slate-700 text-[11px] font-regular px-2.5 py-0.5 rounded-full border border-slate-200">
                  Read-Only View
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-regular">
                Reference caregiver pay stubs, EVV clock-in records, overtime hours, and flag rate inquiries for Billing.
              </p>
            </div>
          </div>
        </div>

        {/* Header Quick Controls */}
        <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto shrink-0">
          {/* Pay Period Dropdown */}
          <div className="relative">
            <select
              value={selectedPayPeriod}
              onChange={(e) => setSelectedPayPeriod(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-brand-teal cursor-pointer pr-8 appearance-none"
            >
              {Object.keys(payrollDataByPeriod).map((period) => (
                <option key={period} value={period}>
                  Period: {period}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sync EVV Button */}
          <button
            onClick={handleSyncEvv}
            disabled={isSyncingEvv}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Sync latest EVV hours from aggregator"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isSyncingEvv ? "animate-spin text-brand-teal" : ""}`} />
            <span className="hidden sm:inline">Sync EVV</span>
          </button>

          {/* Export Button */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white text-xs font-semibold rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] shadow-brand-teal/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Payroll</span>
          </button>

          {/* Read-Only HR Access Info Badge */}
          <button
            onClick={() => setIsRulesModalOpen(true)}
            className="bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold px-3.5 py-2 rounded-xl border border-amber-200/90 flex items-center gap-2 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="hidden lg:inline">HR Read-Only &bull; View Rules</span>
            <HelpCircle className="w-3.5 h-3.5 text-amber-600 ml-0.5" />
          </button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Spend Card */}
        <div className="bg-white backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center gap-4 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center font-bold border border-brand-teal/20 shrink-0">
            <DollarSign className="w-6 h-6 text-brand-teal" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-regular text-slate-400 uppercase tracking-wider block">
                Period Gross Spend
              </span>
              <span className="text-[10px] font-regular text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Verified
              </span>
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5 truncate">
              ${totalGrossSpend.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1 truncate">
              Net Payout: <span className="font-bold text-slate-700">${totalNetPayout.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Overtime Card */}
        <div
          onClick={() => setOtOnlyFilter(!otOnlyFilter)}
          className={`bg-white backdrop-blur-xl p-4 rounded-2xl border shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center gap-4 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all cursor-pointer ${otOnlyFilter ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30" : "border-slate-200/80"
            }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-200 shrink-0">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-regular text-blue-700 uppercase tracking-wider block">
                Overtime / Double
              </span>
              {otOnlyFilter && (
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Filtered
                </span>
              )}
            </div>
            <div className="text-xl font-bold text-blue-950 mt-0.5 truncate">
              {totalOtHours} Hours
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-0.5 truncate">
              CA Daily & Weekly Rules Applied
            </div>
          </div>
        </div>

        {/* Travel Mileage Card */}
        <div className="bg-white backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center gap-4 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200 shrink-0">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-regular text-emerald-700 block">
                Travel Mileage
              </span>
              <span className="text-[10px] font-medium text-slate-400">@ $0.65/mi</span>
            </div>
            <div className="text-xl font-bold text-emerald-950 mt-0.5 truncate">
              {totalMiles} Miles
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5 truncate">
              Reimbursement: ${(totalMiles * 0.65).toFixed(2)}
            </div>
          </div>
        </div>

        {/* EVV Compliance Card */}
        <div className="bg-white backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center gap-4 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-semibold border border-purple-200 shrink-0">
            <CheckCircle2 className="w-6 h-6 text-purple-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-regular text-purple-700 uppercase tracking-wider block">
                EVV Match Rate
              </span>
              <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                100%
              </span>
            </div>
            <div className="text-xl font-bold text-purple-950 mt-0.5 truncate">
              GPS Verified
            </div>
            <div className="text-[11px] text-purple-700 font-medium mt-0.5 truncate">
              State Aggregator Connected
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Toolbar */}
      <div className="bg-white backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search caregiver name, role, ID, or stub..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Role Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {["ALL", "CNA", "HHA", "RN", "LPN"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${roleFilter === role
                  ? "bg-white text-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Processed & Verified">Processed & Verified</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="Inquiry Flagged">Inquiry Flagged</option>
          </select>

          {/* Overtime Toggle Pill */}
          <button
            onClick={() => setOtOnlyFilter(!otOnlyFilter)}
            className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${otOnlyFilter
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
          >
            <Clock className="w-3.5 h-3.5" />
            OT Only
          </button>

          {/* Clear Filters */}
          {(searchQuery || roleFilter !== "ALL" || statusFilter !== "ALL" || otOnlyFilter) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("ALL");
                setStatusFilter("ALL");
                setOtOnlyFilter(false);
              }}
              className="px-3 py-2 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-2xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.035)] overflow-hidden">
        {/* Table Header Summary */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-teal" />
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider whitespace-nowrap">
              Caregiver Payroll Records ({filteredData.length})
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-3">
            <span>Pay Period: <strong className="text-slate-800">{selectedPayPeriod}</strong></span>
            <span>&bull;</span>
            <span>Total Filtered Payout: <strong className="text-brand-teal">${totalGrossSpend.toFixed(2)}</strong></span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-100/70 text-slate-500 font-medium text-[12px]">
                <th className="py-3 px-4 w-10 text-center"></th>
                <th className="py-3 px-4">Caregiver & Role</th>
                <th className="py-3 px-4">Pay Period</th>
                <th className="py-3 px-4">Base / OT / DT Hours</th>
                <th className="py-3 px-4">Travel & Mileage</th>
                <th className="py-3 px-4">Rate & Shift Diff</th>
                <th className="py-3 px-4">Gross Pay</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-sm text-slate-600">No caregiver payroll records found matching criteria.</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search terms or filter selections.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => {
                  const isExpanded = expandedRowId === row.id;

                  return (
                    <React.Fragment key={row.id}>
                      <tr className={`hover:bg-slate-50/80 transition-colors group ${isExpanded ? "bg-slate-50/90" : ""}`}>
                        {/* Expand Accordion Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setExpandedRowId(isExpanded ? null : row.id)}
                            className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Expand itemized breakdown"
                          >
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90 text-brand-teal font-bold" : ""}`}
                            />
                          </button>
                        </td>

                        {/* Caregiver Column */}
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-teal font-semibold flex items-center justify-center border border-brand-teal/20 shrink-0">
                              {row.name.charAt(0)}
                            </div>
                            <div>
                              <Link
                                href="/hr/caregivers"
                                className="font-bold text-slate-900 hover:text-brand-teal transition-colors flex items-center gap-1 whitespace-nowrap group-hover:underline"
                                title="View Caregiver Profile"
                              >
                                {row.name}
                                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                              <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5 mt-0.5">
                                <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-bold whitespace-nowrap">{row.role}</span>
                                <span>&bull;</span>
                                <span className="whitespace-nowrap">{row.caregiverId}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Pay Period */}
                        <td className="py-3 px-4 font-semibold text-slate-600 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="whitespace-nowrap">{row.payPeriod}</span>
                          </div>
                        </td>

                        {/* Base / OT / DT Hours */}
                        <td className="py-3 px-4 font-bold text-slate-800">
                          <div>
                            <span>{row.baseHours}h Base</span>
                            {row.otHours > 0 && (
                              <span className="text-blue-600 ml-1.5 bg-blue-50 px-1.5 py-0.5 rounded text-[10.5px] whitespace-nowrap">
                                +{row.otHours}h OT
                              </span>
                            )}
                            {row.dtHours > 0 && (
                              <span className="text-rose-600 ml-1.5 bg-rose-50 px-1.5 py-0.5 rounded text-[10.5px] whitespace-nowrap">
                                +{row.dtHours}h DT
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-normal text-slate-400 mt-0.5 whitespace-nowrap">
                            Total EVV: {(row.baseHours + row.otHours + row.dtHours).toFixed(1)} hrs
                          </div>
                        </td>

                        {/* Travel & Mileage */}
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          <div className="whitespace-nowrap">{row.travelMiles} mi ({row.travelTime}h travel)</div>
                          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 whitespace-nowrap">
                            +${(row.travelMiles * 0.65).toFixed(2)} reimbursed
                          </div>
                        </td>

                        {/* Rate & Shift Diff */}
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          <div>${row.rate.toFixed(2)}/hr</div>
                          {row.shiftDiff > 0 ? (
                            <div className="text-[10px] text-purple-600 font-semibold mt-0.5 whitespace-nowrap">
                              +${row.shiftDiff.toFixed(2)} diff
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-400 mt-0.5">Standard</div>
                          )}
                        </td>

                        {/* Gross Pay */}
                        <td className="py-3 px-4 font-bold text-brand-teal text-sm">
                          <div>${row.grossTotal.toFixed(2)}</div>
                          <div className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                            Est. Net: ${row.netPay.toFixed(2)}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-semibold border ${row.status === "Processed & Verified"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : row.status === "Pending Verification"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                              }`}
                          >
                            {row.status === "Processed & Verified" && <CheckCircle2 className="w-3 h-3" />}
                            {row.status === "Pending Verification" && <Clock className="w-3 h-3" />}
                            {row.status === "Inquiry Flagged" && <AlertTriangle className="w-3 h-3" />}
                            {row.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Stub Button */}
                            <button
                              onClick={() => {
                                setSelectedPaystub(row);
                                setActiveStubTab("statement");
                              }}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-brand-teal hover:text-white text-slate-800 font-semibold rounded-xl transition-all active:scale-95 flex items-center gap-1 border border-slate-200 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)] whitespace-nowrap"
                              title="View Paystub Statement"
                            >
                              <FileText className="w-3.5 h-3.5" /> View Stub
                            </button>

                            {/* Audit EVV Button */}
                            <button
                              onClick={() => setAuditingEvvRecord(row)}
                              className="p-1.5 bg-slate-50 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                              title="Audit EVV Shift Logs"
                            >
                              <Clock className="w-3.5 h-3.5" />
                            </button>

                            {/* Flag Inquiry Button */}
                            <button
                              onClick={() => setInquiryRecord(row)}
                              className="p-1.5 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                              title="Flag Payroll Inquiry for Billing"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Itemized Earnings Row */}
                      <AnimatePresence>
                        {isExpanded && (
                          <tr className="bg-slate-100 border-b border-slate-200">
                            <td colSpan={9} className="p-0">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 ml-8 sm:ml-12 mr-6 border-l-4 border-brand-teal my-2 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
                                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <div className="flex items-center gap-2">
                                      <Receipt className="w-4 h-4 text-brand-teal" />
                                      <h4 className="text-xs font-bold text-slate-800">
                                        Itemized Earnings & EVV Audit Breakdown — {row.name} ({row.id})
                                      </h4>
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-500">
                                      Rate: ${row.rate.toFixed(2)}/hr &bull; CA Overtime Compliant
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                      <div className="text-[11px] text-slate-500 font-semibold mb-1">Base Regular Earnings</div>
                                      <div className="font-extrabold text-slate-900 text-sm">
                                        ${(row.baseHours * row.rate).toFixed(2)}
                                      </div>
                                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                                        {row.baseHours} hrs @ ${row.rate}/hr
                                      </div>
                                    </div>

                                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                      <div className="text-[11px] text-blue-700 font-semibold mb-1">Overtime (1.5x)</div>
                                      <div className="font-extrabold text-blue-900 text-sm">
                                        ${(row.otHours * row.rate * 1.5).toFixed(2)}
                                      </div>
                                      <div className="text-[10px] text-blue-600 font-medium mt-0.5">
                                        {row.otHours} hrs @ ${(row.rate * 1.5).toFixed(2)}/hr
                                      </div>
                                    </div>

                                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                      <div className="text-[11px] text-emerald-700 font-semibold mb-1">Travel Reimbursement</div>
                                      <div className="font-extrabold text-emerald-900 text-sm">
                                        ${(row.travelMiles * 0.65).toFixed(2)}
                                      </div>
                                      <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                                        {row.travelMiles} mi @ $0.65/mi IRS rate
                                      </div>
                                    </div>

                                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                      <div className="text-[11px] text-purple-700 font-semibold mb-1">Shift Differentials</div>
                                      <div className="font-extrabold text-purple-900 text-sm">
                                        ${row.shiftDiff.toFixed(2)}
                                      </div>
                                      <div className="text-[10px] text-purple-600 font-medium mt-0.5">
                                        Night / Weekend Bonus
                                      </div>
                                    </div>

                                    <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                                      <div className="text-[11px] text-teal-800 font-semibold mb-1">Estimated Net Payout</div>
                                      <div className="font-extrabold text-brand-teal text-sm">
                                        ${row.netPay.toFixed(2)}
                                      </div>
                                      <div className="text-[10px] text-teal-700 font-medium mt-0.5">
                                        After ~20% tax withholdings (${row.taxWithholding.toFixed(2)})
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600">
                                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Direct Deposit: {row.directDeposit.bankName} (****{row.directDeposit.accountLast4})</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => {
                                          setSelectedPaystub(row);
                                          setActiveStubTab("evv");
                                        }}
                                        className="text-brand-teal hover:underline flex items-center gap-1 cursor-pointer"
                                      >
                                        <Clock className="w-3.5 h-3.5" /> View EVV Shifts ({row.evvShifts.length})
                                      </button>
                                      <span>&bull;</span>
                                      <button
                                        onClick={() => setInquiryRecord(row)}
                                        className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                                      >
                                        <MessageSquare className="w-3.5 h-3.5" /> Submit Inquiry
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paystub Statement Preview Modal */}
      {selectedPaystub && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-[24px] max-w-2xl w-full shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 p-3 sm:p-4 shrink-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center border border-teal-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    <Receipt className="w-4 h-4 text-brand-teal" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base tracking-tight">Official Pay Stub Statement</h3>
                </div>
                <p className="text-[12px] text-slate-500 font-medium mt-2 flex items-center gap-1.5 ml-1">
                  Caregiver: <strong className="text-slate-800">{selectedPaystub.name}</strong> ({selectedPaystub.caregiverId}) <span className="text-slate-300">&bull;</span> Pay Period: {selectedPaystub.payPeriod}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 whitespace-nowrap shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {selectedPaystub.status}
                </span>
                <button
                  onClick={() => setSelectedPaystub(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stub Modal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 sm:px-4 py-3 shrink-0 bg-slate-50/50 z-10">
              <button
                onClick={() => setActiveStubTab("statement")}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeStubTab === "statement"
                  ? "bg-brand-teal/10 text-brand-teal shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-brand-teal/30"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent"
                  }`}
              >
                Earnings Breakdown
              </button>
              <button
                onClick={() => setActiveStubTab("evv")}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${activeStubTab === "evv"
                  ? "bg-brand-teal/10 text-brand-teal shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-brand-teal/30"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent"
                  }`}
              >
                EVV Shift Logs <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeStubTab === "evv" ? "bg-teal-100 text-brand-teal" : "bg-slate-100 text-slate-500"}`}>{selectedPaystub.evvShifts.length}</span>
              </button>
              <button
                onClick={() => setActiveStubTab("deposit")}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeStubTab === "deposit"
                  ? "bg-brand-teal/10 text-brand-teal shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-brand-teal/30"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent"
                  }`}
              >
                Direct Deposit & Tax
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-4 bg-white">
              {/* Tab 1: Statement */}
              {activeStubTab === "statement" && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    <div className="flex justify-between font-regular text-slate-600">
                      <span>Base Hours ({selectedPaystub.baseHours} hrs @ ${selectedPaystub.rate.toFixed(2)}/hr)</span>
                      <span className="font-bold text-slate-900">${(selectedPaystub.baseHours * selectedPaystub.rate).toFixed(2)}</span>
                    </div>

                    {selectedPaystub.otHours > 0 && (
                      <div className="flex justify-between font-regular text-slate-600">
                        <span>Overtime 1.5x ({selectedPaystub.otHours} hrs @ ${(selectedPaystub.rate * 1.5).toFixed(2)}/hr)</span>
                        <span className="font-bold text-blue-700">${(selectedPaystub.otHours * selectedPaystub.rate * 1.5).toFixed(2)}</span>
                      </div>
                    )}

                    {selectedPaystub.dtHours > 0 && (
                      <div className="flex justify-between font-regular text-slate-600">
                        <span>Double Time 2.0x ({selectedPaystub.dtHours} hrs @ ${(selectedPaystub.rate * 2.0).toFixed(2)}/hr)</span>
                        <span className="font-bold text-rose-700">${(selectedPaystub.dtHours * selectedPaystub.rate * 2.0).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-regular text-slate-600">
                      <span>Travel Mileage Reimbursement ({selectedPaystub.travelMiles} mi @ $0.65/mi)</span>
                      <span className="font-bold text-slate-900">${(selectedPaystub.travelMiles * 0.65).toFixed(2)}</span>
                    </div>

                    {selectedPaystub.shiftDiff > 0 && (
                      <div className="flex justify-between font-regular text-slate-600">
                        <span>Shift Differentials (Night / Weekend)</span>
                        <span className="font-bold text-purple-700">${selectedPaystub.shiftDiff.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="border-t border-slate-200 pt-3 flex justify-between font-semibold text-sm text-slate-900">
                      <span>Total Gross Earnings</span>
                      <span className="text-brand-teal">${selectedPaystub.grossTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-regular text-slate-500 pt-1">
                      <span>Estimated Tax Withholdings (Fed/State/FICA)</span>
                      <span className="font-bold text-rose-600">-${selectedPaystub.taxWithholding.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex justify-between font-semibold text-base text-slate-900">
                      <span>Estimated Net Deposit</span>
                      <span className="text-emerald-600">${selectedPaystub.netPay.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3 text-[13px] text-amber-900 font-medium shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-amber-800" />
                    </div>
                    <span className="mt-1">
                      This statement is generated for HR reference only. Rates and hour adjustments must be requested via Billing Administration.
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 2: EVV Shift Logs */}
              {activeStubTab === "evv" && (
                <div className="space-y-3">
                  {selectedPaystub.evvShifts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Clock className="w-10 h-10 text-slate-300 mb-3" />
                      <p className="text-sm font-semibold text-slate-600">No shift logs found</p>
                      <p className="text-xs text-slate-400 mt-1">No individual shift logs uploaded for this archived pay period.</p>
                    </div>
                  ) : (
                    selectedPaystub.evvShifts.map((shift) => (
                      <div key={shift.id} className="px-4 py-3 bg-white hover:bg-slate-50 transition-colors rounded-xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{shift.date} &bull; {shift.clientName}</div>
                          <div className="text-xs text-slate-500 font-regular mt-1">
                            Clock In: {shift.clockIn} | Clock Out: {shift.clockOut} ({shift.actualHours} hrs)
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {shift.gpsVerified && (
                            <span className="bg-purple-100 text-purple-800 border border-purple-200 text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                              <MapPin className="w-3.5 h-3.5" /> GPS Verified
                            </span>
                          )}
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            {shift.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 3: Direct Deposit & Tax */}
              {activeStubTab === "deposit" && (
                <div className="space-y-4 text-[12px]">
                  <div className="px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-3">
                    <div className="font-semibold text-slate-900 text-sm flex items-center gap-2.5 pb-2 border-b border-slate-200">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-brand-teal" />
                      </div>
                      Direct Deposit Information
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium text-xs">
                      <span>Financial Institution:</span>
                      <strong className="text-slate-900">{selectedPaystub.directDeposit.bankName}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium text-xs">
                      <span>Account Number:</span>
                      <strong className="text-slate-900">********{selectedPaystub.directDeposit.accountLast4}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium text-xs">
                      <span>Routing Number:</span>
                      <strong className="text-slate-900">*****{selectedPaystub.directDeposit.routingLast4}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium items-center text-xs">
                      <span>Verification Status:</span>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold px-2.5 py-1 rounded-lg text-[11px] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        {selectedPaystub.directDeposit.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-3">
                    <div className="font-semibold text-slate-900 text-sm flex items-center gap-2.5 pb-2 border-b border-slate-200">
                      <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-brand-teal" />
                      </div>
                      Tax Withholding Parameters
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium text-xs">
                      <span>Federal W-4 Filing Status:</span>
                      <strong className="text-slate-900">Single / Married Filing Separately</strong>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium text-xs">
                      <span>State Tax Withholding:</span>
                      <strong className="text-slate-900">CA State Tax (DE-4 Active)</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 border-t border-slate-200 shrink-0 bg-slate-100 rounded-b-[24px] z-10">
              <button
                onClick={() => {
                  setEmailTarget(selectedPaystub);
                  setIsEmailModalOpen(true);
                }}
                className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 text-slate-400" /> Email to Caregiver
              </button>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-[13px] font-semibold rounded-xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Printer className="w-4 h-4 text-slate-400" /> Print Statement
                </button>
                <button
                  onClick={() => {
                    triggerToast(`Downloading official PDF paystub statement for ${selectedPaystub.name}...`);
                    setSelectedPaystub(null);
                  }}
                  className="px-4 py-2.5 bg-brand-teal text-white text-[13px] font-semibold rounded-xl hover:bg-brand-teal/90 shadow-[0_4px_20px_rgba(0,0,0,0.08)] shadow-brand-teal/30 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* EVV Shift Audit Modal */}
      {auditingEvvRecord && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-[24px] max-w-lg w-full shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-3 sm:p-4 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <Clock className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base tracking-tight">EVV Shift Verification Logs</h3>
                  <p className="text-[12px] text-slate-500 font-regular mt-0.5">{auditingEvvRecord.name} ({auditingEvvRecord.caregiverId})</p>
                </div>
              </div>
              <button
                onClick={() => setAuditingEvvRecord(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 bg-white">
              {auditingEvvRecord.evvShifts.map((shift) => (
                <div key={shift.id} className="p-3 bg-white hover:bg-slate-50 transition-colors rounded-xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-2 text-[13px]">
                  <div className="flex justify-between font-bold text-slate-900 text-xs">
                    <span>{shift.date} — {shift.clientName}</span>
                    <span className="text-brand-teal font-extrabold">{shift.actualHours} hrs</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium text-xs">
                    <span>Clock-In: {shift.clockIn} | Clock-Out: {shift.clockOut}</span>
                    <span>Sched: {shift.scheduledHours}h</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-2">
                    <span className="bg-purple-50 text-purple-700 border border-purple-100 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                      <MapPin className="w-3.5 h-3.5" /> GPS Location Verified
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                      21st Century Cures Act Compliant
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 p-3 sm:p-4 border-t border-slate-100 shrink-0 bg-slate-50 rounded-b-[24px] z-10">
              <button
                onClick={() => setAuditingEvvRecord(null)}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-[12px] font-semibold rounded-xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 cursor-pointer w-full sm:w-auto text-center"
              >
                Close Audit Log
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Payroll Inquiry Modal */}
      {inquiryRecord && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-[24px] max-w-md w-full shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-3 sm:p-4 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <MessageSquare className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-base tracking-tight">Flag Payroll Inquiry</h3>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">Employee: {inquiryRecord.name} ({inquiryRecord.caregiverId})</p>
                </div>
              </div>
              <button onClick={() => setInquiryRecord(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <form id="inquiryForm" onSubmit={handleSendInquiry} className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 bg-white text-[12px]">
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">Inquiry Category</label>
                <select
                  value={inquiryCategory}
                  onChange={(e) => setInquiryCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-xl font-medium focus:ring-2 focus:ring-brand-teal focus:outline-none transition-shadow shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  <option value="Overtime Rate Adjustment">Overtime Rate Adjustment</option>
                  <option value="EVV Clock Discrepancy">EVV Clock Discrepancy</option>
                  <option value="Travel Mileage Reimbursement">Travel Mileage Reimbursement</option>
                  <option value="Direct Deposit Inquiry">Direct Deposit Inquiry</option>
                  <option value="Shift Differential Bonus">Shift Differential Bonus</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">HR Note / Reason for Billing Team</label>
                <textarea
                  required
                  rows={4}
                  value={inquiryNotes}
                  onChange={(e) => setInquiryNotes(e.target.value)}
                  placeholder="Explain the inquiry or discrepancy to be investigated by Payroll/Billing..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium focus:ring-2 focus:ring-brand-teal focus:outline-none transition-shadow shadow-[0_2px_8px_rgba(0,0,0,0.04)] resize-none"
                />
              </div>
            </form>

            {/* Actions Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-3 sm:p-4 border-t border-slate-100 shrink-0 bg-slate-50 rounded-b-[24px] z-10">
              <button
                type="button"
                onClick={() => setInquiryRecord(null)}
                className="px-4 py-2 bg-white bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[12px] rounded-xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 w-full sm:w-auto text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                form="inquiryForm"
                type="submit"
                className="px-4 py-2 bg-brand-teal text-white font-semibold text-[12px] rounded-xl hover:bg-brand-teal shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 flex items-center justify-center gap-2 w-full sm:w-auto transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" /> Submit to Billing
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Export Payroll Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-[24px] max-w-md w-full shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center border border-teal-100/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <Download className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg tracking-tight">Export Payroll Report</h3>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">Period: {selectedPayPeriod}</p>
                </div>
              </div>
              <button onClick={() => setIsExportModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 bg-white text-[12px]">
              {[
                { name: "ADP Run Format", code: "ADP", desc: "Standard ADP Run CSV mapping with OT codes" },
                { name: "Gusto API Format", code: "GUSTO", desc: "Compatible with Gusto API batch sync" },
                { name: "Paychex Flex Format", code: "PAYCHEX", desc: "Paychex earning code layout" },
                { name: "Summary CSV Sheet", code: "CSV", desc: "Raw spreadsheet format for analysis" }
              ].map((fmt) => (
                <button
                  key={fmt.code}
                  onClick={() => setSelectedExportFormat(fmt.code)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${selectedExportFormat === fmt.code
                    ? "border-brand-teal bg-teal-50 text-brand-teal font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.04)] ring-1 ring-brand-teal"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white"
                    }`}
                >
                  <div>
                    <div className="font-bold text-[13px]">{fmt.name}</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">{fmt.desc}</div>
                  </div>
                  {selectedExportFormat === fmt.code && <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />}
                </button>
              ))}
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-3 sm:p-4 border-t border-slate-100 shrink-0 bg-slate-50/80 rounded-b-[24px] z-10">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[13px] rounded-2xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 w-full sm:w-auto text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleExportDownload}
                disabled={isExporting}
                className="px-4 py-2.5 bg-brand-teal text-white font-semibold text-[13px] rounded-2xl hover:bg-brand-teal/90 shadow-[0_4px_20px_rgba(0,0,0,0.08)] shadow-brand-teal/30 flex items-center justify-center gap-2 w-full sm:w-auto transition-all cursor-pointer disabled:opacity-70"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Download Export File
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* HR Read-Only Access & Rules Info Modal */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-[24px] max-w-lg w-full shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-slate-200/80 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-3 sm:p-4 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center border border-amber-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg tracking-tight">HR Read-Only Access Rules</h3>
                  <p className="text-[12px] text-slate-500 font-regular mt-0.5">Security Policy & Overtime Calculation Guidelines</p>
                </div>
              </div>
              <button onClick={() => setIsRulesModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 bg-white text-[12px]">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 space-y-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="font-bold text-amber-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600" /> Separation of Duties Policy
                </div>
                <p className="text-amber-800 text-[13px] leading-relaxed">
                  HR managers have read-only access to caregiver payroll records for inquiry resolution, paystub distribution, and EVV compliance checks. Rate edits and manual payout adjustments are restricted to the Billing Administration module.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
                <div className="font-extrabold text-slate-900 uppercase text-xs tracking-wider border-b border-slate-100 pb-2">
                  California Overtime Calculation Rules
                </div>
                <ul className="space-y-2.5 text-slate-600 list-disc pl-4">
                  <li><strong className="text-slate-800">Daily Overtime (1.5x):</strong> Hours worked over 8.0 in a single workday.</li>
                  <li><strong className="text-slate-800">Daily Double Time (2.0x):</strong> Hours worked over 12.0 in a single workday.</li>
                  <li><strong className="text-slate-800">Weekly Overtime (1.5x):</strong> Hours worked over 40.0 in a single workweek.</li>
                  <li><strong className="text-slate-800">IRS Mileage Rate:</strong> Reimbursed at standard $0.65/mile for travel between clients.</li>
                </ul>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 p-3 sm:p-4 border-t border-slate-200 shrink-0 bg-slate-50 rounded-b-[24px] z-10">
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="px-4 py-2.5 bg-brand-teal text-white text-[13px] font-semibold rounded-xl hover:bg-brand-teal/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] shadow-brand-teal/30 cursor-pointer w-full sm:w-auto text-center transition-all"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Email Paystub Modal */}
      {isEmailModalOpen && emailTarget && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-[24px] max-w-md w-full shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-3 sm:p-4 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center border border-teal-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Mail className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Email Pay Stub Statement</h3>
                  <p className="text-[13px] text-slate-500 font-medium mt-0.5">Recipient: {emailTarget.name}</p>
                </div>
              </div>
              <button onClick={() => setIsEmailModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <form id="emailForm" onSubmit={handleSendEmailPaystub} className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-5 bg-white text-[13px]">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Caregiver Email Address</label>
                <input
                  type="email"
                  required
                  value={emailTarget.email}
                  onChange={(e) => setEmailTarget({ ...emailTarget, email: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-2xl font-medium focus:ring-2 focus:ring-brand-teal focus:outline-none transition-shadow shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">Pay Period Statement</label>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-700 font-semibold flex flex-col gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <span>{emailTarget.payPeriod}</span>
                  <span className="text-brand-teal text-sm">Gross Total: ${emailTarget.grossTotal.toFixed(2)}</span>
                </div>
              </div>
            </form>

            {/* Actions Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-3 sm:p-4 border-t border-slate-100 shrink-0 bg-slate-50/80 rounded-b-[24px] z-10">
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(false)}
                className="px-4 py-2.5 bg-white bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px] rounded-2xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 w-full sm:w-auto text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                form="emailForm"
                type="submit"
                className="px-4 py-2.5 bg-brand-teal text-white font-bold text-[13px] rounded-2xl hover:bg-brand-teal/90 shadow-[0_4px_20px_rgba(0,0,0,0.08)] shadow-brand-teal/30 flex items-center justify-center gap-2 w-full sm:w-auto transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Email
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
