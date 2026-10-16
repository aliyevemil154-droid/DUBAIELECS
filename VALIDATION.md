# Validation — 2026-10-16

- Node.js 24.19.0 / Next.js 16.4.0.
- TypeScript type checking passed.
- Production build (`npm run build`) passed.
- All 26 server/unit tests passed, including exact AZN minor-unit pricing, every Samsung color/storage combination, every MacBook discount, unavailable Pro Max rejection, and removed-iPhone rejection.
- 37 unique functional browser scenarios passed across desktop and mobile after targeted regression checks. They cover category/search/sale filters, variant photos' source changes, storage prices, persistent bags, checkout, paid-receipt reconciliation, real form submissions, keyboard dropdowns, focus management, stale-bag cleanup, and responsive widths of 320, 360, 390, 430, 768 and 1440 pixels.
- One mobile-only width check is intentionally skipped in the desktop project.

## Photo verification limitation

The managed cloud domain allowlist rejects Apple, Samsung, Dyson and PlayStation CDN requests even when shell network access is enabled. Official source pages and their image links were checked using web research. Original manufacturer image URLs are integrated through Next.js optimization; the image binaries could not be downloaded into the repository.

The two full photo-loading browser cases were therefore skipped in this workspace. Functional tests ran with `PHOTO_NETWORK_BLOCKED=1`, which aborts external image-optimizer requests rather than supplying fake or substitute photos. This exercises the real photo-unavailable state while checking that shopping controls remain responsive. Run the complete suite **without** this flag where manufacturer hosts are reachable before claiming full image-loading verification:

```sh
npm run test:e2e
```

No successful live payment or deployed-site image verification is claimed. New reference prices require merchant confirmation as documented in `CATALOG.md`.
