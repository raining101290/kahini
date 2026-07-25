# Project: Kahini Marketing Site

## What this is
Customer-facing marketing site for Kahini Studios Ltd, Bangladesh's first micro-drama
OTT platform. 1–2 minute vertical drama episodes. Tk 10 to unlock a series,
Tk 50/month subscription, paid via bKash / Nagad / Rocket. Distribution runs through
creators' own social audiences, not paid ads.

This site is NOT the streaming app. It's a brand + conversion site. Primary CTA
everywhere is "Stream Now" → kahinireels.com. Secondary CTAs: creator signup,
brand partnership.

Tagline: "We are storytellers. We are KAHINI."
"Kahini" means "story" in Bangla — the name is the category.

## Audience
18–35, mobile-first, Bangladesh + ~300M Bangla speakers in diaspora.
Assume 4G on mid-range Android as the performance target.

## Stack (locked — do not substitute)
- Next.js 15 (App Router, TypeScript, `src/` dir)
- Tailwind CSS v4 (CSS-first config, `@theme` in globals.css — no tailwind.config.ts)
- shadcn/ui (Radix under the hood) — the ONLY primitives library. Do not add Base UI.
- lucide-react for icons
- motion (the framer-motion successor package) for component-level animation
- GSAP 3.13+ with ScrollTrigger for scroll choreography (free tier, no Club plugins)
- Lenis for smooth scroll, wired into GSAP's ticker

## Rules
- Server Components by default. `"use client"` only on files that need hooks,
  refs, or browser APIs. Animation wrappers are leaf clients — never mark a
  whole page as client.
- Every animation must respect `prefers-reduced-motion`. No exceptions.
- All copy in `src/content/` as typed TS objects. Never hardcode marketing copy
  inside JSX — the client will revise it.
- No `any`. No unused imports. Run `npx tsc --noEmit` before declaring done.
- Bangla text must render correctly — the font stack has to include a Bengali face. 