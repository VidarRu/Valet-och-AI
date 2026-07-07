#!/usr/bin/env python3
"""Genererar porträtt (assets/portraits/) och institutionslogotyper
(assets/logos/) via en bildmodell på OpenRouter, enligt manifestet i
tools/assets/manifest.py.

Python-portning av generate-assets.mjs för miljöer där Node.js saknas.

Körs LOKALT hos dig, aldrig i något delat verktyg — nyckeln ska bara
finnas i din egen miljövariabel.

Användning:
  export OPENROUTER_API_KEY=sk-or-v1-...
  python tools/generate_assets.py                 # genererar allt som saknas
  python tools/generate_assets.py --force          # regenererar även befintliga filer
  python tools/generate_assets.py --only=veralind  # bara en enskild post (handle)
  python tools/generate_assets.py --dry            # skriv bara ut prompterna, anropa inget
  OPENROUTER_IMAGE_MODEL=... python tools/generate_assets.py   # annan modell

Modellen måste stödja bild-utdata via OpenRouters chat/completions-endpoint
(modalities: ["image", "text"]). Kontrollera aktuellt utbud på
openrouter.ai/models (filtrera på "output: image") innan du kör — vilken
modell som är bäst/billigast ändras över tid.
"""

import base64
import io
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

sys.path.insert(0, str(Path(__file__).parent / "assets"))
from manifest import portraits, logos, media  # noqa: E402

ROOT = Path(__file__).parent.parent
DEFAULT_MODEL = "google/gemini-2.5-flash-image"

args = sys.argv[1:]


def flag(name):
    return f"--{name}" in args


def opt(name):
    prefix = f"--{name}="
    for a in args:
        if a.startswith(prefix):
            return a[len(prefix):]
    return None


DRY = flag("dry")
FORCE = flag("force")
ONLY = opt("only")
MODEL = opt("model") or os.environ.get("OPENROUTER_IMAGE_MODEL") or DEFAULT_MODEL


def generate_one(entry, kind):
    handle = entry["handle"]
    name = entry["name"]
    prompt = entry["prompt"]

    dir_ = ROOT / "assets" / ("portraits" if kind == "portrait" else "logos" if kind == "logo" else "media")
    file_ = dir_ / f"{handle}.png"

    if not FORCE and file_.exists():
        print(f"= {handle} ({name}) — finns redan, hoppar (--force för att skriva över)")
        return

    print(f"… {handle} ({name})")
    if DRY:
        print(f"  prompt: {prompt}\n")
        return

    body = json.dumps({
        "model": MODEL,
        "modalities": ["image", "text"],
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=body,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.environ.get('OPENROUTER_API_KEY', '')}",
        },
    )

    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        text = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"{handle}: OpenRouter svarade {e.code} {e.reason}\n{text[:500]}")

    images = (data.get("choices") or [{}])[0].get("message", {}).get("images")
    data_url = (images or [{}])[0].get("image_url", {}).get("url") if images else None
    if not data_url or not data_url.startswith("data:"):
        raise RuntimeError(
            f'{handle}: inget bilddata i svaret — kontrollera att modellen "{MODEL}" '
            f"faktiskt stödjer bild-utdata.\n{json.dumps(data)[:500]}"
        )

    b64 = data_url.split(",", 1)[1]
    dir_.mkdir(parents=True, exist_ok=True)
    file_.write_bytes(base64.b64decode(b64))
    print(f"  ✓ sparad: {file_.relative_to(ROOT)}")


def main():
    if not DRY and not os.environ.get("OPENROUTER_API_KEY"):
        print("Sätt OPENROUTER_API_KEY i din miljö innan du kör (se filens topp för instruktioner).", file=sys.stderr)
        sys.exit(1)

    print(f"Modell: {MODEL}{'  (torrkörning — inga anrop görs)' if DRY else ''}\n")

    jobs = [(p, "portrait") for p in portraits] + [(l, "logo") for l in logos] + [(m, "media") for m in media]
    if ONLY:
        jobs = [j for j in jobs if j[0]["handle"] == ONLY]

    if not jobs:
        print(f"Ingen post matchar --only={ONLY}", file=sys.stderr)
        sys.exit(1)

    failed = 0
    for entry, kind in jobs:
        try:
            generate_one(entry, kind)
        except Exception as e:
            failed += 1
            print(f"✗ {e}", file=sys.stderr)

    if failed:
        print(f"\n{failed} bild(er) misslyckades. Kör igen med --only=<handle> för att försöka om enskilda.", file=sys.stderr)
        sys.exit(1)
    print("\nKlart.")


if __name__ == "__main__":
    main()
