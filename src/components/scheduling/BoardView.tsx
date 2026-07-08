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
    <div className="flex flex-col w-80 shrink-0">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={clsx("w-2 h-2 rounded-full", dotColor)} />
          <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
        </div>
        <div className="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full">
          {count}
        </div>
      </div>
      
      <div
        ref={setNodeRef}
        className={clsx(
          "flex-1 bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-2xl p-3 min-h-[500px] transition-all",
          isOver ? "bg-white/80 border-brand-teal/30 ring-2 ring-brand-teal/20" : ""
        )}
      >
        <SortableContext items={shifts.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} onClick={() => onShiftClick(shift)} />
          ))}
        </SortableContext>
        {shifts.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium border-2 border-dashed border-slate-200 rounded-xl">
            Drop here
          </div>
        )}
      </div>
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
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
        {COLUMNS.map((col) => {
          const colShifts = shifts.filter((s) => s.status === col.id);
          return (
            <div key={col.id} className="snap-start">
              <BoardColumn
                id={col.id}
                title={col.label}
                dotColor={col.dot}
                count={colShifts.length}
                shifts={colShifts}
                onShiftClick={onShiftClick}
              />
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeShift ? <ShiftCard shift={activeShift} onClick={() => {}} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
