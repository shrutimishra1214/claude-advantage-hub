# Product files

Put the paid files here. They are **not** committed to git and are only served
through `/api/download/[product]` with a signed, expiring link.

In production (Cloudflare Workers) the same files are read from the
`kaelis-voss-files` R2 bucket instead; see `wrangler.jsonc`.

Expected file names (see `src/lib/products.ts`):

| Product | File |
|---|---|
| Book | `copilot-advantage.pdf` |
| Prompt Vault | `copilot-prompt-vault.pdf` |
| Agent Blueprints | `copilot-agent-blueprints.pdf` |

Video products (Masterclass, Agent Kit) are delivered as links to hosted videos.
