# Product files

The paid files. **Never committed to git** (see `.gitignore`), and only served through
`/api/download/[product]` (the books) and `/api/files/[id]` (everything else) after the
site checks the buyer owns them.

In production the same files are read from the `kaelis-voss-files` R2 bucket under the
same paths. Upload them all with `scripts/upload-files.sh` (after `npx wrangler login`).

| Path | What | Unlocked by |
|---|---|---|
| `copilot-advantage.pdf` | The Microsoft Copilot Advantage | Copilot Book |
| `claude-advantage.pdf`, `claude-operator.pdf` | The two Claude books | Claude Book |
| `claude/…` | Claude Advantage reader bonuses; the Handbook and Command Cards are Complete only | Claude Book / Complete |
| `operator/…` | The Operator Toolkit | Claude Book |
| `copilot/…` | The six Copilot packs | Copilot Complete |

Which file belongs to which product is listed in `src/lib/files.ts`.
