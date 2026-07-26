"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Lenis's own scroll physics — created once per reducedMotion state and
  // persists across client-side navigations (recreating it on every route
  // change would reset scroll momentum mid-navigation). Driven by a plain
  // rAF loop, not GSAP's ticker — Lenis doesn't need GSAP to function, only
  // the ScrollTrigger sync below does, and that's homepage-only.
  useEffect(() => {
    // When reducedMotion flips to true, the previous run's cleanup already
    // clears lenis; on first mount with reducedMotion true, state starts
    // at null already — no setState needed on this branch.
    if (reducedMotion) return;

    const instance = new Lenis({ autoRaf: false, anchors: true });
    setLenis(instance);

    let rafId = requestAnimationFrame(function loop(time) {
      instance.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  // GSAP/ScrollTrigger sync — only the homepage has ScrollTriggers to keep
  // aligned with Lenis's virtual scroll position, so GSAP is only loaded
  // there. Wired on top of the Lenis instance above independently of it,
  // so route changes attach/detach this layer without recreating Lenis
  // itself.
  useEffect(() => {
    if (!lenis || pathname !== "/") return;

    let cancelled = false;
    let onScroll: (() => void) | null = null;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      onScroll = ScrollTrigger.update;
      lenis.on("scroll", onScroll);
      gsap.ticker.lagSmoothing(0);
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelled = true;
      if (onScroll) lenis.off("scroll", onScroll);
    };
  }, [lenis, pathname]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
