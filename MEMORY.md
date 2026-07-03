# Valet & AI — projektminne / handoff

Detta dokument är en sammanfattning av allt arbete hittills, tänkt att läsas i
en **ny chattsession** så att kontexten kan börja om utan att något går förlorat.
Läs även `PROJECT_BRIEF.md` — den är den ursprungliga designbriefen och gäller
fortfarande som källa för spelets vision.

Senast uppdaterad: 2026-07-03.

---

## 1. Vad projektet är

Ett pedagogiskt webbspel på svenska, modellerat på **Bad News** (getbadnews.com),
men fokuserat på hur **AI-verktyg** sänker tröskeln för att skapa och sprida
desinformation i en valrörelse. Spelaren axlar rollen som illasinnad
"AI-konsult för politisk kommunikation" för att förstå taktiken inifrån
(**inoculation theory / prebunking**) — inte för att uppmuntra efterhärmning.
Den ironiska handledaren **EKO** (en AI som lär dig missbruka AI) guidar spelaren
och vänder tonen på slutet till spelets verkliga poäng: den som känner igen
tricken blir svårare att lura.

---

## 2. Status — klart till och med steg 5

Arbetsordningen från briefen är genomförd i sin helhet:

1. ✅ **Schema + motor** — datastruktur, state, renderingslogik
2. ✅ **Visuellt UI** — kortflöde, statusrad, handledarbubbla, terminal-overlay
3. ✅ **Kärnspelets sex uppdrag** — ett per badge, fullskrivna
4. ✅ **Fördjupningsmoduler** — sex djupdykningar + valbar hub
5. ✅ **Granskning och finslipning** — pacing, terminalvariation, "Spela igen"

Spelet är komplett och spelbart från början till slut. Återstående arbete är
förbättringar/utökningar, inte grundfunktioner (se avsnitt 11).

---

## 3. Teknisk stack

- **Ren vanilla JS (ES-moduler) + HTML + CSS. Inget build-steg, inga beroenden.**
- Scenariodata ligger som JS-moduler (inte JSON) så de kan importeras direkt.
- Motiv: enklaste möjliga för statisk hosting på GitHub Pages, lätt att granska,
  inga verktygskedjor att underhålla. Godkänt av beställaren i steg 0.
- Testning använder Playwright (Chromium) men det är ett dev-beroende, inte en
  del av spelet.

---

## 4. Filstruktur

```
index.html              Startpunkt: statusrad, #feed, #terminal-overlay, laddar js/main.js
css/base.css            All styling. Palett som CSS-variabler (se briefen).
js/
  main.js               Kopplar ihop data → motor → renderare → terminal. engine.start().
  schema.js             BADGES-konstant + validering av moduldata (validateModules).
  engine.js             Spelmotorn. Ren state/flödeslogik, ingen DOM. Pub/sub via subscribe().
  render.js             Ritar statusrad + kortflöde + hub + slutkort utifrån state.
  terminal.js           Mörk terminal-overlay med typewriter-effekt.
data/
  index.js              Register: exporterar { core, deep, hub, closing }.
  modules/*.js          De SEX kärnuppdragen (en fil per badge).
  deep/*.js             De SEX fördjupningarna (en fil per badge).
tools/
  validate.js           Kör `node tools/validate.js` för att schemavalidera all data.
PROJECT_BRIEF.md        Ursprunglig designbrief (gäller fortfarande).
MEMORY.md               Detta dokument.
```

---

## 5. Datamodell (schema)

Hierarki: **Modul (uppdrag) → Scenario → Steg → Val**. Definierat och validerat i
`js/schema.js`. Kortform:

```
Modul   { id, type:'core'|'deep', badge, title, client:{name,description,goal,fee},
          scenarios:[...], debrief:{ summary, realWorld:[...] } }
Scenario{ id, steps:[...] }
Steg    { id, type:'tutor'|'post'|'choice', ... }
  tutor  { text }
  post   { author, handle, text }
  choice { prompt, options:[...] }
Val     { id, label, feedback (OBLIGATORISK = feedbacklager 1),
          effects?:{followers,credibility (heltal)},
          terminal?:{ tool, lines:[...], result:{author,handle,text} },
          next?:'stegId'|'end' }
```

Hårda regler som schemat tvingar fram (det som brast i förra versionen):
- **Varje val måste ha `feedback`** (handledarens direktkommentar = lager 1).
- **Varje modul måste ha `debrief.summary` + minst ett `realWorld`-exempel** (lager 2).
- Badge måste vara en av de sex. AI-metoder är INTE badges — de är `terminal`-val.

De sex badgesen: `polarization, discredit, trolling, conspiracy, emotion, impersonation`.

---

## 6. Spelvärlden (kanon — håll konsekvent vid nytt innehåll)

Allt utspelar sig i det **fiktiva landet Nordmark** under ett pågående riksval,
plus en lokal folkomröstning i staden **Björkstad**. Samma värld i alla uppdrag,
men olika betalande klienter — det ger känslan av EN valrörelse sedd från sex
legojobb.

**Återkommande figurer:**
- **Vera Lind** (@veralind) — populär centristisk reformkandidat, ofta måltavla.
- **Anton Berg** — populistisk utmanare (klient i misskreditering).
- **Nadia Holm** (@nadiaholm) / **Faktakollen** (@faktakollen) — faktagranskare.
- **Valmyndigheten** (@valmyndigheten) — imitations-/konspirationsmål.
- **Nordmarks Nyheter** (@nordmark_nytt) — nyhetsmedium.
- Återkommande "vanliga" röster: **Micke** (@micke_pendlare), **Lena** (@lena_rostar).

**Fiktiva AI-verktyg** (ALDRIG riktiga varumärken; terminalloggar märkta SIMULERING):
- `EkoMotor` / `SvärmSkribent` / `Frågefabriken` — bot-genererad text
- `MemeSmed` — hånfulla bilder/memes
- `Dokumentsmedjan` — fabricerade dokument/skärmdumpar
- `DjupBild Studio` — syntetisk "dokumentär"-video
- `BildSmed` + `MålSökaren` — syntetiska bilder + mikrotargeting
- `AnsiktsVäv` (deepfake-video) / `RöstSpegel` (röstkloning)

---

## 7. Innehåll: de tolv uppdragen

**Kärnspel (`data/modules/`)** — dramaturgisk stegring från mjukt/skalbart till svartast:
1. **Polarisering** — "Trängselavgiften i Björkstad". PR-byrå driver en wedge via bot-svärm.
2. **Misskreditering** — "Skjut budbäraren". Kampanj sänker en faktagranskare.
3. **Trollning** — "Dränk hoppet". Anonym kontakt dränker en hoppkampanj.
4. **Konspiration** — "Fröet till en valnatt i lågor". Tankesmedja sår valtvivel i förväg.
5. **Känslor** — "Rädslan bor på din gata". Mikrotargetad syntetisk skräck.
6. **Imitation** — "Rösten som aldrig sades". Deepfake/röstkloning sista dygnet; EKO vänder tonen.

**Fördjupningar (`data/deep/`)** — samma badge, NY vinkel (för att undvika upprepning):
- Polarisering: infiltrera/radikalisera en äkta community inifrån
- Misskreditering: förstöra en experts trovärdighet i förväg (poisoning the well)
- Trollning: riktad uttröttning/tystande av EN röst (chilling effect)
- Konspiration: bygga en community/kaninhål kring narrativet
- Känslor: kapa en verklig tragedi för moralisk upprördhet (news-jacking)
- Imitation: "liar's dividend" — avfärda ett ÄKTA klipp som deepfake

Varje uppdrag: intro/taktik (tutor) → kontextinlägg → strategival → metodval (terminal)
→ genererat resultatkort → wrap → debrief (lager 2 med verkliga exempel).

**Verkliga fall som vävs in i debriefer/avslutning** (från briefens researchunderlag):
Philadelphia (fabricerade GenAI-artiklar), Nederländerna (~400 syntetiska bilder),
Argentina (AI-bildmaterial), Irland 2025 (deepfake-avhoppsvideo), samt nyansen i
avslutningen: AI:s uppmätta valpåverkan har hittills varit begränsad (Indien;
EU:s prebunking 2024 fungerade väl) — motvikt mot ren teknikskräck.

---

## 8. Nyckelmekanik i motorn

- **Faser** (`state.phase`): `playing` → `terminal` → `module-debrief` → `hub` → `finished`.
- **Statusrad**: följartal, blå trovärdighetsstapel, uppdragsräknare.
- **Terminalläge**: triggas av val med `terminal`-fält; typewriter skriver fiktiva
  loggrader, sen "Tillbaka till flödet" → genererat kort klistras in i flödet.
- **Hub**: efter kärnspelet visas en meny (`state.deepStatus`) där spelaren väljer
  fördjupning per badge eller avslutar. `selectDeep(id)` / `finish()`.
- **Avslutning**: slutkort med alla badges + `closing`-reflektionen + "Spela igen"
  (`window.location.reload()`).
- Motorns signatur: `createEngine({ core, deep, closing, hub })` i `js/main.js`.

---

## 9. Deploy & branch-flöde (VIKTIGT)

- **GitHub Pages** bygger från **default-branchen `claude/ai-misinformation-game-IXaqW`**
  och serverar på **https://vidarru.github.io/Valet-och-AI/**.
- **Utvecklingsbranch: `claude/repo-cleanup-tech-stack-ey67r2`.** Allt arbete görs här
  och mergas till default-branchen via PR (t.ex. PR #2).
- **Konsekvens:** ändringar syns på webb-URL:en först när de mergats in i
  default-branchen. (Skillnad mot första versionen, som skrev rakt på deploy-branchen.)
- Pages använder en `.nojekyll`-fil (statisk servering utan Jekyll). Alla sökvägar i
  index.html/imports är RELATIVA, vilket krävs eftersom sajten ligger på en subpath.
- **Om en deploy fastnar** (hänt en gång pga ett övergående GitHub-fel): gör vilken
  liten commit som helst på deploy-branchen, eller Actions-fliken → Re-run.

---

## 10. Köra och testa lokalt

- **Spela lokalt:** `python3 -m http.server 8000` i repo-roten → http://localhost:8000
  (ES-moduler kan blockeras via `file://` i vissa webbläsare, så använd en server).
- **Schemavalidering:** `node tools/validate.js` (validerar core + deep mot schemat).
- **Playwright-genomspelning:** användes för att auto-spela alla uppdrag och ta
  skärmdumpar. Chromium finns förinstallerad på `/opt/pw-browsers/chromium`
  (starta med `executablePath` — kör INTE `playwright install`).

---

## 11. Framtida utveckling — mina förslag

Idéer för att fördjupa spelet ytterligare, grovt sorterade efter värde/insats:

**Pacing & känsla**
- Öppningarna har ofta två tutor-bubblor i rad + många "Fortsätt"-klick. Överväg att
  slå ihop korta tutor-steg eller lägga in ett auto-advance-läge med paus.
- **Terminalvariation:** `SvärmSkribent` används i 7 av 24 metodval. Ge fler distinkta
  verktygsnamn och loggstilar så terminalläget känns nytt varje gång (briefens önskemål).

**Spelmekanik**
- **Trovärdighetsmätaren har i dag ingen konsekvens** (den bara sjunker). Ge den tyngd:
  t.ex. spärra de mest riskabla valen när den är låg, låt EKO kommentera olika, eller
  ett alternativt "du blev avslöjad"-slut om den bottnar. Det gör dilemmana skarpare.
- **Titel-/startskärm** som ramar in spelet innan man kastas in i första uppdraget.
- **localStorage:** spara badges/progress mellan sessioner, låt spelaren återuppta.

**Innehåll**
- Fördjupningarna har ett scenario var — bygg ut med fler case per badge.
- Ett delbart **resultat-/badgekort** i slutet (bra för klassrum/spridning).
- **Lärarläge:** länkar till verkliga källor/lästips i debriefer, kopplat till
  läroplansmål; ev. kort quiz som mäter igenkänning efteråt.

**Tillgänglighet & polish**
- Skärmläsar-/tangentbordsgenomgång, `aria-live` på flödet, kontrasttest i båda teman.
- Valfritt ljud (subtilt typewriter-ljud i terminalen), respektera reduced-motion.
- i18n-struktur om spelet ska finnas på fler språk än svenska.

---

## 12. Snabborientering för nästa session

1. Läs `PROJECT_BRIEF.md` (vision) + detta `MEMORY.md` (nuläge).
2. Utveckla på branchen `claude/repo-cleanup-tech-stack-ey67r2`, merga till
   default för att deploya.
3. Kör `node tools/validate.js` efter dataändringar; spela igenom via lokal server.
4. Håll spelvärlden (avsnitt 6) konsekvent och alla AI-verktyg fiktiva + märkta
   SIMULERING.
