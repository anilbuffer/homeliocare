import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { User, Calendar, Clock, Repeat, ChevronDown, BellRing } from "lucide-react";
import clsx from "clsx";

interface CreatePatternModalProps {
  isOpen: boolean;
  onClose: () => void;
  pattern?: {
    patientName: string;
    rule: string;
    autoBroadcast: boolean;
  } | null;
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CreatePatternModal({ isOpen, onClose, pattern }: CreatePatternModalProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [autoBroadcast, setAutoBroadcast] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("13:00");

  React.useEffect(() => {
    if (pattern) {
      setAutoBroadcast(pattern.autoBroadcast);
      setPatientName(pattern.patientName);
      
      // Basic parsing of rule like "Mon / Wed / Fri • 9:00 AM - 1:00 PM"
      const days = DAYS_OF_WEEK.filter(d => pattern.rule.includes(d));
      setSelectedDays(days.length > 0 ? days : []);
    } else {
      setAutoBroadcast(true);
      setPatientName("");
      setSelectedDays([]);
    }
  }, [pattern, isOpen]);

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const footer = (
    <>
      <button
        onClick={onClose}
        className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 bg-white hover:bg-slate-200/60 rounded-xl transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onClose}
        className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-teal hover:bg-teal-600 rounded-xl shadow-[0_4px_14px_0_rgba(13,148,136,0.39)] transition-all active:scale-95 flex items-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        {pattern ? "Save Changes" : "Generate Pattern"}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={pattern ? "Edit Recurring Pattern" : "Create Recurring Pattern"}
      description="Pattern generator creates slots tied to the patient's authorized care plan."
      icon={<div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal"><Repeat className="w-4 h-4" /></div>}
      maxWidth="xl"
      footer={footer}
    >
      <div className="space-y-4 pt-2">
        {/* Patient Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <User className="w-4 h-4 text-slate-400" /> Patient
          </label>
          <div className="relative group">
            <select 
              value={patientName} 
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all font-medium cursor-pointer"
            >
              <option value="" disabled>Select patient...</option>
              <option value="Dorothy Vance">Dorothy Vance</option>
              <option value="Frank Delaney">Frank Delaney</option>
              <option value="Arthur Pendelton">Arthur Pendelton</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Schedule Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" /> Days of Week
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={clsx(
                    "flex-1 min-w-[3rem] py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border",
                    selectedDays.includes(day)
                      ? "bg-brand-teal text-white border-brand-teal shadow-md shadow-brand-teal/20"
                      : "bg-white text-slate-600 border-slate-200 hover:border-brand-teal/30 hover:bg-brand-teal/5"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Clock className="w-4 h-4 text-slate-400" /> Start Time
            </label>
            <input
              type="time"
              defaultValue="09:00"
              className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Clock className="w-4 h-4 text-slate-400" /> End Time
            </label>
            <input
              type="time"
              defaultValue="13:00"
              className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all font-medium"
            />
          </div>
        </div>

        {/* Auto-Broadcaster Toggle */}
        <div className="pt-2">
          <div
            onClick={() => setAutoBroadcast(!autoBroadcast)}
            className={clsx(
              "flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer group",
              autoBroadcast
                ? "bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50/80"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100/50"
            )}
          >
            <div className="mt-0.5 shrink-0">
              <button
                type="button"
                role="switch"
                aria-checked={autoBroadcast}
                className={clsx(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2",
                  autoBroadcast ? "bg-emerald-500" : "bg-slate-300 group-hover:bg-slate-400"
                )}
              >
                <span
                  className={clsx(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                    autoBroadcast ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 flex flex-wrap items-center gap-2">
                Enable Unfilled Shift Auto-Broadcaster
                {autoBroadcast && (
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1.5 rounded-md uppercase tracking-wider font-semibold">
                    <BellRing className="w-3 h-3" /> Active
                  </span>
                )}
              </div>
              <div className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                If slots remain unfilled 48h before the shift, they will automatically be broadcasted to available, qualified caregivers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
