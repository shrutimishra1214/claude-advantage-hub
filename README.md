# Kaelis Voss — The Microsoft Copilot Advantage

Sales website and checkout funnel for *The Microsoft Copilot Advantage*, built with Next.js 15, Tailwind CSS and Razorpay.

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

Products, prices (INR and USD) and which products are ready to sell live in `src/lib/products.ts`.
The order of offers lives in `src/lib/funnel.ts`. Only products with `ready: true` are sold on the live site;
with Razorpay **test** keys, every product is shown so the whole funnel can be tried.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

## Before going live

1. **Razorpay**: complete KYC, enable international payments, and put your live keys in the host's environment variables.
2. **Webhook**: in the Razorpay dashboard, add a webhook to `https://YOUR-DOMAIN/api/webhooks/razorpay` for the `payment.captured` event, and set `RAZORPAY_WEBHOOK_SECRET`.
3. **Email**: create a Resend account, verify your domain, and set `RESEND_API_KEY` and `EMAIL_FROM`.
4. **Files**: put the book PDF in `private-files/copilot-advantage.pdf` (see `private-files/README.md`). These files are never committed.
5. **Content**: replace the TODOs in `src/lib/site.ts` (contact email, refund window) and the author bio in `src/app/page.tsx`. Have the policy pages reviewed.
6. **Testimonials**: add real reader videos to `src/lib/content.ts`.

## Editing copy

| What | Where |
|---|---|
| Sales page copy, FAQ, testimonials, upsell headlines | `src/lib/content.ts` |
| Products and prices | `src/lib/products.ts` |
| Site name, contact email, guarantee | `src/lib/site.ts` |
