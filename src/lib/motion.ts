import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/*
A variant is a named animation state. hidden and show are names I chose, and each maps to a set of values to animate to. Defining them once in a shared file means every component animates the same way, which is the point of an animation system.
opacity and y are what we animate. y becomes a CSS transform: translateY(...). Both are handled by the GPU compositor, so they stay smooth without forcing the browser to recompute layout. Animating width or top would force layout work every frame. That is the roadmap gate question (“why animate transform instead of width?”), so keep this example in mind.
transition describes how to get there. This one is a tween: a fixed 0.5 seconds with an easeOut curve (fast start, gentle landing). A spring has no fixed duration and is driven by physics, and we’ll use one when interaction arrives in later steps.
stagger has an empty hidden state and a show state with only a transition. It animates nothing itself. Its job is to delay each child by 0.08 seconds after the previous one (staggerChildren), starting after 0.1 seconds (delayChildren).
import type brings in the TypeScript type only, so it adds nothing to the browser bundle.
*/