"use client"; //"use client"; marks this file as a client component. It needs a click handler and browser APIs (document, localStorage), and server components can’t use those. Everything else in your app stays a server component by default, which is why the directive goes only on files that need it.

import { useSyncExternalStore } from "react"; //useSyncExternalStore is the React hook for reading state that lives outside React. Here that state is the dark class on <html>. It takes three functions:

//subscribe tells React how to learn about changes. A MutationObserver watches the class attribute of <html> and calls onChange whenever it changes. The returned function is cleanup.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

//getSnapshot reads the current truth in the browser.
function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

//getServerSnapshot is what to assume when rendering on the server, where there is no document. We say false. React uses it during hydration too, then re-checks with getSnapshot, so server and browser HTML agree at first and the real value follows.
function getServerSnapshot() {
  return false;
}

//Why not useState plus useEffect? The class is the single source of truth, shared by the inline script, the toggle and CSS. A copy in React state could drift out of sync. Also, the current Next ESLint rules reject setting state inside an effect for this pattern.

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // toggle flips the class (classList.toggle("dark", next) adds or removes it by force), then saves the choice. The try/catch is there because localStorage can throw when storage is blocked.
  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage can be blocked (private mode); the toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full border border-border px-4 py-1.5 text-caption text-muted transition-colors hover:text-foreground"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  ); 
}
// aria-label gives screen readers a clear name that matches what the button will do.