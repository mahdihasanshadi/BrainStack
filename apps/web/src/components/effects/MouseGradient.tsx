"use client";

import { useEffect } from "react";

export function MouseGradient() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${event.clientX}px`,
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${event.clientY}px`,
      );
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="mouse-gradient pointer-events-none fixed inset-0 z-0"
    />
  );
}
