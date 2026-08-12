"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ProductPhone() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const phone = phoneRef.current;
    if (reducedMotion || !wrapper || !phone) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        phone,
        { rotateY: 12 },
        {
          rotateY: -6,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  // Product is well below the fold — the video (several MB) has no reason
  // to load on initial page load. Only mount the <video> element (and let
  // its request start) once the phone is actually about to scroll into
  // view, instead of eagerly autoplaying-and-fetching it from mount.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (reducedMotion || !wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const showStaticPoster = reducedMotion || videoFailed || !isNearViewport;

  return (
    <div
      ref={wrapperRef}
      className="flex justify-center py-8"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={phoneRef}
        className="border-plum bg-ink relative aspect-9/16 w-72 rounded-[48px] border-2 p-3 shadow-[0_50px_100px_-20px_rgba(240,162,2,0.2),0_20px_40px_-15px_rgba(0,0,0,0.5)] sm:w-80 lg:w-96"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Side buttons — decorative hardware detail on the frame edge. */}
        <span
          aria-hidden
          className="bg-plum absolute top-24 -left-0.75 h-8 w-0.75 rounded-l-sm"
        />
        <span
          aria-hidden
          className="bg-plum absolute top-36 -left-0.75 h-12 w-0.75 rounded-l-sm"
        />
        <span
          aria-hidden
          className="bg-plum absolute top-28 -right-0.75 h-16 w-0.75 rounded-r-sm"
        />

        <div className="bg-surface relative h-full w-full overflow-hidden rounded-4xl">
          {showStaticPoster ? (
            <Image
              src="/video/feed-poster.jpg"
              alt="Kahini Reels vertical feed"
              fill
              sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
              className="object-cover"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/video/feed-poster.jpg"
              className="h-full w-full object-cover"
              onError={() => {
                console.warn(
                  "TODO: public/video/feed-loop.mp4 is missing — see public/video/README.md. Falling back to the static poster."
                );
                setVideoFailed(true);
              }}
            >
              <source src="/video/feed-loop.mp4" type="video/mp4" />
            </video>
          )}

          {/* Glass sheen — a subtle diagonal highlight so the screen reads
              as glossy hardware rather than a flat image. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent"
          />
        </div>

        {/* Dynamic-island style notch. */}
        <div
          aria-hidden
          className="bg-ink absolute top-6 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full"
        />
      </div>
    </div>
  );
}
