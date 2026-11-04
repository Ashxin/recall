import type { Metadata } from "next";
import { DismissibleTip } from "@/components/DismissibleTip";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-caption uppercase tracking-widest text-accent">
        About
      </p>
      <h1 className="mt-4 font-serif text-headline">
        Built to make learning stick.
      </h1>
      <p className="mt-6 text-lead text-muted">
        Recall reads your own markdown notes, answers questions from them with
        citations, quizzes you, and schedules reviews so you remember what you
        learn.
      </p>
      <p className="mt-6">
        It is also a portfolio project, built phase by phase with security and
        tests alongside every feature.
      </p>
      <DismissibleTip />
    </div>
  );
}

// The about folder name becomes the URL /about. The page is a server component. Only DismissibleTip is a client island.
// metadata sets the browser tab title for this page.