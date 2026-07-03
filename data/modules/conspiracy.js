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
          id: 'framing',
          type: 'choice',
          prompt: 'Se på den där myndighetsposten. Torr, harmlös, sann — och råmaterial i rätt händer. Hur ramar vi in tvivlet?',
          options: [
            {
              id: 'a',
              label: 'Full konspiration: "Den utländska leverantören kan ändra rösterna. Vakna — det är planerat."',
              feedback: 'Explicit och mobiliserande — de redan misstänksamma tänds direkt. Men ett tvärsäkert påstående går att motbevisa punkt för punkt, och för de flesta väljare låter det som foliehatt. Du vinner de troende och tappar mitten.',
              effects: { followers: 800, credibility: -14 },
            },
            {
              id: 'b',
              label: '"Bara frågor": "Vem är egentligen leverantören? Varför byta system NU? Jag säger inte att något är fel — vi förtjänar bara svar."',
              feedback: 'Detta är hantverket. Du påstår ingenting, alltså kan inget motbevisas — men du planterar misstanken att svaren döljs. "Jag ställer bara frågor" är konspirationens perfekta sköld: rimlig på ytan, frätande under.',
              effects: { followers: 500, credibility: -6 },
            },
            {
              id: 'c',
              label: 'Koppla ihop det med en orelaterad skandal från ett annat land för att antyda ett mönster',
              feedback: 'Att koppla ihop punkter är själva tekniken — men väljer du punkter för långt från Nordmark syns skarven. De bästa konspirationerna använder lokala, bekanta punkter så att hjärnan själv drar strecket.',
              effects: { followers: 300, credibility: -8 },
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
              effects: { followers: 1600, credibility: -12 },
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
              },
            },
            {
              id: 'b',
              label: 'Frågefabriken: en jämn ström "oberoende medborgare" som var för sig "upptäcker" små anomalier och "bara undrar"',
              feedback: 'Ingen enskild post går att slå ner — det är en atmosfär, inte ett påstående. När hundra olika människor oberoende "märker" samma sak känns det som att sanningen bubblar upp underifrån, fast det är en enda hand som rör om. Diffust och nästan omöjligt att moderera.',
              effects: { followers: 900, credibility: -5 },
              terminal: {
                tool: 'fragefabriken --amne=valet --ton=undrande --antal=1500',
                lines: [
                  '[sim] genererar 1 500 "oroliga medborgare" i unika röster',
                  '[sim] sprider ut "upptäckter" över tid för organisk känsla',
                  '[sim] endast frågor — aldrig påståenden',
                  '[klar] strömmen aktiv — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Lena, orolig väljare',
                  handle: '@lena_rostar',
                  text: 'Är det bara jag som tycker det är konstigt att de byter räknesystem precis nu? Ingen konspiration alltså. Men någon borde ju förklara. 🤔',
                },
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
      'Konspirationsteorins motor är inte påståendet — det är frågan. "Jag säger inte att något är fel, jag undrar bara" är en sköld som gör det omöjligt att motbevisa och lätt att sprida. Tekniken består i att koppla ihop verkliga, harmlösa punkter (ett systembyte, en extern leverantör) till ett mönster och sedan låta publiken själv dra det sista strecket — det man "kommer på själv" sitter hårdare än det man blir itutad. Generativ AI adderar produktionsvärde: en övertygande "dokumentär" eller en ström av till synes oberoende "oroliga medborgare" kan skapas av en enda aktör. Motgiftet är att lägga märke till formen: när någon "bara ställer frågor" men aldrig accepterar några svar — är målet inte sanning, utan tvivel.',
    realWorld: [
      'Att så tvivel om valets integritet i förväg — "jag frågar bara" om rösträkning, maskiner eller poströster — har blivit ett återkommande sätt att förbereda anhängare på att avvisa ett förlorat resultat.',
      'Generativa verktyg gör det billigt att producera material som ser granskat ut — påkostade "dokumentärer" eller strömmar av till synes oberoende röster — vilket får en ensam aktörs berättelse att likna en folklig upptäckt.',
    ],
  },
};
