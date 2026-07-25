"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/content/site";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "@/lib/lenis-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const pathname = usePathname();

  // Nav links point at homepage section anchors ("#home", "#product", ...).
  // Those only resolve on the homepage itself — from any other route they
  // need the leading "/" so Next.js navigates back to "/" first, then jumps
  // to the anchor, instead of trying (and failing) to scroll to an anchor
  // that doesn't exist on the current page.
  const resolveHref = (hash: string) =>
    pathname === "/" ? hash : `/${hash}`;

  // Background transition fires at 80px of scroll, regardless of whether
  // Lenis is driving the scroll or the browser is (reduced motion).
  useEffect(() => {
    const check = (scrollY: number) => setScrolled(scrollY > 80);

    if (lenis) {
      const onScroll = () => check(lenis.scroll);
      onScroll();
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    const onNativeScroll = () => check(window.scrollY);
    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => window.removeEventListener("scroll", onNativeScroll);
  }, [lenis]);

  // Active-section tracking. SiteNav lives in the root layout and stays
  // mounted across client-side route changes, so this must re-run whenever
  // the route changes — otherwise the triggers built for the homepage's
  // sections keep watching (now-removed) elements, and activeHref is stuck
  // showing whatever was last active before navigating away. Sections that
  // don't exist on the current page (e.g. non-home routes) are silently
  // skipped, and the reset below clears any stale highlight immediately.
  useEffect(() => {
    // Resetting local state when the route (a dependency) changes — the
    // documented reset-state-on-prop-change pattern, not the derived-state
    // case the lint guards against.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveHref(null);

    // Triggers must be created after the browser has finished laying out
    // the full page, not synchronously during this effect — at that exact
    // instant the rest of the homepage hasn't been reflowed yet (only Hero
    // has real height), so "top center"/"bottom center" resolve against a
    // collapsed layout and get stuck there: unlike other ScrollTriggers on
    // this page, these never recover on a later ScrollTrigger.refresh().
    // One rAF is enough to land after that reflow.
    let triggers: ReturnType<typeof ScrollTrigger.create>[] = [];
    const raf = requestAnimationFrame(() => {
      triggers = nav
        .map((item) => {
          const target = document.querySelector(item.href);
          if (!target) return null;
          return ScrollTrigger.create({
            trigger: target,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActiveHref(item.href);
            },
          });
        })
        .filter((trigger) => trigger !== null);
    });

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "bg-ink/85 border-plum backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={resolveHref("#home")} className={cn("shrink-0", focusRing)}>
          <Image
            src="/kahini-logo-white.png"
            alt={site.brand}
            width={260}
            height={120}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={resolveHref(item.href)}
              className={cn(
                "text-body-sm text-ivory/90 hover:text-ivory relative py-1",
                focusRing
              )}
            >
              {item.label}
              {activeHref === item.href &&
                (reducedMotion ? (
                  <span className="bg-marigold absolute inset-x-0 -bottom-1 h-0.5" />
                ) : (
                  <motion.span
                    layoutId="nav-underline"
                    className="bg-marigold absolute inset-x-0 -bottom-1 h-0.5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ))}
            </Link>
          ))}
          <Button asChild size="sm">
            <a href={site.streamUrl} target="_blank" rel="noopener noreferrer">
              Stream Now
            </a>
          </Button>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className={cn("text-ivory p-1 lg:hidden", focusRing)}
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-ink border-plum flex w-full flex-col gap-0 sm:max-w-full"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-1 flex-col justify-center gap-6 px-8">
              {nav.map((item, i) => (
                <SheetClose key={item.href} asChild>
                  <Link
                    href={resolveHref(item.href)}
                    className={cn(
                      "font-display text-display-sm text-ivory animate-in fade-in slide-in-from-right-4 fill-mode-both",
                      focusRing
                    )}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <SheetFooter>
              <Button asChild size="lg" className="w-full">
                <a
                  href={site.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stream Now
                </a>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
