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
            className="inline-flex items-center gap-2 rounded-none bg-[#0d1a46] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-primary dark:bg-white dark:text-[#070e24] dark:hover:bg-slate-200"
          >
            <span className="text-white dark:text-[#070e24] font-bold">{showAll ? showLessLabel : showAllLabel}</span>
            {showAll ? <ChevronUp size={16} className="text-white dark:text-[#070e24]" /> : <ChevronDown size={16} className="text-white dark:text-[#070e24]" />}
          </button>
        </div>
      )}
    </>
  );
}
