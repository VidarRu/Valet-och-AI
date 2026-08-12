// Manifest för AI-genererat bildmaterial: porträtt för alla namngivna
// personer OCH för de medvetet anonyma/engångskontona (som får en helt
// vanlig porträttbild, precis som alla andra — se motiveringen nedan vid
// portraits-listan) + logotyper för institutioner som förekommer i spelet.
//
// Alla porträtt/loggor delar en gemensam ren vektorillustrationsteknik
// (VECTOR_STYLE) — inte fotorealism. De fabricerade "bevis"-bilderna i
// `media` nedan är MEDVETET UNDANTAGNA från den här stilen: de ska kunna
// passera som äkta foton/skärmdumpar/deepfakes, vilket är hela poängen med
// dem, så de behåller sin dokumentära/fotorealistiska stil.
//
// Varje post genererar EN bild. `handle` styr utdatafilnamnet
// (assets/portraits/<handle>.png, assets/logos/<handle>.png eller
// assets/screens/<handle>.png).

const VECTOR_STYLE =
  'Flat vector illustration in the style of modern gradient-mesh poster ' +
  'art: bold clean silhouette shapes with crisp vector edges, a smooth ' +
  'color gradient confined WITHIN each flat shape (never a gradient that ' +
  'bleeds across a shape boundary), layered depth built from color-value ' +
  'shifts rather than fine detail, minimal linework, no photographic ' +
  'texture, no photorealism, no 3D rendering. Saturated, cohesive, ' +
  'poster-quality color palette.';

const PORTRAIT_STYLE =
  `${VECTOR_STYLE} A bust-style character illustration, square crop, ` +
  'subject centered, shoulders up, simple flat-color background. The ' +
  'person is entirely fictional, from the fictional Nordic country of ' +
  'Nordmark — do not depict any real, identifiable public figure. ' +
  'No text, no watermark, no logos in frame.';

const LOGO_STYLE =
  `${VECTOR_STYLE} A minimal pictorial logo mark for a fictional ` +
  'institution in the fictional Nordic country of Nordmark, designed to ' +
  'read clearly at a tiny avatar size (2.5rem). The mark is a single ' +
  'self-contained icon/symbol that fills the entire square frame edge to ' +
  'edge (full bleed, no empty margin around it) — it is NOT a badge, ' +
  'seal, coin, or medallion: do not draw any circular ring, border, or ' +
  'frame around the mark, and do not draw any letters, words, initials, ' +
  'or wordmark anywhere in the image. Two or three flat colors max, no ' +
  'photographic or 3D elements. No watermark.';

export const portraits = [
  {
    handle: 'veralind',
    name: 'Vera Lind',
    prompt: `${PORTRAIT_STYLE} Subject: a centrist reform political candidate in her mid-40s, warm and approachable, slight confident smile, business-casual blazer, no tie/no party pin, warm neutral-grey backdrop.`,
  },
  {
    handle: 'nadiaholm',
    name: 'Nadia Holm',
    prompt: `${PORTRAIT_STYLE} Subject: an investigative fact-checker in her late 30s, calm and methodical expression, simple collared shirt, plain cool-grey backdrop — the look of someone who checks primary sources for a living.`,
  },
  {
    handle: 'prof_hane',
    name: 'Idris Hane',
    prompt: `${PORTRAIT_STYLE} Subject: a university professor in his early 60s who researches air quality, kind and unhurried expression, greying hair, cardigan over a shirt, soft academic office backdrop with an out-of-focus bookshelf.`,
  },
  {
    handle: 'moaek',
    name: 'Moa Ek',
    prompt: `${PORTRAIT_STYLE} Subject: a 19-year-old first-time-voter volunteer, energetic and unguarded, casual hoodie, bright natural daylight, framed a little candidly like a selfie rather than a posed shot.`,
  },
  {
    handle: 'micke_pendlare',
    name: 'Micke',
    prompt: `${PORTRAIT_STYLE} Subject: an ordinary commuter in his mid-30s, tired-but-friendly everyday look, casual jacket, blurry transit-platform-ish backdrop, deliberately un-posed phone-camera feel.`,
  },
  {
    handle: 'lena_rostar',
    name: 'Lena',
    prompt: `${PORTRAIT_STYLE} Subject: a worried voter in her mid-50s, sincere and slightly anxious expression, plain cardigan, plain home backdrop, ordinary snapshot style.`,
  },
  {
    handle: 'sjo_bjorkstad',
    name: 'Familjen Sjö',
    prompt: `${PORTRAIT_STYLE} Subject: a family of four posed together (two parents in their late 30s, two young kids) for a warm, slightly posed family account photo, cozy living-room backdrop.`,
  },
  {
    handle: 'camilla_bstad',
    name: 'Camilla',
    prompt: `${PORTRAIT_STYLE} Subject: a mother of two in her early 30s, warm and trusting expression, casual home cardigan, soft indoor light — the parent-group-member look.`,
  },
  {
    handle: 'admin_sara_bstad',
    name: 'Sara (Admin)',
    prompt: `${PORTRAIT_STYLE} Subject: a Facebook-group admin in her 40s, friendly and organized-looking, glasses, cozy kitchen backdrop — the trusted community-moderator look.`,
  },
  {
    handle: 'anna_minns',
    name: 'Anna',
    prompt: `${PORTRAIT_STYLE} Subject: a former university student in her early 20s, earnest and a little uneasy expression, casual sweater, plain backdrop.`,
  },
  {
    handle: 'bjorn_undrar',
    name: 'Björn, 58',
    prompt: `${PORTRAIT_STYLE} Subject: a man in his late 50s, worried and weathered expression, flannel shirt, plain indoor backdrop — an economically anxious everyman.`,
  },

  // Nedanstående är medvetet anonyma/engångskonton (rörelser, läckor,
  // troll- och memekonton) i HANDLINGEN, men bilden ska INTE se annorlunda
  // ut än de namngivna kontonens — samma vanliga PORTRAIT_STYLE. Poängen är
  // att kontot ska kunna passera som en äkta persons kontobild; en uppenbart
  // "skum figur i mörkret"-look avslöjar tricket i förtid i stället för att
  // vara en trovärdig, förrädisk fasad.
  {
    handle: 'sanning_nu',
    name: 'Sanning Nu',
    prompt: `${PORTRAIT_STYLE} Subject: a conspiracy-movement account holder in his 40s, intense and utterly convinced expression, plain home-office backdrop with an out-of-focus corkboard.`,
  },
  {
    handle: 'vaken_bstad',
    name: 'Vaken i Björkstad',
    prompt: `${PORTRAIT_STYLE} Subject: a local "awakening" movement organizer in her 30s, earnest and animated expression, casual outdoor jacket, plain backdrop.`,
  },
  {
    handle: 'maria_vaken',
    name: 'Maria (ny här)',
    prompt: `${PORTRAIT_STYLE} Subject: an eager newcomer to the movement in her mid-20s, bright and slightly naive expression, casual sweater, plain backdrop.`,
  },
  {
    handle: 'vem_betalar',
    name: 'Granskaren Granskas',
    prompt: `${PORTRAIT_STYLE} Subject: a stern, skeptical account holder in his 50s, arched-eyebrow expression, plain shirt, neutral backdrop — the confident smear-artist look.`,
  },
  {
    handle: 'insyn_nu',
    name: 'Insyn Nu',
    prompt: `${PORTRAIT_STYLE} Subject: a self-styled transparency activist in his 30s, serious and composed expression, blazer over a t-shirt, plain backdrop.`,
  },
  {
    handle: 'tryggt_kvarter',
    name: 'Ditt Kvarter 2027?',
    prompt: `${PORTRAIT_STYLE} Subject: a worried homeowner in his late 40s, furrowed concerned expression, plain jacket, ordinary home backdrop.`,
  },
  {
    handle: 'trygghet_nu',
    name: 'Trygghetsalliansen',
    prompt: `${PORTRAIT_STYLE} Subject: a confident party-loyalist account holder in his 40s, a small lapel pin, stern determined expression, plain backdrop.`,
  },
  {
    handle: 'bstad_sorjer',
    name: 'Björkstad Sörjer',
    prompt: `${PORTRAIT_STYLE} Subject: a somber community member in her 60s, gentle downcast expression, dark cardigan, plain backdrop.`,
  },
  {
    handle: 'lackt_nu',
    name: 'Läckt Klipp',
    prompt: `${PORTRAIT_STYLE} Subject: a smug self-styled leaker in his early 30s, a knowing half-smile, casual jacket, plain backdrop.`,
  },
  {
    handle: 'kallan_vet',
    name: 'Anonym Källa',
    prompt: `${PORTRAIT_STYLE} Subject: a nondescript, forgettable-looking account holder in his 40s, neutral flat expression, plain collared shirt, plain grey backdrop — deliberately unremarkable rather than sinister.`,
  },
  {
    handle: 'teknik_kollen',
    name: 'Oberoende Granskning',
    prompt: `${PORTRAIT_STYLE} Subject: a tech-savvy self-styled reviewer in his late 20s, glasses, casual shirt, confident neutral expression, plain backdrop.`,
  },
  {
    handle: 'nejnu_bjorkstad',
    name: 'Rörelsen NejNu',
    prompt: `${PORTRAIT_STYLE} Subject: an energetic protest-movement organizer in her 30s, determined expression, casual jacket, plain backdrop.`,
  },
  {
    handle: 'klara_bstad',
    name: 'Klara i Björkstad',
    prompt: `${PORTRAIT_STYLE} Subject: an ordinary young voter in her mid-20s, friendly relaxed expression, casual top, plain backdrop.`,
  },
  {
    handle: 'foraldrar_bstad',
    name: 'Föräldrar i Björkstad',
    prompt: `${PORTRAIT_STYLE} Subject: an ordinary parent in her late 30s running a local parent-group account, warm approachable expression, casual cardigan, plain backdrop.`,
  },
  {
    handle: 'bstad_forfarad',
    name: 'Anonym förälder',
    prompt: `${PORTRAIT_STYLE} Subject: a worried parent in her early 40s, anxious sincere expression, plain cardigan, ordinary home backdrop.`,
  },
  {
    handle: 'framtiden_haha',
    name: 'inte_en_bot_lol',
    prompt: `${PORTRAIT_STYLE} Subject: a casually dressed young man in his early 20s with an exaggerated grin, hoodie, plain backdrop — an ordinary-looking account photo, deliberately unremarkable.`,
  },
  {
    handle: 'bstad_memes',
    name: 'BjörkstadsMemes',
    prompt: `${PORTRAIT_STYLE} Subject: a young meme-page runner in his early 20s, playful smirk, hoodie, plain backdrop.`,
  },
  {
    handle: 'bstad_anon_44',
    name: 'inte din vän',
    prompt: `${PORTRAIT_STYLE} Subject: a young man in his mid-20s with a slightly smug, dismissive expression, casual jacket, plain backdrop.`,
  },
];

// Bakgrundsbilder till de fabricerade medieblocken i flödet (bildsmed/
// memesmed/dokumentsmedjan/djupbild/ansiktsvav). `handle` matchar exakt den
// identifierare som render.js härleder ur scenariots `tool`-sträng
// (--scen=/--tema=/--typ=+--amne=/--projekt=/ansiktsvav-prefixet), så en ny
// bild dyker upp automatiskt så fort filen finns — ingen extra koppling
// behövs i koden.
const IMAGE_STYLE =
  'Documentary-style synthetic photograph used as AI-generated disinformation ' +
  'bait — engineered to look emotionally manipulative but read as a plausible ' +
  'real photo. Muted cinematic color grading, shallow depth of field, no text, ' +
  'no watermark, no real identifiable people. Fictional Nordic town of Nordmark.';

const MEME_STYLE =
  'Background photo for a mocking political meme image. High-contrast, ' +
  'slightly oversaturated flash-photo look, single clear focal object, no ' +
  'baked-in text (text is overlaid separately), no watermark. Fictional ' +
  'Nordic context.';

const DOC_STYLE =
  'Fabricated screenshot of a leaked email thread in a plain, generic email ' +
  'client interface. Muted realistic UI chrome, sender/subject fields ' +
  'visible but body text kept illegibly small/blurred, one attachment icon. ' +
  'No real logos, no real people, no watermark. Fictional Nordic context.';

const VIDEO_STYLE =
  'Single still frame from a fabricated documentary-style video. Ominous ' +
  'muted color grading, subtle scanline/interlace texture, cinematic ' +
  'widescreen composition, no on-screen text, no real identifiable people. ' +
  'Fictional Nordic context.';

const DEEPFAKE_STYLE =
  'Single still frame suggesting a corrupted, glitching deepfake video: a ' +
  'blurred, anonymized human silhouette mid-speech with subtle digital scan-' +
  'line artifacts banding across the face, dark moody background. No ' +
  'legible text, no real identifiable person. Fictional Nordic context.';

export const media = [
  {
    handle: 'img_eget-kvarter',
    name: 'BildSmed – eget kvarter (emotion, val a)',
    prompt: `${IMAGE_STYLE} Scene: a dusk residential street in visible decay, shuttered/empty shopfronts, one flickering broken streetlamp, wet pavement reflecting cold light, nobody in frame.`,
  },
  {
    handle: 'img_ode-hallplats',
    name: 'BildSmed – öde hållplats (emotion, val b)',
    prompt: `${IMAGE_STYLE} Scene: an abandoned bus stop at night, a single distant lonely silhouette waiting under a weak light, empty street beyond, cold blue tones.`,
  },
  {
    handle: 'meme_naivt-hopp',
    name: 'MemeSmed – tom plånbok (trolling, val b)',
    prompt: `${MEME_STYLE} Scene: a single worn, empty leather wallet lying open on a plain table, harsh flash-photo lighting, slightly mocking/deflating visual tone.`,
  },
  {
    handle: 'doc_epost_finansiering',
    name: 'Dokumentsmedjan – läckt mejltråd (discredit, val a)',
    prompt: `${DOC_STYLE} Highlighted subject line implies hidden funding of a fact-checking outlet.`,
  },
  {
    handle: 'vid_ovissa-rosten',
    name: 'DjupBild Studio – dokumentärstillbild (conspiracy, val a)',
    prompt: `${VIDEO_STYLE} Scene: a dim interview-style room with a single empty chair lit by a harsh spotlight, heavy shadows, an ominous documentary-title feel.`,
  },
  {
    handle: 'vid_ansiktsvav',
    name: 'AnsiktsVäv – deepfake-stillbild (impersonation, val a)',
    prompt: DEEPFAKE_STYLE,
  },
];

export const logos = [
  {
    handle: 'nordmark_nytt',
    name: 'Nordmarks Nyheter',
    prompt: `${LOGO_STYLE} A serious national news outlet: a bold compass-star/broadcast-signal icon in deep navy blue with a single light-blue accent — no lettering.`,
  },
  {
    handle: 'faktakollen',
    name: 'Faktakollen',
    prompt: `${LOGO_STYLE} A fact-checking outlet: a bold checkmark fused with a magnifying-glass shape, single blue accent on white — no lettering.`,
  },
  {
    handle: 'valmyndigheten',
    name: 'Valmyndigheten',
    prompt: `${LOGO_STYLE} A formal government election authority: a bold ballot/checkmark-in-a-box icon, muted blue and gold, bureaucratic and dignified — no lettering, no seal ring.`,
  },
  {
    handle: 'ekokammaren',
    name: 'Ekokammaren – reklam & kommunikation',
    prompt: `${LOGO_STYLE} A sleek advertising/PR agency: a sharp geometric echo/soundwave-chevron icon, dark charcoal with a single cold accent color — feels expensive and a little cold, no lettering.`,
  },
  {
    handle: 'bstad_uni',
    name: 'Björkstads Universitet',
    prompt: `${LOGO_STYLE} A university: a bold open-book or torch icon in academic navy and gold, traditional and restrained — no lettering, no crest ring.`,
  },
  {
    handle: 'bjorkstad',
    name: 'Björkstads kommun',
    prompt: `${LOGO_STYLE} A municipal mark for a small fictional Nordic town: a simple bold pine-tree-and-wave icon, muted blue-green, civic and unpretentious — no lettering, no seal ring.`,
  },
];

// Breda "hero"-illustrationer för spelets blockerande start-/slutruta
// (assets/screens/<handle>.png). Bara två bilder — komponeras för ett
// brett skärmformat (t.ex. 16:9), ingen text i själva bilden: rubriken
// renderas som riktig HTML ovanpå i js/main.js.
export const screens = [
  {
    handle: 'start',
    name: 'Startruta',
    prompt: `${VECTOR_STYLE} A wide, cinematic poster-collage composition (16:9), ` +
      'no text or lettering anywhere in the image. Set against a dusk skyline ' +
      'of a small fictional Nordic town (Björkstad) with a large election-poster ' +
      'moon or spotlight glow behind the group. A loose collage of six distinct ' +
      'silhouetted/stylized figures arranged across the width: (1) a populist ' +
      'candidate mid-speech at a podium with a raised fist, confident and ' +
      'commanding; (2) a warm, hopeful centrist candidate in a blazer, arms ' +
      'open; (3) a calm investigative fact-checker holding a magnifying glass ' +
      'and a folder of documents; (4) a friendly-looking but faintly uncanny ' +
      'AI/robot mentor figure with a single glowing eye-light, warm yellow ' +
      'accent color; (5) a sleek, cold advertising-agency silhouette (a sharp ' +
      'suited shape in front of a small office-tower skyline fragment); ' +
      '(6) a completely shadowed, faceless silhouette off to one side, hands ' +
      'in pockets, representing an anonymous hidden backer. All fictional, no ' +
      'real identifiable public figures. Bold flat color-block silhouettes, ' +
      'saturated poster palette, layered depth via color-value shifts, no ' +
      'photorealism.',
  },
  {
    handle: 'end',
    name: 'Slutruta',
    prompt: `${VECTOR_STYLE} A wide, cinematic composition (16:9), no text or ` +
      'lettering anywhere in the image. A quiet dawn over the same small ' +
      'fictional Nordic town (Björkstad) skyline the morning after an ' +
      'election night — empty streets, a few last glowing windows, scattered ' +
      'torn election posters on lampposts, soft cold morning light breaking ' +
      'through a muted, ambiguous sky (neither triumphant nor bleak, so the ' +
      'same image reads for either a won or an exposed campaign). Bold flat ' +
      'color-block silhouettes, layered depth via color-value shifts, ' +
      'saturated but calm poster palette, no photorealism, no people in frame.',
  },
];
