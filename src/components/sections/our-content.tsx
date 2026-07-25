"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { series, type Genre, type Series } from "@/content/series";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const GENRES = [
  "All",
  "Romance",
  "Thriller",
  "Family Drama",
  "Revenge",
  "Campus",
  "Supernatural",
] as const;

type GenreFilter = (typeof GENRES)[number];

const CARD_SIZES =
  "(max-width: 768px) 45vw, (max-width: 1024px) 30vw, (max-width: 1440px) 22vw, 15vw";

type PosterCardProps = {
  item: Series;
  onOpen: (trigger: HTMLButtonElement) => void;
};

function PosterCard({ item, onOpen }: PosterCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        className="group focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink block w-full rounded-[4px] text-left outline-none"
      >
        <motion.div
          layoutId={`poster-${item.slug}`}
          className="relative aspect-9/16 overflow-hidden rounded-[4px]"
        >
          <Image
            src={item.poster}
            alt={item.title}
            width={360}
            height={640}
            sizes={CARD_SIZES}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="from-ink pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-ivory text-body-sm font-bold">{item.title}</p>
            <p
              className="font-display text-ivory/70 text-body-sm"
              style={{ fontStretch: "85%" }}
            >
              {item.titleBn}
            </p>
            <p className="font-mono text-marigold text-body-sm">
              {item.episodes} episodes
            </p>
          </div>
          <Play
            aria-hidden
            fill="currentColor"
            className="text-marigold pointer-events-none absolute top-3 right-3 size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </motion.div>
      </button>
    </motion.div>
  );
}

export function OurContent() {
  const [activeGenre, setActiveGenre] = useState<GenreFilter>("All");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  // This Dialog is controlled (no DialogTrigger), so Radix has no registered
  // element to restore focus to on close — it falls back to <body>. Track
  // whichever card button opened the dialog and restore focus to it
  // ourselves via onCloseAutoFocus.
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filtered =
    activeGenre === "All"
      ? series
      : series.filter((item) => item.genre === (activeGenre as Genre));

  const selected = series.find((item) => item.slug === selectedSlug) ?? null;

  return (
    <section id="content" className="bg-ink px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-marigold text-body-sm tracking-[0.15em] uppercase">
          Our Content
        </p>
        <h2 className="text-display-lg text-ivory mt-3 max-w-2xl">
          Stories that hook in ten seconds.
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setActiveGenre(genre)}
              className={cn(
                "focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-full border px-4 py-2 text-body-sm transition-colors outline-none",
                activeGenre === genre
                  ? "bg-alta border-alta text-ivory"
                  : "border-plum text-ivory/80 hover:border-marigold"
              )}
            >
              {genre}
            </button>
          ))}
        </div>

        <MotionConfig reducedMotion="user">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 wide:grid-cols-6!"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <PosterCard
                    key={item.slug}
                    item={item}
                    onOpen={(trigger) => {
                      triggerRef.current = trigger;
                      setSelectedSlug(item.slug);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="text-body-md text-muted mt-16 text-center">
              No series in this genre yet. New drops every week.
            </p>
          )}

          <Dialog
            open={selected !== null}
            onOpenChange={(open) => {
              if (!open) setSelectedSlug(null);
            }}
          >
            {selected && (
              <DialogContent
                className="gap-0 overflow-hidden p-0 sm:max-w-3xl"
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                  triggerRef.current?.focus();
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <motion.div
                    layoutId={`poster-${selected.slug}`}
                    className="relative aspect-9/16 sm:aspect-auto"
                  >
                    <Image
                      src={selected.poster}
                      alt={selected.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="flex flex-col gap-4 p-6">
                    <DialogTitle className="text-display-sm text-ivory">
                      {selected.title}
                    </DialogTitle>
                    <p
                      className="font-display text-ivory/70 text-body-lg -mt-2"
                      style={{ fontStretch: "85%" }}
                    >
                      {selected.titleBn}
                    </p>
                    <div className="font-mono text-marigold text-body-sm flex items-center gap-3">
                      <span>{selected.genre}</span>
                      <span aria-hidden>·</span>
                      <span>{selected.episodes} episodes</span>
                    </div>
                    <DialogDescription className="text-body-md text-ivory/80">
                      {selected.synopsis}
                    </DialogDescription>
                    <Button asChild size="lg" className="mt-auto">
                      <a
                        href={site.streamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch on Kahini Reels
                      </a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </MotionConfig>
      </div>
    </section>
  );
}
