import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ShiftCard } from "./ShiftCard";
import type { Shift, ShiftStatus } from "@/lib/scheduling/mockData";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";

const COLUMNS: { id: ShiftStatus; label: string; color: string; dot: string }[] = [
  { id: "Unfilled", label: "Unfilled", color: "border-red-200", dot: "bg-red-500" },
  { id: "Pending Confirmation", label: "Pending Confirmation", color: "border-amber-200", dot: "bg-amber-500" },
  { id: "Confirmed", label: "Confirmed", color: "border-brand-teal/30", dot: "bg-brand-teal" },
  { id: "In Progress", label: "In Progress", color: "border-blue-200", dot: "bg-blue-500" },
  { id: "Completed", label: "Completed", color: "border-emerald-200", dot: "bg-emerald-500" },
];

interface BoardColumnProps {
  id: ShiftStatus;
  title: string;
  dotColor: string;
  count: number;
  shifts: Shift[];
  onShiftClick: (shift: Shift) => void;
}

function BoardColumn({ id, title, dotColor, count, shifts, onShiftClick }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col w-[82vw] sm:w-80 max-w-[320px] shrink-0 snap-start">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={clsx("w-2 h-2 rounded-full", dotColor)} />
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{title}</h3>
        </div>
        <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-200/60">
          {count}
        </div>
      </div>

      <Card
        ref={setNodeRef}
        className={clsx(
          "flex-1 p-3 min-h-[480px] transition-all duration-200 border border-slate-200/80 shadow-[0_6px_32px_rgba(0,0,0,0.04)]",
          isOver ? "bg-teal-50/40 border-brand-teal ring-2 ring-brand-teal/20" : ""
        )}
      >
        <SortableContext items={shifts.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} onClick={() => onShiftClick(shift)} />
          ))}
        </SortableContext>
        {shifts.length === 0 && (
          <div className="h-40 flex items-center justify-center text-slate-400 text-xs font-medium border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            Drop shift here
          </div>
        )}
      </Card>
    </div>
  );
}

interface BoardViewProps {
  shifts: Shift[];
  onShiftClick: (shift: Shift) => void;
  onShiftStatusChange: (shiftId: string, newStatus: ShiftStatus) => void;
}

export function BoardView({ shifts, onShiftClick, onShiftStatusChange }: BoardViewProps) {
  const [activeShift, setActiveShift] = useState<Shift | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const shift = shifts.find((s) => s.id === active.id);
    if (shift) setActiveShift(shift);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveShift(null);

    if (!over) return;

    const activeShift = shifts.find((s) => s.id === active.id);
    if (!activeShift) return;

    // Check if dropping on another shift or a column
    let targetStatus: ShiftStatus | undefined;

    // Dropping on column directly
    if (COLUMNS.find(c => c.id === over.id)) {
      targetStatus = over.id as ShiftStatus;
    } else {
      // Dropping on a shift within a column
      const targetShift = shifts.find((s) => s.id === over.id);
      if (targetShift) targetStatus = targetShift.status;
    }

    if (targetStatus && activeShift.status !== targetStatus) {
      onShiftStatusChange(activeShift.id, targetStatus);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {COLUMNS.map((col) => {
          const colShifts = shifts.filter((s) => s.status === col.id);
          return (
            <BoardColumn
              key={col.id}
              id={col.id}
              title={col.label}
              dotColor={col.dot}
              count={colShifts.length}
              shifts={colShifts}
              onShiftClick={onShiftClick}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeShift ? <ShiftCard shift={activeShift} onClick={() => { }} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
