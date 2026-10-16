# Netlify frontend + Render backend

Use the same source repository on both platforms. Node.js **24** is required. Never deploy `.env.local`, `.data`, or `node_modules`.

## 1. Deploy the backend on Render

Create a **Node Web Service**, or use the included `render.yaml` Blueprint.

| Setting | Value |
| --- | --- |
| Root directory | Repository root (the directory containing `package.json`) |
| Build command | `npm install` |
| Start command | `npm start` |
| Health check | `/api/health` |
| Node version | `24` |

Set `BACKEND_ONLY=1`, `NODE_ENV=production`, and `APP_URL=https://YOUR-SITE.netlify.app` (replace with the actual Netlify domain; no trailing slash). Render provides `PORT` automatically. The API starts directly; no Next.js build is needed on Render.

Attach a private persistent disk at `/var/data` and set:

```dotenv
ORDERS_DB_PATH=/var/data/orders.sqlite
ENGAGEMENT_DB_PATH=/var/data/engagement.sqlite
```

The included Blueprint uses one Starter instance and a 1 GB disk. These are paid Render resources. An always-on service avoids free-service sleep/cold-start delays. SQLite requires one backend instance; do not scale to independent instances without migrating to a shared database. The Dyson stock label is merchant-supplied catalog stock, not a live inventory/reservation system.

Open `https://YOUR-API.onrender.com/api/health`: it should return `{"status":"ok"}`. Keep the actual backend origin for the next step.

## 2. Deploy the frontend on Netlify

Import the same repository. The included `netlify.toml` sets:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `24` |

Use Netlify's automatic **Next.js runtime**; do not upload `.next` manually as a static site. Set this environment variable **before building**:

```dotenv
BACKEND_URL=https://YOUR-API.onrender.com
```

Use the actual HTTPS Render origin without a path or trailing slash. Do **not** set `BACKEND_ONLY=1` on Netlify. Do not put payment secrets on Netlify: they belong on Render. A build-time `beforeFiles` rewrite forwards `/api/*` to Render while the browser keeps using the Netlify origin. This includes webhook requests if sent to the frontend. Rebuild Netlify whenever `BACKEND_URL` changes.

Finish by setting Render's `APP_URL` to the final public frontend origin, including a custom domain if used. Checkout redirects and origin checks use that value. Preview domains are not automatically authorized to submit forms against the production backend.

## 3. Optional payment configuration

Payments stay unavailable until a supported merchant payment account is configured. The prepared Stripe adapter needs these **Render-only secrets**:

```dotenv
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=<provider-issued key>
STRIPE_WEBHOOK_SECRET=<provider-issued webhook secret>
APP_URL=https://YOUR-SITE.netlify.app
```

Create the Stripe webhook at `https://YOUR-API.onrender.com/api/webhooks/stripe`, subscribed to `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Confirm account eligibility and AZN support. Use test keys first. The application never marks a payment paid without provider verification. Customer inquiries and newsletter submissions are stored in SQLite, not emailed.

## Local commands

```sh
npm install
npm run dev
```

For a local split deployment, run the API in one terminal:

```sh
BACKEND_ONLY=1 APP_URL=http://localhost:3000 npm start
```

Then run the frontend in another terminal:

```sh
BACKEND_URL=http://localhost:10000 npm run dev
```

The assignments above use POSIX shell syntax; on Windows set these variables through PowerShell `$env:NAME='value'` before running the command. For a single-server production run, leave `BACKEND_ONLY` and `BACKEND_URL` unset, run `npm run build`, then `npm start`.

## Verification before public launch

Run `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e` (requires Chromium). Check color selection, storage pricing, persisted bag selections, contact and newsletter submissions at the deployed Netlify domain. Test the unavailable Pro Max 256 GB option. Review business policies and replace illustrative artwork with actual inventory photos if required. The images are local SVG/PNG files and the font is bundled locally.

Catalog prices: iPhone 18 Pro 256 GB **1,874 AZN**, 512 GB **1,950 AZN**; Pro Max 256 GB **unavailable**, 512 GB **2,179 AZN**; Dyson Supersonic Nural **489 AZN**, stock label **stokda 4 ədəd qalıb**. All iPhones carry **QEYDIYYATSIZ**. Existing six products are discounted by exactly 50% from their former catalog prices, including fractional AZN. Burgundy, Glacier, Silver, and Black follow [Apple's official Pro lineup announcement](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/). The initial “iPhone 18” request is presented as **iPhone 18 Pro** following the clarified Pro/Pro Max lineup request.
