"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ProjectGrid({
  children,
  total,
  showAllLabel,
  showLessLabel,
}: {
  children: ReactNode;
  total: number;
  showAllLabel: string;
  showLessLabel: string;
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div
        className="project-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-expanded={showAll}
      >
        {children}
      </div>
      {total > 4 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((visible) => !visible)}
            className="inline-flex items-center gap-2 bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {showAll ? showLessLabel : showAllLabel}
            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
    </>
  );
}
