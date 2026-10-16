# Image sources

Downloaded through TLS-verified HTTPS on 2026-10-07. Images are served locally; the storefront does not depend on the source CDN being reachable.

| Local asset | Original source |
| --- | --- |
| `samsung.png` | [samsung_s23phone_image.png](https://cdn.jsdelivr.net/gh/GreatStackDev/QuickCart@main/assets/samsung_s23phone_image.png) |
| `macbook.png` | [macbook_image.png](https://cdn.jsdelivr.net/gh/GreatStackDev/QuickCart@main/assets/macbook_image.png) |
| `headphones.png` | [bose_headphone_image.png](https://cdn.jsdelivr.net/gh/GreatStackDev/QuickCart@main/assets/bose_headphone_image.png) |
| `playstation.png` | [playstation_image.png](https://cdn.jsdelivr.net/gh/GreatStackDev/QuickCart@main/assets/playstation_image.png) |
| `airpods.png` | [apple_earphone_image.png](https://cdn.jsdelivr.net/gh/GreatStackDev/QuickCart@main/assets/apple_earphone_image.png) |
| `macbook-header.png` | [header_macbook_image.png](https://cdn.jsdelivr.net/gh/GreatStackDev/QuickCart@main/assets/header_macbook_image.png) |
| `headphones-header.png` | [header_headphone_image.png](https://cdn.jsdelivr.net/gh/GreatStackDev/QuickCart@main/assets/header_headphone_image.png) |

These transparent PNG product images are from [GreatStackDev/QuickCart](https://github.com/GreatStackDev/QuickCart), distributed under the MIT license below. The displayed manufacturer marks belong to their respective owners. Product photography should match the merchant’s actual inventory before launch.

## Integrity records

```text
4521fe8b02df49f96ebc1fdfedeb6e7fa6c575641d448f4de387d087c2e20352  samsung.png
83d7879c6584a4a4e6fb49d9549bef19fe7c5d8db468c176571c9c19ccc866f1  macbook.png
0b67cc016da571a236b7c456e2c7c2d9fcde3442a60e65eae87aa1900a0ac4be  headphones.png
249617cac2d60f97faef7e075ef811cedd0d16e2ebdf4e41545c094c628c118c  playstation.png
61cf3ba678e53e6c20c29538cbac0de3683618a942c83dc998014c26129692c6  airpods.png
a8c84d69b4be18f25e550dff323c7fc28354b88ac237a227f3cb0e0c8c89e9cf  macbook-header.png
638a4de599eacd399e3def2f3cefba503bcb4f0c64de15d644ff47574fcdb924  headphones-header.png
```

## Source license

MIT License

Copyright (c) 2025 GreatStackDev

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense and/or sell copies of the Software and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Original manufacturer photos

Verified source pages on 2026-10-16; exact image URLs are centralized in `lib/product-photos.ts`. These are original manufacturer photos, not AI renders or recolored images. The generated iPhone and Dyson illustrations were removed. Manufacturer marks and photos remain their respective owners’ property.

| Product | Primary source |
| --- | --- |
| iPhone 18 Pro / Pro Max | https://www.apple.com/iphone-18-pro/ and https://www.apple.com/shop/buy-iphone/iphone-18-pro |
| MacBook Air M5 | https://www.apple.com/macbook-air/ |
| MacBook Pro M5 / M5 Pro | https://www.apple.com/macbook-pro/ |
| Samsung S25 Ultra | https://www.samsung.com/uk/smartphones/galaxy-s25-ultra/specs/ |
| Samsung S26 Ultra | https://www.samsung.com/uk/smartphones/galaxy-s26-ultra/specs/ |
| Dyson Supersonic Nural | https://www.dyson.com/hair-care/hair-dryers/supersonic-nural/ceramic-pink-rose-gold |
| PlayStation 5 Slim | https://www.playstation.com/en-us/ps5/ |

The Pro Max Burgundy comparison photo shows both sizes. Other finishes use Apple’s official Pro-series finish images. MacBook photos show the model family/finish rather than implying any internal configuration. The PlayStation photo is a console marketing photo; accessories pictured do not change the listed contents.

Original CDN URLs are optimized/cached by Next.js in production. The cloud allowlist currently blocks downloading the manufacturer binaries, so they are not copied into this repository. A failed network request displays an honest photo-unavailable state without blocking shopping controls. Full image-loading QA must run where these manufacturer hosts are reachable.

## Additional bundled photographs

`catalog/canon-r5.png`, `sony-earbuds.png`, `asus-g16.png`, `garmin-watch.png`, `samsung-freestyle.png`, and `xbox-controller.png` were copied from the MIT-licensed GreatStackDev/QuickCart assets, retaining the license above. They correspond to `cannon_camera_image.png`, `sony_airbuds_image.png`, `asus_laptop_image.png`, `venu_watch_image.png`, `projector_image.png`, and `md_controller_image.png`. Models were visually reviewed; no 4K claim is made for The Freestyle, and the pictured Sony earbuds are described as WF-1000XM4 rather than the source sample’s incorrect XM5 label. Unconfirmed Garmin/ASUS regional configurations are noted on their product pages.
