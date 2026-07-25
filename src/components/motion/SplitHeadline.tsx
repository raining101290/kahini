"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type SplitHeadlineTag = "h1" | "h2" | "h3" | "p";

type SplitHeadlineProps = {
  children: string;
  className?: string;
  as?: SplitHeadlineTag;
  stagger?: number;
  onComplete?: () => void;
};

export function SplitHeadline({
  children,
  className,
  as = "h2",
  stagger = 0.06,
  onComplete,
}: SplitHeadlineProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const words = children.split(" ");

  // Kept in a ref so the effect below doesn't need onComplete in its
  // dependency array — a new inline closure on every parent render
  // shouldn't re-trigger the split animation.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (reducedMotion || !container) return;

    const wordEls = container.querySelectorAll<HTMLElement>("[data-word]");

    // fromTo (not a separate set() + to()) so that context.revert() can
    // fully restore the pre-animation state. A plain gsap.set() call isn't
    // undone by revert() the way a two-state tween is — if this effect is
    // ever torn down mid-animation (e.g. the reducedMotion hook's SSR-safe
    // first read briefly lagging the real value), a bare set() would leave
    // the words permanently stuck translated off-mask.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => onCompleteRef.current?.(),
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [reducedMotion, stagger]);

  const content = words.map((word, i) => (
    <span
      key={i}
      className="mr-[0.25em] inline-block overflow-hidden pb-[0.05em] align-top last:mr-0"
    >
      <span data-word className="inline-block will-change-transform">
        {word}
      </span>
    </span>
  ));

  const headingRef = containerRef as RefObject<HTMLHeadingElement | null>;
  const paragraphRef = containerRef as RefObject<HTMLParagraphElement | null>;

  switch (as) {
    case "h1":
      return (
        <h1 ref={headingRef} className={className}>
          {content}
        </h1>
      );
    case "h3":
      return (
        <h3 ref={headingRef} className={className}>
          {content}
        </h3>
      );
    case "p":
      return (
        <p ref={paragraphRef} className={className}>
          {content}
        </p>
      );
    case "h2":
    default:
      return (
        <h2 ref={headingRef} className={className}>
          {content}
        </h2>
      );
  }
}
