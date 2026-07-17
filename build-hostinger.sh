#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

rm -f MITOMS-PublicHTML-Build.zip

printf '%s\n' "Installing project dependencies..."
# npm ci --no-audit --no-fund

printf '%s\n' "Creating a clean static Next.js build..."
npm run build:hostinger

if [ ! -f out/index.html ]; then
  printf '%s\n' "Build output is incomplete: out/index.html was not created." >&2
  exit 1
fi

if command -v zip >/dev/null 2>&1; then
  printf '%s\n' "Creating Hostinger upload ZIP..."
  (cd out && zip -qr ../MITOMS-PublicHTML-Build.zip .)
  printf '%s\n' "Build completed: MITOMS-PublicHTML-Build.zip"
else
  printf '%s\n' "Build completed in the out directory. Install zip or archive the contents of out manually."
fi
