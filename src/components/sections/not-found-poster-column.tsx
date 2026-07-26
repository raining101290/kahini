"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { series } from "@/content/series";

const COLUMN_ITEMS = series.slice(0, 5);

export function NotFoundPosterColumn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (reducedMotion || !el) return;

    const distance = el.scrollHeight / 2;
    const tween = gsap.to(el, {
      y: -distance,
      duration: distance / 20,
      repeat: -1,
      ease: "none",
      modifiers: {
        y: gsap.utils.unitize((y) => y % distance),
      },
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  const items = reducedMotion
    ? COLUMN_ITEMS
    : [...COLUMN_ITEMS, ...COLUMN_ITEMS];

  return (
    <div className="relative h-full w-40 overflow-hidden opacity-60 sm:w-48">
      <div
        ref={containerRef}
        className="flex flex-col gap-4 will-change-transform"
      >
        {items.map((item, i) => (
          <div
            key={`${item.slug}-${i}`}
            className="relative aspect-9/16 w-full shrink-0 overflow-hidden rounded-[4px] grayscale"
          >
            <Image
              src={item.poster}
              alt={item.title}
              width={200}
              height={356}
              sizes="(max-width: 640px) 160px, 192px"
              priority={i < 2}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
