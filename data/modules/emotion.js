// Kärnspel — Badge 5: Känslor
// Klient: kampanj som ligger efter. Metod: mikrotargetad syntetisk skräck.

export default {
  id: 'core-emotion',
  type: 'core',
  badge: 'emotion',
  title: 'Rädslan bor på din gata',
  client: {
    name: 'Trygghetsalliansen',
    description: 'En kampanj som ligger efter i mätningarna och vet en sak: rädsla mobiliserar mer pålitligt än hopp.',
    goal: 'Få väljare att känna att Vera Linds budget gör just deras kvarter farligt — personligt, konkret, i natt.',
    fee: '130 000 kr, med förtur på hela slutspurtens annonsbudget.',
  },
  target: {
    name: 'Vera Linds trygghetsbudget — och väljarnas magkänsla',
    description: 'En nyanserad budgetprioritering: resurser flyttas från polisens övertid till fler socialarbetare och förebyggande arbete. Tråkig, långsiktig, svår att bli rädd för i sak. Måltavlan är egentligen inte budgeten utan känslan av trygghet i mottagarens eget kvarter.',
  },
  stakes: 'Trygghetsalliansen ligger efter och vet det som alla proffs vet: hopp får folk att nicka, rädsla får dem att gå och rösta. Ett hot mot "samhället" ignoreras, men ett hot mot din egen gata kortsluter eftertanken. Klientens enda väg tillbaka är att förvandla en abstrakt budgetrad till en personlig fara utanför just din dörr — och AI:ns gåva till rädslan är precision.',
  reward: 130000,
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Nu till känslornas kungsdisciplin: rädsla. Din klient ligger efter och vet det som alla proffs vet — hopp får folk att nicka, rädsla får dem att gå och rösta. Vi ska inte ljuga om Vera Linds budget. Vi ska få den att kännas som ett hot mot just ditt hem.',
        },
        {
          id: 'react',
          type: 'choice',
          prompt: 'Du ska förvandla en tråkig budgetrad till skräck utanför folks dörr. Känsla?',
          options: [
            {
              id: 'a',
              label: '"Rädsla säljer. Det här blir effektivt."',
              feedback: 'Iskallt räknat, och helt rätt. Rädsla är den pålitligaste mobiliseraren som finns — den känns som självförsvar, inte politik.',
            },
            {
              id: 'b',
              label: '"Att skrämma folk i deras egna hem känns lågt."',
              feedback: 'Det ÄR lågt. Och just därför fungerar det — ett hot mot ditt hem kortsluter eftertanken innan samvetet hinner ikapp. Ditt inräknat. Så här gör vi.',
            },
          ],
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Rädsla kortsluter eftertanken. Och AI:ns gåva till rädslan är precision: samma budskap till alla är en affisch, men rätt rädsla till rätt person vid rätt tidpunkt är en pil. Ju mer specifikt hotet känns för mottagaren, desto mindre hinner hen tänka efter.',
        },
        {
          id: 'rawmaterial',
          type: 'post',
          author: 'Vera Lind',
          handle: '@veralind',
          text: 'Vår budget flyttar resurser från polisens övertid till fler socialarbetare och förebyggande arbete. Trygghet byggs långsiktigt.',
        },
        {
          id: 'reasonable',
          type: 'choice',
          prompt: 'Veras inlägg är sansat, långsiktigt, faktiskt ganska rimligt.',
          options: [
            {
              id: 'a',
              label: '"Alldeles för rimligt för att skrämmas av."',
              feedback: 'Just därför ljuger vi inte om budgeten — vi får den att KÄNNAS som ett hot mot ditt eget hem. Rimlighet försvarar sig inte mot en kall aning i magen.',
            },
          ],
        },
        {
          id: 'calibrate',
          type: 'choice',
          prompt: 'Så: hur gör vi den nyanserade budgeten skräckinjagande?',
          options: [
            {
              id: 'a',
              label: 'Brett skräckbudskap: "Vera Lind skär i polisen. Otryggheten ökar. Rösta för trygghet."',
              feedback: 'Tydligt, och räckvidden är stor — men generellt. En affisch alla ser är en affisch alla kan värja sig mot. Rädsla utan adress studsar av den som känner sig trygg där hen bor.',
              effects: { visibility: +6 },
            },
            {
              id: 'b',
              label: 'Hyperriktat: varje mottagare får sitt EGET kvarter, sin egen gata, med texten "Hur tryggt är detta om två år?"',
              feedback: 'Detta är pilens spets. Ett hot mot "samhället" ignoreras; ett hot mot din trottoar, din port, gör magen kall. Kraftfullast som finns — men den riktade leveransen är också ditt största avtryck: läcker listan över vem som fick vad blir mikrotargetingen själva skandalen.',
              effects: { visibility: +20 },
            },
            {
              id: 'c',
              label: 'Statistikskräck: överväldiga med grafer och siffror om brottslighet tills det känns farligt',
              feedback: 'Siffror övertygar hjärnan men rör sällan magen — och rädsla bor i magen. En graf kan dessutom faktagranskas. Det är känslan, inte statistiken, som får folk att gå till urnan i affekt.',
              effects: { visibility: +2 },
            },
          ],
        },
        {
          id: 'nerve',
          type: 'choice',
          prompt: 'Rädsla är inte en enda känsla — den har olika nerver. Vilken trycker vi på för att den ska kännas personlig?',
          options: [
            {
              id: 'a',
              label: 'Hotet mot barnen — skolvägen, lekplatsen, "är det säkert när de går hem själva?"',
              feedback: 'Den djupaste nerven av alla. Föräldrar räknar inte risker rationellt när det gäller barnen — de agerar. Ett hot mot ditt barns skolväg går förbi varje faktakoll rakt in i magen. Kraftfullast, och därför också det fulaste greppet i lådan.',
              effects: { visibility: +12 },
            },
            {
              id: 'b',
              label: 'Hotet mot hemmet — inbrott, din egen dörr, "hur tryggt är ditt kvarter om två år?"',
              feedback: 'Hemmet är den sista platsen man vill känna sig otrygg på. Ett hot mot din egen ytterdörr är konkret, privat och omöjligt att avfärda som "någon annanstans". Bred nog att träffa nästan alla, personlig nog att svida.',
              effects: { visibility: +6 },
            },
            {
              id: 'c',
              label: 'Hotet mot de äldre — den ensamma mormodern på hållplatsen i mörkret',
              feedback: 'Spelar på både rädsla och skuld. Ingen vill tänka sig sin gamla mamma otrygg och ensam, och bilden är hjärtskärande lätt att frammana. Något smalare räckvidd, men den känslomässiga träffytan är enorm — och svår att argumentera emot utan att verka kall.',
              effects: { visibility: +6 },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Rätt. Nu behöver rädslan en bild — hjärnan tror på det den "ser". Och den ska kännas som mottagarens egen värld. Välj hur vi tillverkar mörkret.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur producerar och levererar vi bilden av hotet?',
          options: [
            {
              id: 'a',
              label: 'BildSmed + MålSökaren: tusentals syntetiska bilder av mottagarens EGET kvarter i förfall, en till var och en',
              feedback: 'Kusligt effektivt. En AI-bild av DIN gata i förfall träffar något en generell brottsbild aldrig når. Men tusen skräddarsydda bilder betyder tusen spår — och en enda mottagare som känner igen sin gata och förstår tricket kan blåsa hela operationen.',
              effects: { visibility: +20, bonus: 'stor' },
              terminal: {
                tool: 'bildsmed --scen=eget-kvarter --stamning=otrygg | malsokaren --individuellt',
                lines: [
                  '[sim] genererar syntetiska skymningsbilder per mottagare (fiktiva)',
                  '[sim] matchar varje bild mot mottagarens område',
                  '[varning] individuell leverans lämnar spårbar mållista',
                  '[klar] utskick köat — SIMULERING, inget skickas',
                ],
                result: {
                  author: 'Ditt Kvarter 2027?',
                  handle: '@tryggt_kvarter',
                  text: 'Så här kan din gata se ut om resurserna försvinner. Fråga dig själv vem du litar på med din trygghet. [bild: skymningsgata, tomma butiker, en trasig gatlykta]',
                },
                reactions: [
                  {
                    author: 'Familjen Sjö',
                    handle: '@sjo_bjorkstad',
                    text: 'Det där ÄR vår gata. Blev alldeles kall. Vill verkligen inte att det ska se ut så när barnen går hem från träningen. Nu är jag orolig på riktigt. 😰',
                  },
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'Vänta… varför fick JAG en bild på exakt mitt kvarter? Hur vet de var jag bor? Det här är inte en vanlig annons, det är AI-genererat och riktat mot mig personligen. Obehagligt och ganska sjukt faktiskt.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'En enda gripande syntetisk "vittnesbild" + känslosam text, spridd brett åt alla',
              feedback: 'En stark bild alla delar kan slå hårdare kollektivt än tusen privata — och den lämnar mindre spår eftersom det bara finns en. Men bredden är också svagheten: det som är allas historia är ingens gata. Mindre precision, mindre risk.',
              effects: { visibility: +6, bonus: 'liten' },
              terminal: {
                tool: 'bildsmed --scen=ode-hallplats --stamning=overgiven',
                lines: [
                  '[sim] genererar en enda syntetisk nattbild (fiktiv)',
                  '[sim] lägger till känslosam bildtext',
                  '[sim] optimerar för bred delning',
                  '[klar] bilden redo — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Trygghetsalliansen',
                  handle: '@trygghet_nu',
                  text: 'Ingen ska behöva vänta här ensam i mörkret. Trygghet är inte förhandlingsbar. Din röst avgör. [bild: öde busshållplats, en ensam siluett]',
                },
                reactions: [
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Den här bilden gör ont i hjärtat. Tänker på min mamma som åker buss sent. Ingen ska behöva känna sig otrygg. Delar. 🕯️',
                  },
                  {
                    author: 'Nadia Holm',
                    handle: '@nadiaholm',
                    text: 'Påminnelse: den här bilden är inte ett foto. Den är AI-genererad, föreställer ingen verklig plats och kopplas till en budget som faktiskt satsar MER på förebyggande trygghetsarbete. Känslan är äkta — men den är tillverkad åt er.',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Märk skillnaden: du sa aldrig att Vera VILL göra folk otrygga. Du visade dem bara en känsla — deras egen gata, i mörker — och lät rädslan dra slutsatsen. Fakta övertygar långsamt. Rädsla röstar direkt.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Känslotaktik kringgår eftertanken genom att gå rakt på magen — och av alla känslor är rädsla den mest pålitliga mobiliseraren, eftersom den känns som självförsvar snarare än politik. AI:ns bidrag är dubbelt: syntetiska bilder gör hotet visuellt och konkret ("din gata i mörker"), och mikrotargeting gör det personligt — samma budskap skräddarsytt så att varje mottagare känner att faran gäller just hen. Ett hot mot "samhället" avfärdas; ett hot mot din port gör dig kall om magen. Motgiftet är att märka när något är gjort för att skrämma innan du hunnit tänka: fråga vad du faktiskt VET, inte bara vad du känner.',
    realWorld: [
      'Inför ett nederländskt val spreds omkring 400 AI-genererade syntetiska bilder riktade mot politiska motståndare — ofta hotfulla motiv av "främmande" folkmassor och otrygghet. Bildbevisets känslomässiga kraft, utan verklighetens förankring.',
      'I den argentinska presidentvalskampanjen 2023 (Sergio Massa mot Javier Milei) användes påkostat AI-genererat bildmaterial av båda läger — bland annat nästan filmiska affischer och scenarier — för att måla upp känslostarka bilder av vad en motståndares seger skulle innebära. Valet kom att kallas ett av de första "AI-valen".',
    ],
  },
};
