# Catalog and price configuration

The catalog contains 20 products. Only iPhone 18 Pro and iPhone 18 Pro Max remain in the iPhone category. All iPhones retain the merchant-supplied `QEYDIYYATSIZ` label. Their prices and the Dyson price/stock count are unchanged.

## Merchant-supplied prices

| Product | Variant | AZN |
| --- | --- | ---: |
| iPhone 18 Pro | 256 GB | 1874 |
| iPhone 18 Pro | 512 GB | 1950 |
| iPhone 18 Pro Max | 256 GB | Unavailable |
| iPhone 18 Pro Max | 512 GB | 2179 |
| Dyson Supersonic Nural | Ceramic Pink / Rose Gold | 489 |

Dyson displays `stokda 4 ədəd qalıb`. This is the merchant’s catalog stock declaration, not an automated inventory ledger. The server enforces a maximum four units in a checkout.

## Reference prices for newly added products

No new merchant price list was supplied. New products therefore use **editable reference list prices**, not verified Azerbaijan retail prices. US reference prices are converted to AZN at the catalog’s existing 1.70 conversion assumption, then 30% is deducted in integer qepik. This conversion is not a landed-cost/tax quote. Confirm or replace these prices in `lib/catalog.ts` before enabling payments.

| Product | Listed configurations | USD reference list prices before conversion/30% |
| --- | --- | --- |
| Galaxy S25 Ultra | 256 GB / 512 GB / 1 TB | 1299.99 / 1419.99 / 1659.99 |
| Galaxy S26 Ultra | 256 GB / 512 GB / 1 TB | 1299.99 / 1499.99 / 1799.99 |
| MacBook Air 13 M5 | 16/512, 16/1 TB, 24/1 TB | 1099 / 1299 / 1499 |
| MacBook Air 15 M5 | 16/512, 16/1 TB, 24/1 TB | 1299 / 1499 / 1699 |
| MacBook Pro 14 M5 | 16/1 TB, 24/1 TB, 32/1 TB | 1699 / 1899 / 2099 |
| MacBook Pro 16 M5 Pro | 24/1 TB, 48/1 TB | 2699 / 3099 |
| Canon EOS R5 | Camera body | 3999 |
| Sony WF-1000XM4 | Black | 279.99 |
| ASUS ROG Zephyrus G16 | Regional configuration to be confirmed | 2199.99 |
| Garmin GPS smartwatch | Regional model to be confirmed | 399.99 |
| Samsung The Freestyle | White | 799.99 |
| Xbox Wireless Controller | Robot White | 64.99 |

Samsung references: [S25 Ultra buy page](https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/) and [S26 Ultra buy page](https://www.samsung.com/us/smartphones/galaxy-s26-ultra/buy/). Apple starting prices/colors: [MacBook Air M5 announcement](https://www.apple.com/newsroom/2026/03/apple-introduces-the-new-macbook-air-with-m5/) and [MacBook Pro configurations](https://www.apple.com/shop/buy-mac/macbook-pro). Higher configurations and additional products are proposed catalog list prices and require merchant confirmation; they are not claimed as a current manufacturer offer.

The retained MacBook Pro M2 uses the previous merchant catalog list price 2499 AZN with **30% off = 1749.30 AZN**. Bose QC45, Galaxy S23, AirPods Pro 2 and PlayStation 5 retain their previous 50% offers. All labels, strike-through amounts, savings and payment totals derive from the same product/variant values.

## Storage, finishes and images

S25 Ultra has seven official finishes; S26 Ultra has six. Both include 256 GB, 512 GB and 1 TB. Samsung.com-exclusive colors are included. Regional stock can vary; this catalog does not claim that Samsung’s own online exclusives are locally stocked automatically.

MacBook Air includes Sky Blue, Midnight, Starlight and Silver. Pro includes Space Black and Silver. Memory and storage are paired configurations, preventing a choice from silently retaining another configuration’s price. Every stored SKU resolves the exact configuration/finish on the server. Unknown or unavailable variants are rejected. Existing bags automatically discard removed older iPhones.

Photo provenance and the current cloud image-verification limitation are documented in `public/images/SOURCES.md`.
