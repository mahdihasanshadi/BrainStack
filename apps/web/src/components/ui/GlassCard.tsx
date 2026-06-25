"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  if (!hover) {
    return <div className={`glass-card ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={{ y: -6, boxShadow: "0 20px 60px -12px rgba(21, 128, 61, 0.25)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
