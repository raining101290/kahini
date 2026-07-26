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
        className="border-plum bg-ink relative aspect-9/19.5 w-64 rounded-[44px] border-2 p-3 shadow-2xl sm:w-72"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="bg-surface relative h-full w-full overflow-hidden rounded-4xl">
          {showStaticPoster ? (
            <Image
              src="/video/feed-poster.jpg"
              alt="Kahini Reels vertical feed"
              fill
              sizes="(max-width: 640px) 256px, 288px"
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
        </div>
      </div>
    </div>
  );
}
