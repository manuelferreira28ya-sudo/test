#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

OUT_FILE="out/sailorpiece-walkthrough.mp4"

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Rendering video..."
npm run build

if [ ! -f "$OUT_FILE" ]; then
  echo "Expected output not found: $OUT_FILE" >&2
  exit 1
fi

echo "Uploading to transfer.sh..."
SHARE_URL="$(curl --fail --silent --show-error --upload-file "$OUT_FILE" "https://transfer.sh/sailorpiece-walkthrough.mp4")"

echo ""
echo "✅ Upload complete"
echo "Download link: $SHARE_URL"
echo ""
echo "Open this link on your phone to download/watch."
