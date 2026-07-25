import { notFound } from "next/navigation";
import { nav } from "@/content/site";

export default function NavTestPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="flex flex-col">
      {nav.map((item, i) => (
        <section
          key={item.href}
          id={item.href.slice(1)}
          className="border-plum flex h-screen flex-col items-center justify-center gap-4 border-t px-6 text-center"
        >
          <p className="font-mono text-body-sm text-marigold">
            section {i + 1} of {nav.length}
          </p>
          <h2 className="text-display-lg">{item.label}</h2>
          <p className="text-body-md text-muted max-w-md">
            Scroll past this section&apos;s center to activate its nav link.
          </p>
        </section>
      ))}
    </main>
  );
}
