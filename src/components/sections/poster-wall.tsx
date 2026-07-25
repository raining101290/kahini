"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { series, type Series } from "@/content/series";
import { cn } from "@/lib/utils";

const COLUMN_1 = series.slice(0, 4);
const COLUMN_2 = series.slice(4, 8);
const COLUMN_3 = series.slice(8, 12);
// Only each column's top card sits above the fold before any drift/scroll —
// not the whole column — so only these three need eager loading.
const topSlugs: (string | undefined)[] = [
  COLUMN_1[0]?.slug,
  COLUMN_2[0]?.slug,
  COLUMN_3[0]?.slug,
];
const PRIORITY_SLUGS: Set<string> = new Set(
  topSlugs.filter((slug): slug is string => slug !== undefined)
);

const CARD_SIZES = "(max-width: 1024px) 40vw, 18vw";

type PosterCardProps = {
  item: Series;
  priority: boolean;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  className?: string;
};

function PosterCard({
  item,
  priority,
  dimmed,
  onHoverStart,
  onHoverEnd,
  className,
}: PosterCardProps) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={cn(
        "group relative aspect-9/16 shrink-0 overflow-hidden rounded-[4px]",
        "grayscale-[40%] brightness-75 transition-[filter,transform] duration-500 ease-out",
        "hover:z-10 hover:-translate-y-2 hover:grayscale-0 hover:brightness-100",
        dimmed && "brightness-50",
        className
      )}
    >
      <Image
        src={item.poster}
        alt={item.title}
        width={360}
        height={640}
        sizes={CARD_SIZES}
        priority={priority}
        className="h-full w-full object-cover"
      />
      <div className="from-ink/95 absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t px-3 pt-8 pb-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <p
          className="font-display text-ivory text-body-sm font-bold"
          style={{ fontStretch: "85%" }}
        >
          {item.title}
        </p>
        <p className="font-mono text-marigold text-body-sm">
          {item.episodes} episodes
        </p>
      </div>
    </div>
  );
}

type DriftListProps = {
  items: readonly Series[];
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
  cardClassName?: string;
};

function DriftList({
  items,
  containerRef,
  className,
  cardClassName,
}: DriftListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const doubled = [...items, ...items];

  return (
    <div ref={containerRef} className={cn("will-change-transform", className)}>
      {doubled.map((item, i) => (
        <PosterCard
          key={`${item.slug}-${i}`}
          item={item}
          priority={i < items.length && PRIORITY_SLUGS.has(item.slug)}
          dimmed={hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          className={cardClassName}
        />
      ))}
    </div>
  );
}

function StaticGrid() {
  const items = series.slice(0, 6);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 gap-4 px-6 lg:px-0">
      {items.map((item, i) => (
        <PosterCard
          key={item.slug}
          item={item}
          priority={PRIORITY_SLUGS.has(item.slug)}
          dimmed={hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="w-full"
        />
      ))}
    </div>
  );
}

export function PosterWall() {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(wrapperRef.current, {
        scale: 0.92,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const columns = [
        { ref: col1Ref, direction: -1 },
        { ref: col2Ref, direction: 1 },
        { ref: col3Ref, direction: -1 },
      ];

      const tweens = columns
        .map(({ ref, direction }) => {
          const el = ref.current;
          if (!el) return null;
          const distance = el.scrollHeight / 2;
          return gsap.to(el, {
            y: direction * distance,
            duration: distance / 20,
            repeat: -1,
            ease: "none",
            modifiers: {
              y: gsap.utils.unitize((y) => y % distance),
            },
          });
        })
        .filter((tween) => tween !== null);

      return () => tweens.forEach((tween) => tween.kill());
    });

    mm.add("(max-width: 1023.98px)", () => {
      const el = rowRef.current;
      if (!el) return;
      const distance = el.scrollWidth / 2;
      const tween = gsap.to(el, {
        x: -distance,
        duration: distance / 30,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize((x) => x % distance),
        },
      });
      return () => tween.kill();
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <StaticGrid />;
  }

  return (
    <div ref={wrapperRef} className="relative h-full overflow-hidden">
      <div className="from-ink pointer-events-none absolute inset-x-0 top-0 z-20 h-[120px] bg-gradient-to-b to-transparent" />
      <div className="from-ink pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120px] bg-gradient-to-t to-transparent" />

      <div className="hidden h-full grid-cols-3 gap-4 lg:grid">
        <DriftList
          items={COLUMN_1}
          containerRef={col1Ref}
          className="flex flex-col gap-4"
          cardClassName="w-full"
        />
        <DriftList
          items={COLUMN_2}
          containerRef={col2Ref}
          className="flex flex-col gap-4"
          cardClassName="w-full"
        />
        <DriftList
          items={COLUMN_3}
          containerRef={col3Ref}
          className="flex flex-col gap-4"
          cardClassName="w-full"
        />
      </div>

      <div className="h-full lg:hidden">
        <DriftList
          items={series}
          containerRef={rowRef}
          className="flex h-full w-max flex-row gap-4"
          cardClassName="w-36 sm:w-44"
        />
      </div>
    </div>
  );
}
