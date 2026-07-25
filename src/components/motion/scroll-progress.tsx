"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/lib/lenis-provider";

export function ScrollProgress() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (lenis) {
      const onScroll = () => setProgress(lenis.progress);
      onScroll();
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    const onNativeScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", onNativeScroll);
    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", onNativeScroll);
    };
  }, [lenis]);

  return (
    <div
      aria-hidden
      className="bg-marigold fixed inset-x-0 top-0 z-50 h-0.5"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
