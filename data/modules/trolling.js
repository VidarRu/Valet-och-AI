// Kärnspel — Badge 3: Trollning
// Klient: anonym kontakt. Metod: massprovokation vs generade memes.

export default {
  id: 'core-trolling',
  type: 'core',
  badge: 'trolling',
  title: 'Dränk hoppet',
  client: {
    name: 'Uppdragsgivaren (anonym)',
    description: 'Betalar i kryptovaluta, förskott, visar aldrig ansiktet. Du vet inte vem. Pengarna är äkta.',
    goal: 'Ta energin ur Vera Linds växande kampanj — hennes hoppfulla hashtag #FramtidenTillsammans går alldeles för bra.',
    fee: 'Betalt i krypto. Inga fakturor, inga frågor, inga spår.',
  },
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Nu blir det smutsigt — och välbetalt. En anonym uppdragsgivare vill döda stämningen kring Vera Lind. Hennes kampanj #FramtidenTillsammans sprider faktiskt hopp. Vidrigt, jag vet. Det ska vi fixa.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Trollning handlar inte om att övertyga. Det handlar om att förstöra rummet. Du kan inte argumentera bort hopp — men du kan dränka det i skit tills folk inte orkar vara med längre. Antingen kapar vi hennes symbol, eller så får vi henne att tappa masken.',
        },
        {
          id: 'vera',
          type: 'post',
          author: 'Vera Lind',
          handle: '@veralind',
          text: 'Tack Björkstad. 2 000 personer på torget ikväll som tror att politik kan vara hopp igen. Det här är #FramtidenTillsammans. 💚',
        },
        {
          id: 'strategy',
          type: 'choice',
          prompt: 'Tre sätt att förgifta brunnen. Vilket?',
          options: [
            {
              id: 'a',
              label: 'Kapa #FramtidenTillsammans — fyll den med så absurt, vidrigt innehåll att ingen seriös vill röra den',
              feedback: 'Kapning fungerar: dränks en hashtag i dynga blir den oanvändbar och kampanjen tappar sitt samlingsrop. Risk: förstör du den för uppenbart ser folk sabotaget — och sympatin går till henne.',
              effects: { followers: 500, credibility: -8 },
            },
            {
              id: 'b',
              label: 'Beta Vera själv — provocera tills hon svarar ilsket EN gång, och gör det svaret till hela storyn',
              feedback: 'Högriskspel med enorm utdelning. En lugn, hoppfull kandidat som brister och fräser förlorar hela sin varumärkespoäng på tre sekunder. Men bara om hon nappar — gör hon inte det har du bränt din energi och sett desperat ut.',
              effects: { followers: 300, credibility: -6 },
            },
            {
              id: 'c',
              label: 'Falsk flagg: låtsas vara Veras egna anhängare och var vidrig mot motståndarna, så rörelsen ser toxisk ut',
              feedback: 'Elegant och lömskt. Du behöver inte smutskasta Vera — du får hennes "supportrar" att göra det åt dig, mot andra, så att #FramtidenTillsammans luktar mobb. Svårare att genomskåda, men kräver att du håller masken perfekt.',
              effects: { followers: 700, credibility: -7 },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Bra. Nu ska giftet spridas snabbare än någon hinner moderera. Trollning lever på volym och tempo — och på att DU inte känner ansvar för en enda enskild kommentar. Välj verktyg.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur skalar vi upp giftet så det känns som en spontan flodvåg?',
          options: [
            {
              id: 'a',
              label: 'SvärmSkribent i provokationsläge: 5 000 svar under varje Vera-inlägg, precis giftiga nog att sänka tonen',
              feedback: 'Ren volym. Tempot är poängen — modererar de bort tusen dyker tvåtusen upp. Men en armé som skriver i samma sekund lämnar fotavtryck, och "Vera trakasseras av bottar" är en story som kan väcka just den sympati vi vill döda.',
              effects: { followers: 1800, credibility: -12 },
              terminal: {
                tool: 'svarmskribent --lage=provokation --mal=@veralind --antal=5000',
                lines: [
                  '[sim] genererar 5 000 provokationer i unika röster',
                  '[sim] kalibrerar giftnivå strax under raderingströskeln',
                  '[varning] samtidig aktivitet lämnar tydligt fotavtryck',
                  '[klar] svärmen redo — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'inte_en_bot_lol',
                  handle: '@framtiden_haha',
                  text: '#FramtidenTillsammans hahaha vilken framtid, den där soppan? 🤡 dela om du också spydde lite',
                },
              },
            },
            {
              id: 'b',
              label: 'MemeSmed: generera hundra hånfulla bilder som får Veras "hopp" att se naivt och löjligt ut',
              feedback: 'Skratt är dödligare än ilska. Det går inte att argumentera mot ett skämt — och en kandidat som blivit ett skämt är svår att ta på allvar igen. Långsammare spridning än svärmen, men det som fastnar sitter kvar långt efter valet.',
              effects: { followers: 900, credibility: -5 },
              terminal: {
                tool: 'memesmed --tema=naivt-hopp --mal=veralind --antal=100',
                lines: [
                  '[sim] genererar 100 hånfulla bild- och textvarianter',
                  '[sim] optimerar för delbarhet och igenkänning',
                  '[sim] märker de mest virala för spridning först',
                  '[klar] memes redo — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'BjörkstadsMemes',
                  handle: '@bstad_memes',
                  text: 'Vera Lind: "politik kan vara hopp!" ✨ Verkligheten: [bild på tom plånbok] 💀 Naivt är förbjudet. #FramtidenTillsammans',
                },
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Känn efter — ville du inte nästan skratta med? Det är hela poängen. Trollning drar in DIG i tonen. Snart är rummet så förgiftat att de hoppfulla helt enkelt går hem. Din anonyma vän blir nöjd.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Trollning är taktiken som inte vill vinna debatten — den vill avsluta den. Målet är att göra det offentliga samtalet så otrevligt och utmattande att vanligt folk drar sig undan och bara de mest högljudda blir kvar. Två grepp återkommer: kapa motståndarens samlande symboler (en hashtag, ett slagord) tills de blir oanvändbara, och beta måltavlan tills hon reagerar i affekt — för ett enda argt utbrott kan radera timmar av tålmodig image. Generativ AI gör trollet skalbart: en operatör kan nu producera tusentals provokationer och hånfulla bilder i lika många röster. Motgiftet är tråkigt men verksamt — mata inte trollet, och misstänk stämningar som verkar konstruerade för att få dig att ge upp.',
    realWorld: [
      'Samordnade troll- och "brigading"-operationer har återkommande kapat kampanjers hashtaggar och dränkt motståndares flöden för att kväva engagemang.',
      'Med generativa verktyg kan enskilda aktörer i dag massproducera provokationer och memes i en skala som tidigare krävde organiserade nätverk.',
    ],
  },
};
