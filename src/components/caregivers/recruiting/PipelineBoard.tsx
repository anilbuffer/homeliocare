"use client";

import React, { useState } from "react";
import { ApplicantCard, Applicant } from "./ApplicantCard";
import { PipelineColumn } from "./PipelineColumn";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";

type Stage = "New" | "Interviewing" | "Background Check" | "Offer" | "Hired";

const mockApplicants: Record<Stage, Applicant[]> = {
  "New": [
    { id: "1", name: "Jessica Smith", role: "CNA", appliedDate: "2 days ago", matchScore: 92, tags: ["Dementia Care", "Bilingual"] },
    { id: "2", name: "Michael Chen", role: "HHA", appliedDate: "3 days ago", matchScore: 78, tags: ["Night Shift", "CPR Certified"] },
  ],
  "Interviewing": [
    { id: "3", name: "Sarah Jenkins", role: "RN", appliedDate: "1 week ago", matchScore: 98, tags: ["Wound Care", "IV Certified"] },
  ],
  "Background Check": [
    { id: "4", name: "David Miller", role: "CNA", appliedDate: "2 weeks ago", matchScore: 85, tags: ["Hospice", "Transfer Assistance"] },
  ],
  "Offer": [
    { id: "5", name: "Emily Davis", role: "Companion", appliedDate: "3 weeks ago", matchScore: 90, tags: ["Meal Prep", "Light Housekeeping"] },
  ],
  "Hired": []
};

export function PipelineBoard() {
  const [pipeline, setPipeline] = useState(mockApplicants);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // minimum drag distance before activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string) => {
    if (id in pipeline) {
      return id as Stage;
    }
    const container = (Object.keys(pipeline) as Stage[]).find((key) =>
      pipeline[key].some((item) => item.id === id)
    );
    return container;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId as string);
    const overContainer = findContainer(overId as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setPipeline((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);

      let newIndex;
      if (overId in prev) {
        // Dropping over a column itself (likely empty)
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== activeId),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          activeItems[activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(activeId as string);
    const overContainer = findContainer(overId as string);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      setActiveId(null);
      return;
    }

    const activeIndex = pipeline[activeContainer].findIndex(
      (item) => item.id === activeId
    );
    const overIndex = pipeline[overContainer].findIndex(
      (item) => item.id === overId
    );

    if (activeIndex !== overIndex) {
      setPipeline((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  };

  const activeApplicant = activeId 
    ? (Object.values(pipeline).flat().find(a => a.id === activeId) as Applicant) 
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6 w-full h-[calc(100vh-280px)] min-h-[500px] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
        {(Object.keys(pipeline) as Stage[]).map((stage) => (
          <PipelineColumn key={stage} id={stage} applicants={pipeline[stage]} />
        ))}
      </div>

      <DragOverlay>
        {activeApplicant ? (
          <div className="rotate-2 scale-105 shadow-xl opacity-80 cursor-grabbing">
            <ApplicantCard applicant={activeApplicant} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
