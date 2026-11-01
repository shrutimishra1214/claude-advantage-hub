# Kaelis Voss — The Microsoft Copilot Advantage

Sales website, checkout funnel and member area for *The Microsoft Copilot Advantage*, built with Next.js 15 and Tailwind CSS.
Visitors in India pay in INR through **Razorpay**; everyone else pays in USD through **Paddle**, which acts as merchant of record
(it collects sales tax and VAT and pays out to you).

## Product lines

| Line | Sales page | Member area | Book companion (printed in the book) |
|---|---|---|---|
| The Microsoft Copilot Advantage | `/copilot-advantage` | `/copilot-advantage/members` | `/copilot-advantage/companion` |
| The Claude Advantage (+ The Claude Operator, advanced) | `/claude-advantage` | `/claude-advantage/members` | `/claude-advantage/companion`, `/claude-advantage/operator-toolkit` |

### Book reader pages (from claude-advantage-hub)

The addresses printed in the books are reader sign-up pages merged in from the `claude-advantage-hub` project. They keep
their own design and live in `src/app/(hub)`, with their components in `src/hub`:

| Page | Brevo list |
|---|---|
| `/the-claude-advantage` | 6 |
| `/the-microsoft-copilot-advantage` (+ `/resources`, the six bonus PDFs in `public/copilot-bonuses`) | 7 |
| `/mastering-Claude-AI` (+ `/resources`, the Operator toolkit in `public/operator-toolkit`) | 8 |

Sign-ups go through `/api/subscribe` and need `BREVO_API_KEY`. These pages use Tailwind v4, built separately from the main
site's Tailwind 3 so neither design leaks into the other: after changing their classes, rebuild `public/hub/hub.css` with
Node 20+:

```bash
npm --prefix tools/hub-css install && npm --prefix tools/hub-css run build
```

Each line's name, theme, navigation and tiers live in `src/lib/lines.ts`; Claude content lives in `src/lib/claude/`
(chapter, prompt and skill data were extracted from the two Claude books). Put `claude-advantage.pdf` and
`claude-operator.pdf` in `private-files/` before selling the books.

## Funnel

```
Sales page ──► Checkout (book + optional Prompt Vault order bump)
                 │
                 ▼
        Upsell 1: Masterclass ──no──► Downsell 1: Masterclass Essentials
                 │ yes                        │
                 ▼                            ▼
        Upsell 2: Agent Kit ──────no──► Downsell 2: Agent Blueprints
                 │ yes                        │
                 ▼                            ▼
                         Thank-you / library
```

Products, prices and which products are ready to sell live in `src/lib/products.ts`. USD prices shown on the site must match
the prices you create in Paddle, because Paddle charges its own price.
The order of offers lives in `src/lib/funnel.ts`. Only products with `ready: true` are sold on the live site;
until either provider uses live keys, every product is shown so the whole funnel can be tried.

## Run locally

Use Node 20 or newer (`.nvmrc` says 22).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000. `npm run preview` builds the site as a Cloudflare Worker and runs it locally on port 8787.

## Deploying

The site runs on **Cloudflare Workers** (the `claude-advantage-hub` Worker, which serves kaelisvoss.com), built with
[OpenNext](https://opennext.js.org/cloudflare). Every push to `main` deploys it through
`.github/workflows/deploy-cloudflare.yml`, which needs the `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` and
`BREVO_API_KEY` repository secrets. `npm run deploy` deploys from your machine instead.

Every other setting from `.env.example` goes in the Cloudflare dashboard (**Workers & Pages → claude-advantage-hub →
Settings → Variables and Secrets**), using **Secret** for keys and passwords. They are kept between deploys.

## Before going live

1. **Razorpay (India)**: complete KYC and put your live keys in the Cloudflare dashboard (see Deploying). Add a webhook to
   `https://YOUR-DOMAIN/api/webhooks/razorpay` for the `payment.captured` event and set `RAZORPAY_WEBHOOK_SECRET`.
2. **Paddle (everywhere else)**: apply for a Paddle account and get the website approved (Paddle reviews every seller; confirm
   your products fit its policy). Then, in sandbox first and again in production:
   - **Catalog → Products**: create the Book ($19.99), Toolkit ($79), Complete Bundle ($99) and Toolkit upgrade ($59) as one-time
     prices, and put each price ID in `PADDLE_PRICE_*`.
   - **Developer tools → Authentication**: create an API key and a client-side token (`PADDLE_API_KEY`, `PADDLE_CLIENT_TOKEN`).
   - **Developer tools → Notifications**: add a destination for `https://YOUR-DOMAIN/api/webhooks/paddle` with the
     `transaction.completed` event, and set `PADDLE_WEBHOOK_SECRET`.
   - **Checkout → Checkout settings**: set your website as the default payment link and approve your domain.
   - Set `PADDLE_ENVIRONMENT=production` when you switch to live keys.
   Paddle requires your terms to name it as reseller; `src/app/terms/page.tsx` already does.
3. **Email**: create a Resend account, verify your domain, and set `RESEND_API_KEY` and `EMAIL_FROM`.
4. **Files**: put the book PDFs in `private-files/` (see `private-files/README.md`); they are never committed. For the live
   site, upload the same files to the `kaelis-voss-files` R2 bucket and turn on the `PRODUCT_FILES` binding in `wrangler.jsonc`.
5. **Content**: replace the TODOs in `src/lib/site.ts` (contact email, refund window) and the author bio in `src/app/page.tsx`. Have the policy pages reviewed.
6. **Storage** (early reader program and members' saved prompts): create a free Redis database at
   [Upstash](https://upstash.com) and set its REST URL and token as `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Set `ADMIN_PASSWORD`, then manage spots at `/admin/early-readers`.
7. **Testimonials**: put reader videos in `public/testimonials/` and list them in `testimonials` in `src/lib/content.ts`.
   Once there are 3, the site shows them instead of the early reader program.

## Editing copy

| What | Where |
|---|---|
| Sales page copy, FAQ, testimonials, upsell headlines | `src/lib/content.ts` |
| Products and prices | `src/lib/products.ts` |
| Site name, contact email, guarantee | `src/lib/site.ts` |
| Number of early reader spots | `TOTAL_SPOTS` in `src/lib/early-readers.ts` |
