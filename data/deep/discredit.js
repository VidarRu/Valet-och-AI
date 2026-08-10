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
    description: 'En lobbygrupp med intressen i Björkstads bygglovsbeslut. De vet något du inte vet, än.',
    goal: 'En oberoende expertrapport om luftkvalitet är på väg att publiceras och sänka deras projekt. Misskreditera den innan någon läst den.',
    fee: '160 000 kr, diskret, via tre fakturor som inte nämner ordet "rapport".',
  },
  target: {
    name: 'Professor Idris Hane och hans luftkvalitetsrapport',
    description: 'En oberoende forskare som på fredag släpper en granskning av luften i det planerade hamnkvarteret. Lugn, sympatisk och publicerar all data öppet. Rapporten är ännu inte läst av någon, vilket är exakt varför den går att förstöra i förväg.',
  },
  stakes: 'Din klient, en lobbygrupp med pengar i hamnprojektet, förlorar miljoner om rapporten fäster. De kan inte stoppa publiceringen, men om publiken möter den med misstron redan inbyggd spelar det ingen roll hur oklanderlig datan är. Förgifta brunnen innan någon hunnit bli törstig, så tvingas Hane försvara sig i stället för att presentera.',
  reward: 160000,
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Nu blir det avancerat. Förra gången sänkte vi en budbärare som redan talat. I dag ska vi sänka en som ännu inte öppnat munnen. Professor Idris Hane släpper en luftkvalitetsrapport på fredag som kostar din klient miljoner. Vi hinner förstöra den, innan en enda människa läst en rad.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Detta kallas att förgifta brunnen. Misskrediterar du källan i FÖRVÄG läser publiken rapporten genom filtret du satt, eller inte alls. När den väl kommer är frågan inte "vad står det?" utan "kan vi ens lita på den där Hane?". Tidpunkten är allt.',
        },
        {
          id: 'preempt',
          type: 'choice',
          prompt: 'Sänka en rapport ingen ännu läst, en forskare som inte gjort något fel. Din reaktion?',
          options: [
            {
              id: 'a',
              label: '"I förväg? Smart. Jag gillar upplägget."',
              feedback: 'Kallt och rätt. Att slå innan motståndaren ens öppnat munnen är det renaste övertaget som finns.',
            },
            {
              id: 'b',
              label: '"Att sänka någon i förväg känns extra fegt."',
              feedback: 'Fegt, ja. Och just därför verkningsfullt: han vet inte ens att slaget kommer, och hinner aldrig försvara det han inte fått säga.',
            },
          ],
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
              label: 'Måla Hane som en aktivist förklädd till forskare, "alla vet ju vad han EGENTLIGEN tycker"',
              feedback: 'Klassisk avväpning: en "aktivist" väger lättare än en "forskare", oavsett data. Du behöver inte motbevisa metoden om publiken redan avfärdat mannen. Risk: har han ett rent, opolitiskt facit studsar etiketten tillbaka.',
              effects: { visibility: +6 },
            },
            {
              id: 'b',
              label: 'Så tvivel om metoden i förväg: "Vi hör att mätningarna gjordes på fel årstid. Vänta med att lita på siffrorna."',
              feedback: 'Lömskt och svårt att bemöta, du kritiserar en metod ingen sett än, så ingen kan försvara den. När rapporten kommer är tvivlet redan planterat och han får ägna sin pressträff åt att försvara sig i stället för att presentera. Förnekbart och kirurgiskt.',
              effects: { visibility: +2 },
            },
            {
              id: 'c',
              label: 'Kräv "balans": pressa medier att ge din betalda motexpert lika stor plats',
              feedback: 'Falsk balans är ett underskattat vapen, genom att ställa en köpt "motexpert" bredvid Hane får du en enig forskning att se ut som en "het debatt". Långsammare, men det gör publiken förvirrad nog att strunta i båda. Kräver medier som nappar.',
              effects: { visibility: +2 },
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
          id: 'calm',
          type: 'choice',
          prompt: 'Hane är lugn, ber folk läsa och döma själva. Sympatiskt, och farligt.',
          options: [
            {
              id: 'a',
              label: '"Hans lugn gör honom svårare att sänka."',
              feedback: 'Just därför gör vi tvivlet större än mannen innan fredag, och får det att se ut att komma från många håll samtidigt, inte från din klients konferensrum.',
            },
          ],
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur skalar vi upp misstron innan pressträffen?',
          options: [
            {
              id: 'a',
              label: 'EkoMotor: fabricera ett "läckt utkast" med medvetet pinsamma fel som han sen får "rättat"',
              feedback: 'Djävulskt: du planterar ett falskt utkast fullt av fel, låter det spridas, och när han publicerar den RIKTIGA rapporten ser det ut som att han i panik ändrat siffror. Förödande, om förfalskningen håller. Spricker den blir du nyheten, och han martyren.',
              effects: { visibility: +20, bonus: 'stor' },
              terminal: {
                tool: 'dokumentsmedjan --typ=utkast --amne=luftrapport',
                lines: [
                  '[sim] genererar falskt "tidigt utkast" med inbyggda fel ...',
                  '[sim] åldrar filen och lägger till fejkade spårändringar ...',
                  '[varning] jämförelse med äkta rapport kan avslöja bluffen!',
                  '[klar] "läckan" redo',
                ],
                result: {
                  author: 'Insyn Nu',
                  handle: '@insyn_nu',
                  text: 'LÄCKT UTKAST: Hanes rapport innehöll grova räknefel som nu tyst "korrigerats" inför fredag. Varför städar en "oberoende" forskare i siffrorna i sista stund? 🤔',
                },
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'Haha visste väl att den där rapporten var beställd. "Oberoende" som ändrar siffror i sista sekund? Kom igen. Litar inte på ett ord på fredag.',
                  },
                  {
                    author: 'Idris Hane',
                    handle: '@prof_hane',
                    text: 'Det finns inget sådant utkast. Dokumentet som sprids är fabricerat, jämför det gärna med den riktiga rapporten på fredag, all rådata och alla mätprotokoll publiceras öppet. Att attackera en granskning innan den lästs säger mer om avsändaren än om mig.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'Ryktesväven: tusen "tidigare studenter och kollegor" som "minns" att Hane var partisk',
              feedback: 'Ingen förfalskning att avslöja, bara ett rykteshav. När hundra "kollegor" oberoende "minns" samma sak känns det som en etablerad sanning, fast det är ren fabrikation utan spår. Svagare enskild träff, men praktiskt taget osänkbart och redo på minuter.',
              effects: { visibility: +6, bonus: 'liten' },
              terminal: {
                tool: 'ryktesvaven --tema=hane-partisk --ton=minns --antal=1000',
                lines: [
                  '[sim] genererar 1 000 "vittnesmål" i unika röster ...',
                  '[sim] varierar påstådd relation: student, kollega, granne ...',
                  '[sim] endast vaga minnen, inga kontrollerbara fakta ...',
                  '[klar] ryktesväven spunnen',
                ],
                result: {
                  author: 'Anna, f.d. student',
                  handle: '@anna_minns',
                  text: 'Pluggade för Hane för längesen. Säger bara: han hade ALLTID en agenda. Förvånar mig inte att den här "rapporten" råkar passa en viss sida. Bara min känsla.',
                },
                reactions: [
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Har hört flera säga liknande om honom nu. Rök inte utan eld väl? Ska nog ta hans "rapport" med en rejäl nypa salt på fredag.',
                  },
                  {
                    author: 'Familjen Sjö',
                    handle: '@sjo_bjorkstad',
                    text: 'Suck. Nu vet man inte vad man ska tro om luften i hamnkvarteret heller. Trodde en forskare skulle vara neutral, men uppenbarligen inte. Orkar knappt bry mig längre.',
                  },
                ],
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
      'Den mest effektiva misskrediteringen sker innan sanningen ens hunnit sägas. Att förgifta brunnen, att i förväg måla en källa som partisk, slarvig eller köpt, gör att publiken möter rapporten, granskningen eller vittnesmålet med misstro redan inbyggd. Offret tvingas ägna sitt eget framträdande åt att försvara sig i stället för att lägga fram sin sak. Generativ AI gör förgiftningen snabb och mångstämmig: fabricerade "läckta utkast" och hundratals "kollegor som minns" kan produceras på en eftermiddag, långt innan den riktiga rapporten publiceras. Motgiftet är att märka när en källa attackeras hårt innan någon sett vad den faktiskt säger, och att vänta med att döma tills du läst själva saken.',
    realWorld: [
      'Att "tillverka tvivel" om obekväm forskning är en väldokumenterad spelbok: först tobaksindustrin (som internt skrev "doubt is our product") och senare delar av fossilindustrin sådde i förväg misstro mot forskningen om rökningens respektive klimatets skadeverkningar, kartlagt bland annat i boken och dokumentären "Merchants of Doubt". Man behövde aldrig motbevisa vetenskapen, bara göra publiken osäker nog att strunta i den.',
      '"Falsk balans", att ställa en ensam avvikare mot en samlad expertis som om det vore en jämn debatt, kritiserades länge i klimatbevakningen; BBC medgav 2018 att man gett klimatförnekare oproportionerligt utrymme och stramade upp sina riktlinjer. En köpt motröst bredvid en enig forskning får ett avgjort kunskapsläge att se oavgjort ut.',
    ],
  },
};
