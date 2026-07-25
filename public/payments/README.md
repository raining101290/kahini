# Payment method wordmarks

The three SVGs in this directory (`bkash.svg`, `nagad.svg`, `rocket.svg`) are
**placeholders only** — plain text-in-a-box, not the real brand marks. bKash,
Nagad, and Rocket are trademarked logos we don't have rights to reproduce, so
we didn't attempt to imitate their actual colors or logotypes.

## What the client must supply

Official wordmark/logo assets for each, ideally:

- **`bkash.svg`** — bKash logo, official brand colors
- **`nagad.svg`** — Nagad logo, official brand colors
- **`rocket.svg`** — Rocket (DBBL) logo, official brand colors

Format: SVG preferred (falls back to PNG on transparent background if SVG
isn't available). Keep the exact filenames above — they're referenced
directly by `src/content/home.ts`'s `payment.methods` list. Roughly
120×40px / 3:1 aspect ratio works best for the payment strip layout.
