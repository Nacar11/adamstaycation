#!/usr/bin/env bash
# Shrinks oversized source photos in public/images so next/image has small originals to resize.
# - Caps the long edge at MAX_EDGE px and re-encodes JPEGs at QUALITY (macOS `sips`, no extra deps)
# - Skips files already within limits, and never touches non-JPEG files (e.g. the .mp4)
# Usage: scripts/optimize-images.sh [dir]   (default: public/images)
set -euo pipefail

DIR="${1:-public/images}"
MAX_EDGE=2048
QUALITY=75
MAX_BYTES=$((1024 * 1024))

if ! command -v sips >/dev/null 2>&1; then
    echo "sips not found — this script needs macOS" >&2
    exit 1
fi

before=$(du -sk "$DIR" | cut -f1)
changed=0
skipped=0

while IFS= read -r -d '' file; do
    width=$(sips -g pixelWidth "$file" | awk '/pixelWidth/ {print $2}')
    height=$(sips -g pixelHeight "$file" | awk '/pixelHeight/ {print $2}')
    bytes=$(stat -f%z "$file")
    long_edge=$(( width > height ? width : height ))

    if (( long_edge <= MAX_EDGE && bytes <= MAX_BYTES )); then
        skipped=$((skipped + 1))
        continue
    fi

    tmp="${file}.tmp.jpg"
    sips -Z "$MAX_EDGE" -s format jpeg -s formatOptions "$QUALITY" "$file" --out "$tmp" >/dev/null
    mv "$tmp" "$file"
    changed=$((changed + 1))
    printf '%-60s %6s KB -> %6s KB\n' "${file#"$DIR"/}" $((bytes / 1024)) $(( $(stat -f%z "$file") / 1024 ))
done < <(find "$DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

after=$(du -sk "$DIR" | cut -f1)
echo "---"
echo "Optimized $changed file(s), skipped $skipped already-small file(s)"
echo "$DIR: $((before / 1024)) MB -> $((after / 1024)) MB"
