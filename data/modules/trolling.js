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
  target: {
    name: 'Vera Lind (@veralind) och rörelsen #FramtidenTillsammans',
    description: 'En populär centristisk reformkandidat vars hoppfulla kampanj växer av egen kraft — 2 000 personer på torget en vanlig tisdag. Hennes styrka är tonen: vänlig, optimistisk, svår att hata. Just därför går den inte att bemöta med argument, bara att förgifta.',
  },
  stakes: 'Din anonyma uppdragsgivare visar aldrig ansiktet och säger aldrig varför — och det är själva poängen: du vet inte vems intresse du tjänar, bara att någon med djupa fickor tjänar på att hoppet dör. Entusiasm mobiliserar; en rörelse som får folk att tro igen är ett hot mot den som vill ha ett trött, cyniskt och lågt valdeltagande. Kan du inte argumentera bort hoppet får du dränka det.',
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
          id: 'audience',
          type: 'choice',
          prompt: 'Ett rum förgiftas inte överallt på en gång — man börjar med de svagaste länkarna. Vem i rörelsen knäcker vi först?',
          options: [
            {
              id: 'a',
              label: 'De nya, unga volontärerna — oerfarna, tunnhudade, lätta att skrämma tysta',
              feedback: 'Grymt men effektivt. Förstagångsengagerade har ingen sköld byggd än; några dagars koncentrerat hån och de drar sig ur "frivilligt". Och när de andra ser vad som hände tänker de sig för. En släckt volontär skrämmer tio som aldrig dyker upp.',
              effects: { followers: 400, credibility: -8 },
            },
            {
              id: 'b',
              label: 'De tveksamma åskådarna som ännu inte gått med — se till att de aldrig gör det',
              feedback: 'Den osynliga segern. Du behöver inte driva bort någon om du kan få dem att aldrig komma. Gör kommentarsfälten så otrevliga att de nyfikna backar undan, så svälter rörelsen på nya medlemmar utan att någon kan peka på ett enda "offer". Svårmätt, men det är här val faktiskt avgörs.',
              effects: { followers: 300, credibility: -5 },
            },
            {
              id: 'c',
              label: 'Vera själv och hennes närmaste krets — gå rakt på toppen',
              feedback: 'Högst svårighet, högst risk. Vera är garvad och har en stor publik som sluter upp när hon angrips — attackerar du henne för öppet blir "Vera trakasseras" storyn och sympatin rusar. Ibland är det klokare att såga grenarna än att hugga i stammen.',
              effects: { followers: 250, credibility: -9 },
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
                reactions: [
                  {
                    author: 'Moa Ek',
                    handle: '@moaek',
                    text: 'Öppnade appen och det är typ 400 identiska hånfulla svar på varenda inlägg sen inatt. Orkar knappt läsa längre. Skulle ju bara vara kul att engagera sig. 😞',
                  },
                  {
                    author: 'Nordmarks Nyheter',
                    handle: '@nordmark_nytt',
                    text: 'Flera läsare rapporterar en plötslig störtflod av snarlika svar under Vera Linds inlägg. Mönstret — tusentals konton aktiva samtidigt — tyder på en samordnad kampanj snarare än spontant engagemang. Vi granskar.',
                  },
                ],
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
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'HAHA okej den var faktiskt lite rolig 💀 sorry men "naivt är förbjudet" ligger kvar i huvudet. någon som har fler',
                  },
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Kan vi inte bara låta någon vara hoppfull utan att göra dem till ett skämt? Hon försöker ju faktiskt. Igår handlade det om politik, idag skrattar hela nätet åt henne. Äckligt.',
                  },
                ],
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
      'I Mexiko användes så kallade "Peñabots" (kring 2012–2015) för att dränka och kapa protesthashtaggar — bland annat #YaMeCansé efter försvinnandet av 43 studenter — genom att översvämma dem med automatgenererat skräp tills de blev oanvändbara och de äkta rösterna försvann i bruset.',
      'Amnesty Internationals studie "Troll Patrol" (2018) kartlade hur kvinnliga politiker och journalister på dåvarande Twitter översköljdes av samordnade trakasserier — och hur många till slut drog ner på eller lämnade sin närvaro. Med generativa verktyg kan en ensam aktör i dag producera samma flod av provokationer och memes som förr krävde ett helt organiserat nätverk.',
    ],
  },
};
