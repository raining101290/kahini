"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. Lower is faster. */
  speed?: number;
  direction?: "left" | "right";
};

export function Marquee({
  children,
  className,
  speed = 30,
  direction = "left",
}: MarqueeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={cn("flex gap-8 overflow-x-auto", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("group flex overflow-hidden", className)}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="animate-marquee flex shrink-0 gap-8 group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
