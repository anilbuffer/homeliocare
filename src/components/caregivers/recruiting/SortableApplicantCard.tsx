import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ApplicantCard, Applicant } from './ApplicantCard';

interface SortableApplicantCardProps {
  applicant: Applicant;
}

export function SortableApplicantCard({ applicant }: SortableApplicantCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: applicant.id, data: { type: 'Applicant', applicant } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={isDragging ? 'z-50' : ''}>
      <ApplicantCard applicant={applicant} />
    </div>
  );
}
