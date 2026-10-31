# Product files

Put the paid files here. They are **not** committed to git and are only served
through `/api/download/[product]` with a signed, expiring link.

Expected file names (see `src/lib/products.ts`):

| Product | File |
|---|---|
| Book | `copilot-advantage.pdf` |
| Prompt Vault | `copilot-prompt-vault.pdf` |
| Agent Blueprints | `copilot-agent-blueprints.pdf` |

Video products (Masterclass, Agent Kit) are delivered as links to hosted videos.
