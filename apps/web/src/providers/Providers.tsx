"use client";

import { ThemeProvider } from "next-themes";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { MouseGradient } from "@/components/effects/MouseGradient";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { AuthProvider } from "./AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <ScrollProgress />
        <MouseGradient />
        <CursorGlow />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
