# Claude Advantage Hub

TanStack Start app configured for [Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/).

## Requirements

- Node.js **20.19+** or **22.12+** (see `.nvmrc`)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (included as a dev dependency)

## Local development

```bash
npm install
cp .env.example .env
# Edit .env with your Supabase project values
npm run dev
```

App runs at http://localhost:8080.

### Local Cloudflare Worker (optional)

```bash
cp .dev.vars.example .dev.vars
# Edit .dev.vars with Supabase credentials
npm run cf:dev
```

## Deploy to Cloudflare

### One-time setup

1. Log in: `npx wrangler login`
2. Copy env templates and fill in Supabase values:
   ```bash
   cp .env.example .env
   cp .dev.vars.example .dev.vars
   ```
3. Set the service role secret on Cloudflare (never commit this):
   ```bash
   npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
   ```
4. Set public Worker vars used during SSR:
   ```bash
   npx wrangler vars set SUPABASE_URL "https://YOUR_PROJECT.supabase.co"
   npx wrangler vars set SUPABASE_PUBLISHABLE_KEY "your-anon-key"
   ```

### Deploy from your machine

`VITE_*` variables are embedded at **build** time. Export them before deploy (or keep them in `.env`):

```bash
export $(grep -v '^#' .env | xargs)   # macOS/Linux — loads VITE_* and SUPABASE_*
npm run deploy
```

Your app will be live at `https://claude-advantage-hub.<your-subdomain>.workers.dev` (or a custom domain you attach in the dashboard).

### Deploy via GitHub Actions

1. Create a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Workers Scripts: Edit** permission.
2. Add repository secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID` ([find it](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/))
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Push to `main` — the workflow in `.github/workflows/deploy-cloudflare.yml` builds and deploys automatically.

### Deploy via Cloudflare Workers Builds

In the Cloudflare dashboard: **Workers & Pages** → your worker → **Settings** → **Builds**:

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy --config .output/server/wrangler.json` |
| Node version | 22 |

Add the same environment variables as in the GitHub Action (build needs `VITE_*`; deploy/runtime needs `SUPABASE_*` and the service role secret).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build for Workers |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run cf:dev` | Wrangler dev (Worker + assets) |
| `npm run cf-typegen` | Generate TypeScript types for Wrangler bindings |

## Custom domains

```bash
npx wrangler domains add your-domain.com
```

Or attach a route in the [Cloudflare dashboard](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
