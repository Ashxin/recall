import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";/*next/font/google downloads the fonts at build time and serves them from your own domain. Visitors’ browsers never contact Google, which is better for privacy and speed. It also means the CSP in step 1.7 won’t need to allow Google Fonts.*/
import "./globals.css";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newreader.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}//The class names on <html> attach those variables to the whole page.
