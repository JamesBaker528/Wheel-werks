/** Intrinsic sizes of local images (regenerate when replacing files). */
export const mediaSize: Record<string, [number, number]> = {
  "/media/shop/bent-wheel-on-machine.jpg": [400, 300],
  "/media/shop/custom-two-tone-wheel.jpg": [400, 300],
  "/media/shop/custom-wheel-display.jpg": [400, 300],
  "/media/shop/factory-take-off-wheels.jpg": [400, 300],
  "/media/shop/powder-coat-booth.jpg": [326, 325],
  "/media/shop/powder-coated-colors.jpg": [400, 300],
  "/media/shop/refinishing-shop.jpg": [400, 300],
  "/media/shop/showroom-wheel-wall.jpg": [800, 600],
  "/media/shop/storefront.jpg": [1600, 1200],
  "/media/shop/tire-balancing.jpg": [262, 300],
  "/media/shop/tire-storage-racks.jpg": [400, 188],
  "/media/shop/wheel-repair-detail.jpg": [400, 167],
  "/media/shop/wheel-welding.jpg": [400, 231],
  "/media/stock/black-rim-garage.jpg": [1688, 3000],
  "/media/stock/black-wheel-red-caliper-wide.jpg": [3200, 1919],
  "/media/stock/black-wheel-red-caliper.jpg": [2000, 3000],
  "/media/stock/bronze-wheel-wide.jpg": [3115, 1869],
  "/media/stock/bronze-wheel.jpg": [2000, 3000],
  "/media/stock/coating-booth.jpg": [1689, 3000],
  "/media/stock/gloss-black-wheel-wide.jpg": [3200, 1919],
  "/media/stock/gloss-black-wheel.jpg": [1688, 3000],
  "/media/stock/lime-car-mesh-wheels-wide.jpg": [1825, 1095],
  "/media/stock/lime-car-mesh-wheels.jpg": [1825, 2738],
  "/media/stock/mechanic-wheel.jpg": [3000, 2000],
  "/media/stock/performance-wheel-red-wide.jpg": [3200, 1920],
  "/media/stock/performance-wheel-red.jpg": [2000, 3000],
  "/media/stock/polished-chrome-wheel-wide.jpg": [3200, 1920],
  "/media/stock/polished-chrome-wheel.jpg": [2000, 3000],
  "/media/stock/polished-two-piece-wheel-wide.jpg": [3200, 1920],
  "/media/stock/polished-two-piece-wheel.jpg": [2000, 2500],
  "/media/stock/spinning-wheel.jpg": [2000, 3000],
  "/media/stock/spray-gun.jpg": [2000, 3000],
  "/media/stock/tig-welding-aluminum.jpg": [3000, 2000],
  "/media/stock/tire-changer-mechanic.jpg": [3000, 2000],
  "/media/stock/tire-inflation.jpg": [3000, 1997],
  "/media/stock/tire-storage-warehouse.jpg": [3000, 2000],
  "/media/stock/welder-tig.jpg": [2000, 3000],
  "/media/stock/wheel-closeup.jpg": [2000, 3000],
  "/media/stock/wheel-removal.jpg": [3000, 2000],
};

export const sizeOf = (src: string) => {
  const s = mediaSize[src];
  return s ? { w: s[0], h: s[1] } : { w: 1600, h: 1067 };
};

/** Wide desktop crop for a portrait image, if one exists (e.g. foo.jpg → foo-wide.jpg). */
export const wideOf = (src: string) => {
  const w = src.replace(/\.jpg$/, "-wide.jpg");
  return mediaSize[w] ? w : null;
};
