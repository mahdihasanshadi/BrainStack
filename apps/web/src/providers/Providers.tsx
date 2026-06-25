"use client";

import { ThemeProvider } from "next-themes";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { MouseGradient } from "@/components/effects/MouseGradient";
import { ScrollProgress } from "@/components/effects/ScrollProgress";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ScrollProgress />
      <MouseGradient />
      <CursorGlow />
      {children}
    </ThemeProvider>
  );
}
