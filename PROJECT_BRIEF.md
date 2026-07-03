# Valet & AI v2 — projektbrief för Claude Code

## Syfte

Pedagogiskt webbspel modellerat på Bad News (getbadnews.com), men fokuserat på hur AI-verktyg
sänker tröskeln för att skapa och sprida desinformation inför en valrörelse/folkomröstning.
Spelaren axlar rollen som illasinnad aktör för att i efterhand förstå taktiken inifrån
(inoculation theory / prebunking) — inte för att uppmana till efterhärmning.

Detta är omtag nummer två. Föregående version hade tekniskt fungerande spellogik men:
- svag, generisk text
- för binära val utan verkliga dilemman
- för abstrakt koppling till konkreta AI-verktyg
- otydlig/saknad feedback efter val
- för få/korta scenarier
- en tvåkolumns-layout (mörk HUD-panel + ljust textfält) som skapade tomma ytor och
  kändes strukturellt fel, inte bara en CSS-bugg

**Konsekvens: bygg om motorn från grunden.** Återanvänd inte förra försökets kod som bas —
ny arkitektur, ny layout-modell.

---

## Ramberättelse

Spelaren är en **frilansande AI-konsult för politisk kommunikation**. Varje uppdrag (modul)
är ett nytt case åt en ny klient — lokalpolitiker, PR-byrå, anonym kontakt, utländsk
tankesmedja — med tydlig motivation (arvode, klientens konkreta mål) i stället för en vag,
odefinierad uppdragsgivare.

En återkommande **handledarfigur** (en AI-persona i spelvärlden — ironin är medveten: en AI
som lär dig missbruka AI) guidar spelaren genom hela spelet med en sarkastisk, självmedveten
meta-ton — samma funktion som introt i originalet Bad News fyller. Tonen är det som gör att
spelet kan låta spelaren öva taktiken utan att kännas som ett cyniskt godkännande av den:
handledaren signalerar hela tiden "vi vet att det här är absurt."

Handledaren kommenterar även **efter varje val** (se feedbacksystem nedan), inte bara i introt.

---

## Struktur: kärnspel + fördjupningsmoduler

- **Kärnspel** (~15–20 min): ett uppdrag per badge, sex uppdrag totalt, ger en fullständig
  men kompakt genomgång av alla sex taktiker.
- **Fördjupningsmoduler** (valfria, spelaren väljer efter kärnspelet): längre, mer detaljerade
  case per badge för den som vill gå djupare i en specifik taktik.
- Detta löser både "för få/korta scenarier"-kritiken och risken att ett spel med elva+ badges
  blir för långt eller för ytligt (se badge-resonemang nedan).

---

## Badge-system

Behåll originalets sex badges rakt av, omkontextualiserade för AI-eran:

1. **Polarization**
2. **Discredit**
3. **Trolling**
4. **Conspiracy**
5. **Emotion**
6. **Impersonation**

**Viktigt designval:** AI-metoderna (deepfake-video/audio, röstkloning, syntetiska bilder,
massproducerad bot-text, mikrotargeting) är INTE egna badges. De är verktyg/metodval
spelaren gör *inom* ett scenario som redan hör till en av de sex badgesen. Skälet: de flesta
AI-metoderna är leveransmekanismer för klassisk taktik, inte nya taktiker i sig — röstkloning
gör impersonation mer trovärdig, bot-text skalar trolling/polarization, mikrotargeting är
algoritmiskt riktad emotion. Att göra dem till egna räknade badges skulle bara späda ut de sex
etablerade kategorierna och återskapa "för ytligt"-problemet.

---

## Feedbacksystem

Två lager, båda krävs:
1. **Kort direktkommentar** direkt efter varje val — förklarar taktiken i klartext, kopplad
   till scenariot som just spelades.
2. **Fördjupad sammanfattning** i slutet av varje badge/modul — sätter taktiken i ett bredare
   sammanhang, gärna med koppling till verkliga exempel (se researchunderlag nedan).

Detta var en uttrycklig svaghet förra gången — bygg det som en obligatorisk del av varje
scenarios datastruktur, inte som en efterhandskonstruktion.

---

## Visuell design

**Layoutmodell:** kortbaserat socialt medieflöde, INTE tvåkolumns HUD+textfält.
- Kompakt statusrad högst upp (svart bakgrund): följartal, trovärdighetsmätare (blå fylld
  stapel), uppdragsräknare.
- Handledarbubbla i flödet: rund avatar (gul bakgrund, svart kant) + pratbubbla.
- Scenariokort: vit bakgrund, svart 2px-kant, rund kategoribadge i rött, valen som
  fullbredds-knappar.
- Textkolumn centrerad, ingen fast panelhöjd — kortet växer/krymper med innehållet. Det här
  är den strukturella fixen för "tomma ytor"-problemet.

**Färgpalett** (Bad News-inspirerad: svart/grått/vitt bas + röd/gul/blå accent):
- Bas: `#111` (nästan svart), `#fff`, `#F1EFE8` (ljusgrå bakgrund), `#B4B2A9` (mellangrå)
- Röd (varning/kategori-badge): `#E24B4A`
- Gul (handledare/AI-accent): `#FAC775`
- Blå (sanningsenligt/trovärdighet): `#378ADD`, `#85B7EB`
- Undvik övriga CDS-ramper (lila, teal, coral, pink) — hela poängen är den begränsade,
  tabloid-liknande paletten.

**Dubbelt visuellt läge:**
- **Ljust läge** (app-flöde ovan) för strategiska beslut — mänsklig, social handling.
- **Mörkt terminalläge** triggas när spelaren väljer en AI-genereringsåtgärd: overlay med
  svart bakgrund, monospace, typewriter-effekt som skriver ut fejkade
  kommandon/loggrader (t.ex. `voice_synth.sh`, `image_gen.py`, `botnet_deploy.sh` beroende
  på metod). Efter "klart" visas en knapp som tar spelaren tillbaka till flödet med resultatet
  inklistrat som ett nytt kort.
- Syftet är pedagogiskt, inte bara dekorativt: skiftet i visuellt språk illustrerar att
  *avsikten* är mänsklig men *utförandet* är maskinellt och trivialt — utan att behöva
  skriva ut poängen i text.
- En fungerande referensmockup med exakt denna interaktion (klick → terminal → resultat)
  finns redan byggd och testad i den här konversationen — be Claude Code titta på skärmdump
  eller beskrivningen ovan som visuell källa.

---

## Innehållskrav (för att undvika förra försökets svagheter)

- Varje scenario ska namnge eller antyda ett **konkret AI-verktyg/metod**, inte tala abstrakt
  om "AI". Fejkade/generiska verktygsnamn i terminalloggen är bra (undvik riktiga
  varumärken).
- Val ska vara **verkliga dilemman**, inte "gör det onda" vs "gör det goda" — t.ex. avvägningar
  mellan effektivitet och upptäcktsrisk, eller mellan olika klienters motstridiga mål.
- Skriv fylligare scenariotexter än förra försöket — sikta på att varje uppdrag känns som en
  liten berättelse, inte en enradig premiss.
- Koppla gärna badge-sammanfattningarna till verkliga händelser (exempel finns i
  researchunderlaget nedan) för trovärdighet.

---

## Researchunderlag att ge Claude Code som kontext

- Bad News bygger på inoculation theory/prebunking — sex badges (impersonation, discredit,
  polarization, emotion, trolling, conspiracy), ursprungligen baserade på NATO StratComs
  "Digital Hydra"-rapport.
- Verkliga AI-desinformationsfall att hämta inspiration från: deepfake-video i Irlands
  presidentval 2025 (falsk avhoppsvideo), ~400 AI-genererade syntetiska bilder mot
  motståndare i nederländskt val, fabricerade nyhetsartiklar via GenAI i en
  sheriffkandidats kampanj i Philadelphia, uppslukande AI-genererat bildmaterial i en
  argentinsk presidentkampanj.
- Nyanserad poäng värd att väva in i spelets avslutning: hittills har generativ AI:s mätbara
  effekt på faktiska valresultat varit mer begränsad än den mediala skrämselbilden — t.ex.
  Indiens deepfake-våg tycks inte ha ändrat många väljares uppfattningar, och EU:s
  prebunking-insatser inför parlamentsvalet 2024 verkar ha fungerat relativt väl. Bra
  motvikt så spelet inte blir ren teknikskräck.

---

## Föreslagen arbetsordning i Claude Code

Kör detta som separata, avgränsade sessioner/prompts snarare än en enda jätteprompt —
lättare att granska och korrigera på vägen:

1. **Schema + motor.** Definiera datastrukturen för moduler/scenarier/val (inkl. fält för
   kort feedback, fördjupad feedback, badge-typ, om valet triggar terminalläge). Bygg
   grundläggande state-hantering och renderingslogik. Inget färdigt innehåll än.
2. **Visuellt UI.** Implementera kortflödet, statusraden, handledarbubblan och
   terminal-overlayn enligt design och färgpalett ovan. Testa med placeholder-text.
3. **Kärnspelets sex uppdrag.** Ett scenario per badge, med fullständig text, val och
   tvålagers feedback.
4. **Fördjupningsmoduler.** Bygg ut med ytterligare case per badge.
5. **Granskning och justering.** Spela igenom, kontrollera pacing, läsbarhet, och att
   terminalläget känns meningsfullt varje gång det triggas (inte repetitivt).

---

## Kodrelaterat att komma ihåg

- Samma repo som tidigare (Valet-och-AI), men befintlig kod rensas bort helt — det här är
  ett omtag, inte en vidarebyggnad. Be Claude Code radera gammal kod (utom ev. README/licens)
  som första steg innan schemat i punkt 1 nedan påbörjas.
- Tech-stack: inget uttryckligt krav från min sida. Claude Code väljer själv (t.ex. ren
  vanilla JS/HTML/CSS utan build-steg, som förra gången, eller något annat om det finns
  goda skäl) — men motivera valet kort innan ni börjar bygga.
- Håll fejkad kod/loggrader i terminalläget uttryckligen fiktiv och illustrativ — inga
  verkliga körbara verktygsnamn, API-anrop eller instruktioner som skulle kunna uppfattas
  som en faktisk guide.

---

## Startprompt för Claude Code

Klistra in ungefär så här som första meddelande i terminalen (justera repo-sökväg):

> Jag vill göra om det här repot till ett nytt pedagogiskt spel. Läs igenom
> `PROJECT_BRIEF.md` i repot noga — den beskriver hela speldesignen, visuella
> systemet och arbetsordningen. Börja med att radera all befintlig spelkod (behåll
> README och licensfil om de finns), föreslå sedan kort en tech-stack med motivering,
> och vänta på mitt godkännande innan du går vidare till schemat i steg 1 i briefen.
