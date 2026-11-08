# Kaelis Voss — The Microsoft Copilot Advantage

Sales website, checkout funnel and member area for *The Microsoft Copilot Advantage*, built with Next.js 15 and Tailwind CSS.
Everyone pays in USD through **Paddle**, which acts as merchant of record (it collects sales tax and VAT and pays out to you).
Charging visitors in India in INR through **Razorpay** is built in but switched off: set `inrForIndia` in `src/lib/site.ts`.

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
| `/the-microsoft-copilot-advantage` (+ `/resources`; the free Outlook playbook in `public/free`, the other packs in Complete) | 7 |
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

## Member access

The member areas (`/copilot-advantage/members`, `/claude-advantage/members`) open only for buyers of a member product.
`src/middleware.ts` checks the signed member cookie before any member page is built, so nothing from those pages reaches
anyone else; they're sent to `/login`. Buyers get in three ways:

- **At checkout**: paying signs them in on that device for a year.
- **From the purchase email**: its member-area link works for a year, on any device.
- **From `/login`**: they enter the email they paid with and get a sign-in link valid for 15 minutes. Every confirmed
  purchase is saved to the buyer list in Upstash (`src/lib/buyers.ts`), so this needs `KV_REST_API_*` and `BREVO_API_KEY`.

Until live payment keys are set, the member areas stay open to everyone in "Preview mode" for testing.

### Paddle webhooks and the customer portal

`/api/webhooks/paddle` verifies every delivery with the Paddle SDK and the destination's signing secret, then handles
`transaction.completed` (records the purchase and sends the access email) and `customer.created` / `customer.updated`.
Paddle state is mirrored in Upstash (`src/lib/paddle-store.ts`): customers by Paddle ID, completed transactions, and each
buyer's Paddle customer ID by email. Deliveries can repeat or arrive out of order, so every write is an upsert. A handler
that fails answers 500 so Paddle retries. These records are live data: don't delete them.

Discounts made in Paddle are applied from the page address, by code or by discount ID, e.g. `/claude-advantage?discount=CODE` or `/claude-advantage?discount=dsc_…`: the checkout's own code field stays hidden. Never put a discount in the site's code, where any visitor can read it.

Members open Paddle's customer portal (receipts, invoices, payment details) from **Receipts** in the member area, which
goes to `/account`: their Paddle customer ID is looked up on the server from their signed-in email.

## Tiers and prices

Each product has three tiers: **Book** (learn), **Complete** (learn + implement: the Book plus the implementation system)
and **Pro** (build + systemize: Complete plus the advanced work systems). There is no standalone Toolkit. Two bundles sell both
products together. US visitors pay in USD and UK visitors in GBP:

| | Book | Complete | Pro |
|---|---|---|---|
| The Microsoft Copilot Advantage | $24.99 / £19.99 | $99 / £79 | $149 / £119 |
| The Claude Advantage (Book = The Claude Advantage + The Claude Operator) | $24.99 / £19.99 | $119 / £89 | $179 / £139 |
| Both systems | | $169 / £129 | $249 / £199 |

Pricing cards show the total Paddle quotes for the visitor's country (Paddle.js `PricePreview`) for every tier with a Paddle price ID, and the site's own price until it answers. Tiers, prices and which products are ready live in `src/lib/products.ts`; the words on every pricing card come from
`src/lib/offer.ts`. A tier is sold only once every product in it has `ready: true`; until then it shows as "Coming soon".
The prices shown must match Paddle's, because Paddle charges its own: give each price a GBP override for the UK.

After a purchase the buyer is offered the next tier up once, at the difference (`src/lib/funnel.ts`):

```
Book ──► Upgrade to Complete ──► Upgrade to Pro ──► Thank-you / library
```

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
[OpenNext](https://opennext.js.org/cloudflare). Cloudflare **Workers Builds** is connected to this repository and deploys
every push to `main`; other branches get preview versions. Its settings (**Workers & Pages → claude-advantage-hub →
Settings → Build**) must be:

| Setting | Value |
|---|---|
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |

`npm run deploy` deploys from your machine instead. The production site URL is set in `.env.production`.

Every other setting from `.env.example` goes in the Cloudflare dashboard (**Workers & Pages → claude-advantage-hub →
Settings → Variables and Secrets**), using **Secret** for keys and passwords. They are kept between deploys.

## Before going live

1. **Razorpay (India, only if you turn on `inrForIndia`)**: complete KYC and put your live keys in the Cloudflare dashboard (see Deploying). Add a webhook to
   `https://YOUR-DOMAIN/api/webhooks/razorpay` for the `payment.captured` event and set `RAZORPAY_WEBHOOK_SECRET`.
2. **Paddle (everywhere else)**: apply for a Paddle account and get the website approved (Paddle reviews every seller; confirm
   your products fit its policy). Then, in sandbox first and again in production:
   - **Catalog → Products**: create a one-time price for every tier, bundle and upgrade listed in `.env.example`, with a GBP
     override for the United Kingdom, and put each price ID in its `PADDLE_PRICE_*` entry under `"vars"` in `wrangler.jsonc` (price IDs aren't secret; they deploy with the code).
   - **Developer tools → Authentication**: create an API key and a client-side token (`PADDLE_API_KEY`, `PADDLE_CLIENT_TOKEN`).
   - **Developer tools → Notifications**: add a destination for `https://YOUR-DOMAIN/api/webhooks/paddle` with the
     `transaction.completed` event, and set `PADDLE_WEBHOOK_SECRET`.
   - **Checkout → Checkout settings**: set the default payment link to `https://YOUR-DOMAIN/checkout` and approve your domain.
   - Set `PADDLE_ENVIRONMENT=production` when you switch to live keys.
   Paddle requires your terms to name it as reseller; `src/app/terms/page.tsx` already does.
3. **Email**: emails go through Brevo (the same `BREVO_API_KEY` as the reader sign-ups). In Brevo, verify `kaelisvoss.com` under Senders, Domains & Dedicated IPs, then set `EMAIL_FROM` to an address on it.
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
