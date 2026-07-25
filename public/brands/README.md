# Client / partner logo wordmarks

The six SVGs in this directory (`brand-1.svg` through `brand-6.svg`) are
**generic placeholders** — plain text-in-a-box, not real company marks — so
the marquee has something to scroll before real logos are supplied.

## What the client must supply

Six (or more — the marquee will happily loop a longer list) logo files from
real brand partners / clients who've agreed to be featured here, ideally:

- Format: SVG preferred, transparent background (PNG acceptable as a
  fallback)
- Roughly 140×48px / ~3:1 aspect ratio works best for the marquee row
- Grayscale-friendly — the marquee desaturates every logo by default and
  only shows full color on hover, so avoid logos that rely on color to be
  legible

Keep the filenames matching `src/content/home.ts`'s `brandLogos` list (or
update that list to match whatever filenames the client sends), since the
marquee reads `logo` paths directly from there.
