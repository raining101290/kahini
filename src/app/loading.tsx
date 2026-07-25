import { site } from "@/content/site";

export default function Loading() {
  return (
    <div className="bg-ink fixed inset-0 z-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <span
          className="font-display text-ivory text-4xl font-extrabold"
          style={{ fontStretch: "85%" }}
        >
          {site.brand}
        </span>
        <span className="bg-marigold animate-underline-pulse h-0.5 w-full origin-center" />
      </div>
    </div>
  );
}
