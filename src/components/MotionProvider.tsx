"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// MotionConfig is a context provider. It sets defaults for every motion component beneath it, so one line covers all current and future animations. It renders no DOM element, so the flex layout on <body> is unaffected.
// reducedMotion="user" means: check the OS setting. If the user asked for reduced motion, Motion turns off transform and layout animations (x, y, scale, rotation) and keeps opacity and color changes. The idea is reduce, don’t remove: a fade is gentle, while things sliding across the screen can cause dizziness and nausea for people with vestibular disorders.
