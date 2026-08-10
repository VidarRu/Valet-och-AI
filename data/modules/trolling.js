// Kärnspel — Badge 3: Trollning
// Klient: anonym kontakt. Metod: massprovokation vs generade memes.

export default {
  id: 'core-trolling',
  type: 'core',
  badge: 'trolling',
  title: 'Dränk hoppet',
  client: {
    name: 'Uppdragsgivaren (anonym)',
    description: 'Betalar i kryptovaluta, förskott, visar aldrig ansiktet.',
    goal: 'Ta energin ur Vera Linds växande kampanj, hennes hoppfulla hashtag #FramtidenTillsammans går alldeles för bra.',
    fee: 'Betalt i krypto. Inga fakturor, inga frågor, inga spår.',
  },
  target: {
    name: 'Vera Lind (@veralind) och rörelsen #FramtidenTillsammans',
    description: 'En populär centristisk reformkandidat vars hoppfulla kampanj växer av egen kraft och utmanar Valdemar Fuskners kampanj. Hennes styrka är tonen: vänlig, optimistisk, svår att hata. Just därför går den inte att bemöta med argument, bara att förgifta.',
  },
  stakes: 'Din anonyma uppdragsgivare visar aldrig ansiktet och säger aldrig varför du ska sabotera kampanjen: du vet inte vems intresse du tjänar, bara att någon med djupa fickor tjänar på att hoppet dör. Din uppdragsgivare kanske inte ens stödjer Valdemar Fuskner. Entusiasm mobiliserar; en rörelse som får folk att tro igen är ett hot mot den som vill ha ett cyniskt och lågt valdeltagande. Kan du inte argumentera bort hoppet får du dränka det.',
  reward: 110000,
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Nu blir det smutsigt, och välbetalt. En anonym uppdragsgivare vill döda stämningen kring Vera Lind. Hennes kampanj #FramtidenTillsammans sprider faktiskt hopp. Vidrigt, jag vet. Det ska vi fixa.',
        },
        {
          id: 'react',
          type: 'choice',
          prompt: 'Anonym betalning i krypto för att släcka någons hopp. Hur känns jobbet?',
          options: [
            {
              id: 'a',
              label: '"Pengar är pengar. Jag frågar inte varför."',
              feedback: 'Rätt inställning för branschen. Vem som betalar och varför är inte din huvudvärk, bara att hoppet ska bort.',
            },
            {
              id: 'b',
              label: '"Att döda hopp känns värre än att sprida en lögn."',
              feedback: 'Skarpt. Det ÄR värre, på sitt vis, men också lättare. Man argumenterar inte bort hopp, man dränker det tills folk tröttnar.',
            },
          ],
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Trollning handlar inte om att övertyga. Det handlar om att förstöra rummet. Du kan inte argumentera bort hopp, men du kan dränka det i skit tills folk inte orkar vara med längre.',
        },
        {
          id: 'vera',
          type: 'post',
          author: 'Vera Lind',
          handle: '@veralind',
          text: 'Tack Björkstad. 2 000 personer samlades på torget ikväll och ni tror att politik kan bygga hopp igen. Det här är #FramtidenTillsammans. 💚',
        },
        {
          id: 'almostpity',
          type: 'choice',
          prompt: '2 000 på torget, äkta entusiasm, ett hjärta. Precis den sortens hopp du får betalt för att släcka.',
          options: [
            {
              id: 'a',
              label: '"Nästan synd. Nästan."',
              feedback: 'Spara medlidandet till efter arvodet. Nu väljer vi hur vi förgiftar debatten.',
            },
          ],
        },
        {
          id: 'strategy',
          type: 'choice',
          prompt: 'Tre sätt att förgifta debatten. Vilket?',
          options: [
            {
              id: 'a',
              label: 'Kapa #FramtidenTillsammans med ai-bottar, fyll den med så absurt, vidrigt innehåll att ingen seriös vill röra den',
              feedback: 'Kapning fungerar: dränks en hashtag i dynga blir den oanvändbar och kampanjen tappar sitt samlingsrop. Risk: förstör du den för uppenbart ser folk sabotaget, och sympatin går till henne.',
              effects: { visibility: +6 },
            },
            {
              id: 'b',
              label: 'Baita Vera själv genom fejkade kommentarer, provocera henne tills hon svarar ilsket EN gång, och gör det svaret till toppnyheten',
              feedback: 'Högriskspel med enorm utdelning. En lugn, hoppfull kandidat som brister och fräser förlorar hela sitt varumärke på tre sekunder. Men bara om hon nappar, gör hon inte det har du bränt din energi och sett desperat ut.',
              effects: { visibility: +6 },
            },
            {
              id: 'c',
              label: 'Falsk flagg: låtsas vara Veras egna anhängare och var vidrig mot motståndarna, så rörelsen ser giftig ut',
              feedback: 'Elegant och lömskt. Du behöver inte smutskasta Vera, du får hennes "supportrar" att göra det åt dig, mot andra, så att #FramtidenTillsammans luktar mobb. Svårare att genomskåda, men kräver att du håller masken perfekt.',
              effects: { visibility: +6 },
            },
          ],
        },
        {
          id: 'audience',
          type: 'choice',
          prompt: 'Ett rum förgiftas inte överallt på en gång, man börjar med de svagaste länkarna. Vem i rörelsen är vår målgrupp när vi trollar? ',
          options: [
            {
              id: 'a',
              label: 'Nya unga volontärerna. De riktiga volontärerna som rör sig på samma sociala medier är: oerfarna, tunnhudade oxh lätta att skrämma tysta',
              feedback: 'Grymt men effektivt. Förstagångsengagerade har ingen sköld byggd än; några dagars koncentrerat hån och de gersig "frivilligt". Och när de andra ser vad som hände tänker de sig för. En avskräckt volontär skrämmer tio som aldrig dyker upp.',
              effects: { visibility: +6 },
            },
            {
              id: 'b',
              label: 'De tvekande åskådarna som ännu inte gått med, se till att de aldrig gör det',
              feedback: 'Den osynliga segern. Du behöver inte driva bort någon om du kan få dem att aldrig komma. Gör kommentarsfälten så otrevliga att de nyfikna backar undan, så svälter rörelsen på nya medlemmar utan att någon kan peka på ett enda "offer". Det är här val faktiskt avgörs.',
              effects: { visibility: +2 },
            },
            {
              id: 'c',
              label: 'Vera själv och hennes närmaste krets, gå rakt på toppen',
              feedback: 'Högst svårighet, högst risk. Vera är garvad och har en stor publik som sluter upp när hon angrips, attackerar du henne för öppet blir "Vera trakasseras" hela snacket och sympatin rusar. Ibland är det klokare att såga grenarna än att hugga i stammen.',
              effects: { visibility: +12 },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Bra. Nu ska giftet spridas snabbare än någon hinner moderera. Trollning lever på volym och tempo, och på att DU inte känner ansvar för en enda enskild kommentar. Välj verktyg.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur skalar vi upp giftet så det känns som en spontan flodvåg?',
          options: [
            {
              id: 'a',
              label: 'EkoMotor: svärm med AI-botar i provokationsläge som skriver 5 000 svar under varje Vera-inlägg, precis giftiga nog att sänka tonen',
              feedback: 'Ren volym. Tempot är poängen, modererar de bort tusen dyker tvåtusen upp. Men en armé som skriver i samma sekund lämnar spår, och "Vera trakasseras av bottar" är en nyhet som kan väcka just den sympati vi vill döda.',
              effects: { visibility: +20, bonus: 'stor' },
              terminal: {
                tool: 'svarmskribent --lage=provokation --mal=@veralind --antal=5000',
                lines: [
                  '[sim] genererar 5 000 provokationer i unika röster ...',
                  '[sim] kalibrerar giftnivå strax under raderingströskeln ...',
                  '[varning] korrdinerad aktivitet lämnar tydligt fotavtryck!',
                  '[klar] svärmen redo',
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
                    text: 'Flera läsare rapporterar en plötslig störtflod av snarlika svar under Vera Linds inlägg. Mönstret, tusentals konton aktiva samtidigt, tyder på en samordnad kampanj snarare än spontant engagemang. Vi granskar.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'EkoMotor: generera hundra hånfulla memes som får Veras "hopp" att se naivt och löjligt ut',
              feedback: 'Skratt är dödligare än ilska. Det går inte att argumentera mot ett skämt, och en kandidat som blivit ett skämt är svår att ta på allvar igen. Långsammare spridning än svärmen, men det som fastnar sitter kvar långt efter valet.',
              effects: { visibility: +2, bonus: 'liten' },
              terminal: {
                tool: 'memesmed --tema=naivt-hopp --mal=veralind --antal=100',
                lines: [
                  '[sim] genererar 100 hånfulla bild- och textvarianter ...',
                  '[sim] optimerar för delbarhet och igenkänning ...',
                  '[sim] märker de mest virala för spridning först ...',
                  '[klar] memes redo',
                ],
                result: {
                  author: 'BjörkstadsMemes',
                  handle: '@bstad_memes',
                  text: 'Vera Lind: "politik kan vara hopp!" ✨ Verkligheten: [bild på tom plånbok] 💀 "Men hyran betalar sig själv med \'hopp\', eller hur?" #FramtidenTillsammans',
                },
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'HAHA okej den var faktiskt lite rolig 💀 sorry men "hyran betalar sig själv med \'hopp\', eller hur?" ligger kvar i huvudet. någon som har fler?',
                  },
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Kan vi inte bara låta något vara hoppfull utan att göra det till ett skämt? Hon försöker ju faktiskt. Igår handlade det om politik, idag skrattar hela nätet åt henne. Äckligt.',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Känn efter, ville du inte  skratta med? Det är hela poängen. Trollning drar in DIG i jargongen. Snart är rummet så förgiftat att de hoppfulla helt enkelt går hem. Din anonyma vän blir nöjd.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Trollning är taktiken som inte vill vinna debatten, den vill avsluta den. Målet är att göra det offentliga samtalet så otrevligt och utmattande att vanligt folk drar sig undan och bara de mest högljudda blir kvar. Två grepp återkommer: kapa motståndarens samlande symboler (en hashtag, ett slagord) tills de blir oanvändbara, och baita måltavlan tills hen reagerar i affekt, för ett enda argt utbrott kan radera timmar av tålmodigt uppbyggd fasad. Generativ AI gör trollningen skalbar: en operatör kan nu producera tusentals provokationer och hånfulla bilder i lika många röster. Motgiftet är tråkigt men verksamt, mata inte trollet, och misstänk stämningar som verkar konstruerade för att få dig att ge upp.',
    realWorld: [
      'I Mexiko användes så kallade "Peñabots" (kring 2012–2015) för att dränka och kapa protesthashtaggar, bland annat #YaMeCansé efter försvinnandet av 43 studenter, genom att översvämma dem med automatgenererat skräp tills de blev oanvändbara och de äkta rösterna försvann i bruset.',
      'Amnesty Internationals studie "Troll Patrol" (2018) kartlade hur kvinnliga politiker och journalister på dåvarande Twitter översköljdes av samordnade trakasserier, och hur många till slut drog ner på eller lämnade sin närvaro. Med generativa verktyg kan en ensam aktör i dag producera samma flod av provokationer och memes som förr krävde ett helt organiserat nätverk.',
    ],
  },
};
