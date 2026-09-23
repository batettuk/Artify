"use client";

import { ReactNode } from "react";

interface ScrollToButtonProps {
  targetId: string;
  className?: string;
  children: ReactNode;
}

export function ScrollToButton({
  targetId,
  className = "",
  children,
}: ScrollToButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
