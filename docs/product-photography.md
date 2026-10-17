# Product photography

Product images are local, exact-model/exact-finish assets. `lib/product-photo-assets.json` is the reviewed registry; `lib/product-photos.ts` performs exact lookups. There is no runtime dependency on a manufacturer CDN and no fallback to another color, screen size, or related model. A missing photo renders a neutral, explicitly labeled unavailable state. Product availability and purchasing are independent of photo availability.

## Current coverage

All 45 exact model/finish photos are approved: eight existing cutouts and all 37 manufacturer replacements reviewed in October 2026. New assets use centered 1200 × 1200 transparent canvases and lossless WebP. All products and commercial information remain unchanged.

The M2 Space Gray source was located in Apple's [archived January 2023 purchase page](https://web.archive.org/web/20230102143619/https://www.apple.com/shop/buy-mac/macbook-pro/13-inch). That manufacturer page identifies the image as an open 13-inch MacBook Pro in Space Gray and associates it with the M2 configuration (MNEH3LL/A). The actual 1280 × 1190 transparent PNG was downloaded directly from `store.storeimages.cdn-apple.com`; no archived or third-party product image was imported. Its URL and normalized digest are in the registry. The undersized support image and opaque Newsroom scenes remain rejected.

Manufacturer downloads work in DUBAIELECS with the supported shell permission `network.enabled=true`. Preserve the inherited proxy and TLS verification. The importer follows HTTPS redirects and permits only HTTPS redirect protocols.

Reviewed manufacturer pages:

- iPhone Pro and Pro Max: Apple's iPhone purchase page, with separate size/finish packshots.
- S25 standard finishes: [Samsung UK](https://www.samsung.com/uk/smartphones/galaxy-s25-ultra/buy/). Jadegreen: [Samsung Singapore](https://www.samsung.com/sg/smartphones/galaxy-s25-ultra/buy/). Jetblack and Pinkgold: [Samsung Vietnam](https://www.samsung.com/vn/smartphones/galaxy-s25-ultra/buy/). Each gallery asset is tied to its manufacturer's color record. The 144-pixel exclusive thumbnails were rejected.
- S26: [Samsung US](https://www.samsung.com/us/smartphones/galaxy-s26-ultra/buy/), using each exact color's product record.
- MacBook Pro M2: the archived Apple purchase page above, using the exact Space Gray asset served by Apple’s CDN.
- MacBook Pro 14-inch M5 and 16-inch M5 Pro: [Apple US refurbished catalog](https://www.apple.com/shop/refurbished/mac), using separate size/finish packshots. The 14-inch source is the November 2025 M5; the 16-inch source is the June 2026 M5 Pro model.
- MacBook Air 13-inch and 15-inch M5: Apple's [Australia](https://www.apple.com/au/shop/refurbished/mac/macbook-air), [France](https://www.apple.com/fr/shop/refurbished/mac/macbook-air), and [Japan](https://www.apple.com/jp/shop/refurbished/mac/macbook-air) refurbished catalogs. Each source identifies its M5 size and finish. M4 sources and opaque purchase-page scenes were rejected.
- Dyson: the Nural Ceramic Pink / Rose Gold specifications packshot on the manufacturer's page below.
- PS5: the manufacturer's Slim Disc edition packshot with DualSense controller.
- Xbox: [Microsoft Store](https://www.microsoft.com/en-us/d/xbox-wireless-controller/8xn59crbsqgz), using a complete single Robot White controller cutout. Microsoft's current official image host, `cdn-dynmedia-1.microsoft.com`, is included in the importer.

Exact asset URLs and output hashes are in `lib/product-photo-assets.json`. Manufacturer image-server exports use `fmt=png-alpha` to retain source transparency; opaque images are rejected, never erased or recolored. Originals and normalized outputs are visually reviewed for model, size, finish, complete outlines and transparent gaps.

Manufacturer hosts supported by the importer:

- `www.apple.com`, `store.storeimages.cdn-apple.com`
- `www.samsung.com`, `images.samsung.com`
- `www.dyson.com`, `dyson-h.assetsadobe2.com`
- `www.playstation.com`, `gmedia.playstation.com`
- `cdn-dynmedia-1.microsoft.com`, `compass-ssl.xboxlive.com`

Original model pages: [Apple iPhone](https://www.apple.com/shop/buy-iphone/iphone-18-pro), [Apple Mac](https://www.apple.com/mac/), [S25 Ultra](https://www.samsung.com/uk/smartphones/galaxy-s25-ultra/), [S26 Ultra](https://www.samsung.com/uk/smartphones/galaxy-s26-ultra/), [Dyson Nural](https://www.dyson.com/hair-care/hair-dryers/supersonic-nural/ceramic-pink-rose-gold), [PlayStation 5](https://www.playstation.com/en-us/ps5/), [Xbox controller](https://www.xbox.com/accessories/controllers/xbox-wireless-controller).

## Import an exact finish

Find the real high-resolution transparent product packshot on the manufacturer's page. Each model size needs its own verified photo. Storage capacities can share a photo when the physical model and finish match.

```sh
npm run photos:download -- --product iphone-18-pro --color Burgundy --source 'EXACT_HTTPS_MANUFACTURER_IMAGE_URL'
```

This respects the configured proxy, TLS verification, and host policy. It stages the original under `work/photo-review/`, validates its image type and transparency, and leaves the public registry unchanged.

Visually inspect the staged original: verify model, screen size, finish, complete product outline, genuine transparency (including gaps), and absence of other finishes or accessories that imply different contents. Reject marketing scenes, baked backgrounds, partial outlines, and uncertain color mappings. Do not recolor an image to manufacture a missing variant.

```sh
npm run photos:approve -- --product iphone-18-pro --color Burgundy --source 'EXACT_HTTPS_MANUFACTURER_IMAGE_URL' --file work/photo-review/iphone-18-pro-burgundy.source --reviewed
npm run photos:audit -- --strict
npm test
npm run test:e2e
npm run build
```

New sources must be at least 1000 pixels on their longest side. Approval produces a 1200 × 1200 canvas with the same 85% centered subject area used by the existing 640 × 640 assets. It preserves all visible subject pixels, removes only transparent padding, fits the entire product into a consistent centered canvas, encodes lossless WebP, records a SHA-256 digest, and adds the exact mapping. It does not erase backgrounds or modify product colors. Review the normalized output as well. Rebuild the frontend after changing the registry.

`photos:audit` checks approved files, dimensions, transparency, hashes and mappings and lists every missing finish. `--strict` fails while any photo is missing: this is the photography completion gate. Browser tests cover every category and finish at desktop, tablet, and mobile sizes, test loaded local images and explicit missing-image behavior, and cover cart/favorites/checkout. They cannot certify manufacturer assets that have not yet been downloaded.

## Validation on 2026-10-17

- Strict photo audit: passed, 45 approved local assets and zero pending finishes. All 37 replacements are complete.
- Source and normalized-output visual review: passed for every replacement; high-resolution transparent originals and complete product outlines verified.
- Unit suite and TypeScript: passed, including the exact baseline comparison of all 20 products' commercial information and image integrity, padding, centering and hashes.
- Production build and `npm start`: passed.
- Browser suite against the production server: 45 passed, one intentional duplicate viewport check skipped. All categories and 45 finishes were exercised on tablet, desktop and mobile. Local image loading, failure fallback, prices, specifications, stock, storage, cart, favorites, persistence and checkout behavior passed.

Manufacturer downloads, dependency installation, build, server and browser checks used the supported shell network permission. The configured proxy and TLS verification remained enabled.
