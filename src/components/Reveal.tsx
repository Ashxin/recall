"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

type Props = { children: ReactNode; className?: string };

export function RevealGroup({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function LiftCard({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// whileInView="show" replaces animate="show". Motion watches the element with the browser’s IntersectionObserver, and when it scrolls into view the element moves to show.
// viewport={{ once: true, amount: 0.15 }}: once means it animates the first time only and does not replay on every scroll. amount is the fraction of the element that must be visible first. 0.15 is low on purpose, because a tall group could never reach a high fraction on a phone.
// LiftCard has two jobs. variants={fadeUp} inherits from the RevealGroup parent exactly like StaggerItem did in 1.3. whileHover={{ y: -4 }} lifts it on hover, with transition={{ type: "spring", stiffness: 300, damping: 20 }}. The variant’s own transition (the 0.5s tween) still controls the scroll reveal, and this transition prop controls the hover. So one element uses a tween for entering and a spring for reacting.
// A spring has no duration. Stiffness is how hard it pulls toward the target, and damping is how quickly it settles. Lower damping gives more bounce.