#!/usr/bin/env bash
# capture.sh — deterministic screenshot harness for the hackathon submission.
# Zero install: uses the Chrome already on the machine. Retina (2x) by default.
#
#   ./capture.sh <html-file> [outdir] [frame1 frame2 ...]
#
# Convention: the page reads ?frame=NAME and renders a DELIBERATELY COMPOSED STILL
# for that name — never a mid-animation state. This is how we satisfy RULE-SHOT-1
# (every frame stands alone) and RULE-SHOT-2 (no mid-animation captures) by
# construction rather than by luck.
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME" >&2; exit 1; }

SRC="${1:?usage: capture.sh <html-file> [outdir] [frames...]}"
OUT="${2:-shots}"
shift 2 2>/dev/null || shift 1 2>/dev/null || true
FRAMES=("$@"); [ ${#FRAMES[@]} -eq 0 ] && FRAMES=(hero)

ABS="$(cd "$(dirname "$SRC")" && pwd)/$(basename "$SRC")"
mkdir -p "$OUT"

# Viewports. 1440x900 is the safe desktop default; 1200x1500 gives a taller
# editorial crop; 430x932 is a modern phone. Add/remove as the design needs.
declare -a VIEWPORTS=( "desktop:1440:900" "tall:1280:1600" "phone:430:932" )

for frame in "${FRAMES[@]}"; do
  for vp in "${VIEWPORTS[@]}"; do
    IFS=: read -r name w h <<< "$vp"
    png="$OUT/${frame}-${name}.png"
    "$CHROME" --headless --disable-gpu --hide-scrollbars \
      --force-device-scale-factor=2 \
      --window-size="${w},${h}" \
      --virtual-time-budget=2500 \
      --default-background-color=00000000 \
      --screenshot="$png" \
      "file://${ABS}?frame=${frame}" >/dev/null 2>&1
    if [ -f "$png" ]; then
      printf '  %-28s %s\n' "$(basename "$png")" "$(sips -g pixelWidth -g pixelHeight "$png" 2>/dev/null | awk '/pixel/{printf "%s ", $2}')"
    else
      echo "  FAILED: $png" >&2
    fi
  done
done
echo "→ $OUT/"
