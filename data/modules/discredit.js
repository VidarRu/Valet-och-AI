// Kärnspel — Badge 2: Misskreditering
// Klient: kandidatkampanj. Metod: fabricerade dokument vs syntetiskt tvivel.

export default {
  id: 'core-discredit',
  type: 'core',
  badge: 'discredit',
  title: 'Skjut budbäraren',
  client: {
    name: 'Anton Bergs valkampanj',
    description: 'Staben kring Anton Berg, en populistisk utmanare som klättrar snabbt i mätningarna.',
    goal: 'Neutralisera en faktagranskning som visar att Bergs stora vallöfte bygger på en felläst siffra — innan den fäster.',
    fee: '95 000 kr, samt en plats i "kommunikationsteamet" om han vinner.',
  },
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Ny klient, nytt problem. Anton Berg klättrar — tills Faktakollen publicerade en granskning som visar att hans siffra om vårdköerna är påhittad. Att den är sann är irrelevant. Att den sprids är problemet. Vi kan inte ta bort granskningen. Men vi kan se till att ingen litar på den som skrev den.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Detta är misskreditering. När du inte kan bemöta budskapet så förstör du budbäraren. Faktagranskaren heter Nadia Holm. Från och med nu är hon inte en journalist. Hon är en agenda med presskort.',
        },
        {
          id: 'debunk',
          type: 'post',
          author: 'Faktakollen',
          handle: '@faktakollen',
          text: 'GRANSKNING: Anton Bergs påstående att vårdköerna "tredubblats" stämmer inte. Siffran är felläst ur en tabell. Källor och rådata i tråden. 🧵',
        },
        {
          id: 'nadia',
          type: 'post',
          author: 'Nadia Holm',
          handle: '@nadiaholm',
          text: 'Vi granskar alla partier med exakt samma metod. Underlaget är öppet — läs det och bedöm själv.',
        },
        {
          id: 'angle',
          type: 'choice',
          prompt: 'Hon är saklig, trovärdig och har rådatan öppen. Just därför måste vi flytta samtalet från vad hon SÄGER till vem hon ÄR. Vilken vinkel?',
          options: [
            {
              id: 'a',
              label: 'Fabricera en läckt skärmdump där hon "erkänner" att Faktakollen tar betalt av motståndaren',
              feedback: 'En rykande pistol. Tror folk på den är hennes trovärdighet borta över en natt. Men en fabricerad skärmdump är ett fysiskt bevis som kan motbevisas — spricker metadatan eller kommer en dementi blir förfalskningen DIN skandal, inte hennes.',
              effects: { followers: 900, credibility: -15 },
            },
            {
              id: 'b',
              label: 'Så tvivel utan bevis: "Vem finansierar egentligen Faktakollen? Varför alltid samma sida? Jag bara frågar."',
              feedback: 'Fegare och mycket effektivare. Du påstår ingenting som kan motbevisas — du ställer bara "frågor". Misstanken gör jobbet och du har ren ryggtavla. Långsammare, men det finns inget att avslöja.',
              effects: { followers: 400, credibility: -5 },
            },
            {
              id: 'c',
              label: 'Gräv i hennes privatliv efter något pinsamt och koppla det till yrket',
              feedback: 'Möjligt, men riskabelt och ofta verkningslöst — ett gammalt snedsteg säger inget om huruvida siffran stämmer, och publiken ser skillnaden. Personangrepp utan koppling till trovärdigheten studsar tillbaka som ren mobbning.',
              effects: { followers: 200, credibility: -9 },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Oavsett vinkel måste det se ut att komma nerifrån — från vanligt folk, inte från Bergs stab. Ingen tror på en anklagelse som luktar kampanj. Hur producerar vi "gräsrötterna"?',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur får vi tvivlet att spridas som en spontan folklig misstanke?',
          options: [
            {
              id: 'a',
              label: 'Dokumentsmedjan: generera en trovärdig "läckt" mejltråd om Faktakollens dolda finansiering',
              feedback: 'Syntetiska dokument övertygar — tills någon granskar dem på riktigt. Ett fabricerat bevis kan välta henne, eller dig om en enda detalj inte håller. Hög insats, binärt utfall: antingen sänker det henne, eller så blir förfalskningen storyn.',
              effects: { followers: 1100, credibility: -13 },
              terminal: {
                tool: 'dokumentsmedjan --typ=epost --amne=finansiering',
                lines: [
                  '[sim] genererar fiktiv mejltråd med trovärdiga rubriker',
                  '[sim] åldrar tidsstämplar och signaturer',
                  '[varning] metadata kan avslöja förfalskningen vid granskning',
                  '[klar] "läcka" redo — SIMULERING, inget är äkta',
                ],
                result: {
                  author: 'Granskaren Granskas',
                  handle: '@vem_betalar',
                  text: 'LÄCKT: interna mejl antyder att "oberoende" Faktakollen får pengar från en stiftelse kopplad till oppositionen. Så mycket för neutralt. Dela innan det tas bort.',
                },
              },
            },
            {
              id: 'b',
              label: 'Ryktesväven: tusen "vanliga läsare" som var och en "undrar" över finansieringen, i tusen ordval',
              feedback: 'Inga bevis, bara atmosfär. När hundra olika röster ställer samma fråga känns frågan berättigad — det är sanningens illusion genom upprepning. Ingenting att motbevisa, allt att misstänka. Långsammare, men praktiskt taget osänkbart.',
              effects: { followers: 600, credibility: -6 },
              terminal: {
                tool: 'ryktesvaven --tema=vem-finansierar --ton=undrande --antal=1000',
                lines: [
                  '[sim] genererar 1 000 "oberoende" undrande inlägg',
                  '[sim] slumpar stavfel och vardagligt tonläge',
                  '[sim] undviker påståenden — endast frågor',
                  '[klar] atmosfär skapad — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Micke',
                  handle: '@micke_pendlare',
                  text: 'Ingen konspiration liksom… men varför granskar Faktakollen alltid bara ena sidan? Vem betalar deras löner egentligen? Helt seriös fråga.',
                },
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Lägg märke till vad vi INTE gjorde: vi rörde aldrig siffran om vårdköerna. Den var ju sann — granskningen alltså. Men nu läser ingen den utan att undra om Nadia har en dold agenda. Budskapet lever, budbäraren blöder. Vidare.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Misskreditering är propagandans självförsvar. Den aktiveras i samma ögonblick som någon börjar avslöja dig: i stället för att försvara ett ohållbart påstående flyttar du elden till den som bär fram sanningen — journalisten, forskaren, faktagranskaren. Poängen är inte att bevisa att de har fel, utan att göra publiken så osäker på deras motiv att de slutar lyssna. Generativ AI gör förfalskade "bevis" — skärmdumpar, mejl, dokument — billiga att massproducera, men den farligaste varianten kräver inga bevis alls: bara tusen röster som "bara ställer en fråga". Motgiftet: när någons trovärdighet plötsligt attackeras hårdare än deras argument — fråga varför.',
    realWorld: [
      'I ett lokalt amerikanskt val 2024 användes generativ AI för att massproducera falska "nyhetsartiklar" som svartmålade en kandidats motståndare — fabricerat innehåll paketerat för att se ut som riktig journalistik.',
      'Journalister och faktagranskare är återkommande måltavlor: går sakinnehållet inte att bemöta riktas attacken i stället mot deras finansiering, motiv eller person.',
    ],
  },
};
