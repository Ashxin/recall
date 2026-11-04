import { LiftCard, RevealGroup } from "@/components/Reveal";
import { StaggerItem } from "@/components/Stagger";

const FEATURES = [
  {
    title: "Ask your notes",
    body: "Questions answered from your own markdown, with citations back to the source.",
  },
  {
    title: "Get quizzed",
    body: "Questions generated from your notes and graded against a rubric.",
  },
  {
    title: "Review on schedule",
    body: "Spaced repetition brings back what you are about to forget.",
  },
  {
    title: "See the map",
    body: "An animated graph of your notes, with weak spots highlighted.",
  },
];

export function Features() {
  return (
    <section id="how" className="border-t border-border">
      <RevealGroup className="mx-auto max-w-5xl px-6 py-24">
        <StaggerItem>
          <p className="text-caption uppercase tracking-widest text-accent">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-headline">
            Your notes, put to work.
          </h2>
        </StaggerItem>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <LiftCard
              key={feature.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="font-serif text-title">{feature.title}</h3>
              <p className="mt-2 text-muted">{feature.body}</p>
            </LiftCard>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}

// Data lives in the FEATURES array and is mapped to cards, so adding a feature is one object.
// The StaggerItem for the heading and the LiftCards for the cards are all children of the RevealGroup. They don’t have to be direct children, because variant state travels through React context, so the grid div in between doesn’t break it. The whole section therefore staggers in.
// StaggerItem is reused here even though it lives in Stagger.tsx. It only declares variants, so it works under any parent that provides hidden and show.