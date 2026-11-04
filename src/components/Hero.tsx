import { Stagger, StaggerItem } from "@/components/Stagger";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="orb animate-drift-a -left-24 -top-24 h-[28rem] w-[28rem]" />
        <div className="orb animate-drift-b -right-24 top-1/4 h-[24rem] w-[24rem]" />
      </div>

      <Stagger className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <StaggerItem>
          <p className="text-caption uppercase tracking-widest text-accent">
            Recall
          </p>
        </StaggerItem>
        <StaggerItem>
          <h1 className="mt-4 font-serif text-headline text-foreground sm:text-display">
            Remember what you learn.
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-xl text-lead text-muted">
            A quiet place to study your own notes. Ask questions, get quizzed,
            and review what you are about to forget.
          </p>
        </StaggerItem>
        <StaggerItem>
          <a
            href="#how"
            className="mt-10 inline-block rounded-full border border-border bg-surface px-6 py-2.5 text-caption text-foreground transition-colors hover:border-accent"
          >
            How it works
          </a>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

// It’s a server component. Only the Stagger inside it is a client island, and the orbs are plain divs with CSS classes, so they need no JavaScript.
// relative isolate overflow-hidden on the section: isolate creates a private stacking context, so -z-10 on the background pushes it behind the hero text but not behind the whole page. overflow-hidden clips the orbs that hang off the screen edges (-left-24), which would otherwise create a horizontal scrollbar.
// aria-hidden="true" hides the decorative layer from screen readers. pointer-events-none lets clicks pass through it.
// text-headline sm:text-display is the responsive type scale: smaller on phones, large from the sm breakpoint up.
// href="#how" jumps to the section with id="how". I used an anchor link instead of a “Get started” button because the signup page doesn’t exist until Phase 3, and a dead button is worse than none.