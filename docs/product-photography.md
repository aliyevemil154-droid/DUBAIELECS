# Product photography

Product images are local, exact-model/exact-finish assets. `lib/product-photo-assets.json` is the reviewed registry; `lib/product-photos.ts` performs exact lookups. There is no runtime dependency on a manufacturer CDN and no fallback to another color, screen size, or related model. A missing photo renders a neutral, explicitly labeled unavailable state. Product availability and purchasing are independent of photo availability.

## Current limitation

Eight existing transparent cutouts have been inspected, centered on identical 640 × 640 canvases, and bundled as lossless WebP. The previous Apple marketing JPEGs, tiny Samsung thumbnails, mixed Pro/Pro Max mappings, PlayStation marketing scene, older MacBook photo, and cropped two-controller composite are excluded from the approved registry. **37 exact model/finish photos still require suitable replacements.** These products and all their options remain in the catalog with unchanged commercial data, and currently display a photo-unavailable state.

The cloud network policy blocks direct manufacturer downloads. Do not substitute guessed URLs, unrelated models, recolored photos, or use another service to bypass the restriction. Add these hosts to the cloud environment's network allowlist:

- `www.apple.com`, `store.storeimages.cdn-apple.com`
- `www.samsung.com`, `images.samsung.com`
- `www.dyson.com`, `dyson-h.assetsadobe2.com`
- `www.playstation.com`, `gmedia.playstation.com`
- `compass-ssl.xboxlive.com` for a complete, single Robot White Xbox controller packshot

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

## Validation on 2026-10-16

- Production build and `npm start`: passed.
- TypeScript and 30 unit tests: passed, including an exact baseline comparison of all 20 products' names, specifications, prices, storage options, colors, availability, and stock.
- Production browser suite: 45 passed, one intentional duplicate viewport check skipped. All eight categories and 45 finishes were exercised in both cards and detail dialogs at 390, 820, and 1440 pixel viewport widths. Existing compact viewport checks also cover 320, 360, 430, and 768 pixels. Shopping, favorites, filters, currency menus, storage selection, persistence, and checkout behavior passed.
- Approved local photo audit: eight assets passed transparency, padding, centering, dimensions, unique mappings, and integrity checks.
- Photography completion gate: **not passed — 37 exact model/finish photos are missing**. A direct Dyson download returned HTTP 403 from the cloud network policy. No missing manufacturer photo is claimed as visually verified.
