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
    fee: '130 000 kr, med option på hela slutspurtens annonsbudget.',
  },
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
          id: 'calibrate',
          type: 'choice',
          prompt: 'Där är råvaran — en nyanserad budgetprioritering. Hur gör vi den skräckinjagande?',
          options: [
            {
              id: 'a',
              label: 'Brett skräckbudskap: "Vera Lind skär i polisen. Otryggheten ökar. Rösta för trygghet."',
              feedback: 'Tydligt, och räckvidden är stor — men generellt. En affisch alla ser är en affisch alla kan värja sig mot. Rädsla utan adress prellar av på den som känner sig trygg där hen bor.',
              effects: { followers: 400, credibility: -6 },
            },
            {
              id: 'b',
              label: 'Hyperriktat: varje mottagare får sitt EGET kvarter, sin egen gata, med texten "Hur tryggt är detta om två år?"',
              feedback: 'Detta är pilens spets. Ett hot mot "samhället" ignoreras; ett hot mot din trottoar, din port, gör magen kall. Kraftfullast som finns — men targetingen är också ditt största avtryck: läcker listan över vem som fick vad blir mikrotargetingen själva skandalen.',
              effects: { followers: 1200, credibility: -13 },
            },
            {
              id: 'c',
              label: 'Statistikskräck: överväldiga med grafer och siffror om brottslighet tills det känns farligt',
              feedback: 'Siffror övertygar hjärnan men rör sällan magen — och rädsla bor i magen. En graf kan dessutom faktagranskas. Det är känslan, inte statistiken, som får folk att gå till urnan i affekt.',
              effects: { followers: 200, credibility: -4 },
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
              effects: { followers: 2000, credibility: -14 },
              terminal: {
                tool: 'bildsmed --scen=eget-kvarter --stamning=otrygg | malsokaren --individuellt',
                lines: [
                  '[sim] genererar syntetiska skymningsbilder per mottagare (fiktiva)',
                  '[sim] matchar varje bild mot mottagarens område',
                  '[varning] individuell leverans lämnar spårbar targetinglista',
                  '[klar] utskick köat — SIMULERING, inget skickas',
                ],
                result: {
                  author: 'Ditt Kvarter 2027?',
                  handle: '@tryggt_kvarter',
                  text: 'Så här kan din gata se ut om resurserna försvinner. Fråga dig själv vem du litar på med din trygghet. [bild: skymningsgata, tomma butiker, en trasig gatlykta]',
                },
              },
            },
            {
              id: 'b',
              label: 'En enda gripande syntetisk "vittnesbild" + känslosam text, spridd brett åt alla',
              feedback: 'En stark bild alla delar kan slå hårdare kollektivt än tusen privata — och den lämnar mindre spår eftersom det bara finns en. Men bredden är också svagheten: det som är allas historia är ingens gata. Mindre precision, mindre risk.',
              effects: { followers: 900, credibility: -6 },
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
      'Känslotaktik kringgår eftertanken genom att gå rakt på magen — och av alla känslor är rädsla den mest pålitliga mobiliseraren, eftersom den känns som självförsvar snarare än politik. AI:ns bidrag är dubbelt: syntetiska bilder gör hotet visuellt och konkret ("din gata i mörker"), och mikrotargeting gör det personligt — samma budskap skräddarsytt så att varje mottagare känner att faran gäller just hen. Ett hot mot "samhället" avfärdas; ett hot mot din port gör dig kall om magen. Motgiftet är att märka när något är designat för att skrämma innan du hunnit tänka: fråga vad du faktiskt VET, inte bara vad du känner.',
    realWorld: [
      'I ett nederländskt val spreds omkring 400 AI-genererade syntetiska bilder riktade mot politiska motståndare — bildbevisets känslomässiga kraft utan verklighetens förankring.',
      'I en argentinsk presidentkampanj användes påkostat AI-genererat bildmaterial för att måla upp känslostarka, nästan filmiska scenarier av vad en motståndares seger skulle innebära.',
    ],
  },
};
