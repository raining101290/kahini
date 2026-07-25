# Product showcase video

`src/components/sections/product.tsx` looks for `feed-loop.mp4` in this
directory. It isn't here yet — the component falls back to the static
`feed-poster.jpg` placeholder and logs a console warning when the video
fails to load.

## What the client must supply

- **`feed-loop.mp4`** — a silent (or audio is ignored regardless, since the
  player is always muted), looping screen recording of the vertical feed UI
  in the Kahini Reels app. Portrait orientation, matching a phone screen
  (recommend 1080×2340 or similar tall aspect ratio).
  - Format: H.264 MP4, no audio track needed
  - Length: 5–15s, designed to loop seamlessly (first and last frame should
    match)
  - Under ~5MB — this autoplays on page load for every visitor
- **`feed-poster.jpg`** — replace the placeholder with a real first-frame
  still of the video, same aspect ratio, under 200KB.
