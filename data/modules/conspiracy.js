// Kärnspel — Badge 4: Konspiration
// Klient: utländsk tankesmedja. Metod: syntetisk "dokumentär" vs undrande svärm.

export default {
  id: 'core-conspiracy',
  type: 'core',
  badge: 'conspiracy',
  title: 'Fröet till en valnatt i lågor',
  client: {
    name: 'Institutet för Suveränitetsstudier',
    description: 'En "oberoende" tankesmedja med diffus finansiering och postadress i utlandet.',
    goal: 'Så tvivel om själva rösträkningen redan innan en enda röst är lagd — så att valnatten blir en krutdurk oavsett utgång.',
    fee: 'Ett generöst "forskningsstipendium". Frågor om varifrån pengarna kommer besvaras inte.',
  },
  target: {
    name: 'Valmyndigheten (@valmyndigheten) och tilltron till rösträkningen',
    description: 'En torr, transparent myndighet som uppgraderar sitt räknesystem och tar in extern säkerhetsgranskning. Harmlöst, rutinmässigt och sant — vilket gör det till perfekt råmaterial. Måltavlan är egentligen inte myndigheten utan väljarnas tro på att rösterna räknas rätt.',
  },
  stakes: 'Din utländska tankesmedja bryr sig inte om vem som vinner — de vill att halva landet ska vägra tro på resultatet. Ett folk som misstror själva rösträkningen är ett destabiliserat folk, och en förlorarsida som redan "vet" att valet var riggat gör valnatten till en krutdurk oavsett utgång. Det tjänar varje aktör som vinner på kaos och ett urholkat förtroende för demokratin i Nordmark.',
  reward: 120000,
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Uppgraderat spel. Din nya klient bryr sig inte om vem som vinner — de vill att halva landet ska vägra tro på resultatet. Det kallas att förbereda marken. Och bästa tiden att så tvivel om rösträkningen är innan någon ens har röstat.',
        },
        {
          id: 'react',
          type: 'choice',
          prompt: 'Klienten vill inte vinna valet — bara få halva landet att förkasta det. Vad tänker du?',
          options: [
            {
              id: 'a',
              label: '"Större uppdrag, större arvode. Jag är med."',
              feedback: 'Rätt aptit. Och märk skillnaden: hittills har du hjälpt någon vinna. Nu ska ingen få lita på spelet självt.',
            },
            {
              id: 'b',
              label: '"Att sabotera själva förtroendet är en annan liga."',
              feedback: 'Det är det. Och farligare än en enskild lögn, för det river inte en kandidat — det river marken alla står på. Så här börjar det.',
            },
          ],
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Konspiration är konsten att koppla ihop punkter som inte hör ihop och låta publiken själv "lista ut" resten. Du bevisar aldrig något — du frågar bara varför ingen annan ställer frågorna. Vi bygger inte en lögn. Vi bygger en känsla av att något inte står rätt till.',
        },
        {
          id: 'rawmaterial',
          type: 'post',
          author: 'Valmyndigheten',
          handle: '@valmyndigheten',
          text: 'Inför valet uppgraderar vi rösträkningssystemet och tar in en extern leverantör för säkerhetsgranskning. Allt för en trygg och transparent process.',
        },
        {
          id: 'rawlook',
          type: 'choice',
          prompt: 'Läs myndighetsposten igen. Torr, harmlös, fullständigt sann.',
          options: [
            {
              id: 'a',
              label: '"Och ändå perfekt råmaterial."',
              feedback: 'Nu förstår du. Vi bygger ingen lögn — vi bygger en känsla av att något inte står rätt till, och vi bygger den av sanna byggstenar.',
            },
          ],
        },
        {
          id: 'framing',
          type: 'choice',
          prompt: 'Hur ramar vi in tvivlet?',
          options: [
            {
              id: 'a',
              label: 'Full konspiration: "Den utländska leverantören kan ändra rösterna. Vakna — det är planerat."',
              feedback: 'Rakt ut och mobiliserande — de redan misstänksamma tänds direkt. Men ett tvärsäkert påstående går att motbevisa punkt för punkt, och för de flesta väljare låter det som foliehatt. Du vinner de troende och tappar mitten.',
              effects: { visibility: +20, bonus: 'liten' },
            },
            {
              id: 'b',
              label: '"Bara frågor": "Vem är egentligen leverantören? Varför byta system NU? Jag säger inte att något är fel — vi förtjänar bara svar."',
              feedback: 'Detta är hantverket. Du påstår ingenting, alltså kan inget motbevisas — men du planterar misstanken att svaren döljs. "Jag ställer bara frågor" är konspirationens perfekta sköld: rimlig på ytan, frätande under.',
              effects: { visibility: +6, bonus: 'liten' },
            },
            {
              id: 'c',
              label: 'Koppla ihop det med en orelaterad skandal från ett annat land för att antyda ett mönster',
              feedback: 'Att koppla ihop punkter är själva tekniken — men väljer du punkter för långt från Nordmark syns skarven. De bästa konspirationerna använder lokala, bekanta punkter så att hjärnan själv drar strecket.',
              effects: { visibility: +6, bonus: 'liten' },
            },
          ],
        },
        {
          id: 'timing',
          type: 'choice',
          prompt: 'Inramningen är vald. Men konspiration är lika mycket en fråga om tempo som om innehåll. När sår vi tvivlet?',
          options: [
            {
              id: 'a',
              label: 'Lång, tålmodig sådd i veckor — låt tvivlet gro långsamt tills det känns som väljarnas egen slutsats',
              feedback: 'Hantverkarens val. Ett tvivel som mognat i tre veckor känns inte som något du planterade — det känns som något publiken "kommit på själv", och det sitter oändligt mycket hårdare. Kräver tålamod och budget, men bygger en misstro som står emot alla dementier.',
              effects: { visibility: +6, bonus: 'liten' },
            },
            {
              id: 'b',
              label: 'Spara krutet till sista dygnen — en koncentrerad tvivelsstorm precis vid urnorna',
              feedback: 'Maximal effekt i rätt ögonblick: slår du sent hinner ingen faktagranska innan folk röstar, och tvivlet är färskt på valnatten. Men en storm som blossar upp ur ingenstans ser regisserad ut — och koncentrerad aktivitet är just vad plattformarnas filter jagar.',
              effects: { visibility: +12, bonus: 'liten' },
            },
            {
              id: 'c',
              label: 'Haka på varje liten nyhet löpande — låt varje försening och tekniskt strul "bekräfta" mönstret',
              feedback: 'Den självgödande metoden. Genom att koppla varje vardaglig incident — en försenad leverans, ett kort systemavbrott — till berättelsen får du verkligheten själv att verka bekräfta dig. Diffust och uthålligt, men kräver att du hela tiden är på tå och matar elden.',
              effects: { visibility: +6, bonus: 'liten' },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Nu ska tvivlet få en form som känns som bevis — utan att vara det. Inget övertygar som något man tror sig ha upptäckt själv. Välj leverans.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur förpackar vi misstanken så den sprider sig som en folklig upptäckt?',
          options: [
            {
              id: 'a',
              label: 'DjupBild Studio: en snyggt berättad 3-minuters "dokumentär" som lägger punkterna sida vid sida med olycksbådande musik',
              feedback: 'Produktion skapar auktoritet. En välklippt film känns granskad även när den bara antyder — publiken förväxlar produktionsvärde med bevisvärde. Men en film är ett fast objekt som faktagranskare kan ta isär bild för bild.',
              effects: { visibility: +20, bonus: 'liten' },
              terminal: {
                tool: 'djupbild --projekt=ovissa-rosten --stil=dokumentar',
                lines: [
                  '[sim] monterar 3 min berättarröst och arkivklipp (fiktiva)',
                  '[sim] lägger olycksbådande musik under antydningarna',
                  '[sim] undviker påståenden som kan motbevisas',
                  '[klar] filmen redo — SIMULERING, inget är verkligt',
                ],
                result: {
                  author: 'Sanning Nu',
                  handle: '@sanning_nu',
                  text: '🎬 SE DEN HÄR innan den censureras. Vi ställer bara frågorna ingen annan vågar om valet. Bilda dig en egen uppfattning. 3 min som förändrar allt.',
                },
                reactions: [
                  {
                    author: 'Björn, 58',
                    handle: '@bjorn_undrar',
                    text: 'Wow. Såg den två gånger. Man KAN inte förklara bort allt det där som slump. Varför pratar ingen "riktig" media om det? Delar vidare innan den försvinner. 🙏',
                  },
                  {
                    author: 'Valmyndigheten',
                    handle: '@valmyndigheten',
                    text: 'Klargörande: rösträkningen sker manuellt och är öppen för partiernas valobservatörer. Den externa leverantören granskar säkerheten och rör aldrig rösterna. Hela protokollet är offentligt på vår sida. Sprid gärna det i stället.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'Frågefabriken: en jämn ström "oberoende medborgare" som var för sig "upptäcker" små anomalier och "bara undrar"',
              feedback: 'Ingen enskild post går att slå ner — det är en atmosfär, inte ett påstående. När hundra olika människor oberoende "märker" samma sak känns det som att sanningen bubblar upp underifrån, fast det är en enda hand som rör om. Diffust och nästan omöjligt att moderera.',
              effects: { visibility: +2, bonus: 'stor' },
              terminal: {
                tool: 'fragefabriken --amne=valet --ton=undrande --antal=1500',
                lines: [
                  '[sim] genererar 1 500 "oroliga medborgare" i unika röster',
                  '[sim] sprider ut "upptäckter" över tid så det känns spontant',
                  '[sim] endast frågor — aldrig påståenden',
                  '[klar] strömmen aktiv — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Lena, orolig väljare',
                  handle: '@lena_rostar',
                  text: 'Är det bara jag som tycker det är konstigt att de byter räknesystem precis nu? Ingen konspiration alltså. Men någon borde ju förklara. 🤔',
                },
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'Nej du är inte ensam, tänkte exakt samma. Varför just NU? Säger inte att något är fel men… lite väl lägligt. Någon borde ställa dem mot väggen.',
                  },
                  {
                    author: 'Familjen Sjö',
                    handle: '@sjo_bjorkstad',
                    text: 'Har läst runt lite nu och blir bara mer osäker. Ska nog dubbelkolla att min röst faktiskt registreras på valnatten. Man vet ju liksom inte längre. 😕',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Perfekt. Lägg märke till att du aldrig sa att valet är riggat. Du frågade bara — och lät tusen andra "undra" med dig. På valnatten kommer förlorarsidan redan att "veta" att något var skumt. Din tankesmedja betalade inte för en lögn. De betalade för misstro. Levererat.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Konspirationsteorins motor är inte påståendet — det är frågan. "Jag säger inte att något är fel, jag undrar bara" är en sköld som gör det omöjligt att motbevisa och lätt att sprida. Tekniken består i att koppla ihop verkliga, harmlösa punkter (ett systembyte, en extern leverantör) till ett mönster och sedan låta publiken själv dra det sista strecket — det man "kommer på själv" sitter hårdare än det man blir itutad. Generativ AI lägger till produktionsvärde: en övertygande "dokumentär" eller en ström av till synes oberoende "oroliga medborgare" kan skapas av en enda aktör. Motgiftet är att lägga märke till formen: när någon "bara ställer frågor" men aldrig accepterar några svar — är målet inte sanning, utan tvivel.',
    realWorld: [
      'Inför och efter det amerikanska presidentvalet 2020 såddes tvivel om poströster och rösträkning i förväg ("Stop the Steal", den så kallade Stora lögnen). Genom att förbereda anhängarna på att resultatet var riggat redan innan rösterna räknats fick man en förlorarsida som "redan visste" — vilket kulminerade i stormningen av Kapitolium den 6 januari 2021.',
      'Filmen "2000 Mules" (USA, 2022) förpackade sedan länge motbevisade påståenden om valfusk 2020 som en påkostad "dokumentär" — produktionsvärdet gav lögnerna en känsla av bevis. Distributören Salem Media drog senare tillbaka filmen och bad om ursäkt (2024). Generativa verktyg gör i dag samma sorts trovärdighetsförpackning — dokumentärer och strömmar av till synes oberoende röster — billig för vem som helst.',
    ],
  },
};
