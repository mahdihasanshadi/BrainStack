import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { Providers } from "@/providers/Providers";
import "@/styles/globals.css";

const displayFont = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BrainStack — Coding for the Next Generation",
  description:
    "Premium live coding education for curious kids. BrainStack builds confidence, creativity, and future-ready skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className={`${bodyFont.className} flex min-h-screen flex-col`}>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
