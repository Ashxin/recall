"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// A layout stays mounted when you navigate between its pages, so its state and DOM persist. A template looks the same but creates a fresh instance on every navigation. That remount is what we use: a new motion.div mounts each time, so initial runs to animate again.
// Only the page area fades. The header and footer live in the layout, which persists, so they don’t flicker.
// I animate only opacity here, with no slide. The home hero already staggers its own pieces, and a page-level slide on top would be a double animation.
// Trade-off: the server HTML renders at opacity: 0, so the page area is invisible until JavaScript hydrates. The 0.3 seconds is short, but it is a cost. Remounting also means any state inside a page resets on navigation, which a layout would have kept.

