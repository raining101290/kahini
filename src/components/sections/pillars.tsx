"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { pillars } from "@/content/home";

export function Pillars() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    const bg = bgRef.current;
    if (!pin || !track || !rail || !bg) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const ink = rootStyle.getPropertyValue("--color-ink").trim();
    const plum = rootStyle.getPropertyValue("--color-plum").trim();
    const bgColors = [ink, plum, ink, plum];

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const panelCount = pillars.length;
        const segments = panelCount - 1;

        gsap.set(bg, { backgroundColor: bgColors[0] });
        copyRefs.current.forEach((el, i) => {
          if (el && i > 0) gsap.set(el, { opacity: 0, y: 24 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            // ScrollTrigger's offset parser has no "vh" unit support — it
            // silently truncates "400vh" to the number 400 (px). "%" in an
            // end offset is relative to the scroller's own size (viewport
            // height for the default window scroller), so this is the
            // actual 400-viewport-heights the spec calls for.
            end: "+=400%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });

        tl.to(track, { x: `-${segments * 100}vw`, duration: segments }, 0);
        tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: segments }, 0);

        pillars.forEach((_, i) => {
          const copyEl = copyRefs.current[i];
          if (!copyEl) return;

          // Fade in completes exactly as this panel arrives (t = i), and
          // fade out starts right there — both windows share the same
          // "arrives at t = i" anchor as the background transition below,
          // so nothing straddles the moment a panel is sampled as active.
          if (i > 0) {
            tl.fromTo(
              copyEl,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.4 },
              i - 0.4
            );
          }
          if (i < panelCount - 1) {
            tl.to(copyEl, { opacity: 0, y: -24, duration: 0.4 }, i);
          }
        });

        // Background transitions complete exactly as each panel arrives,
        // rather than straddling the arrival point.
        for (let i = 1; i < panelCount; i++) {
          tl.to(bg, { backgroundColor: bgColors[i], duration: 0.4 }, i - 0.4);
        }

        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="pillars">
      {/* Desktop pinned horizontal sequence — only when motion is not reduced */}
      <div
        ref={pinRef}
        className="relative hidden h-screen overflow-hidden lg:motion-safe:block"
      >
        <div ref={bgRef} className="absolute inset-0" />
        <div
          ref={trackRef}
          className="relative flex h-full will-change-transform"
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className="relative flex h-full w-screen shrink-0 items-center px-6 lg:px-16"
            >
              <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-8">
                <div className="flex justify-end">
                  <span
                    aria-hidden
                    className="font-mono text-marigold pointer-events-none leading-none select-none"
                    style={{ fontSize: "18rem" }}
                  >
                    {pillar.number}
                  </span>
                </div>
                <div
                  ref={(el) => {
                    copyRefs.current[i] = el;
                  }}
                  className="relative z-10 -ml-24 flex max-w-md flex-col gap-4"
                >
                  <h3 className="text-display-lg text-ivory">
                    {pillar.title}
                  </h3>
                  <p className="text-body-lg text-ivory/80">{pillar.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          ref={railRef}
          className="bg-marigold absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0"
        />
      </div>

      {/* Mobile, or reduced motion regardless of viewport: stacked */}
      <div className="bg-ink block px-6 py-24 lg:motion-safe:hidden lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          {pillars.map((pillar) => (
            <Reveal key={pillar.number} y={24}>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-marigold text-body-lg font-bold">
                  {pillar.number}
                </span>
                <h3 className="text-display-sm text-ivory">{pillar.title}</h3>
                <p className="text-body-md text-ivory/80">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
