#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

printf '%s\n' "Installing project dependencies..."
npm install

printf '%s\n' "Creating the static Next.js build..."
npm run build

rm -f MITOMS-PublicHTML-Build.zip
if command -v zip >/dev/null 2>&1; then
  (cd out && zip -qr ../MITOMS-PublicHTML-Build.zip .)
  printf '%s\n' "Build completed: MITOMS-PublicHTML-Build.zip"
else
  printf '%s\n' "Build completed in the out directory. Install zip or archive the contents of out manually."
fi
