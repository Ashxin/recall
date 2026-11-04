import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";/*next/font/google downloads the fonts at build time and serves them from your own domain. Visitors’ browsers never contact Google, which is better for privacy and speed. It also means the CSP in step 1.7 won’t need to allow Google Fonts.*/
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",/*variable: "--font-inter" exposes the font as a CSS variable, which globals.css then reads.*/
  display: "swap",/*display: "swap" shows fallback text immediately and swaps when the font loads. */
});

const newreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recall",
  description: "A study and interview coach over your own notes.",
};/* metadata sets the browser tab title and the page description.*/

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
// themeScript is a plain string of JavaScript. Read it as: get the saved theme; if there is none, ask the OS with prefers-color-scheme; then set the dark class on <html>. The try/catch keeps a blocked storage from breaking the page.

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newreader.variable}`}suppressHydrationWarning //suppressHydrationWarning on <html> tells React: “the class here may differ from what the server sent, so don’t warn.” It applies to that one element only, not to its children. We need it because the script changes <html>’s class before React starts.
    >
      <head> 
        <script dangerouslySetInnerHTML={{ __html: themeScript}} /> 
      </head>
      <body className="flex min-h-screen flex-col">
        <MotionProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:text-caption focus:text-foreground">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}//The class names on <html> attach those variables to the whole page.

// dangerouslySetInnerHTML is the Phase 1 danger flag from the roadmap, so it matters that you can say why it is safe here. The string is a constant that I wrote, with no user input anywhere in it. It is dangerous when it contains user-controlled text.

// The <script> sits in <head> and runs before the browser paints the body. That is the whole trick. Without it, the HTML arrives light, React loads, and only then does the dark class appear, which shows a bright flash. This is called the flash of wrong theme.

/* 
flex min-h-screen flex-col on the body plus flex-1 on <main> makes main take the leftover height, so the footer sits at the bottom even on short pages.
The skip link is invisible (sr-only) until it receives keyboard focus (focus:not-sr-only). It lets keyboard users jump past the navigation straight to the content. href="#main" targets the id="main" below.
<main> moves into the layout, so every page gets it automatically. That is why page.tsx changes main to div: a page should have only one <main>.
*/

// The other two values are "always" (always reduced, useful for testing) and "never" (ignore the setting).
// It must be a client component because the provider reads the browser’s media query. The layout stays a server component and only imports it, the same island pattern as before.
// What this changes in Recall: the fadeUp y rise stops and only the fade stays, the LiftCard hover no longer moves, and the tip’s y shift goes while its fade stays. The page-level fade in template.tsx is opacity-only, so it is unchanged.
// The orbs are a CSS animation, which Motion doesn’t control. That is why 1.4 already had the @media (prefers-reduced-motion: reduce) rule. Two systems (Motion and CSS) need two guards.