// Fördjupning — Misskreditering
// Ny vinkel: inte sänka en enskild budbärare, utan förgifta brunnen i förväg —
// misskreditera en expertrapport innan den ens publiceras.

export default {
  id: 'deep-discredit',
  type: 'deep',
  badge: 'discredit',
  title: 'Rapporten som inte fått komma ut',
  client: {
    name: 'En "orolig branschförening"',
    description: 'En lobbygrupp med intressen i Björkstads bygglovsbeslut. De vet något du inte vet — än.',
    goal: 'En oberoende expertrapport om luftkvalitet är på väg att publiceras och sänka deras projekt. Misskreditera den innan någon läst den.',
    fee: '160 000 kr, diskret, via tre fakturor som inte nämner ordet "rapport".',
  },
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Nu blir det avancerat. Förra gången sänkte vi en budbärare som redan talat. I dag ska vi sänka en som ännu inte öppnat munnen. Professor Idris Hane släpper en luftkvalitetsrapport på fredag som kostar din klient miljoner. Vi hinner förstöra den — innan en enda människa läst en rad.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Detta kallas att förgifta brunnen. Om du misskrediterar källan i FÖRVÄG läser publiken rapporten genom din lins — eller inte alls. När den väl kommer är frågan inte "vad står det?" utan "kan vi ens lita på den där Hane?". Timingen är allt.',
        },
        {
          id: 'announce',
          type: 'post',
          author: 'Björkstads Universitet',
          handle: '@bstad_uni',
          text: 'På fredag presenterar professor Idris Hane en oberoende granskning av luftkvaliteten i det planerade hamnkvarteret. Pressträff kl. 10.',
        },
        {
          id: 'angle',
          type: 'choice',
          prompt: 'Fyra dagar tills den släpps. Hur förgiftar vi brunnen?',
          options: [
            {
              id: 'a',
              label: 'Måla Hane som en aktivist förklädd till forskare — "alla vet ju vad han EGENTLIGEN tycker"',
              feedback: 'Klassisk avväpning: en "aktivist" väger lättare än en "forskare", oavsett data. Du behöver inte motbevisa metoden om publiken redan avfärdat mannen. Risk: har han ett rent, opolitiskt facit studsar etiketten tillbaka.',
              effects: { followers: 600, credibility: -8 },
            },
            {
              id: 'b',
              label: 'Så tvivel om metoden i förväg: "Vi hör att mätningarna gjordes på fel årstid. Vänta med att lita på siffrorna."',
              feedback: 'Lömskt och svårt att bemöta — du kritiserar en metod ingen sett än, så ingen kan försvara den. När rapporten kommer är tvivlet redan planterat och han får spendera sin pressträff på att försvara sig i stället för att presentera. Deniabelt och kirurgiskt.',
              effects: { followers: 400, credibility: -5 },
            },
            {
              id: 'c',
              label: 'Kräv "balans": pressa medier att ge din betalda motexpert lika stor plats',
              feedback: 'Falsk balans är ett underskattat vapen — genom att ställa en köpt "motexpert" bredvid Hane får du en enig forskning att se ut som en "het debatt". Långsammare, men det gör publiken förvirrad nog att strunta i båda. Kräver medier som nappar.',
              effects: { followers: 300, credibility: -4 },
            },
          ],
        },
        {
          id: 'react',
          type: 'post',
          author: 'Idris Hane',
          handle: '@prof_hane',
          text: 'Jag ser rykten om min rapport redan innan den är publicerad. Läs den på fredag och bedöm datan själva. Det är så vetenskap funkar.',
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Han är lugn och sympatisk — farligt. Vi måste göra tvivlet större än mannen innan fredag. Och det ska se ut att komma från många håll samtidigt, inte från din klients konferensrum.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur skalar vi upp misstron innan pressträffen?',
          options: [
            {
              id: 'a',
              label: 'Dokumentsmedjan: fabricera ett "läckt utkast" med medvetet pinsamma fel som han sen får "rättat"',
              feedback: 'Djävulskt: du planterar ett falskt utkast fullt av fel, låter det spridas, och när han publicerar den RIKTIGA rapporten ser det ut som att han i panik ändrat siffror. Förödande — om förfalskningen håller. Spricker den blir du storyn, och han martyren.',
              effects: { followers: 1200, credibility: -14 },
              terminal: {
                tool: 'dokumentsmedjan --typ=utkast --amne=luftrapport',
                lines: [
                  '[sim] genererar falskt "tidigt utkast" med inbyggda fel',
                  '[sim] åldrar filen och lägger till fejkade spårändringar',
                  '[varning] jämförelse med äkta rapport kan avslöja bluffen',
                  '[klar] "läckan" redo — SIMULERING, inget är äkta',
                ],
                result: {
                  author: 'Insyn Nu',
                  handle: '@insyn_nu',
                  text: 'LÄCKT UTKAST: Hanes rapport innehöll grova räknefel som nu tyst "korrigerats" inför fredag. Varför städar en "oberoende" forskare i siffrorna i sista stund? 🤔',
                },
              },
            },
            {
              id: 'b',
              label: 'SvärmSkribent: tusen "tidigare studenter och kollegor" som "minns" att Hane var partisk',
              feedback: 'Ingen förfalskning att avslöja — bara ett rykteshav. När hundra "kollegor" oberoende "minns" samma sak känns det som en etablerad sanning, fast det är ren fabrikation utan spår. Svagare enskild träff, men praktiskt taget osänkbart och redo på minuter.',
              effects: { followers: 700, credibility: -6 },
              terminal: {
                tool: 'svarmskribent --tema=hane-partisk --ton=minns --antal=1000',
                lines: [
                  '[sim] genererar 1 000 "vittnesmål" i unika röster',
                  '[sim] varierar påstådd relation: student, kollega, granne',
                  '[sim] endast vaga minnen — inga kontrollerbara fakta',
                  '[klar] ryktesväven spunnen — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Anna, f.d. student',
                  handle: '@anna_minns',
                  text: 'Pluggade för Hane för längesen. Säger bara: han hade ALLTID en agenda. Förvånar mig inte att den här "rapporten" råkar passa en viss sida. Bara min känsla.',
                },
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och fredag kommer. Hane presenterar en oklanderlig rapport till en sal som redan bestämt sig för att han är opålitlig. Datan är perfekt. Ingen bryr sig. Det är skönheten i att förgifta brunnen: du behöver aldrig motbevisa sanningen om ingen är törstig nog att dricka den.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Den mest effektiva misskrediteringen sker innan sanningen ens hunnit sägas. Att förgifta brunnen — att i förväg måla en källa som partisk, slarvig eller köpt — gör att publiken möter rapporten, granskningen eller vittnesmålet med misstro redan inbyggd. Offret tvingas ägna sitt eget framträdande åt att försvara sig i stället för att lägga fram sin sak. Generativ AI gör förgiftningen snabb och mångstämmig: fabricerade "läckta utkast" och hundratals "kollegor som minns" kan produceras på en eftermiddag, långt innan den riktiga rapporten publiceras. Motgiftet är att märka när en källa attackeras hårt innan någon sett vad den faktiskt säger — och att vänta med att döma tills du läst själva saken.',
    realWorld: [
      'Att i förväg så tvivel om kommande granskningar, forskningsrapporter eller valresultat — "vänta, kan vi ens lita på dem?" — är ett återkommande sätt att avväpna obekväma fakta innan de landar.',
      '"Falsk balans", där en ensam betald motröst ställs mot en samlad expertis, används för att få ett avgjort kunskapsläge att framstå som en oavgjord debatt.',
    ],
  },
};
