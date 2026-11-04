"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

type Props = { children: ReactNode; className?: string };

export function Stagger({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: Props) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}


/*
"use client" is needed because Motion uses browser state and effects.
motion.div is a normal <div> that understands animation props.
initial="hidden" animate="show" on the parent says “start in hidden, then move to show”. The labels are strings that refer to the keys in the variants object.
The children have no initial or animate. They only have variants={fadeUp}. Motion passes the parent’s current state down, so each child automatically goes hidden to show, and the parent’s staggerChildren spaces them out. This inheritance is the whole idea of variants.
page.tsx stays a server component and imports the client pieces, the same island pattern as the header.
*/