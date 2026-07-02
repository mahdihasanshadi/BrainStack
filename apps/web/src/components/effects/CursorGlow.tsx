"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(finePointer && !reducedMotion);

    if (!finePointer || reducedMotion) {
      return;
    }

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen blur-3xl dark:opacity-30"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(56,147,244,0.4) 0%, rgba(239,93,74,0.15) 45%, transparent 70%)",
      }}
    />
  );
}
