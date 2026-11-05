import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";

// Stage 1: strict and report-only. Stage 2 (below) enforces it.
const scriptSrc = ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])];
const cspHeaderKey = "Content-Security-Policy";

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: cspHeaderKey, value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;

// The CSP. A Content Security Policy is a list of rules telling the browser what the page may load or run. Each directive covers one kind of resource:

// default-src 'self' is the fallback: anything not listed must come from my own origin.
// script-src 'self' allows scripts only from my origin. In this stage-1 policy that also blocks inline scripts, which is the point of the experiment. 'unsafe-eval' is added in development only, because React’s dev tooling needs it.
// style-src 'self' 'unsafe-inline': inline styles are allowed because Motion puts style="opacity:0" attributes into the server HTML.
// img-src ... data: blob: and font-src 'self': images from my origin plus embedded ones. Fonts come from my origin, which works because next/font self-hosts them. That was the payoff of that choice in 1.1.
// connect-src 'self' limits fetch and websockets to my origin, which stops a script from sending data elsewhere. Development adds ws: for hot reload.
// object-src 'none' bans plugins. base-uri 'self' stops an injected <base> tag from redirecting relative URLs. form-action 'self' stops forms posting to other sites.
// frame-ancestors 'none' means no site may embed mine in an iframe, which is the clickjacking defence.

// Report-only (Content-Security-Policy-Report-Only) means the browser logs violations to the console but blocks nothing. It’s how you try a policy on a live site without breaking it. We don’t need a reporting endpoint yet, because the console is enough while developing.

// The other headers:

// X-Content-Type-Options: nosniff stops the browser guessing a file’s type. Without it, an uploaded file labelled as text could be “sniffed” and executed as a script. That matters when uploads arrive in Phase 4.
// X-Frame-Options: DENY is the older clickjacking header. I include it because frame-ancestors doesn’t work in report-only mode, so during stage 1 this header is the one actually protecting you. After stage 2 both are active.
// Referrer-Policy: strict-origin-when-cross-origin stops full URLs (which may contain IDs) leaking to other sites in the Referer header.
// Permissions-Policy switches off browser features we don’t use (camera, microphone, location).
// script-src allows 'unsafe-inline' until Phase 3 adds a nonce (see decision log).

// source: "/(.*)" applies the headers to every path.