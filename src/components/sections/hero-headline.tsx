"use client";

import { useState } from "react";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function HeroHeadline() {
  const reducedMotion = useReducedMotion();
  const [headlineDone, setHeadlineDone] = useState(false);
  const banglaVisible = reducedMotion || headlineDone;

  return (
    <div className="flex flex-col gap-2">
      <SplitHeadline
        as="h1"
        stagger={0.06}
        className="font-display text-ivory text-[clamp(4rem,7vw,7rem)] font-extrabold"
        onComplete={() => setHeadlineDone(true)}
      >
        {hero.headline}
      </SplitHeadline>
      <p
        className={cn(
          "font-display text-ivory/60 text-[clamp(2rem,3.5vw,3.5rem)] font-extrabold transition-opacity duration-700",
          banglaVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ fontStretch: "85%" }}
      >
        {site.taglineBn}
      </p>
    </div>
  );
}
