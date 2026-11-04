"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function DismissibleTip() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="tip"
          role="note"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-10 flex items-start justify-between gap-4 rounded-xl border border-border bg-surface p-5"
        >
          <p>
            <span className="font-serif text-lead">Tip. </span>
            Write one idea per note. Small notes link together and are easier to
            quiz yourself on.
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss tip"
            className="shrink-0 text-caption text-muted transition-colors hover:text-foreground"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// useState(true) controls whether the tip exists. {open && (...)} is plain React: when open becomes false, React removes the element instantly.
// AnimatePresence wraps the conditional. When the child disappears from its children, it keeps the old element in the DOM, plays its exit animation, and only then removes it. That is the entire job of the component.
// exit={{ opacity: 0, y: -8 }} is the leaving state. initial to animate is the entering state. All three describe the same element at different moments.
// key="tip" is how AnimatePresence tells which child came and went. It matters most when several children swap places.
// Only opacity and y animate, same compositor rule as before.
// role="note" tells assistive technology this is supplementary content. The button has an aria-label that says what it does.