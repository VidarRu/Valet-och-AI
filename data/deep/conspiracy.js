// Fördjupning — Konspiration
// Ny vinkel: inte en enskild valtvivel-story, utan att bygga en HEL
// konspirationsvärld och lotsa vanligt folk ner i kaninhålet.

export default {
  id: 'deep-conspiracy',
  type: 'deep',
  badge: 'conspiracy',
  title: 'Kaninhålet',
  client: {
    name: 'Institutet för Suveränitetsstudier',
    description: 'Din utländska tankesmedja är nöjd med tvivlet du sådde. Nu vill de ha något som lever kvar långt efter valet.',
    goal: 'Bygg inte en teori utan en hel gemenskap kring den — ett självförsörjande kaninhål som drar in vanliga, oroliga människor.',
    fee: 'Ännu ett "stipendium". Plus en not: "Vi mäter inte i röster, utan i troende."',
  },
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Sist planterade vi ett frö av tvivel. I dag bygger vi hela skogen. Din klient vill inte ha en teori — de vill ha en församling. En plats dit oroliga människor dras in, får ett svar på allt, en fiende att hata och vänner som "förstår". Det som växer där överlever alla val.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'En konspiration som lever är inte ett påstående — den är en identitet. Nyckeln är kaninhålet: en trappa av "upptäckter" där varje steg känns som din egen slutledning, och där gemenskapen belönar dig för att gå djupare. Vi bygger trappan och öppnar dörren.',
        },
        {
          id: 'seed',
          type: 'post',
          author: 'Vaken i Björkstad',
          handle: '@vaken_bstad',
          text: 'Är det bara jag som tycker att för mycket "råkar" hända samtidigt just nu? Byggena, elpriserna, det nya röstsystemet… börjar man dra i trådarna hänger allt ihop. Bara en känsla. Vem mer ser det?',
        },
        {
          id: 'gateway',
          type: 'choice',
          prompt: 'Vi har öppnat dörren. Vilken sorts människa lockar vi in först — och hur?',
          options: [
            {
              id: 'a',
              label: 'Rikta in dig på de redan oroliga: höga elräkningar, otrygghet — ge deras verkliga smärta en fiende',
              feedback: 'Det starkaste greppet. En konspiration fäster där det finns äkta smärta att förklara. Du hittar inte på oron — du kapar den och pekar ut en skyldig. Svårt att motbevisa, för känslan under är sann. Den som fått ord på sin frustration släpper den inte lätt.',
              effects: { followers: 700, credibility: -7 },
            },
            {
              id: 'b',
              label: 'Börja mjukt och "sansat" — inga utomjordingar, bara "kritiskt tänkande" och "ställ frågor"',
              feedback: 'Kaninhålets första trappsteg måste vara respektabelt. Ingen kliver rakt in i galenskapen — men "jag är bara källkritisk" är en dörr vem som helst går igenom. Sedan blir varje nästa steg bara en aning brantare. Genialiskt just för att det låter förnuftigt.',
              effects: { followers: 500, credibility: -5 },
            },
            {
              id: 'c',
              label: 'Gå direkt på storslagen totalteori: eliten, hemliga möten, alltihop på en gång',
              feedback: 'För brant, för snabbt. Kastar du hela världsbilden på en normal människa direkt skräms hon bort. Kaninhålet fungerar för att det lockar nedåt ett steg i taget — hoppar du över trappan tappar du alla utom de redan övertygade.',
              effects: { followers: 200, credibility: -9 },
            },
          ],
        },
        {
          id: 'community',
          type: 'post',
          author: 'Björn, 58',
          handle: '@bjorn_undrar',
          text: 'Tack för den här gruppen. Trodde jag var ensam om att känna att nåt är fel. Skönt att äntligen prata med folk som VÅGAR se. Läser på varje kväll nu.',
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Hör du Björn? Han är inte arg — han är tacksam. Han har hittat en gemenskap. Nu ska trappan ner byggas ut så att det alltid finns ett nästa steg, och alltid nya "bevis" att upptäcka. Vi behöver innehåll som aldrig sinar.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur håller vi kaninhålet fyllt med färskt material så gemenskapen aldrig tröttnar?',
          options: [
            {
              id: 'a',
              label: 'DjupBild Studio: en serie påkostade "avslöjande"-videor, varje del slutar på en cliffhanger',
              feedback: 'Produktion bygger både auktoritet och beroende. En serie med cliffhangers gör konspirationen till en följetong man MÅSTE se nästa del av — engagemanget håller gemenskapen varm. Men påkostade filmer är fasta objekt: en enda grundlig genomlysning kan rasera hela säsongen.',
              effects: { followers: 1600, credibility: -12 },
              terminal: {
                tool: 'djupbild --serie=kaninhalet --avsnitt=6 --cliffhangers',
                lines: [
                  '[sim] genererar 6 avsnitt med berättarröst (fiktiva)',
                  '[sim] lägger in cliffhangers och "nästa gång"-krokar',
                  '[sim] varvar äkta bilder med antydningar för trovärdighet',
                  '[klar] säsong 1 redo — SIMULERING, inget är verkligt',
                ],
                result: {
                  author: 'Sanning Nu',
                  handle: '@sanning_nu',
                  text: '🎬 AVSNITT 1: "Det de inte vill att du ska koppla ihop." Vi följer trådarna själva. Del 2 imorgon — och då blir det obehagligt. Prenumerera innan det tas ner.',
                },
              },
            },
            {
              id: 'b',
              label: 'SvärmSkribent: en dygnetruntström av "medlemmar" som delar egna "fynd" och hyllar varandra',
              feedback: 'Det självförsörjande kaninhålet. Genererade "medlemmar" som ständigt gör nya "upptäckter" och belönar varandra får det att kännas som en levande folkrörelse — och de troende härmar tonen och driver den vidare gratis. Diffust, billigt och nästan omöjligt att moderera bort.',
              effects: { followers: 1000, credibility: -6 },
              terminal: {
                tool: 'svarmskribent --miljo=kaninhalet --lage=gemenskap --antal=2000',
                lines: [
                  '[sim] genererar 2 000 "medlemmar" med egna personligheter',
                  '[sim] låter dem dela "fynd" och bekräfta varandra',
                  '[sim] belönar djupare inlägg med mest gensvar',
                  '[klar] gemenskapen självgår nu — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Maria (ny här)',
                  handle: '@maria_vaken',
                  text: 'Kollade upp det ni skrev igår och OJ. När man väl ser mönstret kan man inte sluta se det. Ni är de enda som är ärliga. Vad läser jag härnäst? 🙏',
                },
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och nu lever det utan dig. Björn och Maria rekryterar sina egna, försvarar tron mot "de sovande" och behöver inte längre en enda betald post. Du byggde inte en lögn — du byggde ett hem. Din tankesmedja mätte i troende, minns du? Räkna dem. Valet kommer och går. Det här stannar.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Den mäktigaste konspirationstekniken bygger inte en teori utan en gemenskap. Kaninhålet fungerar därför att det aldrig kräver ett stort språng: det börjar respektabelt ("jag är bara källkritisk"), fäster vid äkta smärta (elräkningar, otrygghet) och belönar varje steg nedåt med tillhörighet och bekräftelse. När människor väl investerat sin identitet och sina vänskaper i tron blir fakta maktlösa — att överge teorin vore att förlora sin gemenskap. Generativ AI gör hålet självförsörjande: oändliga "avslöjanden", cliffhanger-serier och tusentals uppmuntrande "medlemmar" kan produceras löpande tills de troende driver det vidare själva. Motgiftet är mänskligt, inte faktabaserat: att förstå att någon lockas av gemenskapen mer än av bevisen — och att inte stöta bort den som är på väg ut.',
    realWorld: [
      'Konspirationsgemenskaper växer typiskt genom en gradvis "kaninhåls"-process där tillhörighet och bekräftelse, inte bevis, håller kvar medlemmarna.',
      'Att rikta konspiratoriska budskap mot människor med verklig ekonomisk eller social oro är ett återkommande grepp — den äkta frustrationen ger den påhittade förklaringen fäste.',
    ],
  },
};
