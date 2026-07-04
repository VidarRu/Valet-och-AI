# Valet & AI — projektminne / handoff

Detta dokument är en sammanfattning av allt arbete hittills, tänkt att läsas i
en **ny chattsession** så att kontexten kan börja om utan att något går förlorat.
Läs även `PROJECT_BRIEF.md` — den är den ursprungliga designbriefen och gäller
fortfarande som källa för spelets vision.

Senast uppdaterad: 2026-07-04.

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

**Senare tillägg (efter beställarfeedback, 2026-07-04):**
- **Prolog + introruta** som etablerar Nordmark/valår/spelaren och EKO/Ekokammaren.
- **Mer uppdragskontext:** `target` (måltavla) + `stakes` (vad som står på spel) på
  uppdragskortet, utöver `client`.
- **Fler reaktioner:** metodutfall ger tre sociala medie-reaktioner (`terminal.reactions`).
- **Fler beslut:** reaktiva dialogval (Bad News-stil) + enda-val-repliker i varje uppdrag;
  kärnuppdragen har dessutom ett extra strategiskt val.
- **Skarpare verkliga exempel** (plats/delstat/år/namn) i debrieferna.
- **Avanglifiering** av dialogen (se avsnitt 8).

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
  index.js              Register: exporterar { core, deep, hub, closing, prologue }.
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
          target?:{name,description}, stakes?:'…',        // VALFRI extra uppdragskontext
          scenarios:[...], debrief:{ summary, realWorld:[...] } }
Scenario{ id, steps:[...] }
Steg    { id, type:'tutor'|'post'|'choice', ... }
  tutor  { text }
  post   { author, handle, text }
  choice { prompt, options:[...] }   // minst 1 val: 1 = klickbar replik
                                     // (Bad News-stil), 2+ = riktigt beslut
Val     { id, label, feedback (OBLIGATORISK = feedbacklager 1),
          effects?:{followers,credibility (heltal)},
          terminal?:{ tool, lines:[...], result:{author,handle,text},
                      reactions?:[{author,handle,text}, …] },  // fler sociala medie-svar
          next?:'stegId'|'end' }
```

`target`/`stakes` renderas som egna block på uppdragskortet (måltavla = röd
kant, insats = gul). `terminal.reactions` matas in i flödet EFTER det
AI-genererade resultatkortet, som vanliga (icke-genererade) inläggskort med
taggen "Reaktion" — typiskt en förstärkare, en drabbad röst och en
faktagranskare som anar oråd (tre reaktioner i stället för en).

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
- Återkommande "vanliga" röster: **Micke** (@micke_pendlare), **Lena** (@lena_rostar),
  **Familjen Sjö** (@sjo_bjorkstad).
- **Ekokammaren** (@ekokammaren) — den shady reklambyrån/trollfabriken som rekryterar
  spelaren i prologen (paraplyet ovanför de sex klienterna).
- Måltavlor i fördjupningarna: **Moa Ek** (@moaek, 19) — trollning; **prof. Idris Hane**
  (@prof_hane) — misskreditering; **Camilla**/**admin Sara** i föräldragruppen —
  polarisering; **Björn, 58** (@bjorn_undrar)/**Maria** i kaninhålet — konspiration.

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

Uppdragskortet visar nu **Uppdragsgivare** (`client`) + **Måltavla** (`target`) +
**Vad som står på spel** (`stakes`). Typiskt flöde i ett uppdrag: uppdragskort →
intro (tutor) → **reaktivt dialogval** (konvergerar) → taktik → kontextinlägg →
strategival → **enda-val-replik** som binder ihop kronologin → ev. extra val →
metodval (terminal) → genererat resultatkort + **tre reaktioner** → wrap →
debrief (lager 2 med verkliga exempel).

**Verkliga fall som vävs in i debriefer/avslutning** — nu KONKRETA med plats/
delstat/år/namn (efter beställarens önskemål "säg i vilken delstat valet var"):
Philadelphia i Pennsylvania (ChatGPT-fabricerade nyhetsartiklar, Bilal-kampanjen),
robocall i **New Hampshire** jan 2024 (röstklonad Biden), Slovakien 2023 (falskt
ljudklipp), IRA 2016 (USA, wedge-innehåll), Doppelganger/Spamouflage (2024),
"2000 Mules" (USA 2022), "Stop the Steal"/6 jan 2021, Argentina 2023 (Massa/Milei),
Nederländerna (~400 syntetiska bilder), Irland 2025 (RTÉ-liknande deepfake-avhopp),
Maria Ressa (Filippinerna), Jessikka Aro (Finland), QAnon, Southport 2024,
Boston 2013, "Merchants of Doubt", lögnarens utdelning (Chesney & Citron 2018).
Avslutningens nyans: AI:s uppmätta valpåverkan har hittills varit begränsad
(Indien 2024; EU:s prebunking 2024) — motvikt mot ren teknikskräck.
VIKTIGT: alla verkliga exempel ska förbli faktiskt korrekta — hitta inte på år/namn.

---

## 8. Nyckelmekanik i motorn

- **Prolog** (`state.stage === 'prologue'`): en berättande ram FÖRE första
  uppdraget som etablerar spelet (landet **Nordmark** + valår, spelaren = datakunnig
  men arbetslös, rekryteras av **EKO**/reklambyrån **Ekokammaren**, ett litet
  moraliskt kval, och att man samlar ett märke per bemästrat verktyg). Exporteras som
  `prologue` i `data/index.js` och spelas genom SAMMA steg-maskineri som ett uppdrag,
  men har ingen badge och ingen debrief. Öppnar med ett `kind:'title'`-kort som nu
  bär `intro:[…]` (etablerande stycken om Nordmark/spelaren). När prologens scenario
  tar slut anropar `movePointer` → `startCore()` → första kärnuppdraget.
- **Reaktiva dialogval (Bad News-stil):** varje uppdrag har lätta val där utfallet
  konvergerar men EKO:s `feedback` (första repliken) varierar med svaret — ofta i hur
  taggad/motvillig spelaren är. Enda-val-lägen (`options` med 1 element) används som
  klickbara repliker. Dessa har ingen `effects`/`terminal`, bara `feedback` + faller
  igenom till nästa steg. Ger fler beslutspunkter utan mer läsning.
- **Språk:** en avanglifieringsomgång är gjord (t.ex. "hantverk"→"verktyg för
  desinformation", "personas"→"låtsaskonton/konton", "deniabel"→"förnekbar",
  "storyn"→"nyheten/snacket", "targeting", "cliffhanger", "creepy", "online",
  "spinndoktor" m.fl.). Behåll etablerade lånord (deepfake, trollfabrik, meme, bot,
  krypto) och dokumenterade termer. Undvik direktöversättningar från engelska i ny text.
- **Faser** (`state.phase`): `playing` → `terminal` → `module-debrief` → `hub` → `finished`.
- **Statusrad**: följartal, blå trovärdighetsstapel, uppdragsräknare.
- **Terminalläge**: triggas av val med `terminal`-fält; typewriter skriver fiktiva
  loggrader, sen "Tillbaka till flödet" → genererat kort klistras in i flödet.
- **Hub**: efter kärnspelet visas en meny (`state.deepStatus`) där spelaren väljer
  fördjupning per badge eller avslutar. `selectDeep(id)` / `finish()`.
- **Avslutning**: slutkort med alla badges + `closing`-reflektionen + "Spela igen"
  (`window.location.reload()`).
- Motorns signatur: `createEngine({ core, deep, closing, hub, prologue })` i `js/main.js`.

---

## 9. Deploy & branch-flöde (VIKTIGT)

- **GitHub Pages** bygger från **default-branchen `claude/ai-misinformation-game-IXaqW`**
  och serverar på **https://vidarru.github.io/Valet-och-AI/**.
- **Aktuell utvecklingsbranch: `claude/game-narrative-missions-cux2zv`.** Allt arbete görs
  här och mergas till default-branchen via PR. (Historik: PR #4 = prolog/kontext/reaktioner/
  exempel, MERGAD. PR #5 = reaktiva val + avanglifiering, MERGAD 2026-07-04. PR #6 = denna
  MEMORY.md-uppdatering, eftersläntrande efter PR #5:s merge.) Är en PR redan mergad: starta
  om branchen från default och gör en NY PR — stacka inte på mergad historik.
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
- ~~Öppningarna har ofta två tutor-bubblor i rad + många "Fortsätt"-klick.~~ — till stor del
  åtgärdat 2026-07-04: text trimmad och uppbruten med reaktiva dialogval/enda-val-repliker.
- **Terminalvariation:** `SvärmSkribent` används i flera metodval. Ge fler distinkta
  verktygsnamn och loggstilar så terminalläget känns nytt varje gång (briefens önskemål).

**Spelmekanik**
- **Trovärdighetsmätaren har i dag ingen konsekvens** (den bara sjunker). Ge den tyngd:
  t.ex. spärra de mest riskabla valen när den är låg, låt EKO kommentera olika, eller
  ett alternativt "du blev avslöjad"-slut om den bottnar. Det gör dilemmana skarpare.
- ~~**Titel-/startskärm** som ramar in spelet~~ — KLART (prolog + titelkort, se avsnitt 8).
- ~~**Fler val/beslut per uppdrag** och **fler reaktioner** på besluten~~ — KLART: varje
  kärnuppdrag har ett tredje strategiskt val, metodutfall ger tre sociala medie-reaktioner
  (`terminal.reactions`), och ALLA 12 uppdrag har reaktiva dialogval + enda-val-repliker
  (avsnitt 8). Fördjupningarna har två strategiska val (inte tre) men fick de reaktiva
  beaten — ev. framtida: ett tredje strategiskt val även där för full symmetri.
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
2. Utveckla på aktuell branch (se avsnitt 9), merga till default för att deploya.
3. Kör `node tools/validate.js` efter dataändringar; spela igenom via lokal server.
4. Håll spelvärlden (avsnitt 6) konsekvent och alla AI-verktyg fiktiva + märkta
   SIMULERING. Skriv idiomatisk svenska — undvik anglifieringar (avsnitt 8).
