# Kaelis Voss — The Microsoft Copilot Advantage

Sales website, checkout funnel and member area for *The Microsoft Copilot Advantage*, built with Next.js 15 and Tailwind CSS.
Visitors in India pay in INR through **Razorpay**; everyone else pays in USD through **Paddle**, which acts as merchant of record
(it collects sales tax and VAT and pays out to you).

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

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

## Before going live

1. **Razorpay (India)**: complete KYC and put your live keys in the host's environment variables. Add a webhook to
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
4. **Files**: put the book PDF in `private-files/copilot-advantage.pdf` (see `private-files/README.md`). These files are never committed.
5. **Content**: replace the TODOs in `src/lib/site.ts` (contact email, refund window) and the author bio in `src/app/page.tsx`. Have the policy pages reviewed.
6. **Early reader program** (`/early-readers`): in Vercel, open **Storage → Create → Upstash Redis** and connect it to the project
   (this fills in `KV_REST_API_URL` and `KV_REST_API_TOKEN`). Set `ADMIN_PASSWORD`, then manage spots at `/admin/early-readers`.
7. **Testimonials**: put reader videos in `public/testimonials/` and list them in `testimonials` in `src/lib/content.ts`.
   Once there are 3, the site shows them instead of the early reader program.

## Editing copy

| What | Where |
|---|---|
| Sales page copy, FAQ, testimonials, upsell headlines | `src/lib/content.ts` |
| Products and prices | `src/lib/products.ts` |
| Site name, contact email, guarantee | `src/lib/site.ts` |
| Number of early reader spots | `TOTAL_SPOTS` in `src/lib/early-readers.ts` |
