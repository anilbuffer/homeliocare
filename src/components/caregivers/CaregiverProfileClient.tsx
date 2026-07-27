"use client";

import React, { useState } from "react";
import { Caregiver } from "@/lib/caregivers/mockData";
import { CaregiverHeader } from "@/components/caregivers/CaregiverHeader";
import { CaregiverTabs } from "@/components/caregivers/CaregiverTabs";
import { ScheduleShiftModal } from "@/components/caregivers/modals/ScheduleShiftModal";
import { SendMessageModal } from "@/components/caregivers/modals/SendMessageModal";
import { EditCaregiverModal } from "@/components/caregivers/modals/EditCaregiverModal";
import { StatusChangeModal } from "@/components/hr/StatusChangeModal";
import { ExitInterviewModal } from "@/components/hr/ExitInterviewModal";
import { DocumentViewerModal } from "@/components/caregivers/modals/DocumentViewerModal";
import { CertificateViewerModal } from "@/components/caregivers/modals/CertificateViewerModal";
import { EditAvailabilityModal } from "@/components/caregivers/modals/EditAvailabilityModal";
import { AddRegionModal } from "@/components/caregivers/modals/AddRegionModal";
import { PatientFeedbackModal } from "@/components/caregivers/modals/PatientFeedbackModal";
import { AssignPatientModal } from "@/components/caregivers/modals/AssignPatientModal";
import { UploadDocumentModal } from "@/components/caregivers/modals/UploadDocumentModal";
import { PayStubsModal } from "@/components/caregivers/modals/PayStubsModal";
import { ScreeningDetailsModal } from "@/components/caregivers/modals/ScreeningDetailsModal";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";

interface CaregiverProfileClientProps {
  initialCaregiver: Caregiver;
}

export function CaregiverProfileClient({ initialCaregiver }: CaregiverProfileClientProps) {
  const [caregiver, setCaregiver] = useState<Caregiver>(initialCaregiver);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isScheduleShiftOpen, setIsScheduleShiftOpen] = useState(false);
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);

  const [exitInterviewData, setExitInterviewData] = useState<{
    isOpen: boolean;
    reasonCode: string;
    effectiveDate: string;
  }>({
    isOpen: false,
    reasonCode: "",
    effectiveDate: "",
  });

  const [selectedDoc, setSelectedDoc] = useState<{
    isOpen: boolean;
    title: string;
    category?: string;
    signedDate?: string;
  }>({
    isOpen: false,
    title: "",
  });

  const [selectedCert, setSelectedCert] = useState<{
    isOpen: boolean;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate: string;
    status: string;
  }>({
    isOpen: false,
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    status: "",
  });

  const [isEditAvailabilityOpen, setIsEditAvailabilityOpen] = useState(false);
  const [isAddRegionOpen, setIsAddRegionOpen] = useState(false);
  const [regions, setRegions] = useState<string[]>(["North District", "Downtown"]);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAssignPatientOpen, setIsAssignPatientOpen] = useState(false);
  const [isUploadDocumentOpen, setIsUploadDocumentOpen] = useState(false);
  const [extraDocuments, setExtraDocuments] = useState<
    Array<{ name: string; category: string; date: string; size: string }>
  >([]);

  const [isPayStubsOpen, setIsPayStubsOpen] = useState(false);
  const [isScreeningDetailsOpen, setIsScreeningDetailsOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  // Handlers
  const handleScheduleShift = (newShift: any) => {
    setCaregiver((prev) => ({
      ...prev,
      recentShifts: [newShift, ...prev.recentShifts],
    }));
    showToast(`Shift scheduled successfully for ${newShift.patientName} on ${newShift.date}!`);
  };

  const handleSendMessage = (details: { subject: string; channel: string; message: string }) => {
    showToast(`Message sent to ${caregiver.name} via ${details.channel}!`);
  };

  const handleSaveProfile = (updated: Partial<Caregiver>) => {
    setCaregiver((prev) => ({ ...prev, ...updated }));
    showToast("Caregiver profile information updated successfully!");
  };

  const handleConfirmStatusChange = (
    newStatus: "Active" | "Leave of Absence" | "Terminated",
    reasonCode: string,
    effectiveDate: string
  ) => {
    const statusMap: Record<string, string> = {
      Active: "Active",
      "Leave of Absence": "On Leave",
      Terminated: "Inactive",
    };
    const finalStatus = statusMap[newStatus] || newStatus;

    setCaregiver((prev) => ({
      ...prev,
      status: finalStatus as any,
    }));

    showToast(`Status updated to ${newStatus} (${reasonCode})`);

    if (newStatus === "Terminated") {
      setExitInterviewData({
        isOpen: true,
        reasonCode,
        effectiveDate,
      });
    }
  };

  const handleSubmitExitInterview = (data: { wouldRehire: boolean; primaryReason: string; exitNotes: string }) => {
    showToast("Exit interview notes logged successfully!");
  };

  const handleAddRegion = (name: string) => {
    if (!regions.includes(name)) {
      setRegions((prev) => [...prev, name]);
      showToast(`Added coverage region "${name}"!`);
    }
  };

  const handleAssignPatient = (patient: any) => {
    setCaregiver((prev) => ({
      ...prev,
      assignedPatientsCount: (prev.assignedPatientsCount || 0) + 1,
    }));
    showToast(`Assigned patient ${patient.name} to ${caregiver.name}!`);
  };

  const handleUploadDocument = (doc: { name: string; category: string; date: string; size: string }) => {
    setExtraDocuments((prev) => [doc, ...prev]);
    showToast(`Uploaded document "${doc.name}" successfully!`);
  };

  const handleDownloadDocument = (title: string) => {
    showToast(`Downloading "${title}"...`);
    // Simulated browser download trigger
    const link = document.createElement("a");
    link.href = "data:text/plain;charset=utf-8,Simulated%20Document%20Content";
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPayStub = (period: string) => {
    showToast(`Downloading pay stub for period ${period}...`);
  };

  const handleRunChecks = () => {
    showToast("Background checks updated & verified across Checkr & State registries!");
  };

  const handleResolveFlag = () => {
    showToast("State Nurse Aide Registry flag cleared and marked verified!");
  };

  return (
    <div className="w-full space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-sm max-w-md"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-100">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HR Banner */}
      <div className="bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold px-3.5 py-2 rounded-xl flex items-center justify-between">
        <span>HR Personnel File & Credentials View</span>
        <span className="text-[11px] text-slate-500 font-normal">Scoped HR Access Layer</span>
      </div>

      {/* Header */}
      <CaregiverHeader
        caregiver={caregiver}
        onScheduleShift={() => setIsScheduleShiftOpen(true)}
        onSendMessage={() => setIsSendMessageOpen(true)}
        onEditProfile={() => setIsEditProfileOpen(true)}
        onChangeStatus={() => setIsStatusChangeOpen(true)}
      />

      {/* Tabs */}
      <CaregiverTabs
        caregiver={caregiver}
        onRunChecks={handleRunChecks}
        onViewScreeningDetails={() => setIsScreeningDetailsOpen(true)}
        onViewDocument={(title, category, signedDate) =>
          setSelectedDoc({ isOpen: true, title, category, signedDate })
        }
        onViewCertificate={(cert) =>
          setSelectedCert({ isOpen: true, ...cert })
        }
        onTriggerToast={showToast}
        onEditAvailability={() => setIsEditAvailabilityOpen(true)}
        onAddRegion={() => setIsAddRegionOpen(true)}
        onScheduleShift={() => setIsScheduleShiftOpen(true)}
        regions={regions}
        onViewFeedback={() => setIsFeedbackOpen(true)}
        onAssignPatient={() => setIsAssignPatientOpen(true)}
        onUploadDocument={() => setIsUploadDocumentOpen(true)}
        onDownloadDocument={handleDownloadDocument}
        extraDocuments={extraDocuments}
        onViewPayStubs={() => setIsPayStubsOpen(true)}
        onDownloadPayStub={handleDownloadPayStub}
      />

      {/* All Interactive Modals */}
      <ScheduleShiftModal
        isOpen={isScheduleShiftOpen}
        onClose={() => setIsScheduleShiftOpen(false)}
        caregiverName={caregiver.name}
        onScheduleShift={handleScheduleShift}
      />

      <SendMessageModal
        isOpen={isSendMessageOpen}
        onClose={() => setIsSendMessageOpen(false)}
        caregiverName={caregiver.name}
        caregiverPhone={caregiver.phone}
        caregiverEmail={caregiver.email}
        onSendMessage={handleSendMessage}
      />

      <EditCaregiverModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        caregiver={caregiver}
        onSave={handleSaveProfile}
      />

      <StatusChangeModal
        isOpen={isStatusChangeOpen}
        onClose={() => setIsStatusChangeOpen(false)}
        caregiverName={caregiver.name}
        currentStatus={caregiver.status}
        onConfirmStatusChange={handleConfirmStatusChange}
      />

      <ExitInterviewModal
        isOpen={exitInterviewData.isOpen}
        onClose={() => setExitInterviewData((prev) => ({ ...prev, isOpen: false }))}
        caregiverName={caregiver.name}
        reasonCode={exitInterviewData.reasonCode}
        effectiveDate={exitInterviewData.effectiveDate}
        onSubmitExitInterview={handleSubmitExitInterview}
      />

      <DocumentViewerModal
        isOpen={selectedDoc.isOpen}
        onClose={() => setSelectedDoc((prev) => ({ ...prev, isOpen: false }))}
        documentTitle={selectedDoc.title}
        category={selectedDoc.category}
        signedDate={selectedDoc.signedDate}
        caregiverName={caregiver.name}
        onDownload={() => handleDownloadDocument(selectedDoc.title)}
      />

      <CertificateViewerModal
        isOpen={selectedCert.isOpen}
        onClose={() => setSelectedCert((prev) => ({ ...prev, isOpen: false }))}
        certName={selectedCert.name}
        issuer={selectedCert.issuer}
        issueDate={selectedCert.issueDate}
        expiryDate={selectedCert.expiryDate}
        status={selectedCert.status}
        caregiverName={caregiver.name}
        onDownload={() => handleDownloadDocument(selectedCert.name)}
      />

      <EditAvailabilityModal
        isOpen={isEditAvailabilityOpen}
        onClose={() => setIsEditAvailabilityOpen(false)}
        caregiverName={caregiver.name}
        onSave={() => showToast("Weekly availability grid updated successfully!")}
      />

      <AddRegionModal
        isOpen={isAddRegionOpen}
        onClose={() => setIsAddRegionOpen(false)}
        onAddRegion={handleAddRegion}
      />

      <PatientFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        caregiverName={caregiver.name}
      />

      <AssignPatientModal
        isOpen={isAssignPatientOpen}
        onClose={() => setIsAssignPatientOpen(false)}
        caregiverName={caregiver.name}
        onAssignPatient={handleAssignPatient}
      />

      <UploadDocumentModal
        isOpen={isUploadDocumentOpen}
        onClose={() => setIsUploadDocumentOpen(false)}
        caregiverName={caregiver.name}
        onUploadDocument={handleUploadDocument}
      />

      <PayStubsModal
        isOpen={isPayStubsOpen}
        onClose={() => setIsPayStubsOpen(false)}
        caregiverName={caregiver.name}
        onDownloadPayStub={handleDownloadPayStub}
      />

      <ScreeningDetailsModal
        isOpen={isScreeningDetailsOpen}
        onClose={() => setIsScreeningDetailsOpen(false)}
        caregiverName={caregiver.name}
        onResolveFlag={handleResolveFlag}
      />
    </div>
  );
}
