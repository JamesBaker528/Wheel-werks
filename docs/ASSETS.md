# Media assets & licensing

## Shop photography — `public/media/shop/`
From the existing wheelwerks.net site (owned by Wheel Werks). Only `storefront.jpg` (1600px) and `showroom-wheel-wall.jpg` (800px) are still used. The other files here are the old site's 400px photos; they were replaced on the site by high-resolution stock and are kept only for reference. **New high-resolution shop photos are the top asset request** — real work should replace the stock imagery on service pages over time.

## Customer rides — `public/media/rides/`
76 photos from the "Customer Rides" album on the old site (/About/Photo-Gallery/ID/54, owned by Wheel Werks). Listed in `src/lib/rides.ts`; shown in the animated showcase on the homepage and /gallery. To add one, drop the file in that folder and append `{ src, w, h }`. The album's 14 lowest-resolution photos (480×270) were left out.

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
| stock/mechanic-wheel.jpg | https://www.pexels.com/photo/8986177/ |
| stock/tig-welding-aluminum.jpg | https://www.pexels.com/photo/36522037/ |
| stock/welder-tig.jpg | https://www.pexels.com/photo/9729626/ |
| stock/wheel-removal.jpg | https://www.pexels.com/photo/3806249/ |
| stock/polished-chrome-wheel.jpg | https://www.pexels.com/photo/13914067/ |
| stock/spray-gun.jpg | https://www.pexels.com/photo/6870314/ |
| stock/coating-booth.jpg | https://www.pexels.com/photo/28628031/ |
| stock/polished-two-piece-wheel.jpg | https://www.pexels.com/photo/20595068/ |
| stock/lime-car-mesh-wheels.jpg | https://www.pexels.com/photo/5236129/ |
| stock/wheel-closeup.jpg | https://www.pexels.com/photo/7787703/ |
| stock/tire-changer-mechanic.jpg | https://www.pexels.com/photo/6870311/ |
| stock/tire-storage-warehouse.jpg | https://www.pexels.com/photo/3806252/ |
| stock/tire-inflation.jpg | https://www.pexels.com/photo/3807450/ |

Some stock photos show third-party vehicle badges (e.g. on performance cars). Swap them for shop photos if the owner prefers no badges.

## Replacing media
- Hero video: replace `public/video/hero.mp4`/`.webm`/`hero-poster.jpg` (keep ≤ ~1.5 MB, 1280×720, no audio).
- Before/after: add pairs to `beforeAfter` in `src/lib/content.ts` — the demo disappears automatically.
- Gallery: add entries to `gallery` in `src/lib/content.ts` (include true width/height).
