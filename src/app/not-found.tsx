import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotFoundPosterColumn } from "@/components/sections/not-found-poster-column";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="bg-ink flex min-h-screen items-center overflow-hidden px-6 py-32 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-16">
        <div className="flex flex-1 flex-col gap-6">
          <p className="font-sans text-marigold text-body-sm tracking-[0.15em] uppercase">
            404
          </p>
          <h1 className="text-display-lg text-ivory max-w-lg">
            This kahini doesn&apos;t exist yet.
          </h1>
          <p className="text-body-lg text-ivory/80 max-w-md">
            The page you&apos;re looking for isn&apos;t here. Let&apos;s get
            you back to the story.
          </p>
          <Button asChild size="lg" className="w-fit">
            <Link href="/">Back home</Link>
          </Button>
        </div>

        <div className="hidden h-[70vh] shrink-0 sm:block">
          <NotFoundPosterColumn />
        </div>
      </div>
    </main>
  );
}
