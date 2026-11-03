"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion respects the OS "reduce motion" setting site-wide. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
