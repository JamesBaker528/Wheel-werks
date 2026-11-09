# Media assets & licensing

## Shop photography — `public/media/shop/`
Taken from the existing wheelwerks.net site (owned by Wheel Werks). Mostly 400px wide — **replace with new, high-resolution photos** of the shop and finished work as soon as possible. These are the only images presented as Wheel Werks work.

## Stock — `public/media/stock/` and `public/video/` (Pexels License: free commercial use, no attribution required)
Used for atmosphere only; never captioned or presented as Wheel Werks work.

| File | Pexels source |
|---|---|
| video/hero.* (edited composite) | https://www.pexels.com/video/close-up-of-a-chrome-wheel-on-a-car-10738784/ + https://www.pexels.com/video/a-close-up-shot-of-the-car-wheel-4101726/ |
| stock/black-rim-garage.jpg | https://www.pexels.com/photo/17110820/ |
| stock/performance-wheel-red.jpg | https://www.pexels.com/photo/12499780/ |
| stock/gloss-black-wheel.jpg | https://www.pexels.com/photo/5624523/ |
| stock/black-wheel-red-caliper.jpg | https://www.pexels.com/photo/5158153/ |
| stock/bronze-wheel.jpg | https://www.pexels.com/photo/32726106/ |
| stock/spinning-wheel.jpg | https://www.pexels.com/photo/29615588/ |

Some stock photos show third-party vehicle badges (e.g. on performance cars). Swap them for shop photos if the owner prefers no badges.

## Replacing media
- Hero video: replace `public/video/hero.mp4`/`.webm`/`hero-poster.jpg` (keep ≤ ~1.5 MB, 1280×720, no audio).
- Before/after: add pairs to `beforeAfter` in `src/lib/content.ts` — the demo disappears automatically.
- Gallery: add entries to `gallery` in `src/lib/content.ts` (include true width/height).
