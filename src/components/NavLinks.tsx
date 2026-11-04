"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [{ href: "/", label: "Home" }];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6">
      {NAV_ITEMS.map(({ href, label }) => {
        const active =
          pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`text-caption transition-colors ${
                active ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* 
It is the only part of the header that is a client component, because usePathname() reads the current URL in the browser to highlight the active link. Keeping "use client" on this small piece, instead of on the whole header, is the pattern to remember: a client island. The less code you ship to the browser, the faster the page loads.
NAV_ITEMS is data, not markup. Adding a page later means adding one line. It holds only Home for now, because links to pages that don’t exist yet would 404. We’ll add Notes, Chat and Review as those phases arrive.
The active line matches the exact route, or a nested route for non-home items (so /notes/123 will highlight Notes later). The href !== "/" guard stops Home from matching every page.
aria-current="page" tells screen readers which link is the current page. undefined makes React leave the attribute out.
Link from next/link navigates without a full page reload and prefetches pages.
*/