import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-serif text-lead tracking-tight">
          Recall
        </Link>
        <nav aria-label="Main" className="flex items-center gap-8">
          <NavLinks />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
/*
No directive, so it is a server component. It renders on the server and imports the two client pieces, which is allowed. The reverse (a client component importing a server one) is not.
<header>, <nav aria-label="Main">, <main> and <footer> are landmarks. Screen reader users jump between them, so this is accessibility for free.
border-b border-border uses the token from 1.1: a hairline instead of a shadow.
max-w-5xl mx-auto px-6 is the content container. Header and footer share it, so their edges line up.
*/