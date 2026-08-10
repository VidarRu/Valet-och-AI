// Fördjupning — Trollning
// Ny vinkel: inte dränka en kampanj brett, utan tysta EN enskild röst genom
// riktad uttröttning — den nedkylande effekten.

export default {
  id: 'deep-trolling',
  type: 'deep',
  badge: 'trolling',
  title: 'Tysta den nya rösten',
  client: {
    name: 'Uppdragsgivaren (anonym, igen)',
    description: 'Din krypto-vän är tillbaka. Den här gången gäller det inte en kandidat utan en 19-åring.',
    goal: 'Få Moa Ek, en förstagångsröstande volontär vars klipp om Vera Lind blev viralt, att sluta posta helt.',
    fee: 'Betalt i krypto. Ett tips medföljer: "Det räcker att en slutar. Resten tystnar av sig själva."',
  },
  target: {
    name: 'Moa Ek (@moaek), 19, förstagångsväljare',
    description: 'En volontär vars klipp om varför hon röstar för första gången fick 400 000 visningar. Ung, sympatisk och ännu orädd. "Fel sorts inspiration", enligt klienten.',
  },
  stakes: 'Uppdraget är inte att övertyga Moa om något, det är att göra det så obehagligt att synas att hon väljer tystnaden själv. Och när tusen andra förstagångsväljare ser vad som hände henne tänker de sig för innan de öppnar munnen. En släckt röst skrämmer hundra: den verkliga skörden är inte de du sänker, utan alla som aldrig vågar börja.',
  reward: 130000,
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Nu ska vi prata om trollningens fulaste och mest effektiva gren: att tysta en enda människa så att tusen andra håller tyst av rädsla. Måltavlan är Moa Ek, 19. Hennes klipp om varför hon röstar för första gången fick 400 000 visningar. Fel sorts inspiration, enligt din klient. Vi ska släcka henne.',
        },
        {
          id: 'react',
          type: 'choice',
          prompt: 'Måltavlan är en 19-åring som just blivit taggad på att rösta. Hur känns det?',
          options: [
            {
              id: 'a',
              label: '"Ung och tunnhudad, en lätt måltavla."',
              feedback: 'Kallt räknat, och sant. Ingen sköld byggd än, det går fort. Men minns att lättast inte är detsamma som finast.',
            },
            {
              id: 'b',
              label: '"En 19-åring? Det här känns riktigt skitigt."',
              feedback: 'Det är det. Och behåll den känslan, den säger något om vad taktiken faktiskt kostar. Vi gör det ändå, men du ska veta vad du gör.',
            },
          ],
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Det här kallas den nedkylande effekten: gör det så obehagligt att synas att hon tystnar av sig själv, så tiger hundra andra av rädsla för att bli nästa. Vi behöver inte övertyga henne om något, bara trötta ut henne.',
        },
        {
          id: 'clip',
          type: 'post',
          author: 'Moa Ek',
          handle: '@moaek',
          text: 'Första gången jag får rösta och jag är faktiskt taggad?? Politik behöver inte vara hat. Vi kan bygga nåt bättre tillsammans. 🌱 #förstagångsväljare',
        },
        {
          id: 'harmless',
          type: 'choice',
          prompt: 'Hennes klipp är hoppfullt, snällt, helt utan udd. Och 400 000 har sett det.',
          options: [
            {
              id: 'a',
              label: '"Precis den sortens röst jag får betalt att släcka."',
              feedback: 'Just den. Och ju snällare hon är, desto mer avskräckande blir det för andra när hon ändå tystas. Men ett råd: håll dig på rätt sida lagen, martyrer är dåligt för affären.',
            },
          ],
        },
        {
          id: 'approach',
          type: 'choice',
          prompt: 'Hon är ung, sympatisk och orädd, ännu. Hur får vi henne att vilja försvinna?',
          options: [
            {
              id: 'a',
              label: 'Samordnad uttröttning: ett jämnt, oändligt dropp av hånfulla svar dygnet runt',
              feedback: 'Inte en storm, ett kinesiskt vattendropp. Det är inte den enskilda kommentaren som knäcker, det är att den ALDRIG tar slut. Uthållig låg intensitet sliter ner en människa långsammare men säkrare än en enskild attack, och lämnar färre "hot" att anmäla.',
              effects: { visibility: +12 },
            },
            {
              id: 'b',
              label: 'Gör henne till ett skämt: memes som förvränger hennes ansikte och ord tills namnet blir själva skämtet',
              feedback: 'Förnedring biter djupare än ilska hos en 19-åring. Blir ditt namn en meme förlorar du kontrollen över din egen identitet på nätet, och det finns inget att "anmäla", det är ju "bara skämt". Grymt effektivt, men skapar sympati om det går för långt.',
              effects: { visibility: +6 },
            },
            {
              id: 'c',
              label: 'Skrämma på riktigt: antyd att ni vet var hon bor',
              feedback: 'Stopp. Det här är inte längre trollning, det är olaga hot, och det flyttar dig från "anonym skitstövel" till "polisärende". Dessutom vänds allt: konkreta hot ger henne en glasklar offerberättelse och massivt stöd. Fel på alla sätt, inklusive det taktiska.',
              effects: { visibility: +20 },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Bra att du höll dig på rätt sida gränsen, martyrer är dåligt för affären. Nu ska trycket vara konstant och kännas som att det kommer från hela internet, inte från ett konto. Vi behöver uthållig, mångstämmig volym.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur håller vi trycket uppe dygnet runt utan att det ser samordnat ut?',
          options: [
            {
              id: 'a',
              label: 'EkoMotor: hundra röster som turas om, dygnet runt, alltid strax under anmälningströskeln',
              feedback: 'Skiftarbete utan arbetare. Bottarna sover aldrig, tröttnar aldrig, och varje enskilt svar är kalibrerat att vara elakt men inte anmälbart. För Moa känns det som att hela världen är emot henne. Men ett dygnetruntflöde i exakt rytm är ett mönster granskare kan hitta.',
              effects: { visibility: +20, bonus: 'stor' },
              terminal: {
                tool: 'svarmskribent --lage=uttrottning --mal=@moaek --dygnetrunt',
                lines: [
                  '[sim] fördelar 100 konton på rullande skift ...',
                  '[sim] kalibrerar varje svar strax under anmälningströskeln ...',
                  '[varning] jämn dygnsrytm kan avslöja samordning!',
                  '[klar] droppet igång',
                ],
                result: {
                  author: 'inte din vän',
                  handle: '@bstad_anon_44',
                  text: '"bygga nåt bättre" 🥱 ingen frågade, ingen bryr sig, gå och plugga barnrumpa. (och 400 svar till precis som detta, hela natten)',
                },
                reactions: [
                  {
                    author: 'Moa Ek',
                    handle: '@moaek',
                    text: 'Vaknar till 600 nya svar, alla lika elaka, dygnet runt i tre dagar nu. Blockar ett konto så dyker fem upp. Sa ju bara att jag ville rösta. Orkar snart inte. 😔',
                  },
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Det här är ju inte åsikter, det är hundra konton som turas om dygnet runt. Ren utmattningstaktik mot en 19-åring. Vidrigt. Håll ut Moa, du gör inget fel. 🤍',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'EkoMotor: förvandla hennes namn och ansikte till en självspridande skämtmall',
              feedback: 'Det du startar men slutar äga. En bra meme-mall reproducerar sig själv, riktiga människor gör nya versioner gratis, och plötsligt är "Moa Ek" en genre, inte en person. Långsammare start, men förnedringen blir omöjlig att stoppa när den väl lever sitt eget liv.',
              effects: { visibility: +6, bonus: 'liten' },
              terminal: {
                tool: 'memesmed --mal=moaek --format=mall --sjalvspridande',
                lines: [
                  '[sim] genererar en förvrängd men igenkännbar bildmall ...',
                  '[sim] fyller på med 50 startvarianter ...',
                  '[sim] optimerar för att andra ska göra egna versioner ...',
                  '[klar] mallen släppt i det fria',
                ],
                result: {
                  author: 'BjörkstadsMemes',
                  handle: '@bstad_memes',
                  text: 'nytt format droppat: "Moa Ek förklarar politik" 🌱💀 lägg era bästa i kommentarerna, detta skriver sig självt',
                },
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'ok gjorde en egen version lol 💀 den här mallen är för lätt. någon som har fler? det här är för kul',
                  },
                  {
                    author: 'Moa Ek',
                    handle: '@moaek',
                    text: 'Mitt ansikte är överallt nu, förvrängt, i memes jag inte kan stoppa. Folk jag känner skickar dem "på skoj". Jag är 19. Jag ville bara engagera mig. Detta är inte kul. 💔',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och tre dagar senare: "Tar en paus från sociala medier ett tag. Orkar inte. Ta hand om er. 🤍" Där. Inte ett hot avlossat, inte en lag bruten, bara en ung röst som valde tystnaden "själv". Och varje annan förstagångsväljare som såg det lärde sig läxan: håll käften. Det är trollningens verkliga skörd, inte de du sänker, utan de tusen som aldrig vågar börja.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Trollningens mest strategiska form handlar inte om att vinna ett gräl utan om att tysta en röst, och genom den, skrämma hundra andra till tystnad. Den nedkylande effekten uppstår när priset för att synas blir så högt att människor självcensurerar; du behöver aldrig förbjuda någon att tala om du kan få dem att välja tystnaden själva. Uthållig lågintensiv uttröttning och förnedring genom memes är effektivare än enstaka utbrott, eftersom de sliter utan att lämna tydliga "hot" att anmäla. Generativ AI gör kampanjen outtröttlig: en handfull konton kan bli hundra röster dygnet runt, och en meme-mall kan spridas av sig själv. Motgiftet är solidaritet och kontext, att känna igen samordnad uttröttning för vad den är, och att inte låta den tystade stå ensam. (Notera: verkliga hot och kartläggning är brott, inte "trollning".)',
    realWorld: [
      'Den finländska journalisten Jessikka Aro, som granskade ryska trollfabriker, utsattes själv för en flerårig samordnad trakasserikampanj med förtal, memes och hot i syfte att tysta henne. Fallet ledde till en fällande dom i finsk domstol, ett tydligt exempel på hur en enda obekväm röst kan väljas ut för utmattning.',
      'Den nedkylande effekten är väldokumenterad: undersökningar (bl.a. från PEN America) visar att när människor ser vad som händer den som sticker ut väljer många, särskilt kvinnor, unga och minoriteter, att självcensurera i stället för att riskera samma sak. Du behöver aldrig förbjuda någon att tala om du kan få dem att välja tystnaden själva.',
    ],
  },
};
