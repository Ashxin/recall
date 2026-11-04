import { Stagger, StaggerItem } from "@/components/Stagger";

export default function Home() {
  return (
    <Stagger className="mx-auto max-w-2xl px-6 py-24">
      <StaggerItem>
        <p className="text-caption uppercase tracking-widest text-accent">
          Recall
        </p>
      </StaggerItem>
      <StaggerItem>
        <h1 className="mt-4 font-serif text-display text-foreground">
          Remember what you learn.
        </h1>
      </StaggerItem>
      <StaggerItem>
        <p className="mt-6 text-lead text-muted">
          A quiet place to study your own notes.
        </p>
      </StaggerItem>
      <StaggerItem>
        <div className="mt-12 rounded-xl border border-border bg-surface p-6">
          <h2 className="font-serif text-title">Spring vs tween</h2>
          <p className="mt-2 text-body">
            A note card: white surface, hairline border, no heavy shadow.
          </p>
        </div>
      </StaggerItem>
    </Stagger>
  );
}