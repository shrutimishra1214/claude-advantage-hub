#!/usr/bin/env bash
# Uploads every paid file in private-files/ to the kaelis-voss-files R2 bucket,
# under the same path (the key src/lib/files.ts and src/lib/products.ts use).
# Needs `npx wrangler login` first. Safe to re-run: it overwrites with the same files.
set -euo pipefail
cd "$(dirname "$0")/../private-files"
BUCKET=kaelis-voss-files
npx wrangler r2 bucket create "$BUCKET" 2>/dev/null || true
find . -type f ! -name README.md ! -name ".*" | sed 's|^\./||' | sort | while read -r key; do
  case "$key" in *.pdf) type=application/pdf ;; *.zip) type=application/zip ;; *) type=application/octet-stream ;; esac
  echo "→ $key"
  npx wrangler r2 object put "$BUCKET/$key" --file "$key" --content-type "$type" --remote >/dev/null
done
echo "Done. Now enable the PRODUCT_FILES binding in wrangler.jsonc."
