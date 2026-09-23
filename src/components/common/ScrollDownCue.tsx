"use client";

import { ChevronDown, Download } from "lucide-react";

interface ScrollDownCueProps {
  targetId?: string;
  label?: string;
  secondaryLabel?: string;
}

export function ScrollDownCue({
  targetId = "catalogs",
  label = "Доош гүйлгэх",
}: ScrollDownCueProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        aria-label={label}
        className="group flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 hover:scale-105"
      >
        {/* Animated Mouse Scroll Indicator */}
        <div className="relative flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/60 p-1 shadow-sm backdrop-blur-sm transition-colors group-hover:border-white">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white transition-colors group-hover:bg-white" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 transition-colors group-hover:text-white">
          {label}
        </span>

        <ChevronDown size={16} className="-mt-0.5 animate-bounce text-white/75 group-hover:text-white" />
      </a>
    </div>
  );
}
