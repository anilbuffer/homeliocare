"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Camera,
  PenTool,
  Navigation,
  CheckCircle2,
  Mic,
  MicOff,
  UploadCloud,
  Lock,
  RefreshCw,
  X,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Visit } from "@/lib/caregiver/caregiverPortalData";

interface EndVisitModalProps {
  isOpen: boolean;
  visit: Visit;
  onClose: () => void;
  onComplete: (data: {
    notes: string;
    signatureUrl?: string;
    unableToSignReason?: string;
    photos: any[];
    mileage: number;
  }) => void;
}

export function EndVisitModal({
  isOpen,
  visit,
  onClose,
  onComplete,
}: EndVisitModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1 State: Visit Note & Pre-fill
  const completedTaskNames = visit.tasks
    .filter((t) => t.completed)
    .map((t) => t.title)
    .join(", ");

  const initialNoteText = completedTaskNames
    ? `Assisted ${visit.clientName} with: ${completedTaskNames}. Patient was in good spirits and vital signs were stable.`
    : `Completed scheduled visit for ${visit.clientName}.`;

  const [visitNote, setVisitNote] = useState(initialNoteText);
  const [isRecording, setIsRecording] = useState(false);

  // Step 2 State: Photos
  const [uploadedPhotos, setUploadedPhotos] = useState<
    { id: string; name: string; isSensitive: boolean; preview: string }[]
  >([]);
  const [isSensitivePhoto, setIsSensitivePhoto] = useState(false);

  // Step 3 State: Signature Canvas Pad & Alternate Path
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [unableToSign, setUnableToSign] = useState(false);
  const [unableReason, setUnableReason] = useState("Cognitive impairment / Dementia");

  // Step 4 State: Mileage
  const [mileage, setMileage] = useState<number>(visit.travelDistanceMiles || 4.2);

  // Step 5 State: Complete
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset or initialize signature canvas
  useEffect(() => {
    if (step === 3 && canvasRef.current && !unableToSign) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#0EA383";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, [step, unableToSign]);

  if (!isOpen) return null;

  // Signature canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasSignature(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignature = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
  };

  // Simulated Voice-to-Text
  const handleToggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setVisitNote((prev) => prev + " [Voice Note Added: Patient reported mild knee soreness; applied ice pack per care plan instructions.]");
        setIsRecording(false);
      }, 2000);
    }
  };

  // Drag & drop file simulation
  const handlePhotoUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newPhoto = {
        id: `ph-${Date.now()}`,
        name: file.name,
        isSensitive: isSensitivePhoto,
        preview: URL.createObjectURL(file),
      };
      setUploadedPhotos((prev) => [...prev, newPhoto]);
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete({
        notes: visitNote,
        signatureUrl: hasSignature ? "data:image/png;base64,mock..." : undefined,
        unableToSignReason: unableToSign ? unableReason : undefined,
        photos: uploadedPhotos,
        mileage: mileage,
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header & Progress Indicator */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-brand-teal uppercase tracking-wider">End-of-Visit Flow</span>
            <h2 className="text-lg font-bold text-gray-900">Clock Out & Verify Visit — {visit.clientName}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Tabs */}
        <div className="px-6 py-3 bg-white border-b border-gray-100 flex items-center justify-between text-xs font-semibold">
          {[
            { num: 1, label: "1. Visit Note", icon: FileText },
            { num: 2, label: "2. Photos", icon: Camera },
            { num: 3, label: "3. Signature", icon: PenTool },
            { num: 4, label: "4. Mileage", icon: Navigation },
            { num: 5, label: "5. Complete", icon: CheckCircle2 },
          ].map((s) => {
            const Icon = s.icon;
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div
                key={s.num}
                className={`flex items-center gap-1.5 ${isCurrent
                    ? "text-brand-teal font-bold"
                    : isDone
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCurrent
                      ? "bg-brand-teal text-white shadow-xs"
                      : isDone
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {isDone ? "✓" : s.num}
                </div>
                <span className="hidden md:inline">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* STEP 1: VISIT NOTE COMPOSER */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-900 block">
                  Structured Clinical & Daily Visit Note <span className="text-rose-500">*</span>
                </label>

                {/* Voice-to-Text Simulation Button */}
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${isRecording
                      ? "bg-rose-500 text-white border-rose-600 animate-pulse"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-brand-teal" />}
                  <span>{isRecording ? "Recording... (Tap to stop)" : "Voice-to-Text"}</span>
                </button>
              </div>

              <div className="p-3 bg-brand-teal/5 border border-brand-teal/20 rounded-xl text-xs text-brand-teal font-medium">
                ✨ Pre-filled auto-summary generated from completed care plan tasks. Edit or add additional notes below.
              </div>

              <textarea
                rows={5}
                value={visitNote}
                onChange={(e) => setVisitNote(e.target.value)}
                className="w-full p-3.5 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none"
              />

              {/* Quick Tags */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-gray-600">Insert Quick Observational Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Vitals within normal limits",
                    "Assisted with 20-min garden walk",
                    "Patient appetite excellent",
                    "Skin intact / no redness",
                    "Medications prompted & taken",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setVisitNote((prev) => `${prev} ${tag}.`)}
                      className="text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-2.5 py-1 rounded-lg transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PHOTO ATTACHMENT */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Visit Photos & Documentation (Optional)</h3>
                  <p className="text-xs text-gray-500">Upload wound care, meal prep, or safety hazard photos.</p>
                </div>
              </div>

              {/* Sensitive Flag Toggle */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-semibold">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Flag upload as Sensitive / PHI (Requires Supervisor Audit)</span>
                </div>
                <input
                  type="checkbox"
                  checked={isSensitivePhoto}
                  onChange={(e) => setIsSensitivePhoto(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
              </div>

              {/* Upload Zone */}
              <label className="border-2 border-dashed border-gray-300 hover:border-brand-teal rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-brand-teal/5">
                <UploadCloud className="w-10 h-10 text-brand-teal mb-2" />
                <span className="text-xs font-bold text-gray-800">Drag & Drop photo files here or click to browse</span>
                <span className="text-[11px] text-gray-400 mt-1">Supports PNG, JPG, WEBP (Desktop file picker)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUploadSim}
                  className="hidden"
                />
              </label>

              {/* Uploaded Photos Preview */}
              {uploadedPhotos.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-gray-700">Attached Photos ({uploadedPhotos.length}):</span>
                  <div className="grid grid-cols-2 gap-3">
                    {uploadedPhotos.map((p) => (
                      <div key={p.id} className="p-2 border border-slate-200 rounded-xl flex items-center gap-3 bg-white">
                        <img src={p.preview} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                          {p.isSensitive && (
                            <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.2 rounded">
                              Sensitive PHI
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: CLIENT SIGNATURE CAPTURE */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Client / Patient Signature Verification</h3>
                  <p className="text-xs text-gray-500">Confirming visit completion & service delivery.</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600 font-medium cursor-pointer flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={unableToSign}
                      onChange={(e) => setUnableToSign(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded"
                    />
                    <span>Client unable to sign</span>
                  </label>
                </div>
              </div>

              {!unableToSign ? (
                <div className="space-y-2">
                  <div className="border-2 border-gray-300 rounded-2xl bg-white p-2 relative shadow-inner">
                    <canvas
                      ref={canvasRef}
                      width={520}
                      height={180}
                      onMouseDown={startDrawing}
                      onMouseUp={stopDrawing}
                      onMouseMove={draw}
                      onTouchStart={startDrawing}
                      onTouchEnd={stopDrawing}
                      onTouchMove={draw}
                      className="w-full h-44 rounded-xl cursor-crosshair touch-none bg-gray-50/50"
                    />
                    <span className="absolute bottom-3 left-4 text-[11px] text-gray-400 font-mono pointer-events-none">
                      Sign here using mouse, trackpad, or touchscreen
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="text-xs text-gray-500 hover:text-rose-600 font-medium underline"
                    >
                      Clear Signature
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-amber-900 font-semibold">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Alternate Path: Client Unable to Sign</p>
                      <p className="text-amber-800 font-normal mt-0.5">
                        This visit will be flagged for supervisor audit while maintaining EVV billing defensibility.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Required Reason <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={unableReason}
                      onChange={(e) => setUnableReason(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white"
                    >
                      <option value="Cognitive impairment / Dementia">Cognitive impairment / Dementia</option>
                      <option value="Physical limitation / Tremor">Physical limitation / Tremor</option>
                      <option value="Client refused to sign">Client refused to sign</option>
                      <option value="Client asleep / Resting">Client asleep / Resting</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: MILEAGE ENTRY */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Billable Travel Mileage Entry</h3>
                <p className="text-xs text-gray-500">Record distance traveled between visits for payroll reimbursement.</p>
              </div>

              <div className="p-4 bg-gray-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 font-medium">Auto-Calculated Distance:</span>
                  <span className="font-mono font-bold text-gray-900">{visit.travelDistanceMiles || 4.2} miles</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Recorded Mileage (Adjust if actual route differed)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={mileage}
                      onChange={(e) => setMileage(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-teal outline-none"
                    />
                    <span className="absolute right-4 top-3 text-xs text-gray-400 font-medium">miles</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL CONFIRMATION & SYNC */}
          {step === 5 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-teal mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ready to Complete Visit</h3>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Timestamps, EVV location coordinates, care plan task completions, and signature data are ready to log.
              </p>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium max-w-md mx-auto text-left space-y-1">
                <div>• Clock-out Timestamp: <strong className="font-mono">Today, 12:30:14 PM</strong></div>
                <div>• EVV Sync Status: <strong className="text-brand-teal">Immediate Online Upload</strong></div>
                <div>• Recorded Mileage: <strong>{mileage} miles</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          {step > 1 && step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-slate-200 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev + 1) as any)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-brand-teal hover:bg-brand-teal/90 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center gap-2 transition-colors ml-auto"
            >
              {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>Complete & Submit Visit</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
