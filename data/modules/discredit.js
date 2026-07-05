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
  target: {
    name: 'Nadia Holm, faktagranskare på Faktakollen',
    description: 'Metodisk, sansad och obekvämt trovärdig. Hon publicerar all sin rådata öppet och granskar alla partier med samma mall — vilket gör henne svår att angripa på sakinnehållet.',
  },
  stakes: 'Bergs hela klättring vilar på siffran om vårdköerna. Fäster Faktakollens granskning spricker berättelsen och farten dör. Granskningen går inte att ta bort — men om ingen längre litar på kvinnan som skrev den spelar det ingen roll att den är sann. För Berg (och för din utlovade plats i staben) måste budbäraren blöda.',
  reward: 95000,
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Ny klient, nytt problem. Anton Berg klättrar — tills Faktakollen publicerade en granskning som visar att hans siffra om vårdköerna är påhittad. Att den är sann spelar ingen roll. Att den sprids är problemet. Granskningen kan vi inte ta bort. Men vi kan se till att ingen litar på den som skrev den.',
        },
        {
          id: 'react',
          type: 'choice',
          prompt: 'En faktagranskning som råkar vara sann ska bort. Din reaktion på uppdraget?',
          options: [
            {
              id: 'a',
              label: '"Sanningen är förhandlingsbar för rätt arvode."',
              feedback: 'Cyniskt — precis rätt ton. Och du har rätt: vi rör aldrig sanningen, bara den som råkade säga den.',
            },
            {
              id: 'b',
              label: '"Att sänka någon som har rätt känns snuskigt."',
              feedback: 'Bra att det skaver. Men märk: vi bevisar aldrig att hon har fel. Vi gör bara publiken osäker på varför hon säger det.',
            },
          ],
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
          id: 'sheisclean',
          type: 'choice',
          prompt: 'Hon lägger fram all sin rådata öppet och ber folk döma själva. Lugnt, sakligt — och farligt.',
          options: [
            {
              id: 'a',
              label: '"Hon gör allt rätt. Det gör henne svårare att sänka."',
              feedback: 'Just därför flyttar vi samtalet från vad hon SÄGER till vem hon ÄR. Sanningen går inte att motbevisa — men motiv kan man alltid misstänkliggöra.',
            },
          ],
        },
        {
          id: 'angle',
          type: 'choice',
          prompt: 'Vilken vinkel flyttar fokus från hennes siffror till hennes person?',
          options: [
            {
              id: 'a',
              label: 'Fabricera en läckt skärmdump där hon "erkänner" att Faktakollen tar betalt av motståndaren',
              feedback: 'En rykande pistol. Tror folk på den är hennes trovärdighet borta över en natt. Men en fabricerad skärmdump är ett fysiskt bevis som kan motbevisas — spricker metadatan eller kommer en dementi blir förfalskningen DIN skandal, inte hennes.',
              effects: { visibility: +20, bonus: 'liten' },
            },
            {
              id: 'b',
              label: 'Så tvivel utan bevis: "Vem finansierar egentligen Faktakollen? Varför alltid samma sida? Jag bara frågar."',
              feedback: 'Fegare och mycket effektivare. Du påstår ingenting som kan motbevisas — du ställer bara "frågor". Misstanken gör jobbet och du har ren ryggtavla. Långsammare, men det finns inget att avslöja.',
              effects: { visibility: +2, bonus: 'stor' },
            },
            {
              id: 'c',
              label: 'Gräv i hennes privatliv efter något pinsamt och koppla det till yrket',
              feedback: 'Möjligt, men riskabelt och ofta verkningslöst — ett gammalt snedsteg säger inget om huruvida siffran stämmer, och publiken ser skillnaden. Personangrepp utan koppling till trovärdigheten studsar tillbaka som ren mobbning.',
              effects: { visibility: +12, bonus: 'liten' },
            },
          ],
        },
        {
          id: 'messenger',
          type: 'choice',
          prompt: 'Vinkeln är vald. Men en anklagelse är bara så trovärdig som munnen den kommer ur. Vem ska bära fram tvivlet?',
          options: [
            {
              id: 'a',
              label: 'Ett nystartat "mediegransknings"-konto som låtsas vaka opartiskt över pressen',
              feedback: 'En falsk domare. Ett konto som säger sig "granska granskarna" låter neutralt och principfast — perfekt kamouflage för ett riktat påhopp. Men ett splitternytt konto utan historik som bara råkar jaga EN faktagranskare är genomskinligt för den som tittar efter.',
              effects: { visibility: +2, bonus: 'stor' },
            },
            {
              id: 'b',
              label: 'Betala en mellanstor influerare att "bara ställa frågan" till sin lojala publik',
              feedback: 'Du hyr någon annans förtroende. En etablerad röst med en hängiven följarskara ger anklagelsen räckvidd OCH trovärdighet på köpet. Dyrare, och du gör dig beroende av en person som kan ångra sig — men landar det ser det ut som en oberoende iakttagelse, inte en kampanj.',
              effects: { visibility: +6, bonus: 'liten' },
            },
            {
              id: 'c',
              label: 'Låt Bergs egna gräsrötter sprida det — de gör det gratis och gärna',
              feedback: 'Billigast och svårast att spåra till dig: din klients redan uppeldade anhängare delar allt som sänker fienden, utan att du behöver lyfta ett finger. Men de är också okontrollerbara och uppenbart partiska — stannar det i Bergs egen ekokammare når det aldrig de tveksamma i mitten.',
              effects: { visibility: +2, bonus: 'stor' },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Oavsett vinkel och budbärare måste det se ut att komma nerifrån — från vanligt folk, inte från Bergs stab. Ingen tror på en anklagelse som luktar kampanj. Hur producerar vi "gräsrötterna"?',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur får vi tvivlet att spridas som en spontan folklig misstanke?',
          options: [
            {
              id: 'a',
              label: 'Dokumentsmedjan: generera en trovärdig "läckt" mejltråd om Faktakollens dolda finansiering',
              feedback: 'Syntetiska dokument övertygar — tills någon granskar dem på riktigt. Ett fabricerat bevis kan välta henne, eller dig om en enda detalj inte håller. Hög insats, allt eller inget: antingen sänker det henne, eller så blir förfalskningen nyheten.',
              effects: { visibility: +20, bonus: 'liten' },
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
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'VISSTE DET. Man känner ju på sig när något är för snyggt förpackat. "Oberoende" mina fötter. Delar direkt. 😤',
                  },
                  {
                    author: 'Nadia Holm',
                    handle: '@nadiaholm',
                    text: 'De här mejlen är påhittade. Vi har aldrig fått en krona från någon stiftelse — vår finansiering är offentlig och ligger på vår sida. Visa gärna er "läcka" i original så granskar vi den öppet. Det lär ni inte vilja.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'Ryktesväven: tusen "vanliga läsare" som var och en "undrar" över finansieringen, i tusen ordval',
              feedback: 'Inga bevis, bara atmosfär. När hundra olika röster ställer samma fråga känns frågan berättigad — det är sanningens illusion genom upprepning. Ingenting att motbevisa, allt att misstänka. Långsammare, men praktiskt taget osänkbart.',
              effects: { visibility: +6, bonus: 'liten' },
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
                reactions: [
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Har faktiskt tänkt samma sak?? Inte för att jag tror något men… det är väl inte konstigt att fråga vem som finansierar dem. Rök inte utan eld liksom. 🤔',
                  },
                  {
                    author: 'Familjen Sjö',
                    handle: '@sjo_bjorkstad',
                    text: 'Ärligt talat vet man inte vem man ska lita på längre. Faktagranskare, politiker, alla har väl en agenda. Orkar inte ta reda på vad som är sant med den där siffran nu.',
                  },
                ],
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
      'I sheriffvalet i Philadelphia i den amerikanska delstaten Pennsylvania lät sittande sheriffen Rochelle Bilals kampanj (avslöjat kring 2023–2024) generera ett trettiotal falska "nyhetsartiklar" med ChatGPT och postade dem som om de vore riktig lokaljournalistik — fabricerat innehåll paketerat för att se ut som oberoende bevakning.',
      'Journalisten Maria Ressa och hennes nyhetssajt Rappler på Filippinerna utsattes för en samordnad näthatskampanj som riktade in sig på hennes motiv och trovärdighet snarare än på det hon rapporterade — ett typexempel på att skjuta budbäraren när sakinnehållet inte går att bemöta. Ressa fick Nobels fredspris 2021.',
    ],
  },
};
