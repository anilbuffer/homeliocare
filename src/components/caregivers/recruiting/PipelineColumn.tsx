import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableApplicantCard } from './SortableApplicantCard';
import { Applicant } from './ApplicantCard';
import { Plus } from 'lucide-react';
import { toast } from "sonner";

interface PipelineColumnProps {
  id: string;
  applicants: Applicant[];
  onAddApplicant?: () => void;
  onApplicantClick?: (applicant: Applicant) => void;
}

export function PipelineColumn({ id, applicants, onAddApplicant, onApplicantClick }: PipelineColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: { type: 'Column', stage: id }
  });

  return (
    <div className="flex flex-col min-w-[320px] max-w-[320px] bg-slate-50/50 rounded-2xl border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] h-full overflow-hidden flex-shrink-0">
      {/* Column Header */}
      <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-800">{id}</h3>
          <span className="bg-slate-200 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {applicants.length}
          </span>
        </div>
        {id === "New" && (
          <button 
            onClick={onAddApplicant}
            className="p-1 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Column Content */}
      <div 
        ref={setNodeRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/80 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full min-h-[150px]"
      >
        <SortableContext items={applicants.map(a => a.id)} strategy={verticalListSortingStrategy}>
          {applicants.map((applicant) => (
            <SortableApplicantCard 
              key={applicant.id} 
              applicant={applicant} 
              onClick={() => onApplicantClick?.(applicant)}
            />
          ))}
        </SortableContext>
        
        {applicants.length === 0 && (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
            No applicants
          </div>
        )}
      </div>
    </div>
  );
}
