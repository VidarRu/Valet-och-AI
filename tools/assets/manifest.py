# Manifest för AI-genererat bildmaterial: porträtt för namngivna, återkommande
# personer + logotyper för institutioner som förekommer i spelet.
#
# Python-portning av manifest.mjs (samma innehåll, ord för ord) — används av
# tools/generate_assets.py i miljöer där Node.js saknas.
#
# AVSIKTLIGT UTESLUTNA: alla konton som i handlingen ÄR anonyma eller bara
# dyker upp en gång som "folkmassa" (t.ex. "Anonym Källa", "inte_en_bot_lol",
# "Anonym förälder", krypto-uppdragsgivaren). De ska förbli den illustrerade
# ikonen i renderaren — att ge dem ett riktigt ansikte motverkar poängen med
# att de är dolda avsändare. Se MEMORY.md / render.js för den logiken.
#
# Varje post genererar EN bild. `handle` styr utdatafilnamnet
# (assets/portraits/<handle>.png eller assets/logos/<handle>.png).

PORTRAIT_STYLE = (
    "Editorial social-media profile photo, shot like an ordinary phone or "
    "webcam portrait rather than a polished studio ad. Natural, slightly "
    "imperfect lighting, neutral muted background, realistic but not "
    "hyperreal or airbrushed — should read as a real person's account photo, "
    "not a red-carpet headshot. Square crop, subject centered, shoulders up. "
    "The person is entirely fictional, from the fictional Nordic country of "
    "Nordmark — do not depict any real, identifiable public figure. "
    "No text, no watermark, no logos in frame."
)

LOGO_STYLE = (
    "Minimal flat vector logotype/emblem, designed to read clearly at a tiny "
    "circular avatar size (2.5rem). Two or three colors max, no photographic "
    "or 3D elements, no gradients besides a subtle flat one, plenty of "
    "negative space. Fictional institution in the fictional Nordic country "
    "of Nordmark. No watermark."
)

portraits = [
    {
        "handle": "veralind",
        "name": "Vera Lind",
        "prompt": f"{PORTRAIT_STYLE} Subject: a centrist reform political candidate in her mid-40s, warm and approachable, slight confident smile, business-casual blazer, no tie/no party pin, warm neutral-grey backdrop.",
    },
    {
        "handle": "nadiaholm",
        "name": "Nadia Holm",
        "prompt": f"{PORTRAIT_STYLE} Subject: an investigative fact-checker in her late 30s, calm and methodical expression, simple collared shirt, plain cool-grey backdrop — the look of someone who checks primary sources for a living.",
    },
    {
        "handle": "prof_hane",
        "name": "Idris Hane",
        "prompt": f"{PORTRAIT_STYLE} Subject: a university professor in his early 60s who researches air quality, kind and unhurried expression, greying hair, cardigan over a shirt, soft academic office backdrop with an out-of-focus bookshelf.",
    },
    {
        "handle": "moaek",
        "name": "Moa Ek",
        "prompt": f"{PORTRAIT_STYLE} Subject: a 19-year-old first-time-voter volunteer, energetic and unguarded, casual hoodie, bright natural daylight, framed a little candidly like a selfie rather than a posed shot.",
    },
    {
        "handle": "micke_pendlare",
        "name": "Micke",
        "prompt": f"{PORTRAIT_STYLE} Subject: an ordinary commuter in his mid-30s, tired-but-friendly everyday look, casual jacket, blurry transit-platform-ish backdrop, deliberately un-posed phone-camera feel.",
    },
    {
        "handle": "lena_rostar",
        "name": "Lena",
        "prompt": f"{PORTRAIT_STYLE} Subject: a worried voter in her mid-50s, sincere and slightly anxious expression, plain cardigan, plain home backdrop, ordinary snapshot style.",
    },
    {
        "handle": "sjo_bjorkstad",
        "name": "Familjen Sjö",
        "prompt": f"{PORTRAIT_STYLE} Subject: a family of four posed together (two parents in their late 30s, two young kids) for a warm, slightly posed family account photo, cozy living-room backdrop.",
    },
    {
        "handle": "camilla_bstad",
        "name": "Camilla",
        "prompt": f"{PORTRAIT_STYLE} Subject: a mother of two in her early 30s, warm and trusting expression, casual home cardigan, soft indoor light — the parent-group-member look.",
    },
    {
        "handle": "admin_sara_bstad",
        "name": "Sara (Admin)",
        "prompt": f"{PORTRAIT_STYLE} Subject: a Facebook-group admin in her 40s, friendly and organized-looking, glasses, cozy kitchen backdrop — the trusted community-moderator look.",
    },
    {
        "handle": "anna_minns",
        "name": "Anna",
        "prompt": f"{PORTRAIT_STYLE} Subject: a former university student in her early 20s, earnest and a little uneasy expression, casual sweater, plain backdrop.",
    },
    {
        "handle": "bjorn_undrar",
        "name": "Björn, 58",
        "prompt": f"{PORTRAIT_STYLE} Subject: a man in his late 50s, worried and weathered expression, flannel shirt, plain indoor backdrop — an economically anxious everyman.",
    },
]

# Bakgrundsbilder till de fabricerade medieblocken i flödet (bildsmed/
# memesmed/dokumentsmedjan/djupbild/ansiktsvav). `handle` matchar exakt den
# identifierare som render.js härleder ur scenariots `tool`-sträng
# (--scen=/--tema=/--typ=+--amne=/--projekt=/ansiktsvav-prefixet), så en ny
# bild dyker upp automatiskt så fort filen finns — ingen extra koppling
# behövs i koden.
IMAGE_STYLE = (
    "Documentary-style synthetic photograph used as AI-generated disinformation "
    "bait — engineered to look emotionally manipulative but read as a plausible "
    "real photo. Muted cinematic color grading, shallow depth of field, no text, "
    "no watermark, no real identifiable people. Fictional Nordic town of Nordmark."
)

MEME_STYLE = (
    "Background photo for a mocking political meme image. High-contrast, "
    "slightly oversaturated flash-photo look, single clear focal object, no "
    "baked-in text (text is overlaid separately), no watermark. Fictional "
    "Nordic context."
)

DOC_STYLE = (
    "Fabricated screenshot of a leaked email thread in a plain, generic email "
    "client interface. Muted realistic UI chrome, sender/subject fields "
    "visible but body text kept illegibly small/blurred, one attachment icon. "
    "No real logos, no real people, no watermark. Fictional Nordic context."
)

VIDEO_STYLE = (
    "Single still frame from a fabricated documentary-style video. Ominous "
    "muted color grading, subtle scanline/interlace texture, cinematic "
    "widescreen composition, no on-screen text, no real identifiable people. "
    "Fictional Nordic context."
)

DEEPFAKE_STYLE = (
    "Single still frame suggesting a corrupted, glitching deepfake video: a "
    "blurred, anonymized human silhouette mid-speech with subtle digital scan-"
    "line artifacts banding across the face, dark moody background. No "
    "legible text, no real identifiable person. Fictional Nordic context."
)

media = [
    {
        "handle": "img_eget-kvarter",
        "name": "BildSmed – eget kvarter (emotion, val a)",
        "prompt": f"{IMAGE_STYLE} Scene: a dusk residential street in visible decay, shuttered/empty shopfronts, one flickering broken streetlamp, wet pavement reflecting cold light, nobody in frame.",
    },
    {
        "handle": "img_ode-hallplats",
        "name": "BildSmed – öde hållplats (emotion, val b)",
        "prompt": f"{IMAGE_STYLE} Scene: an abandoned bus stop at night, a single distant lonely silhouette waiting under a weak light, empty street beyond, cold blue tones.",
    },
    {
        "handle": "meme_naivt-hopp",
        "name": "MemeSmed – tom plånbok (trolling, val b)",
        "prompt": f"{MEME_STYLE} Scene: a single worn, empty leather wallet lying open on a plain table, harsh flash-photo lighting, slightly mocking/deflating visual tone.",
    },
    {
        "handle": "doc_epost_finansiering",
        "name": "Dokumentsmedjan – läckt mejltråd (discredit, val a)",
        "prompt": f"{DOC_STYLE} Highlighted subject line implies hidden funding of a fact-checking outlet.",
    },
    {
        "handle": "vid_ovissa-rosten",
        "name": "DjupBild Studio – dokumentärstillbild (conspiracy, val a)",
        "prompt": f"{VIDEO_STYLE} Scene: a dim interview-style room with a single empty chair lit by a harsh spotlight, heavy shadows, an ominous documentary-title feel.",
    },
    {
        "handle": "vid_ansiktsvav",
        "name": "AnsiktsVäv – deepfake-stillbild (impersonation, val a)",
        "prompt": DEEPFAKE_STYLE,
    },
]

logos = [
    {
        "handle": "nordmark_nytt",
        "name": "Nordmarks Nyheter",
        "prompt": f"{LOGO_STYLE} A serious national news outlet: bold condensed sans-serif wordmark, deep navy blue, small newspaper-masthead feel.",
    },
    {
        "handle": "faktakollen",
        "name": "Faktakollen",
        "prompt": f'{LOGO_STYLE} A fact-checking outlet: the word "Fakta" in a plain weight next to "kollen" in a heavier weight, single blue accent, clean and trustworthy, two-tone mark.',
    },
    {
        "handle": "valmyndigheten",
        "name": "Valmyndigheten",
        "prompt": f"{LOGO_STYLE} A formal government election-authority emblem: restrained circular seal, muted blue and gold, bureaucratic and dignified, no photographic elements.",
    },
    {
        "handle": "ekokammaren",
        "name": "Ekokammaren – reklam & kommunikation",
        "prompt": f"{LOGO_STYLE} A sleek advertising/PR agency: dark charcoal with a single cold accent color, modern minimal wordmark plus a small geometric mark, feels expensive and a little cold.",
    },
    {
        "handle": "bstad_uni",
        "name": "Björkstads Universitet",
        "prompt": f"{LOGO_STYLE} A university crest: classic academic navy-and-gold shield with a subtle book or laurel motif, traditional and restrained.",
    },
    {
        "handle": "bjorkstad",
        "name": "Björkstads kommun",
        "prompt": f"{LOGO_STYLE} A municipal seal for a small fictional Nordic town: simple heraldic shield, muted blue-green, civic and unpretentious.",
    },
]
